const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export function getAiApiKey() {
  return OPENAI_API_KEY || GEMINI_API_KEY || null;
}

export function getAiProvider() {
  if (OPENAI_API_KEY) return 'openai';
  if (GEMINI_API_KEY) return 'gemini';
  return null;
}

export function requireAiApiKey() {
  const apiKey = getAiApiKey();
  if (!apiKey) {
    throw new Error('Missing API key. Set OPENAI_API_KEY or GEMINI_API_KEY.');
  }
  return apiKey;
}
