import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AuthGuard } from './components/auth/AuthGuard';
import { AppLayout } from './components/AppLayout';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { OnboardingPage } from './pages/OnboardingPage';
import { DashboardPage } from './pages/DashboardPage';
import { BudgetsPage } from './pages/BudgetsPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { ProcurementPage } from './pages/ProcurementPage';
import { VendorsPage } from './pages/VendorsPage';
import { MemoryPage } from './pages/MemoryPage';
import { SandboxPage } from './pages/SandboxPage';
import { SavingsPage } from './pages/SavingsPage';
import { InsightsPage } from './pages/InsightsPage';
import { SettingsPage } from './pages/SettingsPage';
import { KillerDemoView } from './components/KillerDemoView';

export function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Marketing & Authentication Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />

          {/* Protected Application Workspace Routes (Guarded by AuthGuard) */}
          <Route element={<AuthGuard><AppLayout /></AuthGuard>}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/budgets" element={<BudgetsPage />} />
            <Route path="/budgets/:id" element={<BudgetsPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:id" element={<ProjectDetailPage />} />
            <Route path="/procurement" element={<ProcurementPage />} />
            <Route path="/procurement/:id" element={<ProcurementPage />} />
            <Route path="/vendors" element={<VendorsPage />} />
            <Route path="/vendors/:id" element={<VendorsPage />} />
            <Route path="/memory" element={<MemoryPage />} />
            <Route path="/memory/:id" element={<MemoryPage />} />
            <Route path="/sandbox" element={<SandboxPage />} />
            <Route path="/savings" element={<SavingsPage />} />
            <Route path="/insights" element={<InsightsPage />} />
            <Route path="/settings" element={<SettingsPage />} />

            {/* Internal hidden test route for 11-scene verification */}
            <Route path="/demo" element={<KillerDemoView />} />
          </Route>

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
