const DEFAULT_TIMEOUT = 30000; // 30 seconds
const RETRY_ATTEMPTS = 1;
const RETRY_DELAY = 1000; // 1 second

/**
 * Creates an AbortSignal with a timeout
 */
function createTimeoutSignal(timeoutMs: number): AbortSignal {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  
  // Store timeout ID to clear it if request completes
  (controller as any)._timeoutId = timeoutId;
  
  return controller.signal;
}

/**
 * Clears timeout from an AbortController
 */
function clearTimeoutSignal(controller: any): void {
  if (controller._timeoutId) {
    clearTimeout(controller._timeoutId);
  }
}

/**
 * Retries a fetch request with exponential backoff
 */
async function fetchWithRetry<T>(
  url: string,
  options: RequestInit = {},
  timeoutMs: number = DEFAULT_TIMEOUT,
  attempts: number = RETRY_ATTEMPTS
): Promise<T> {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= attempts; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

      try {
        const response = await fetch(url, {
          ...options,
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          const contentType = response.headers.get('content-type');
          let errorMessage = `Request failed with status ${response.status}`;

          // Try to parse JSON error response
          if (contentType?.includes('application/json')) {
            try {
              const errorData = await response.json();
              if (errorData?.error) {
                errorMessage = errorData.error;
              }
            } catch {
              // Continue with default error message
            }
          }

          const error = new Error(errorMessage);
          (error as any).status = response.status;
          throw error;
        }

        const data = await response.json() as T;
        return data;
      } catch (error) {
        clearTimeout(timeoutId);
        throw error;
      }
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));

      // Don't retry on validation errors or client errors (4xx)
      const status = (error as any)?.status;
      if (status && status >= 400 && status < 500) {
        throw lastError;
      }

      // Don't retry on the last attempt
      if (attempt < attempts) {
        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY * (attempt + 1)));
        continue;
      }
    }
  }

  throw lastError || new Error('Request failed');
}

export async function fetchJson<T>(url: string): Promise<T> {
  return fetchWithRetry<T>(url);
}

export type GenerateRequest = {
  contentType: string;
  topic: string;
};

export type GenerateResponse = {
  generatedContent: string;
};

/**
 * Generates content using the API
 * @throws {Error} With descriptive message on failure
 */
export async function generateContent(request: GenerateRequest): Promise<GenerateResponse> {
  // Basic validation
  if (!request.contentType?.trim()) {
    throw new Error('Validation Error: Content type is required');
  }
  if (!request.topic?.trim()) {
    throw new Error('Validation Error: Topic is required');
  }
  if (request.topic.trim().length > 500) {
    throw new Error('Validation Error: Topic must not exceed 500 characters');
  }

  try {
    return await fetchWithRetry<GenerateResponse>(
      '/api/generate',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      },
      DEFAULT_TIMEOUT
    );
  } catch (error) {
    if (error instanceof Error) {
      // Handle timeout errors
      if (error.name === 'AbortError') {
        throw new Error('Request timeout: The server took too long to respond. Please try again.');
      }

      // Handle network errors
      if (error.message.includes('fetch') || error.message.includes('Failed to fetch')) {
        throw new Error('Network error: Unable to connect to the server. Please check your internet connection.');
      }

      throw error;
    }

    throw new Error('An unexpected error occurred. Please try again.');
  }
}
