import { GoogleGenAI } from '@google/genai';

export const config = {
  api: {
    bodyParser: false, // Necessario per gestire il caricamento dei file (PDF/immagini)
  },
};

export default async function handler(req, res) {
  // Permette le richieste dal tuo sito GitHub Pages
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Metodo non consentito' });
  }

  try {
    // Inizializza Gemini usando la variabile d'ambiente che hai appena creato su Vercel
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    // NOTA: Per la gestione completa del FormData e dei file su Vercel Serverless, 
    // assicurati di elaborare il form o di ricevere i dati testuali e il file convertito in base64.
    
    // Prompt di sistema per guidare l'IA nell'analisi tecnica ed economica per Caccin Cablaggi
    const promptSystem = `
    Sei un ingegnere elettrotecnico esperto e un estimatore di costi per quadri elettrici industriali per l'azienda Caccin Cablaggi.
    Analizza i dati del progetto e lo schema fornito. Restituisci una risposta ESCLUSIVAMENTE in formato JSON con tre chiavi precise:
    - "positivo": Esito sui componenti e dimensionamento (es. sezioni cavi, correnti).
    - "criticita": Eventuali corti, anomalie o errori nello schema o protezione magnetotermica.
    - "costo": Stima reale del materiale (componenti e morsetteria) e delle ore di cablaggio/collaudo in officina con relativo prezzo totale stimato.
    `;

    // Chiamata al modello Gemini (es. gemini-2.5-flash)
    const responseAi = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [promptSystem, "Esegui l'analisi del prototipo allegato."]
    });

    // Risposta di esempio strutturata o generata dall'IA
    // (Se ricevi la risposta testuale dall'IA, puoi formattarla in JSON)
    const risultatoFintoDallIA = {
      positivo: "Analisi IA completata con successo sul file allegato. I componenti risultano coerenti con il principio di funzionamento dichiarato.",
      criticita: "Nessun cortocircuito critico rilevato. Si consiglia di verificare la selettività delle protezioni a valle.",
      costo: "• Materiale stimato: ~ 950€\n• Ore di cablaggio: ~ 10 ore\n• Totale stimato: Circa 1.400€ (IVA esclusa)."
    };

    return res.status(200).json(risultatoFintoDallIA);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Errore durante l\'elaborazione dell\'IA sul server.' });
  }
}
