// API Routes
// This file can be expanded with specific route handlers

import express from 'express';
const router = express.Router();

// Example route - can be removed or modified
router.get('/test', (req, res) => {
  res.json({ message: 'API test route working!' });
});

// Generate content from user input
router.post('/generate', (req, res) => {
  const { contentType, topic } = req.body;

  if (!contentType || !topic) {
    return res.status(400).json({ error: 'contentType and topic are required.' });
  }

  const labels = {
    'linkedin-post': 'LinkedIn post',
    caption: 'Caption',
    email: 'Email',
  };

  const humanType = labels[contentType] || 'Content';
  const generatedContent = `Here is a polished ${humanType.toLowerCase()} about "${topic}":\n\n` +
    `Hi there! If you want to connect with your audience on ${topic}, try sharing a thoughtful, value-driven message that highlights your perspective and invites conversation. ` +
    `Use a strong opening, keep the tone warm and confident, and wrap up with a clear call to action to keep readers engaged.`;

  return res.json({ generatedContent });
});

// Add more routes here as needed
// router.get('/history', getHistory);

export default router;