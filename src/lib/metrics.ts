import { SEMAFORO } from "../config";
import type { Advisor, DashboardData } from "../types";

/* ---------- Formato ---------- */
const mxn = new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 });
const mxnCents = new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0, notation: "compact" });
const numFmt = new Intl.NumberFormat("es-MX", { maximumFractionDigits: 0 });

export const fMoney = (v: number) => mxn.format(v);
export const fMoneyCompact = (v: number) => mxnCents.format(v);
export const fNum = (v: number) => numFmt.format(v);
export const fPct = (v: number, dec = 1) => `${v.toFixed(dec)}%`;

/* ---------- Semáforo ---------- */
export type Nivel = "ok" | "warn" | "bad";
export const nivelSemaforo = (pct: number): Nivel =>
  pct >= SEMAFORO.VERDE ? "ok" : pct >= SEMAFORO.AMBAR ? "warn" : "bad";
export const etiquetaSemaforo = (n: Nivel) =>
  n === "ok" ? "En meta" : n === "warn" ? "En riesgo" : "Crítico";

/* ---------- Métricas derivadas ---------- */
export const safeDiv = (a: number, b: number) => (b > 0 ? a / b : 0);

export const conversion = (a: number, b: number) => safeDiv(b, a) * 100;

export function delta(actual: number, anterior: number): { diff: number; pct: number | null } {
  const diff = actual - anterior;
  return { diff, pct: anterior > 0 ? (diff / anterior) * 100 : null };
}

export function acumulado(serie: number[]): number[] {
  let s = 0;
  return serie.map((v) => (s += v));
}

/** Ranking por comisión total anual (X+Y); desempate por cierres. */
export function rankingAdvisors(data: DashboardData): Advisor[] {
  return [...data.advisors].sort(
    (a, b) => b.totales.comTotal - a.totales.comTotal || b.totales.cierres - a.totales.cierres
  );
}

export function rankOf(data: DashboardData, nombre: string): number {
  return rankingAdvisors(data).findIndex((a) => a.nombre === nombre) + 1;
}

/** Asesor con mayor crecimiento: mayor delta de cierres del mes actual vs anterior
 *  (desempate por delta de comisión). */
export function mayorCrecimiento(data: DashboardData): { advisor: Advisor; diff: number } | null {
  const { currentMonth: cm, previousMonth: pm } = data;
  if (!pm) return null;
  let best: { advisor: Advisor; diff: number; comDiff: number } | null = null;
  for (const a of data.advisors) {
    const diff = a.cierresMes[cm - 1] - a.cierresMes[pm - 1];
    const comDiff =
      a.comOficinaMes[cm - 1] + a.comAsesorMes[cm - 1] - (a.comOficinaMes[pm - 1] + a.comAsesorMes[pm - 1]);
    if (!best || diff > best.diff || (diff === best.diff && comDiff > best.comDiff)) {
      best = { advisor: a, diff, comDiff };
    }
  }
  return best && { advisor: best.advisor, diff: best.diff };
}

export function mayorProduccion(data: DashboardData): Advisor | null {
  return rankingAdvisors(data)[0] ?? null;
}

export const iniciales = (nombre: string) =>
  nombre
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]!.toUpperCase())
    .join("");
