import { Router } from 'express';
import { hindsightService } from '../services/hindsightService';
import { orgStore } from '../data/organizationStore';

const router = Router();

// GET /api/hindsight/status
router.get('/status', async (req, res) => {
  try {
    const status = await hindsightService.checkHealth();
    res.json({
      success: true,
      data: status,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

// GET /api/hindsight/memories
router.get('/memories', (req, res) => {
  const memories = orgStore.getMemoryLessons();
  res.json({
    success: true,
    count: memories.length,
    data: memories,
  });
});

// POST /api/hindsight/retain
router.post('/retain', async (req, res) => {
  try {
    const { content, category, sourceProject, quantitativeImpact, financialRule, tags } = req.body;
    if (!content) {
      return res.status(400).json({ error: 'content string is required for memory retention' });
    }

    const result = await hindsightService.retain(content, {
      category,
      sourceProject,
      quantitativeImpact,
      financialRule,
      tags,
    });

    res.json({
      success: true,
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

// POST /api/hindsight/recall
router.post('/recall', async (req, res) => {
  try {
    const { query, category, limit } = req.body;
    if (!query) {
      return res.status(400).json({ error: 'query string is required for memory recall' });
    }

    const result = await hindsightService.recall(query, { category, limit });
    res.json({
      success: true,
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

// POST /api/hindsight/config
router.post('/config', (req, res) => {
  const { apiKey, baseUrl, bankId } = req.body;
  hindsightService.updateCredentials({ apiKey, baseUrl, bankId });
  const status = hindsightService.getStatus();
  res.json({
    success: true,
    message: 'Hindsight configuration updated successfully.',
    data: status,
  });
});

export default router;
