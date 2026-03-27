import { motion } from 'framer-motion';
import type { Product } from '../types';
import { Trash2, Plus, Minus, Cpu } from 'lucide-react';
import { item } from './PageTransition';

interface ProductCardProps {
  product: Product;
  onUpdateQuantity: (id: number, delta: number) => void;
  onDelete: (id: number) => void;
}

export function ProductCard({ product, onUpdateQuantity, onDelete }: ProductCardProps) {
  const isOutOfStock = product.quantity === 0;
  const isLow = product.quantity > 0 && product.quantity <= 3;

  return (
    <motion.div
      variants={item}
      layout
      exit={{ opacity: 0, scale: 0.88, filter: 'blur(6px)', transition: { duration: 0.25 } }}
      className={`panel panel-corners relative overflow-hidden transition-all duration-300 ${
        isOutOfStock
          ? 'glow-red'
          : isLow
          ? 'glow-amber'
          : 'glow-cyan'
      }`}
    >
      {/* Background trace lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: isOutOfStock
            ? 'repeating-linear-gradient(-45deg, rgba(239,68,68,0.15) 0px, rgba(239,68,68,0.15) 1px, transparent 1px, transparent 8px)'
            : 'none',
        }}
      />

      <div className="relative p-5 flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-1">
              <Cpu size={10} className={isOutOfStock ? 'text-red-400' : 'text-cyan-500'} />
              <span className="font-mono-tech text-[9px] tracking-widest text-slate-500">
                ID:{String(product.id).padStart(4, '0')}
              </span>
            </div>
            <h3 className={`font-semibold text-sm leading-tight truncate ${
              isOutOfStock ? 'text-red-300' : 'text-white'
            }`}>
              {product.name}
            </h3>
          </div>

          {/* Status badge */}
          {isOutOfStock ? (
            <span className="badge-warn text-[9px] font-mono-tech px-2 py-0.5 rounded-sm tracking-widest shrink-0">
              OUT
            </span>
          ) : isLow ? (
            <span className="text-[9px] font-mono-tech px-2 py-0.5 rounded-sm tracking-widest shrink-0"
              style={{ background: 'rgba(251,146,60,0.1)', border: '1px solid rgba(251,146,60,0.4)', color: '#fb923c' }}>
              LOW
            </span>
          ) : (
            <span className="badge-ok text-[9px] font-mono-tech px-2 py-0.5 rounded-sm tracking-widest shrink-0">
              OK
            </span>
          )}
        </div>

        <hr className="hud-divider" />

        {/* Stats row */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-[9px] text-slate-500 uppercase tracking-widest mb-1">ราคา/หน่วย</p>
            <p className={`font-mono-tech font-bold text-lg tabular-nums ${
              isOutOfStock ? 'text-red-400' : 'text-cyan-300'
            }`}>
              ฿{product.price.toLocaleString()}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[9px] text-slate-500 uppercase tracking-widest mb-1">สต๊อก</p>
            <p className={`font-mono-tech font-bold text-3xl tabular-nums ${
              isOutOfStock ? 'text-red-400' : isLow ? 'text-amber-400' : 'text-white'
            }`}>
              {product.quantity}
            </p>
          </div>
        </div>

        {/* Bar indicator */}
        <div className="h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
          <motion.div
            className="h-full rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(100, (product.quantity / 20) * 100)}%` }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              background: isOutOfStock
                ? 'rgba(239,68,68,0.6)'
                : isLow
                ? 'linear-gradient(90deg, #f59e0b, #fb923c)'
                : 'linear-gradient(90deg, #00b8d4, #00d4ff)',
            }}
          />
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={() => onUpdateQuantity(product.id, -1)}
            disabled={isOutOfStock}
            className="btn-hud flex-1 flex items-center justify-center py-2 rounded-sm text-xs font-semibold tracking-wider transition-all duration-150 disabled:opacity-25 disabled:cursor-not-allowed"
            aria-label="ลดจำนวน"
          >
            <Minus size={13} />
          </button>
          <button
            onClick={() => onUpdateQuantity(product.id, 1)}
            className="btn-hud btn-hud-primary flex-1 flex items-center justify-center py-2 rounded-sm text-xs font-semibold tracking-wider transition-all duration-150"
            aria-label="เพิ่มจำนวน"
          >
            <Plus size={13} />
          </button>
          <button
            onClick={() => onDelete(product.id)}
            className="btn-danger w-9 h-9 flex items-center justify-center rounded-sm transition-all duration-150 shrink-0"
            aria-label="ลบสินค้า"
          >
            <Trash2 size={13} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
