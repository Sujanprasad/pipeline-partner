import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Plus, Search, Pencil, Trash2, Filter } from "lucide-react";
import { PageHeader } from "@/components/ui-kit/PageHeader";
import { StatusBadge } from "@/components/ui-kit/StatusBadge";
import { leads as seed, type Lead, type LeadStatus } from "@/lib/mock-data";

export const Route = createFileRoute("/leads")({
  head: () => ({
    meta: [
      { title: "Lead Management — MfgCRM" },
      { name: "description", content: "Manage leads, sources and assignments across the BDA team." },
    ],
  }),
  component: LeadsPage,
});

const STATUSES: LeadStatus[] = ["New", "Contacted", "Negotiation", "Closed"];

function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>(seed);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | LeadStatus>("All");
  const [editing, setEditing] = useState<Lead | null>(null);
  const [showModal, setShowModal] = useState(false);

  const filtered = useMemo(() => {
    return leads.filter((l) => {
      const matchQ =
        !query ||
        l.company.toLowerCase().includes(query.toLowerCase()) ||
        l.client.toLowerCase().includes(query.toLowerCase()) ||
        l.email.toLowerCase().includes(query.toLowerCase());
      const matchS = statusFilter === "All" || l.status === statusFilter;
      return matchQ && matchS;
    });
  }, [leads, query, statusFilter]);

  const handleDelete = (id: string) => {
    setLeads((ls) => ls.filter((l) => l.id !== id));
    toast.success("Lead deleted");
  };

  const handleSave = (lead: Lead) => {
    setLeads((ls) => {
      const exists = ls.find((l) => l.id === lead.id);
      if (exists) return ls.map((l) => (l.id === lead.id ? lead : l));
      return [{ ...lead, id: `l${Date.now()}` }, ...ls];
    });
    toast.success(editing ? "Lead updated" : "Lead added");
    setShowModal(false);
    setEditing(null);
  };

  return (
    <div>
      <PageHeader
        title="Lead Management"
        description="Track every prospect from first touch to close."
        actions={
          <button
            onClick={() => { setEditing(null); setShowModal(true); }}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md"
          >
            <Plus className="h-4 w-4" /> Add Lead
          </button>
        }
      />

      <div className="rounded-xl border border-border bg-card shadow-card">
        <div className="flex flex-wrap items-center gap-3 border-b border-border p-4">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search company, client, email…"
              className="h-10 w-full rounded-lg border border-input bg-background pl-9 pr-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/20"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as LeadStatus | "All")}
              className="h-10 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:border-ring"
            >
              <option value="All">All statuses</option>
              {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-left text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-medium">Company</th>
                <th className="px-4 py-3 font-medium">Client</th>
                <th className="px-4 py-3 font-medium">Contact</th>
                <th className="px-4 py-3 font-medium">Source</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Assigned</th>
                <th className="px-4 py-3 font-medium text-right">Value</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-16 text-center">
                    <div className="mx-auto max-w-xs">
                      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                        <Search className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <p className="font-medium">No leads found</p>
                      <p className="mt-1 text-xs text-muted-foreground">Try adjusting your search or filters.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filtered.map((l) => (
                  <tr key={l.id} className="transition-colors hover:bg-muted/30">
                    <td className="px-4 py-3 font-medium">{l.company}</td>
                    <td className="px-4 py-3">{l.client}</td>
                    <td className="px-4 py-3">
                      <div className="text-xs text-muted-foreground">{l.email}</div>
                      <div className="text-xs text-muted-foreground">{l.phone}</div>
                    </td>
                    <td className="px-4 py-3">{l.source}</td>
                    <td className="px-4 py-3"><StatusBadge status={l.status} /></td>
                    <td className="px-4 py-3">{l.assignedTo}</td>
                    <td className="px-4 py-3 text-right font-medium">₹{(l.value / 100000).toFixed(1)}L</td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-1">
                        <button
                          onClick={() => { setEditing(l); setShowModal(true); }}
                          className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(l.id)}
                          className="rounded-md p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-border px-4 py-3 text-sm text-muted-foreground">
          <div>Showing {filtered.length} of {leads.length} leads</div>
          <div className="flex gap-1">
            <button className="rounded-md border border-border px-3 py-1.5 text-xs hover:bg-muted">Previous</button>
            <button className="rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground">1</button>
            <button className="rounded-md border border-border px-3 py-1.5 text-xs hover:bg-muted">2</button>
            <button className="rounded-md border border-border px-3 py-1.5 text-xs hover:bg-muted">Next</button>
          </div>
        </div>
      </div>

      {showModal && (
        <LeadModal
          lead={editing}
          onClose={() => { setShowModal(false); setEditing(null); }}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

function LeadModal({ lead, onClose, onSave }: { lead: Lead | null; onClose: () => void; onSave: (l: Lead) => void }) {
  const [form, setForm] = useState<Lead>(
    lead ?? {
      id: "",
      company: "",
      client: "",
      email: "",
      phone: "",
      source: "Website",
      status: "New",
      assignedTo: "Aarav Sharma",
      value: 100000,
      createdAt: new Date().toISOString().slice(0, 10),
    }
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-xl border border-border bg-card p-6 shadow-elevated">
        <h2 className="text-lg font-semibold">{lead ? "Edit Lead" : "Add New Lead"}</h2>
        <p className="text-xs text-muted-foreground">Fill in the lead details below.</p>
        <form
          onSubmit={(e) => { e.preventDefault(); onSave(form); }}
          className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2"
        >
          <Field label="Company" value={form.company} onChange={(v) => setForm({ ...form, company: v })} />
          <Field label="Client Name" value={form.client} onChange={(v) => setForm({ ...form, client: v })} />
          <Field label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
          <Field label="Phone" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
          <Field label="Source" value={form.source} onChange={(v) => setForm({ ...form, source: v })} />
          <div>
            <label className="text-xs font-medium text-muted-foreground">Status</label>
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value as LeadStatus })}
              className="mt-1 h-10 w-full rounded-lg border border-input bg-background px-3 text-sm"
            >
              {STATUSES.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>
          <Field label="Assigned To" value={form.assignedTo} onChange={(v) => setForm({ ...form, assignedTo: v })} />
          <Field label="Deal Value (₹)" type="number" value={String(form.value)} onChange={(v) => setForm({ ...form, value: Number(v) })} />
          <div className="col-span-full mt-2 flex justify-end gap-2">
            <button type="button" onClick={onClose} className="rounded-lg border border-input px-4 py-2 text-sm hover:bg-muted">
              Cancel
            </button>
            <button type="submit" className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
              {lead ? "Save Changes" : "Add Lead"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <div>
      <label className="text-xs font-medium text-muted-foreground">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
        className="mt-1 h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/20"
      />
    </div>
  );
}
