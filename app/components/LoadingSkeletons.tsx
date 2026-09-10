import { siteConfig } from "../config/site.config";

function SkeletonBlock({ className = "" }: { className?: string }) {
  return <div aria-hidden="true" className={`rounded-lg bg-primary-100 ${className}`} />;
}

export function HeaderSkeleton() {
  return (
    <>
      <div className="fixed left-0 top-0 z-50 w-screen max-w-[100vw] border-b border-primary-100 bg-white/95 shadow-lg shadow-primary-900/5 backdrop-blur-md">
        <div className="flex h-8 items-center justify-center bg-primary-900 px-4 text-white">
          <a
            href={siteConfig.contact.phoneHref}
            aria-label={`Call ${siteConfig.name} at ${siteConfig.contact.phoneLabel}`}
            className="inline-flex h-full items-center text-xs font-semibold tracking-wide transition-colors hover:text-secondary-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-200 sm:text-sm"
          >
            {siteConfig.contact.phoneLabel}
          </a>
        </div>
        <header className="mx-auto flex h-[68px] max-w-7xl items-center justify-between gap-3 px-4 sm:h-[76px] sm:px-6 lg:h-20">
          <div className="flex max-w-[calc(100vw-8.75rem)] shrink-0 items-center gap-2 p-1 pr-2 sm:max-w-none sm:px-2 sm:py-1">
            <div className="h-11 w-11 animate-pulse rounded-full bg-primary-100 sm:h-14 sm:w-48 sm:rounded-lg lg:w-56" />
            <div className="space-y-1.5 sm:hidden">
              <div className="h-3 w-16 animate-pulse rounded-full bg-primary-100" />
              <div className="h-2 w-12 animate-pulse rounded-full bg-secondary-100" />
            </div>
          </div>

          <div className="hidden animate-pulse items-center gap-3 lg:flex">
            <SkeletonBlock className="h-8 w-16" />
            <SkeletonBlock className="h-8 w-20" />
            <SkeletonBlock className="h-8 w-16" />
            <SkeletonBlock className="h-8 w-16" />
          </div>

          <div className="flex animate-pulse items-center gap-2">
            <SkeletonBlock className="hidden h-10 w-48 rounded-full lg:block xl:w-72" />
            <SkeletonBlock className="hidden h-10 w-32 rounded-full lg:block" />
            <SkeletonBlock className="h-11 w-11 rounded-full lg:hidden" />
            <SkeletonBlock className="h-11 w-11 rounded-full lg:hidden" />
          </div>
        </header>
      </div>
    </>
  );
}

export function CarouselSkeleton() {
  return (
    <section className="-mx-4 sm:-mx-6">
      <div className="relative h-[520px] w-full overflow-hidden bg-gradient-to-r from-primary-950 via-primary-900 to-primary-700 sm:h-[560px] md:h-[640px] lg:h-[720px]">
        <div className="absolute inset-0 bg-primary-900/25" />
        <div className="relative flex h-full items-center px-6 sm:px-10 md:justify-center">
          <div className="w-full max-w-3xl animate-pulse md:text-center">
            <div className="h-4 w-40 rounded-full bg-secondary-200/80 md:mx-auto" />
            <div className="mt-5 h-10 w-3/4 rounded-lg bg-white/75 md:mx-auto md:h-12" />
            <div className="mt-3 h-10 w-2/3 rounded-lg bg-white/55 md:mx-auto md:h-12" />
            <div className="mt-5 h-4 w-full max-w-xl rounded-full bg-white/45 md:mx-auto" />
            <div className="mt-3 h-4 w-2/3 rounded-full bg-white/35 md:mx-auto" />
            <div className="mt-6 h-11 w-32 rounded-full bg-secondary-300 md:mx-auto" />
          </div>
        </div>
      </div>
    </section>
  );
}

export function MobileRibbonSkeleton() {
  return (
    <div className="flex animate-pulse gap-2 bg-primary-50 p-4">
      <SkeletonBlock className="h-10 flex-1 rounded-full bg-primary-100" />
      <SkeletonBlock className="h-10 flex-1 rounded-full bg-secondary-100" />
      <SkeletonBlock className="h-10 flex-1 rounded-full bg-accent-100" />
    </div>
  );
}

export function ButtonCardsSkeleton() {
  return (
    <div className="grid animate-pulse grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="overflow-hidden rounded-lg border border-primary-100 bg-white shadow-sm">
          <SkeletonBlock className="h-32 rounded-none bg-primary-100" />
          <div className="space-y-3 p-4">
            <SkeletonBlock className="h-4 w-2/3" />
            <SkeletonBlock className="h-3 w-full bg-slate-100" />
            <SkeletonBlock className="h-3 w-4/5 bg-slate-100" />
            <SkeletonBlock className="h-4 w-24 bg-secondary-100" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function ServicesSkeleton() {
  return (
    <div className="grid animate-pulse grid-cols-1 gap-4 md:grid-cols-2">
      {[...Array(4)].map((_, index) => (
        <div key={index} className="rounded-lg border border-primary-100 bg-white p-5 shadow-sm">
          <SkeletonBlock className="h-5 w-2/3" />
          <SkeletonBlock className="mt-4 h-3 w-full bg-slate-100" />
          <SkeletonBlock className="mt-2 h-3 w-5/6 bg-slate-100" />
          <div className="mt-6 flex gap-2">
            <SkeletonBlock className="h-9 w-24 rounded-full bg-secondary-100" />
            <SkeletonBlock className="h-9 w-24 rounded-full bg-accent-100" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function TestimonialsSkeleton() {
  return (
    <div className="mx-auto grid max-w-7xl animate-pulse gap-4 md:grid-cols-2">
      {[...Array(2)].map((_, index) => (
        <div key={index} className="rounded-lg border border-primary-100 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <SkeletonBlock className="h-11 w-11 rounded-full bg-primary-200" />
            <div className="flex-1 space-y-2">
              <SkeletonBlock className="h-4 w-36" />
              <SkeletonBlock className="h-3 w-24 bg-slate-100" />
            </div>
          </div>
          <SkeletonBlock className="mt-5 h-3 w-full bg-slate-100" />
          <SkeletonBlock className="mt-2 h-3 w-5/6 bg-slate-100" />
        </div>
      ))}
    </div>
  );
}

export function ClientsSkeleton() {
  return (
    <div className="grid animate-pulse grid-cols-2 gap-4 md:grid-cols-4">
      {[...Array(4)].map((_, index) => (
        <div key={index} className="flex min-h-[112px] flex-col items-center justify-center gap-3 rounded border border-primary-100 bg-white p-4 shadow-sm">
          <SkeletonBlock className="h-12 w-12 rounded-full bg-gradient-to-br from-primary-200 to-primary-100" />
          <SkeletonBlock className="h-4 w-24" />
        </div>
      ))}
    </div>
  );
}

export function FloatingContactSkeleton() {
  return (
    <div className="fixed right-4 top-[75%] z-50 flex -translate-y-1/2 animate-pulse flex-col gap-3 sm:right-5">
      <div className="h-12 w-12 rounded-full bg-primary-200 shadow-lg" />
      <div className="h-12 w-12 rounded-full bg-accent-200 shadow-lg" />
    </div>
  );
}
