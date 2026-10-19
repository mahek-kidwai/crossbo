import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { MenuItemWithEstimate } from "../types";

export interface CartLine {
  item: MenuItemWithEstimate;
  qty: number;
}

interface GuestState {
  guestName: string;
  activeKitchenOrders: number;
  setActiveKitchenOrders: (n: number) => void;
  cart: CartLine[];
  addToCart: (item: MenuItemWithEstimate) => void;
  lastOrder?: {
    items: CartLine[];
    fulfilledBy: string;
    maxPrep: number;
  };
  placeOrder: () => void;
  clearLastOrder: () => void;
}

const GuestContext = createContext<GuestState | null>(null);

export function GuestProvider({ children }: { children: ReactNode }) {
  const [activeKitchenOrders, setActiveKitchenOrders] = useState(3);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [lastOrder, setLastOrder] = useState<GuestState["lastOrder"]>();

  const value = useMemo<GuestState>(
    () => ({
      guestName: "Mr. Mathuria",
      activeKitchenOrders,
      setActiveKitchenOrders,
      cart,
      addToCart: (item) => {
        setCart((prev) => {
          const existing = prev.find((line) => line.item.id === item.id);
          if (existing) {
            return prev.map((line) =>
              line.item.id === item.id ? { ...line, qty: line.qty + 1 } : line
            );
          }
          return [...prev, { item, qty: 1 }];
        });
      },
      lastOrder,
      placeOrder: () => {
        if (!cart.length) return;
        const maxPrep = Math.max(...cart.map((line) => line.item.effective_prep_time_mins));
        const fulfilledBy = cart.reduce((latest, line) => {
          return line.item.effective_prep_time_mins >=
            (cart.find((c) => c.item.delivery_window === latest)?.item.effective_prep_time_mins ?? 0)
            ? line.item.delivery_window
            : latest;
        }, cart[0].item.delivery_window);
        const slowest = cart.reduce((a, b) =>
          a.item.effective_prep_time_mins >= b.item.effective_prep_time_mins ? a : b
        );
        setLastOrder({
          items: cart,
          fulfilledBy: slowest.item.delivery_window,
          maxPrep
        });
        setCart([]);
        setActiveKitchenOrders((n) => n + cart.reduce((sum, line) => sum + line.qty, 0));
        void fulfilledBy;
      },
      clearLastOrder: () => setLastOrder(undefined)
    }),
    [activeKitchenOrders, cart, lastOrder]
  );

  return <GuestContext.Provider value={value}>{children}</GuestContext.Provider>;
}

export function useGuest() {
  const ctx = useContext(GuestContext);
  if (!ctx) throw new Error("useGuest must be used within GuestProvider");
  return ctx;
}
