/**
 * Configuración de negocio del dashboard.
 * Estos son los únicos valores que la oficina puede querer ajustar;
 * el resto se calcula automáticamente desde los archivos Excel.
 */

/** Meta anual individual por asesor, año calendario (1 ene – 31 dic).
 *  Se mide contra la comisión total del asesor (Oficina + Asesor, X + Y). */
export const META_ANUAL_ASESOR = 360_000;

/**
 * Meta del COHORTE por antigüedad. Se calcula en el pipeline (build-data.mjs)
 * a partir de la "Fecha Sir" del archivo de membresías, restando los meses de
 * capacitación inicial y acumulando la tarifa de cada mes activo por tramo.
 * El cohorte se mide contra la columna Y (Comisión Asesor).
 * Esta tabla es solo de referencia para la sección Configuración; el cálculo real
 * vive en el pipeline. Si cambias las tarifas, actualiza AMBOS lugares.
 */
export const MESES_CAPACITACION = 2;
export const TABLA_META_ANTIGUEDAD = [
  { rango: "1 a 3 meses", monto: 3_000 },
  { rango: "4 a 6 meses", monto: 5_000 },
  { rango: "7 a 9 meses", monto: 8_000 },
  { rango: "10 a 12 meses", monto: 12_000 },
  { rango: "13 a 18 meses", monto: 16_000 },
  { rango: "19+ meses", monto: 20_000 },
] as const;


/** Umbrales del semáforo (% de avance): rojo < 50, ámbar 50–74, verde ≥ 75. */
export const SEMAFORO = { AMBAR: 50, VERDE: 75 } as const;

export const NOMBRE_OFICINA = "RE/MAX Terra";

export const MESES_CORTOS = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
export const MESES_LARGOS = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];
