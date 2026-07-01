import Link from "next/link";

const services = [
  { title: "Emergency care", description: "Rapid triage for urgent cases and same-day support." },
  { title: "Online consultations", description: "Virtual visits for follow-ups and specialist advice." },
  { title: "Lab diagnostics", description: "Fast, accurate testing with digital results tracking." },
  { title: "Pharmacy access", description: "Medication stock visibility and refill management." },
  { title: "Health monitoring", description: "Ongoing wellness checks and longitudinal care plans." },
  { title: "Insurance & billing", description: "Simplified billing, claims, and payment workflows." },
];

const doctors = [
  { name: "Dr. Grace Kawuma", department: "Cardiology", qualification: "MD, FACC", experience: "14 years" },
  { name: "Dr. Henry Mugisha", department: "Neurology", qualification: "MBBS, MSc", experience: "11 years" },
  { name: "Dr. Lydia Busingye", department: "Pediatrics", qualification: "MD, Pediatrics", experience: "9 years" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(20,184,166,0.12),_transparent_35%)]">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-teal-700">Zionova</p>
          <p className="text-lg font-semibold text-slate-900">HealthSphere</p>
        </div>
        <div className="hidden items-center gap-6 text-sm font-medium text-slate-700 md:flex">
          <Link href="#services">Services</Link>
          <Link href="#doctors">Doctors</Link>
          <Link href="#contact">Contact</Link>
          <Link href="/dashboard" className="rounded-full bg-teal-700 px-4 py-2 text-white transition hover:bg-teal-600">Admin panel</Link>
        </div>
      </nav>

      <section className="mx-auto grid max-w-7xl gap-8 px-6 pb-16 pt-4 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:pb-24">
        <div className="rounded-[2rem] bg-slate-950 p-8 text-white shadow-2xl sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-teal-300">Your health, our priority</p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">
            Compassionate care backed by a modern hospital management system.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-slate-300">
            Deliver seamless patient experiences with digital records, sophisticated scheduling, and a connected care team.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/auth/login" className="rounded-full bg-teal-500 px-5 py-3 font-semibold text-white transition hover:bg-teal-400">Book appointment</Link>
            <Link href="/dashboard" className="rounded-full border border-white/15 px-5 py-3 font-semibold text-slate-100 transition hover:bg-white/10">Explore admin workspace</Link>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { value: "150+", label: "Doctors" },
              { value: "50K+", label: "Patients" },
              { value: "24/7", label: "Support" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/10 p-4">
                <p className="text-2xl font-semibold">{stat.value}</p>
                <p className="mt-1 text-sm text-slate-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl">
          <div className="rounded-[1.5rem] bg-teal-50 p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-teal-600">Care coordination</p>
            <h2 className="mt-3 text-2xl font-semibold text-slate-900">Everything your team needs in one dashboard</h2>
            <ul className="mt-5 space-y-3 text-sm text-slate-600">
              <li>• Patient registration and medical history</li>
              <li>• Appointment scheduling and reminders</li>
              <li>• Lab orders, billing, and pharmacy oversight</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="services" className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-teal-700">Services</p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-900">Complete care for every stage of treatment</h2>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <article key={service.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <h3 className="text-lg font-semibold text-slate-900">{service.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{service.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="doctors" className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-teal-700">Doctors</p>
          <h2 className="mt-2 text-3xl font-semibold text-slate-900">Meet the specialists supporting your care journey</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {doctors.map((doctor) => (
            <article key={doctor.name} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 font-semibold text-teal-700">{doctor.name.split(' ').map((part) => part[0]).join('').slice(0, 2)}</div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">{doctor.name}</h3>
              <p className="mt-1 text-sm text-teal-600">{doctor.department}</p>
              <p className="mt-2 text-sm text-slate-600">{doctor.qualification}</p>
              <p className="mt-2 text-sm text-slate-600">Experience: {doctor.experience}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <div className="grid gap-6 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-teal-700">Contact us</p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-900">Visit us or connect with our care team</h2>
            <p className="mt-4 text-sm text-slate-600">Plot 12, Mukabira Road • Kampala, Uganda</p>
            <p className="mt-2 text-sm text-slate-600">+256 774 000 000</p>
            <p className="mt-2 text-sm text-slate-600">hello@zionovahealth.com</p>
          </div>
          <form className="grid gap-3">
            <input className="rounded-2xl border border-slate-200 px-4 py-3" placeholder="Name" />
            <input className="rounded-2xl border border-slate-200 px-4 py-3" placeholder="Email" />
            <input className="rounded-2xl border border-slate-200 px-4 py-3" placeholder="Subject" />
            <textarea className="min-h-28 rounded-2xl border border-slate-200 px-4 py-3" placeholder="Message" />
            <button className="rounded-full bg-slate-950 px-5 py-3 font-semibold text-white" type="button">Send message</button>
          </form>
        </div>
      </section>

      <footer className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-10 text-sm text-slate-500 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <p>© 2026 Zionova HealthSphere. Care for every journey.</p>
        <div className="flex gap-4">
          <Link href="/dashboard">Admin</Link>
          <Link href="#services">Services</Link>
          <Link href="#contact">Contact</Link>
        </div>
      </footer>
    </main>
  );
}
