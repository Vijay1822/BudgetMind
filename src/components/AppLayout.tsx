import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  Brain,
  LayoutDashboard,
  Sparkles,
  FolderKanban,
  ShoppingBag,
  Building2,
  Database,
  Sliders,
  DollarSign,
  TrendingUp,
  Settings,
  Bell,
  Search,
  LogOut,
  ChevronDown,
  ShieldCheck,
  CheckCircle2,
  Menu,
  X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ThemeSwitch } from './theme/ThemeSwitch';

export const AppLayout: React.FC = () => {
  const { user, logout, theme } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hindsightStatus, setHindsightStatus] = useState({
    isConnected: true,
    source: 'HINDSIGHT_LIVE',
    memoryCount: 4,
  });

  useEffect(() => {
    fetch('/api/hindsight/status')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setHindsightStatus(data.data);
        }
      })
      .catch(() => {});
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    {
      category: 'WORKSPACE',
      links: [
        { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { to: '/budgets', label: 'Budget Optimizer', icon: Sparkles },
        { to: '/projects', label: 'Projects', icon: FolderKanban },
        { to: '/procurement', label: 'Procurement', icon: ShoppingBag },
        { to: '/vendors', label: 'Vendors & TCO', icon: Building2 },
      ]
    },
    {
      category: 'INTELLIGENCE',
      links: [
        { to: '/savings', label: 'Savings Ledger', icon: DollarSign },
        { to: '/memory', label: 'Hindsight Memory', icon: Database, badge: hindsightStatus.memoryCount },
        { to: '/sandbox', label: 'Optimization Sandbox', icon: Sliders },
        { to: '/insights', label: 'Insights & Analytics', icon: TrendingUp },
      ]
    },
    {
      category: 'SYSTEM',
      links: [
        { to: '/settings', label: 'Settings & Integrations', icon: Settings },
      ]
    }
  ];

  const isLight = theme === 'light';

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--background)' }}>
      {/* Sidebar for Desktop */}
      <aside style={{
        width: '260px',
        backgroundColor: 'var(--sidebar-bg)',
        borderRight: '1px solid var(--sidebar-border)',
        display: 'flex',
        flexDirection: 'column',
        position: 'sticky',
        top: 0,
        height: '100vh',
        zIndex: 50,
        boxShadow: 'var(--shadow-sm)',
        transition: 'background-color 0.4s ease, border-color 0.4s ease',
      }}>
        {/* Brand Header */}
        <div
          onClick={() => navigate('/dashboard')}
          style={{
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid var(--sidebar-border)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            cursor: 'pointer'
          }}
        >
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            backgroundColor: isLight ? '#FFC7C7' : '#F58F7C',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: isLight ? '#FF8F7C' : '#2C2B30',
            boxShadow: 'var(--shadow-xs)'
          }}>
            <Brain size={22} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <span style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--sidebar-text)', letterSpacing: '-0.02em' }}>
                BudgetMind
              </span>
              <span style={{
                fontSize: '0.62rem',
                fontWeight: 800,
                padding: '0.1rem 0.35rem',
                borderRadius: 'var(--radius-full)',
                backgroundColor: isLight ? 'rgba(255, 143, 124, 0.15)' : 'rgba(245, 143, 124, 0.25)',
                color: isLight ? '#FF8F7C' : '#F58F7C',
              }}>
                AI
              </span>
            </div>
            <p style={{ fontSize: '0.7rem', color: isLight ? '#667085' : '#9E9EA2', margin: 0, fontWeight: 500 }}>
              Don't spend. Optimize it.
            </p>
          </div>
        </div>

        {/* Organization Card */}
        <div style={{
          padding: '0.85rem 1.15rem',
          margin: '0.75rem 0.85rem',
          backgroundColor: isLight ? '#E6E9EE' : 'var(--sidebar-surface)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--sidebar-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ fontSize: '0.65rem', fontWeight: 700, color: isLight ? '#667085' : '#9E9EA2', textTransform: 'uppercase' }}>
              Organization
            </div>
            <div style={{ fontSize: '0.82rem', fontWeight: 800, color: isLight ? '#4A5568' : '#FFFFFF', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '160px' }}>
              {user?.organization || 'Apex Global Enterprises'}
            </div>
          </div>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--success)' }} />
        </div>

        {/* Navigation Sections */}
        <nav style={{ flex: 1, overflowY: 'auto', padding: '0.5rem 0.85rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {navItems.map((group, gIdx) => (
            <div key={gIdx}>
              <div style={{
                fontSize: '0.65rem',
                fontWeight: 800,
                color: isLight ? '#667085' : '#9E9EA2',
                letterSpacing: '0.06em',
                padding: '0 0.65rem 0.45rem',
                textTransform: 'uppercase'
              }}>
                {group.category}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                {group.links.map((link) => {
                  const Icon = link.icon;
                  const isActive = location.pathname === link.to || (link.to !== '/dashboard' && location.pathname.startsWith(link.to));

                  return (
                    <NavLink
                      key={link.to}
                      to={link.to}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.55rem 0.75rem',
                        borderRadius: 'var(--radius-md)',
                        fontSize: '0.82rem',
                        fontWeight: isActive ? 800 : 500,
                        textDecoration: 'none',
                        color: isActive 
                          ? (isLight ? '#4A5568' : '#FFFFFF') 
                          : (isLight ? '#4A5568' : 'var(--sidebar-text)'),
                        backgroundColor: isActive 
                          ? (isLight ? '#FFC7C7' : 'var(--sidebar-surface)') 
                          : 'transparent',
                        borderLeft: isActive && !isLight ? '3px solid #F58F7C' : 'none',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                        <Icon size={16} color={isActive ? (isLight ? '#FF8F7C' : '#F58F7C') : (isLight ? '#4A5568' : 'currentColor')} />
                        <span>{link.label}</span>
                      </div>
                      {link.badge !== undefined && (
                        <span style={{
                          fontSize: '0.68rem',
                          fontWeight: 800,
                          padding: '0.1rem 0.4rem',
                          borderRadius: 'var(--radius-full)',
                          backgroundColor: isActive ? (isLight ? '#FF8F7C' : '#F58F7C') : (isLight ? '#E6E9EE' : 'rgba(0,0,0,0.2)'),
                          color: isActive ? '#FFFFFF' : (isLight ? '#4A5568' : 'inherit')
                        }}>
                          {link.badge}
                        </span>
                      )}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Sidebar Theme Switch */}
        <div style={{ padding: '0.75rem 1rem', borderTop: '1px solid var(--sidebar-border)' }}>
          <ThemeSwitch />
        </div>

        {/* User Card & Logout */}
        <div style={{
          padding: '0.85rem 1.15rem',
          borderTop: '1px solid var(--sidebar-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: isLight ? '#FFFFFF' : 'var(--sidebar-surface)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: isLight ? '#FFC7C7' : '#F58F7C',
              color: isLight ? '#FF8F7C' : '#2C2B30',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '0.85rem'
            }}>
              {user?.full_name ? user.full_name[0] : 'A'}
            </div>
            <div style={{ overflow: 'hidden' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: isLight ? '#4A5568' : '#FFFFFF', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                {user?.full_name || 'Alex Rivera'}
              </div>
              <div style={{ fontSize: '0.68rem', color: isLight ? '#667085' : '#9E9EA2' }}>
                {user?.role || 'Finance Director'}
              </div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            title="Log Out"
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: isLight ? '#4A5568' : '#9E9EA2',
              padding: '0.35rem',
              borderRadius: 'var(--radius-sm)'
            }}
          >
            <LogOut size={16} />
          </button>
        </div>
      </aside>

      {/* Main App Content Viewport */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Top Navbar */}
        <header style={{
          height: '64px',
          borderBottom: '1px solid var(--border-medium)',
          backgroundColor: 'var(--surface)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 1.75rem',
          position: 'sticky',
          top: 0,
          zIndex: 40,
          transition: 'background-color 0.4s ease, border-color 0.4s ease'
        }}>
          {/* Search Bar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            backgroundColor: 'var(--surface-secondary)',
            padding: '0.45rem 0.85rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)',
            width: '320px'
          }}>
            <Search size={15} color="var(--text-muted)" />
            <input
              type="text"
              placeholder="Search budgets, vendors, memories..."
              style={{
                background: 'transparent',
                border: 'none',
                outline: 'none',
                fontSize: '0.82rem',
                color: 'var(--text-primary)',
                width: '100%'
              }}
            />
          </div>

          {/* Right Header Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            {/* System Status Pill */}
            <div
              onClick={() => navigate('/settings')}
              title="System Integrations Status"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.35rem 0.75rem',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--mint-bg)',
                border: '1px solid var(--mint-border)',
                color: 'var(--mint-text)',
                fontSize: '0.72rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              <div style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                backgroundColor: 'var(--success)'
              }} />
              <span>
                {hindsightStatus.isConnected ? 'Hindsight Live Bank' : 'Memory Bank Active'}
              </span>
            </div>

            {/* Sunrise / Sunset Theme Switch */}
            <ThemeSwitch />

            {/* Notification Bell */}
            <button
              title="Notifications"
              style={{
                padding: '0.45rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--surface-elevated)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
              }}
            >
              <Bell size={17} />
              <div style={{
                position: 'absolute',
                top: '5px',
                right: '5px',
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: 'var(--accent)'
              }} />
            </button>
          </div>
        </header>

        {/* Dynamic Route Content */}
        <main style={{ flex: 1, padding: '1.75rem', overflowY: 'auto' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};
