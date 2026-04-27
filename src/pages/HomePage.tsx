export default function HomePage() {
  return (
    <main className="flex min-h-[calc(100vh-200px)] flex-col">
      {/* Hero Section */}
      <section className="flex flex-1 items-center justify-center bg-gradient-to-br from-card via-slate-800 to-slate-900 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-3xl font-bold text-slate-100 sm:text-4xl md:text-5xl lg:text-6xl leading-tight">
            Generate Content in Seconds
          </h1>
          <p className="mt-4 text-base text-slate-300 sm:mt-6 sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Create high-quality content effortlessly with our AI-powered tools.
          </p>
          <button className="mt-6 inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-base font-semibold text-white shadow-lg shadow-primary/25 transition-all duration-300 hover:bg-primary/90 hover:shadow-primary/40 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-bg sm:mt-8 sm:px-8 sm:py-4 sm:text-lg">
            Get Started
            <svg className="ml-2 w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </section>
    </main>
  );
}
