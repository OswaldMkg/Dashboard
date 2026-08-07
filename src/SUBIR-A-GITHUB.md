# Qué copiar al repo y cómo subirlo

## 1. Archivos que van en la carpeta del dashboard

Copia respetando la estructura. Los cinco de `src/` son nuevos; el de `data/` **reemplaza**
al que ya está.

| Archivo | Destino en el repo | Nuevo o reemplazo |
|---|---|---|
| `data/OPCIONES_RENTA_VENTA.xlsx` | `data/` | **Reemplaza** el archivo OPCIONES que ya tienes (respeta el nombre actual; el pipeline lo detecta por la palabra `OPCIONES`) |
| `src/data/julio2026Tops.ts` | `src/data/` | Nuevo |
| `src/lib/captura.ts` | `src/lib/` | Nuevo |
| `src/components/TopsJulio.tsx` | `src/components/` | Nuevo |
| `src/components/Teams.tsx` | `src/components/` | Nuevo |
| `src/components/tops-teams.css` | `src/components/` | Nuevo |

Además hay que tocar **un archivo que ya existe**: el que define las pestañas (tu `App.tsx`
o equivalente), para agregar las dos entradas nuevas:

```tsx
import TopsJulio from './components/TopsJulio';
import Teams from './components/Teams';

// dentro de tu lista de pestañas:
{ id: 'tops',  label: 'Tops del mes', elemento: <TopsJulio /> },
{ id: 'teams', label: 'Teams',        elemento: <Teams /> },
```

No hay dependencias nuevas que instalar. `html2canvas` (el de las capturas) se carga desde
CDN la primera vez que alguien aprieta el botón.

## 2. Comandos de terminal

Sustituye `~/Dashboard` por la ruta real de tu carpeta local.

```bash
# 1. Ir al repo y traer lo último
cd ~/Dashboard
git pull

# 2. Copiar los archivos (ajusta la ruta de descarga si es otra)
cp ~/Downloads/dashboard/data/OPCIONES_RENTA_VENTA.xlsx  data/
cp ~/Downloads/dashboard/src/data/julio2026Tops.ts       src/data/
cp ~/Downloads/dashboard/src/lib/captura.ts              src/lib/
cp ~/Downloads/dashboard/src/components/TopsJulio.tsx    src/components/
cp ~/Downloads/dashboard/src/components/Teams.tsx        src/components/
cp ~/Downloads/dashboard/src/components/tops-teams.css   src/components/

# 3. Probar en local antes de subir (Ctrl+C para salir)
npm run dev

# 4. Revisar qué cambió
git status

# 5. Subir
git add .
git commit -m "Tops de julio actualizados y seccion Teams en ceros"
git push
```

Vercel redespliega solo con el push. Tarda 1–2 minutos.

### Si `git push` reclama la rama

```bash
git branch --show-current      # te dice si es main o master
git push origin main           # o master, según lo anterior
```

### Si el nombre del Excel en `data/` es distinto

Mira cómo se llama y respeta ese nombre:

```bash
ls data/
mv ~/Downloads/dashboard/data/OPCIONES_RENTA_VENTA.xlsx data/EL_NOMBRE_QUE_YA_TENIAS.xlsx
```

## 3. Qué cambió en los números

Con el archivo nuevo solo se movió **propiedades opcionadas** (julio). Recorridos,
opciones mostradas y leads quedaron idénticos, y los meses de enero a junio no cambiaron.

Podio de captaciones actualizado:

| Lugar | Asesor | Captadas | Desglose |
|---|---|---|---|
| 1º | Sol Huerta | **8** | 1 renta · 7 venta |
| 2º | Christian Díaz | **6** | 2 renta · 4 venta |
| 3º | Christian Alvarado | **5** | 5 renta |

Erik Trotter (3.5) queda fuera del podio por muy poco.

Los tops de rentas y ventas no se movieron porque salen del archivo de apartados y cierres,
que no cambió.

## 4. Teams

Los seis equipos quedaron con todas sus métricas en cero y un aviso arriba que explica que
la medición arranca ahora. Cuando quieras encenderlos, se llenan solos con el corte del mes.
