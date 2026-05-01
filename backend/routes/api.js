// API Routes
// This file can be expanded with specific route handlers

import express from 'express';
import { getAiApiKey } from '../services/aiConfig.js';
import { generateContentWithAI, testAIPrompt } from '../services/aiService.js';

const router = express.Router();

// Validation constants
const TOPIC_MIN_LENGTH = 2;
const TOPIC_MAX_LENGTH = 500;

// Supported content types
const SUPPORTED_TYPES = {
  'linkedin-post': 'LinkedIn post',
  'caption': 'Caption',
  'email': 'Email',
};

/**
 * Validates the generate request
 * @param {Object} body - Request body
 * @returns {Object} { isValid: boolean, error?: string }
 */
function validateGenerateRequest(body) {
  const { contentType, topic } = body;

  // Check required fields
  if (!contentType || !contentType.trim()) {
    return { isValid: false, error: 'Content type is required.' };
  }

  if (!topic || !topic.trim()) {
    return { isValid: false, error: 'Topic is required.' };
  }

  // Validate content type
  if (!SUPPORTED_TYPES[contentType]) {
    return { isValid: false, error: `Invalid content type. Supported types: ${Object.keys(SUPPORTED_TYPES).join(', ')}` };
  }

  // Validate topic length
  const trimmedTopic = topic.trim();
  if (trimmedTopic.length < TOPIC_MIN_LENGTH) {
    return { isValid: false, error: `Topic must be at least ${TOPIC_MIN_LENGTH} characters.` };
  }

  if (trimmedTopic.length > TOPIC_MAX_LENGTH) {
    return { isValid: false, error: `Topic must not exceed ${TOPIC_MAX_LENGTH} characters.` };
  }

  return { isValid: true };
}

// Example route - can be removed or modified
router.get('/test', (req, res) => {
  res.json({ message: 'API test route working!' });
});

/**
 * Test AI integration
 * POST /api/test-ai
 *
 * Request body:
 * {
 *   prompt?: string (optional test prompt)
 * }
 *
 * Response:
 * {
 *   success: boolean,
 *   response: string,
 *   provider: string
 * }
 */
router.post('/test-ai', async (req, res) => {
  const apiKey = getAiApiKey();
  if (!apiKey) {
    return res.status(500).json({
      success: false,
      error: 'Missing API key. Set OPENAI_API_KEY or GEMINI_API_KEY in your environment configuration.',
    });
  }

  try {
    const { prompt } = req.body;
    const testInput = prompt || 'Hello! Please introduce yourself briefly.';

    const aiResponse = await testAIPrompt(testInput);

    res.json({
      success: true,
      response: aiResponse,
      provider: 'openai',
      model: 'gpt-4o-mini',
    });
  } catch (error) {
    console.error('AI test endpoint error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'AI test failed. Please check your API key and try again.',
    });
  }
});

/**
 * Generate content from user input
 * POST /api/generate
 * 
 * Request body:
 * {
 *   contentType: string ('linkedin-post' | 'caption' | 'email')
 *   topic: string (2-500 characters)
 * }
 * 
 * Response:
 * {
 *   generatedContent: string
 * }
 */
router.post('/generate', async (req, res) => {
  const apiKey = getAiApiKey();
  if (!apiKey) {
    return res.status(500).json({
      error: 'Missing API key. Set OPENAI_API_KEY or GEMINI_API_KEY in your environment configuration.',
    });
  }

  try {
    // Validate request
    const validation = validateGenerateRequest(req.body);
    if (!validation.isValid) {
      return res.status(400).json({ error: validation.error });
    }

    const { contentType, topic } = req.body;
    const humanType = SUPPORTED_TYPES[contentType] || 'Content';

    // Generate content using AI
    const generatedContent = await generateContentWithAI(contentType, topic);

    res.json({ generatedContent });
  } catch (error) {
    // Log error for debugging
    console.error('Generate endpoint error:', error);
    
    // Return generic error to client
    res.status(500).json({ error: 'An error occurred while generating content. Please try again.' });
  }
});

// Add more routes here as needed
// router.get('/history', getHistory);

export default router;