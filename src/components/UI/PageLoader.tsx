import { motion } from 'framer-motion';
import './PageLoader.css'

export default function PageLoader() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="page-loader-overlay"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="page-loader-content"
      >
        <div className="loader">
          <div className="progress" data-percentage="100%"></div>
        </div>
      </motion.div>
    </motion.div>
  );
};