import { Link } from 'react-router-dom';
import { HomeIcon, Brain, Terminal, InfoIcon } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Header() {
  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 bg-black/80 backdrop-blur-md z-50 border-b border-gray-800"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-3">
            <Brain size={32} className="text-white" />
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-white tracking-tight">
                Neura AI
              </span>
            </div>
          </Link>
          
          <nav className="flex items-center space-x-6">
            <Link to="/" className="flex items-center space-x-2 text-gray-300 hover:text-white p-2 rounded-lg hover:bg-gray-800">
              <HomeIcon size={20} />
              <span>Home</span>
            </Link>
            <Link to="/about" className="flex items-center space-x-2 text-gray-300 hover:text-white p-2 rounded-lg hover:bg-gray-800">
              <InfoIcon size={20} />
              <span>About</span>
            </Link>
            <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-gray-300 hover:text-white p-2 rounded-lg hover:bg-gray-800">
              <Terminal size={20} />
              <span>GitHub</span>
            </a>
          </nav>
        </div>
      </div>
    </motion.header>
  );
}
