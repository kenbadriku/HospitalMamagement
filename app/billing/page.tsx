import { prisma } from "../../lib/prisma";

export default async function BillingPage() {
  let bills: Array<{ id: string; billNumber: string; status: string; totalAmount: number | string }> = [];

  try {
    const rows = await prisma.bill.findMany({ orderBy: { createdAt: "desc" }, take: 20 });
    bills = rows.map((row) => ({
      id: row.id,
      billNumber: row.billNumber,
      status: row.status,
      totalAmount: Number(row.totalAmount),
    }));
  } catch {
    bills = [];
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-6 px-6 py-10">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-sky-700">Billing</p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-900">Invoices and payments</h1>
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <ul className="divide-y divide-slate-100">
          {bills.map((bill) => (
            <li key={bill.id} className="flex items-center justify-between px-5 py-4">
              <div>
                <p className="font-medium text-slate-900">{bill.billNumber}</p>
                <p className="text-sm text-slate-600">Total amount: UGX {bill.totalAmount}</p>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">{bill.status}</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
