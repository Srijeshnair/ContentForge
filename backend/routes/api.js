// API Routes
// This file can be expanded with specific route handlers

import express from 'express';
const router = express.Router();

// Example route - can be removed or modified
router.get('/test', (req, res) => {
  res.json({ message: 'API test route working!' });
});

// Add more routes here as needed
// router.post('/generate', generateContent);
// router.get('/history', getHistory);

export default router;