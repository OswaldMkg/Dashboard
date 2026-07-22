import { Target, Users } from "lucide-react";
import type { DashboardData } from "../types";
import { META_COHORTE } from "../config";
import { fMoney, nivelSemaforo, safeDiv } from "../lib/metrics";
import { Avatar, Card, MonthChip, PageHead, Progress, SemaforoBadge } from "../components/ui";

export function Metas({ data, onSelect }: { data: DashboardData; onSelect: (n: string) => void }) {
  const cohortePct = safeDiv(data.totals.comAsesor, META_COHORTE) * 100;

  const lista = data.advisors
    .filter((a) => a.activo && a.metaIndividual != null && a.metaIndividual > 0)
    .map((a) => ({ a, pct: safeDiv(a.totales.comTotal, a.metaIndividual!) * 100 }))
    .sort((x, y) => y.pct - x.pct);
  const sinMeta = data.advisors.filter((a) => a.activo && !(a.metaIndividual != null && a.metaIndividual > 0));

  const enMeta = lista.filter((x) => x.pct >= 75).length;
  const enRiesgo = lista.filter((x) => x.pct >= 50 && x.pct < 75).length;
  const criticos = lista.filter((x) => x.pct < 50).length;

  return (
    <>
      <PageHead
        title="Metas"
        subtitle="Meta individual escalonada por antigüedad (Comisión Oficina + Comisión Asesor)"
        tools={<MonthChip current={data.currentMonth} previous={data.previousMonth} year={data.year} />}
      />

      <div className="section">
        <Card title="Cumplimiento del Cohorte · columna Y (Comisión Asesor)" icon={<Target size={14} />} className="highlight-card">
          <div style={{ display: "flex", flexWrap: "wrap", gap: 28, alignItems: "center", marginBottom: 14 }}>
            <div>
              <div className="kpi-value num" style={{ fontSize: 26 }}>{fMoney(data.totals.comAsesor)}</div>
              <div className="kpi-sub">Acumulado {data.year}</div>
            </div>
            <div>
              <div className="kpi-value num" style={{ fontSize: 19, color: "var(--text-2)" }}>{fMoney(META_COHORTE)}</div>
              <div className="kpi-sub">Meta anual del cohorte</div>
            </div>
            <SemaforoBadge pct={cohortePct} />
            <div style={{ display: "flex", gap: 8, marginLeft: "auto", flexWrap: "wrap" }}>
              <span className="badge ok"><span className="dot ok" /> {enMeta} en meta</span>
              <span className="badge warn"><span className="dot warn" /> {enRiesgo} en riesgo</span>
              <span className="badge bad"><span className="dot bad" /> {criticos} críticos</span>
            </div>
          </div>
          <Progress pct={cohortePct} nivel={nivelSemaforo(cohortePct)} />
        </Card>
      </div>

      <div className="section">
        <Card title="Avance individual hacia la meta anual" icon={<Users size={14} />}>
          <div className="table-wrap">
            <table className="data">
              <thead>
                <tr>
                  <th>Asesor</th>
                  <th className="r">Antigüedad</th>
                  <th className="r">Meta al mes</th>
                  <th className="r">Acumulado (X + Y)</th>
                  <th className="r">Restante</th>
                  <th style={{ width: "22%" }}>Avance</th>
                  <th>Semáforo</th>
                </tr>
              </thead>
              <tbody>
                {lista.map(({ a, pct }) => (
                  <tr key={a.nombre} className="clickable" onClick={() => onSelect(a.nombre)}>
                    <td>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
                        <Avatar nombre={a.nombre} />
                        <span style={{ fontWeight: 600 }}>{a.nombre}</span>
                      </span>
                    </td>
                    <td className="r num">{a.mesesAntiguedad} m</td>
                    <td className="r num">{fMoney(a.metaIndividual!)}</td>
                    <td className="r num">{fMoney(a.totales.comTotal)}</td>
                    <td className="r num">{fMoney(Math.max(a.metaIndividual! - a.totales.comTotal, 0))}</td>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ flex: 1 }}><Progress pct={pct} /></div>
                        <span className="num" style={{ fontSize: 12, fontWeight: 600, minWidth: 44, textAlign: "right" }}>{pct.toFixed(1)}%</span>
                      </div>
                    </td>
                    <td><SemaforoBadge pct={pct} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {sinMeta.length > 0 && (
            <p style={{ fontSize: 12.5, color: "var(--text-3)", marginTop: 12 }}>
              {sinMeta.length} asesor{sinMeta.length > 1 ? "es" : ""} sin meta calculada (en capacitación o sin fecha de ingreso registrada): {sinMeta.map((a) => a.nombre).join(", ")}.
            </p>
          )}
        </Card>
      </div>
    </>
  );
}
