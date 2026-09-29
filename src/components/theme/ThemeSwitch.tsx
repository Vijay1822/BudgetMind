import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const ThemeSwitch: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const { theme, toggleTheme } = useAuth();
  const isLight = theme === 'light';

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.96 }}
      aria-label={`Switch to ${isLight ? 'Dark' : 'Light'} Mode`}
      title={`Switch to ${isLight ? 'Dark' : 'Light'} Mode`}
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        gap: compact ? '0' : '0.65rem',
        padding: compact ? '0.45rem' : '0.45rem 0.85rem',
        borderRadius: 'var(--radius-full)',
        backgroundColor: isLight ? 'rgba(255, 199, 199, 0.35)' : 'rgba(214, 214, 214, 0.12)',
        border: `1.5px solid ${isLight ? '#FFC7C7' : 'rgba(245, 143, 124, 0.35)'}`,
        cursor: 'pointer',
        color: 'var(--text-primary)',
        overflow: 'hidden',
        transition: 'background-color 0.4s ease, border-color 0.4s ease',
        boxShadow: isLight 
          ? '0 2px 8px rgba(255, 143, 124, 0.15)' 
          : '0 2px 8px rgba(0, 0, 0, 0.3)',
      }}
    >
      {/* Background Sunrise/Sunset aura expansion */}
      <AnimatePresence mode="wait">
        <motion.div
          key={theme}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'absolute',
            inset: 0,
            background: isLight
              ? 'radial-gradient(circle at 30% 50%, rgba(255, 199, 199, 0.7) 0%, rgba(255, 143, 124, 0.15) 100%)'
              : 'radial-gradient(circle at 70% 50%, rgba(245, 143, 124, 0.25) 0%, rgba(44, 43, 48, 0.4) 100%)',
            pointerEvents: 'none',
          }}
        />
      </AnimatePresence>

      {/* Sun / Moon Animated Glyphs */}
      <div style={{ position: 'relative', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <AnimatePresence mode="wait" initial={false}>
          {isLight ? (
            <motion.div
              key="sun"
              initial={{ y: 14, opacity: 0, rotate: -45, scale: 0.6 }}
              animate={{ y: 0, opacity: 1, rotate: 0, scale: 1 }}
              exit={{ y: -14, opacity: 0, rotate: 45, scale: 0.6 }}
              transition={{ duration: 0.55, ease: [0.34, 1.56, 0.64, 1] }}
              style={{ position: 'absolute', color: '#FF8F7C' }}
            >
              <Sun size={19} strokeWidth={2.4} />
            </motion.div>
          ) : (
            <motion.div
              key="moon"
              initial={{ y: -14, opacity: 0, rotate: 45, scale: 0.6 }}
              animate={{ y: 0, opacity: 1, rotate: 0, scale: 1 }}
              exit={{ y: 14, opacity: 0, rotate: -45, scale: 0.6 }}
              transition={{ duration: 0.55, ease: [0.34, 1.56, 0.64, 1] }}
              style={{ position: 'absolute', color: '#F58F7C' }}
            >
              <Moon size={19} strokeWidth={2.4} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {!compact && (
        <span style={{
          position: 'relative',
          fontSize: '0.78rem',
          fontWeight: 700,
          letterSpacing: '0.02em',
          color: isLight ? '#4A5568' : '#D6D6D6',
          userSelect: 'none',
        }}>
          {isLight ? 'Sunrise Mode' : 'Sunset Mode'}
        </span>
      )}
    </motion.button>
  );
};
