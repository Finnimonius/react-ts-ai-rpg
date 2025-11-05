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
        <div id="loader">
          <div className="ls-particles ls-part-1"></div>
          <div className="ls-particles ls-part-2"></div>
          <div className="ls-particles ls-part-3"></div>
          <div className="ls-particles ls-part-4"></div>
          <div className="ls-particles ls-part-5"></div>
          <div className="lightsaber ls-left ls-green"></div>
          <div className="lightsaber ls-right ls-red"></div>
        </div>
      </motion.div>
    </motion.div>
  );
};