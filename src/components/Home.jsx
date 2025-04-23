import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Brain } from 'lucide-react';
import GeometricBackground from './GeometricBackground';

export default function Home() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative">
      <GeometricBackground />
      <motion.div 
        className="text-center space-y-8 z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex flex-col items-center space-y-4">
          <Brain size={64} className="text-white" />
          <h1 className="text-6xl font-bold text-white">
            Neura AI
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl">
            Experience the next generation of AI-powered conversations. 
            Powered by Gemini Pro for enhanced natural language understanding.
          </p>
        </div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            to="/chat"
            className="bg-white text-black px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors text-lg inline-block font-medium"
          >
            Start Chatting
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
