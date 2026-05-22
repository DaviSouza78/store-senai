import { motion } from 'framer-motion';
import { Star, Calendar, Monitor, User, Building2, Tag, CheckCircle, ShoppingCart } from 'lucide-react';
import type { Game } from '../data/games';
import { useCart } from '../context/CartContext';

interface GameDetailViewProps {
  game: Game;
}

export default function GameDetailView({ game }: GameDetailViewProps) {
  const { addToCart, isInCart } = useCart();
  const inCart = isInCart(game.id);
  const isFree = game.priceValue === 0;

  return (
    <motion.div
      key={`detail-${game.id}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.5 }}
      className="p-8"
    >
      {/* Hero Banner */}
      <motion.div
        className="relative rounded-2xl overflow-hidden border border-neon-teal/30 mb-8 h-[400px]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <img
          src={game.image}
          alt={game.title}
          className="w-full h-full object-cover"
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-lego-black via-lego-black/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-lego-black/80 via-transparent to-transparent" />

        {/* Content overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {/* Tags row */}
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              {game.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-[10px] font-medium tracking-wider uppercase bg-neon-teal/15 text-neon-teal border border-neon-teal/25"
                >
                  {tag}
                </span>
              ))}
              {game.discount && (
                <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider bg-green-500/20 text-green-400 border border-green-500/30">
                  {game.discount}
                </span>
              )}
            </div>

            <h1 className="text-4xl font-bold tracking-[0.15em] text-text-primary mb-3 font-[var(--font-family-display)] neon-text-glow">
              {game.title}
            </h1>
            <p className="text-sm text-text-secondary leading-relaxed max-w-2xl">
              {game.description}
            </p>
          </motion.div>
        </div>

        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-neon-teal/40 rounded-tl-2xl" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-neon-teal/40 rounded-tr-2xl" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-neon-teal/40 rounded-bl-2xl" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-neon-teal/40 rounded-br-2xl" />
      </motion.div>

      {/* Content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column: Description + Features */}
        <motion.div
          className="lg:col-span-2 space-y-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          {/* About */}
          <div className="rounded-xl border border-neon-teal/20 bg-lego-card p-6">
            <h2 className="text-lg font-bold tracking-[0.1em] text-text-primary mb-4 font-[var(--font-family-display)] flex items-center gap-2">
              <Star size={18} className="text-neon-teal" />
              SOBRE O JOGO
            </h2>
            <p className="text-sm text-text-secondary leading-relaxed">
              {game.longDescription || game.description}
            </p>
          </div>

          {/* Features */}
          {game.features && game.features.length > 0 && (
            <div className="rounded-xl border border-neon-teal/20 bg-lego-card p-6">
              <h2 className="text-lg font-bold tracking-[0.1em] text-text-primary mb-4 font-[var(--font-family-display)] flex items-center gap-2">
                <Tag size={18} className="text-neon-teal" />
                RECURSOS
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {game.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-lego-surface/60 border border-lego-border/30"
                  >
                    <CheckCircle size={14} className="text-neon-teal flex-shrink-0" />
                    <span className="text-xs text-text-secondary">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Game info details */}
          <div className="rounded-xl border border-neon-teal/20 bg-lego-card p-6">
            <h2 className="text-lg font-bold tracking-[0.1em] text-text-primary mb-4 font-[var(--font-family-display)]">
              INFORMAÇÕES
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {game.developer && (
                <InfoRow icon={<User size={14} />} label="Desenvolvedor" value={game.developer} />
              )}
              {game.publisher && (
                <InfoRow icon={<Building2 size={14} />} label="Editora" value={game.publisher} />
              )}
              {game.releaseDate && (
                <InfoRow icon={<Calendar size={14} />} label="Lançamento" value={game.releaseDate} />
              )}
              {game.platform && (
                <InfoRow
                  icon={<Monitor size={14} />}
                  label="Plataformas"
                  value={game.platform.join(', ')}
                />
              )}
              <InfoRow icon={<Star size={14} />} label="Classificação" value={game.rating} />
              <InfoRow icon={<Tag size={14} />} label="Gênero" value={game.tags.join(', ')} />
            </div>
          </div>
        </motion.div>

        {/* Right column: Purchase card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="sticky top-24 rounded-xl border-2 border-neon-teal/40 bg-lego-card p-6 shadow-[0_0_20px_rgba(0,229,204,0.1)]">
            {/* Game image small */}
            <div className="relative aspect-video rounded-lg overflow-hidden mb-4 border border-neon-teal/20">
              <img
                src={game.image}
                alt={game.title}
                className="w-full h-full object-cover"
              />
            </div>

            <h3 className="text-base font-bold tracking-[0.08em] text-text-primary mb-1 font-[var(--font-family-display)]">
              {game.title}
            </h3>
            <p className="text-[11px] text-text-muted mb-4">{game.franchise}</p>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-5">
              {isFree ? (
                <span className="text-2xl font-bold text-green-400">GRÁTIS</span>
              ) : (
                <>
                  <span className="text-2xl font-bold text-text-primary">{game.price}</span>
                  {game.originalPrice && (
                    <span className="text-sm text-text-muted line-through">{game.originalPrice}</span>
                  )}
                  {game.discount && (
                    <span className="px-2 py-0.5 rounded bg-neon-teal/20 text-[10px] text-neon-teal font-bold">
                      {game.discount}
                    </span>
                  )}
                </>
              )}
            </div>

            {/* Add to cart / Already in cart */}
            {inCart ? (
              <motion.div
                className="w-full py-3 rounded-xl bg-neon-teal/15 border-2 border-neon-teal/40 text-neon-teal text-sm font-bold tracking-wider uppercase text-center flex items-center justify-center gap-2"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
              >
                <CheckCircle size={18} />
                NO CARRINHO
              </motion.div>
            ) : (
              <motion.button
                className={`w-full py-3 rounded-xl text-sm font-bold tracking-wider uppercase cursor-pointer flex items-center justify-center gap-2 ${
                  isFree
                    ? 'bg-green-500 text-lego-black hover:shadow-[0_0_20px_rgba(34,197,94,0.4)]'
                    : 'bg-neon-teal text-lego-black hover:shadow-[0_0_20px_rgba(0,229,204,0.4)]'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => addToCart(game)}
              >
                <ShoppingCart size={18} />
                {isFree ? 'BAIXAR GRÁTIS' : 'ADICIONAR AO CARRINHO'}
              </motion.button>
            )}

            {/* Wishlist button */}
            <motion.button
              className="w-full mt-3 py-2.5 rounded-xl bg-transparent border border-neon-teal/30 text-neon-teal text-xs font-bold tracking-wider uppercase cursor-pointer hover:bg-neon-teal/10"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              ♡ LISTA DE DESEJOS
            </motion.button>

            {/* Platform icons */}
            {game.platform && (
              <div className="mt-4 pt-4 border-t border-lego-border/30">
                <p className="text-[10px] text-text-muted uppercase tracking-wider mb-2">Disponível para</p>
                <div className="flex flex-wrap gap-2">
                  {game.platform.map((p) => (
                    <span
                      key={p}
                      className="px-2.5 py-1 rounded-md bg-lego-surface border border-lego-border/30 text-[10px] text-text-secondary font-medium"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg bg-lego-surface/40 border border-lego-border/20">
      <div className="text-neon-teal mt-0.5 flex-shrink-0">{icon}</div>
      <div>
        <p className="text-[10px] text-text-muted uppercase tracking-wider mb-0.5">{label}</p>
        <p className="text-xs text-text-primary font-medium">{value}</p>
      </div>
    </div>
  );
}
