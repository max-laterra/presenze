/* ============================================================
   La Terra – Registro presenze
   Questo file fa funzionare l'app anche senza rete e la fa
   partire subito, perché tiene da parte una copia delle pagine.

   Quando carichi una versione nuova dell'app su GitHub, cambia
   il numero qui sotto: è così che i telefoni si accorgono che
   c'è qualcosa di nuovo da prendere.
   ============================================================ */

const VERSIONE = 'presenze-1.9';

const DA_TENERE = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icona-192.png',
  './icona-512.png',
  './icona-mask-192.png',
  './icona-mask-512.png',
];

// Appena installato, mette da parte le pagine.
self.addEventListener('install', (evento) => {
  evento.waitUntil(
    caches.open(VERSIONE)
      .then((magazzino) => magazzino.addAll(DA_TENERE))
      .then(() => self.skipWaiting())
  );
});

// Quando entra in servizio, butta le copie delle versioni vecchie.
self.addEventListener('activate', (evento) => {
  evento.waitUntil(
    caches.keys()
      .then((nomi) => Promise.all(
        nomi.filter((n) => n !== VERSIONE).map((n) => caches.delete(n))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (evento) => {
  const richiesta = evento.request;
  if (richiesta.method !== 'GET') return;

  const indirizzo = new URL(richiesta.url);
  if (indirizzo.origin !== self.location.origin) return;   // caratteri e simili: lasciamoli al browser

  // Le chiamate all'archivio online non si tengono MAI da parte: se le
  // tenessimo, il telefono continuerebbe a rivedere i dati di prima e la
  // sincronizzazione sembrerebbe funzionare senza portare niente di nuovo.
  if (indirizzo.pathname.indexOf('/rest/') === 0
      || indirizzo.pathname.indexOf('/auth/') === 0
      || indirizzo.search) return;

  // L'app: si prova la rete, così un aggiornamento arriva subito.
  // Se la rete non c'è, si usa la copia tenuta da parte.
  if (richiesta.mode === 'navigate' || indirizzo.pathname.endsWith('.html')) {
    evento.respondWith(
      fetch(richiesta)
        .then((risposta) => {
          const copia = risposta.clone();
          caches.open(VERSIONE).then((m) => m.put(richiesta, copia));
          return risposta;
        })
        .catch(() => caches.match(richiesta).then((c) => c || caches.match('./index.html')))
    );
    return;
  }

  // Icone e scheda: prima la copia, che non cambiano mai.
  evento.respondWith(
    caches.match(richiesta).then((copia) => copia || fetch(richiesta).then((risposta) => {
      const salva = risposta.clone();
      caches.open(VERSIONE).then((m) => m.put(richiesta, salva));
      return risposta;
    }))
  );
});
