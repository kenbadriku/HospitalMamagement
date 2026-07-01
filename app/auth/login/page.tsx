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
      callbackUrl: "/dashboard",
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
    <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.14),_transparent_35%)] px-4 py-8 sm:px-6 lg:px-8">
      <div className="w-full max-w-md rounded-[2rem] border border-slate-200 bg-white/95 p-8 shadow-[0_24px_80px_rgba(15,23,42,0.12)] backdrop-blur sm:p-10">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Portal access</p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-900">Sign in</h1>
          <p className="mt-2 text-sm text-slate-600">Enter your credentials to access the hospital workspace.</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          {error ? <p className="rounded-2xl bg-red-50 p-3 text-sm text-red-600">{error}</p> : null}

          <label className="block text-sm font-medium text-slate-700">
            Email
            <input name="email" type="email" autoComplete="email" required className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500" />
          </label>
          <label className="block text-sm font-medium text-slate-700">
            Password
            <input name="password" type="password" autoComplete="current-password" required className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500" />
          </label>

          <button type="submit" disabled={loading} className="w-full rounded-full bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-70">
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </main>
  );
}
