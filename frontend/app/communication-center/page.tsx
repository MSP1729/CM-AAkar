"use client";

import { MessageSquare, Send, Mail, Radio, AlertTriangle } from "lucide-react";


interface Communication {
  id: string;
  sender: string;
  role: string;
  type: "Directive" | "Inquiry" | "Emergency";
  subject: string;
  timestamp: string;
  status: "UNREAD" | "READ" | "RESPONDED";
}

const COMMUNICATIONS: Communication[] = [
  { id: "COM-01", sender: "Chief Secretary Office", role: "Delhi Secretariat", type: "Directive", subject: "Immediate compliance reporting on Yamuna Riverfront clearance delays", timestamp: "2026-06-17 14:02", status: "UNREAD" },
  { id: "COM-02", sender: "District Magistrate", role: "South West Delhi", type: "Inquiry", subject: "Request for supplementary land acquisition funds for Dwarka Expressway", timestamp: "2026-06-17 11:30", status: "READ" },
  { id: "COM-03", sender: "Disaster Management Cell", role: "Delhi Control Room", type: "Emergency", subject: "Flood warning bulletin issued for Yamuna floodplain zones", timestamp: "2026-06-17 09:12", status: "RESPONDED" },
  { id: "COM-04", sender: "Education Department", role: "Directorate of Ed.", type: "Inquiry", subject: "School modernization project status report pending for North East Delhi", timestamp: "2026-06-17 08:45", status: "READ" },
];

export default function CommunicationCenterPage() {
  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-[1200px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side: Compose Directive */}
        <div className="bg-white border border-slate-200 rounded p-6 shadow-2xs h-fit space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Send className="h-4.5 w-4.5 text-gov-gold-500" />
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Issue State Directive
            </h3>
          </div>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Recipient Authority
              </label>
              <select className="w-full bg-slate-50 border border-slate-200 text-xs rounded p-2 focus:outline-none focus:ring-1 focus:ring-gov-gold-500 text-slate-700">
                <option>All District Magistrates</option>
                <option>New Delhi (NDD_01)</option>
                <option>South Delhi (SD_02)</option>
                <option>Central Delhi (CD_04)</option>
                <option>North Delhi (ND_03)</option>
                <option>East Delhi (ED_06)</option>
                <option>West Delhi (WD_05)</option>
                <option>North West Delhi (NWD_08)</option>
                <option>South West Delhi (SWD_09)</option>
                <option>South East Delhi (SED_10)</option>
                <option>North East Delhi (NED_07)</option>
                <option>Shahdara (SDD_11)</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Priority Classification
              </label>
              <select className="w-full bg-slate-50 border border-slate-200 text-xs rounded p-2 focus:outline-none focus:ring-1 focus:ring-gov-gold-500 text-slate-700">
                <option>Normal (Standard SLA)</option>
                <option>Priority (48-Hour Response)</option>
                <option>Urgent (Immediate Clearances)</option>
                <option>State Emergency (Direct Line)</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Directive Text
              </label>
              <textarea
                rows={4}
                placeholder="Enter formal dispatch wording here..."
                className="w-full bg-slate-50 border border-slate-200 text-xs rounded p-2 focus:outline-none focus:ring-1 focus:ring-gov-gold-500 text-slate-700 placeholder-slate-400 font-medium"
              ></textarea>
            </div>
            <button
              type="button"
              onClick={() => alert("Directive dispatched with secure seal 254002.")}
              className="w-full bg-gov-navy-950 hover:bg-gov-navy-900 border border-gov-navy-800 text-gov-gold-500 text-xs font-bold py-2 px-4 rounded tracking-wider uppercase transition-colors"
            >
              Dispatch Directive
            </button>
          </form>
        </div>

        {/* Right Side: Communication Logs */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded shadow-xs overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4.5 w-4.5 text-gov-gold-500" />
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Active Mail & Radio Dispatches
              </h3>
            </div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Secure Channel
            </span>
          </div>

          <div className="divide-y divide-slate-100">
            {COMMUNICATIONS.map((com) => {
              const isUnread = com.status === "UNREAD";
              const isEmergency = com.type === "Emergency";

              return (
                <div
                  key={com.id}
                  className={`p-4 hover:bg-slate-50/50 transition-colors flex items-start gap-4 ${
                    isUnread ? "bg-gov-gold-50/10" : ""
                  }`}
                >
                  <div className="mt-1">
                    {isEmergency ? (
                      <div className="p-1.5 bg-red-100 text-red-700 border border-red-200 rounded-full">
                        <AlertTriangle className="h-4 w-4" />
                      </div>
                    ) : (
                      <div className={`p-1.5 rounded-full ${
                        isUnread
                          ? "bg-gov-gold-100 text-gov-gold-700 border border-gov-gold-200"
                          : "bg-slate-100 text-slate-400 border border-slate-200"
                      }`}>
                        <Mail className="h-4 w-4" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-black text-slate-800">
                          {com.sender}
                        </span>
                        <span className="text-[9px] font-bold text-slate-400 font-mono bg-slate-100 border border-slate-200 px-1 rounded">
                          {com.role}
                        </span>
                      </div>
                      <span className="text-[9px] font-mono text-slate-400">
                        {com.timestamp}
                      </span>
                    </div>

                    <p className="text-xs font-semibold text-slate-700 leading-normal">
                      {com.subject}
                    </p>

                    <div className="flex items-center justify-between pt-1 text-[10px]">
                      <span className={`font-mono font-bold tracking-wide uppercase text-[8px] px-1.5 py-0.2 rounded border ${
                        com.type === "Emergency"
                          ? "bg-red-600 text-white border-red-700"
                          : com.type === "Directive"
                          ? "bg-gov-navy-950 text-gov-gold-500 border-gov-navy-900"
                          : "bg-slate-100 text-slate-600 border-slate-200"
                      }`}>
                        {com.type}
                      </span>

                      <span className={`font-bold font-mono ${
                        isUnread ? "text-gov-gold-600" : "text-slate-400"
                      }`}>
                        {com.status}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
