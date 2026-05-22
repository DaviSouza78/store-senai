import { motion, AnimatePresence } from 'framer-motion';
import GameCard from './GameCard';
import { featuredGames, type Game } from '../data/games';

interface FranchiseGridProps {
  onSelectGame: (gameId: string) => void;
  searchQuery?: string;
}

export default function FranchiseGrid({ onSelectGame, searchQuery = '' }: FranchiseGridProps) {
  const query = searchQuery.toLowerCase().trim();

  const filteredGames: Game[] = query
    ? featuredGames.filter(
        (game) =>
          game.title.toLowerCase().includes(query) ||
          game.description.toLowerCase().includes(query) ||
          game.tags.some((tag) => tag.toLowerCase().includes(query)) ||
          game.franchise.toLowerCase().includes(query) ||
          game.developer?.toLowerCase().includes(query) ||
          game.publisher?.toLowerCase().includes(query)
      )
    : featuredGames;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="franchise-grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
        className="p-8"
      >
        {/* Section title */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <div className="flex items-center gap-4 mb-2">
            <div className="h-[2px] w-8 bg-neon-teal rounded-full shadow-[0_0_8px_rgba(0,229,204,0.5)]" />
            <h1 className="text-2xl font-bold tracking-[0.2em] text-text-primary uppercase font-[var(--font-family-display)]">
              {query ? 'RESULTADOS' : 'DESTAQUES'}
            </h1>
            <div className="h-[2px] flex-1 bg-gradient-to-r from-neon-teal/30 to-transparent rounded-full" />
          </div>
          <p className="text-xs text-text-muted tracking-wider ml-12">
            {query
              ? `${filteredGames.length} jogo${filteredGames.length !== 1 ? 's' : ''} encontrado${filteredGames.length !== 1 ? 's' : ''} para "${searchQuery}"`
              : 'LANÇAMENTOS NEXT-GEN — SELECIONADOS PARA VOCÊ'}
          </p>
        </motion.div>

        {/* Grid of cards */}
        {filteredGames.length > 0 ? (
          <div className="card-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredGames.map((game, index) => (
              <GameCard
                key={game.id}
                game={game}
                index={index}
                onClick={() => onSelectGame(game.id)}
              />
            ))}
          </div>
        ) : (
          <motion.div
            className="flex flex-col items-center justify-center py-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="w-20 h-20 rounded-full bg-lego-surface/60 border border-lego-border/30 flex items-center justify-center mb-4">
              <span className="text-3xl">🎮</span>
            </div>
            <p className="text-text-secondary text-sm font-medium mb-1">
              Nenhum jogo encontrado
            </p>
            <p className="text-text-muted text-xs">
              Tente buscar por outro título, gênero ou desenvolvedor
            </p>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
