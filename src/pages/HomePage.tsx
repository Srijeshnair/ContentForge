export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="flex flex-1 items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold text-slate-900 sm:text-5xl md:text-6xl">
            Generate Content in Seconds
          </h1>
          <p className="mt-6 text-lg text-slate-600 sm:text-xl">
            Create high-quality content effortlessly with our AI-powered tools.
          </p>
          <button className="mt-8 inline-flex items-center justify-center rounded-lg bg-indigo-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            Get Started
          </button>
        </div>
      </section>
    </main>
  );
}
