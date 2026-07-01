'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const navigation = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/patients', label: 'Patients' },
  { href: '/doctors', label: 'Doctors' },
  { href: '/staff', label: 'Staff' },
  { href: '/appointments', label: 'Appointments' },
  { href: '/pharmacy', label: 'Pharmacy' },
  { href: '/billing', label: 'Billing' },
  { href: '/lab', label: 'Lab' },
  { href: '/equipment', label: 'Equipment' },
];

export default function AdminPageShell({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <aside className="w-full border-b border-teal-900/10 bg-slate-950 p-5 text-slate-100 lg:w-72 lg:border-b-0 lg:border-r lg:p-6">
          <div className="flex items-center justify-between lg:block">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-teal-300">Zionova</p>
              <h2 className="mt-2 text-xl font-semibold">HealthSphere Admin</h2>
            </div>
            <button className="rounded-full border border-white/15 px-3 py-2 text-sm lg:hidden" onClick={() => setOpen((value) => !value)}>
              Menu
            </button>
          </div>

          <div className="mt-6 space-y-2">
            <Link href="/" className="flex items-center justify-center rounded-full border border-teal-400/30 bg-teal-500/10 px-4 py-2 text-sm font-medium text-teal-200 transition hover:bg-teal-500/20">
              Back to website
            </Link>
          </div>

          <nav className={`${open ? 'mt-6 block' : 'mt-6 hidden'} space-y-1 lg:block`}>
            {navigation.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center rounded-2xl px-4 py-3 text-sm font-medium transition ${active ? 'bg-teal-500 text-white shadow-lg' : 'text-slate-300 hover:bg-slate-900 hover:text-white'}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
            <p className="font-semibold text-white">Care delivery workspace</p>
            <p className="mt-2 text-sm">Monitor operations, keep records current, and support your care team from one modern console.</p>
          </div>
        </aside>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-teal-600">Operations center</p>
              <h1 className="mt-2 text-3xl font-semibold text-slate-900">{title}</h1>
              <p className="mt-3 max-w-3xl text-sm text-slate-600">{description}</p>
            </div>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
