import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutDashboard, Package, Activity } from 'lucide-react';

function LiveClock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const pad = (n: number) => String(n).padStart(2, '0');
  return (
    <div className="text-right">
      <div className="font-mono-tech text-cyan-300 text-xl tracking-[0.15em] tabular-nums">
        {pad(time.getHours())}:{pad(time.getMinutes())}:{pad(time.getSeconds())}
      </div>
      <div className="text-[10px] text-cyan-600 tracking-widest uppercase mt-0.5">
        {time.toLocaleDateString('th-TH', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}
      </div>
    </div>
  );
}

export function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="sticky top-0 z-50"
      style={{
        background: 'rgba(3, 10, 22, 0.92)',
        borderBottom: '1px solid rgba(0, 184, 212, 0.2)',
        backdropFilter: 'blur(20px)',
      }}
    >
      {/* Top accent line */}
      <div className="h-[2px] w-full" style={{ background: 'linear-gradient(90deg, transparent, #00d4ff 30%, #00b8d4 70%, transparent)' }} />

      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between gap-6">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center gap-3 shrink-0"
        >
          <div className="relative w-8 h-8 flex items-center justify-center">
            <div className="absolute inset-0 rounded" style={{ border: '1px solid rgba(0,212,255,0.5)', background: 'rgba(0,212,255,0.05)' }} />
            <Package size={16} className="text-cyan-400 relative z-10" />
          </div>
          <div>
            <span className="font-bold text-white text-base tracking-widest uppercase">Mini </span>
            <span className="font-bold text-cyan-400 text-base tracking-widest uppercase">Inventory </span>
            <span className="font-bold text-green-500 text-base tracking-widest uppercase">Management</span>
          </div>
          <div className="flex items-center gap-1.5 ml-2">
            <Activity size={10} className="text-emerald-400 pulse-glow" />
            <span className="text-[10px] text-emerald-400 font-mono-tech tracking-widest">ONLINE</span>
          </div>
        </motion.div>

        {/* Nav Links */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center gap-1"
        >
          {[
            { to: '/', label: 'DASHBOARD', icon: LayoutDashboard, end: true },
            { to: '/products', label: 'สินค้า', icon: Package, end: false },
          ].map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `relative flex items-center gap-2 px-5 py-2 text-xs font-semibold tracking-widest transition-all duration-200 ${isActive
                  ? 'text-white'
                  : 'text-slate-500 hover:text-cyan-400'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0"
                      style={{
                        background: 'rgba(0,212,255,0.08)',
                        border: '1px solid rgba(0,212,255,0.35)',
                        borderRadius: '2px',
                      }}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <Icon size={13} className={isActive ? 'text-cyan-400' : ''} />
                  <span className="relative z-10">{label}</span>
                </>
              )}
            </NavLink>
          ))}
        </motion.div>

        {/* Clock */}
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="shrink-0"
        >
          <LiveClock />
        </motion.div>
      </div>
    </motion.nav>
  );
}
