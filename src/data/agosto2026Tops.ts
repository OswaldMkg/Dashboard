// Tops de agosto 2026 para la pestaña "Tops del mes".
//
// Fuentes:
//   · Recorridos, opciones mostradas y propiedades opcionadas → OPCIONES_RENTA_VENTA,
//     hoja AGOSTO 2026 (columnas RECORRIDOS, NO. OPCIONES MOSTRADAS y
//     PROPIEDADES OPCIONADAS).
//   · Acumulado de rentas y ventas → concentrado de operaciones de agosto 2026.
//     Los montos son el TOTAL DE LA OPERACIÓN, no la comisión.
//
// Atribución: primer asesor de la operación (Asesor 1), igual que el resto del
// dashboard. Operaciones compartidas de agosto y a quién se le acreditaron:
//   · "ADRI CALVA/ELENA"    $23,000  → Adri Calva
//   · "ANGIE/ALVARADO"       $6,170  → Angie Bostal
//   · "RAMOS/ALVARADO"   $1,200,000  → Lore Ramos
//
// El orden y la lista de tarjetas se controlan desde `orden`: si algún mes falta
// una métrica, basta con sacarla de ese arreglo.

export type TopItem = { lugar: number; nombre: string; valor: number; ops?: number };

export type TopBloque = {
  titulo: string;
  unidad: string;
  moneda?: boolean;
  nota: string;
  items: TopItem[];
};

export type ClaveTop = 'recorridos' | 'mostradas' | 'opcionadas' | 'rentas' | 'ventas';

export type DatosTops = {
  periodo: string;
  actualizado: string;
  orden: ClaveTop[];
  tops: Record<ClaveTop, TopBloque>;
};

export const agosto2026: DatosTops = {
  periodo: 'Agosto 2026',
  actualizado: '2026-08-25',
  orden: ['recorridos', 'mostradas', 'opcionadas', 'rentas', 'ventas'],
  tops: {
    recorridos: {
      titulo: 'Más recorridos',
      unidad: 'recorridos',
      nota: 'Recorridos registrados en agosto 2026. La oficina cerró el mes con 55.',
      items: [
        { lugar: 1, nombre: 'Mariana Vega', valor: 9 },
        { lugar: 1, nombre: 'Gis García', valor: 9 },
        { lugar: 3, nombre: 'Lore Ramos', valor: 8 },
      ],
    },
    mostradas: {
      titulo: 'Más opciones mostradas',
      unidad: 'opciones',
      nota: 'Opciones mostradas a clientes en agosto 2026. La oficina cerró el mes con 92.',
      items: [
        { lugar: 1, nombre: 'Mariana Vega', valor: 18 },
        { lugar: 2, nombre: 'Gis García', valor: 15 },
        { lugar: 3, nombre: 'Christian Díaz', valor: 13 },
      ],
    },
    opcionadas: {
      titulo: 'Más propiedades opcionadas',
      unidad: 'propiedades',
      nota: 'Propiedades captadas / opcionadas en agosto 2026. La oficina cerró el mes con 35.',
      items: [
        { lugar: 1, nombre: 'Sol Huerta', valor: 9 },
        { lugar: 2, nombre: 'Erik Trotter', valor: 4 },
        { lugar: 2, nombre: 'Angie Bostal', valor: 4 },
      ],
    },
    rentas: {
      titulo: 'Acumulado en rentas',
      unidad: 'MXN',
      moneda: true,
      nota: 'Suma del total de la operación de las rentas de agosto 2026. Total de la oficina: $187,670.',
      items: [
        { lugar: 1, nombre: 'Lore Ramos', valor: 50700, ops: 1 },
        { lugar: 2, nombre: 'Gis García', valor: 28800, ops: 2 },
        { lugar: 3, nombre: 'Angie Bostal', valor: 26170, ops: 2 },
      ],
    },
    ventas: {
      titulo: 'Acumulado en ventas',
      unidad: 'MXN',
      moneda: true,
      nota: 'Suma del total de la operación de las ventas de agosto 2026. Total de la oficina: $3,180,000.',
      items: [
        { lugar: 1, nombre: 'Pily González', valor: 1980000, ops: 1 },
        { lugar: 2, nombre: 'Lore Ramos', valor: 1200000, ops: 1 },
      ],
    },
  },
};

export default agosto2026;
