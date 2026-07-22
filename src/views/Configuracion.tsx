import { AlertTriangle, CalendarClock, Database, FileSpreadsheet, GitMerge, RefreshCw, Users } from "lucide-react";
import validationJson from "../generated/validation.json";
import type { DashboardData, ValidationReport } from "../types";
import { META_ANUAL_ASESOR, META_COHORTE, MESES_LARGOS } from "../config";
import { fMoney } from "../lib/metrics";
import { Card, PageHead } from "../components/ui";

const validation = validationJson as ValidationReport;

export function Configuracion({ data }: { data: DashboardData }) {
  const nombresUnicos = [...new Set(validation.nombresNormalizados)];
  const fueraRosterUnicos = [...new Set(validation.asesoresFueraDeRoster.map((s) => s.replace(/^Fila \d+: /, "")))];
  const fecha = new Date(data.generadoEl);

  return (
    <>
      <PageHead
        title="Configuración y calidad de datos"
        subtitle="Reglas del sistema, validación de los archivos fuente e instrucciones de actualización"
      />

      <div className="grid kpi-grid section">
        <Card title="Archivos fuente" icon={<FileSpreadsheet size={14} />}>
          <div className="pair-row"><span className="k">Opciones y recorridos</span><span className="v">{validation.archivos.opciones}</span></div>
          <div className="pair-row"><span className="k">Apartados y cierres</span><span className="v">{validation.archivos.apartado}</span></div>
          <div className="pair-row"><span className="k">Datos generados</span><span className="v num">{fecha.toLocaleDateString("es-MX", { day: "2-digit", month: "long", year: "numeric" })}</span></div>
          <div className="pair-row"><span className="k">Mes detectado automáticamente</span><span className="v">{MESES_LARGOS[data.currentMonth - 1]} {data.year}</span></div>
        </Card>
        <Card title="Metas configuradas" icon={<Database size={14} />}>
          <div className="pair-row"><span className="k">Meta anual por asesor (X + Y)</span><span className="v num">{fMoney(META_ANUAL_ASESOR)}</span></div>
          <div className="pair-row"><span className="k">Meta anual del cohorte (solo Y)</span><span className="v num">{fMoney(META_COHORTE)}</span></div>
          <div className="pair-row"><span className="k">Semáforo</span><span className="v">Rojo &lt;50% · Ámbar 50–74% · Verde ≥75%</span></div>
          <p style={{ fontSize: 12.5, color: "var(--text-3)", margin: "10px 0 0" }}>
            La meta del cohorte no existe en los archivos fuente; se ajusta en <code>src/config.ts</code>.
          </p>
        </Card>
      </div>

      <div className="two-col section">
        <Card title={`Registros duplicados eliminados (${validation.duplicadosEliminados.length})`} icon={<GitMerge size={14} />}>
          {validation.duplicadosEliminados.length ? (
            <ul className="list-report">{validation.duplicadosEliminados.map((d, i) => <li key={i}>{d}</li>)}</ul>
          ) : (
            <div className="empty">Sin duplicados detectados.</div>
          )}
        </Card>
        <Card title={`Fechas corregidas (${validation.fechasCorregidas.length})`} icon={<CalendarClock size={14} />}>
          {validation.fechasCorregidas.length ? (
            <ul className="list-report">{validation.fechasCorregidas.map((d, i) => <li key={i}>{d}</li>)}</ul>
          ) : (
            <div className="empty">Todas las fechas se interpretaron directamente.</div>
          )}
        </Card>
      </div>

      <div className="two-col section">
        <Card title={`Nombres normalizados entre archivos (${nombresUnicos.length})`} icon={<Users size={14} />}>
          <ul className="list-report">{nombresUnicos.map((d, i) => <li key={i}>{d}</li>)}</ul>
        </Card>
        <Card title={`Advertencias (${validation.advertencias.length + fueraRosterUnicos.length})`} icon={<AlertTriangle size={14} />}>
          {validation.advertencias.length + fueraRosterUnicos.length ? (
            <ul className="list-report">
              {fueraRosterUnicos.map((d, i) => <li key={`fr-${i}`}>{d}</li>)}
              {validation.advertencias.map((d, i) => <li key={i}>{d}</li>)}
            </ul>
          ) : (
            <div className="empty">Sin advertencias.</div>
          )}
        </Card>
      </div>

      <div className="section">
        <Card title="Cómo actualizar el dashboard cada mes" icon={<RefreshCw size={14} />}>
          <ol className="list-report" style={{ fontSize: 13.5, lineHeight: 1.9 }}>
            <li>Reemplaza los dos archivos de la carpeta <code>data/</code> por las versiones nuevas. El sistema los localiza por nombre: uno debe contener la palabra <strong>OPCIONES</strong> y el otro <strong>APARTADO</strong>; el resto del nombre no importa.</li>
            <li>Sube los cambios al repositorio (<code>git add . && git commit -m "Datos [mes]" && git push</code>).</li>
            <li>Vercel compila automáticamente: el proceso de build vuelve a leer los Excel, regenera los datos, detecta el mes más reciente y publica el dashboard actualizado. No se modifica código.</li>
            <li>Para verlo en tu computadora antes de publicar: <code>npm run dev</code>.</li>
          </ol>
        </Card>
      </div>
    </>
  );
}
