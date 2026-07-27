const { test, expect } = require('@playwright/test');
const nodemailer = require('nodemailer');

const transporter = process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD ? nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD
  }
}) : null;

async function sendAlertEmail(errorDetails) {
  if (!transporter || !process.env.NOTIFICATION_EMAIL) {
    console.log(`[EMAIL SIMULATA - ANOMALIA] ${errorDetails}`);
    return;
  }
  
  try {
    let info = await transporter.sendMail({
      from: `"Caccin Monitor Alert" <${process.env.GMAIL_USER}>`,
      to: process.env.NOTIFICATION_EMAIL,
      subject: '🚨 [ATTENZIONE] Anomalia rilevata sul tuo sito!',
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 2px solid #ef4444; border-radius: 8px; padding: 20px;">
          <h2 style="color: #ef4444; margin-top: 0;">🚨 Rilevata un'anomalia sul sito!</h2>
          <p>Il controllo giornaliero automatico ha riscontrato un problema:</p>
          <div style="background: #fef2f2; border-left: 4px solid #ef4444; padding: 12px; margin: 15px 0; font-family: monospace; color: #991b1b;">
            ${errorDetails}
          </div>
          <p style="font-size: 13px; color: #64748b;">Verifica subito lo stato del server o del sito web.</p>
        </div>
      `
    });
    console.log('Email di allerta inviata con successo. ID:', info.messageId);
  } catch (error) {
    console.error('ERRORE durante l\'invio della mail di allerta:', error);
  }
}

test('Controllo giornaliero stato sito', async ({ page }) => {
  const targetUrl = process.env.TARGET_URL || 'https://tuosito.it';

  try {
    const response = await page.goto(targetUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });

    if (!response || response.status() >= 400) {
      throw new Error(`Il sito ha restituito un codice di stato HTTP non valido: ${response ? response.status() : 'Nessuna risposta'}`);
    }

    console.log('Controllo completato con successo: il sito è online e funzionante.');
  } catch (error) {
    console.error('Errore durante il monitoraggio:', error.message);
    // Invia l'email solo se il test fallisce (sito giù o errore)
    await sendAlertEmail(error.message);
    throw error; // Fa fallire ufficialmente l'azione su GitHub
  }
});
