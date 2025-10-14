import React, { useEffect, useRef } from "react";
import type { UnifiedRecord } from "./KPICards";

function colorForAQI(aqi: number | null) {
  if (aqi == null) return "#9ca3af"; // gray
  if (aqi <= 50) return "#22c55e";
  if (aqi <= 100) return "#a3e635";
  if (aqi <= 150) return "#f59e0b";
  if (aqi <= 200) return "#ef4444";
  if (aqi <= 300) return "#8b5cf6";
  return "#7f1d1d";
}

export const MapView: React.FC<{ data: UnifiedRecord[] }>= ({ data }) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const leafletMapRef = useRef<any>(null);

  useEffect(() => {
    const L: any = (window as any).L;
    if (!L || !mapRef.current) return;

    if (!leafletMapRef.current) {
      leafletMapRef.current = L.map(mapRef.current).setView([4.711, -74.0721], 10);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(leafletMapRef.current);
    }

    const m = leafletMapRef.current;

    // Clear existing layer group if any
    if ((m as any)._dataLayer) {
      m.removeLayer((m as any)._dataLayer);
    }
    const group = (m as any)._dataLayer = (window as any).L.layerGroup().addTo(m);

    data.forEach((d) => {
      if (d.lat == null || d.lon == null) return;
      const color = colorForAQI(d.aqi);
      const circle = (window as any).L.circleMarker([d.lat, d.lon], {
        radius: 6,
        color,
        fillColor: color,
        fillOpacity: 0.8,
        weight: 1,
      });
      circle.bindPopup(`<div><strong>${new Date(d.timestamp).toLocaleString()}</strong><br/>AQI: ${d.aqi ?? 'N/D'}<br/>PM2.5: ${d.pm25_sensor ?? d.pm25_openaq ?? 'N/D'}</div>`);
      circle.addTo(group);
    });
  }, [data]);

  return (
    <div className="rounded-xl overflow-hidden border border-border">
      <div ref={mapRef} style={{ height: 420, width: '100%' }} />
    </div>
  );
};
