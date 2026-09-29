import app from './app';
import { dbRepository } from './data/dbRepository';

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`\n============================================================`);
  console.log(`🚀 BudgetMind Master Backend running on http://localhost:${PORT}`);
  console.log(`🧠 LangGraph Agent Orchestrator initialized`);
  console.log(`💾 Database: ${dbRepository.getHealth().then(h => h.provider)}`);
  console.log(`============================================================\n`);
});

