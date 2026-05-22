import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import FranchiseGrid from './components/FranchiseGrid';
import SpiderManView from './components/SpiderManView';
import GameDetailView from './components/GameDetailView';
import CartView from './components/CartView';
import IntegrantesView from './components/IntegrantesView';
import { CartProvider } from './context/CartContext';
import { findGameById } from './data/games';

type ViewState =
  | { type: 'home' }
  | { type: 'spiderman' }
  | { type: 'detail'; gameId: string }
  | { type: 'cart' }
  | { type: 'integrantes' };

function AppContent() {
  const [view, setView] = useState<ViewState>({ type: 'home' });
  const [history, setHistory] = useState<ViewState[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const navigateTo = (newView: ViewState) => {
    setHistory((prev) => [...prev, view]);
    setView(newView);
  };

  const goBack = () => {
    if (history.length > 0) {
      const prev = history[history.length - 1];
      setHistory((h) => h.slice(0, -1));
      setView(prev);
    } else {
      setView({ type: 'home' });
    }
  };

  const goHome = () => {
    setHistory([]);
    setView({ type: 'home' });
    setSearchQuery('');
  };

  const handleNavChange = (navId: string) => {
    if (navId === 'games') {
      goHome();
    } else if (navId === 'integrantes') {
      setHistory([]);
      setView({ type: 'integrantes' });
      setSearchQuery('');
    }
  };

  const getActiveNav = () => {
    if (view.type === 'integrantes') return 'integrantes';
    return 'games';
  };

  const handleSelectGame = (gameId: string) => {
    if (gameId === 'spiderman-2') {
      navigateTo({ type: 'spiderman' });
    } else {
      navigateTo({ type: 'detail', gameId });
    }
  };

  const getSubtitle = () => {
    switch (view.type) {
      case 'spiderman':
        return 'Spider-Man 2 — Edições & DLC';
      case 'detail': {
        const game = findGameById(view.gameId);
        return game?.title ?? 'Detalhes';
      }
      case 'cart':
        return 'Carrinho de Compras';
      case 'integrantes':
        return 'Equipe do Projeto';
      default:
        return undefined;
    }
  };

  const renderContent = () => {
    switch (view.type) {
      case 'home':
        return (
          <FranchiseGrid onSelectGame={handleSelectGame} searchQuery={searchQuery} />
        );
      case 'spiderman':
        return (
          <SpiderManView
            onSelectDetail={(gameId) => navigateTo({ type: 'detail', gameId })}
          />
        );
      case 'detail': {
        const game = findGameById(view.gameId);
        if (!game) return null;
        return <GameDetailView game={game} />;
      }
      case 'cart':
        return (
          <CartView
            onBack={goBack}
            onContinueShopping={goHome}
          />
        );
      case 'integrantes':
        return <IntegrantesView />;
    }
  };

  return (
    <div className="flex min-h-screen bg-lego-black">
      <div className="flex-1 flex flex-col">
        <Header
          showBack={view.type !== 'home' && view.type !== 'integrantes'}
          onBack={goBack}
          subtitle={getSubtitle()}
          onCartClick={() => navigateTo({ type: 'cart' })}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          activeNav={getActiveNav()}
          onNavChange={handleNavChange}
        />

        {/* Content area with grid background */}
        <main className="flex-1 relative overflow-y-auto">
          <div className="grid-background absolute inset-0 pointer-events-none" />
          <div className="relative z-10">
            <AnimatePresence mode="wait">
              {renderContent()}
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
