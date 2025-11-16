# AirFusion TEMPO - Predicción Local de Calidad del Aire

## 🌍 Descripción

AirFusion TEMPO es una aplicación web desarrollada por estudiantes de Ingenieria en ciencia de datos del Instituto Tecnológico Metropolitano (ITM) para el monitoreo, análisis y predicción local de la calidad del aire. La plataforma integra múltiples fuentes de datos para proporcionar una visión comprehensiva de los contaminantes atmosféricos y su impacto en la salud pública.

## ✨ Características Principales

### 📊 Monitoreo en Tiempo Real
- **Visualización de KPIs**: Métricas clave de calidad del aire con alertas automáticas
- **Mapas Interactivos**: Visualización geoespacial de los datos de contaminación
- **Gráficos Dinámicos**: Charts temporales y comparativos de contaminantes
- **Panel de Alertas**: Sistema de notificaciones basado en umbrales de salud

### 🔄 Integración de Datos

La aplicación fusiona tres fuentes principales de datos:

1. **Sensores Simulados**: Mediciones locales de material particulado (PM1.0, PM2.5, PM10), temperatura y humedad relativa
   - Carga de datos mediante archivos CSV
   - Almacenamiento en memoria compartida para procesamiento
   - Integración con el sistema de fusión geoespacial
2. **OpenAQ**: Plataforma global de datos abiertos de calidad del aire con validación científica
3. **TEMPO (NASA)**: Datos satelitales para monitoreo de contaminantes gaseosos (NO₂, O₃, AOD)

#### Integración de Datos del Sensor en la API

Los datos del sensor se integran mediante el siguiente flujo:

1. **Carga de Datos**: Los usuarios suben archivos CSV con formato específico (timestamp, sensor_id, lat, lon, pm1_0, pm2_5, pm10_0, temp_c, rh_pct)
2. **Almacenamiento**: Los datos se guardan en un almacén compartido en memoria (`_shared_store.js`) accesible por todas las funciones serverless
3. **Fusión**: El endpoint `/api/merge` combina datos del sensor con OpenAQ y TEMPO usando coordenadas geográficas y timestamps
4. **Visualización**: Los datos fusionados se muestran en KPIs, mapas y gráficos en tiempo real
5. **Exportación**: Los datos están disponibles para descarga en formato CSV y JSON

### 📈 Parámetros Monitoreados

#### Material Particulado
- **PM1.0**: Partículas ≤ 1.0 μm (más peligrosas)
- **PM2.5**: Partículas finas ≤ 2.5 μm (principal indicador de calidad del aire)
- **PM10.0**: Partículas inhalables ≤ 10 μm

#### Gases Contaminantes
- **NO₂**: Dióxido de nitrógeno (fuentes vehiculares e industriales)
- **O₃**: Ozono troposférico (smog fotoquímico)
- **AOD**: Profundidad Óptica de Aerosoles (visibilidad atmosférica)

#### Parámetros Meteorológicos
- **Temperatura**: Influye en la formación de ozono
- **Humedad Relativa**: Afecta reacciones químicas atmosféricas

### 🚀 Funcionalidades

- **Carga de Datos**: Importación de datos desde APIs externas y archivos CSV
- **Fusión Inteligente**: Algoritmo de merge geoespacial con radio configurable
- **Exportación Completa**: Descarga de datos en formato CSV para todas las fuentes
  - **Datos Unificados**: Fusión de todas las fuentes con cálculo de AQI
  - **Datos del Sensor**: Mediciones locales de material particulado y parámetros meteorológicos
  - **Datos de OpenAQ**: Mediciones validadas de calidad del aire de estaciones globales
  - **Datos de TEMPO**: Información satelital de contaminantes gaseosos
- **API REST**: Endpoint `/api/data` para integración con Power BI
- **Interfaz Responsiva**: Diseño adaptativo con modo oscuro/claro
- **Geolocalización**: Configuración flexible de coordenadas y radio de búsqueda

#### Proceso de Descarga de Datos

La aplicación ofrece múltiples opciones de descarga para facilitar el análisis de datos:

1. **Descarga de Datos Unificados**:
   - Botón: "Descargar unificado (CSV)"
   - Endpoint: `/api/export_csv`
   - Contenido: Datos fusionados de todas las fuentes con campos calculados (AQI, alertas)
   - Incluye: pm25_sensor, pm25_openaq, no2_tempo, o3_tempo, temp_c, rh_pct, aqi, alert_flag

2. **Descarga de Datos del Sensor**:
   - Botón: "Descargar Sensor (CSV)"
   - Endpoint: `/api/export_sensor`
   - Contenido: Datos cargados desde sensores simulados
   - Incluye: timestamp, sensor_id, lat, lon, pm1_0, pm2_5, pm10_0, temp_c, rh_pct

3. **Descarga de Datos de OpenAQ**:
   - Botón: "Descargar OpenAQ (CSV)"
   - Endpoint: `/api/export_openaq`
   - Contenido: Datos cargados desde la API de OpenAQ
   - Incluye: timestamp, city, lat, lon, parameter, value, unit, location

4. **Descarga de Datos de TEMPO**:
   - Botón: "Descargar TEMPO (CSV)"
   - Endpoint: `/api/export_tempo`
   - Contenido: Datos satelitales de NASA TEMPO
   - Incluye: timestamp, lat, lon, no2_tempo, o3_tempo, aod

**Importante**: El botón **"Fusionar fuentes"** debe utilizarse antes de descargar datos unificados para asegurar que todos los datos cargados estén incluidos en la exportación. Este botón mantiene su funcionalidad intacta y es esencial para el proceso de integración de datos.

## 🛠️ Tecnologías

### Frontend
- **React 18** con TypeScript
- **Vite** como bundler de desarrollo
- **Tailwind CSS** para estilos responsive
- **Radix UI** componentes accesibles
- **Recharts** para visualización de datos
- **React Router** para navegación SPA

### Backend (Serverless)
- **Netlify Functions** con TypeScript
- **API REST** para manejo de datos
- **Integración** con OpenAQ y TEMPO APIs

### UI/UX
- **Lucide React** iconografía moderna
- **shadcn/ui** sistema de design
- **Sonner** notificaciones toast
- **React Hook Form** manejo de formularios

## 🏃‍♂️ Desarrollo Local

```bash
# Instalación de dependencias
npm install

# Servidor de desarrollo con Netlify CLI
netlify dev

# Construcción para producción
npm run build
```

## 🌐 API Endpoints

- `GET /api/openaq` - Datos de OpenAQ por ciudad/coordenadas
- `GET /api/tempo` - Datos satelitales TEMPO
- `GET /api/data` - Datos unificados (Power BI compatible)
- `POST /api/upload_sensor` - Carga de datos de sensores simulados
- `POST /api/upload_openaq` - Carga de datos de OpenAQ desde CSV
- `POST /api/upload_tempo` - Carga de datos de TEMPO desde CSV
- `POST /api/merge` - Fusión de fuentes con radio geográfico
- `GET /api/export_csv` - Exportación de datos unificados en CSV
- `GET /api/export_sensor` - Exportación de datos del sensor en CSV
- `GET /api/export_openaq` - Exportación de datos de OpenAQ en CSV
- `GET /api/export_tempo` - Exportación de datos de TEMPO en CSV

## 📚 Documentación

La aplicación incluye una página detallada de **Términos y Variables** (`/terminos`) que explica:
- Definiciones técnicas de cada parámetro
- Unidades de medida y estándares internacionales
- Fuentes de datos y metodologías
- Límites de salud según OMS y EPA

## 🎯 Casos de Uso

- **Investigación Académica**: Análisis de tendencias de contaminación urbana
- **Salud Pública**: Monitoreo de exposición poblacional a contaminantes
- **Gestión Ambiental**: Toma de decisiones basada en datos científicos
- **Educación**: Herramienta de visualización para programas ambientales

