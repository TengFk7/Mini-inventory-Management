import { useState } from 'react';
import type { Product } from '../types';

const INITIAL_PRODUCTS: Product[] = [
  { id: 1, name: 'MacBook Pro 16"', price: 89900, quantity: 5 },
  { id: 2, name: 'iPhone 16 Pro', price: 42900, quantity: 12 },
  { id: 3, name: 'AirPods Pro', price: 9900, quantity: 0 },
  { id: 4, name: 'iPad Air', price: 21900, quantity: 8 },
];

export function useInventory() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);

  const addProduct = (name: string, price: number, quantity: number) => {
    const newProduct: Product = {
      id: Date.now(),
      name,
      price,
      quantity,
    };
    setProducts((prev) => [...prev, newProduct]);
  };

  const updateQuantity = (id: number, delta: number) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, quantity: Math.max(0, p.quantity + delta) } : p
      )
    );
  };

  const deleteProduct = (id: number) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return { products, addProduct, updateQuantity, deleteProduct };
}
