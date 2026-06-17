import { Coins, IndianRupee, ShieldAlert, CheckCircle } from "lucide-react";

interface FundItem {
  department: string;
  allocated: number; // in Crores
  spent: number;
  utilization: number;
}

const FUNDS_DATA: FundItem[] = [
  { department: "Public Works (PWD)", allocated: 1250, spent: 940, utilization: 75.2 },
  { department: "Health & Family Welfare", allocated: 680, spent: 420, utilization: 61.8 },
  { department: "Education", allocated: 520, spent: 450, utilization: 86.5 },
  { department: "Transport", allocated: 920, spent: 620, utilization: 67.4 },
  { department: "Urban Development", allocated: 780, spent: 710, utilization: 91.0 },
];

export default function FundsPage() {
  const totalAllocated = FUNDS_DATA.reduce((acc, curr) => acc + curr.allocated, 0);
  const totalSpent = FUNDS_DATA.reduce((acc, curr) => acc + curr.spent, 0);
  const avgUtilization = Number(((totalSpent / totalAllocated) * 100).toFixed(1));

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-[1200px] mx-auto">
      {/* KPI Cards for Funds */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-slate-200 rounded p-6 shadow-2xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Total Allocated Budget
          </span>
          <span className="text-3xl font-black text-slate-800 mt-2 block font-mono">
            ₹{totalAllocated.toLocaleString()} Cr
          </span>
          <span className="text-[10px] text-slate-500 mt-1 block">
            Delhi Consolidated Fund FY 2026-27
          </span>
        </div>

        <div className="bg-white border border-slate-200 rounded p-6 shadow-2xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Total Disbursed & Spent
          </span>
          <span className="text-3xl font-black text-slate-800 mt-2 block font-mono">
            ₹{totalSpent.toLocaleString()} Cr
          </span>
          <span className="text-[10px] text-emerald-600 font-semibold mt-1 block">
            Verified via Automated Treasury Logs
          </span>
        </div>

        <div className="bg-white border border-slate-200 rounded p-6 shadow-2xs relative overflow-hidden">
          <div className="absolute right-0 top-0 w-2 bg-gov-gold-500 h-full"></div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Average Utilization Rate
          </span>
          <span className="text-3xl font-black text-gov-gold-600 mt-2 block font-mono">
            {avgUtilization}%
          </span>
          <span className="text-[10px] text-slate-500 mt-1 block">
            Target benchmark: &gt; 80% by Q3
          </span>
        </div>
      </div>

      {/* Sector Fund Performance */}
      <div className="bg-white border border-slate-200 rounded shadow-xs overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Coins className="h-5 w-5 text-gov-gold-500" />
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
              Sector Budgets & Utilization Breakdown
            </h3>
          </div>
          <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-500 px-2 py-0.5 rounded border border-slate-200">
            Audit State: Active
          </span>
        </div>

        <div className="p-6 space-y-6">
          {FUNDS_DATA.map((fund) => {
            const isOptimal = fund.utilization >= 75;
            const isWarning = fund.utilization >= 50 && fund.utilization < 75;

            return (
              <div key={fund.department} className="space-y-2">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">
                      {fund.department}
                    </h4>
                    <span className="text-[10px] text-slate-400 font-mono">
                      Allocated: ₹{fund.allocated} Cr | Spent: ₹{fund.spent} Cr
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold text-slate-700">
                      {fund.utilization}% Used
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 text-[9px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${
                        isOptimal
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : isWarning
                          ? "bg-amber-50 text-amber-700 border-amber-200"
                          : "bg-red-50 text-red-700 border-red-200"
                      }`}
                    >
                      {isOptimal ? (
                        <CheckCircle className="h-3 w-3" />
                      ) : (
                        <ShieldAlert className="h-3 w-3" />
                      )}
                      {isOptimal ? "Optimal" : isWarning ? "Warning" : "Critical"}
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isOptimal
                        ? "bg-emerald-500"
                        : isWarning
                        ? "bg-gov-gold-500"
                        : "bg-red-500"
                    }`}
                    style={{ width: `${fund.utilization}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
