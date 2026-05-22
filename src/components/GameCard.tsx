import { motion } from 'framer-motion';
import { ShoppingCart, CheckCircle } from 'lucide-react';
import type { Game } from '../data/games';
import { useCart } from '../context/CartContext';

interface GameCardProps {
  game: Game;
  index: number;
  onClick?: () => void;
}

export default function GameCard({ game, index, onClick }: GameCardProps) {
  const { addToCart, isInCart } = useCart();
  const inCart = isInCart(game.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(game);
  };

  return (
    <motion.div
      className="game-card relative group cursor-pointer"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.08,
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{ scale: 1.03, zIndex: 10 }}
      onClick={onClick}
    >
      <div className="relative rounded-xl overflow-hidden border border-neon-teal/20 bg-lego-card transition-all duration-300 group-hover:border-neon-teal/60 group-hover:shadow-[0_0_20px_rgba(0,229,204,0.15),0_0_40px_rgba(0,229,204,0.05)]">
        {/* Image container */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={game.image}
            alt={game.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-lego-card via-lego-card/20 to-transparent" />

          {/* Rating badge */}
          <div className="absolute top-3 right-3 px-2 py-1 rounded-md bg-lego-black/70 backdrop-blur-sm border border-neon-teal/20 text-[10px] text-neon-teal font-semibold tracking-wider">
            {game.rating}
          </div>

          {/* Year badge */}
          <div className="absolute top-3 left-3 px-2 py-1 rounded-md bg-neon-teal/10 backdrop-blur-sm border border-neon-teal/20 text-[10px] text-neon-teal font-medium">
            {game.year}
          </div>

          {/* Price tag */}
          {game.price && (
            <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-lg bg-lego-black/80 backdrop-blur-sm border border-neon-teal/30 text-sm text-text-primary font-bold tracking-wide">
              {game.price}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="text-sm font-bold tracking-[0.1em] text-text-primary font-[var(--font-family-display)] mb-1.5">
            {game.title}
          </h3>
          <p className="text-[11px] text-text-secondary leading-relaxed mb-3 line-clamp-2">
            {game.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {game.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-full text-[9px] font-medium tracking-wider uppercase bg-neon-teal/5 text-neon-teal/70 border border-neon-teal/10"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex gap-2">
            {inCart ? (
              <div className="flex-1 py-2 rounded-lg bg-neon-teal/15 border border-neon-teal/30 text-neon-teal text-xs font-bold tracking-wider uppercase text-center flex items-center justify-center gap-1.5">
                <CheckCircle size={14} />
                NO CARRINHO
              </div>
            ) : (
              <motion.button
                className="flex-1 py-2 rounded-lg bg-neon-teal text-lego-black text-xs font-bold tracking-wider uppercase transition-all cursor-pointer hover:shadow-[0_0_15px_rgba(0,229,204,0.4)] flex items-center justify-center gap-1.5"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
              >
                <ShoppingCart size={14} />
                COMPRAR
              </motion.button>
            )}
            <motion.button
              className="flex-1 py-2 rounded-lg bg-transparent border border-neon-teal/40 text-neon-teal text-xs font-bold tracking-wider uppercase transition-all cursor-pointer hover:bg-neon-teal/10 hover:border-neon-teal/60"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              DETALHES
            </motion.button>
          </div>
        </div>

        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-neon-teal/0 group-hover:border-neon-teal/50 rounded-tl-xl transition-all duration-300" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-neon-teal/0 group-hover:border-neon-teal/50 rounded-tr-xl transition-all duration-300" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-neon-teal/0 group-hover:border-neon-teal/50 rounded-bl-xl transition-all duration-300" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-neon-teal/0 group-hover:border-neon-teal/50 rounded-br-xl transition-all duration-300" />
      </div>
    </motion.div>
  );
}
