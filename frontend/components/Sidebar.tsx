"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Map,
  FolderKanban,
  Coins,
  ShieldAlert,
  Activity,
  ClipboardList,
  MessageSquare,
  Lightbulb,
  Settings,
  Info,
  LogOut,
  ChevronRight,
} from "lucide-react";

interface SidebarItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const PRIMARY_NAV: SidebarItem[] = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Ask AI", href: "/ask-ai", icon: Lightbulb },
  { name: "Districts", href: "/districts", icon: Map },
  { name: "Projects", href: "/projects", icon: FolderKanban },
  { name: "Funds", href: "/funds", icon: Coins },
  { name: "Officers", href: "/officers", icon: ShieldAlert },
  { name: "Actions", href: "/actions", icon: Activity },
  { name: "Audits", href: "/audits", icon: ClipboardList },
  { name: "Communication Center", href: "/communication-center", icon: MessageSquare },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-gov-navy-950 text-slate-300 flex flex-col h-screen sticky top-0 border-r border-gov-navy-800 select-none shrink-0 z-30">
      {/* Brand Header */}
      <div className="p-6 border-b border-gov-navy-900 flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="text-gov-gold-500 font-serif text-3xl font-extrabold tracking-wide drop-shadow-md select-none">
            आकार
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold tracking-wider text-slate-100 uppercase leading-none">
              AAKAR
            </span>
            <span className="text-[9px] font-medium text-gov-gold-600 tracking-widest leading-none mt-1">
              CM PORTAL
            </span>
          </div>
        </Link>
        <span className="text-[9px] bg-gov-navy-800 text-gov-gold-500 font-mono px-2 py-0.5 rounded border border-gov-navy-700 font-bold uppercase tracking-wider">
          LIVE
        </span>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-4 py-6 overflow-y-auto space-y-1">
        <div className="text-[10px] font-bold text-gov-navy-600 uppercase tracking-widest px-3 mb-2">
          Core Modules
        </div>
        {PRIMARY_NAV.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname?.startsWith(item.href));
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center justify-between px-3 py-2.5 rounded-md text-sm font-medium transition-all group ${
                isActive
                  ? "bg-gov-navy-900 text-white border-l-2 border-gov-gold-500"
                  : "hover:bg-gov-navy-900/50 hover:text-slate-100 text-slate-400"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`h-4.5 w-4.5 transition-colors ${
                    isActive
                      ? "text-gov-gold-500"
                      : "text-slate-500 group-hover:text-slate-300"
                  }`}
                />
                <span className="truncate">{item.name}</span>
              </div>
              {isActive && (
                <ChevronRight className="h-3.5 w-3.5 text-gov-gold-500" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Support / Secondary Area */}
      <div className="px-4 py-4 border-t border-gov-navy-900 space-y-1 bg-gov-navy-950/80">
        <Link
          href="/about"
          className={`flex items-center gap-3 px-3 py-2 rounded-md text-xs font-medium text-slate-400 hover:text-slate-100 hover:bg-gov-navy-900/50 transition-colors ${
            pathname === "/about" ? "text-white bg-gov-navy-900" : ""
          }`}
        >
          <Info className="h-4 w-4 text-slate-500" />
          <span>About</span>
        </Link>
        <Link
          href="/settings"
          className={`flex items-center gap-3 px-3 py-2 rounded-md text-xs font-medium text-slate-400 hover:text-slate-100 hover:bg-gov-navy-900/50 transition-colors ${
            pathname === "/settings" ? "text-white bg-gov-navy-900" : ""
          }`}
        >
          <Settings className="h-4 w-4 text-slate-500" />
          <span>Settings</span>
        </Link>
        <button
          onClick={() => alert("System logout initiated.")}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-xs font-medium text-slate-400 hover:text-red-400 hover:bg-red-950/20 transition-colors text-left"
        >
          <LogOut className="h-4 w-4 text-slate-500 group-hover:text-red-400" />
          <span>Logout</span>
        </button>
      </div>

      {/* Command Center Authorized Badge */}
      <div className="p-4 border-t border-gov-navy-900 bg-gov-navy-950 flex flex-col gap-1 text-[10px] text-slate-500 font-mono select-none">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="font-semibold text-slate-400">SESSION SECURE</span>
        </div>
        <div className="flex items-center justify-between text-[9px] mt-1 text-slate-500">
          <span>ID: 254002</span>
          <span>AUTH_ACCESS_LEVEL_1</span>
        </div>
      </div>
    </aside>
  );
}
