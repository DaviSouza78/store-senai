import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ChevronLeft, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface HeaderProps {
  showBack?: boolean;
  onBack?: () => void;
  subtitle?: string;
  onCartClick?: () => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  activeNav?: string;
  onNavChange?: (navId: string) => void;
}

const navLinks = [
  { id: 'games', label: 'JOGOS' },
  { id: 'integrantes', label: 'INTEGRANTES' },
];

export default function Header({ showBack, onBack, subtitle, onCartClick, searchQuery = '', onSearchChange, activeNav = 'games', onNavChange }: HeaderProps) {
  const activeLink = activeNav;
  const [searchFocused, setSearchFocused] = useState(false);
  const { totalItems } = useCart();

  return (
    <header className="h-16 bg-lego-dark/80 backdrop-blur-xl border-b border-lego-border/20 flex items-center px-6 sticky top-0 z-40">
      {/* Site name / Logo */}
      <motion.div
        className="flex items-center gap-2 mr-6 cursor-pointer select-none"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        <span className="text-neon-teal font-bold text-xl font-[var(--font-family-display)] tracking-wider neon-text-glow">
          SENAI
        </span>
        <span className="text-text-primary font-semibold text-xl font-[var(--font-family-display)] tracking-wider">
          JOGOS
        </span>
      </motion.div>

      {/* Back button */}
      {showBack && (
        <motion.button
          onClick={onBack}
          className="mr-4 w-9 h-9 rounded-lg bg-lego-surface/60 border border-lego-border/30 flex items-center justify-center text-text-secondary hover:text-neon-teal hover:border-neon-teal/30 transition-colors cursor-pointer"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronLeft size={18} />
        </motion.button>
      )}

      {/* Subtitle for collection view */}
      {subtitle && (
        <motion.h2
          className="text-sm font-semibold text-neon-teal tracking-widest uppercase mr-8 font-[var(--font-family-display)]"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          {subtitle}
        </motion.h2>
      )}

      {/* Navigation links */}
      <nav className="flex items-center gap-1">
        {navLinks.map((link) => {
          const isActive = activeLink === link.id;
          return (
            <motion.button
              key={link.id}
              onClick={() => onNavChange?.(link.id)}
              className={`relative px-4 py-2 text-xs font-semibold tracking-[0.15em] transition-colors cursor-pointer ${
                isActive ? 'text-neon-teal' : 'text-text-muted hover:text-text-secondary'
              }`}
              whileHover={{ y: -1 }}
            >
              {link.label}
              {isActive && (
                <motion.div
                  layoutId="header-underline"
                  className="absolute bottom-0 left-4 right-4 h-[2px] bg-neon-teal rounded-full"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  style={{
                    boxShadow: '0 0 8px rgba(0, 229, 204, 0.6), 0 0 16px rgba(0, 229, 204, 0.3)',
                  }}
                />
              )}
            </motion.button>
          );
        })}
      </nav>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Search bar */}
      <motion.div
        className={`relative flex items-center rounded-lg border transition-all duration-300 ${
          searchFocused
            ? 'border-neon-teal/50 bg-lego-surface/80 w-72'
            : 'border-lego-border/30 bg-lego-surface/40 w-52'
        }`}
        animate={{ width: searchFocused ? 288 : 208 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      >
        <Search size={14} className="ml-3 text-text-muted flex-shrink-0" />
        <input
          type="text"
          placeholder="Buscar jogos..."
          value={searchQuery}
          onChange={(e) => onSearchChange?.(e.target.value)}
          className="bg-transparent border-none outline-none text-xs text-text-primary pl-2.5 pr-3 py-2 w-full placeholder:text-text-muted"
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange?.('')}
            className="mr-2 text-text-muted hover:text-neon-teal text-xs cursor-pointer"
          >
            ✕
          </button>
        )}
      </motion.div>

      {/* Cart button */}
      <motion.button
        className="ml-4 w-9 h-9 rounded-lg bg-lego-surface/40 border border-lego-border/30 flex items-center justify-center text-text-muted hover:text-neon-teal hover:border-neon-teal/30 transition-colors cursor-pointer relative"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onCartClick}
      >
        <ShoppingCart size={16} />
        {totalItems > 0 && (
          <motion.span
            className="absolute -top-1 -right-1 w-4.5 h-4.5 rounded-full bg-neon-teal text-lego-black text-[9px] font-bold flex items-center justify-center min-w-[18px] min-h-[18px]"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 500, damping: 25 }}
          >
            {totalItems}
          </motion.span>
        )}
      </motion.button>
    </header>
  );
}
