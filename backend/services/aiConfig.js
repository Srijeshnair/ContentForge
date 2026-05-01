export function getAiApiKey() {
  return process.env.OPENAI_API_KEY || process.env.GEMINI_API_KEY || null;
}

export function getAiProvider() {
  if (process.env.OPENAI_API_KEY) return 'openai';
  if (process.env.GEMINI_API_KEY) return 'gemini';
  return null;
}

export function requireAiApiKey() {
  const apiKey = getAiApiKey();
  if (!apiKey) {
    throw new Error('Missing API key. Set OPENAI_API_KEY or GEMINI_API_KEY.');
  }
  return apiKey;
}
