import Link from "next/link";

export default function ContactPage() {
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

      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-12 lg:grid-cols-[0.8fr_1.2fr] lg:px-8 lg:py-20">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-700">Contact us</p>
          <h1 className="mt-4 text-4xl font-semibold text-slate-900">Reach our care team anytime.</h1>
          <p className="mt-4 text-sm text-slate-600">Plot 12, Mukabira Road • Kampala, Uganda</p>
          <p className="mt-2 text-sm text-slate-600">+256 774 000 000</p>
          <p className="mt-2 text-sm text-slate-600">hello@zionovahealth.com</p>
        </div>
        <form className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <div className="grid gap-4 md:grid-cols-2">
            <input className="rounded-2xl border border-slate-200 px-4 py-3" placeholder="Name" />
            <input className="rounded-2xl border border-slate-200 px-4 py-3" placeholder="Email" />
          </div>
          <input className="mt-4 w-full rounded-2xl border border-slate-200 px-4 py-3" placeholder="Subject" />
          <textarea className="mt-4 min-h-32 w-full rounded-2xl border border-slate-200 px-4 py-3" placeholder="Message" />
          <button className="mt-4 rounded-full bg-violet-700 px-5 py-3 font-semibold text-white transition hover:bg-violet-600" type="button">Send message</button>
        </form>
      </section>
    </main>
  );
}
