import KpiCards from "@/components/KpiCards";
import HeatmapPlaceholder from "@/components/HeatmapPlaceholder";

export default function DashboardPage() {
  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-[1600px] mx-auto flex flex-col h-[100vh]">
      <KpiCards />
      <div className="flex-1">
        <HeatmapPlaceholder />
      </div>
    </div>
  );
}
