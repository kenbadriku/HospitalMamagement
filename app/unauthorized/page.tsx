export default function UnauthorizedPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-10">
      <div className="max-w-md rounded-3xl bg-white p-8 shadow-xl">
        <p className="text-sm uppercase tracking-[0.3em] text-amber-600">Access denied</p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-900">You do not have permission to view this area.</h1>
        <p className="mt-3 text-sm text-slate-600">Please sign in with an account that has the appropriate role.</p>
      </div>
    </main>
  );
}
