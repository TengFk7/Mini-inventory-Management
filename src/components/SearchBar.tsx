import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { item } from './PageTransition';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <motion.div variants={item} className="relative">
      <Search
        size={14}
        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-cyan-600 pointer-events-none"
      />
      <input
        type="text"
        placeholder="ค้นหาสินค้า..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="input-hud w-full pl-10 pr-10 py-2.5 rounded-sm text-sm"
      />
      {value && (
        <motion.button
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.7 }}
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-cyan-600 hover:text-cyan-300 transition-colors"
        >
          <X size={14} />
        </motion.button>
      )}
    </motion.div>
  );
}
