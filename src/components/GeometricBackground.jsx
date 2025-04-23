import { motion } from 'framer-motion';

export default function GeometricBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 2 }}
        className="absolute inset-0"
      >
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 300 + 50}px`,
              height: `${Math.random() * 300 + 50}px`,
              background: `radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0) 70%)`,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              rotate: [`${Math.random() * 360}deg`, `${Math.random() * 360}deg`],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}
