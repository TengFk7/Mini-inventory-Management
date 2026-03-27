import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInventoryContext } from '../context/InventoryContext';
import { PageTransition, container, item } from '../components/PageTransition';
import {
  Package, DollarSign, AlertTriangle, TrendingUp,
  Activity, ChevronRight,
} from 'lucide-react';

function AnimatedNumber({ value }: { value: number }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const step = Math.ceil(value / (duration / 16));
    const timer = setInterval(() => {
      start = Math.min(start + step, value);
      setDisplay(start);
      if (start >= value) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [value]);
  return <>{display.toLocaleString()}</>;
}

interface StatCardProps {
  label: string;
  value: number | string;
  rawValue?: number;
  sub: string;
  icon: React.ElementType;
  color: string;
  glowClass: string;
  prefix?: string;
}

function StatCard({ label, value, rawValue, sub, icon: Icon, color, glowClass, prefix = '' }: StatCardProps) {
  return (
    <motion.div
      variants={item}
      className={`panel panel-corners p-5 flex flex-col gap-3 transition-all duration-300 cursor-default ${glowClass}`}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div
          className="w-9 h-9 rounded-sm flex items-center justify-center shrink-0"
          style={{ background: color, boxShadow: `0 0 16px ${color}44` }}
        >
          <Icon size={16} className="text-white" />
        </div>
        <Activity size={10} className="text-slate-600 pulse-glow" />
      </div>

      {/* Value */}
      <div>
        <p className="text-[9px] text-slate-500 uppercase tracking-widest mb-1">{label}</p>
        <p className="font-mono-tech font-bold text-2xl text-white tabular-nums">
          {prefix}
          {rawValue !== undefined ? <AnimatedNumber value={rawValue} /> : value}
        </p>
        <p className="text-[10px] text-slate-600 mt-1">{sub}</p>
      </div>

      {/* Bottom accent */}
      <div className="h-[1px]" style={{ background: `linear-gradient(90deg, ${color}, transparent)` }} />
    </motion.div>
  );
}

export function Dashboard() {
  const { products } = useInventoryContext();

  const totalItems = products.length;
  const totalValue = products.reduce((sum, p) => sum + p.price * p.quantity, 0);
  const outOfStock = products.filter((p) => p.quantity === 0).length;
  const totalUnits = products.reduce((sum, p) => sum + p.quantity, 0);

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
              <h1 className="text-3xl font-bold text-white tracking-wide">DASHBOARD</h1>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 pulse-glow" />
                <span className="text-[10px] text-emerald-400 font-mono-tech tracking-widest">SYSTEM ONLINE</span>
              </div>
              <p className="text-[9px] text-slate-600 mt-1 font-mono-tech">
                {products.length} ITEMS LOADED
              </p>
            </div>
          </motion.div>

          {/* Stat Cards */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
          >
            <StatCard
              label="ชนิดสินค้าทั้งหมด"
              value={totalItems}
              rawValue={totalItems}
              sub="รายการในระบบ"
              icon={Package}
              color="rgba(0,180,224,0.9)"
              glowClass="glow-cyan"
            />
            <StatCard
              label="มูลค่ารวมของสต๊อก"
              value={`฿${totalValue.toLocaleString()}`}
              rawValue={totalValue}
              prefix="฿"
              sub="price × quantity ทุกรายการ"
              icon={DollarSign}
              color="rgba(52,211,153,0.9)"
              glowClass="glow-emerald"
            />
            <StatCard
              label="สินค้าหมดสต๊อก"
              value={outOfStock}
              rawValue={outOfStock}
              sub="รายการที่ quantity = 0"
              icon={AlertTriangle}
              color="rgba(239,68,68,0.9)"
              glowClass={outOfStock > 0 ? 'glow-red' : 'glow-cyan-sm'}
            />
            <StatCard
              label="หน่วยสินค้าทั้งหมด"
              value={totalUnits}
              rawValue={totalUnits}
              sub="จำนวนชิ้นรวมทั้งหมด"
              icon={TrendingUp}
              color="rgba(251,146,60,0.9)"
              glowClass="glow-amber"
            />
          </motion.div>

          {/* Table */}
          <motion.div
            variants={item}
            initial="hidden"
            animate="show"
            custom={0.4}
            className="panel panel-corners glow-cyan-sm overflow-hidden"
          >
            {/* Table Header */}
            <div className="flex items-center justify-between px-6 py-3" style={{ borderBottom: '1px solid rgba(0,184,212,0.12)' }}>
              <div className="flex items-center gap-2">
                <div className="w-1 h-3 rounded-full bg-cyan-500" />
                <h2 className="text-[10px] font-semibold tracking-widest uppercase text-cyan-500">รายละเอียดสินค้า</h2>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-glow" />
                <span className="text-[9px] font-mono-tech text-slate-500 tracking-widest">LIVE DATA</span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr style={{ background: 'rgba(0,20,40,0.6)' }}>
                    {['#', 'ชื่อสินค้า', 'ราคา/หน่วย', 'จำนวนสต๊อก', 'มูลค่า', 'สถานะ'].map((h) => (
                      <th
                        key={h}
                        className="px-5 py-3 text-left font-mono-tech text-[9px] tracking-widest uppercase"
                        style={{ color: 'rgba(0,184,212,0.6)', borderBottom: '1px solid rgba(0,184,212,0.1)' }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {products.map((p, i) => (
                    <motion.tr
                      key={p.id}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.35, delay: 0.5 + i * 0.06 }}
                      className="transition-colors duration-200"
                      style={{
                        background: p.quantity === 0
                          ? 'rgba(239,68,68,0.05)'
                          : 'transparent',
                        borderBottom: '1px solid rgba(0,184,212,0.07)',
                      }}
                      whileHover={{ background: 'rgba(0,212,255,0.04)' } as never}
                    >
                      <td className="px-5 py-3.5 font-mono-tech text-slate-600">{String(i + 1).padStart(2, '0')}</td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2">
                          <ChevronRight size={10} className={p.quantity === 0 ? 'text-red-500' : 'text-cyan-600'} />
                          <span className={`font-semibold ${p.quantity === 0 ? 'text-red-300' : 'text-white'}`}>
                            {p.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 font-mono-tech text-cyan-300 tabular-nums">
                        ฿{p.price.toLocaleString()}
                      </td>
                      <td className="px-5 py-3.5">
                        <span className={`font-mono-tech font-bold text-base tabular-nums ${p.quantity === 0 ? 'text-red-400' : p.quantity <= 3 ? 'text-amber-400' : 'text-white'
                          }`}>
                          {p.quantity}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 font-mono-tech text-emerald-400 tabular-nums font-semibold">
                        ฿{(p.price * p.quantity).toLocaleString()}
                      </td>
                      <td className="px-5 py-3.5">
                        {p.quantity === 0 ? (
                          <span className="badge-warn text-[9px] font-mono-tech px-2.5 py-0.5 rounded-sm tracking-widest">
                            สินค้าหมด
                          </span>
                        ) : (
                          <span className="badge-ok text-[9px] font-mono-tech px-2.5 py-0.5 rounded-sm tracking-widest">
                            พร้อมขาย
                          </span>
                        )}
                      </td>
                    </motion.tr>
                  ))}
                  {products.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-5 py-16 text-center text-slate-600 font-mono-tech text-xs tracking-widest">
                        [ NO DATA ]
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
