export interface KpiMetric {
  label: string;
  value: string | number;
  change: string;
  isPositive: boolean;
  alertType?: 'critical' | 'warning' | 'optimal';
}

export interface Recommendation {
  id: string;
  target: string;
  risk: 'HIGH' | 'MEDIUM' | 'LOW';
  recommendation: string;
  category: string;
}

export interface DistrictRanking {
  rank: number;
  name: string;
  code: string;
  score: number;
  activeProjects: number;
  delayedProjects: number;
  fundUtilization: number;
  pendingFiles: number;
}

export interface ProjectMetric {
  id: string;
  name: string;
  sector: 'Infrastructure' | 'Health' | 'Education' | 'Irrigation' | 'Digital Gov';
  budgetCr: number;
  spentCr: number;
  progress: number;
  targetDate: string;
  status: 'On Track' | 'Delayed' | 'Critical';
}

export interface OfficerPerformance {
  rank: number;
  name: string;
  designation: string;
  department: string;
  resolvedFiles: number;
  avgResolutionDays: number;
  performanceScore: number;
}

export interface AiQueryResponse {
  id: string;
  query: string;
  response: string;
  timestamp: string;
  category: string;
}

export const AI_QUERY_RESPONSES: AiQueryResponse[] = [
  {
    id: 'Q-001',
    query: 'Which districts are underperforming?',
    response: 'South East Delhi (score: 55.2) and North East Delhi (59.8) are the lowest-ranked districts. Key issues: high delayed projects (13 and 11 respectively), fund utilization below 58%, and large pending file backlogs. South East Delhi has 41 pending files — the highest in the capital. Immediate administrative review recommended.',
    timestamp: '2026-06-17 14:30',
    category: 'Districts',
  },
  {
    id: 'Q-002',
    query: 'Show me critical projects',
    response: '1 project flagged Critical: Mohalla Clinic Upgrades (PRJ-2045) at only 34.5% progress against a ₹280 Cr budget, behind schedule with a Feb 2027 deadline. Additionally, Yamuna Riverfront Development (PRJ-0982) is Delayed at 42.1% — held up by environmental clearance disputes. Dwarka Expressway Link also delayed at 55.7%.',
    timestamp: '2026-06-17 13:15',
    category: 'Projects',
  },
  {
    id: 'Q-003',
    query: 'What is the fund utilization status?',
    response: 'Overall Delhi fund utilization stands at 78.6%, up 2.1% vs Q1. Total allocated: ₹4,110 Cr, spent: ₹3,230 Cr. Urban Development leads at 91.0%, while Health & Family Welfare is critically low at 61.8%. PWD is on track at 75.2%. Recommend reviewing Health budget disbursement delays across Mohalla Clinics.',
    timestamp: '2026-06-17 11:45',
    category: 'Funds',
  },
  {
    id: 'Q-004',
    query: 'Who are the top performing officers?',
    response: 'Ms. Ananya Singh, IAS (New Delhi) leads with a 96.2% performance score — 218 files resolved at an average of 3.2 days. Mr. Vikram Mehta, IAS (South Delhi) follows at 93.8% with 196 files resolved. Both maintain sub-4 day resolution averages. North East Delhi and South East Delhi DMs require attention — resolution times exceed 8 days.',
    timestamp: '2026-06-17 10:20',
    category: 'Officers',
  },
  {
    id: 'Q-005',
    query: 'Any audit exceptions or compliance issues?',
    response: '1 active exception flagged: Dwarka Expressway environmental clearance — contractor failed to submit revised EIA report on time (AUD-02). All other protocols passed (96.7% audit score). Financial and Security audits are clear. Pending: Yamuna Riverfront contractor invoice verification for Phase 2 works.',
    timestamp: '2026-06-17 09:05',
    category: 'Audits',
  },
  {
    id: 'Q-006',
    query: 'What are the current alerts?',
    response: '4 critical alerts active. Top priority: (1) Yamuna Riverfront Development flagged for missing environmental clearance deadline — automated delay alert triggered. (2) Unusual transaction pattern detected in Education Dept fund NWD_08 — AI Auditor Core flagged for review. (3) Inter-departmental land acquisition dispute in South West Delhi pending resolution. (4) Metro Phase IV tunneling进度 behind schedule in Central Delhi.',
    timestamp: '2026-06-16 16:00',
    category: 'Alerts',
  },
];

export interface ActionLog {
  id: string;
  timestamp: string;
  actionType: string;
  details: string;
  authority: string;
  status: 'SUCCESS' | 'WARNING' | 'FAILED' | 'PENDING';
  riskLevel: 'HIGH' | 'MEDIUM' | 'LOW';
}

export const KPI_METRICS: KpiMetric[] = [
  { label: 'Total Districts', value: '11', change: 'All connected', isPositive: true },
  { label: 'Active Projects', value: '847', change: '+18 this month', isPositive: true },
  { label: 'Delayed Projects', value: '21', change: '-3 this week', isPositive: true, alertType: 'warning' },
  { label: 'Fund Utilization %', value: '78.6%', change: '+2.1% vs Q1', isPositive: true },
  { label: 'Pending Files', value: '89', change: '31 urgent (>10 days)', isPositive: false, alertType: 'warning' },
  { label: 'Critical Alerts', value: '4', change: 'Immediate attention', isPositive: false, alertType: 'critical' },
];

export const AI_GOVERNANCE_SUMMARY = {
  executiveSummary: `Overall Delhi governance index stands at 73.7/100, showing a 0.8% improvement. Fund utilization is moderate, but bottlenecks are detected in three primary areas: (1) Infrastructure clearance delays — Yamuna Riverfront and Dwarka Expressway held up by environmental disputes, (2) High pending file duration in North East and South East Delhi, and (3) Budget under-utilization in Health & Family Welfare (Mohalla Clinics at 61.8%). Automated threat vectors indicate low cyber risk but flag high transaction density anomalies in District South West Delhi.`,
  recommendations: [
    {
      id: 'REC-001',
      target: 'District SDD_11 (Shahdara)',
      risk: 'HIGH',
      recommendation: 'Fast-track Mohalla Clinic construction approvals and release pending funds.',
      category: 'Health',
    },
    {
      id: 'REC-002',
      target: 'District SED_10 (South East Delhi)',
      risk: 'MEDIUM',
      recommendation: 'Audit fund allocations for municipal school digital-learning infrastructure.',
      category: 'Funds',
    },
    {
      id: 'REC-003',
      target: 'District NWD_08 (North West Delhi)',
      risk: 'LOW',
      recommendation: 'Deploy divisional technical review committee to resolve Metro Phase IV tunneling blockages.',
      category: 'Projects',
    },
    {
      id: 'REC-004',
      target: 'District SWD_09 (South West Delhi)',
      risk: 'MEDIUM',
      recommendation: 'Expedite inter-departmental land acquisition dispute for Dwarka Expressway link road.',
      category: 'Infrastructure',
    },
  ] as Recommendation[],
};

export const DISTRICT_RANKINGS: DistrictRanking[] = [
  { rank: 1, name: 'New Delhi', code: 'NDD_01', score: 92.4, activeProjects: 84, delayedProjects: 2, fundUtilization: 91.2, pendingFiles: 5 },
  { rank: 2, name: 'South Delhi', code: 'SD_02', score: 88.7, activeProjects: 72, delayedProjects: 3, fundUtilization: 85.4, pendingFiles: 9 },
  { rank: 3, name: 'Central Delhi', code: 'CD_04', score: 84.1, activeProjects: 65, delayedProjects: 4, fundUtilization: 82.0, pendingFiles: 11 },
  { rank: 4, name: 'East Delhi', code: 'ED_06', score: 79.5, activeProjects: 58, delayedProjects: 5, fundUtilization: 76.8, pendingFiles: 14 },
  { rank: 5, name: 'North West Delhi', code: 'NWD_08', score: 76.2, activeProjects: 91, delayedProjects: 6, fundUtilization: 73.5, pendingFiles: 18 },
  { rank: 6, name: 'West Delhi', code: 'WD_05', score: 73.8, activeProjects: 62, delayedProjects: 5, fundUtilization: 71.2, pendingFiles: 16 },
  { rank: 7, name: 'South West Delhi', code: 'SWD_09', score: 70.4, activeProjects: 55, delayedProjects: 7, fundUtilization: 68.9, pendingFiles: 22 },
  { rank: 8, name: 'North Delhi', code: 'ND_03', score: 67.1, activeProjects: 48, delayedProjects: 8, fundUtilization: 65.3, pendingFiles: 25 },
  { rank: 9, name: 'Shahdara', code: 'SDD_11', score: 63.5, activeProjects: 41, delayedProjects: 9, fundUtilization: 61.7, pendingFiles: 29 },
  { rank: 10, name: 'North East Delhi', code: 'NED_07', score: 59.8, activeProjects: 52, delayedProjects: 11, fundUtilization: 57.4, pendingFiles: 34 },
  { rank: 11, name: 'South East Delhi', code: 'SED_10', score: 55.2, activeProjects: 38, delayedProjects: 13, fundUtilization: 52.1, pendingFiles: 41 },
];

export const MAJOR_PROJECTS: ProjectMetric[] = [
  { id: 'PRJ-1021', name: 'Delhi Metro Phase IV Expansion', sector: 'Infrastructure', budgetCr: 3200, spentCr: 2189, progress: 68.4, targetDate: '2027-06-30', status: 'On Track' },
  { id: 'PRJ-1402', name: 'Delhi School Modernization Program', sector: 'Education', budgetCr: 520, spentCr: 423, progress: 81.3, targetDate: '2026-12-15', status: 'On Track' },
  { id: 'PRJ-0982', name: 'Yamuna Riverfront Development', sector: 'Infrastructure', budgetCr: 950, spentCr: 400, progress: 42.1, targetDate: '2027-03-31', status: 'Delayed' },
  { id: 'PRJ-2045', name: 'Mohalla Clinic Upgrades', sector: 'Health', budgetCr: 280, spentCr: 97, progress: 34.5, targetDate: '2027-02-28', status: 'Critical' },
  { id: 'PRJ-1889', name: 'Dwarka Expressway Link', sector: 'Infrastructure', budgetCr: 780, spentCr: 434, progress: 55.7, targetDate: '2026-11-30', status: 'Delayed' },
  { id: 'PRJ-1765', name: 'STP Capacity Expansion', sector: 'Irrigation', budgetCr: 410, spentCr: 374, progress: 91.2, targetDate: '2026-09-30', status: 'On Track' },
];

export const OFFICER_LEADERBOARD: OfficerPerformance[] = [
  { rank: 1, name: 'Ms. Ananya Singh, IAS', designation: 'District Magistrate', department: 'New Delhi', resolvedFiles: 218, avgResolutionDays: 3.2, performanceScore: 96.2 },
  { rank: 2, name: 'Mr. Vikram Mehta, IAS', designation: 'District Magistrate', department: 'South Delhi', resolvedFiles: 196, avgResolutionDays: 3.8, performanceScore: 93.8 },
  { rank: 3, name: 'Dr. Suneeta Rao, IAS', designation: 'District Magistrate', department: 'Central Delhi', resolvedFiles: 167, avgResolutionDays: 4.5, performanceScore: 87.4 },
  { rank: 4, name: 'Mr. Arjun Kapoor, IAS', designation: 'District Magistrate', department: 'East Delhi', resolvedFiles: 134, avgResolutionDays: 5.8, performanceScore: 79.6 },
  { rank: 5, name: 'Ms. Pooja Verma, IAS', designation: 'District Magistrate', department: 'North West Delhi', resolvedFiles: 118, avgResolutionDays: 6.4, performanceScore: 74.1 },
];

export const ACTION_LOGS: ActionLog[] = [
  { id: 'ACT-9081', timestamp: '2026-06-17 13:42', actionType: 'Fund Release Approved', details: 'Released ₹18.2 Cr for Mohalla Clinic upgrades across North East and Shahdara districts', authority: 'Finance Secretary', status: 'SUCCESS', riskLevel: 'LOW' },
  { id: 'ACT-9080', timestamp: '2026-06-17 12:15', actionType: 'Delay Flag Raised', details: 'Yamuna Riverfront Development flagged for missing environmental clearance deadline', authority: 'Automated Monitor', status: 'WARNING', riskLevel: 'HIGH' },
  { id: 'ACT-9079', timestamp: '2026-06-17 10:30', actionType: 'File Dispute Registered', details: 'Inter-departmental land acquisition clash for Dwarka Expressway in District SWD_09', authority: 'Sec. Urban Dev', status: 'PENDING', riskLevel: 'MEDIUM' },
  { id: 'ACT-9078', timestamp: '2026-06-17 09:05', actionType: 'Audit Exception Triggered', details: 'Unusual transaction pattern detected in Education Department fund NWD_08', authority: 'AI Auditor Core', status: 'FAILED', riskLevel: 'HIGH' },
];
