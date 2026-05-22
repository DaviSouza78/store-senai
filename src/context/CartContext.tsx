import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { Game } from '../data/games';

export interface CartItem {
  game: Game;
  quantity: number;
}

export type PaymentMethod = 'credit' | 'debit' | 'pix' | 'boleto';

export interface CartContextType {
  items: CartItem[];
  addToCart: (game: Game) => void;
  removeFromCart: (gameId: string) => void;
  clearCart: () => void;
  isInCart: (gameId: string) => boolean;
  totalItems: number;
  totalPrice: number;
  paymentMethod: PaymentMethod;
  setPaymentMethod: (method: PaymentMethod) => void;
  orderCompleted: boolean;
  completeOrder: () => void;
  resetOrder: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('pix');
  const [orderCompleted, setOrderCompleted] = useState(false);

  const addToCart = useCallback((game: Game) => {
    setItems((prev) => {
      const exists = prev.find((item) => item.game.id === game.id);
      if (exists) return prev; // games are digital, no duplicates
      return [...prev, { game, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((gameId: string) => {
    setItems((prev) => prev.filter((item) => item.game.id !== gameId));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const isInCart = useCallback(
    (gameId: string) => items.some((item) => item.game.id === gameId),
    [items]
  );

  const totalItems = items.length;

  const totalPrice = items.reduce((sum, item) => {
    return sum + (item.game.priceValue ?? 0) * item.quantity;
  }, 0);

  const completeOrder = useCallback(() => {
    setOrderCompleted(true);
  }, []);

  const resetOrder = useCallback(() => {
    setOrderCompleted(false);
    setItems([]);
  }, []);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        clearCart,
        isInCart,
        totalItems,
        totalPrice,
        paymentMethod,
        setPaymentMethod,
        orderCompleted,
        completeOrder,
        resetOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}
