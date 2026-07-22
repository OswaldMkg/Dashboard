import type { ReactNode } from "react";
import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";
import { MESES_CORTOS } from "../config";
import { etiquetaSemaforo, fPct, nivelSemaforo, type Nivel, iniciales } from "../lib/metrics";

export function Card({ title, icon, children, className = "" }: { title?: string; icon?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <div className={`card ${className}`}>
      {title && (
        <div className="card-title">
          {icon}
          {title}
        </div>
      )}
      {children}
    </div>
  );
}

export function Kpi({ label, value, icon, sub }: { label: string; value: ReactNode; icon?: ReactNode; sub?: ReactNode }) {
  return (
    <div className="card kpi">
      <div className="kpi-top">
        <span className="kpi-label">{label}</span>
        {icon && <span className="kpi-icon">{icon}</span>}
      </div>
      <span className="kpi-value num">{value}</span>
      {sub && <span className="kpi-sub">{sub}</span>}
    </div>
  );
}

export function Delta({ actual, anterior, sufijo = "" }: { actual: number; anterior: number; sufijo?: string }) {
  const diff = actual - anterior;
  const cls = diff > 0 ? "up" : diff < 0 ? "down" : "flat";
  const Icon = diff > 0 ? ArrowUpRight : diff < 0 ? ArrowDownRight : Minus;
  return (
    <span className={`delta ${cls}`}>
      <Icon size={13} />
      {diff > 0 ? "+" : ""}
      {diff.toLocaleString("es-MX")}
      {sufijo} vs mes anterior
    </span>
  );
}

export function SemaforoBadge({ pct }: { pct: number }) {
  const n: Nivel = nivelSemaforo(pct);
  return (
    <span className={`badge ${n}`}>
      <span className={`dot ${n}`} />
      {etiquetaSemaforo(n)} · {fPct(Math.min(pct, 999))}
    </span>
  );
}

export function Progress({ pct, nivel }: { pct: number; nivel?: Nivel | "brand" }) {
  const n = nivel ?? nivelSemaforo(pct);
  return (
    <div className="progress" role="progressbar" aria-valuenow={Math.round(pct)} aria-valuemin={0} aria-valuemax={100}>
      <span className={n} style={{ width: `${Math.min(pct, 100)}%` }} />
    </div>
  );
}

export function Avatar({ nombre, muted = false, lg = false }: { nombre: string; muted?: boolean; lg?: boolean }) {
  return <span className={`avatar${lg ? " lg" : ""}${muted ? " muted" : ""}`}>{iniciales(nombre)}</span>;
}

export function MonthChip({ current, previous, year }: { current: number; previous: number | null; year: number }) {
  return (
    <span className="month-chip">
      {MESES_CORTOS[current - 1]} {year}
      {previous && (
        <span className="vs">vs {MESES_CORTOS[previous - 1]}</span>
      )}
    </span>
  );
}

export function PageHead({ title, subtitle, tools }: { title: string; subtitle?: string; tools?: ReactNode }) {
  return (
    <div className="page-head">
      <div className="page-title">
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
      {tools && <div className="head-tools">{tools}</div>}
    </div>
  );
}
