import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useInventoryContext } from '../context/InventoryContext';
import { PageTransition, container, item } from '../components/PageTransition';
import { ProductCard } from '../components/ProductCard';
import { ProductForm } from '../components/ProductForm';
import { SearchBar } from '../components/SearchBar';
import { Package, Database } from 'lucide-react';

export function Products() {
  const { products, addProduct, updateQuantity, deleteProduct } = useInventoryContext();
  const [search, setSearch] = useState('');

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <PageTransition>
      <div className="grid-bg min-h-screen">
        <div className="grid-wave-overlay" />

        <div className="max-w-7xl mx-auto px-6 py-8">

          {/* Header */}
          <motion.div
            variants={item}
            initial="hidden"
            animate="show"
            className="mb-8 flex items-end justify-between"
          >
            <div>
              <h1 className="text-3xl font-bold text-white tracking-wide">Product </h1>
            </div>

            <motion.div
              variants={item}
              className="panel px-4 py-2.5 flex items-center gap-3"
              style={{ minWidth: 180 }}
            >
              <Database size={14} className="text-cyan-500" />
              <div>
                <p className="text-[9px] font-mono-tech text-slate-500 tracking-widest">TOTAL RECORDS</p>
                <p className="font-mono-tech text-lg font-bold text-white tabular-nums">{String(products.length).padStart(4, '0')}</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Form */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex flex-col gap-4 mb-6"
          >
            <ProductForm onAdd={addProduct} />
            <SearchBar value={search} onChange={setSearch} />
          </motion.div>

          {/* Filter info bar */}
          <motion.div
            variants={item}
            initial="hidden"
            animate="show"
            custom={0.25}
            className="flex items-center justify-between mb-4"
          >
            <div className="flex items-center gap-2">
              <div className="w-1 h-3 rounded-full bg-cyan-600" />
              <p className="text-[10px] font-mono-tech text-slate-500 tracking-widest">
                SHOWING{' '}
                <span className="text-cyan-400">{String(filtered.length).padStart(2, '0')}</span>
                {' '}/{' '}
                <span className="text-slate-400">{String(products.length).padStart(2, '0')}</span>
                {' '}RECORDS
                {search && <span className="text-slate-600"> · FILTER: "{search}"</span>}
              </p>
            </div>
            {search && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSearch('')}
                className="text-[10px] font-mono-tech text-cyan-600 hover:text-cyan-400 tracking-widest transition-colors"
              >
                [ CLEAR FILTER ]
              </motion.button>
            )}
          </motion.div>

          {/* Product Grid */}
          {filtered.length > 0 ? (
            <AnimatePresence mode="popLayout">
              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
              >
                {filtered.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onUpdateQuantity={updateQuantity}
                    onDelete={deleteProduct}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="panel flex flex-col items-center justify-center py-24 text-slate-600"
            >
              <Package size={40} strokeWidth={1} className="mb-4 text-slate-700" />
              <p className="font-mono-tech text-xs tracking-widest uppercase">
                {search ? `[ NO MATCH: "${search}" ]` : '[ NO DATA ]'}
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
