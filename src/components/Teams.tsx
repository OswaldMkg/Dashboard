import { useRef } from 'react';
import type { CSSProperties } from 'react';
import { julio2026 } from '../data/agosto2026Tops';
import type { ColorTeam, Team, TotalTeam } from '../data/agosto2026Tops';
import { BotonCaptura, useAviso } from './TopsJulio';
import './tops-teams.css';

const PALETA: Record<ColorTeam, { base: string; suave: string; linea: string; texto: string }> = {
  red: { base: '#e4002b', suave: '#fde7eb', linea: '#f7bcc7', texto: '#a10020' },
  blue: { base: '#0057b8', suave: '#e5eefa', linea: '#b9d0ee', texto: '#013f86' },
  white: { base: '#5b6472', suave: '#eef1f5', linea: '#d3dae3', texto: '#3b434f' },
  green: { base: '#1e9e5a', suave: '#e5f5ec', linea: '#b6e0c8', texto: '#14713f' },
  purple: { base: '#7a4fce', suave: '#f0eafb', linea: '#d3c3f0', texto: '#563394' },
  orange: { base: '#f07314', suave: '#fdeee0', linea: '#f8cda3', texto: '#a94c07' },
};

const mxn = (n: number) =>
  n.toLocaleString('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 });

const num = (n: number) => (Number.isInteger(n) ? String(n) : n.toFixed(1));

const cifra = (n: number) => (n === 0 ? <span className="tt-zero">—</span> : Number.isInteger(n) ? n : n.toFixed(1));

const METRICAS: { clave: keyof TotalTeam; nombre: string }[] = [
  { clave: 'recorridos', nombre: 'recorridos' },
  { clave: 'mostradas', nombre: 'opciones mostradas' },
  { clave: 'opcionadas', nombre: 'propiedades opcionadas' },
  { clave: 'leads', nombre: 'leads' },
  { clave: 'rentas', nombre: 'monto en rentas' },
  { clave: 'ventas', nombre: 'monto en ventas' },
];

function lideres(teams: readonly Team[]) {
  const mapa: Record<string, string[]> = {};
  for (const m of METRICAS) {
    const tope = Math.max(...teams.map((t) => t.total[m.clave]));
    if (tope <= 0) continue;
    for (const t of teams) {
      if (t.total[m.clave] === tope) (mapa[t.nombre] ||= []).push(`1º en ${m.nombre}`);
    }
  }
  return mapa;
}

function TarjetaTeam({ team, insignias, onAviso }: { team: Team; insignias: string[]; onAviso: (m: string) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const c = PALETA[team.color];
  const estilo = {
    ['--tt-team' as string]: c.base,
    ['--tt-team-soft' as string]: c.suave,
    ['--tt-team-line' as string]: c.linea,
    ['--tt-team-ink' as string]: c.texto,
  } as CSSProperties;

  return (
    <section className="tt-card tt-team" ref={ref} style={estilo}>
      <header className="tt-card__top">
        <div>
          <h3 className="tt-team__name">
            <span className="tt-dot" />
            {team.nombre}
          </h3>
          {insignias.length > 0 && (
            <p className="tt-badges">
              {insignias.map((b) => (
                <span className="tt-badge" key={b}>{b}</span>
              ))}
            </p>
          )}
        </div>
        <BotonCaptura
          destino={ref}
          archivo={team.nombre.toLowerCase().replace(/[^a-z]+/g, '-')}
          onAviso={onAviso}
        />
      </header>

      <table className="tt-tbl">
        <thead>
          <tr>
            <th>Asesor</th>
            <th>Rec.</th>
            <th>Mostradas</th>
            <th>Captadas</th>
            <th>Leads</th>
            <th>Rentas</th>
            <th>Ventas</th>
          </tr>
        </thead>
        <tbody>
          {team.integrantes.map((p) => (
            <tr key={p.nombre}>
              <td>
                {p.nombre} {p.sinDatos && <span className="tt-nodata">· sin datos</span>}
              </td>
              <td>{cifra(p.recorridos)}</td>
              <td>{cifra(p.mostradas)}</td>
              <td>{cifra(p.opcionadas)}</td>
              <td>{cifra(p.leads)}</td>
              <td>{p.rentas ? mxn(p.rentas) : <span className="tt-zero">—</span>}</td>
              <td>{p.ventas ? mxn(p.ventas) : <span className="tt-zero">—</span>}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td>Equipo</td>
            <td>{team.total.recorridos}</td>
            <td>{team.total.mostradas}</td>
            <td>{num(team.total.opcionadas)}</td>
            <td>{team.total.leads}</td>
            <td>{mxn(team.total.rentas)}</td>
            <td>{mxn(team.total.ventas)}</td>
          </tr>
        </tfoot>
      </table>
    </section>
  );
}

export default function Teams() {
  const ref = useRef<HTMLDivElement>(null);
  const { aviso, mostrar } = useAviso();
  const teams = julio2026.teams as readonly Team[];
  const insignias = lideres(teams);

  return (
    <div className="tt-root" ref={ref}>
      <header className="tt-head">
        <div>
          <p className="tt-eyebrow">RE/MAX Terra · Equipos</p>
          <h2 className="tt-title">Teams</h2>
          <p className="tt-sub">
            Seis equipos con los mismos indicadores del mes sumados por equipo. Los montos son el
            total de la operación de lo cerrado dentro del periodo.
          </p>
        </div>
        <BotonCaptura destino={ref} archivo="teams" etiqueta="Capturar todo" solido onAviso={mostrar} />
      </header>

      <p className="tt-banner">
        <strong>Los equipos arrancan en ceros.</strong> {julio2026.teamsNota}
      </p>

      <div className="tt-grid">
        {teams.map((t) => (
          <TarjetaTeam key={t.nombre} team={t} insignias={insignias[t.nombre] ?? []} onAviso={mostrar} />
        ))}
      </div>

      <p className="tt-foot">
        Rec. = recorridos · Mostradas = opciones mostradas · Captadas = propiedades opcionadas ·
        Rentas y Ventas = total de la operación de lo cerrado en el periodo.
      </p>

      {aviso && <div className="tt-toast">{aviso}</div>}
    </div>
  );
}
