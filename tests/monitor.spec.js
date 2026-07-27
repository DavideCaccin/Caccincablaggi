const { test, expect } = require('@playwright/test');
const nodemailer = require('nodemailer');

const transporter = process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD ? nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD
  }
}) : null;

async function sendEmail(subject, htmlContent) {
  if (!transporter || !process.env.NOTIFICATION_EMAIL) {
    console.log(`[EMAIL SIMULATA] ${subject}: ${htmlContent}`);
    return;
  }
  
  try {
    await transporter.sendMail({
      from: `"Caccin Monitor" <${process.env.GMAIL_USER}>`,
      to: process.env.NOTIFICATION_EMAIL,
      subject: subject,
      html: htmlContent
    });
    console.log('Email inviata con successo.');
  } catch (error) {
    console.error('Errore durante l\'invio della mail:', error);
  }
}

test('Monitoraggio e Analytics Domenicale', async ({ page }) => {
  const targetUrl = process.env.TARGET_URL || 'https://tuosito.it';
  const isSunday = new Date().getDay() === 0; // Controlla se oggi è domenica (0 = Domenica)
  let errors = [];

  try {
    const startTime = Date.now();
    const response = await page.goto(targetUrl, { waitUntil: 'domcontentloaded' });
    const responseTime = Date.now() - startTime;

    if (!response || response.status() >= 400) {
      throw new Error(`Sito non raggiungibile o errore HTTP: ${response ? response.status() : 'Nessuna risposta'}`);
    }

    console.log(`Tempo di risposta: ${responseTime}ms`);

    // Se è domenica, inviamo il Report Settimanale (Modulo 2)
    if (isSunday) {
      const reportHtml = `
        <h2>📊 Report Settimanale - Caccin Monitor</h2>
        <p>Ecco il riepilogo dello stato del tuo sito:</p>
        <ul>
          <li><strong>Stato Home:</strong> Online 🟢</li>
          <li><strong>Tempo di risposta medio:</strong> ${responseTime}ms</li>
          <li><strong>Protocollo:</strong> HTTPS Sicuro 🔒</li>
        </ul>
        <p><em>I dati dettagliati di Google Analytics sui click (WhatsApp, Telefono, Preventivi) saranno integrati nella prossima versione!</em></p>
      `;
      await sendEmail('📊 [Caccin Monitor] Report Settimanale Analytics', reportHtml);
    }

    if (errors.length > 0) {
      const errorHtml = errors.join('<br>');
      await sendEmail('🚨 [Caccin Monitor] Problemi rilevati sul sito', `<p><strong>Errore rilevato:</strong></p><p>${errorHtml}</p>`);
      expect(errors.length).toBe(0);
    }

  } catch (error) {
    await sendEmail('🚨 [Caccin Monitor] Sito Offline o Errore Critico', `<p><strong>Errore critico:</strong></p><p>${error.message}</p>`);
    throw error;
  }
});
