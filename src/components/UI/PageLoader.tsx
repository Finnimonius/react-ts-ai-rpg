import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import './PageLoader.css'

// Простой вариант - всегда показываем лоадер
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
        <Spin 
          indicator={<LoadingOutlined className="page-loader-spinner" spin style={{ fontSize: '3vh'}}/>}
        />
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="page-loader-text"
        >
          Загружаем самую крутую игру...
        </motion.p>
      </motion.div>
    </motion.div>
  );
};