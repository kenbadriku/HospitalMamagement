import { prisma } from "../../lib/prisma";

export default async function LabPage() {
  let tests: Array<{ id: string; name: string; code: string; price: number }> = [];

  try {
    const rows = await prisma.labTest.findMany({ orderBy: { name: "asc" }, take: 20 });
    tests = rows.map((test) => ({
      id: test.id,
      name: test.name,
      code: test.code,
      price: Number(test.price),
    }));
  } catch {
    tests = [];
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-6 px-6 py-10">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-sky-700">Laboratory</p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-900">Lab tests and orders</h1>
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <ul className="divide-y divide-slate-100">
          {tests.map((test) => (
            <li key={test.id} className="flex items-center justify-between px-5 py-4">
              <div>
                <p className="font-medium text-slate-900">{test.name}</p>
                <p className="text-sm text-slate-600">Code: {test.code}</p>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">UGX {test.price}</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
