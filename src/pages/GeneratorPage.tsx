import { useState, useCallback } from 'react';
import OutputCard from '../components/OutputCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorAlert from '../components/ErrorAlert';
import FieldError from '../components/FieldError';
import { generateContent, testAiIntegration } from '../services/api';
import {
  validateGeneratorForm,
  normalizeGeneratorForm,
  GeneratorFormData,
  getValidationError,
} from '../utilities/validation';
import { parseError, ParsedError } from '../utilities/errorHandler';

export default function GeneratorPage() {
  const [contentType, setContentType] = useState('');
  const [topic, setTopic] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [aiTestPrompt, setAiTestPrompt] = useState('Hello, can you introduce yourself briefly?');
  const [aiTestResponse, setAiTestResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTestingAi, setIsTestingAi] = useState(false);
  const [error, setError] = useState<ParsedError | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const contentTypes = [
    { value: 'linkedin-post', label: 'LinkedIn Post' },
    { value: 'caption', label: 'Caption' },
    { value: 'email', label: 'Email' },
  ];

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const validateForm = useCallback((): boolean => {
    const formData = normalizeGeneratorForm({
      contentType,
      topic,
    });

    const validation = validateGeneratorForm(formData);

    if (!validation.isValid) {
      setValidationErrors(validation.errors);
      setError(null);
      return false;
    }

    setValidationErrors({});
    return true;
  }, [contentType, topic]);

  const handleTopicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTopic(value);
    
    // Clear field error when user starts typing
    if (validationErrors.topic) {
      setValidationErrors((prev) => {
        const { topic: _, ...rest } = prev;
        return rest;
      });
    }
  };

  const handleContentTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setContentType(value);

    // Clear field error when user selects
    if (validationErrors.contentType) {
      setValidationErrors((prev) => {
        const { contentType: _, ...rest } = prev;
        return rest;
      });
    }
  };

  const handleGenerate = async () => {
    // Validate form
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedContent('');

    try {
      const normalizedRequest = normalizeGeneratorForm({
        contentType,
        topic,
      });

      const response = await generateContent(normalizedRequest);
      setGeneratedContent(response.generatedContent);
      setValidationErrors({});
    } catch (err) {
      const parsedError = parseError(err);
      setError(parsedError);
      setGeneratedContent('');
      setValidationErrors({});
    } finally {
      setIsLoading(false);
    }
  };

  const handleAiTest = async () => {
    if (!aiTestPrompt.trim()) {
      setError({
        type: 'validation',
        message: 'Test prompt is required.',
        userMessage: 'Please enter a prompt to test the AI endpoint.',
        isDismissible: true,
      });
      return;
    }

    setIsTestingAi(true);
    setError(null);
    setAiTestResponse('');

    try {
      const result = await testAiIntegration(aiTestPrompt.trim());
      setAiTestResponse(result.response);
    } catch (err) {
      setError(parseError(err));
      setAiTestResponse('');
    } finally {
      setIsTestingAi(false);
    }
  };

  const handleRegenerate = async () => {
    if (!contentType || !topic || isLoading) {
      return;
    }
    
    await handleGenerate();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isLoading && contentType && topic) {
      handleGenerate();
    }
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
            {/* Error Alert */}
            {error && (
              <ErrorAlert
                type={error.type === 'validation' ? 'warning' : 'error'}
                message={error.userMessage}
                onDismiss={clearError}
                isDismissible={error.isDismissible}
              />
            )}

            {/* Content Type Dropdown */}
            <div>
              <label htmlFor="content-type" className="block text-sm font-medium text-slate-300 transition-colors duration-200 mb-2">
                Content Type
                <span className="text-rose-400 ml-1">*</span>
              </label>
              <select
                id="content-type"
                value={contentType}
                onChange={handleContentTypeChange}
                disabled={isLoading}
                className={`mt-1 block w-full rounded-lg border ${
                  validationErrors.contentType ? 'border-rose-500' : 'border-slate-600'
                } bg-slate-800 px-3 py-2.5 text-slate-100 shadow-sm transition-all duration-200 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed hover:border-slate-500`}
              >
                <option value="">Select a content type</option>
                {contentTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
              {getValidationError('contentType', validationErrors) && (
                <FieldError error={getValidationError('contentType', validationErrors)!} />
              )}
            </div>

            {/* Topic Input */}
            <div>
              <label htmlFor="topic" className="block text-sm font-medium text-slate-300 transition-colors duration-200 mb-2">
                Topic
                <span className="text-rose-400 ml-1">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="topic"
                  value={topic}
                  onChange={handleTopicChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Enter your topic here..."
                  disabled={isLoading}
                  maxLength={500}
                  className={`mt-1 block w-full rounded-lg border ${
                    validationErrors.topic ? 'border-rose-500' : 'border-slate-600'
                  } bg-slate-800 px-3 py-2.5 text-slate-100 placeholder-slate-400 shadow-sm transition-all duration-200 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed hover:border-slate-500`}
                />
                <div className="absolute right-3 bottom-2.5 text-xs text-slate-500">
                  {topic.length}/500
                </div>
              </div>
              {getValidationError('topic', validationErrors) && (
                <FieldError error={getValidationError('topic', validationErrors)!} />
              )}
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