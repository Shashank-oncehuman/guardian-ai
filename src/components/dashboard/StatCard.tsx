import { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  title: string;
  value: number | string;
  change: number;
  icon: LucideIcon;
  glowClass?: string;
}

export default function StatCard({ title, value, change, icon: Icon, glowClass = "" }: StatCardProps) {
  const isPositive = change >= 0;
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, glowX: 50, glowY: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({
      rotateX: (0.5 - y) * 16,
      rotateY: (x - 0.5) * 16,
      glowX: x * 100,
      glowY: y * 100,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setTilt({ rotateX: 0, rotateY: 0, glowX: 50, glowY: 50 });
  }, []);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`glass-panel p-5 relative overflow-hidden cursor-default ${glowClass}`}
      style={{
        transform: `perspective(600px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale(${isHovered ? 1.03 : 1})`,
        transition: "transform 0.2s ease-out, box-shadow 0.3s ease-out",
        boxShadow: isHovered
          ? "0 8px 40px rgba(0,0,0,0.4), 0 0 20px hsl(217 91% 60% / 0.2)"
          : "0 4px 30px rgba(0,0,0,0.3)",
      }}
    >
      {/* Mouse-tracking glow */}
      <div
        className="absolute inset-0 pointer-events-none rounded-xl transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(circle at ${tilt.glowX}% ${tilt.glowY}%, hsl(217 91% 60% / 0.12), transparent 60%)`,
        }}
      />
      {/* Edge highlight */}
      <div
        className="absolute inset-0 pointer-events-none rounded-xl transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          border: "1px solid hsl(217 91% 60% / 0.2)",
        }}
      />

      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{title}</p>
          <p className="text-3xl font-bold mt-2">{typeof value === "number" ? value.toLocaleString() : value}</p>
        </div>
        <div
          className="p-2.5 rounded-lg bg-primary/10 transition-all duration-300"
          style={{
            boxShadow: isHovered ? "0 0 16px hsl(217 91% 60% / 0.3)" : "none",
            transform: isHovered ? "scale(1.1)" : "scale(1)",
          }}
        >
          <Icon className="w-5 h-5 text-primary" />
        </div>
      </div>
      <div className="relative flex items-center gap-1 mt-3">
        {isPositive ? (
          <TrendingUp className="w-3.5 h-3.5 text-success" />
        ) : (
          <TrendingDown className="w-3.5 h-3.5 text-danger" />
        )}
        <span className={`text-xs font-medium ${isPositive ? "text-success" : "text-danger"}`}>
          {isPositive ? "+" : ""}{change}%
        </span>
        <span className="text-xs text-muted-foreground ml-1">vs last month</span>
      </div>
    </motion.div>
  );
}
