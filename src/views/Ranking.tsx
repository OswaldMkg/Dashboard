import { Trophy, Users } from "lucide-react";
import type { DashboardData } from "../types";
import { fMoney, fNum, rankingAdvisors } from "../lib/metrics";
import { Avatar, Card, MonthChip, PageHead } from "../components/ui";
import { BarrasHorizontales } from "../components/charts";

export function Ranking({ data, onSelect }: { data: DashboardData; onSelect: (n: string) => void }) {
  const ranking = rankingAdvisors(data).filter((a) => a.totales.comTotal > 0 || a.activo);
  const barras = ranking
    .filter((a) => a.totales.comTotal > 0)
    .map((a) => ({ nombre: a.nombre, valor: a.totales.comTotal }));

  return (
    <>
      <PageHead
        title="Ranking de Asesores"
        subtitle={`Ordenado por comisión total anual (Oficina + Asesor) · ${data.year}`}
        tools={<MonthChip current={data.currentMonth} previous={data.previousMonth} year={data.year} />}
      />

      <div className="section">
        <Card title="Producción anual por asesor" icon={<Trophy size={14} />}>
          <BarrasHorizontales data={barras} money />
        </Card>
      </div>

      <div className="section">
        <Card title="Tabla completa" icon={<Users size={14} />}>
          <div className="table-wrap">
            <table className="data">
              <thead>
                <tr>
                  <th style={{ width: 50 }}>#</th>
                  <th>Asesor</th>
                  <th className="r">Cierres</th>
                  <th className="r">Apartados</th>
                  <th className="r">Recorridos</th>
                  <th className="r">Com. Oficina</th>
                  <th className="r">Com. Asesor</th>
                  <th className="r">Com. Total</th>
                </tr>
              </thead>
              <tbody>
                {ranking.map((a, i) => (
                  <tr key={a.nombre} className="clickable" onClick={() => onSelect(a.nombre)}>
                    <td className="num" style={{ fontWeight: 700, color: i < 3 ? "var(--rx-red)" : "var(--text-3)" }}>{i + 1}</td>
                    <td>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
                        <Avatar nombre={a.nombre} muted={!a.activo} />
                        <span style={{ fontWeight: 600 }}>{a.nombre}</span>
                      </span>
                    </td>
                    <td className="r num">{fNum(a.totales.cierres)}</td>
                    <td className="r num">{fNum(a.totales.apartados)}</td>
                    <td className="r num">{fNum(a.totales.recorridos)}</td>
                    <td className="r num">{fMoney(a.totales.comOficina)}</td>
                    <td className="r num">{fMoney(a.totales.comAsesor)}</td>
                    <td className="r num" style={{ fontWeight: 700 }}>{fMoney(a.totales.comTotal)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </>
  );
}
