import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import type { Variants } from 'framer-motion';

type CubicBezier = [number, number, number, number];

const ease1: CubicBezier = [0.25, 0.46, 0.45, 0.94];
const ease2: CubicBezier = [0.55, 0, 1, 0.45];

interface PageTransitionProps {
  children: ReactNode;
}

const variants: Variants = {
  initial: {
    opacity: 0,
    filter: 'blur(6px) brightness(0.7)',
    scale: 0.995,
  },
  animate: {
    opacity: 1,
    filter: 'blur(0px) brightness(1)',
    scale: 1,
    transition: { duration: 0.9, ease: ease1 },
  },
  exit: {
    opacity: 0,
    filter: 'blur(6px) brightness(0.7)',
    scale: 1.005,
    transition: { duration: 0.55, ease: ease2 },
  },
};

export function PageTransition({ children }: PageTransitionProps) {
  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{ minHeight: '100vh' }}
    >
      {children}
    </motion.div>
  );
}

export const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export const item: Variants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.65, ease: ease1 },
  },
};
