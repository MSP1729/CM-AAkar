import AiSummary from "@/components/AiSummary";

export default function AskAiPage() {
  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-[1200px] mx-auto">
      <div className="flex flex-col gap-1 border-b border-slate-200 pb-5 mb-4">
        <h2 className="text-xl font-bold text-slate-800 uppercase tracking-tight">
          Ask AI — Governance Insights
        </h2>
        <p className="text-xs text-slate-500 font-medium">
          AI-generated executive briefings, risk assessments, and automated governance recommendations.
        </p>
      </div>

      <AiSummary />
    </div>
  );
}
