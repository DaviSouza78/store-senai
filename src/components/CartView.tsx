import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Trash2,
  CreditCard,
  QrCode,
  FileText,
  ShieldCheck,
  ShoppingBag,
  ArrowLeft,
  CheckCircle,
  PartyPopper,
} from 'lucide-react';
import { useCart, type PaymentMethod } from '../context/CartContext';

interface CartViewProps {
  onBack: () => void;
  onContinueShopping: () => void;
}

const paymentMethods: { id: PaymentMethod; label: string; icon: React.ReactNode; desc: string }[] = [
  { id: 'pix', label: 'PIX', icon: <QrCode size={20} />, desc: 'Aprovação instantânea · Sem taxas' },
  { id: 'credit', label: 'Cartão de Crédito', icon: <CreditCard size={20} />, desc: 'Até 12x sem juros' },
  { id: 'debit', label: 'Cartão de Débito', icon: <CreditCard size={20} />, desc: 'Débito direto na conta' },
  { id: 'boleto', label: 'Boleto Bancário', icon: <FileText size={20} />, desc: 'Vencimento em 3 dias úteis' },
];

export default function CartView({ onBack, onContinueShopping }: CartViewProps) {
  const {
    items,
    removeFromCart,
    clearCart,
    totalPrice,
    totalItems,
    paymentMethod,
    setPaymentMethod,
    orderCompleted,
    completeOrder,
    resetOrder,
  } = useCart();

  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [installments, setInstallments] = useState(1);
  const [cpf, setCpf] = useState('');
  const [processing, setProcessing] = useState(false);

  const needsCardInfo = paymentMethod === 'credit' || paymentMethod === 'debit';
  const canCheckout = items.length > 0 && (
    !needsCardInfo || (cardNumber.length >= 16 && cardName.length > 2 && cardExpiry.length >= 4 && cardCvv.length >= 3)
  );

  const handleCheckout = async () => {
    if (!canCheckout) return;
    setProcessing(true);
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setProcessing(false);
    completeOrder();
  };

  const handleNewOrder = () => {
    resetOrder();
    onContinueShopping();
  };

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const formatCardNumber = (value: string) => {
    const nums = value.replace(/\D/g, '').slice(0, 16);
    return nums.replace(/(\d{4})(?=\d)/g, '$1 ');
  };

  const formatExpiry = (value: string) => {
    const nums = value.replace(/\D/g, '').slice(0, 4);
    if (nums.length >= 3) return nums.slice(0, 2) + '/' + nums.slice(2);
    return nums;
  };

  // ── Order Complete Screen ─────────────────────────────────────────────
  if (orderCompleted) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-8 flex items-center justify-center min-h-[70vh]"
      >
        <motion.div
          className="text-center max-w-lg"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        >
          <motion.div
            className="w-24 h-24 rounded-full bg-neon-teal/20 border-2 border-neon-teal/50 flex items-center justify-center mx-auto mb-6"
            initial={{ rotate: -180, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          >
            <PartyPopper size={40} className="text-neon-teal" />
          </motion.div>

          <motion.h1
            className="text-3xl font-bold tracking-[0.15em] text-text-primary mb-3 font-[var(--font-family-display)] neon-text-glow"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            COMPRA REALIZADA!
          </motion.h1>

          <motion.p
            className="text-sm text-text-secondary mb-2"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Seu pedido foi processado com sucesso.
          </motion.p>

          <motion.p
            className="text-xs text-text-muted mb-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Os jogos estarão disponíveis na sua biblioteca em instantes.
            <br />
            Um e-mail de confirmação foi enviado para sua conta.
          </motion.p>

          <motion.div
            className="flex gap-4 justify-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <motion.button
              className="px-8 py-3 rounded-xl bg-neon-teal text-lego-black text-sm font-bold tracking-wider uppercase cursor-pointer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleNewOrder}
            >
              CONTINUAR COMPRANDO
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    );
  }

  // ── Empty Cart ────────────────────────────────────────────────────────
  if (items.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-8 flex items-center justify-center min-h-[60vh]"
      >
        <div className="text-center">
          <div className="w-20 h-20 rounded-full bg-lego-surface border border-lego-border/30 flex items-center justify-center mx-auto mb-5">
            <ShoppingBag size={32} className="text-text-muted" />
          </div>
          <h2 className="text-xl font-bold tracking-[0.15em] text-text-primary mb-2 font-[var(--font-family-display)]">
            CARRINHO VAZIO
          </h2>
          <p className="text-sm text-text-muted mb-6">
            Você ainda não adicionou nenhum jogo ao carrinho.
          </p>
          <motion.button
            className="px-6 py-3 rounded-xl bg-neon-teal text-lego-black text-sm font-bold tracking-wider uppercase cursor-pointer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={onContinueShopping}
          >
            EXPLORAR JOGOS
          </motion.button>
        </div>
      </motion.div>
    );
  }

  // ── Cart with items ───────────────────────────────────────────────────
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="p-8"
    >
      {/* Header */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <div className="flex items-center gap-4 mb-2">
          <div className="h-[2px] w-8 bg-neon-teal rounded-full shadow-[0_0_8px_rgba(0,229,204,0.5)]" />
          <h1 className="text-2xl font-bold tracking-[0.2em] text-text-primary uppercase font-[var(--font-family-display)]">
            MEU CARRINHO
          </h1>
          <div className="h-[2px] flex-1 bg-gradient-to-r from-neon-teal/30 to-transparent rounded-full" />
          <span className="text-xs text-neon-teal font-medium">
            {totalItems} {totalItems === 1 ? 'ITEM' : 'ITENS'}
          </span>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart items list */}
        <div className="lg:col-span-2 space-y-4">
          <AnimatePresence mode="popLayout">
            {items.map((item, index) => (
              <motion.div
                key={item.game.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20, scale: 0.95 }}
                transition={{ delay: index * 0.05 }}
                className="flex gap-4 p-4 rounded-xl border border-neon-teal/20 bg-lego-card hover:border-neon-teal/40 transition-colors group"
              >
                {/* Game image */}
                <div className="w-32 h-20 rounded-lg overflow-hidden flex-shrink-0 border border-neon-teal/10">
                  <img
                    src={item.game.image}
                    alt={item.game.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Game info */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold tracking-[0.08em] text-text-primary font-[var(--font-family-display)] mb-1">
                    {item.game.title}
                  </h3>
                  <p className="text-[10px] text-text-muted mb-1.5">{item.game.franchise}</p>
                  <div className="flex flex-wrap gap-1">
                    {item.game.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-1.5 py-0.5 rounded text-[8px] font-medium tracking-wider uppercase bg-neon-teal/5 text-neon-teal/60 border border-neon-teal/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Price + remove */}
                <div className="flex flex-col items-end justify-between flex-shrink-0">
                  <div className="text-right">
                    {item.game.priceValue === 0 ? (
                      <span className="text-sm font-bold text-green-400">GRÁTIS</span>
                    ) : (
                      <>
                        <span className="text-sm font-bold text-text-primary">{item.game.price}</span>
                        {item.game.originalPrice && (
                          <span className="block text-[10px] text-text-muted line-through">{item.game.originalPrice}</span>
                        )}
                      </>
                    )}
                  </div>
                  <motion.button
                    className="p-1.5 rounded-lg text-text-muted hover:text-red-400 hover:bg-red-400/10 transition-colors cursor-pointer opacity-0 group-hover:opacity-100"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => removeFromCart(item.game.id)}
                  >
                    <Trash2 size={16} />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Clear cart */}
          <div className="flex justify-between items-center pt-2">
            <motion.button
              className="flex items-center gap-2 text-xs text-text-muted hover:text-text-secondary cursor-pointer"
              whileHover={{ x: -3 }}
              onClick={onBack}
            >
              <ArrowLeft size={14} />
              Continuar comprando
            </motion.button>
            <motion.button
              className="text-xs text-text-muted hover:text-red-400 cursor-pointer transition-colors"
              onClick={clearCart}
            >
              Limpar carrinho
            </motion.button>
          </div>
        </div>

        {/* Payment & Summary sidebar */}
        <div className="space-y-5">
          {/* Payment method */}
          <motion.div
            className="rounded-xl border border-neon-teal/20 bg-lego-card p-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-sm font-bold tracking-[0.1em] text-text-primary mb-4 font-[var(--font-family-display)] flex items-center gap-2">
              <CreditCard size={16} className="text-neon-teal" />
              FORMA DE PAGAMENTO
            </h3>

            <div className="space-y-2">
              {paymentMethods.map((method) => (
                <motion.button
                  key={method.id}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all cursor-pointer text-left ${
                    paymentMethod === method.id
                      ? 'border-neon-teal/50 bg-neon-teal/10'
                      : 'border-lego-border/30 bg-lego-surface/40 hover:border-lego-border/60'
                  }`}
                  onClick={() => setPaymentMethod(method.id)}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className={`flex-shrink-0 ${paymentMethod === method.id ? 'text-neon-teal' : 'text-text-muted'}`}>
                    {method.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs font-semibold ${paymentMethod === method.id ? 'text-text-primary' : 'text-text-secondary'}`}>
                      {method.label}
                    </p>
                    <p className="text-[10px] text-text-muted">{method.desc}</p>
                  </div>
                  {paymentMethod === method.id && (
                    <CheckCircle size={16} className="text-neon-teal flex-shrink-0" />
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Card form (if credit/debit selected) */}
          <AnimatePresence>
            {needsCardInfo && (
              <motion.div
                className="rounded-xl border border-neon-teal/20 bg-lego-card p-5"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-sm font-bold tracking-[0.1em] text-text-primary mb-4 font-[var(--font-family-display)]">
                  DADOS DO CARTÃO
                </h3>

                <div className="space-y-3">
                  <div>
                    <label className="block text-[10px] text-text-muted uppercase tracking-wider mb-1">Número do Cartão</label>
                    <input
                      type="text"
                      value={formatCardNumber(cardNumber)}
                      onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ''))}
                      placeholder="0000 0000 0000 0000"
                      maxLength={19}
                      className="w-full px-3 py-2.5 rounded-lg bg-lego-surface border border-lego-border/40 text-sm text-text-primary placeholder:text-text-muted/50 outline-none focus:border-neon-teal/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-text-muted uppercase tracking-wider mb-1">Nome no Cartão</label>
                    <input
                      type="text"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      placeholder="NOME COMPLETO"
                      className="w-full px-3 py-2.5 rounded-lg bg-lego-surface border border-lego-border/40 text-sm text-text-primary placeholder:text-text-muted/50 outline-none focus:border-neon-teal/50 transition-colors uppercase"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] text-text-muted uppercase tracking-wider mb-1">Validade</label>
                      <input
                        type="text"
                        value={formatExpiry(cardExpiry)}
                        onChange={(e) => setCardExpiry(e.target.value.replace(/\D/g, ''))}
                        placeholder="MM/AA"
                        maxLength={5}
                        className="w-full px-3 py-2.5 rounded-lg bg-lego-surface border border-lego-border/40 text-sm text-text-primary placeholder:text-text-muted/50 outline-none focus:border-neon-teal/50 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-text-muted uppercase tracking-wider mb-1">CVV</label>
                      <input
                        type="text"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                        placeholder="000"
                        maxLength={4}
                        className="w-full px-3 py-2.5 rounded-lg bg-lego-surface border border-lego-border/40 text-sm text-text-primary placeholder:text-text-muted/50 outline-none focus:border-neon-teal/50 transition-colors"
                      />
                    </div>
                  </div>

                  {paymentMethod === 'credit' && (
                    <div>
                      <label className="block text-[10px] text-text-muted uppercase tracking-wider mb-1">Parcelas</label>
                      <select
                        value={installments}
                        onChange={(e) => setInstallments(Number(e.target.value))}
                        className="w-full px-3 py-2.5 rounded-lg bg-lego-surface border border-lego-border/40 text-sm text-text-primary outline-none focus:border-neon-teal/50 transition-colors cursor-pointer"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((n) => (
                          <option key={n} value={n} className="bg-lego-dark">
                            {n}x de {formatCurrency(totalPrice / n)} {n <= 6 ? 'sem juros' : ''}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* CPF (for PIX/Boleto) */}
          <AnimatePresence>
            {(paymentMethod === 'pix' || paymentMethod === 'boleto') && (
              <motion.div
                className="rounded-xl border border-neon-teal/20 bg-lego-card p-5"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-sm font-bold tracking-[0.1em] text-text-primary mb-3 font-[var(--font-family-display)]">
                  {paymentMethod === 'pix' ? 'DADOS PARA PIX' : 'DADOS PARA BOLETO'}
                </h3>
                <div>
                  <label className="block text-[10px] text-text-muted uppercase tracking-wider mb-1">CPF</label>
                  <input
                    type="text"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value.replace(/\D/g, '').slice(0, 11))}
                    placeholder="000.000.000-00"
                    maxLength={14}
                    className="w-full px-3 py-2.5 rounded-lg bg-lego-surface border border-lego-border/40 text-sm text-text-primary placeholder:text-text-muted/50 outline-none focus:border-neon-teal/50 transition-colors"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Order summary */}
          <motion.div
            className="rounded-xl border-2 border-neon-teal/40 bg-lego-card p-5 shadow-[0_0_15px_rgba(0,229,204,0.08)]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-sm font-bold tracking-[0.1em] text-text-primary mb-4 font-[var(--font-family-display)]">
              RESUMO DO PEDIDO
            </h3>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-xs">
                <span className="text-text-secondary">Subtotal ({totalItems} itens)</span>
                <span className="text-text-primary">{formatCurrency(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-text-secondary">Desconto</span>
                <span className="text-green-400">- {formatCurrency(0)}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-text-secondary">Taxas</span>
                <span className="text-text-primary">Grátis</span>
              </div>
              <div className="h-[1px] bg-lego-border/30 my-2" />
              <div className="flex justify-between">
                <span className="text-sm font-bold text-text-primary">Total</span>
                <span className="text-lg font-bold text-neon-teal">{formatCurrency(totalPrice)}</span>
              </div>
              {paymentMethod === 'credit' && installments > 1 && (
                <p className="text-[10px] text-text-muted text-right">
                  {installments}x de {formatCurrency(totalPrice / installments)}
                </p>
              )}
            </div>

            {/* Checkout button */}
            <motion.button
              className={`w-full py-3.5 rounded-xl text-sm font-bold tracking-wider uppercase cursor-pointer flex items-center justify-center gap-2 transition-all ${
                canCheckout
                  ? 'bg-neon-teal text-lego-black hover:shadow-[0_0_25px_rgba(0,229,204,0.4)]'
                  : 'bg-lego-surface text-text-muted cursor-not-allowed'
              }`}
              whileHover={canCheckout ? { scale: 1.02 } : {}}
              whileTap={canCheckout ? { scale: 0.98 } : {}}
              onClick={handleCheckout}
              disabled={!canCheckout || processing}
            >
              {processing ? (
                <motion.div
                  className="w-5 h-5 border-2 border-lego-black/30 border-t-lego-black rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                />
              ) : (
                <>
                  <ShieldCheck size={18} />
                  FINALIZAR COMPRA
                </>
              )}
            </motion.button>

            <p className="text-[9px] text-text-muted text-center mt-3 flex items-center justify-center gap-1">
              <ShieldCheck size={10} />
              Pagamento seguro · Dados criptografados
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
