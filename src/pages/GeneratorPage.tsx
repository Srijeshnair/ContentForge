import { useState } from 'react';
import OutputCard from '../components/OutputCard';
import LoadingSpinner from '../components/LoadingSpinner';

export default function GeneratorPage() {
  const [contentType, setContentType] = useState('');
  const [topic, setTopic] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const contentTypes = [
    { value: 'linkedin-post', label: 'LinkedIn Post' },
    { value: 'caption', label: 'Caption' },
    { value: 'email', label: 'Email' },
  ];

  const handleGenerate = async () => {
    if (!contentType || !topic || isLoading) {
      return;
    }

    setIsLoading(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Placeholder for content generation logic
    setGeneratedContent(`Generated ${contentType} about: ${topic}`);

    setIsLoading(false);
  };

  const handleRegenerate = async () => {
    if (!contentType || !topic || isLoading) {
      return;
    }

    setIsLoading(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    handleGenerate();
  };

  return (
    <main className="flex min-h-screen flex-col bg-bg">
      <div className="mx-auto max-w-4xl px-6 py-12 sm:px-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-100 sm:text-4xl">Content Generator</h1>
          <p className="mt-2 text-slate-400">Create engaging content in seconds</p>
        </div>

        <div className="rounded-xl bg-card p-8 shadow-xl shadow-slate-900/20 transition-all duration-300">
          <div className="space-y-6">
            {/* Content Type Dropdown */}
            <div>
              <label htmlFor="content-type" className="block text-sm font-medium text-slate-300 transition-colors duration-200">
                Content Type
              </label>
              <select
                id="content-type"
                value={contentType}
                onChange={(e) => setContentType(e.target.value)}
                disabled={isLoading}
                className="mt-1 block w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-slate-100 shadow-sm transition-all duration-200 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="">Select a content type</option>
                {contentTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Topic Input */}
            <div>
              <label htmlFor="topic" className="block text-sm font-medium text-slate-300 transition-colors duration-200">
                Topic
              </label>
              <input
                type="text"
                id="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Enter your topic here..."
                disabled={isLoading}
                className="mt-1 block w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-slate-100 placeholder-slate-400 shadow-sm transition-all duration-200 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={!contentType || !topic || isLoading}
              className="group relative w-full overflow-hidden rounded-lg bg-primary px-4 py-3 text-white shadow-lg shadow-primary/25 transition-all duration-300 hover:bg-primary/90 hover:shadow-primary/40 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-card disabled:cursor-not-allowed disabled:bg-slate-600 disabled:shadow-none disabled:opacity-50"
            >
              <span className={`inline-flex items-center justify-center transition-all duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
                Generate Content
              </span>
              {isLoading && (
                <span className="absolute inset-0 flex items-center justify-center transition-all duration-300">
                  <LoadingSpinner size="sm" className="mr-2" />
                  Generating...
                </span>
              )}
            </button>
          </div>

          {generatedContent && (
            <OutputCard
              content={generatedContent}
              label={contentType ? `${contentTypes.find((item) => item.value === contentType)?.label} Output` : 'Generated Content'}
              onRegenerate={handleRegenerate}
              isLoading={isLoading}
            />
          )}
        </div>
      </div>
    </main>
  );
}