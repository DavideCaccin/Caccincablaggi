// DATABASE COMPATIBILITÀ CAVI E CONNETTORI - Caccin Cablaggi
const dbConfiguratore = {
    cavi: [
        {
            id: "unip_15",
            tipo: "Unipolare",
            nome: "Cavo Unipolare N07V-K 1,5 mm²",
            sezione: "1,5 mm²",
            conduttori: 1,
            prezzoMetro: 0.40,
            connettoriA: ["terminale_tubolare", "puntale", "nessuno"],
            connettoriB: ["terminale_tubolare", "puntale", "nessuno"]
        },
        {
            id: "unip_25",
            tipo: "Unipolare",
            nome: "Cavo Unipolare N07V-K 2,5 mm²",
            sezione: "2,5 mm²",
            conduttori: 1,
            prezzoMetro: 0.60,
            connettoriA: ["terminale_tubolare", "puntale", "nessuno"],
            connettoriB: ["terminale_tubolare", "puntale", "nessuno"]
        },
        {
            id: "mult_3g075",
            tipo: "Multipolare",
            nome: "Cavo Multipolare 3G0,75 mm² (Fror/H05VV-F)",
            sezione: "0,75 mm²",
            conduttori: 3,
            prezzoMetro: 1.40,
            connettoriA: ["m12_3poli", "jst_xh", "terminale_tubolare", "nessuno"],
            connettoriB: ["m12_3poli", "jst_xh", "terminale_tubolare", "nessuno"]
        },
        {
            id: "mult_4x075",
            tipo: "Multipolare",
            nome: "Cavo Multipolare 4x0,75 mm² (LAPP)",
            sezione: "0,75 mm²",
            conduttori: 4,
            prezzoMetro: 1.80,
            connettoriA: ["m12_4poli", "harting_4poli", "jst_xh", "nessuno"],
            connettoriB: ["m12_4poli", "harting_4poli", "jst_xh", "nessuno"]
        },
        {
            id: "schermato_4x050",
            tipo: "Schermato",
            nome: "Cavo Schermato LiYCY 4x0,50 mm²",
            sezione: "0,50 mm²",
            conduttori: 4,
            prezzoMetro: 2.20,
            connettoriA: ["m12_4poli_schermato", "subd_9", "nessuno"],
            connettoriB: ["m12_4poli_schermato", "subd_9", "nessuno"]
        },
        {
            id: "coassiale_rg58",
            tipo: "Coassiale",
            nome: "Cavo Coassiale RG58 50 Ohm",
            sezione: "5 mm (diametro)",
            conduttori: 1,
            prezzoMetro: 1.10,
            connettoriA: ["bnc_maschio", "sma_maschio"],
            connettoriB: ["bnc_maschio", "sma_maschio", "nessuno"]
        },
        {
            id: "cat6_lan",
            tipo: "Ethernet",
            nome: "Cavo U/UTP Cat 6",
            sezione: "AWG 24",
            conduttori: 8,
            prezzoMetro: 1.20,
            connettoriA: ["rj45_cat6"],
            connettoriB: ["rj45_cat6", "nessuno"]
        },
        {
            id: "usb_cavo",
            tipo: "USB",
            nome: "Cavo Dati USB High-Speed 4 fili",
            sezione: "Standard",
            conduttori: 4,
            prezzoMetro: 1.50,
            connettoriA: ["usb_a_maschio", "usb_c_maschio"],
            connettoriB: ["usb_b_maschio", "usb_c_maschio", "micro_usb"]
        },
        {
            id: "fotovoltaico_6",
            tipo: "Fotovoltaico",
            nome: "Cavo Solare Unipolare 6 mm² Rosso/Nero",
            sezione: "6 mm²",
            conduttori: 1,
            prezzoMetro: 2.10,
            connettoriA: ["mc4_maschio", "terminale_tubolare", "nessuno"],
            connettoriB: ["mc4_femmina", "terminale_tubolare", "nessuno"]
        },
        {
            id: "pot_3g25",
            tipo: "Potenza",
            nome: "Cavo Elettrico FS18 3G2,5 mm²",
            sezione: "2,5 mm²",
            conduttori: 3,
            prezzoMetro: 2.50,
            connettoriA: ["vimar_16a_spina", "harting_3poli", "nessuno"],
            connettoriB: ["vimar_16a_presa", "harting_3poli", "nessuno"]
        }
    ],

    connettori: {
        "terminale_tubolare": { nome: "Terminale a bussola preisolato", prezzo: 0.20 },
        "puntale": { nome: "Puntale nudo spellato e stagnato", prezzo: 0.15 },
        "m12_3poli": { nome: "Connettore M12 Maschio 3 poli", prezzo: 4.20 },
        "m12_4poli": { nome: "Connettore M12 Maschio 4 poli (Phoenix Contact)", prezzo: 4.50 },
        "m12_4poli_schermato": { nome: "Connettore M12 Schermato 4 poli EMC", prezzo: 6.80 },
        "harting_4poli": { nome: "Connettore Industriale Harting Han 4 Poli", prezzo: 12.00 },
        "jst_xh": { nome: "Connettore JST XH 4 poli per schedine", prezzo: 0.80 },
        "subd_9": { nome: "Connettore D-SUB 9 poli (Seriale/Can)", prezzo: 3.50 },
        "bnc_maschio": { nome: "Connettore BNC Maschio a crimpare", prezzo: 2.50 },
        "sma_maschio": { nome: "Connettore SMA Maschio RF", prezzo: 3.00 },
        "rj45_cat6": { nome: "Plug RJ45 Cat6 Schermato", prezzo: 1.50 },
        "usb_a_maschio": { nome: "Connettore USB A Maschio", prezzo: 1.20 },
        "usb_c_maschio": { nome: "Connettore USB Type-C Maschio", prezzo: 2.20 },
        "usb_b_maschio": { nome: "Connettore USB B Maschio (Stampa)", prezzo: 1.40 },
        "micro_usb": { nome: "Connettore Micro-USB Maschio", prezzo: 1.20 },
        "mc4_maschio": { nome: "Connettore fotovoltaico MC4 Maschio", prezzo: 1.80 },
        "mc4_femmina": { nome: "Connettore fotovoltaico MC4 Femmina", prezzo: 1.80 },
        "vimar_16a_spina": { nome: "Spina Elettrica Vimar 16A", prezzo: 3.50 },
        "vimar_16a_presa": { nome: "Presa Volante Vimar 16A", prezzo: 4.00 },
        "harting_3poli": { nome: "Connettore Harting 3 Poli + T Potenza", prezzo: 10.00 },
        "nessuno": { nome: "Nessun connettore (solo cavo spellato/stagnato)", prezzo: 0.00 }
    },

    opzioniExtra: [
        { id: "etichettatura", nome: "Etichettatura personalizzata", prezzo: 0.50 },
        { id: "guaina", nome: "Guaina termorestringente di protezione", prezzo: 1.00 },
        { id: "collaudo", nome: "Collaudo elettrico e test continuità", prezzo: 2.00 }
    ]
};
