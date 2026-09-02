// Captura un nodo del DOM como PNG: lo descarga y, si el navegador lo permite,
// también lo deja en el portapapeles para pegarlo directo en WhatsApp/Slack.
// html2canvas se carga desde CDN la primera vez que se usa, así no hay que
// instalar nada en el proyecto. Si prefieres tenerlo local: npm i html2canvas
// y cambia cargarHtml2Canvas por: import html2canvas from 'html2canvas'.

const CDN = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';

let pendiente: Promise<any> | null = null;

function cargarHtml2Canvas(): Promise<any> {
  const w = window as any;
  if (w.html2canvas) return Promise.resolve(w.html2canvas);
  if (pendiente) return pendiente;
  pendiente = new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = CDN;
    s.async = true;
    s.onload = () => resolve((window as any).html2canvas);
    s.onerror = () => reject(new Error('No se pudo cargar el generador de imágenes'));
    document.head.appendChild(s);
  });
  return pendiente;
}

const MARGEN = 18; // margen blanco alrededor de la imagen final, en px de CSS

export async function capturar(nodo: HTMLElement | null, archivo: string): Promise<string> {
  if (!nodo) throw new Error('No encontré la sección a capturar');
  const html2canvas = await cargarHtml2Canvas();

  const escala = Math.min(2, window.devicePixelRatio || 1) * 1.5;
  const caja = nodo.getBoundingClientRect();

  const bruto: HTMLCanvasElement = await html2canvas(nodo, {
    backgroundColor: '#ffffff',
    scale: escala,
    useCORS: true,
    logging: false,
    // Tomar el tamaño real del contenido, no solo lo que se ve en pantalla.
    width: Math.ceil(Math.max(nodo.scrollWidth, caja.width)),
    height: Math.ceil(Math.max(nodo.scrollHeight, caja.height)),
    // Sin esto la imagen sale desfasada cuando la página está scrolleada.
    scrollX: -window.scrollX,
    scrollY: -window.scrollY,
    windowWidth: document.documentElement.scrollWidth,
    windowHeight: document.documentElement.scrollHeight,
  });

  // Marco blanco: se dibuja el resultado sobre un lienzo un poco más grande.
  const m = Math.round(MARGEN * escala);
  const canvas = document.createElement('canvas');
  canvas.width = bruto.width + m * 2;
  canvas.height = bruto.height + m * 2;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(bruto, m, m);
  }

  const blob = await new Promise<Blob>((res, rej) =>
    canvas.toBlob((b) => (b ? res(b) : rej(new Error('No se pudo generar la imagen'))), 'image/png'),
  );

  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${archivo}.png`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 4000);

  try {
    const item = new (window as any).ClipboardItem({ 'image/png': blob });
    await (navigator.clipboard as any).write([item]);
    return 'Imagen descargada y copiada al portapapeles';
  } catch {
    return 'Imagen descargada';
  }
}
