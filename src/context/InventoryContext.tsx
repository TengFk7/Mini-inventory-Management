import { createContext, useContext, type ReactNode } from 'react';
import { useInventory } from '../hooks/useInventory';
import type { Product } from '../types';

interface InventoryContextType {
  products: Product[];
  addProduct: (name: string, price: number, quantity: number) => void;
  updateQuantity: (id: number, delta: number) => void;
  deleteProduct: (id: number) => void;
}

const InventoryContext = createContext<InventoryContextType | null>(null);

export function InventoryProvider({ children }: { children: ReactNode }) {
  const inventory = useInventory();
  return (
    <InventoryContext.Provider value={inventory}>
      {children}
    </InventoryContext.Provider>
  );
}

export function useInventoryContext() {
  const ctx = useContext(InventoryContext);
  if (!ctx) throw new Error('useInventoryContext must be used within InventoryProvider');
  return ctx;
}
