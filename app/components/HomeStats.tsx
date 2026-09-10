import { siteConfig } from "../config/site.config";

export default function HomeStats() {
  return (
    <section
      aria-label={`${siteConfig.name} website highlights`}
      className="mx-auto mt-10 max-w-7xl"
    >
      <div className="mb-4">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-secondary">
          Working Standard
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-primary-900">
          Built around safety, access, and a clean finish.
        </h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {siteConfig.stats.map((stat) => (
          <article
            key={stat.label}
            className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft transition duration-300 hover:-translate-y-1 hover:border-secondary-300 hover:shadow-lg"
          >
            <p className="text-2xl font-bold text-primary">{stat.value}</p>
            <h3 className="mt-2 text-sm font-semibold uppercase tracking-[0.14em] text-primary-900">
              {stat.label}
            </h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">{stat.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
