export type LeadStatus = "New" | "Contacted" | "Negotiation" | "Closed";

export interface Lead {
  id: string;
  company: string;
  client: string;
  email: string;
  phone: string;
  source: string;
  status: LeadStatus;
  assignedTo: string;
  value: number;
  createdAt: string;
}

export interface FollowUp {
  id: string;
  leadId: string;
  company: string;
  client: string;
  date: string;
  time: string;
  type: "Call" | "Meeting" | "Email";
  notes: string;
  assignedTo: string;
  status: "Pending" | "Completed" | "Overdue";
}

export interface Deal {
  id: string;
  company: string;
  product: string;
  amount: number;
  probability: number;
  expectedClose: string;
  stage: "Prospecting" | "Proposal" | "Negotiation" | "Closed Won" | "Closed Lost";
  owner: string;
}

export interface Employee {
  id: string;
  name: string;
  role: string;
  email: string;
  dealsClosed: number;
  leadsHandled: number;
  conversionRate: number;
  monthlyTarget: number;
  achieved: number;
}

export interface CommLog {
  id: string;
  client: string;
  company: string;
  type: "Call" | "Meeting" | "Email";
  summary: string;
  date: string;
  by: string;
}

export const employees: Employee[] = [
  { id: "e1", name: "Aarav Sharma", role: "Senior BDA", email: "aarav@mfgcrm.com", dealsClosed: 18, leadsHandled: 64, conversionRate: 28, monthlyTarget: 20, achieved: 18 },
  { id: "e2", name: "Priya Mehta", role: "BDA", email: "priya@mfgcrm.com", dealsClosed: 14, leadsHandled: 52, conversionRate: 27, monthlyTarget: 15, achieved: 14 },
  { id: "e3", name: "Rohan Kapoor", role: "BDA", email: "rohan@mfgcrm.com", dealsClosed: 11, leadsHandled: 48, conversionRate: 23, monthlyTarget: 15, achieved: 11 },
  { id: "e4", name: "Sneha Iyer", role: "Junior BDA", email: "sneha@mfgcrm.com", dealsClosed: 7, leadsHandled: 30, conversionRate: 23, monthlyTarget: 10, achieved: 7 },
  { id: "e5", name: "Vikram Singh", role: "Senior BDA", email: "vikram@mfgcrm.com", dealsClosed: 21, leadsHandled: 70, conversionRate: 30, monthlyTarget: 20, achieved: 21 },
];

export const leads: Lead[] = [
  { id: "l1", company: "Tata Steel Industries", client: "Rajesh Kumar", email: "rajesh@tatasteel.in", phone: "+91 98765 43210", source: "Referral", status: "Negotiation", assignedTo: "Aarav Sharma", value: 850000, createdAt: "2026-05-10" },
  { id: "l2", company: "Bajaj Auto Ltd", client: "Meera Patel", email: "meera@bajaj.com", phone: "+91 99887 76543", source: "Website", status: "Contacted", assignedTo: "Priya Mehta", value: 420000, createdAt: "2026-05-12" },
  { id: "l3", company: "Larsen & Toubro", client: "Amit Desai", email: "amit@lnt.in", phone: "+91 90909 80808", source: "Trade Show", status: "New", assignedTo: "Rohan Kapoor", value: 1200000, createdAt: "2026-05-15" },
  { id: "l4", company: "Mahindra Heavy Equip", client: "Kavya Rao", email: "kavya@mahindra.com", phone: "+91 91234 56789", source: "Cold Call", status: "Closed", assignedTo: "Vikram Singh", value: 670000, createdAt: "2026-04-22" },
  { id: "l5", company: "Godrej Industries", client: "Suresh Nair", email: "suresh@godrej.com", phone: "+91 98123 45678", source: "LinkedIn", status: "Negotiation", assignedTo: "Aarav Sharma", value: 540000, createdAt: "2026-05-05" },
  { id: "l6", company: "Ashok Leyland", client: "Divya Menon", email: "divya@ashok.com", phone: "+91 90011 22334", source: "Website", status: "New", assignedTo: "Sneha Iyer", value: 310000, createdAt: "2026-05-18" },
  { id: "l7", company: "Hero MotoCorp", client: "Nikhil Joshi", email: "nikhil@hero.com", phone: "+91 99001 11223", source: "Referral", status: "Contacted", assignedTo: "Priya Mehta", value: 480000, createdAt: "2026-05-08" },
  { id: "l8", company: "Reliance Industries", client: "Anika Verma", email: "anika@ril.com", phone: "+91 98765 11122", source: "Email Campaign", status: "Closed", assignedTo: "Vikram Singh", value: 2200000, createdAt: "2026-04-15" },
];

export const followUps: FollowUp[] = [
  { id: "f1", leadId: "l1", company: "Tata Steel Industries", client: "Rajesh Kumar", date: "2026-05-24", time: "10:30", type: "Call", notes: "Discuss pricing for bulk order", assignedTo: "Aarav Sharma", status: "Pending" },
  { id: "f2", leadId: "l2", company: "Bajaj Auto Ltd", client: "Meera Patel", date: "2026-05-25", time: "14:00", type: "Meeting", notes: "Product demo at their facility", assignedTo: "Priya Mehta", status: "Pending" },
  { id: "f3", leadId: "l3", company: "Larsen & Toubro", client: "Amit Desai", date: "2026-05-23", time: "11:00", type: "Email", notes: "Send technical specifications", assignedTo: "Rohan Kapoor", status: "Overdue" },
  { id: "f4", leadId: "l5", company: "Godrej Industries", client: "Suresh Nair", date: "2026-05-26", time: "16:00", type: "Call", notes: "Final negotiation round", assignedTo: "Aarav Sharma", status: "Pending" },
  { id: "f5", leadId: "l7", company: "Hero MotoCorp", client: "Nikhil Joshi", date: "2026-05-22", time: "09:30", type: "Meeting", notes: "Quarterly review", assignedTo: "Priya Mehta", status: "Completed" },
];

export const deals: Deal[] = [
  { id: "d1", company: "Tata Steel Industries", product: "Industrial Conveyor System", amount: 850000, probability: 70, expectedClose: "2026-06-15", stage: "Negotiation", owner: "Aarav Sharma" },
  { id: "d2", company: "Bajaj Auto Ltd", product: "CNC Machining Center", amount: 420000, probability: 50, expectedClose: "2026-06-20", stage: "Proposal", owner: "Priya Mehta" },
  { id: "d3", company: "Larsen & Toubro", product: "Hydraulic Press 500T", amount: 1200000, probability: 30, expectedClose: "2026-07-10", stage: "Prospecting", owner: "Rohan Kapoor" },
  { id: "d4", company: "Mahindra Heavy Equip", product: "Robotic Welding Cell", amount: 670000, probability: 100, expectedClose: "2026-04-30", stage: "Closed Won", owner: "Vikram Singh" },
  { id: "d5", company: "Godrej Industries", product: "Packaging Line", amount: 540000, probability: 75, expectedClose: "2026-06-05", stage: "Negotiation", owner: "Aarav Sharma" },
  { id: "d6", company: "Reliance Industries", product: "Refinery Pump Set", amount: 2200000, probability: 100, expectedClose: "2026-04-20", stage: "Closed Won", owner: "Vikram Singh" },
];

export const commLogs: CommLog[] = [
  { id: "c1", client: "Rajesh Kumar", company: "Tata Steel Industries", type: "Call", summary: "Discussed scope and timelines for conveyor system. Client interested in extended warranty.", date: "2026-05-20", by: "Aarav Sharma" },
  { id: "c2", client: "Meera Patel", company: "Bajaj Auto Ltd", type: "Meeting", summary: "On-site visit completed. Reviewed installation space and power requirements.", date: "2026-05-19", by: "Priya Mehta" },
  { id: "c3", client: "Anika Verma", company: "Reliance Industries", type: "Email", summary: "Sent final invoice and dispatch schedule. Client confirmed receipt.", date: "2026-05-18", by: "Vikram Singh" },
  { id: "c4", client: "Suresh Nair", company: "Godrej Industries", type: "Call", summary: "Price negotiation — agreed on 8% volume discount for annual contract.", date: "2026-05-17", by: "Aarav Sharma" },
  { id: "c5", client: "Kavya Rao", company: "Mahindra Heavy Equip", type: "Meeting", summary: "Project kickoff meeting. Defined milestones and acceptance criteria.", date: "2026-05-15", by: "Vikram Singh" },
  { id: "c6", client: "Amit Desai", company: "Larsen & Toubro", type: "Email", summary: "Shared product brochure and technical datasheet for hydraulic press.", date: "2026-05-14", by: "Rohan Kapoor" },
];

export const salesGrowth = [
  { month: "Dec", revenue: 320, deals: 8 },
  { month: "Jan", revenue: 410, deals: 11 },
  { month: "Feb", revenue: 380, deals: 9 },
  { month: "Mar", revenue: 520, deals: 14 },
  { month: "Apr", revenue: 610, deals: 17 },
  { month: "May", revenue: 740, deals: 21 },
];

export const leadStatusDistribution = [
  { name: "New", value: 24, color: "var(--color-info)" },
  { name: "Contacted", value: 38, color: "var(--color-chart-2)" },
  { name: "Negotiation", value: 18, color: "var(--color-warning)" },
  { name: "Closed", value: 20, color: "var(--color-success)" },
];

export const recentActivities = [
  { id: "a1", user: "Aarav Sharma", action: "moved a deal to Negotiation", target: "Tata Steel Industries", time: "10 min ago" },
  { id: "a2", user: "Priya Mehta", action: "added a new lead", target: "Bajaj Auto Ltd", time: "1 hr ago" },
  { id: "a3", user: "Vikram Singh", action: "closed a deal", target: "Reliance Industries — ₹22L", time: "3 hr ago" },
  { id: "a4", user: "Rohan Kapoor", action: "scheduled follow-up", target: "Larsen & Toubro", time: "5 hr ago" },
  { id: "a5", user: "Sneha Iyer", action: "logged a meeting note", target: "Ashok Leyland", time: "Yesterday" },
];
