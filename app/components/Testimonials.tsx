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
          className="h-4 w-4 fill-secondary text-secondary"
        >
          <path d="M10 1.5 12.6 7l6 .7-4.4 4 1.2 5.8L10 14.6l-5.4 2.9 1.2-5.8-4.4-4 6-.7L10 1.5Z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <div className="mx-auto max-w-7xl">
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {siteConfig.testimonials.map((review) => (
          <TestimonialCard key={review.name} review={review} mobile />
        ))}
      </div>

      <div className="hidden grid-cols-3 gap-4 md:grid">
        {siteConfig.testimonials.map((review) => (
          <TestimonialCard key={review.name} review={review} />
        ))}
      </div>
    </div>
  );
}

function TestimonialCard({
  review,
  mobile = false,
}: {
  review: (typeof siteConfig.testimonials)[number];
  mobile?: boolean;
}) {
  return (
    <article
      className={[
        "rounded-lg border border-slate-200 bg-white p-5 shadow-soft transition duration-300 hover:-translate-y-1 hover:border-secondary-300 hover:shadow-lg",
        mobile ? "w-full" : "",
      ].join(" ")}
    >
      <div className="flex items-center justify-between gap-4">
        <Stars />
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
          {review.initials}
        </span>
      </div>
      <p className="mt-4 min-h-[126px] text-sm leading-7 text-slate-600">
        &quot;{review.quote}&quot;
      </p>
      <div className="mt-4 border-t border-slate-100 pt-4">
        <h3 className="font-semibold text-slate-950">{review.name}</h3>
        <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-secondary">
          {review.location} | {review.project}
        </p>
      </div>
    </article>
  );
}
