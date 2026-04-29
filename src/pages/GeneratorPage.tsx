import { useState } from 'react';
import OutputCard from '../components/OutputCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { generateContent } from '../services/api';

export default function GeneratorPage() {
  const [contentType, setContentType] = useState('');
  const [topic, setTopic] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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
    setErrorMessage('');

    try {
      const response = await generateContent({ contentType, topic });
      setGeneratedContent(response.generatedContent);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to generate content at this time.';
      setErrorMessage(message);
      setGeneratedContent('');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegenerate = async () => {
    await handleGenerate();
  };

  return (
    <main className="flex min-h-[calc(100vh-200px)] flex-col bg-bg">
      <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 text-center sm:mb-8">
          <h1 className="text-2xl font-bold text-slate-100 sm:text-3xl md:text-4xl">Content Generator</h1>
          <p className="mt-2 text-sm text-slate-400 sm:text-base">Create engaging content in seconds</p>
        </div>

        <div className={`rounded-xl bg-card p-4 shadow-xl shadow-slate-900/20 transition-all duration-300 sm:p-6 lg:p-8 ${isLoading ? 'scale-[0.99] opacity-90' : 'scale-100 opacity-100'}`}>
          <div className="space-y-4 sm:space-y-6">
            {/* Content Type Dropdown */}
            <div>
              <label htmlFor="content-type" className="block text-sm font-medium text-slate-300 transition-colors duration-200 mb-2">
                Content Type
              </label>
              <select
                id="content-type"
                value={contentType}
                onChange={(e) => setContentType(e.target.value)}
                disabled={isLoading}
                className="mt-1 block w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2.5 text-slate-100 shadow-sm transition-all duration-200 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed hover:border-slate-500"
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
              <label htmlFor="topic" className="block text-sm font-medium text-slate-300 transition-colors duration-200 mb-2">
                Topic
              </label>
              <input
                type="text"
                id="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Enter your topic here..."
                disabled={isLoading}
                className="mt-1 block w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2.5 text-slate-100 placeholder-slate-400 shadow-sm transition-all duration-200 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed hover:border-slate-500"
              />
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={!contentType || !topic || isLoading}
              className="group relative w-full overflow-hidden rounded-lg bg-primary px-4 py-3 text-white shadow-lg shadow-primary/25 transition-all duration-300 hover:bg-primary/90 hover:shadow-primary/40 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-card disabled:cursor-not-allowed disabled:bg-slate-600 disabled:shadow-none disabled:opacity-50 disabled:hover:scale-100"
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

            {errorMessage && (
              <div className="rounded-lg border border-rose-500 bg-rose-950/40 px-4 py-3 text-sm text-rose-200 shadow-sm shadow-rose-900/20">
                {errorMessage}
              </div>
            )}
          </div>

          {generatedContent && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 mt-6 sm:mt-8">
              <OutputCard
                content={generatedContent}
                label={contentType ? `${contentTypes.find((item) => item.value === contentType)?.label} Output` : 'Generated Content'}
                onRegenerate={handleRegenerate}
                isLoading={isLoading}
              />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}