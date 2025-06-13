// src/utils/PageWrapper.js
import { motion } from 'framer-motion';
import { useContext } from 'react';
import { SlideDirectionContext } from '../App';

export default function PageWrapper({ children }) {
  const direction = useContext(SlideDirectionContext);

  const variants = {
    initial: direction === 'down'
      ? { y: '100%', opacity: 0 }
      : { y: '-100%', opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.5 } },
    exit: direction === 'down'
      ? { y: '-100%', opacity: 0, transition: { duration: 0.5 } }
      : { y: '100%', opacity: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{
        position: 'absolute',
        width: '100%',
        height: '100vh',
        top: 0,
        left: 0,
        overflow: 'hidden',
      }}
    >
      {children}
    </motion.div>
  );
}
