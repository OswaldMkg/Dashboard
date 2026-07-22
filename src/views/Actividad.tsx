import { useMemo, useState } from "react";
import { Building2, Eye, Route, Search, Users } from "lucide-react";
import type { DashboardData } from "../types";
import { MESES_CORTOS } from "../config";
import { conversion, fNum, fPct } from "../lib/metrics";
import { Card, Delta, Kpi, MonthChip, PageHead } from "../components/ui";
import { BarrasMensuales, ComparativoMensual } from "../components/charts";

export function Actividad({ data }: { data: DashboardData }) {
  const [q, setQ] = useState("");
  const { totals: t, currentMonth: cm, previousMonth: pm } = data;
  const s = t.series;
  const ci = cm - 1;
  const pi = pm ? pm - 1 : null;

  const filas = useMemo(() => {
    const norm = (x: string) => x.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    return data.advisors
      .filter((a) => a.activo && norm(a.nombre).includes(norm(q)))
      .map((a) => ({
        nombre: a.nombre,
        recPrev: pi !== null ? a.actividad.recorridos[pi] : 0,
        recAct: a.actividad.recorridos[ci],
        opcPrev: pi !== null ? a.actividad.opciones[pi] : 0,
        opcAct: a.actividad.opciones[ci],
        opdPrev: pi !== null ? a.actividad.opcionadas[pi] : 0,
        opdAct: a.actividad.opcionadas[ci],
        recAnual: a.totales.recorridos,
        opcAnual: a.totales.opciones,
        opdAnual: a.totales.opcionadas,
      }))
      .sort((x, y) => y.recAct - x.recAct || y.opcAct - x.opcAct);
  }, [data, q, ci, pi]);

  return (
    <>
      <PageHead
        title="Recorridos y Opciones"
        subtitle="Actividad comercial de campo: recorridos, opciones mostradas y propiedades opcionadas"
        tools={<MonthChip current={cm} previous={pm} year={data.year} />}
      />

      <div className="grid kpi-grid section">
        <Kpi label="Recorridos del año" value={fNum(t.recorridos)} icon={<Route size={16} />}
          sub={pi !== null && <Delta actual={s.recorridos[ci]} anterior={s.recorridos[pi]} />} />
        <Kpi label="Opciones del año" value={fNum(t.opciones)} icon={<Eye size={16} />}
          sub={pi !== null && <Delta actual={s.opciones[ci]} anterior={s.opciones[pi]} />} />
        <Kpi label="Opcionadas del año" value={fNum(t.opcionadas)} icon={<Building2 size={16} />}
          sub={pi !== null && <Delta actual={s.opcionadas[ci]} anterior={s.opcionadas[pi]} />} />
        <Kpi label="Conversión Recorrido → Opción" value={fPct(conversion(t.recorridos, t.opciones))} icon={<Eye size={16} />} />
      </div>

      <div className="two-col section">
        <Card title="Recorridos por mes" icon={<Route size={14} />}>
          <BarrasMensuales series={s.recorridos} hasta={cm} />
        </Card>
        <Card title="Opciones por mes" icon={<Eye size={14} />}>
          <BarrasMensuales series={s.opciones} hasta={cm} color="#dc1c2e" />
        </Card>
      </div>

      <div className="section">
        <Card title="Recorridos vs opciones mostradas" icon={<Route size={14} />}>
          <ComparativoMensual a={s.recorridos} b={s.opciones} nombreA="Recorridos" nombreB="Opciones" hasta={cm} />
        </Card>
      </div>

      <div className="section">
        <Card title={`Actividad por asesor · ${MESES_CORTOS[pi ?? 0]} vs ${MESES_CORTOS[ci]}`} icon={<Users size={14} />}>
          <div style={{ marginBottom: 12 }}>
            <label className="search" style={{ maxWidth: 280 }}>
              <Search size={15} />
              <input placeholder="Buscar asesor…" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Buscar asesor" />
            </label>
          </div>
          <div className="table-wrap">
            <table className="data">
              <thead>
                <tr>
                  <th>Asesor</th>
                  <th className="r">Recorridos {pm ? MESES_CORTOS[pm - 1] : ""}</th>
                  <th className="r">Recorridos {MESES_CORTOS[ci]}</th>
                  <th className="r">Opciones {pm ? MESES_CORTOS[pm - 1] : ""}</th>
                  <th className="r">Opciones {MESES_CORTOS[ci]}</th>
                  <th className="r">Opcionadas {MESES_CORTOS[ci]}</th>
                  <th className="r">Recorridos {data.year}</th>
                  <th className="r">Opciones {data.year}</th>
                </tr>
              </thead>
              <tbody>
                {filas.map((f) => (
                  <tr key={f.nombre}>
                    <td style={{ fontWeight: 600 }}>{f.nombre}</td>
                    <td className="r num">{fNum(f.recPrev)}</td>
                    <td className="r num" style={{ fontWeight: 600, color: f.recAct > f.recPrev ? "var(--ok)" : f.recAct < f.recPrev ? "var(--bad)" : undefined }}>{fNum(f.recAct)}</td>
                    <td className="r num">{fNum(f.opcPrev)}</td>
                    <td className="r num" style={{ fontWeight: 600, color: f.opcAct > f.opcPrev ? "var(--ok)" : f.opcAct < f.opcPrev ? "var(--bad)" : undefined }}>{fNum(f.opcAct)}</td>
                    <td className="r num">{fNum(f.opdAct)}</td>
                    <td className="r num">{fNum(f.recAnual)}</td>
                    <td className="r num">{fNum(f.opcAnual)}</td>
                  </tr>
                ))}
                {!filas.length && <tr><td colSpan={8}><div className="empty">Sin resultados.</div></td></tr>}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </>
  );
}
