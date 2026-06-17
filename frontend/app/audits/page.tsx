import { ShieldCheck, ClipboardCheck, AlertTriangle, FileSpreadsheet } from "lucide-react";

interface AuditRule {
  id: string;
  name: string;
  category: "Financial" | "Operational" | "Regulatory" | "Security";
  status: "Passed" | "Warning" | "Pending";
  details: string;
}

const AUDIT_RULES: AuditRule[] = [
  { id: "AUD-01", name: "Fund Release Signature Protocol", category: "Financial", status: "Passed", details: "All fund releases over ₹10 Cr verified with dual cryptographic hashes." },
  { id: "AUD-02", name: "Dwarka Expressway EIA Compliance", category: "Regulatory", status: "Warning", details: "Contractor failed to submit revised Environmental Impact Assessment report on time." },
  { id: "AUD-03", name: "Officer Session Verification", category: "Security", status: "Passed", details: "Biometric and IP bindings validated for all DM active logins across 11 districts." },
  { id: "AUD-04", name: "Yamuna Riverfront Contractor Audit", category: "Financial", status: "Pending", details: "Phase 2 sub-contracting invoices for Yamuna Riverfront works awaiting central verification." },
  { id: "AUD-05", name: "Citizen Portal Penetration Test", category: "Security", status: "Passed", details: "Zero critical high-risk threats detected on Delhi citizen services gateway." },
];

export default function AuditsPage() {
  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-[1200px] mx-auto">
      {/* KPI stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white border border-slate-200 rounded p-5 flex items-center justify-between shadow-2xs">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Overall Audit Score
            </span>
            <span className="text-2xl font-black text-slate-800 mt-1 block">
              98.2%
            </span>
          </div>
          <div className="p-3 bg-emerald-50 rounded border border-emerald-100 text-emerald-600">
            <ShieldCheck className="h-5 w-5" />
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded p-5 flex items-center justify-between shadow-2xs">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Active Exceptions
            </span>
            <span className="text-2xl font-black text-gov-gold-600 mt-1 block">
              1 Flagged
            </span>
          </div>
          <div className="p-3 bg-amber-50 rounded border border-amber-100 text-gov-gold-600">
            <AlertTriangle className="h-5 w-5" />
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded p-5 flex items-center justify-between shadow-2xs">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Protocols Audited
            </span>
            <span className="text-2xl font-black text-slate-800 mt-1 block">
               32 Protocols
            </span>
          </div>
          <div className="p-3 bg-slate-50 rounded border border-slate-200 text-slate-500">
            <ClipboardCheck className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* Audit Rules Table */}
      <div className="bg-white border border-slate-200 rounded shadow-xs overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="h-5 w-5 text-gov-gold-500" />
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
              System Audit Protocols & Compliance Registers
            </h3>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-slate-600">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-black uppercase text-slate-400 tracking-wider">
                <th className="py-3 px-4 w-24">Protocol ID</th>
                <th className="py-3 px-4">Audit Parameter</th>
                <th className="py-3 px-4 text-center">Category</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4">Observation Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {AUDIT_RULES.map((rule) => (
                <tr key={rule.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-500">{rule.id}</td>
                  <td className="py-3.5 px-4 font-bold text-slate-800">{rule.name}</td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="inline-block px-2 py-0.5 rounded text-[9px] font-bold bg-slate-100 text-slate-600 border border-slate-200 uppercase tracking-wider">
                      {rule.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span
                      className={`inline-block font-mono font-bold px-2 py-0.5 rounded border text-[9px] uppercase tracking-wider ${
                        rule.status === "Passed"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : rule.status === "Warning"
                          ? "bg-amber-50 text-amber-700 border-amber-200"
                          : "bg-slate-100 text-slate-500 border-slate-200"
                      }`}
                    >
                      {rule.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-medium text-slate-500 leading-normal max-w-sm">
                    {rule.details}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
