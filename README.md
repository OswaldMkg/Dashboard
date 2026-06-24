[README.md](https://github.com/user-attachments/files/29281577/README.md)
# RE/MAX Terra · Dashboard de Asesores

Dashboard de rendimiento (semáforo por cohorte) con datos de enero–junio 2026.

## Archivos

- **`index.html`** — El dashboard completo. Es **un solo archivo autocontenido** (HTML + CSS + JS + datos embebidos). No depende de imágenes ni archivos externos: las gráficas de leads y de cierres están dibujadas con CSS, así que se ve igual en cualquier lugar.
- **`vercel.json`** — Configuración mínima para el despliegue estático en Vercel (opcional, pero recomendada).

## Qué incluye esta versión

El dashboard está organizado en **cuatro pestañas** (secciones agrupadas por coherencia) para que todo se vea ordenado y no amontonado:

1. **📅 Junio · Mes actual** — KPIs del mes (leads, recorridos, opciones mostradas, opcionadas renta/venta) **solo de junio**, más una tabla de actividad por asesor del mes.
2. **🏆 Desempeño** — Élite de la oficina (Alma Verónica #1, Pilar #2, Erik #3, mayor % de meta) y "La recta final": quienes aún no cierran su meta de cohorte pero están cerca, con el monto exacto que les falta y un mensaje motivacional.
3. **📈 Acumulado semestre** — Gráfica de leads acumulados (total 2,529) y gráfica de cierres 2026 (ventas vs rentas, con volumen). Los cierres solo incluyen operaciones CERRADA con **fecha de operación en 2026** (se excluyeron las de 2025 y se depuraron duplicados).
4. **👥 Detalle por asesor** — Tarjeta individual por asesor, agrupada por color de semáforo, con actividad de mayo y junio actualizada.

## Subir a Claude Design

1. Abre Claude Design.
2. Importa / sube el archivo `index.html`.
3. Itéralo por chat si quieres ajustar colores, textos o secciones.

## Desplegar en Vercel

### Opción A — Arrastrar y soltar (lo más rápido)
1. Entra a https://vercel.com/new
2. Arrastra la carpeta que contiene `index.html` y `vercel.json`.
3. Deploy. Vercel sirve `index.html` en la raíz automáticamente.

### Opción B — Desde tu repo `OswaldMkg/Dashboard`
1. Reemplaza el `index.html` del repo con este nuevo archivo (y agrega `vercel.json`).
2. Haz commit y push a `main`.
3. Vercel redepliega solo y se actualiza `dashboardmocha.vercel.app`.

```bash
# desde la carpeta del repo
cp index.html vercel.json /ruta/a/tu/repo/Dashboard/
cd /ruta/a/tu/repo/Dashboard/
git add index.html vercel.json
git commit -m "Dashboard junio 2026: KPIs de junio, élite, recta final, gráficas de leads y cierres"
git push origin main
```

## Cómo actualizar los datos a futuro

Los datos viven dentro de `index.html` en la constante `DATA` (asesores), y en `LEADS`, `SALES` y `JK` (gráficas y banda de junio). Se pueden editar a mano o regenerar desde los Excel de origen (`OPCIONES_RENTA_VENTA` y `_REMAX_TERRA_APARTADO_Y_CIERRE`).

> Nota sobre cierres: el filtro usa el campo **FECHA OPERACION**. Las fechas 2025 quedan fuera. Las fechas 2026 vienen en texto ("10 de Junio de 2026") y se interpretan por el año.
