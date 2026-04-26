export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="flex flex-1 items-center justify-center bg-gradient-to-br from-card to-slate-800 px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold text-slate-100 sm:text-5xl md:text-6xl">
            Generate Content in Seconds
          </h1>
          <p className="mt-6 text-lg text-slate-300 sm:text-xl">
            Create high-quality content effortlessly with our AI-powered tools.
          </p>
          <button className="mt-8 inline-flex items-center justify-center rounded-lg bg-primary px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-primary/25 transition hover:bg-primary/90 hover:shadow-primary/40 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-bg">
            Get Started
          </button>
        </div>
      </section>
    </main>
  );
}
