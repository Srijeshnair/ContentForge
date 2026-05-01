import { postJson } from '../utilities/network';

export type GenerateRequest = {
  contentType: string;
  topic: string;
};

export type GenerateResponse = {
  generatedContent: string;
};

const MAX_TOPIC_LENGTH = 500;

export function normalizeGenerateRequest(request: GenerateRequest): GenerateRequest {
  return {
    contentType: request.contentType.trim(),
    topic: request.topic.trim(),
  };
}

export async function generateContent(request: GenerateRequest): Promise<GenerateResponse> {
  const normalizedRequest = normalizeGenerateRequest(request);

  if (!normalizedRequest.contentType) {
    throw new Error('Validation Error: Content type is required');
  }

  if (!normalizedRequest.topic) {
    throw new Error('Validation Error: Topic is required');
  }

  if (normalizedRequest.topic.length > MAX_TOPIC_LENGTH) {
    throw new Error('Validation Error: Topic must not exceed 500 characters');
  }

  return postJson<GenerateResponse, GenerateRequest>('/api/generate', normalizedRequest);
}
