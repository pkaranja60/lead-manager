import type { LeadStatus } from "./lead-form";

// ─────────────────────────────────────────────
// TYPES & CONSTANTS
// ─────────────────────────────────────────────

export interface Lead {
  _id: string;
  name: string;
  email: string;
  status: LeadStatus;
  createdAt: string;
}

export interface LeadListProps {
  leads: Lead[];
  isLoading?: boolean;
}

const STATUS_BADGE_STYLES: Record<LeadStatus, string> = {
  New: "bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-950 dark:text-sky-300 dark:border-sky-800",
  Engaged:
    "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800",
  "Proposal Sent":
    "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950 dark:text-purple-300 dark:border-purple-800",
  "Closed-Won":
    "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800",
  "Closed-Lost":
    "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950 dark:text-rose-300 dark:border-rose-800",
};

// ─────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────

export function LeadList({ leads, isLoading = false }: LeadListProps) {
  if (isLoading) {
    return (
      <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Loading leads...
        </p>
      </div>
    );
  }

  if (leads.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-zinc-300 bg-zinc-50 p-8 text-center dark:border-zinc-800 dark:bg-zinc-950">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          No leads registered yet. Fill out the form to add one.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-zinc-200 bg-zinc-50 text-xs font-medium uppercase tracking-wider text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-400">
            <tr>
              <th scope="col" className="px-5 py-3.5">
                Name
              </th>
              <th scope="col" className="px-5 py-3.5">
                Email
              </th>
              <th scope="col" className="px-5 py-3.5">
                Status
              </th>
              <th scope="col" className="px-5 py-3.5">
                Created
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {leads.map((lead) => {
              const badgeClass =
                STATUS_BADGE_STYLES[lead.status] ||
                "bg-zinc-100 text-zinc-700 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700";

              const formattedDate = new Date(lead.createdAt).toLocaleDateString(
                undefined,
                {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                },
              );

              return (
                <tr
                  key={lead._id}
                  className="transition-colors hover:bg-zinc-50/60 dark:hover:bg-zinc-900/40"
                >
                  <td className="px-5 py-4 font-medium text-zinc-900 dark:text-zinc-100">
                    {lead.name}
                  </td>
                  <td className="px-5 py-4 text-zinc-600 dark:text-zinc-400">
                    {lead.email}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${badgeClass}`}
                    >
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-xs text-zinc-500 dark:text-zinc-400">
                    {formattedDate}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
