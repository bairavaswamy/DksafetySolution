import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <main className="bg-white px-4 py-20 text-slate-950">
      <section className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-primary-600">
          Page not found
        </p>
        <h1 className="mt-4 text-4xl font-black leading-tight sm:text-5xl">
          This safety service page is not available.
        </h1>
        <p className="mt-5 text-base leading-8 text-slate-600">
          Open the Chennai directory to choose a service, area, or gated community page
          that is currently published.
        </p>
        <Link
          href="/chennai"
          prefetch={false}
          className="mt-7 inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
        >
          Open Chennai directory
          <ArrowRight size={16} />
        </Link>
      </section>
    </main>
  );
}
