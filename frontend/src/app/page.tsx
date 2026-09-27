"use client";

import { useCallback, useEffect, useState } from "react";
import { LeadForm, type LeadFormData } from "@/components/lead-form";
import { type Lead, LeadList } from "@/components/lead-list";

// ─────────────────────────────────────────────
// CONFIGURATION
// ─────────────────────────────────────────────

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// ─────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────

export default function Home() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLeads = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`${API_BASE_URL}/leads`);

      if (!res.ok) {
        throw new Error(`Failed to fetch leads (${res.status})`);
      }

      const data: Lead[] = await res.json();
      setLeads(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error loading leads");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const handleAddLead = async (formData: LeadFormData) => {
    setError(null);

    const res = await fetch(`${API_BASE_URL}/leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (!res.ok) {
      const message = data.error || "Failed to create lead";
      setError(message);
      throw new Error(message);
    }

    setLeads((prev) => [data, ...prev]);
  };

  return (
    <div className="min-h-screen bg-zinc-50 px-4 py-10 dark:bg-black sm:px-6 lg:px-8">
      <main className="mx-auto max-w-6xl">
        <header className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl">
            Lead Manager
          </h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Track and manage incoming leads in real time.
          </p>
        </header>

        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800 dark:border-red-900 dark:bg-red-950/60 dark:text-red-300">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <LeadForm onSubmit={handleAddLead} />
          </div>

          <div className="lg:col-span-7">
            <LeadList leads={leads} isLoading={loading} />
          </div>
        </div>
      </main>
    </div>
  );
}
