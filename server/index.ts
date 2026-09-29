import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import agentRoutes from './routes/agentRoutes';
import hindsightRoutes from './routes/hindsightRoutes';
import budgetRoutes from './routes/budgetRoutes';
import demoRoutes from './routes/demoRoutes';
import authRoutes from './routes/authRoutes';
import { hindsightService } from './services/hindsightService';
import { dbRepository } from './data/dbRepository';
import { llmService } from './services/llmService';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Request logger
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    if (!req.url.includes('/api/health')) {
      console.log(`[API] ${req.method} ${req.url} ${res.statusCode} (${duration}ms)`);
    }
  });
  next();
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/agent', agentRoutes);
app.use('/api/hindsight', hindsightRoutes);
app.use('/api', budgetRoutes);
app.use('/api/demo', demoRoutes);

// Health Endpoints
app.get('/api/health', async (req, res) => {
  const dbHealth = await dbRepository.getHealth();
  const hsHealth = hindsightService.getStatus();
  const llmHealth = llmService.getStatus();

  res.json({
    status: 'healthy',
    service: 'BudgetMind Financial Intelligence Platform',
    timestamp: new Date().toISOString(),
    database: dbHealth,
    hindsight: hsHealth,
    llm: llmHealth,
    agent: {
      framework: 'LangGraph (Stateful Workflow)',
      abstraction: 'LangChain Tools & Prompts',
      sourceOfTruth: 'Deterministic Financial Engine',
    },
  });
});

app.get('/api/health/database', async (req, res) => {
  const health = await dbRepository.getHealth();
  res.json({ success: true, data: health });
});

app.get('/api/health/hindsight', async (req, res) => {
  const health = await hindsightService.checkHealth();
  res.json({ success: true, data: health });
});

app.get('/api/health/llm', (req, res) => {
  const health = llmService.getStatus();
  res.json({ success: true, data: health });
});

app.listen(PORT, () => {
  console.log(`\n============================================================`);
  console.log(`🚀 BudgetMind Master Backend running on http://localhost:${PORT}`);
  console.log(`🧠 LangGraph Agent Orchestrator initialized`);
  console.log(`💾 Database: ${dbRepository.getHealth().then(h => h.provider)}`);
  console.log(`============================================================\n`);
});

export default app;
