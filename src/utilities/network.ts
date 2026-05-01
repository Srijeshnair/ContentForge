export class ApiError extends Error {
  status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

const DEFAULT_TIMEOUT = 30000; // 30 seconds
const DEFAULT_RETRY_ATTEMPTS = 1;
const RETRY_DELAY_MS = 1000;

function createTimeoutController(timeoutMs: number) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  (controller as any)._timeoutId = timeoutId;
  return controller;
}

function clearTimeoutController(controller: AbortController & { _timeoutId?: number }) {
  if (controller._timeoutId) {
    clearTimeout(controller._timeoutId);
  }
}

async function parseResponse<T>(response: Response): Promise<T> {
  const contentType = response.headers.get('content-type') ?? '';
  const payload = await response.text();

  let parsedResponse: unknown = payload;
  if (contentType.includes('application/json')) {
    try {
      parsedResponse = JSON.parse(payload);
    } catch {
      parsedResponse = payload;
    }
  }

  if (!response.ok) {
    const message =
      typeof parsedResponse === 'object' && parsedResponse !== null && 'error' in (parsedResponse as any)
        ? String((parsedResponse as any).error)
        : `Request failed with status ${response.status}`;

    throw new ApiError(message, response.status);
  }

  return parsedResponse as T;
}

export async function fetchWithRetry<T>(
  url: string,
  options: RequestInit = {},
  timeoutMs = DEFAULT_TIMEOUT,
  attempts = DEFAULT_RETRY_ATTEMPTS
): Promise<T> {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= attempts; attempt++) {
    const controller = createTimeoutController(timeoutMs);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });
      clearTimeoutController(controller);
      return await parseResponse<T>(response);
    } catch (error) {
      clearTimeoutController(controller);
      lastError = error instanceof Error ? error : new Error(String(error));

      const status = (error as any)?.status;
      if (status && status >= 400 && status < 500) {
        throw lastError;
      }

      if (error instanceof Error && error.name === 'AbortError') {
        throw lastError;
      }

      if (attempt < attempts) {
        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS * (attempt + 1)));
        continue;
      }
    }
  }

  throw lastError || new Error('Request failed');
}

export async function fetchJson<T>(url: string): Promise<T> {
  return fetchWithRetry<T>(url, {
    headers: {
      'Accept': 'application/json',
    },
  });
}

export async function postJson<T, BodyType = unknown>(url: string, body: BodyType): Promise<T> {
  return fetchWithRetry<T>(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(body),
  });
}
