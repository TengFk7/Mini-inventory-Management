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
        <Navbar />
        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
          </Routes>
        </AnimatePresence>
      </div>
    </InventoryProvider>
  );
}

export default App;
