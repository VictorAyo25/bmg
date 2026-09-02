"use client";

import { useState } from "react";
import { CONTACT } from "@/lib/site";

const FIELD =
  "mt-2 w-full border border-white/20 bg-deep px-4 py-3 text-white placeholder:text-white/55 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 focus:outline-none disabled:opacity-60";

const LABEL = "block text-sm font-semibold text-white/80";

type State = "idle" | "sending" | "sent" | "error";

export function EnquiryForm() {
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    setState("sending");
    setError("");

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();

      if (!res.ok) {
        setError(json.error ?? "Something went wrong. Please try again.");
        setState("error");
        return;
      }

      form.reset();
      setState("sent");
    } catch {
      // Almost always a dropped connection, which is worth saying plainly
      // rather than blaming the visitor's input.
      setError(
        `We could not reach the server. Please check your connection, or email us at ${CONTACT.email}.`,
      );
      setState("error");
    }
  }

  if (state === "sent") {
    return (
      <div
        role="status"
        className="border border-brand-500/40 bg-brand-600/10 p-8"
      >
        <p className="text-xl font-semibold">Thank you, that has reached us.</p>
        <p className="mt-3 leading-relaxed text-white/75">
          An engineer will read it and reply to you directly. If it is urgent,
          call {CONTACT.phone}.
        </p>
        <button
          type="button"
          onClick={() => setState("idle")}
          className="mt-6 text-sm font-semibold text-sky underline underline-offset-4"
        >
          Send another message
        </button>
      </div>
    );
  }

  const busy = state === "sending";

  return (
    <form onSubmit={onSubmit} className="grid gap-6" noValidate={false}>
      {/*
        Honeypot. Hidden from people and from screen readers, so anything that
        fills it in is automated. The server discards those silently.
      */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input
          id="company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={LABEL}>
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            autoComplete="name"
            disabled={busy}
            className={FIELD}
            placeholder="Adebayo Ogunleye"
          />
        </div>
        <div>
          <label htmlFor="email" className={LABEL}>
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            autoComplete="email"
            disabled={busy}
            className={FIELD}
            placeholder="adebayo@example.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className={LABEL}>
          Subject
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          required
          disabled={busy}
          className={FIELD}
          placeholder="Project enquiry"
        />
      </div>

      <div>
        <label htmlFor="message" className={LABEL}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          maxLength={5000}
          disabled={busy}
          className={`${FIELD} resize-y`}
          placeholder="How can we help?"
        />
      </div>

      {error && (
        <p
          role="alert"
          className="border-l-2 border-red-400 pl-4 text-sm text-red-200"
        >
          {error}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-5">
        <button
          type="submit"
          disabled={busy}
          className="w-fit bg-brand-600 px-7 py-4 text-sm font-semibold text-white transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {busy ? "Sending" : "Send message"}
        </button>
        <p className="text-sm text-white/70">
          Or email{" "}
          <a
            href={CONTACT.mailto}
            className="underline underline-offset-4 hover:text-white"
          >
            {CONTACT.email}
          </a>
        </p>
      </div>
    </form>
  );
}
