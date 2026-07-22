import {
  Banknote,
  Briefcase,
  Building2,
  CheckCircle2,
  Clock,
  Eye,
  Filter,
  Inbox,
  Landmark,
  LineChart,
  Percent,
  Route,
  Target,
  TrendingUp,
  Trophy,
  Wallet,
} from "lucide-react";
import type { DashboardData } from "../types";
import { META_COHORTE, MESES_CORTOS, MESES_LARGOS } from "../config";
import {
  acumulado,
  conversion,
  fMoney,
  fNum,
  fPct,
  mayorCrecimiento,
  mayorProduccion,
  nivelSemaforo,
  safeDiv,
} from "../lib/metrics";
import { Card, Delta, Kpi, MonthChip, PageHead, Progress, SemaforoBadge } from "../components/ui";
import { BarrasHorizontales, ComparativoMensual, LineaEvolucion } from "../components/charts";

export function Resumen({ data }: { data: DashboardData }) {
  const { totals: t, currentMonth: cm, previousMonth: pm } = data;
  const s = t.series;
  const mesIdx = cm - 1;
  const prevIdx = pm ? pm - 1 : null;

  const cohortePct = safeDiv(t.comAsesor, META_COHORTE) * 100;
  const crecimiento = mayorCrecimiento(data);
  const produccion = mayorProduccion(data);

  const convRO = conversion(t.recorridos, t.opciones);
  const convOC = conversion(t.opciones, t.cierres);
  const convGeneral = conversion(t.recorridos, t.cierres);

  const topProductores = data.advisors
    .filter((a) => a.totales.comTotal > 0)
    .sort((a, b) => b.totales.comTotal - a.totales.comTotal)
    .slice(0, 8)
    .map((a) => ({ nombre: a.nombre, valor: a.totales.comTotal }));

  return (
    <>
      <PageHead
        title="Resumen Ejecutivo"
        subtitle={`Desempeño comercial acumulado enero – ${MESES_LARGOS[mesIdx].toLowerCase()} ${data.year}`}
        tools={<MonthChip current={cm} previous={pm} year={data.year} />}
      />

      {/* Indicadores principales */}
      <div className="grid kpi-grid section">
        <Kpi
          label="Total Leads"
          value={fNum(t.leads)}
          icon={<Inbox size={16} />}
          sub={prevIdx !== null && <Delta actual={s.leads[mesIdx]} anterior={s.leads[prevIdx]} />}
        />
        <Kpi
          label="Total Recorridos"
          value={fNum(t.recorridos)}
          icon={<Route size={16} />}
          sub={prevIdx !== null && <Delta actual={s.recorridos[mesIdx]} anterior={s.recorridos[prevIdx]} />}
        />
        <Kpi
          label="Total Opciones"
          value={fNum(t.opciones)}
          icon={<Eye size={16} />}
          sub={prevIdx !== null && <Delta actual={s.opciones[mesIdx]} anterior={s.opciones[prevIdx]} />}
        />
        <Kpi
          label="Propiedades Opcionadas"
          value={fNum(t.opcionadas)}
          icon={<Building2 size={16} />}
          sub={prevIdx !== null && <Delta actual={s.opcionadas[mesIdx]} anterior={s.opcionadas[prevIdx]} />}
        />
        <Kpi
          label="Total Apartados"
          value={fNum(t.apartados)}
          icon={<Briefcase size={16} />}
          sub={prevIdx !== null && <Delta actual={s.apartados[mesIdx]} anterior={s.apartados[prevIdx]} />}
        />
        <Kpi
          label="Total Cierres"
          value={fNum(t.cierres)}
          icon={<CheckCircle2 size={16} />}
          sub={prevIdx !== null && <Delta actual={s.cierres[mesIdx]} anterior={s.cierres[prevIdx]} />}
        />
        <Kpi
          label="Operaciones Pendientes"
          value={fNum(t.pendientes)}
          icon={<Clock size={16} />}
          sub={<span>Apartadas sin cerrar</span>}
        />
      </div>

      {/* Indicadores financieros */}
      <div className="grid kpi-grid section">
        <Kpi label="Comisión Oficina" value={fMoney(t.comOficina)} icon={<Landmark size={16} />} sub={<span>Columna X · cierres {data.year}</span>} />
        <Kpi label="Comisión Asesor" value={fMoney(t.comAsesor)} icon={<Wallet size={16} />} sub={<span>Columna Y · cierres {data.year}</span>} />
        <Kpi label="Comisión Total" value={fMoney(t.comTotal)} icon={<Banknote size={16} />} sub={<span>{fNum(t.cierresPagados)} de {fNum(t.cierres)} cierres pagados</span>} />
        <Kpi label="Ticket Promedio" value={fMoney(t.ticketPromedio)} icon={<TrendingUp size={16} />} sub={<span>Comisión total por cierre</span>} />
      </div>

      {/* Conversiones + destacados */}
      <div className="grid kpi-grid section">
        <Kpi label="Conversión Recorrido → Opción" value={fPct(convRO)} icon={<Percent size={16} />} />
        <Kpi label="Conversión Opción → Cierre" value={fPct(convOC)} icon={<Percent size={16} />} />
        <Kpi label="Conversión General" value={fPct(convGeneral)} icon={<Filter size={16} />} sub={<span>Recorrido → Cierre</span>} />
        <Kpi
          label="Mayor Crecimiento"
          value={crecimiento ? crecimiento.advisor.nombre.split(" ").slice(0, 2).join(" ") : "—"}
          icon={<TrendingUp size={16} />}
          sub={crecimiento && <span>{crecimiento.diff >= 0 ? "+" : ""}{crecimiento.diff} cierres vs {pm ? MESES_CORTOS[pm - 1] : ""}</span>}
        />
        <Kpi
          label="Mayor Producción"
          value={produccion ? produccion.nombre.split(" ").slice(0, 2).join(" ") : "—"}
          icon={<Trophy size={16} />}
          sub={produccion && <span>{fMoney(produccion.totales.comTotal)} anual</span>}
        />
      </div>

      {/* Cohorte */}
      <div className="section">
        <Card title="Cumplimiento del Cohorte · Comisión Asesor (columna Y)" icon={<Target size={14} />} className="highlight-card">
          <div style={{ display: "flex", flexWrap: "wrap", gap: 28, alignItems: "center", marginBottom: 14 }}>
            <div>
              <div className="kpi-value num" style={{ fontSize: 28 }}>{fMoney(t.comAsesor)}</div>
              <div className="kpi-sub">Comisión acumulada {data.year}</div>
            </div>
            <div>
              <div className="kpi-value num" style={{ fontSize: 20, color: "var(--text-2)" }}>{fMoney(META_COHORTE)}</div>
              <div className="kpi-sub">Meta del cohorte</div>
            </div>
            <div>
              <div className="kpi-value num" style={{ fontSize: 20, color: "var(--text-2)" }}>{fMoney(Math.max(META_COHORTE - t.comAsesor, 0))}</div>
              <div className="kpi-sub">Faltante</div>
            </div>
            <SemaforoBadge pct={cohortePct} />
          </div>
          <Progress pct={cohortePct} nivel={nivelSemaforo(cohortePct)} />
        </Card>
      </div>

      {/* Embudo + evolución */}
      <div className="two-col section">
        <Card title="Embudo Comercial · acumulado anual" icon={<Filter size={14} />}>
          <Embudo recorridos={t.recorridos} opciones={t.opciones} apartados={t.apartados} cierres={t.cierres} />
        </Card>
        <Card title="Evolución Anual · comisión total acumulada" icon={<LineChart size={14} />}>
          <LineaEvolucion series={acumulado(s.comOficina.map((v, i) => v + s.comAsesor[i]))} hasta={cm} />
        </Card>
      </div>

      <div className="two-col section">
        <Card title={`Comparativo Mensual · cierres vs apartados`} icon={<Briefcase size={14} />}>
          <ComparativoMensual a={s.apartados} b={s.cierres} nombreA="Apartados" nombreB="Cierres" hasta={cm} />
        </Card>
        <Card title="Top Productores · comisión total anual" icon={<Trophy size={14} />}>
          <BarrasHorizontales data={topProductores} money alto={topProductores.length * 34 + 30} />
          <div className="kpi-sub" style={{ marginTop: 8 }}>Selecciona un asesor en la sección Asesores para ver su panel completo.</div>
        </Card>
      </div>
    </>
  );
}

function Embudo({ recorridos, opciones, apartados, cierres }: { recorridos: number; opciones: number; apartados: number; cierres: number }) {
  const max = Math.max(recorridos, 1);
  const pasos = [
    { label: "Recorridos", v: recorridos, conv: null as number | null },
    { label: "Opciones", v: opciones, conv: conversion(recorridos, opciones) },
    { label: "Apartados", v: apartados, conv: conversion(opciones, apartados) },
    { label: "Cierres", v: cierres, conv: conversion(apartados, cierres) },
  ];
  return (
    <div className="funnel">
      {pasos.map((p) => (
        <div className="funnel-step" key={p.label}>
          <span className="fl">{p.label}</span>
          <div className="funnel-bar num" style={{ width: `${Math.max(safeDiv(p.v, max) * 100, 4)}%` }}>{fNum(p.v)}</div>
          <span className="funnel-conv num">{p.conv === null ? "" : `${fPct(p.conv)} del paso previo`}</span>
        </div>
      ))}
    </div>
  );
}
