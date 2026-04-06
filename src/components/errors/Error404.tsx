import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Error404 = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden flex items-center justify-center" style={{ background: "linear-gradient(135deg, hsl(240 40% 8%), hsl(260 50% 12%), hsl(220 45% 10%))" }}>
      {/* Star field */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 80 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.8 + 0.2,
              animation: `twinkle ${Math.random() * 3 + 2}s ease-in-out infinite ${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-16 px-6 max-w-5xl mx-auto">
        {/* Astronaut SVG */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-shrink-0"
        >
          <svg width="220" height="260" viewBox="0 0 220 260" className="astronaut-float">
            {/* Helmet */}
            <ellipse cx="110" cy="80" rx="50" ry="55" fill="hsl(240 20% 20%)" stroke="hsl(220 30% 40%)" strokeWidth="3" />
            <ellipse cx="110" cy="75" rx="35" ry="38" fill="hsl(220 60% 25%)" opacity="0.6" />
            <ellipse cx="100" cy="70" rx="8" ry="12" fill="hsl(217 91% 60%)" opacity="0.3" />
            {/* Body */}
            <rect x="75" y="130" width="70" height="70" rx="15" fill="hsl(240 15% 25%)" stroke="hsl(220 30% 40%)" strokeWidth="2" />
            {/* Backpack */}
            <rect x="145" y="135" width="25" height="55" rx="8" fill="hsl(240 20% 22%)" stroke="hsl(220 30% 35%)" strokeWidth="2" />
            {/* Arms */}
            <rect x="45" y="140" width="30" height="14" rx="7" fill="hsl(240 15% 25%)" stroke="hsl(220 30% 40%)" strokeWidth="2" transform="rotate(-15 60 147)" />
            <rect x="145" y="150" width="30" height="14" rx="7" fill="hsl(240 15% 25%)" stroke="hsl(220 30% 40%)" strokeWidth="2" transform="rotate(20 160 157)" />
            {/* Legs */}
            <rect x="82" y="195" width="18" height="40" rx="9" fill="hsl(240 15% 25%)" stroke="hsl(220 30% 40%)" strokeWidth="2" transform="rotate(-8 91 215)" />
            <rect x="118" y="195" width="18" height="40" rx="9" fill="hsl(240 15% 25%)" stroke="hsl(220 30% 40%)" strokeWidth="2" transform="rotate(8 127 215)" />
            {/* Visor reflection */}
            <ellipse cx="120" cy="72" rx="5" ry="8" fill="hsl(0 0% 100%)" opacity="0.15" />
          </svg>
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center md:text-left"
        >
          <h1 className="text-8xl md:text-9xl font-bold tracking-tight" style={{ color: "hsl(240 60% 70%)" }}>404</h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mt-2">Lost in Space</h2>
          <p className="text-muted-foreground mt-4 max-w-md text-lg">
            The page <code className="font-mono text-sm px-2 py-1 rounded" style={{ background: "hsl(240 30% 15%)", color: "hsl(217 91% 60%)" }}>{location.pathname}</code> doesn't exist in this universe.
          </p>
          <button
            onClick={() => navigate("/")}
            className="mt-8 px-8 py-3 rounded-xl font-semibold text-primary-foreground transition-all duration-300 hover:scale-105"
            style={{ background: "linear-gradient(135deg, hsl(240 60% 55%), hsl(260 70% 60%))" }}
          >
            Return to Earth
          </button>
        </motion.div>
      </div>

      <style>{`
        .astronaut-float {
          animation: astronautBob 4s ease-in-out infinite, astronautRotate 8s ease-in-out infinite;
        }
        @keyframes astronautBob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes astronautRotate {
          0%, 100% { transform: rotate(-3deg) translateY(0); }
          25% { transform: rotate(2deg) translateY(-10px); }
          50% { transform: rotate(-2deg) translateY(-20px); }
          75% { transform: rotate(3deg) translateY(-10px); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default Error404;
