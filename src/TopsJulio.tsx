import { useRef, useState } from 'react';
import type { RefObject } from 'react';
import { capturar } from '../lib/captura';
import { julio2026 } from '../data/julio2026Tops';
import type { ClaveTop } from '../data/julio2026Tops';
import './tops-teams.css';

const ORDEN: ClaveTop[] = ['recorridos', 'mostradas', 'opcionadas', 'rentas', 'ventas'];

const mxn = (n: number) =>
  n.toLocaleString('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 });

const num = (n: number) => (Number.isInteger(n) ? String(n) : n.toFixed(1));

function IconoCamara() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  );
}

export function BotonCaptura({
  destino,
  archivo,
  etiqueta = 'Capturar',
  solido = false,
  onAviso,
}: {
  destino: RefObject<HTMLElement | null>;
  archivo: string;
  etiqueta?: string;
  solido?: boolean;
  onAviso: (m: string) => void;
}) {
  const [ocupado, setOcupado] = useState(false);

  const tomar = async () => {
    const nodo = destino.current;
    if (!nodo) return;
    setOcupado(true);
    nodo.classList.add('tt-capturando');
    try {
      onAviso(await capturar(nodo, archivo));
    } catch (e) {
      onAviso(e instanceof Error ? e.message : 'No se pudo generar la imagen');
    } finally {
      nodo.classList.remove('tt-capturando');
      setOcupado(false);
    }
  };

  return (
    <button
      type="button"
      className={`tt-cap${solido ? ' tt-cap--solid' : ''}`}
      onClick={tomar}
      disabled={ocupado}
      title="Descarga la imagen y la copia al portapapeles"
    >
      <IconoCamara />
      {ocupado ? 'Generando…' : etiqueta}
    </button>
  );
}

export function useAviso() {
  const [aviso, setAviso] = useState<string | null>(null);
  const mostrar = (m: string) => {
    setAviso(m);
    window.setTimeout(() => setAviso(null), 2600);
  };
  return { aviso, mostrar };
}

function TarjetaTop({ clave, onAviso }: { clave: ClaveTop; onAviso: (m: string) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const bloque = julio2026.tops[clave];
  const tope = Math.max(...bloque.items.map((i) => i.valor), 1);
  const empates = new Set(
    bloque.items.filter((i, _, a) => a.filter((x) => x.lugar === i.lugar).length > 1).map((i) => i.lugar)
  );

  return (
    <section className="tt-card" ref={ref}>
      <header className="tt-card__top">
        <div>
          <h3 className="tt-card__title">{bloque.titulo}</h3>
          <p className="tt-card__note">{bloque.nota}</p>
        </div>
        <BotonCaptura destino={ref} archivo={`top-${clave}-julio-2026`} onAviso={onAviso} />
      </header>

      <div className="tt-rows">
        {bloque.items.map((it, i) => (
          <div key={`${it.nombre}-${i}`} className={`tt-row tt-row--${it.lugar}`}>
            <div className="tt-row__bar" style={{ width: `${Math.max(12, (it.valor / tope) * 100)}%` }} />
            <span className="tt-place">{it.lugar}</span>
            <span>
              <span className="tt-name">{it.nombre}</span>
              <span className="tt-meta">
                {[
                  it.ops ? `${it.ops} ${it.ops > 1 ? 'operaciones cerradas' : 'operación cerrada'}` : '',
                  empates.has(it.lugar) ? 'empate' : '',
                ].filter(Boolean).join(' · ')}
              </span>
            </span>
            <span className="tt-val">
              {bloque.moneda ? mxn(it.valor) : num(it.valor)}
              {!bloque.moneda && <small>{bloque.unidad}</small>}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function TopsJulio() {
  const ref = useRef<HTMLDivElement>(null);
  const { aviso, mostrar } = useAviso();

  return (
    <div className="tt-root" ref={ref}>
      <header className="tt-head">
        <div>
          <p className="tt-eyebrow">RE/MAX Terra · {julio2026.periodo}</p>
          <h2 className="tt-title">Tops del mes</h2>
          <p className="tt-sub">
            Actividad registrada durante julio y operaciones cerradas dentro de julio. Los montos de
            renta y venta son el total de la operación, no la comisión.
          </p>
        </div>
        <BotonCaptura destino={ref} archivo="tops-julio-2026" etiqueta="Capturar todo" solido onAviso={mostrar} />
      </header>

      <div className="tt-grid">
        {ORDEN.map((k) => (
          <TarjetaTop key={k} clave={k} onAviso={mostrar} />
        ))}
      </div>

      <p className="tt-foot">
        Atribución por Asesor 1 en cada operación. Un mismo lugar repetido indica empate.
      </p>

      {aviso && <div className="tt-toast">{aviso}</div>}
    </div>
  );
}
