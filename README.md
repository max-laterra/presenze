# La Terra – Registro presenze

**Versione 1.11** — 6 novembre 2026

Il numero di versione è scritto anche nell'app, in fondo alla pagina:
«La Terra · Registro presenze — versione 1.11».
Serve a controllare quale versione è arrivata dopo un aggiornamento.

---

## I file di questo pacchetto

Vanno caricati tutti nella radice del repository **presenze** su GitHub
(Add file › Upload files, poi Commit changes).

| File | A cosa serve |
|---|---|
| `index.html` | **È l'app.** |
| `sw.js` | Fa funzionare l'app anche senza rete e la aggiorna (versione interna `presenze-1.11`). |
| `manifest.webmanifest` | Nome e icona dell'app sulla schermata Home. |
| `icona-192.png`, `icona-512.png`, `icona-mask-192.png`, `icona-mask-512.png` | Le icone. |
| `README.md` | Questo file. |

Nota: su GitHub c'è anche un vecchio file **`sw (1).js`** (versione 1.8,
nato da un caricamento doppio). L'app non lo usa: si può cancellare.

Dopo il caricamento: chiudi del tutto l'app, aspetta 10 minuti e riaprila.
In fondo alla pagina deve esserci «versione 1.11».

---

## Modifiche della versione 1.11

Va insieme all'**app autisti 1.13** e al **servizio notifiche 1.8**.

### Chi ha visto il riposo o la rimessa di domani
Quando l'autista preme **OK** sull'animazione del riposo o della rimessa di
domani nella sua app, la conferma arriva qui entro un paio di minuti.
- **Pagina del giorno**, solo **da domani in poi** e solo per gli autisti che
  hanno l'app 1.13:
  - Riposo 🏡 in **bianco e nero** finché l'autista non preme OK, **a colori** dopo;
  - Rimessa **R** e riposo compensativo **RC** **grigi** finché non preme OK,
    **in grassetto** con il loro colore dopo.
- Oggi e i giorni passati restano come prima. Anche gli autisti senza l'app
  1.13 restano come prima.
- In cima alla pagina di **oggi** e di **domani**, un riquadro blu: «Non hanno
  ancora visto il giorno di domani: …», con il tasto **«Vai a domani»**.
- Toccando un autista: «Visto dall'autista … alle …» oppure «Non ancora visto
  dall'autista».
- **Foglio del mese** (Riepilogo): stessa regola per i giorni da domani in poi.
- Se si cambia un giorno già visto (per esempio da riposo a rimessa), torna
  grigio finché l'autista non preme di nuovo OK.
- Con l'app aperta le conferme si aggiornano da sole ogni 2 minuti, oltre che
  a ogni allineamento.
- Le conferme arrivano dalla tabella **impostazioni** dell'archivio (riga
  «visti_autisti», la scrive il servizio notifiche): **non serve nessuna
  istruzione nuova in Supabase**.
- Il file Excel per il commercialista non cambia.

---

## Modifiche della versione 1.10

- **Vista dal computer sistemata**: sugli schermi grandi (da 900 pixel in su)
  la pagina non è più decentrata. Le pagine strette (giorno, dipendenti,
  pasti, note) sono una colonna di 760 pixel al centro dello schermo, la barra
  delle schede in basso è centrata e larga quanto il contenuto, e i pulsanti
  non si allungano più su tutta la larghezza.
- **Riposi in rosso nel file Excel**: nel foglio mensile esportato i giorni
  di riposo sono scritti in rosso e in grassetto, così si vedono subito.
- Nessun altro cambiamento: il funzionamento sul telefono e il collegamento
  con l'App Autista restano come nella versione precedente.
