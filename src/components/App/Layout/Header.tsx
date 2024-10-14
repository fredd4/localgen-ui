import { motion } from 'framer-motion';

const Header = () => (
  <header className="mb-8">
    <motion.h1
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <span className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
        DALL-E Web App
      </span>
    </motion.h1>
  </header>
);

export default Header;
