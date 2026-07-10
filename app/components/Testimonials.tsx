import { siteConfig } from "../config/site.config";

function Stars() {
  return (
    <div className="flex items-center gap-1">
      <span className="sr-only">5 out of 5 star rating</span>
      {[...Array(5)].map((_, index) => (
        <svg
          key={index}
          viewBox="0 0 20 20"
          aria-hidden="true"
          className="h-4 w-4 fill-lime-400 text-lime-400"
        >
          <path d="M10 1.5 12.6 7l6 .7-4.4 4 1.2 5.8L10 14.6l-5.4 2.9 1.2-5.8-4.4-4 6-.7L10 1.5Z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <div className="mx-auto max-w-7xl rounded-[34px] border border-primary-100 bg-primary-50 p-4 shadow-[0_24px_70px_rgba(15,76,129,0.08)] sm:p-6 lg:p-8">
      <div className="grid gap-6 lg:grid-cols-[0.85fr_1.5fr]">
        <div className="rounded-[28px] border border-indigo-100 bg-white p-6 shadow-sm lg:p-7">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-indigo-700">
            Chennai customer notes
          </p>
          <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
            Area-focused safety net work, written like real customer checks.
          </h2>
          <p className="mt-4 text-sm leading-6 text-slate-600">
            These cards pull from the central {siteConfig.name} profile, so Chennai proof points
            stay consistent across home, service, and contact pages.
          </p>

          <div className="mt-6 rounded-2xl border border-lime-100 bg-lime-50/70 p-4">
            <div className="flex items-center justify-between gap-3">
              <Stars />
              <span className="text-sm font-black text-slate-950">Chennai</span>
            </div>
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-lime-800">
              Customer proof managed from one site config
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {siteConfig.testimonials.map((review, index) => (
            <article
              key={review.name}
              className={`rounded-[26px] border bg-white p-5 shadow-sm ${
                index === 0
                  ? "border-indigo-200 shadow-[0_18px_45px_rgba(15,23,42,0.08)]"
                  : "border-stone-200"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-900 text-sm font-bold text-white">
                    {review.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-950">{review.name}</p>
                    <p className="text-xs text-slate-500">{review.location}</p>
                  </div>
                </div>
                <span className="rounded-full bg-indigo-50 px-3 py-1 text-[11px] font-bold text-indigo-800 ring-1 ring-indigo-100">
                  Chennai
                </span>
              </div>

              <div className="mt-5 flex items-center justify-between gap-3">
                <Stars />
                <p className="text-xs font-semibold text-slate-500">{review.project}</p>
              </div>

              <p className="mt-4 text-[15px] leading-7 text-slate-700">
                &quot;{review.quote}&quot;
              </p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
