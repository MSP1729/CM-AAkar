"use client";

import { useState, useEffect } from "react";
import { Map, AlertCircle, CheckCircle, Info } from "lucide-react";
import "leaflet/dist/leaflet.css";

interface MapRegion {
  id: string;
  name: string;
  code: string;
  score: number;
  status: "Optimal" | "Warning" | "Critical";
  activeProjects: number;
}

const REGIONS: MapRegion[] = [
  {
    id: "REG-1", name: "North West Delhi", code: "NWD_08", score: 76.2, status: "Warning", activeProjects: 91,
  },
  {
    id: "REG-2", name: "North Delhi", code: "ND_03", score: 67.1, status: "Warning", activeProjects: 48,
  },
  {
    id: "REG-3", name: "North East Delhi", code: "NED_07", score: 59.8, status: "Critical", activeProjects: 52,
  },
  {
    id: "REG-4", name: "West Delhi", code: "WD_05", score: 73.8, status: "Warning", activeProjects: 62,
  },
  {
    id: "REG-5", name: "Central Delhi", code: "CD_04", score: 84.1, status: "Optimal", activeProjects: 65,
  },
  {
    id: "REG-6", name: "East Delhi", code: "ED_06", score: 79.5, status: "Warning", activeProjects: 58,
  },
  {
    id: "REG-7", name: "Shahdara", code: "SDD_11", score: 63.5, status: "Warning", activeProjects: 41,
  },
  {
    id: "REG-8", name: "South West Delhi", code: "SWD_09", score: 70.4, status: "Warning", activeProjects: 55,
  },
  {
    id: "REG-9", name: "New Delhi", code: "NDD_01", score: 92.4, status: "Optimal", activeProjects: 84,
  },
  {
    id: "REG-10", name: "South Delhi", code: "SD_02", score: 88.7, status: "Optimal", activeProjects: 72,
  },
  {
    id: "REG-11", name: "South East Delhi", code: "SED_10", score: 55.2, status: "Critical", activeProjects: 38,
  },
];

export default function HeatmapPlaceholder() {
  const [selectedRegion, setSelectedRegion] = useState<MapRegion>(REGIONS[8]);
  const [geojsonData, setGeojsonData] = useState<any>(null);
  const [LeafletComponents, setLeafletComponents] = useState<any>(null);

  useEffect(() => {
    // Fetch processed GeoJSON from the public folder
    fetch("/delhi_districts.geojson")
      .then((res) => res.json())
      .then((data) => setGeojsonData(data))
      .catch((err) => console.error("Error loading GeoJSON:", err));

    // Dynamically load Leaflet and React-Leaflet on the client side
    const loadLeaflet = async () => {
      try {
        const L = await import("leaflet");
        const ReactLeaflet = await import("react-leaflet");

        // Fix Leaflet default marker icons issue
        delete (L.Icon.Default.prototype as any)._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
          iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
          shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        });

        setLeafletComponents({
          L,
          MapContainer: ReactLeaflet.MapContainer,
          TileLayer: ReactLeaflet.TileLayer,
          GeoJSON: ReactLeaflet.GeoJSON,
          Tooltip: ReactLeaflet.Tooltip,
        });
      } catch (err) {
        console.error("Error loading Leaflet components:", err);
      }
    };

    loadLeaflet();
  }, []);

  const getStyle = (region: MapRegion | undefined, isSelected: boolean) => {
    if (!region) {
      return {
        fillColor: "#f1f5f9",
        weight: 1,
        color: "#cbd5e1",
        fillOpacity: 0.6,
      };
    }

    let fillColor = "#cbd5e1";
    let strokeColor = "#94a3b8";

    if (region.status === "Optimal") {
      fillColor = isSelected ? "#a7f3d0" : "#ecfdf5"; // emerald-200 : emerald-50
      strokeColor = isSelected ? "#059669" : "#10b981"; // emerald-600 : emerald-500
    } else if (region.status === "Warning") {
      fillColor = isSelected ? "#fde68a" : "#fffbeb"; // amber-200 : amber-50
      strokeColor = isSelected ? "#d97706" : "#f59e0b"; // amber-600 / gold-600 : amber-500
    } else if (region.status === "Critical") {
      fillColor = isSelected ? "#fecaca" : "#fef2f2"; // red-200 : red-50
      strokeColor = isSelected ? "#dc2626" : "#ef4444"; // red-600 : red-500
    }

    return {
      fillColor: fillColor,
      weight: isSelected ? 2.5 : 1.5,
      color: strokeColor,
      fillOpacity: isSelected ? 0.85 : 0.65,
    };
  };

  const renderMap = () => {
    if (!LeafletComponents || !geojsonData) {
      return (
        <div className="relative flex-1 w-full h-[350px] lg:h-[400px] mt-2 rounded-md border border-slate-200/80 bg-slate-50 flex flex-col items-center justify-center gap-3">
          <div className="h-6 w-6 border-2 border-gov-gold-500/80 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-xs font-semibold text-slate-400 font-sans tracking-wide">
            Loading Delhi GIS Map...
          </span>
        </div>
      );
    }

    const { MapContainer, TileLayer, GeoJSON } = LeafletComponents;

    return (
      <div className="relative flex-1 w-full h-[350px] lg:h-[400px] mt-2 rounded-md overflow-hidden border border-slate-200/80 shadow-xs z-10">
        <MapContainer
          bounds={[[28.4, 76.8], [28.9, 77.3]]}
          zoomSnap={0.5}
          zoomDelta={0.5}
          style={{ height: "100%", width: "100%" }}
          zoomControl={true}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <GeoJSON
            key={selectedRegion.id}
            data={geojsonData}
            style={(feature: any) => {
              const districtName = feature?.properties?.district_name;
              const region = REGIONS.find((r) => r.name.toLowerCase() === districtName?.toLowerCase());
              return getStyle(region, selectedRegion.id === region?.id);
            }}
            onEachFeature={(feature: any, layer: any) => {
              const districtName = feature?.properties?.district_name;
              const region = REGIONS.find((r) => r.name.toLowerCase() === districtName?.toLowerCase());

              if (region) {
                // Add rich tooltip showing details
                layer.bindTooltip(
                  `<div class="font-sans p-1">
                    <div class="font-bold text-slate-800 text-xs">${region.name}</div>
                    <div class="text-[10px] text-slate-500 mt-0.5">Score: <span class="font-mono font-bold">${region.score}/100</span></div>
                    <div class="text-[10px] text-slate-500">Status: <span class="font-bold uppercase ${
                      region.status === 'Optimal' ? 'text-emerald-600' : region.status === 'Warning' ? 'text-gov-gold-600' : 'text-red-600'
                    }">${region.status}</span></div>
                   </div>`,
                  { permanent: false, direction: 'auto', opacity: 0.95 }
                );
              }

              layer.on({
                mouseover: (e: any) => {
                  const target = e.target;
                  target.setStyle({
                    fillOpacity: 0.85,
                    weight: 2.5,
                    color: region?.status === "Optimal" ? "#047857" : region?.status === "Warning" ? "#b45309" : "#b91c1c",
                  });
                  if (!LeafletComponents.L.Browser.ie && !LeafletComponents.L.Browser.opera && !LeafletComponents.L.Browser.edge) {
                    target.bringToFront();
                  }
                },
                mouseout: (e: any) => {
                  const target = e.target;
                  target.setStyle(getStyle(region, selectedRegion.id === region?.id));
                },
                click: () => {
                  if (region) {
                    setSelectedRegion(region);
                  }
                },
              });
            }}
          />
        </MapContainer>
      </div>
    );
  };

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

          {renderMap()}

          <div className="flex gap-4 border-t border-slate-100 pt-3 mt-4 text-[10px] font-bold text-slate-400 justify-center">
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

      <style>{`
        .leaflet-container {
          background-color: #f8fafc !important;
          font-family: inherit;
        }
        .leaflet-tooltip {
          background-color: #ffffff !important;
          border: 1px solid #e2e8f0 !important;
          border-radius: 4px !important;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06) !important;
        }
        .leaflet-tooltip-pane {
          z-index: 650 !important;
        }
        .leaflet-control-zoom {
          border: 1px solid #cbd5e1 !important;
          box-shadow: none !important;
        }
        .leaflet-control-zoom a {
          background-color: #ffffff !important;
          color: #475569 !important;
          border-bottom: 1px solid #cbd5e1 !important;
        }
        .leaflet-control-zoom a:hover {
          background-color: #f1f5f9 !important;
          color: #1e293b !important;
        }
      `}</style>
    </div>
  );
}
