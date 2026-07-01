"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("Account created. Please sign in to continue.");
    router.push("/auth/login");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top_left,_rgba(109,40,217,0.12),_transparent_30%)] px-4 py-10">
      <div className="w-full max-w-md rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-700">Create account</p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-900">Join Zionova HealthSphere</h1>
        <p className="mt-3 text-sm text-slate-600">Register to book appointments and manage your care journey.</p>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <input className="w-full rounded-2xl border border-slate-200 px-4 py-3" placeholder="Full name" />
          <input className="w-full rounded-2xl border border-slate-200 px-4 py-3" placeholder="Email" type="email" />
          <input className="w-full rounded-2xl border border-slate-200 px-4 py-3" placeholder="Password" type="password" />
          <button className="w-full rounded-full bg-violet-700 px-5 py-3 font-semibold text-white transition hover:bg-violet-600" type="submit">Create account</button>
        </form>
        {message ? <p className="mt-4 rounded-2xl bg-violet-50 p-3 text-sm font-medium text-violet-700">{message}</p> : null}
        <p className="mt-4 text-sm text-slate-600">Already have an account? <Link href="/auth/login" className="font-semibold text-violet-700">Sign in</Link></p>
      </div>
    </main>
  );
}
