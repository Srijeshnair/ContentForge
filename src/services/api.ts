export async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json() as Promise<T>;
}

type GenerateRequest = {
  contentType: string;
  topic: string;
};

type GenerateResponse = {
  generatedContent: string;
};

export async function generateContent(request: GenerateRequest): Promise<GenerateResponse> {
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    const message = errorData?.error || `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  return response.json() as Promise<GenerateResponse>;
}
