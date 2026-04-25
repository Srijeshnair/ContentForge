import { useState } from 'react';
import OutputCard from '../components/OutputCard';

export default function GeneratorPage() {
  const [contentType, setContentType] = useState('');
  const [topic, setTopic] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');

  const contentTypes = [
    { value: 'linkedin-post', label: 'LinkedIn Post' },
    { value: 'caption', label: 'Caption' },
    { value: 'email', label: 'Email' },
  ];

  const handleGenerate = () => {
    // Placeholder for content generation logic
    setGeneratedContent(`Generated ${contentType} about: ${topic}`);
  };

  const handleRegenerate = () => {
    if (!contentType || !topic) {
      return;
    }

    handleGenerate();
  };

  return (
    <main className="flex min-h-screen flex-col bg-gray-50">
      <div className="mx-auto max-w-4xl px-6 py-12 sm:px-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Content Generator</h1>
          <p className="mt-2 text-gray-600">Create engaging content in seconds</p>
        </div>

        <div className="rounded-lg bg-white p-8 shadow-sm">
          <div className="space-y-6">
            {/* Content Type Dropdown */}
            <div>
              <label htmlFor="content-type" className="block text-sm font-medium text-gray-700">
                Content Type
              </label>
              <select
                id="content-type"
                value={contentType}
                onChange={(e) => setContentType(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
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
              <label htmlFor="topic" className="block text-sm font-medium text-gray-700">
                Topic
              </label>
              <input
                type="text"
                id="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Enter your topic here..."
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={!contentType || !topic}
              className="w-full rounded-md bg-indigo-600 px-4 py-3 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              Generate Content
            </button>
          </div>

          {/* Generated Content Display */}
          {generatedContent && (
            <div className="mt-8">
              <h3 className="text-lg font-medium text-gray-900">Generated Content</h3>
              <div className="mt-2 rounded-md bg-gray-50 p-4">
                <p className="text-gray-700 whitespace-pre-wrap">{generatedContent}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}