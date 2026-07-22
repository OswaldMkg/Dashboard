/**
 * Configuración de negocio del dashboard.
 * Estos son los únicos valores que la oficina puede querer ajustar;
 * el resto se calcula automáticamente desde los archivos Excel.
 */

/** Meta anual individual por asesor (Comisión Oficina + Comisión Asesor). */
export const META_ANUAL_ASESOR = 360_000;

/**
 * Meta anual del cohorte. Se compara contra la suma de la columna Y
 * (COMISIÓN ASESOR) de todas las operaciones cerradas del año.
 * AJUSTABLE: este valor no existe en los archivos fuente; modifícalo aquí
 * cuando la dirección defina la meta oficial.
 */
export const META_COHORTE = 3_000_000;

/** Umbrales del semáforo (% de avance): rojo < 50, ámbar 50–74, verde ≥ 75. */
export const SEMAFORO = { AMBAR: 50, VERDE: 75 } as const;

export const NOMBRE_OFICINA = "RE/MAX Terra";

export const MESES_CORTOS = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
export const MESES_LARGOS = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];
