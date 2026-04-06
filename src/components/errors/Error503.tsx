import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Error503 = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden flex items-center justify-center" style={{ background: "linear-gradient(135deg, hsl(200 40% 8%), hsl(190 50% 12%), hsl(210 45% 10%))" }}>
      {/* Wave gradient */}
      <div className="absolute inset-0 wave-bg" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-center px-6 max-w-lg"
      >
        {/* Crane SVG */}
        <div className="flex justify-center mb-6">
          <svg width="180" height="180" viewBox="0 0 180 180">
            {/* Base */}
            <rect x="50" y="160" width="80" height="12" rx="3" fill="hsl(200 40% 30%)" />
            {/* Vertical beam */}
            <rect x="85" y="30" width="10" height="135" fill="hsl(200 50% 35%)" />
            {/* Horizontal arm */}
            <rect x="60" y="28" width="100" height="8" rx="2" fill="hsl(200 50% 40%)" />
            {/* Support diagonal */}
            <line x1="95" y1="36" x2="140" y2="75" stroke="hsl(200 40% 35%)" strokeWidth="3" />
            {/* Hook cable + hook */}
            <g className="crane-swing" style={{ transformOrigin: "145px 32px" }}>
              <line x1="145" y1="36" x2="145" y2="100" stroke="hsl(200 30% 50%)" strokeWidth="2" />
              <path d="M138 100 Q145 108 152 100" fill="none" stroke="hsl(190 60% 50%)" strokeWidth="3" strokeLinecap="round" />
              <circle cx="145" cy="100" r="3" fill="hsl(190 60% 50%)" />
            </g>
            {/* Warning stripes on base */}
            {[0, 1, 2, 3].map((i) => (
              <rect key={i} x={55 + i * 18} y="162" width="8" height="8" fill="hsl(45 90% 55%)" opacity="0.6" />
            ))}
          </svg>
        </div>

        <h1 className="text-8xl font-bold tracking-tight" style={{ color: "hsl(190 70% 55%)" }}>503</h1>
        <h2 className="text-2xl font-semibold text-foreground mt-2">Under Maintenance</h2>
        <p className="text-muted-foreground mt-4 text-lg">
          We're performing scheduled maintenance. We'll be back shortly.
        </p>

        {/* Progress bar */}
        <div className="mt-8 mx-auto max-w-xs">
          <div className="h-2 rounded-full overflow-hidden" style={{ background: "hsl(200 30% 15%)" }}>
            <div className="h-full rounded-full progress-animate" style={{ background: "linear-gradient(90deg, hsl(190 60% 45%), hsl(200 70% 55%))" }} />
          </div>
          <p className="text-xs text-muted-foreground mt-2">Estimated time: coming back soon</p>
        </div>

        <div className="flex gap-4 justify-center mt-8">
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 border"
            style={{ borderColor: "hsl(190 60% 45%)", color: "hsl(190 70% 55%)" }}
          >
            Try Again
          </button>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 rounded-xl font-semibold text-primary-foreground transition-all duration-300 hover:scale-105"
            style={{ background: "linear-gradient(135deg, hsl(190 60% 40%), hsl(200 70% 50%))" }}
          >
            Go Home
          </button>
        </div>
      </motion.div>

      <style>{`
        .wave-bg {
          background: 
            radial-gradient(ellipse at 30% 80%, hsl(190 50% 15% / 0.5), transparent 60%),
            radial-gradient(ellipse at 70% 20%, hsl(200 50% 15% / 0.4), transparent 60%);
          animation: wavePulse 6s ease-in-out infinite;
        }
        @keyframes wavePulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        .crane-swing {
          animation: craneSwing 3s ease-in-out infinite;
        }
        @keyframes craneSwing {
          0%, 100% { transform: rotate(8deg); }
          50% { transform: rotate(-8deg); }
        }
        .progress-animate {
          animation: progressLoop 3s ease-in-out infinite;
        }
        @keyframes progressLoop {
          0% { width: 10%; }
          50% { width: 70%; }
          100% { width: 10%; }
        }
      `}</style>
    </div>
  );
};

export default Error503;
