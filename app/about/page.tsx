import Link from "next/link";

export default function AboutPage() {
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

      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-12 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-20">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-700">Who we are</p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl">We combine compassionate care with modern digital workflows.</h1>
          <p className="mt-5 max-w-2xl text-lg text-slate-600">Zionova HealthSphere helps patients book appointments, access specialist services, and stay connected to the care team through one secure experience.</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/appointments" className="rounded-full bg-violet-700 px-5 py-3 font-semibold text-white transition hover:bg-violet-600">Book appointment</Link>
            <Link href="/dashboard" className="rounded-full border border-slate-300 px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50">Open admin panel</Link>
          </div>
        </div>
        <div className="rounded-[2rem] border border-violet-100 bg-white p-8 shadow-xl">
          <div className="rounded-[1.5rem] bg-violet-50 p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-700">Our mission</p>
            <h2 className="mt-3 text-2xl font-semibold text-slate-900">Accessible healthcare for every family, every step of the journey.</h2>
            <ul className="mt-5 space-y-3 text-sm text-slate-600">
              <li>• Secure patient records and scheduling</li>
              <li>• Specialist-led care pathways</li>
              <li>• Clear billing and pharmacy visibility</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
