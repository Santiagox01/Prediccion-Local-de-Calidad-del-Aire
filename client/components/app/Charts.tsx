import React, { useEffect, useRef } from "react";
import type { UnifiedRecord } from "./KPICards";

function last24h(data: UnifiedRecord[]) {
  const now = Date.now();
  const dayAgo = now - 24 * 3600 * 1000;
  return data.filter((d) => new Date(d.timestamp).getTime() >= dayAgo);
}

export const Charts: React.FC<{ data: UnifiedRecord[] }>=({ data }) => {
  const elPmRef = useRef<HTMLDivElement | null>(null);
  const elGasRef = useRef<HTMLDivElement | null>(null);
  const elCmpRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!(window as any).Plotly) return;
    const Plotly = (window as any).Plotly;
    const d24 = last24h(data);

    const hasPm24 = d24.some(d => (d.pm25_sensor ?? d.pm25_openaq) != null);
    const hasGas24 = d24.some(d => (d.no2_tempo != null) || (d.o3_tempo != null));

    const pmData = hasPm24 ? d24 : data;
    const gasData = hasGas24 ? d24 : data;

    const tsPm = pmData.map(d => d.timestamp);
    const tsGas = gasData.map(d => d.timestamp);

    // PM2.5 timeseries (sensor vs openaq)
    const pm_sensor = pmData.map(d => d.pm25_sensor);
    const pm_openaq = pmData.map(d => d.pm25_openaq);
    Plotly.newPlot(elPmRef.current, [
      { x: tsPm, y: pm_sensor, name: "PM2.5 Sensor", mode: "lines+markers", line: { color: "#4CAF50" } },
      { x: tsPm, y: pm_openaq, name: "PM2.5 OpenAQ", mode: "lines+markers", line: { color: "#0B3D91" } },
    ], { title: hasPm24 ? "Serie temporal PM2.5 (24 h)" : "Serie temporal PM2.5 (todo)", margin: { t: 40, r: 10, b: 40, l: 40 } }, {responsive: true});

    // NO2 / O3 timeseries
    const no2 = gasData.map(d => d.no2_tempo);
    const o3 = gasData.map(d => d.o3_tempo);
    Plotly.newPlot(elGasRef.current, [
      { x: tsGas, y: no2, name: "NO₂ (TEMPO)", mode: "lines", line: { color: "#f59e0b" } },
      { x: tsGas, y: o3, name: "O₃ (TEMPO)", mode: "lines", line: { color: "#ef4444" } },
    ], { title: hasGas24 ? "Serie temporal NO₂ / O₃ (24 h)" : "Serie temporal NO₂ / O₃ (todo)", margin: { t: 40, r: 10, b: 40, l: 40 } }, {responsive: true});

    // Comparison bar (avg of chosen windows)
    const avg = (arr: (number|null)[]) => {
      const v = arr.filter((x): x is number => typeof x === 'number' && !isNaN(x));
      if (!v.length) return null;
      return v.reduce((a,b)=>a+b,0)/v.length;
    };
    const cmpX = ["PM2.5 Sensor", "PM2.5 OpenAQ", "NO₂", "O₃"];
    const cmpY = [avg(pm_sensor), avg(pm_openaq), avg(no2), avg(o3)];
    Plotly.newPlot(elCmpRef.current, [
      { x: cmpX, y: cmpY, type: "bar", marker: { color: ["#4CAF50", "#0B3D91", "#f59e0b", "#ef4444"] } }
    ], { title: hasGas24 && hasPm24 ? "Comparativa promedios (24 h)" : "Comparativa promedios (todo)", margin: { t: 40, r: 10, b: 40, l: 40 } }, {responsive: true});

    const handle = () => {
      Plotly.Plots.resize(elPmRef.current);
      Plotly.Plots.resize(elGasRef.current);
      Plotly.Plots.resize(elCmpRef.current);
    };
    window.addEventListener('resize', handle);
    return () => window.removeEventListener('resize', handle);
  }, [data]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="col-span-1 lg:col-span-2 rounded-xl border border-border bg-white/70 dark:bg-zinc-900 p-3">
        <div ref={elPmRef} style={{height: 360}} />
      </div>
      <div className="rounded-xl border border-border bg-white/70 dark:bg-zinc-900 p-3">
        <div ref={elGasRef} style={{height: 360}} />
      </div>
      <div className="rounded-xl border border-border bg-white/70 dark:bg-zinc-900 p-3 lg:col-span-3">
        <div ref={elCmpRef} style={{height: 300}} />
      </div>
    </div>
  );
};
