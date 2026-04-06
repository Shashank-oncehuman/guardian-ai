import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Error500 = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden flex items-center justify-center" style={{ background: "linear-gradient(135deg, hsl(280 40% 8%), hsl(320 50% 12%), hsl(270 45% 10%))" }}>
      {/* Glitch overlay */}
      <div className="absolute inset-0 glitch-overlay pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-center px-6 max-w-lg glass-panel p-10"
      >
        {/* Gears SVG */}
        <div className="flex justify-center mb-6 relative" style={{ height: 140 }}>
          <svg width="200" height="140" viewBox="0 0 200 140">
            {/* Main gear */}
            <g className="gear-spin" style={{ transformOrigin: "70px 70px" }}>
              <circle cx="70" cy="70" r="30" fill="none" stroke="hsl(280 60% 50%)" strokeWidth="8" />
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                <rect
                  key={angle}
                  x="66"
                  y="32"
                  width="8"
                  height="16"
                  rx="3"
                  fill="hsl(280 60% 50%)"
                  transform={`rotate(${angle} 70 70)`}
                />
              ))}
              <circle cx="70" cy="70" r="10" fill="hsl(280 40% 15%)" />
            </g>

            {/* Secondary gear */}
            <g className="gear-spin-reverse" style={{ transformOrigin: "140px 55px" }}>
              <circle cx="140" cy="55" r="22" fill="none" stroke="hsl(320 60% 50%)" strokeWidth="6" />
              {[0, 60, 120, 180, 240, 300].map((angle) => (
                <rect
                  key={angle}
                  x="137"
                  y="27"
                  width="6"
                  height="12"
                  rx="3"
                  fill="hsl(320 60% 50%)"
                  transform={`rotate(${angle} 140 55)`}
                />
              ))}
              <circle cx="140" cy="55" r="7" fill="hsl(320 40% 15%)" />
            </g>

            {/* Broken gear piece falling */}
            <g className="gear-fall">
              <rect x="155" y="30" width="6" height="12" rx="3" fill="hsl(320 60% 50%)" opacity="0.7" />
            </g>
          </svg>
        </div>

        <h1 className="text-8xl font-bold tracking-tight glitch-text" style={{ color: "hsl(280 70% 60%)" }}>500</h1>
        <h2 className="text-2xl font-semibold text-foreground mt-2">Broken Machine</h2>
        <p className="text-muted-foreground mt-4 text-lg">
          Something went wrong on our end. Our gears have jammed.
        </p>
        <div className="flex gap-4 justify-center mt-8">
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 border"
            style={{ borderColor: "hsl(280 60% 50%)", color: "hsl(280 70% 65%)" }}
          >
            Try Again
          </button>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 rounded-xl font-semibold text-primary-foreground transition-all duration-300 hover:scale-105"
            style={{ background: "linear-gradient(135deg, hsl(280 60% 45%), hsl(320 70% 50%))" }}
          >
            Go Home
          </button>
        </div>
      </motion.div>

      <style>{`
        .glitch-overlay {
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            hsl(280 50% 20% / 0.05) 2px,
            hsl(280 50% 20% / 0.05) 4px
          );
          animation: glitchFlicker 3s steps(10) infinite;
        }
        @keyframes glitchFlicker {
          0%, 90%, 100% { opacity: 0.3; }
          92% { opacity: 0.6; transform: translateX(2px); }
          94% { opacity: 0.2; transform: translateX(-2px); }
          96% { opacity: 0.5; transform: translateX(1px); }
        }
        .gear-spin { animation: gearSpin 4s linear infinite; }
        .gear-spin-reverse { animation: gearSpin 3s linear infinite reverse; }
        @keyframes gearSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .gear-fall {
          animation: gearFall 3s ease-in infinite;
        }
        @keyframes gearFall {
          0%, 60% { transform: translate(0, 0) rotate(0deg); opacity: 0; }
          65% { opacity: 0.7; }
          100% { transform: translate(10px, 80px) rotate(180deg); opacity: 0; }
        }
        .glitch-text {
          animation: glitchText 4s ease-in-out infinite;
        }
        @keyframes glitchText {
          0%, 85%, 100% { text-shadow: none; }
          87% { text-shadow: -3px 0 hsl(320 70% 50%), 3px 0 hsl(180 70% 50%); }
          90% { text-shadow: 3px 0 hsl(320 70% 50%), -3px 0 hsl(180 70% 50%); }
          93% { text-shadow: -2px 0 hsl(320 70% 50%), 2px 0 hsl(180 70% 50%); }
        }
      `}</style>
    </div>
  );
};

export default Error500;
