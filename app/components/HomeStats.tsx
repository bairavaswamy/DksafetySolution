import { siteConfig } from "../config/site.config";

export default function HomeStats() {
  return (
    <section
      aria-label={`${siteConfig.name} website highlights`}
      className="relative z-10 mx-auto mt-8 w-full max-w-7xl px-1 sm:px-4"
    >
      <div className="overflow-hidden rounded-[28px] border border-indigo-100 bg-white/95 shadow-[0_22px_70px_rgba(15,23,42,0.12)] backdrop-blur">
        <div className="grid gap-px bg-indigo-100/70 sm:grid-cols-2 lg:grid-cols-4">
          {siteConfig.stats.map((stat) => (
            <div
              key={stat.label}
              className="group bg-[linear-gradient(180deg,#ffffff_0%,#f8fffb_100%)] p-5 transition-colors duration-300 hover:bg-white sm:p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-3xl font-black tracking-tight text-indigo-900 sm:text-4xl">
                    {stat.value}
                  </p>
                  <h2 className="mt-2 text-sm font-bold uppercase tracking-[0.18em] text-slate-900">
                    {stat.label}
                  </h2>
                </div>
                <span className="mt-1 h-3 w-3 rounded-full bg-accent shadow-[0_0_0_6px_rgba(34,197,94,0.18)] transition-transform duration-300 group-hover:scale-125" />
              </div>

              <p className="mt-4 text-sm leading-6 text-slate-600">{stat.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
