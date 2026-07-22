# RE/MAX Terra · Dashboard Ejecutivo 2026

Dashboard de desempeño comercial reconstruido desde cero. Lee directamente los
dos archivos Excel operativos de la oficina y publica un panel ejecutivo en Vercel.

## Arquitectura

```
data/                  ← Archivos Excel fuente (se reemplazan cada mes)
scripts/build-data.mjs ← Pipeline: lee, valida, normaliza, deduplica y agrega
src/generated/         ← dashboard.json + validation.json (se regeneran en cada build)
src/config.ts          ← Metas ajustables (asesor $360,000 · cohorte)
src/views/             ← 8 secciones (Resumen, Asesores, Operaciones, …)
src/components/        ← UI y gráficos reutilizables (Recharts + Lucide)
```

- **Stack:** Vite + React 18 + TypeScript (modo estricto), Recharts, Lucide.
- **Automatización:** `npm run build` ejecuta el pipeline de datos antes de compilar.
  En Vercel, cada `git push` regenera todo; el mes actual se detecta solo.

## Reglas de datos

- Solo se contabiliza el año **2026**. Excepción: operaciones apartadas en meses o
  años anteriores pero **cerradas en 2026** cuentan en su mes real de cierre
  (columna FECHA OPERACION; si falta, FECHA DE FIRMA; si falta, fecha de apartado).
- **Meta del cohorte:** solo columna Y (Comisión Asesor). **Meta individual
  ($360,000):** columnas X + Y (Comisión Oficina + Comisión Asesor).
- Cierres con PAGADO ≠ "SI" se muestran como pago pendiente, sin duplicar montos.
- Estatus ABIERTA = operación pendiente; SE CAYÓ se excluye de totales.
- Nombres de asesor normalizados entre archivos (p. ej. "Gisella García" →
  "Nidia Gisela García Trujillo"); registros duplicados se eliminan y se reportan
  en la sección **Configuración**.

## Actualización mensual

1. Reemplaza los `.xlsx` de `data/` (uno con "OPCIONES" en el nombre y otro con "APARTADO").
2. `git add . && git commit -m "Datos <mes>" && git push`
3. Vercel compila y publica automáticamente. Sin cambios de código.

Local: `npm install` una vez; `npm run dev` para desarrollo; `npm run build` para producción.
