import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { cinematicAudio } from "@/lib/cinematicAudio";

const Error403 = () => {
  const navigate = useNavigate();
  useEffect(() => { cinematicAudio.playError("403"); }, []);

  return (
    <div className="relative min-h-screen overflow-hidden flex items-center justify-center" style={{ background: "linear-gradient(135deg, hsl(0 40% 8%), hsl(350 50% 12%), hsl(10 45% 10%))" }}>
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 vault-gradient" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-center px-6 max-w-lg"
      >
        {/* Padlock SVG */}
        <div className="flex justify-center mb-8">
          <svg width="140" height="180" viewBox="0 0 140 180" className="padlock-shake">
            {/* Shackle */}
            <path
              d="M35 80 L35 50 C35 25 70 0 105 25 L105 80"
              fill="none"
              stroke="hsl(0 60% 45%)"
              strokeWidth="12"
              strokeLinecap="round"
            />
            {/* Body */}
            <rect x="15" y="75" width="110" height="90" rx="12" fill="hsl(0 50% 20%)" stroke="hsl(0 60% 35%)" strokeWidth="3" />
            {/* Keyhole */}
            <circle cx="70" cy="115" r="14" fill="hsl(0 70% 30%)" />
            <rect x="66" y="115" width="8" height="25" rx="4" fill="hsl(0 70% 30%)" />
            {/* Keyhole inner */}
            <circle cx="70" cy="115" r="6" fill="hsl(0 40% 12%)" />
          </svg>
        </div>

        <h1 className="text-8xl font-bold tracking-tight" style={{ color: "hsl(0 70% 55%)" }}>403</h1>
        <h2 className="text-2xl font-semibold text-foreground mt-2">Access Denied</h2>
        <p className="text-muted-foreground mt-4 text-lg">
          This vault is sealed. You don't have the clearance to access this resource.
        </p>
        <button
          onClick={() => navigate("/")}
          className="mt-8 px-8 py-3 rounded-xl font-semibold text-primary-foreground transition-all duration-300 hover:scale-105"
          style={{ background: "linear-gradient(135deg, hsl(0 60% 40%), hsl(350 70% 45%))" }}
        >
          Go Back Home
        </button>
      </motion.div>

      <style>{`
        .vault-gradient {
          background: radial-gradient(ellipse at 50% 50%, hsl(0 50% 15% / 0.5), transparent 70%);
          animation: vaultPulse 4s ease-in-out infinite;
        }
        @keyframes vaultPulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
        .padlock-shake {
          animation: padlockIdle 2s ease-in-out infinite, padlockDeny 4s ease-in-out infinite;
        }
        @keyframes padlockIdle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(1deg); }
          75% { transform: rotate(-1deg); }
        }
        @keyframes padlockDeny {
          0%, 70%, 100% { transform: translateX(0); }
          75% { transform: translateX(-8px); }
          80% { transform: translateX(8px); }
          85% { transform: translateX(-6px); }
          90% { transform: translateX(6px); }
          95% { transform: translateX(-3px); }
        }
      `}</style>
    </div>
  );
};

export default Error403;
