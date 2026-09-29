import React from 'react';
import {
  Brain,
  Sliders,
  DollarSign,
  Database,
  ShieldCheck,
  Settings,
  Sparkles,
  Server,
  LayoutDashboard,
  FolderKanban,
  Building2
} from 'lucide-react';

export type TabType = 'dashboard' | 'projects' | 'optimizer' | 'sandbox' | 'ledger' | 'vendors' | 'memory' | 'demo';

interface HeaderProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  hindsightStatus: {
    isConnected: boolean;
    source: string;
    bankId: string;
    memoryCount: number;
  };
  onOpenSettings: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  hindsightStatus,
  onOpenSettings,
}) => {
  return (
    <header style={{
      backgroundColor: 'var(--bg-card)',
      borderBottom: '1px solid var(--border-subtle)',
      position: 'sticky',
      top: 0,
      zIndex: 40,
      boxShadow: 'var(--shadow-xs)'
    }}>
      <div style={{
        maxWidth: '1440px',
        margin: '0 auto',
        padding: '0.75rem 1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.85rem'
      }}>
        {/* Brand & Tagline */}
        <div
          onClick={() => setActiveTab('dashboard')}
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}
        >
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: 'var(--radius-md)',
            background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            boxShadow: '0 4px 10px rgba(79, 70, 229, 0.3)'
          }}>
            <Brain size={22} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
                BudgetMind
              </span>
              <span style={{
                fontSize: '0.65rem',
                fontWeight: 700,
                padding: '0.12rem 0.4rem',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--lavender-bg)',
                color: 'var(--lavender-text)',
                border: '1px solid var(--lavender-border)'
              }}>
                HINDSIGHT AI
              </span>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500, margin: 0 }}>
              Don't spend the budget. Optimize it.
            </p>
          </div>
        </div>

        {/* Tab Navigation - Enterprise SaaS */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'var(--bg-secondary)',
          padding: '0.25rem',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-subtle)',
          gap: '0.2rem',
          overflowX: 'auto',
          maxWidth: '100%'
        }}>
          <button
            onClick={() => setActiveTab('dashboard')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.4rem 0.75rem',
              fontSize: '0.82rem',
              fontWeight: 600,
              borderRadius: 'var(--radius-md)',
              border: 'none',
              cursor: 'pointer',
              transition: 'var(--transition-fast)',
              backgroundColor: activeTab === 'dashboard' ? 'var(--bg-card)' : 'transparent',
              color: activeTab === 'dashboard' ? 'var(--primary-brand)' : 'var(--text-secondary)',
              boxShadow: activeTab === 'dashboard' ? 'var(--shadow-xs)' : 'none',
              whiteSpace: 'nowrap'
            }}
          >
            <LayoutDashboard size={15} />
            Dashboard
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.4rem 0.75rem',
              fontSize: '0.82rem',
              fontWeight: 600,
              borderRadius: 'var(--radius-md)',
              border: 'none',
              cursor: 'pointer',
              transition: 'var(--transition-fast)',
              backgroundColor: activeTab === 'projects' ? 'var(--bg-card)' : 'transparent',
              color: activeTab === 'projects' ? 'var(--primary-brand)' : 'var(--text-secondary)',
              boxShadow: activeTab === 'projects' ? 'var(--shadow-xs)' : 'none',
              whiteSpace: 'nowrap'
            }}
          >
            <FolderKanban size={15} />
            Projects
          </button>

          <button
            onClick={() => setActiveTab('optimizer')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.4rem 0.75rem',
              fontSize: '0.82rem',
              fontWeight: 600,
              borderRadius: 'var(--radius-md)',
              border: 'none',
              cursor: 'pointer',
              transition: 'var(--transition-fast)',
              backgroundColor: activeTab === 'optimizer' ? 'var(--bg-card)' : 'transparent',
              color: activeTab === 'optimizer' ? 'var(--primary-brand)' : 'var(--text-secondary)',
              boxShadow: activeTab === 'optimizer' ? 'var(--shadow-xs)' : 'none',
              whiteSpace: 'nowrap'
            }}
          >
            <Sparkles size={15} />
            Budget Optimizer
          </button>

          <button
            onClick={() => setActiveTab('sandbox')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.4rem 0.75rem',
              fontSize: '0.82rem',
              fontWeight: 600,
              borderRadius: 'var(--radius-md)',
              border: 'none',
              cursor: 'pointer',
              transition: 'var(--transition-fast)',
              backgroundColor: activeTab === 'sandbox' ? 'var(--bg-card)' : 'transparent',
              color: activeTab === 'sandbox' ? 'var(--soft-blue-text)' : 'var(--text-secondary)',
              boxShadow: activeTab === 'sandbox' ? 'var(--shadow-xs)' : 'none',
              whiteSpace: 'nowrap'
            }}
          >
            <Sliders size={15} />
            Sandbox
          </button>

          <button
            onClick={() => setActiveTab('ledger')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.4rem 0.75rem',
              fontSize: '0.82rem',
              fontWeight: 600,
              borderRadius: 'var(--radius-md)',
              border: 'none',
              cursor: 'pointer',
              transition: 'var(--transition-fast)',
              backgroundColor: activeTab === 'ledger' ? 'var(--bg-card)' : 'transparent',
              color: activeTab === 'ledger' ? 'var(--mint-text)' : 'var(--text-secondary)',
              boxShadow: activeTab === 'ledger' ? 'var(--shadow-xs)' : 'none',
              whiteSpace: 'nowrap'
            }}
          >
            <DollarSign size={15} />
            Savings Ledger
          </button>

          <button
            onClick={() => setActiveTab('vendors')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.4rem 0.75rem',
              fontSize: '0.82rem',
              fontWeight: 600,
              borderRadius: 'var(--radius-md)',
              border: 'none',
              cursor: 'pointer',
              transition: 'var(--transition-fast)',
              backgroundColor: activeTab === 'vendors' ? 'var(--bg-card)' : 'transparent',
              color: activeTab === 'vendors' ? 'var(--soft-blue-text)' : 'var(--text-secondary)',
              boxShadow: activeTab === 'vendors' ? 'var(--shadow-xs)' : 'none',
              whiteSpace: 'nowrap'
            }}
          >
            <Building2 size={15} />
            Vendors & TCO
          </button>

          <button
            onClick={() => setActiveTab('memory')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.4rem 0.75rem',
              fontSize: '0.82rem',
              fontWeight: 600,
              borderRadius: 'var(--radius-md)',
              border: 'none',
              cursor: 'pointer',
              transition: 'var(--transition-fast)',
              backgroundColor: activeTab === 'memory' ? 'var(--bg-card)' : 'transparent',
              color: activeTab === 'memory' ? '#7C3AED' : 'var(--text-secondary)',
              boxShadow: activeTab === 'memory' ? 'var(--shadow-xs)' : 'none',
              whiteSpace: 'nowrap'
            }}
          >
            <Database size={15} />
            Memory Bank ({hindsightStatus.memoryCount})
          </button>
        </nav>

        {/* Hindsight Pill & Settings */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div
            onClick={onOpenSettings}
            title="Click to view memory configuration and API keys"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.35rem 0.75rem',
              borderRadius: 'var(--radius-full)',
              backgroundColor: hindsightStatus.isConnected ? 'var(--mint-bg)' : 'var(--purple-memory-bg)',
              border: `1px solid ${hindsightStatus.isConnected ? 'var(--mint-border)' : 'var(--purple-memory-border)'}`,
              color: hindsightStatus.isConnected ? 'var(--mint-text)' : 'var(--purple-memory)',
              fontSize: '0.75rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: hindsightStatus.isConnected ? 'var(--mint-accent)' : 'var(--purple-memory)',
              boxShadow: hindsightStatus.isConnected ? '0 0 6px rgba(16, 185, 129, 0.6)' : 'none'
            }} />
            <span>
              {hindsightStatus.isConnected ? 'Hindsight Live Connected' : 'Hindsight: Local Bank'}
            </span>
          </div>

          <button
            onClick={onOpenSettings}
            title="API Keys & Settings"
            style={{
              padding: '0.5rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
              backgroundColor: 'var(--bg-card)',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'var(--transition-fast)'
            }}
          >
            <Settings size={18} />
          </button>
        </div>
      </div>
    </header>
  );
};
