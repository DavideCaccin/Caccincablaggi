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
    let info = await transporter.sendMail({
      from: `"Caccin Monitor" <${process.env.GMAIL_USER}>`,
      to: process.env.NOTIFICATION_EMAIL,
      subject: subject,
      html: htmlContent
    });
    console.log('Email inviata con successo. ID:', info.messageId);
  } catch (error) {
    console.error('ERRORE durante l\'invio della mail:', error);
  }
}

test('Monitoraggio con Verifica Google Analytics', async ({ page }) => {
  const targetUrl = process.env.TARGET_URL || 'https://tuosito.it';
  const gaMeasurementId = 'G-CBG6CS22TY';
  let gaHitsDetected = 0;

  // Intercettiamo le richieste di rete per verificare Google Analytics in tempo reale
  page.on('request', request => {
    const url = request.url();
    // Controlla se la pagina sta inviando dati a Google Analytics (collezioni GA4 o GTM)
    if (url.includes('google-analytics.com/g/collect') || url.includes('analytics.google.com') || url.includes('googletagmanager.com')) {
      if (url.includes(gaMeasurementId) || url.includes('gtm')) {
        gaHitsDetected++;
        console.log(`[GA4 Rilevato] Richiesta inviata a Google Analytics: ${url}`);
      }
    }
  });

  const startTime = Date.now();
  const response = await page.goto(targetUrl, { waitUntil: 'networkidle' });
  const responseTime = Date.now() - startTime;

  if (!response || response.status() >= 400) {
    throw new Error(`Sito non raggiungibile o errore HTTP: ${response ? response.status() : 'Nessuna risposta'}`);
  }

  // Attendiamo qualche secondo per assicurarci che gli script di analytics si siano caricati
  await page.waitForTimeout(3000);

  const reportHtml = `
    <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; padding: 20px;">
      <h2 style="color: #0284c7; border-bottom: 2px solid #0284c7; padding-bottom: 8px;">📊 Report & Analytics - Caccin Monitor</h2>
      
      <p>Verifica dello stato del sito e del tracciamento in tempo reale:</p>
      
      <h3 style="color: #334155; margin-top: 20px;">🌐 Stato e Performance</h3>
      <ul style="background: #f8fafc; padding: 15px 20px; border-radius: 6px; list-style-type: none;">
        <li>🟢 <strong>Stato Home:</strong> Online e Operativo</li>
        <li>⚡ <strong>Tempo di risposta:</strong> ${responseTime}ms</li>
        <li>🎯 <strong>ID Google Analytics:</strong> ${gaMeasurementId}</li>
      </ul>

      <h3 style="color: #334155; margin-top: 20px;">📈 Controllo Tracciamento</h3>
      <ul style="background: #f8fafc; padding: 15px 20px; border-radius: 6px; list-style-type: none;">
        <li>📊 <strong>Segnali GA4 intercettati dal test:</strong> ${gaHitsDetected > 0 ? '🟢 Attivo (' + gaHitsDetected + ' eventi inviati)' : '⚠️ Nessun evento rilevato (verifica il codice di tracciamento)'}</li>
      </ul>

      <p style="font-size: 12px; color: #64748b; margin-top: 30px; text-align: center; border-top: 1px solid #e0e0e0;">
        Generato automaticamente da Caccin Monitor • ${new Date().toLocaleDateString('it-IT')}
      </p>
    </div>
  `;

  console.log("Invio report con controllo analytics in corso...");
  await sendEmail('📊 [Caccin Monitor] Report con Verifica Google Analytics', reportHtml);
});
