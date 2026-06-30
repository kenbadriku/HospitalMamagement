"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(event.currentTarget);
    const result = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Invalid email or password.");
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-10">
      <form onSubmit={handleSubmit} className="w-full max-w-md rounded-3xl border border-slate-800 bg-white p-8 shadow-xl">
        <p className="text-sm uppercase tracking-[0.3em] text-sky-700">Secure sign in</p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-900">Hospital management login</h1>
        <p className="mt-3 text-sm text-slate-600">Use your staff credentials to access the system.</p>

        {error ? <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</p> : null}

        <div className="mt-6 space-y-4">
          <label className="block text-sm font-medium text-slate-700">
            Email
            <input name="email" type="email" required className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2 outline-none ring-0 focus:border-sky-500" />
          </label>
          <label className="block text-sm font-medium text-slate-700">
            Password
            <input name="password" type="password" required className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2 outline-none ring-0 focus:border-sky-500" />
          </label>
        </div>

        <button type="submit" disabled={loading} className="mt-6 w-full rounded-full bg-slate-950 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70">
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </main>
  );
}
