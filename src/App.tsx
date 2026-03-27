import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Dashboard } from './pages/Dashboard';
import { Products } from './pages/Products';
import { InventoryProvider } from './context/InventoryContext';

function App() {
  const location = useLocation();

  return (
    <InventoryProvider>
      <div style={{ minHeight: '100vh', background: '#050c17' }}>

        {/* ── Persistent background (never fades on route change) ── */}
        <div
          className="grid-bg"
          style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
        />
        <div className="grid-wave-overlay" />

        {/* ── App shell (sits above background) ── */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <Navbar />
          <AnimatePresence mode="wait" initial={false}>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/products" element={<Products />} />
            </Routes>
          </AnimatePresence>
        </div>

      </div>
    </InventoryProvider>
  );
}

export default App;
