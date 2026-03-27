import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { PlusCircle, Tag, DollarSign, Hash } from 'lucide-react';
import { item } from './PageTransition';

interface ProductFormProps {
  onAdd: (name: string, price: number, quantity: number) => void;
}

export function ProductForm({ onAdd }: ProductFormProps) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [flash, setFlash] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !price || !quantity) return;
    onAdd(name.trim(), parseFloat(price), parseInt(quantity));
    setName('');
    setPrice('');
    setQuantity('');
    setFlash(true);
    setTimeout(() => setFlash(false), 600);
  };

  return (
    <motion.div
      variants={item}
      className={`panel panel-corners p-5 transition-all duration-300 ${flash ? 'glow-emerald' : 'glow-cyan-sm'}`}
    >
      <div className="flex items-center gap-2 mb-4">
        <PlusCircle size={14} className="text-cyan-400" />
        <h2 className="text-xs font-semibold tracking-widest uppercase text-cyan-400">
          เพิ่มรายการสินค้าใหม่
        </h2>
        <div className="flex-1 h-[1px]" style={{ background: 'linear-gradient(90deg, rgba(0,212,255,0.3), transparent)' }} />
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        {/* Name */}
        <div className="relative flex-[2]">
          <Tag size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-600 pointer-events-none" />
          <input
            type="text"
            placeholder="ชื่อสินค้า"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="input-hud w-full pl-8 pr-3 py-2.5 rounded-sm text-sm"
          />
        </div>
        {/* Price */}
        <div className="relative flex-1">
          <DollarSign size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-600 pointer-events-none" />
          <input
            type="number"
            placeholder="ราคา (฿)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            min={0}
            step="0.01"
            required
            className="input-hud w-full pl-8 pr-3 py-2.5 rounded-sm text-sm font-mono-tech"
          />
        </div>
        {/* Quantity */}
        <div className="relative flex-1">
          <Hash size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-600 pointer-events-none" />
          <input
            type="number"
            placeholder="จำนวน"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            min={0}
            required
            className="input-hud w-full pl-8 pr-3 py-2.5 rounded-sm text-sm font-mono-tech"
          />
        </div>
        {/* Submit */}
        <button
          type="submit"
          className="btn-hud btn-hud-primary flex items-center justify-center gap-2 px-6 py-2.5 rounded-sm text-xs font-bold tracking-widest uppercase whitespace-nowrap"
        >
          <PlusCircle size={14} />
          เพิ่มสินค้า
        </button>
      </form>
    </motion.div>
  );
}
