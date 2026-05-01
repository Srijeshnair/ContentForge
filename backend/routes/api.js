// API Routes
// This file can be expanded with specific route handlers

import express from 'express';
import { getAiApiKey } from '../services/aiConfig.js';

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
router.post('/generate', (req, res) => {
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
    
    // Simulate content generation
    // In production, this would call an AI API
    const generatedContent = `Here is a polished ${humanType.toLowerCase()} about "${topic}":\n\n` +
      `Hi there! If you want to connect with your audience on ${topic}, try sharing a thoughtful, value-driven message that highlights your perspective and invites conversation. ` +
      `Use a strong opening, keep the tone warm and confident, and wrap up with a clear call to action to keep readers engaged.`;

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