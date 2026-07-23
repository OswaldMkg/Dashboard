import { useEffect, useMemo, useState } from "react";
import {
  Briefcase,
  Home,
  Landmark,
  Menu,
  Route,
  Settings,
  Target,
  Trophy,
  Users,
} from "lucide-react";
import dashboardJson from "./generated/dashboard.json";
import type { DashboardData, SectionId } from "./types";
import { MESES_LARGOS, NOMBRE_OFICINA } from "./config";
import { fPct } from "./lib/metrics";
import { Resumen } from "./views/Resumen";
import { Asesores } from "./views/Asesores";
import { Operaciones } from "./views/Operaciones";
import { Actividad } from "./views/Actividad";
import { Comisiones } from "./views/Comisiones";
import { Metas } from "./views/Metas";
import { Ranking } from "./views/Ranking";
import { Configuracion } from "./views/Configuracion";

const data = dashboardJson as DashboardData;

const NAV: { id: SectionId; label: string; icon: typeof Home }[] = [
  { id: "resumen", label: "Resumen Ejecutivo", icon: Home },
  { id: "asesores", label: "Asesores", icon: Users },
  { id: "operaciones", label: "Operaciones", icon: Briefcase },
  { id: "actividad", label: "Recorridos y Opciones", icon: Route },
  { id: "comisiones", label: "Comisiones", icon: Landmark },
  { id: "metas", label: "Metas", icon: Target },
  { id: "ranking", label: "Ranking", icon: Trophy },
  { id: "configuracion", label: "Configuración", icon: Settings },
];

function sectionFromHash(): { section: SectionId; param: string | null } {
  const raw = window.location.hash.replace(/^#\/?/, "");
  const [section, param] = raw.split("/");
  const valid = NAV.some((n) => n.id === section);
  return { section: valid ? (section as SectionId) : "resumen", param: param ? decodeURIComponent(param) : null };
}

export default function App() {
  const [route, setRoute] = useState(sectionFromHash);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onHash = () => {
      setRoute(sectionFromHash());
      setMenuOpen(false);
      window.scrollTo({ top: 0 });
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const go = (id: SectionId, param?: string) => {
    window.location.hash = param ? `/${id}/${encodeURIComponent(param)}` : `/${id}`;
  };

  const cohortePct = data.cohorte.avancePct;

  const view = useMemo(() => {
    switch (route.section) {
      case "asesores":
        return <Asesores data={data} selected={route.param} onSelect={(n) => go("asesores", n)} onBack={() => go("asesores")} />;
      case "operaciones":
        return <Operaciones data={data} />;
      case "actividad":
        return <Actividad data={data} />;
      case "comisiones":
        return <Comisiones data={data} />;
      case "metas":
        return <Metas data={data} onSelect={(n) => go("asesores", n)} />;
      case "ranking":
        return <Ranking data={data} onSelect={(n) => go("asesores", n)} />;
      case "configuracion":
        return <Configuracion data={data} />;
      default:
        return <Resumen data={data} />;
    }
  }, [route]);

  return (
    <div className="app">
      <button className="menu-toggle" aria-label="Abrir menú" onClick={() => setMenuOpen((v) => !v)}>
        <Menu size={20} />
      </button>

      <aside className={`sidebar${menuOpen ? " open" : ""}`}>
        <div className="brand">
          <div className="brand-logo">
            <span className="re">RE</span>
            <span className="slash">/</span>
            <span className="re">MAX</span>
            <span className="terra">TERRA</span>
          </div>
          <div className="brand-sub">Dashboard Ejecutivo {data.year}</div>
        </div>
        <nav className="nav" aria-label="Secciones">
          {NAV.map(({ id, label, icon: Icon }) => (
            <button key={id} className={`nav-item${route.section === id ? " active" : ""}`} onClick={() => go(id)}>
              <Icon size={17} strokeWidth={2} />
              {label}
            </button>
          ))}
        </nav>
        <div className="sidebar-foot">
          <div className="cohorte-mini">
            <div className="cohorte-mini-label">
              <span>Cohorte</span>
              <span>{fPct(cohortePct, 0)}</span>
            </div>
            <div className="mini-track">
              <span className="mini-fill" style={{ width: `${Math.min(cohortePct, 100)}%`, display: "block" }} />
            </div>
          </div>
          {NOMBRE_OFICINA} · {MESES_LARGOS[data.currentMonth - 1]} {data.year}
        </div>
      </aside>

      <main className="main">{view}</main>
    </div>
  );
}
