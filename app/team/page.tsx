import Link from "next/link";

const doctors = [
  { name: "Dr. Grace Kawuma", specialty: "Cardiology", experience: "14 years", availability: "Mon-Fri" },
  { name: "Dr. Henry Mugisha", specialty: "Neurology", experience: "11 years", availability: "Mon-Thu" },
  { name: "Dr. Lydia Busingye", specialty: "Pediatrics", experience: "9 years", availability: "Mon-Fri" },
];

export default function TeamPage() {
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
      </nav>

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-20">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-700">Our care team</p>
        <h1 className="mt-4 text-4xl font-semibold text-slate-900 sm:text-5xl">Meet the specialists leading the care experience.</h1>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {doctors.map((doctor) => (
            <article key={doctor.name} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-violet-100 font-semibold text-violet-700">{doctor.name.split(' ').map((part) => part[0]).join('').slice(0, 2)}</div>
              <h2 className="mt-4 text-xl font-semibold text-slate-900">{doctor.name}</h2>
              <p className="mt-2 text-sm font-medium text-violet-700">{doctor.specialty}</p>
              <p className="mt-2 text-sm text-slate-600">Experience: {doctor.experience}</p>
              <p className="mt-2 text-sm text-slate-600">Available: {doctor.availability}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
