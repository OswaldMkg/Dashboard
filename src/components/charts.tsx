import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { MESES_CORTOS } from "../config";
import { fMoney, fMoneyCompact, fNum } from "../lib/metrics";

const BLUE = "#003da5";
const RED = "#dc1c2e";
const BLUE_SOFT = "#7c99dc";
const GRID = "#e9edf4";
const AXIS = { fontSize: 11, fill: "#8b94a3" };

export function monthly(series: number[], hasta: number, key = "valor") {
  return series.slice(0, hasta).map((v, i) => ({ mes: MESES_CORTOS[i], [key]: v }));
}

export function BarrasMensuales({ series, hasta, color = BLUE, money = false, alto = 220 }: { series: number[]; hasta: number; color?: string; money?: boolean; alto?: number }) {
  return (
    <ResponsiveContainer width="100%" height={alto}>
      <BarChart data={monthly(series, hasta)} margin={{ top: 6, right: 8, left: money ? 8 : -14, bottom: 0 }}>
        <CartesianGrid stroke={GRID} vertical={false} />
        <XAxis dataKey="mes" tick={AXIS} axisLine={false} tickLine={false} />
        <YAxis tick={AXIS} axisLine={false} tickLine={false} tickFormatter={(v: number) => (money ? fMoneyCompact(v) : String(v))} />
        <Tooltip formatter={(v) => (money ? fMoney(Number(v)) : fNum(Number(v)))} labelStyle={{ fontWeight: 600 }} contentStyle={{ borderRadius: 8, border: "1px solid #e3e8f0", fontSize: 12 }} />
        <Bar dataKey="valor" fill={color} radius={[4, 4, 0, 0]} maxBarSize={34} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function ComparativoMensual({ a, b, nombreA, nombreB, hasta, money = false, alto = 240 }: { a: number[]; b: number[]; nombreA: string; nombreB: string; hasta: number; money?: boolean; alto?: number }) {
  const data = a.slice(0, hasta).map((v, i) => ({ mes: MESES_CORTOS[i], [nombreA]: v, [nombreB]: b[i] }));
  return (
    <ResponsiveContainer width="100%" height={alto}>
      <BarChart data={data} margin={{ top: 6, right: 8, left: money ? 8 : -14, bottom: 0 }}>
        <CartesianGrid stroke={GRID} vertical={false} />
        <XAxis dataKey="mes" tick={AXIS} axisLine={false} tickLine={false} />
        <YAxis tick={AXIS} axisLine={false} tickLine={false} tickFormatter={(v: number) => (money ? fMoneyCompact(v) : String(v))} />
        <Tooltip formatter={(v) => (money ? fMoney(Number(v)) : fNum(Number(v)))} contentStyle={{ borderRadius: 8, border: "1px solid #e3e8f0", fontSize: 12 }} />
        <Legend wrapperStyle={{ fontSize: 12 }} />
        <Bar dataKey={nombreA} fill={BLUE} radius={[4, 4, 0, 0]} maxBarSize={26} />
        <Bar dataKey={nombreB} fill={RED} radius={[4, 4, 0, 0]} maxBarSize={26} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function LineaEvolucion({ series, hasta, money = true, alto = 240 }: { series: number[]; hasta: number; money?: boolean; alto?: number }) {
  return (
    <ResponsiveContainer width="100%" height={alto}>
      <LineChart data={monthly(series, hasta)} margin={{ top: 8, right: 12, left: 8, bottom: 0 }}>
        <CartesianGrid stroke={GRID} vertical={false} />
        <XAxis dataKey="mes" tick={AXIS} axisLine={false} tickLine={false} />
        <YAxis tick={AXIS} axisLine={false} tickLine={false} tickFormatter={(v: number) => (money ? fMoneyCompact(v) : String(v))} />
        <Tooltip formatter={(v) => (money ? fMoney(Number(v)) : fNum(Number(v)))} contentStyle={{ borderRadius: 8, border: "1px solid #e3e8f0", fontSize: 12 }} />
        <Line type="monotone" dataKey="valor" stroke={BLUE} strokeWidth={2.5} dot={{ r: 3, fill: BLUE }} activeDot={{ r: 5, fill: RED }} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function BarrasHorizontales({ data, money = false, alto, resaltar = 3 }: { data: { nombre: string; valor: number }[]; money?: boolean; alto?: number; resaltar?: number }) {
  const h = alto ?? Math.max(160, data.length * 34);
  return (
    <ResponsiveContainer width="100%" height={h}>
      <BarChart data={data} layout="vertical" margin={{ top: 4, right: 14, left: 8, bottom: 0 }}>
        <CartesianGrid stroke={GRID} horizontal={false} />
        <XAxis type="number" tick={AXIS} axisLine={false} tickLine={false} tickFormatter={(v: number) => (money ? fMoneyCompact(v) : String(v))} />
        <YAxis type="category" dataKey="nombre" width={165} tick={{ ...AXIS, fill: "#1c2534", fontSize: 12 }} axisLine={false} tickLine={false} />
        <Tooltip formatter={(v) => (money ? fMoney(Number(v)) : fNum(Number(v)))} contentStyle={{ borderRadius: 8, border: "1px solid #e3e8f0", fontSize: 12 }} />
        <Bar dataKey="valor" radius={[0, 4, 4, 0]} maxBarSize={20}>
          {data.map((_, i) => (
            <Cell key={i} fill={i < resaltar ? RED : BLUE_SOFT} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export function ApiladasComision({ data, alto }: { data: { nombre: string; Oficina: number; Asesor: number }[]; alto?: number }) {
  const h = alto ?? Math.max(180, data.length * 34);
  return (
    <ResponsiveContainer width="100%" height={h}>
      <BarChart data={data} layout="vertical" margin={{ top: 4, right: 14, left: 8, bottom: 0 }}>
        <CartesianGrid stroke={GRID} horizontal={false} />
        <XAxis type="number" tick={AXIS} axisLine={false} tickLine={false} tickFormatter={(v: number) => fMoneyCompact(v)} />
        <YAxis type="category" dataKey="nombre" width={165} tick={{ ...AXIS, fill: "#1c2534", fontSize: 12 }} axisLine={false} tickLine={false} />
        <Tooltip formatter={(v) => fMoney(Number(v))} contentStyle={{ borderRadius: 8, border: "1px solid #e3e8f0", fontSize: 12 }} />
        <Legend wrapperStyle={{ fontSize: 12 }} />
        <Bar dataKey="Oficina" stackId="c" fill={BLUE} maxBarSize={20} />
        <Bar dataKey="Asesor" stackId="c" fill={RED} radius={[0, 4, 4, 0]} maxBarSize={20} />
      </BarChart>
    </ResponsiveContainer>
  );
}
