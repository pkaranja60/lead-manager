"use client";

import { type FormEvent, useState } from "react";

// ─────────────────────────────────────────────
// TYPES & CONSTANTS
// ─────────────────────────────────────────────

export const LEAD_STATUS_OPTIONS = [
  "New",
  "Engaged",
  "Proposal Sent",
  "Closed-Won",
  "Closed-Lost",
] as const;

export type LeadStatus = (typeof LEAD_STATUS_OPTIONS)[number];

export interface LeadFormData {
  name: string;
  email: string;
  status: LeadStatus;
}

export interface LeadFormProps {
  onSubmit: (data: LeadFormData) => Promise<void> | void;
  isLoading?: boolean;
}

// ─────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────

export function LeadForm({ onSubmit, isLoading = false }: LeadFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<LeadStatus>("New");
  const [submitting, setSubmitting] = useState(false);

  const isPending = isLoading || submitting;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName || !trimmedEmail) {
      return;
    }

    try {
      setSubmitting(true);
      await onSubmit({
        name: trimmedName,
        email: trimmedEmail,
        status,
      });

      setName("");
      setEmail("");
      setStatus("New");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950"
    >
      <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
        Add New Lead
      </h2>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="lead-name"
          className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          Full Name
        </label>
        <input
          id="lead-name"
          name="name"
          type="text"
          required
          disabled={isPending}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Jane Doe"
          className="rounded-lg border border-zinc-300 bg-transparent px-3.5 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900 disabled:opacity-50 dark:border-zinc-700 dark:text-zinc-100 dark:focus:border-zinc-100 dark:focus:ring-zinc-100"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="lead-email"
          className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          Email Address
        </label>
        <input
          id="lead-email"
          name="email"
          type="email"
          required
          disabled={isPending}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="jane@example.com"
          className="rounded-lg border border-zinc-300 bg-transparent px-3.5 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900 disabled:opacity-50 dark:border-zinc-700 dark:text-zinc-100 dark:focus:border-zinc-100 dark:focus:ring-zinc-100"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="lead-status"
          className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          Lead Status
        </label>
        <select
          id="lead-status"
          name="status"
          disabled={isPending}
          value={status}
          onChange={(e) => setStatus(e.target.value as LeadStatus)}
          className="rounded-lg border border-zinc-300 bg-transparent px-3.5 py-2 text-sm text-zinc-900 focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900 disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-zinc-100 dark:focus:ring-zinc-100"
        >
          {LEAD_STATUS_OPTIONS.map((opt) => (
            <option key={opt} value={opt} className="dark:bg-zinc-900">
              {opt}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="mt-2 inline-flex items-center justify-center rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
      >
        {isPending ? "Submitting..." : "Add Lead"}
      </button>
    </form>
  );
}
