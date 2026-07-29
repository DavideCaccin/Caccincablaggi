export default async function handler(req, res) {
  // Permette le richieste dal tuo sito
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
    // Qui riceveremo i dati dal tuo file HTML (nome, principio, componenti e file)
    
    // Per adesso restituiamo una risposta di test strutturata dell'IA:
    const rispostaIA = {
      positivo: "Analisi completata con successo tramite IA. I componenti inseriti risultano coerenti e dimensionati correttamente.",
      criticita: "Nessun cortocircuito rilevato nei nodi principali dello schema.",
      costo: "• Materiale stimato: ~ 900€\n• Ore di lavorazione: ~ 10 ore\n• Totale stimato: Circa 1.350€ (IVA esclusa)."
    };

    return res.status(200).json(rispostaIA);

  } catch (error) {
    return res.status(500).json({ error: 'Errore durante l\'elaborazione dell\'IA.' });
  }
}
