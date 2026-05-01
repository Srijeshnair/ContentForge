import OpenAI from 'openai';
import { requireAiApiKey, getAiProvider } from './aiConfig.js';

const openai = new OpenAI({
  apiKey: requireAiApiKey(),
});

const MODEL = 'gpt-4o-mini';
const MAX_TOKENS = 1000;
const TEMPERATURE = 0.7;

/**
 * Generate content using OpenAI GPT-4o-mini
 * @param {string} contentType - Type of content (linkedin-post, caption, email)
 * @param {string} topic - The topic to generate content about
 * @returns {Promise<string>} Generated content
 */
export async function generateContentWithAI(contentType, topic) {
  const provider = getAiProvider();
  if (provider !== 'openai') {
    throw new Error('Only OpenAI is currently supported. Set OPENAI_API_KEY in your environment.');
  }

  const contentTypeLabels = {
    'linkedin-post': 'LinkedIn post',
    'caption': 'social media caption',
    'email': 'email',
  };

  const humanType = contentTypeLabels[contentType] || 'content';

  const prompt = `Write a professional ${humanType} about "${topic}".

Requirements:
- Keep it concise and engaging
- Use appropriate tone for the content type
- Include relevant details and insights
- Make it actionable and valuable

${humanType.charAt(0).toUpperCase() + humanType.slice(1)}:`;

  try {
    const completion = await openai.chat.completions.create({
      model: MODEL,
      messages: [
        {
          role: 'system',
          content: 'You are a professional content writer who creates high-quality, engaging content for various platforms. Always provide valuable, well-structured content that resonates with the target audience.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      max_tokens: MAX_TOKENS,
      temperature: TEMPERATURE,
    });

    const generatedContent = completion.choices[0]?.message?.content?.trim();

    if (!generatedContent) {
      throw new Error('No content generated from AI');
    }

    return generatedContent;
  } catch (error) {
    console.error('AI generation error:', error);
    throw new Error('Failed to generate content with AI. Please try again.');
  }
}

/**
 * Test the AI integration with a simple prompt
 * @param {string} testInput - Test input to send to the AI
 * @returns {Promise<string>} AI response
 */
export async function testAIPrompt(testInput = 'Hello, can you introduce yourself?') {
  const provider = getAiProvider();
  if (provider !== 'openai') {
    throw new Error('Only OpenAI is currently supported. Set OPENAI_API_KEY in your environment.');
  }

  try {
    const completion = await openai.chat.completions.create({
      model: MODEL,
      messages: [
        {
          role: 'user',
          content: testInput,
        },
      ],
      max_tokens: 200,
      temperature: 0.5,
    });

    const response = completion.choices[0]?.message?.content?.trim();

    if (!response) {
      throw new Error('No response from AI');
    }

    return response;
  } catch (error) {
    console.error('AI test error:', error);
    throw new Error('AI test failed. Please check your API key and try again.');
  }
}
