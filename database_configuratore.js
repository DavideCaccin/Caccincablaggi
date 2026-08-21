// DATABASE COMPATIBILITÀ CAVI E CONNETTORI - Caccin Cablaggi
const dbConfiguratore = {
    cavi: [
        {
            id: "mult_4x075",
            tipo: "Multipolare",
            nome: "Cavo Multipolare 4x0,75 mm² (LAPP)",
            sezione: "0,75 mm²",
            conduttori: 4,
            prezzoMetro: 1.80,
            connettoriA: ["m12_4poli", "harting_4poli", "jst_xh"],
            connettoriB: ["m12_4poli", "harting_4poli", "jst_xh", "nessuno"]
        },
        {
            id: "cat6_lan",
            tipo: "Ethernet",
            nome: "Cavo U/UTP Cat 6 (LAPP/Brand)",
            sezione: "AWG 24",
            conduttori: 8,
            prezzoMetro: 1.20,
            connettoriA: ["rj45_cat6"],
            connettoriB: ["rj45_cat6", "nessuno"]
        },
        {
            id: "pot_3g25",
            tipo: "Potenza",
            nome: "Cavo Elettrico Freetec / FS18 3G2,5 mm²",
            sezione: "2,5 mm²",
            conduttori: 3,
            prezzoMetro: 2.50,
            connettoriA: ["vimar_16a_spina", "harting_3poli"],
            connettoriB: ["vimar_16a_presa", "harting_3poli", "nessuno"]
        }
    ],

    connettori: {
        "m12_4poli": { nome: "Connettore M12 Maschio 4 poli (Phoenix Contact)", prezzo: 4.50 },
        "harting_4poli": { nome: "Connettore Industriale Harting Han 4 Poli", prezzo: 12.00 },
        "jst_xh": { nome: "Connettore JST XH 4 poli per schedine", prezzo: 0.80 },
        "rj45_cat6": { nome: "Plug RJ45 Cat6 Schermato", prezzo: 1.50 },
        "vimar_16a_spina": { nome: "Spina Elettrica Vimar 16A", prezzo: 3.50 },
        "vimar_16a_presa": { nome: "Presa Volante Vimar 16A", prezzo: 4.00 },
        "harting_3poli": { nome: "Connettore Harting 3 Poli + T", prezzo: 10.00 },
        "nessuno": { nome: "Nessun connettore (solo cavo spellato/stagnato)", prezzo: 0.00 }
    },

    opzioniExtra: [
        { id: "etichettatura", nome: "Etichettatura personalizzata", prezzo: 0.50 },
        { id: "guaina", nome: "Guaina termorestringente di protezione", prezzo: 1.00 },
        { id: "collaudo", nome: "Collaudo elettrico e test continuità", prezzo: 2.00 }
    ]
};
