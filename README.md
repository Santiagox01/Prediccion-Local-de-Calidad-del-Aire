# AirFusion TEMPO - Predicción Local de Calidad del Aire

## 🌍 Descripción

AirFusion TEMPO es una aplicación web desarrollada por el Instituto Tecnológico Metropolitano (ITM) para el monitoreo, análisis y predicción local de la calidad del aire. La plataforma integra múltiples fuentes de datos para proporcionar una visión comprehensiva de los contaminantes atmosféricos y su impacto en la salud pública.

## ✨ Características Principales

### 📊 Monitoreo en Tiempo Real
- **Visualización de KPIs**: Métricas clave de calidad del aire con alertas automáticas
- **Mapas Interactivos**: Visualización geoespacial de los datos de contaminación
- **Gráficos Dinámicos**: Charts temporales y comparativos de contaminantes
- **Panel de Alertas**: Sistema de notificaciones basado en umbrales de salud

### 🔄 Integración de Datos
La aplicación fusiona tres fuentes principales de datos:

1. **Sensores Simulados**: Mediciones locales de material particulado (PM1.0, PM2.5, PM10), temperatura y humedad relativa
2. **OpenAQ**: Plataforma global de datos abiertos de calidad del aire con validación científica
3. **TEMPO (NASA)**: Datos satelitales para monitoreo de contaminantes gaseosos (NO₂, O₃, AOD)

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
- **Exportación**: Descarga de datos unificados en formato CSV
- **API REST**: Endpoint `/api/data` para integración con Power BI
- **Interfaz Responsiva**: Diseño adaptativo con modo oscuro/claro
- **Geolocalización**: Configuración flexible de coordenadas y radio de búsqueda

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
- `POST /api/merge` - Fusión de fuentes con radio geográfico
- `GET /api/export_*` - Exportación en formato CSV

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

## 🔬 Instituto Tecnológico Metropolitano (ITM)

Desarrollado como parte de proyectos de investigación en calidad del aire y salud ambiental del ITM, contribuyendo al conocimiento científico y la gestión ambiental urbana en Colombia.