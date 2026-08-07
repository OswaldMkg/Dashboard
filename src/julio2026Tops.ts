// Datos de julio 2026 para las secciones "Tops del mes" y "Teams".
// Fuentes: OPCIONES_RENTA_VENTA (actividad de julio) y APARTADO Y CIERRE (operaciones
// con FECHA OPERACION dentro de julio 2026 y estatus CERRADA). Atribucion: ASESOR 1.
// Los montos de rentas/ventas son el TOTAL DE LA OPERACION, no la comision.
// Los equipos arrancan en ceros: la medicion por equipo empieza con el corte de agosto.

export type TopItem = { lugar: number; nombre: string; valor: number; ops?: number };

export type TopBloque = {
  titulo: string;
  unidad: string;
  moneda?: boolean;
  nota: string;
  items: TopItem[];
};

export type ClaveTop = 'recorridos' | 'mostradas' | 'opcionadas' | 'rentas' | 'ventas';

export type Integrante = {
  nombre: string;
  sinDatos: boolean;
  recorridos: number;
  mostradas: number;
  opcionadas: number;
  leads: number;
  rentas: number;
  ventas: number;
  cierres: number;
};

export type TotalTeam = Omit<Integrante, 'nombre' | 'sinDatos'>;

export type ColorTeam = 'red' | 'blue' | 'white' | 'green' | 'purple' | 'orange';

export type Team = {
  nombre: string;
  color: ColorTeam;
  integrantes: Integrante[];
  total: TotalTeam;
};

export type DatosMes = {
  periodo: string;
  actualizado: string;
  teamsNota: string;
  tops: Record<ClaveTop, TopBloque>;
  teams: Team[];
};

export const julio2026: DatosMes = {
  "periodo": "Julio 2026",
  "actualizado": "2026-07-30",
  "teamsNota": "Arranque de medición: los equipos empiezan a contar desde ahora. Los números se llenan con el corte de agosto 2026.",
  "tops": {
    "recorridos": {
      "titulo": "Más recorridos",
      "unidad": "recorridos",
      "nota": "Recorridos registrados en julio 2026",
      "items": [
        {
          "nombre": "Christian Alvarado",
          "valor": 25.0,
          "lugar": 1
        },
        {
          "nombre": "Christian Díaz",
          "valor": 21.0,
          "lugar": 2
        },
        {
          "nombre": "Mariana Vega",
          "valor": 21.0,
          "lugar": 2
        }
      ]
    },
    "mostradas": {
      "titulo": "Más opciones mostradas",
      "unidad": "opciones",
      "nota": "Opciones mostradas a clientes en julio 2026",
      "items": [
        {
          "nombre": "Christian Díaz",
          "valor": 45.0,
          "lugar": 1
        },
        {
          "nombre": "Mariana Vega",
          "valor": 42.0,
          "lugar": 2
        },
        {
          "nombre": "Christian Alvarado",
          "valor": 41.0,
          "lugar": 3
        }
      ]
    },
    "opcionadas": {
      "titulo": "Más propiedades opcionadas",
      "unidad": "propiedades",
      "nota": "Propiedades captadas / opcionadas en julio 2026",
      "items": [
        {
          "nombre": "Sol Huerta",
          "valor": 8.0,
          "lugar": 1
        },
        {
          "nombre": "Christian Díaz",
          "valor": 6.0,
          "lugar": 2
        },
        {
          "nombre": "Christian Alvarado",
          "valor": 5.0,
          "lugar": 3
        }
      ]
    },
    "rentas": {
      "titulo": "Acumulado en rentas",
      "unidad": "MXN",
      "moneda": true,
      "nota": "Suma del total de la operación de las rentas cerradas en julio 2026",
      "items": [
        {
          "nombre": "Pily González",
          "valor": 54500.0,
          "ops": 3,
          "lugar": 1
        },
        {
          "nombre": "Mariana Vega",
          "valor": 31000.0,
          "ops": 2,
          "lugar": 2
        },
        {
          "nombre": "Christian Díaz",
          "valor": 28500.0,
          "ops": 2,
          "lugar": 3
        }
      ]
    },
    "ventas": {
      "titulo": "Acumulado en ventas",
      "unidad": "MXN",
      "moneda": true,
      "nota": "Suma del total de la operación de las ventas cerradas en julio 2026",
      "items": [
        {
          "nombre": "Mariana Vega",
          "valor": 5229172.915200001,
          "ops": 2,
          "lugar": 1
        },
        {
          "nombre": "Christian Alvarado",
          "valor": 4057000.0,
          "ops": 1,
          "lugar": 2
        },
        {
          "nombre": "Judith Diosdado",
          "valor": 1990000.0,
          "ops": 1,
          "lugar": 3
        }
      ]
    }
  },
  "teams": [
    {
      "nombre": "Team Red-Delta",
      "color": "red",
      "integrantes": [
        {
          "nombre": "Erik",
          "sinDatos": false,
          "recorridos": 0,
          "mostradas": 0,
          "opcionadas": 0.0,
          "leads": 0,
          "rentas": 0.0,
          "ventas": 0.0,
          "cierres": 0
        },
        {
          "nombre": "Marilú",
          "sinDatos": false,
          "recorridos": 0,
          "mostradas": 0,
          "opcionadas": 0.0,
          "leads": 0,
          "rentas": 0.0,
          "ventas": 0.0,
          "cierres": 0
        },
        {
          "nombre": "Ivette",
          "sinDatos": false,
          "recorridos": 0,
          "mostradas": 0,
          "opcionadas": 0.0,
          "leads": 0,
          "rentas": 0.0,
          "ventas": 0.0,
          "cierres": 0
        },
        {
          "nombre": "Martha Ochoa",
          "sinDatos": false,
          "recorridos": 0,
          "mostradas": 0,
          "opcionadas": 0.0,
          "leads": 0,
          "rentas": 0.0,
          "ventas": 0.0,
          "cierres": 0
        }
      ],
      "total": {
        "recorridos": 0,
        "mostradas": 0,
        "opcionadas": 0.0,
        "leads": 0,
        "rentas": 0.0,
        "ventas": 0.0,
        "cierres": 0
      }
    },
    {
      "nombre": "Team Blue-Echo",
      "color": "blue",
      "integrantes": [
        {
          "nombre": "Pily",
          "sinDatos": false,
          "recorridos": 0,
          "mostradas": 0,
          "opcionadas": 0.0,
          "leads": 0,
          "rentas": 0.0,
          "ventas": 0.0,
          "cierres": 0
        },
        {
          "nombre": "Luis Alcántar",
          "sinDatos": false,
          "recorridos": 0,
          "mostradas": 0,
          "opcionadas": 0.0,
          "leads": 0,
          "rentas": 0.0,
          "ventas": 0.0,
          "cierres": 0
        },
        {
          "nombre": "Adri Regalado",
          "sinDatos": false,
          "recorridos": 0,
          "mostradas": 0,
          "opcionadas": 0.0,
          "leads": 0,
          "rentas": 0.0,
          "ventas": 0.0,
          "cierres": 0
        },
        {
          "nombre": "Gis",
          "sinDatos": false,
          "recorridos": 0,
          "mostradas": 0,
          "opcionadas": 0.0,
          "leads": 0,
          "rentas": 0.0,
          "ventas": 0.0,
          "cierres": 0
        }
      ],
      "total": {
        "recorridos": 0,
        "mostradas": 0,
        "opcionadas": 0.0,
        "leads": 0,
        "rentas": 0.0,
        "ventas": 0.0,
        "cierres": 0
      }
    },
    {
      "nombre": "Team White-Bravo",
      "color": "white",
      "integrantes": [
        {
          "nombre": "Sol",
          "sinDatos": false,
          "recorridos": 0,
          "mostradas": 0,
          "opcionadas": 0.0,
          "leads": 0,
          "rentas": 0.0,
          "ventas": 0.0,
          "cierres": 0
        },
        {
          "nombre": "Adri Calva",
          "sinDatos": false,
          "recorridos": 0,
          "mostradas": 0,
          "opcionadas": 0.0,
          "leads": 0,
          "rentas": 0.0,
          "ventas": 0.0,
          "cierres": 0
        },
        {
          "nombre": "Héctor",
          "sinDatos": false,
          "recorridos": 0,
          "mostradas": 0,
          "opcionadas": 0.0,
          "leads": 0,
          "rentas": 0.0,
          "ventas": 0.0,
          "cierres": 0
        },
        {
          "nombre": "Elena",
          "sinDatos": false,
          "recorridos": 0,
          "mostradas": 0,
          "opcionadas": 0.0,
          "leads": 0,
          "rentas": 0.0,
          "ventas": 0.0,
          "cierres": 0
        }
      ],
      "total": {
        "recorridos": 0,
        "mostradas": 0,
        "opcionadas": 0.0,
        "leads": 0,
        "rentas": 0.0,
        "ventas": 0.0,
        "cierres": 0
      }
    },
    {
      "nombre": "Team Romeo-Green",
      "color": "green",
      "integrantes": [
        {
          "nombre": "Mariana",
          "sinDatos": false,
          "recorridos": 0,
          "mostradas": 0,
          "opcionadas": 0.0,
          "leads": 0,
          "rentas": 0.0,
          "ventas": 0.0,
          "cierres": 0
        },
        {
          "nombre": "Ana Escamilla",
          "sinDatos": false,
          "recorridos": 0,
          "mostradas": 0,
          "opcionadas": 0.0,
          "leads": 0,
          "rentas": 0.0,
          "ventas": 0.0,
          "cierres": 0
        },
        {
          "nombre": "Chris Alvarado",
          "sinDatos": false,
          "recorridos": 0,
          "mostradas": 0,
          "opcionadas": 0.0,
          "leads": 0,
          "rentas": 0.0,
          "ventas": 0.0,
          "cierres": 0
        },
        {
          "nombre": "Liz Pérez",
          "sinDatos": false,
          "recorridos": 0,
          "mostradas": 0,
          "opcionadas": 0.0,
          "leads": 0,
          "rentas": 0.0,
          "ventas": 0.0,
          "cierres": 0
        }
      ],
      "total": {
        "recorridos": 0,
        "mostradas": 0,
        "opcionadas": 0.0,
        "leads": 0,
        "rentas": 0.0,
        "ventas": 0.0,
        "cierres": 0
      }
    },
    {
      "nombre": "Team Kilo-Purple",
      "color": "purple",
      "integrantes": [
        {
          "nombre": "Judith",
          "sinDatos": false,
          "recorridos": 0,
          "mostradas": 0,
          "opcionadas": 0.0,
          "leads": 0,
          "rentas": 0.0,
          "ventas": 0.0,
          "cierres": 0
        },
        {
          "nombre": "Susana",
          "sinDatos": false,
          "recorridos": 0,
          "mostradas": 0,
          "opcionadas": 0.0,
          "leads": 0,
          "rentas": 0.0,
          "ventas": 0.0,
          "cierres": 0
        },
        {
          "nombre": "Angie",
          "sinDatos": false,
          "recorridos": 0,
          "mostradas": 0,
          "opcionadas": 0.0,
          "leads": 0,
          "rentas": 0.0,
          "ventas": 0.0,
          "cierres": 0
        },
        {
          "nombre": "Cintia",
          "sinDatos": false,
          "recorridos": 0,
          "mostradas": 0,
          "opcionadas": 0.0,
          "leads": 0,
          "rentas": 0.0,
          "ventas": 0.0,
          "cierres": 0
        }
      ],
      "total": {
        "recorridos": 0,
        "mostradas": 0,
        "opcionadas": 0.0,
        "leads": 0,
        "rentas": 0.0,
        "ventas": 0.0,
        "cierres": 0
      }
    },
    {
      "nombre": "Team Orange-Charlie",
      "color": "orange",
      "integrantes": [
        {
          "nombre": "Lore Ramos",
          "sinDatos": false,
          "recorridos": 0,
          "mostradas": 0,
          "opcionadas": 0.0,
          "leads": 0,
          "rentas": 0.0,
          "ventas": 0.0,
          "cierres": 0
        },
        {
          "nombre": "Chris Díaz",
          "sinDatos": false,
          "recorridos": 0,
          "mostradas": 0,
          "opcionadas": 0.0,
          "leads": 0,
          "rentas": 0.0,
          "ventas": 0.0,
          "cierres": 0
        },
        {
          "nombre": "Alberto",
          "sinDatos": false,
          "recorridos": 0,
          "mostradas": 0,
          "opcionadas": 0.0,
          "leads": 0,
          "rentas": 0.0,
          "ventas": 0.0,
          "cierres": 0
        }
      ],
      "total": {
        "recorridos": 0,
        "mostradas": 0,
        "opcionadas": 0.0,
        "leads": 0,
        "rentas": 0.0,
        "ventas": 0.0,
        "cierres": 0
      }
    }
  ]
};

export default julio2026;
