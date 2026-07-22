import { Banknote, Landmark, TrendingUp, Users, Wallet } from "lucide-react";
import type { DashboardData } from "../types";
import { fMoney, fNum } from "../lib/metrics";
import { Card, Kpi, MonthChip, PageHead } from "../components/ui";
import { ApiladasComision, ComparativoMensual, LineaEvolucion } from "../components/charts";
import { acumulado } from "../lib/metrics";

export function Comisiones({ data }: { data: DashboardData }) {
  const { totals: t, currentMonth: cm } = data;
  const s = t.series;

  const porAsesor = data.advisors
    .filter((a) => a.totales.comTotal > 0)
    .sort((a, b) => b.totales.comTotal - a.totales.comTotal)
    .map((a) => ({ nombre: a.nombre, Oficina: a.totales.comOficina, Asesor: a.totales.comAsesor }));

  return (
    <>
      <PageHead
        title="Comisiones"
        subtitle={`Ingresos por cierres ${data.year} · Comisión Oficina (columna X) y Comisión Asesor (columna Y)`}
        tools={<MonthChip current={cm} previous={data.previousMonth} year={data.year} />}
      />

      <div className="grid kpi-grid section">
        <Kpi label="Comisión Oficina (X)" value={fMoney(t.comOficina)} icon={<Landmark size={16} />} />
        <Kpi label="Comisión Asesor (Y)" value={fMoney(t.comAsesor)} icon={<Wallet size={16} />} />
        <Kpi label="Comisión Total (X + Y)" value={fMoney(t.comTotal)} icon={<Banknote size={16} />} />
        <Kpi label="Ticket promedio por cierre" value={fMoney(t.ticketPromedio)} icon={<TrendingUp size={16} />} sub={<span>{fNum(t.cierres)} cierres en {data.year}</span>} />
      </div>

      <div className="two-col section">
        <Card title="Comisión Oficina vs Comisión Asesor por mes" icon={<Landmark size={14} />}>
          <ComparativoMensual a={s.comOficina} b={s.comAsesor} nombreA="Oficina" nombreB="Asesor" hasta={cm} money />
        </Card>
        <Card title="Comisión total acumulada" icon={<TrendingUp size={14} />}>
          <LineaEvolucion series={acumulado(s.comOficina.map((v, i) => v + s.comAsesor[i]))} hasta={cm} />
        </Card>
      </div>

      <div className="section">
        <Card title="Comisiones por asesor · apilado Oficina + Asesor" icon={<Users size={14} />}>
          <ApiladasComision data={porAsesor} />
        </Card>
      </div>
    </>
  );
}
