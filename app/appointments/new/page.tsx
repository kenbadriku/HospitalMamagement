"use client";

import Link from "next/link";
import { useState } from "react";

export default function NewAppointmentPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(109,40,217,0.12),_transparent_30%)]">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-600 text-lg font-semibold text-white">ZH</div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-violet-700">Zionova</p>
            <p className="text-lg font-semibold text-slate-900">HealthSphere</p>
          </div>
        </Link>
      </nav>

      <section className="mx-auto max-w-5xl px-6 py-12 lg:px-8 lg:py-20">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-700">Book an appointment</p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-900">Choose a specialist, date, and visit reason.</h1>
          <form className="mt-8 grid gap-4 md:grid-cols-2" onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}>
            <select className="rounded-2xl border border-slate-200 px-4 py-3" defaultValue="">
              <option value="" disabled>Select specialty</option>
              <option>Primary Care</option>
              <option>Cardiology</option>
              <option>Pediatrics</option>
            </select>
            <select className="rounded-2xl border border-slate-200 px-4 py-3" defaultValue="">
              <option value="" disabled>Select doctor</option>
              <option>Dr. Grace Kawuma</option>
              <option>Dr. Henry Mugisha</option>
              <option>Dr. Lydia Busingye</option>
            </select>
            <input type="date" className="rounded-2xl border border-slate-200 px-4 py-3" />
            <input type="time" className="rounded-2xl border border-slate-200 px-4 py-3" />
            <input className="rounded-2xl border border-slate-200 px-4 py-3" placeholder="Patient name" />
            <input className="rounded-2xl border border-slate-200 px-4 py-3" placeholder="Phone number" />
            <textarea className="min-h-28 rounded-2xl border border-slate-200 px-4 py-3 md:col-span-2" placeholder="Reason for visit" />
            <div className="md:col-span-2 flex flex-wrap gap-3">
              <button className="rounded-full bg-violet-700 px-5 py-3 font-semibold text-white transition hover:bg-violet-600" type="submit">Request appointment</button>
              <Link href="/auth/login" className="rounded-full border border-slate-300 px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50">Sign in</Link>
            </div>
          </form>
          {submitted ? <p className="mt-4 rounded-2xl bg-violet-50 p-3 text-sm font-medium text-violet-700">Your appointment request has been received. Our team will confirm it shortly.</p> : null}
        </div>
      </section>
    </main>
  );
}
