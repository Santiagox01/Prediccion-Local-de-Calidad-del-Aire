import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft } from "lucide-react";

export const TermsAndVariables: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 dark:from-zinc-950 dark:to-zinc-900">
      <div className="container max-w-4xl mx-auto p-6 space-y-8">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft size={16} />
          Volver a AirFusion
        </Link>
        
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Términos y Variables</h1>
          <p className="text-lg text-muted-foreground">
            Guía completa de las variables de calidad del aire y términos técnicos utilizados en la plataforma
          </p>
        </div>

      <Separator />

      {/* Air Quality Parameters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Badge variant="outline">Parámetros de Calidad del Aire</Badge>
          </CardTitle>
          <CardDescription>
            Variables principales para el monitoreo de contaminación atmosférica
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Material Particulado (PM)</h3>
              
              <div className="space-y-3">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-medium">PM1.0 <code className="text-sm bg-muted px-1 rounded">pm1_0</code></h4>
                  <p className="text-sm text-muted-foreground">
                    Partículas con diámetro ≤ 1.0 micrómetros. Las más pequeñas y peligrosas, pueden penetrar profundamente en los pulmones y torrente sanguíneo.
                  </p>
                  <Badge variant="secondary" className="text-xs mt-1">µg/m³</Badge>
                </div>

                <div className="border-l-4 border-orange-500 pl-4">
                  <h4 className="font-medium">PM2.5 <code className="text-sm bg-muted px-1 rounded">pm2_5</code></h4>
                  <p className="text-sm text-muted-foreground">
                    Partículas finas con diámetro ≤ 2.5 micrómetros. Principal indicador de calidad del aire, relacionado con enfermedades respiratorias y cardiovasculares.
                  </p>
                  <Badge variant="secondary" className="text-xs mt-1">µg/m³</Badge>
                </div>

                <div className="border-l-4 border-red-500 pl-4">
                  <h4 className="font-medium">PM10.0 <code className="text-sm bg-muted px-1 rounded">pm10_0</code></h4>
                  <p className="text-sm text-muted-foreground">
                    Partículas inhalables con diámetro ≤ 10 micrómetros. Incluye polvo, polen y esporas que pueden causar irritación respiratoria.
                  </p>
                  <Badge variant="secondary" className="text-xs mt-1">µg/m³</Badge>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Gases Contaminantes</h3>
              
              <div className="space-y-3">
                <div className="border-l-4 border-yellow-500 pl-4">
                  <h4 className="font-medium">NO₂ <code className="text-sm bg-muted px-1 rounded">no2_tempo</code></h4>
                  <p className="text-sm text-muted-foreground">
                    Dióxido de nitrógeno. Gas tóxico producido principalmente por vehículos y industrias. Causa irritación respiratoria y contribuye al smog.
                  </p>
                  <Badge variant="secondary" className="text-xs mt-1">ppb</Badge>
                </div>

                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-medium">O₃ <code className="text-sm bg-muted px-1 rounded">o3_tempo</code></h4>
                  <p className="text-sm text-muted-foreground">
                    Ozono troposférico. Gas formado por reacciones fotoquímicas. Beneficioso en la estratósfera, pero nocivo a nivel del suelo.
                  </p>
                  <Badge variant="secondary" className="text-xs mt-1">ppb</Badge>
                </div>

                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-medium">AOD <code className="text-sm bg-muted px-1 rounded">aod</code></h4>
                  <p className="text-sm text-muted-foreground">
                    Profundidad Óptica de Aerosoles. Medida de la cantidad de partículas en la atmósfera que afectan la visibilidad y calidad del aire.
                  </p>
                  <Badge variant="secondary" className="text-xs mt-1">Adimensional</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Environmental Parameters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Badge variant="outline">Parámetros Meteorológicos</Badge>
          </CardTitle>
          <CardDescription>
            Variables ambientales que influyen en la dispersión de contaminantes
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border-l-4 border-blue-400 pl-4">
              <h4 className="font-medium">Temperatura <code className="text-sm bg-muted px-1 rounded">temp_c</code></h4>
              <p className="text-sm text-muted-foreground">
                Temperatura del aire en grados Celsius. Afecta la formación de ozono y la dispersión de contaminantes.
              </p>
              <Badge variant="secondary" className="text-xs mt-1">°C</Badge>
            </div>

            <div className="border-l-4 border-teal-400 pl-4">
              <h4 className="font-medium">Humedad Relativa <code className="text-sm bg-muted px-1 rounded">rh_pct</code></h4>
              <p className="text-sm text-muted-foreground">
                Porcentaje de humedad en el aire. Influye en la formación de partículas secundarias y reacciones químicas atmosféricas.
              </p>
              <Badge variant="secondary" className="text-xs mt-1">%</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Location Parameters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Badge variant="outline">Parámetros de Ubicación</Badge>
          </CardTitle>
          <CardDescription>
            Variables geográficas para el posicionamiento de datos
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border-l-4 border-indigo-400 pl-4">
              <h4 className="font-medium">Latitud <code className="text-sm bg-muted px-1 rounded">lat</code></h4>
              <p className="text-sm text-muted-foreground">
                Coordenada geográfica que especifica la posición norte-sur de un punto en la superficie terrestre.
              </p>
              <Badge variant="secondary" className="text-xs mt-1">Decimal degrees</Badge>
            </div>

            <div className="border-l-4 border-pink-400 pl-4">
              <h4 className="font-medium">Longitud <code className="text-sm bg-muted px-1 rounded">lon</code></h4>
              <p className="text-sm text-muted-foreground">
                Coordenada geográfica que especifica la posición este-oeste de un punto en la superficie terrestre.
              </p>
              <Badge variant="secondary" className="text-xs mt-1">Decimal degrees</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Parameters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Badge variant="outline">Parámetros de Datos</Badge>
          </CardTitle>
          <CardDescription>
            Variables de identificación y tiempo
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border-l-4 border-gray-400 pl-4">
              <h4 className="font-medium">Timestamp <code className="text-sm bg-muted px-1 rounded">timestamp</code></h4>
              <p className="text-sm text-muted-foreground">
                Marca de tiempo que indica cuándo se tomó la medición. Formato ISO 8601 (YYYY-MM-DDTHH:mm:ss).
              </p>
              <Badge variant="secondary" className="text-xs mt-1">ISO DateTime</Badge>
            </div>

            <div className="border-l-4 border-cyan-400 pl-4">
              <h4 className="font-medium">ID del Sensor <code className="text-sm bg-muted px-1 rounded">sensor_id</code></h4>
              <p className="text-sm text-muted-foreground">
                Identificador único del sensor o estación de monitoreo que registró los datos.
              </p>
              <Badge variant="secondary" className="text-xs mt-1">String</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Sources */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Badge variant="outline">Fuentes de Datos</Badge>
          </CardTitle>
          <CardDescription>
            Plataformas y sistemas de donde provienen los datos
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <h4 className="font-medium text-blue-600">Sensores Simulados</h4>
              <p className="text-sm text-muted-foreground mt-2">
                Datos de sensores locales que miden PM1.0, PM2.5, PM10, temperatura y humedad.
              </p>
            </div>

            <div className="text-center p-4 border rounded-lg">
              <h4 className="font-medium text-green-600">OpenAQ</h4>
              <p className="text-sm text-muted-foreground mt-2">
                Plataforma global de datos abiertos de calidad del aire con mediciones PM2.5 validadas.
              </p>
            </div>

            <div className="text-center p-4 border rounded-lg">
              <h4 className="font-medium text-orange-600">TEMPO</h4>
              <p className="text-sm text-muted-foreground mt-2">
                Instrumento satelital de la NASA para monitoreo de contaminantes gaseosos (NO₂, O₃, AOD).
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Health Standards */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Badge variant="outline">Estándares de Salud</Badge>
          </CardTitle>
          <CardDescription>
            Límites recomendados por organizaciones internacionales
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2 font-medium">Parámetro</th>
                  <th className="text-left p-2 font-medium">OMS (24h)</th>
                  <th className="text-left p-2 font-medium">EPA (24h)</th>
                  <th className="text-left p-2 font-medium">Riesgo</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-2">PM2.5</td>
                  <td className="p-2">15 µg/m³</td>
                  <td className="p-2">35 µg/m³</td>
                  <td className="p-2 text-orange-600">Moderado-Alto</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">PM10</td>
                  <td className="p-2">45 µg/m³</td>
                  <td className="p-2">150 µg/m³</td>
                  <td className="p-2 text-yellow-600">Moderado</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">NO₂</td>
                  <td className="p-2">25 µg/m³</td>
                  <td className="p-2">100 ppb</td>
                  <td className="p-2 text-red-600">Alto</td>
                </tr>
                <tr>
                  <td className="p-2">O₃</td>
                  <td className="p-2">100 µg/m³</td>
                  <td className="p-2">70 ppb</td>
                  <td className="p-2 text-red-600">Alto</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="text-center text-sm text-muted-foreground">
        <p>Esta información está basada en las últimas directrices de la OMS y EPA para calidad del aire.</p>
      </div>
      
      </div>
    </div>
  );
};