import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function CinematicLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center"
        >
          {/* Animated rings */}
          <div className="relative w-24 h-24 mb-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border border-primary/30"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute inset-2 rounded-full border border-accent/40"
            />
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <img src="/logo.png" alt="" className="w-10 h-10 rounded-lg" />
            </motion.div>
          </div>

          {/* Cinematic text reveal */}
          <motion.h1
            initial={{ opacity: 0, letterSpacing: "0.5em", filter: "blur(10px)" }}
            animate={{ opacity: 1, letterSpacing: "0.2em", filter: "blur(0px)" }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="text-lg font-bold tracking-widest text-gradient-primary uppercase"
          >
            IntegrityAI
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0.6, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-xs text-muted-foreground mt-2 tracking-[0.3em] uppercase"
          >
            Intelligence System
          </motion.p>

          {/* Scan line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
            className="w-48 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent mt-6"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
