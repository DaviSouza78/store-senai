import { motion } from 'framer-motion';
import { ShoppingCart, CheckCircle } from 'lucide-react';
import SpiderCard from './SpiderCard';
import { spiderMan2Collection } from '../data/games';
import { useCart } from '../context/CartContext';

interface SpiderManViewProps {
  onSelectDetail?: (gameId: string) => void;
}

export default function SpiderManView({ onSelectDetail }: SpiderManViewProps) {
  const heroGame = spiderMan2Collection[0];
  const { addToCart, isInCart } = useCart();
  const heroInCart = isInCart(heroGame.id);

  return (
    <motion.div
      key="spiderman-view"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.5 }}
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
            SPIDER-MAN 2
          </h1>
          <div className="h-[2px] flex-1 bg-gradient-to-r from-neon-teal/30 to-transparent rounded-full" />
        </div>
        <p className="text-xs text-text-muted tracking-wider ml-12">
          EDIÇÕES, EXPANSÕES E CONTEÚDO ADICIONAL
        </p>
      </motion.div>

      <div className="flex gap-8 items-start">
        {/* Hero Card - 42% */}
        <motion.div
          className="w-[42%] flex-shrink-0 sticky top-24"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="relative rounded-2xl overflow-hidden border-2 border-neon-teal/50 bg-lego-card shadow-[0_0_30px_rgba(0,229,204,0.15),0_0_60px_rgba(0,229,204,0.05)] animate-[glow-pulse_3s_ease-in-out_infinite]">
            <div className="relative aspect-[3/4] overflow-hidden">
              <motion.img
                src={heroGame.image}
                alt={heroGame.title}
                className="w-full h-full object-cover"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-lego-card via-transparent to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-b from-lego-card/30 via-transparent to-transparent" />
              <motion.div
                className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-teal/5 to-transparent"
                initial={{ y: '-100%' }}
                animate={{ y: '100%' }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 2, ease: 'linear' }}
                style={{ height: '30%' }}
              />
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-lego-card via-lego-card/95 to-transparent">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider bg-neon-teal/20 text-neon-teal border border-neon-teal/30">
                    ★ JOGO DO ANO
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-medium tracking-wider bg-lego-surface text-text-secondary border border-lego-border/30">
                    {heroGame.franchise}
                  </span>
                </div>
                <h2 className="text-2xl font-bold tracking-[0.15em] text-text-primary mb-2 font-[var(--font-family-display)] neon-text-glow">
                  SPIDER-MAN 2
                </h2>
                <p className="text-xs text-text-secondary leading-relaxed mb-4">
                  {heroGame.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {heroGame.tags.map((tag) => (
                    <span key={tag} className="px-2.5 py-1 rounded-full text-[9px] font-medium tracking-wider uppercase bg-neon-teal/10 text-neon-teal border border-neon-teal/20">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-baseline gap-3 mb-5">
                  <span className="text-2xl font-bold text-text-primary">{heroGame.price}</span>
                  {heroGame.originalPrice && (
                    <span className="text-xs text-text-muted line-through">{heroGame.originalPrice}</span>
                  )}
                  {heroGame.discount && (
                    <span className="px-2 py-0.5 rounded bg-neon-teal/20 text-[10px] text-neon-teal font-bold">
                      {heroGame.discount}
                    </span>
                  )}
                </div>

                <div className="flex gap-3">
                  {heroInCart ? (
                    <div className="flex-1 py-3 rounded-xl bg-neon-teal/15 border-2 border-neon-teal/40 text-neon-teal text-sm font-bold tracking-wider uppercase text-center flex items-center justify-center gap-2">
                      <CheckCircle size={18} />
                      NO CARRINHO
                    </div>
                  ) : (
                    <motion.button
                      className="flex-1 py-3 rounded-xl bg-neon-teal text-lego-black text-sm font-bold tracking-wider uppercase cursor-pointer shadow-[0_0_20px_rgba(0,229,204,0.3)] flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.03, boxShadow: '0 0 30px rgba(0, 229, 204, 0.5)' }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => addToCart(heroGame)}
                    >
                      <ShoppingCart size={18} />
                      COMPRAR AGORA
                    </motion.button>
                  )}
                  <motion.button
                    className="py-3 px-5 rounded-xl bg-transparent border-2 border-neon-teal/40 text-neon-teal text-sm font-bold tracking-wider uppercase cursor-pointer hover:bg-neon-teal/10"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    ♡ DESEJOS
                  </motion.button>
                </div>
              </motion.div>
            </div>

            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-neon-teal/50 rounded-tl-2xl" />
            <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-neon-teal/50 rounded-tr-2xl" />
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-neon-teal/50 rounded-bl-2xl" />
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-neon-teal/50 rounded-br-2xl" />
          </div>
        </motion.div>

        {/* Secondary grid */}
        <div className="flex-1 min-w-0">
          <motion.div
            className="flex items-center gap-3 mb-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-xs font-bold tracking-[0.2em] text-text-muted uppercase">
              EDIÇÕES & DLC
            </h3>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-lego-border/50 to-transparent" />
            <span className="text-[10px] text-neon-teal font-medium">
              {spiderMan2Collection.length} DISPONÍVEIS
            </span>
          </motion.div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
            {spiderMan2Collection.map((game, index) => (
              <SpiderCard
                key={game.id}
                game={game}
                index={index}
                onClickDetail={() => onSelectDetail?.(game.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
