import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, CheckCircle } from 'lucide-react';
import type { Game } from '../data/games';
import { useCart } from '../context/CartContext';

interface SpiderCardProps {
  game: Game;
  index: number;
  onClickDetail?: () => void;
}

export default function SpiderCard({ game, index, onClickDetail }: SpiderCardProps) {
  const [isRevealed, setIsRevealed] = useState(false);
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { addToCart, isInCart } = useCart();
  const inCart = isInCart(game.id);
  const isFree = game.priceValue === 0;

  const showReveal = () => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
    setIsRevealed(true);
  };

  const hideReveal = () => {
    hideTimeoutRef.current = setTimeout(() => {
      setIsRevealed(false);
    }, 200);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(game);
  };

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.3 + index * 0.1,
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      style={{ zIndex: isRevealed ? 50 : 1 }}
    >
      {/* Pop-out expanded card */}
      <AnimatePresence>
        {isRevealed && (
          <motion.div
            className="absolute z-40"
            initial={{ opacity: 0, x: 0, y: 0, scale: 0.92 }}
            animate={{ opacity: 1, x: 35, y: -35, scale: 1.05 }}
            exit={{ opacity: 0, x: 0, y: 0, scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 280, damping: 20, mass: 0.8 }}
            style={{ top: 0, left: 0, right: -35, bottom: -35 }}
            onMouseEnter={showReveal}
            onMouseLeave={hideReveal}
          >
            <div className="w-full h-full rounded-xl overflow-hidden border-2 border-neon-teal/70 bg-lego-card shadow-[0_0_30px_rgba(0,229,204,0.25),0_0_60px_rgba(0,229,204,0.1),0_20px_60px_rgba(0,0,0,0.6)]">
              <div className="relative aspect-[16/10] overflow-hidden">
                <img src={game.image} alt={game.title} className="w-full h-full object-cover scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-lego-card via-lego-card/30 to-transparent" />
                <motion.div
                  className="absolute left-0 right-0 h-[2px] bg-neon-teal/20"
                  initial={{ top: '0%' }}
                  animate={{ top: '100%' }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                />
              </div>

              <div className="p-4">
                <h3 className="text-sm font-bold tracking-[0.1em] text-neon-teal mb-1 font-[var(--font-family-display)]">
                  {game.title}
                </h3>
                <p className="text-[10px] text-text-secondary leading-relaxed mb-2.5 line-clamp-3">
                  {game.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-2.5">
                  {game.tags.map((tag) => (
                    <span key={tag} className="px-2 py-0.5 rounded-full text-[9px] font-medium tracking-wider uppercase bg-neon-teal/10 text-neon-teal border border-neon-teal/20">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-2 mb-3">
                  <div className="p-2 rounded-lg bg-lego-surface/60 border border-lego-border/30">
                    <div className="text-[8px] text-text-muted uppercase tracking-wider">Ano</div>
                    <div className="text-[11px] text-text-primary font-semibold">{game.year}</div>
                  </div>
                  <div className="p-2 rounded-lg bg-lego-surface/60 border border-lego-border/30">
                    <div className="text-[8px] text-text-muted uppercase tracking-wider">Class.</div>
                    <div className="text-[11px] text-neon-teal font-semibold">{game.rating}</div>
                  </div>
                  <div className="p-2 rounded-lg bg-lego-surface/60 border border-lego-border/30">
                    <div className="text-[8px] text-text-muted uppercase tracking-wider">Preço</div>
                    <div className={`text-[11px] font-semibold ${isFree ? 'text-green-400' : 'text-text-primary'}`}>
                      {game.price}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  {inCart ? (
                    <div className="w-full py-2.5 rounded-lg bg-neon-teal/15 border border-neon-teal/30 text-neon-teal text-xs font-bold tracking-wider uppercase text-center flex items-center justify-center gap-1.5">
                      <CheckCircle size={14} />
                      NO CARRINHO
                    </div>
                  ) : (
                    <motion.button
                      className={`w-full py-2.5 rounded-lg text-xs font-bold tracking-wider uppercase cursor-pointer flex items-center justify-center gap-1.5 ${
                        isFree
                          ? 'bg-green-500 text-lego-black hover:shadow-[0_0_15px_rgba(34,197,94,0.4)]'
                          : 'bg-neon-teal text-lego-black hover:shadow-[0_0_15px_rgba(0,229,204,0.4)]'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleAddToCart}
                    >
                      <ShoppingCart size={14} />
                      {isFree ? 'BAIXAR GRÁTIS' : 'ADICIONAR AO CARRINHO'}
                    </motion.button>
                  )}
                  <div className="flex gap-2">
                    <motion.button
                      className="flex-1 py-2 rounded-lg bg-transparent border border-neon-teal/30 text-neon-teal text-[10px] font-bold tracking-wider uppercase cursor-pointer hover:bg-neon-teal/10"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={onClickDetail}
                    >
                      DETALHES
                    </motion.button>
                    <motion.button
                      className="flex-1 py-2 rounded-lg bg-transparent border border-neon-teal/30 text-neon-teal text-[10px] font-bold tracking-wider uppercase cursor-pointer hover:bg-neon-teal/10"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      TRAILER
                    </motion.button>
                  </div>
                </div>
              </div>

              <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-neon-teal/60 rounded-tl-xl" />
              <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-neon-teal/60 rounded-tr-xl" />
              <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-neon-teal/60 rounded-bl-xl" />
              <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-neon-teal/60 rounded-br-xl" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Original card */}
      <div
        className={`relative rounded-xl overflow-hidden border bg-lego-card transition-all duration-300 ${
          isRevealed ? 'border-neon-teal/40 shadow-[0_0_15px_rgba(0,229,204,0.1)]' : 'border-neon-teal/20 hover:border-neon-teal/50'
        }`}
      >
        <div className="relative aspect-[16/10] overflow-hidden cursor-pointer" onClick={onClickDetail}>
          <img src={game.image} alt={game.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-lego-card via-lego-card/20 to-transparent" />
          <div className="absolute top-3 right-3 px-2 py-1 rounded-md bg-lego-black/70 backdrop-blur-sm border border-neon-teal/20 text-[10px] text-neon-teal font-semibold tracking-wider">
            {game.rating}
          </div>
          {game.price && (
            <div className={`absolute bottom-3 right-3 px-2.5 py-1 rounded-lg backdrop-blur-sm border text-xs font-bold ${
              isFree ? 'bg-green-500/20 border-green-500/30 text-green-400' : 'bg-lego-black/70 border-neon-teal/20 text-text-primary'
            }`}>
              {game.price}
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="text-sm font-bold tracking-[0.1em] text-text-primary mb-1.5 font-[var(--font-family-display)]">
            {game.title}
          </h3>
          <p className="text-[11px] text-text-secondary leading-relaxed mb-3 line-clamp-2">
            {game.description}
          </p>

          <div className="flex gap-2">
            {inCart ? (
              <div className="flex-1 py-2 rounded-lg bg-neon-teal/15 border border-neon-teal/30 text-neon-teal text-xs font-bold tracking-wider uppercase text-center flex items-center justify-center gap-1.5">
                <CheckCircle size={14} />
                NO CARRINHO
              </div>
            ) : (
              <motion.button
                className="flex-1 py-2 rounded-lg bg-neon-teal text-lego-black text-xs font-bold tracking-wider uppercase cursor-pointer hover:shadow-[0_0_15px_rgba(0,229,204,0.4)]"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onMouseEnter={showReveal}
                onMouseLeave={hideReveal}
                onClick={handleAddToCart}
              >
                COMPRAR
              </motion.button>
            )}
            <motion.button
              className="flex-1 py-2 rounded-lg bg-transparent border border-neon-teal/40 text-neon-teal text-xs font-bold tracking-wider uppercase cursor-pointer hover:bg-neon-teal/10 hover:border-neon-teal/60"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onMouseEnter={showReveal}
              onMouseLeave={hideReveal}
            >
              MAIS INFO
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
