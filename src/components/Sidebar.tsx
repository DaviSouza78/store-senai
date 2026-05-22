import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Home,
  Search,
  CalendarDays,
  Zap,
  Settings,
  User,
} from 'lucide-react';

interface SidebarItem {
  icon: React.ElementType;
  label: string;
  id: string;
}

const topItems: SidebarItem[] = [
  { icon: Home, label: 'Início', id: 'home' },
  { icon: Search, label: 'Buscar', id: 'search' },
  { icon: CalendarDays, label: 'Calendário', id: 'calendar' },
  { icon: Zap, label: 'Downloads', id: 'downloads' },
];

const bottomItems: SidebarItem[] = [
  { icon: Settings, label: 'Configurações', id: 'settings' },
  { icon: User, label: 'Perfil', id: 'profile' },
];

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState('home');

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-[68px] bg-lego-dark z-50 flex flex-col items-center border-r border-lego-border/30">
      {/* Logo */}
      <motion.div
        className="mt-5 mb-8 w-10 h-10 rounded-lg bg-neon-teal/10 flex items-center justify-center cursor-pointer"
        whileHover={{ scale: 1.1, backgroundColor: 'rgba(0, 229, 204, 0.2)' }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="text-neon-teal font-bold text-lg font-[var(--font-family-display)]">N</span>
      </motion.div>

      {/* Top navigation */}
      <nav className="flex flex-col items-center gap-1 flex-1">
        {topItems.map((item) => {
          const isActive = activeItem === item.id;
          const Icon = item.icon;
          return (
            <motion.button
              key={item.id}
              onClick={() => setActiveItem(item.id)}
              className={`relative w-11 h-11 rounded-xl flex items-center justify-center transition-colors duration-200 group cursor-pointer ${
                isActive
                  ? 'bg-neon-teal/15 text-neon-teal'
                  : 'text-text-muted hover:text-text-secondary hover:bg-lego-surface/50'
              }`}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-0 rounded-xl bg-neon-teal/15 border border-neon-teal/30"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              {isActive && (
                <motion.div
                  layoutId="sidebar-indicator"
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-[1px] w-[3px] h-5 bg-neon-teal rounded-r-full"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <Icon size={20} className="relative z-10" />

              {/* Tooltip */}
              <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-lego-surface rounded-md text-xs text-text-primary whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 border border-lego-border/50 shadow-lg">
                {item.label}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-lego-surface border-l border-b border-lego-border/50 rotate-45" />
              </div>
            </motion.button>
          );
        })}
      </nav>

      {/* Bottom navigation */}
      <nav className="flex flex-col items-center gap-1 mb-5">
        {bottomItems.map((item) => {
          const isActive = activeItem === item.id;
          const Icon = item.icon;
          return (
            <motion.button
              key={item.id}
              onClick={() => setActiveItem(item.id)}
              className={`relative w-11 h-11 rounded-xl flex items-center justify-center transition-colors duration-200 group cursor-pointer ${
                isActive
                  ? 'bg-neon-teal/15 text-neon-teal'
                  : 'text-text-muted hover:text-text-secondary hover:bg-lego-surface/50'
              }`}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon size={20} className="relative z-10" />
              <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-lego-surface rounded-md text-xs text-text-primary whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 border border-lego-border/50 shadow-lg">
                {item.label}
              </div>
            </motion.button>
          );
        })}
      </nav>
    </aside>
  );
}
