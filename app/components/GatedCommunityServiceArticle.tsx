import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, MapPin, MessageCircle, Phone, ShieldCheck } from "lucide-react";
import { siteConfig } from "../config/site.config";
import type { GatedCommunityPage } from "../content/gatedCommunityServicePages";

type GatedCommunityServiceArticleProps = {
  page: GatedCommunityPage;
};

const variantStyles = [
  {
    accent: "text-secondary-300",
    button: "from-secondary to-secondary-700",
    band: "bg-secondary-50",
    text: "text-secondary-700",
    border: "border-secondary-100",
  },
  {
    accent: "text-secondary-300",
    button: "from-primary-700 to-primary-900",
    band: "bg-primary-50",
    text: "text-primary-700",
    border: "border-primary-100",
  },
  {
    accent: "text-secondary-200",
    button: "from-primary-700 to-primary-900",
    band: "bg-slate-50",
    text: "text-slate-700",
    border: "border-slate-200",
  },
  {
    accent: "text-secondary-300",
    button: "from-secondary to-secondary-700",
    band: "bg-secondary-50",
    text: "text-secondary-700",
    border: "border-secondary-100",
  },
  {
    accent: "text-secondary-300",
    button: "from-secondary to-secondary-700",
    band: "bg-secondary-50",
    text: "text-secondary-700",
    border: "border-secondary-100",
  },
];

export default function GatedCommunityServiceArticle({
  page,
}: GatedCommunityServiceArticleProps) {
  const style = variantStyles[page.variant % variantStyles.length];

  return (
    <main className="bg-white text-slate-950">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={page.images.hero}
            alt={`${page.service.name} installation reference for ${page.community.name}`}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/[0.78] to-slate-900/35" />
        </div>

        <div className="relative mx-auto grid min-h-[650px] max-w-7xl items-center gap-10 px-4 py-14 lg:grid-cols-[1.05fr_0.75fr] lg:px-6">
          <div className="min-w-0">
            <p className={`text-xs font-black uppercase tracking-[0.22em] ${style.accent} sm:text-sm`}>
              {page.hero.eyebrow}
            </p>
            <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
              {page.hero.title}
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-slate-100 sm:text-lg">
              {page.hero.lead}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={siteConfig.contact.phoneHref}
                className={`inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r ${style.button} px-5 py-3 text-sm font-bold text-white shadow-lg transition hover:scale-[1.02] sm:text-base`}
              >
                <Phone size={18} />
                Call for Site Visit
              </a>
              <a
                href={siteConfig.contact.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 px-5 py-3 text-sm font-bold text-white backdrop-blur transition hover:bg-white/20 sm:text-base"
              >
                <MessageCircle size={18} />
                WhatsApp Photos
              </a>
            </div>
          </div>

          <div className="grid gap-4">
            {page.proof.map((item) => (
              <div key={item.label} className="rounded-lg border border-white/15 bg-white/[0.12] p-5 text-white backdrop-blur">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-white/65">
                  {item.label}
                </p>
                <p className="mt-2 text-2xl font-black">{item.value}</p>
                <p className="mt-2 text-sm leading-6 text-slate-100">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 lg:px-6">
        <div className="grid gap-10 lg:grid-cols-[0.7fr_0.3fr]">
          <article>
            <p className={`text-sm font-black uppercase tracking-[0.2em] ${style.text}`}>
              {page.community.name}
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">
              {page.intro.heading}
            </h2>
            <div className="mt-5 space-y-5 text-[17px] leading-8 text-slate-700">
              {page.intro.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2">
              <div className="relative min-h-[280px] overflow-hidden rounded-lg">
                <Image
                  src={page.images.detail}
                  alt={`${page.service.name} detail for ${page.community.name}`}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative min-h-[280px] overflow-hidden rounded-lg">
                <Image
                  src={page.images.context}
                  alt={`${page.service.name} site context for ${page.community.name}`}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="mt-12 space-y-12">
              {page.sections.map((section, index) => (
                <section
                  key={`${section.eyebrow}-${section.heading}`}
                  className={index % 3 === 1 ? `${style.band} -mx-4 px-4 py-8 sm:mx-0 sm:rounded-lg sm:px-6` : ""}
                >
                  <p className={`text-xs font-black uppercase tracking-[0.2em] ${style.text}`}>
                    {section.eyebrow}
                  </p>
                  <h2 className="mt-3 text-2xl font-black text-slate-950 sm:text-3xl">
                    {section.heading}
                  </h2>
                  <div className="mt-5 space-y-5 text-[17px] leading-8 text-slate-700">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </article>

          <aside className="lg:sticky lg:top-32 lg:self-start">
            <div className={`rounded-lg border ${style.border} ${style.band} p-6`}>
              <MapPin className={style.text} size={24} />
              <h2 className="mt-3 text-2xl font-black text-slate-950">
                Visit Checklist
              </h2>
              <div className="mt-5 space-y-3">
                {page.checklist.map((item) => (
                  <div key={item} className="flex gap-3 rounded-lg bg-white p-3 text-sm font-semibold leading-6 text-slate-700">
                    <CheckCircle2 className={`mt-0.5 shrink-0 ${style.text}`} size={17} />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <ShieldCheck className="text-primary-600" size={24} />
              <h2 className="mt-3 text-2xl font-black text-slate-950">
                Ask for a measured quote
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Send the community name, tower, service need, and photos. The team can
                respond with the right visit plan before material is carried in.
              </p>
              <div className="mt-5 grid gap-3">
                <a
                  href={siteConfig.contact.phoneHref}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
                >
                  <Phone size={17} />
                  Call Now
                </a>
                <Link
                  href="/request-quote"
                  prefetch={false}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-primary-200 px-5 py-3 text-sm font-bold text-primary-700 transition hover:bg-primary-50"
                >
                  Request Quote
                  <ArrowRight size={17} />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-14 lg:px-6">
        <div className="mx-auto max-w-7xl">
          <p className={`text-sm font-black uppercase tracking-[0.2em] ${style.text}`}>
            Questions
          </p>
          <h2 className="mt-3 text-3xl font-black text-slate-950">
            Common questions for {page.community.name}
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {page.faq.map((item) => (
              <div key={item.question} className="rounded-lg border border-slate-200 bg-white p-5">
                <h3 className="text-lg font-black text-slate-950">{item.question}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-14 lg:px-6">
        <div className="mx-auto max-w-5xl text-center">
          <p className={`text-sm font-black uppercase tracking-[0.2em] ${style.text}`}>
            Next Step
          </p>
          <h2 className="mt-3 text-3xl font-black text-slate-950">
            {page.closing.heading}
          </h2>
          <div className="mx-auto mt-5 max-w-3xl space-y-4 text-base leading-8 text-slate-700">
            {page.closing.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
