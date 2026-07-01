import Link from "next/link";

const services = [
  { name: "Primary Care", description: "Routine checkups, chronic condition reviews, and general wellness care.", category: "General", duration: "30 mins", price: "UGX 80,000" },
  { name: "Cardiology", description: "Heart health evaluations and specialist consultations.", category: "Specialist", duration: "45 mins", price: "UGX 150,000" },
  { name: "Pediatrics", description: "Preventive care for children and newborn follow-ups.", category: "Specialist", duration: "30 mins", price: "UGX 90,000" },
  { name: "Laboratory", description: "Sample collection, diagnostics, and lab reporting.", category: "Diagnostics", duration: "20 mins", price: "UGX 60,000" },
];

export default function ServicesPage() {
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
        <div className="hidden items-center gap-6 text-sm font-medium text-slate-700 md:flex">
          <Link href="/about">About</Link>
          <Link href="/services">Services</Link>
          <Link href="/doctors">Doctors</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/auth/login" className="rounded-full bg-violet-700 px-4 py-2 text-white transition hover:bg-violet-600">Book visit</Link>
        </div>
      </nav>

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-20">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-700">Our services</p>
        <h1 className="mt-4 text-4xl font-semibold text-slate-900 sm:text-5xl">Specialist-led care for every stage of treatment.</h1>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {services.map((service) => (
            <article key={service.name} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-slate-900">{service.name}</h2>
                <span className="rounded-full bg-violet-50 px-3 py-1 text-sm font-medium text-violet-700">{service.category}</span>
              </div>
              <p className="mt-3 text-sm text-slate-600">{service.description}</p>
              <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
                <span>{service.duration}</span>
                <span className="font-semibold text-slate-900">{service.price}</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
