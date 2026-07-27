const { test, expect } = require('@playwright/test');
const nodemailer = require('nodemailer');

const transporter = process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD ? nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD
  }
}) : null;

async function sendAlert(subject, message) {
  if (!transporter || !process.env.NOTIFICATION_EMAIL) {
    console.log(`[ALERT SIMULATO] ${subject}: ${message}`);
    return;
  }
  
  try {
    await transporter.sendMail({
      from: `"Caccin Monitor" <${process.env.GMAIL_USER}>`,
      to: process.env.NOTIFICATION_EMAIL,
      subject: `🚨 [Caccin Monitor] ${subject}`,
      html: `<p><strong>Errore rilevato nel sistema:</strong></p><p>${message}</p>`
    });
    console.log('Email di notifica inviata con successo tramite Gmail.');
  } catch (error) {
    console.error('Errore durante l\'invio della mail:', error);
  }
}

test('Controllo completo stato sito e moduli', async ({ page }) => {
  const targetUrl = process.env.TARGET_URL || 'https://tuosito.it';
  let errors = [];

  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(`Errore JS: ${msg.text()}`);
    }
  });

  try {
    const startTime = Date.now();
    const response = await page.goto(targetUrl, { waitUntil: 'domcontentloaded' });
    const responseTime = Date.now() - startTime;

    if (!response || response.status() >= 400) {
      throw new Error(`Sito non raggiungibile o errore HTTP: ${response ? response.status() : 'Nessuna risposta'}`);
    }

    console.log(`Tempo di risposta: ${responseTime}ms`);

    if (!targetUrl.startsWith('https://')) {
      errors.push('Il protocollo non è HTTPS');
    }

    if (errors.length > 0) {
      const errorHtml = errors.join('<br>');
      await sendAlert('Problemi rilevati sul sito', errorHtml);
      expect(errors.length).toBe(0);
    }

  } catch (error) {
    await sendAlert('Sito Offline o Errore Critico', error.message);
    throw error;
  }
});
