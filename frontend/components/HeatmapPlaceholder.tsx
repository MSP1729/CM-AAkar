"use client";

import { useState } from "react";
import { Map, AlertCircle, CheckCircle, Info } from "lucide-react";

interface MapRegion {
  id: string;
  name: string;
  code: string;
  score: number;
  status: "Optimal" | "Warning" | "Critical";
  activeProjects: number;
  svgPath: string;
}

const RECT = (x: number, y: number, w: number, h: number) =>
  `M ${x},${y} L ${x + w},${y} L ${x + w},${y + h} L ${x},${y + h} Z`;

const REGIONS: MapRegion[] = [
  {
    id: "REG-1", name: "North West Delhi", code: "NWD_08", score: 76.2, status: "Warning", activeProjects: 91,
    svgPath: RECT(20, 10, 110, 60),
  },
  {
    id: "REG-2", name: "North Delhi", code: "ND_03", score: 67.1, status: "Warning", activeProjects: 48,
    svgPath: RECT(140, 10, 120, 60),
  },
  {
    id: "REG-3", name: "North East Delhi", code: "NED_07", score: 59.8, status: "Critical", activeProjects: 52,
    svgPath: RECT(270, 10, 110, 60),
  },
  {
    id: "REG-4", name: "West Delhi", code: "WD_05", score: 73.8, status: "Warning", activeProjects: 62,
    svgPath: RECT(20, 80, 110, 60),
  },
  {
    id: "REG-5", name: "Central Delhi", code: "CD_04", score: 84.1, status: "Optimal", activeProjects: 65,
    svgPath: RECT(140, 80, 120, 60),
  },
  {
    id: "REG-6", name: "East Delhi", code: "ED_06", score: 79.5, status: "Warning", activeProjects: 58,
    svgPath: RECT(270, 80, 70, 60),
  },
  {
    id: "REG-7", name: "Shahdara", code: "SDD_11", score: 63.5, status: "Warning", activeProjects: 41,
    svgPath: RECT(345, 80, 45, 60),
  },
  {
    id: "REG-8", name: "South West Delhi", code: "SWD_09", score: 70.4, status: "Warning", activeProjects: 55,
    svgPath: RECT(30, 150, 110, 60),
  },
  {
    id: "REG-9", name: "New Delhi", code: "NDD_01", score: 92.4, status: "Optimal", activeProjects: 84,
    svgPath: RECT(150, 150, 100, 60),
  },
  {
    id: "REG-10", name: "South Delhi", code: "SD_02", score: 88.7, status: "Optimal", activeProjects: 72,
    svgPath: RECT(260, 150, 100, 60),
  },
  {
    id: "REG-11", name: "South East Delhi", code: "SED_10", score: 55.2, status: "Critical", activeProjects: 38,
    svgPath: RECT(100, 220, 190, 45),
  },
];

export default function HeatmapPlaceholder() {
  const [selectedRegion, setSelectedRegion] = useState<MapRegion>(REGIONS[8]);

  return (
    <div className="bg-white border border-slate-200 rounded shadow-xs overflow-hidden h-full flex flex-col">
      <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Map className="h-5 w-5 text-gov-gold-500" />
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
            Delhi District Performance Heatmap
          </h3>
        </div>
        <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-500 px-2 py-0.5 rounded uppercase border border-slate-200">
          Delhi NCT v1.0
        </span>
      </div>

      <div className="p-6 grid grid-cols-1 lg:grid-cols-5 gap-6 flex-1">
        <div className="lg:col-span-3 flex flex-col justify-between border border-slate-100 rounded-md p-4 bg-slate-50/50">
          <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-2">
            <span>District Boundary Grid</span>
            <span className="text-gov-gold-600">Click to Select District</span>
          </div>

          <div className="relative flex-1 flex items-center justify-center min-h-[200px]">
            <svg
              viewBox="0 0 410 290"
              className="w-full max-w-[450px] h-auto drop-shadow-sm transition-all"
            >
              {REGIONS.map((region) => {
                const isSelected = selectedRegion.id === region.id;
                let fillColor = "fill-slate-100 stroke-slate-300";

                if (region.status === "Optimal") {
                  fillColor = isSelected
                    ? "fill-emerald-100 stroke-emerald-600 stroke-2"
                    : "fill-emerald-50/60 hover:fill-emerald-100/80 stroke-emerald-400";
                } else if (region.status === "Warning") {
                  fillColor = isSelected
                    ? "fill-amber-100 stroke-gov-gold-600 stroke-2"
                    : "fill-amber-50/60 hover:fill-amber-100/80 stroke-amber-400";
                } else if (region.status === "Critical") {
                  fillColor = isSelected
                    ? "fill-red-100 stroke-red-600 stroke-2"
                    : "fill-red-50/60 hover:fill-red-100/80 stroke-red-400";
                }

                return (
                  <path
                    key={region.id}
                    d={region.svgPath}
                    className={`cursor-pointer transition-all duration-200 ${fillColor}`}
                    onClick={() => setSelectedRegion(region)}
                  />
                );
              })}
              <text x="75" y="47" textAnchor="middle" className="text-[9px] font-bold fill-amber-700 font-mono pointer-events-none">NWD</text>
              <text x="200" y="47" textAnchor="middle" className="text-[9px] font-bold fill-amber-700 font-mono pointer-events-none">ND</text>
              <text x="325" y="47" textAnchor="middle" className="text-[9px] font-bold fill-red-700 font-mono pointer-events-none">NED</text>
              <text x="75" y="117" textAnchor="middle" className="text-[9px] font-bold fill-amber-700 font-mono pointer-events-none">WD</text>
              <text x="200" y="117" textAnchor="middle" className="text-[9px] font-bold fill-emerald-700 font-mono pointer-events-none">CD</text>
              <text x="305" y="117" textAnchor="middle" className="text-[9px] font-bold fill-amber-700 font-mono pointer-events-none">ED</text>
              <text x="367" y="117" textAnchor="middle" className="text-[8px] font-bold fill-amber-700 font-mono pointer-events-none">SDD</text>
              <text x="85" y="187" textAnchor="middle" className="text-[9px] font-bold fill-amber-700 font-mono pointer-events-none">SWD</text>
              <text x="200" y="187" textAnchor="middle" className="text-[9px] font-bold fill-emerald-700 font-mono pointer-events-none">NDD</text>
              <text x="310" y="187" textAnchor="middle" className="text-[9px] font-bold fill-emerald-700 font-mono pointer-events-none">SD</text>
              <text x="195" y="247" textAnchor="middle" className="text-[9px] font-bold fill-red-700 font-mono pointer-events-none">SED</text>
            </svg>
          </div>

          <div className="flex gap-4 border-t border-slate-100 pt-3 mt-2 text-[10px] font-bold text-slate-400 justify-center">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-xs bg-emerald-100 border border-emerald-400"></span>
              <span>Optimal (&gt;80)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-xs bg-amber-100 border border-amber-400"></span>
              <span>Warning (60-80)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-xs bg-red-100 border border-red-400"></span>
              <span>Critical (&lt;60)</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 border border-slate-100 rounded-md p-5 flex flex-col justify-between">
          <div>
            <div className="border-b border-slate-100 pb-3 mb-4">
              <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                District Focus Details
              </div>
              <h4 className="text-md font-bold text-slate-800 mt-1">
                {selectedRegion.name}
              </h4>
              <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded border border-slate-200 mt-1.5 inline-block">
                Code: {selectedRegion.code}
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center text-xs font-bold text-slate-500 mb-1">
                  <span>Governance Score</span>
                  <span className="font-mono">{selectedRegion.score}/100</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      selectedRegion.status === "Optimal"
                        ? "bg-emerald-500"
                        : selectedRegion.status === "Warning"
                        ? "bg-gov-gold-500"
                        : "bg-red-500"
                    }`}
                    style={{ width: `${selectedRegion.score}%` }}
                  ></div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="bg-slate-50 border border-slate-100 rounded p-2.5">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
                    District Status
                  </span>
                  <div className="flex items-center gap-1.5 mt-1">
                    {selectedRegion.status === "Optimal" && (
                      <CheckCircle className="h-3.5 w-3.5 text-emerald-600" />
                    )}
                    {selectedRegion.status === "Warning" && (
                      <AlertCircle className="h-3.5 w-3.5 text-gov-gold-600" />
                    )}
                    {selectedRegion.status === "Critical" && (
                      <AlertCircle className="h-3.5 w-3.5 text-red-600" />
                    )}
                    <span
                      className={`text-xs font-bold ${
                        selectedRegion.status === "Optimal"
                          ? "text-emerald-700"
                          : selectedRegion.status === "Warning"
                          ? "text-gov-gold-700"
                          : "text-red-700"
                      }`}
                    >
                      {selectedRegion.status}
                    </span>
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-100 rounded p-2.5">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
                    Active Projects
                  </span>
                  <span className="text-sm font-bold text-slate-800 block mt-1">
                    {selectedRegion.activeProjects}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-3 mt-4 text-[10px] text-slate-400 font-medium leading-relaxed flex gap-2">
            <Info className="h-4.5 w-4.5 text-slate-300 shrink-0" />
            <span>
              Real-time synchronization active. Data sourced from Delhi department dashboards.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
