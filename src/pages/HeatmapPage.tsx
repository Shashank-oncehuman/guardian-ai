import { useState } from "react";
import { motion } from "framer-motion";
import AppLayout from "@/components/layout/AppLayout";
import RiskBadge from "@/components/dashboard/RiskBadge";
import { heatmapRegions, RiskLevel } from "@/data/mockData";

const riskColors: Record<RiskLevel, string> = {
  low: "bg-success",
  medium: "bg-warning",
  high: "bg-danger",
};

export default function HeatmapPage() {
  const [selected, setSelected] = useState<typeof heatmapRegions[0] | null>(null);
  const sorted = [...heatmapRegions].sort((a, b) => b.complaints - a.complaints);

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Corruption Heatmap</h1>
          <p className="text-sm text-muted-foreground mt-1">Regional corruption intensity visualization</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Map placeholder + region grid */}
          <div className="lg:col-span-2 glass-panel p-5">
            <h3 className="text-sm font-semibold mb-4">India — Regional Corruption Intensity</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {sorted.map((region, i) => {
                const intensity = Math.min(region.complaints / 250, 1);
                return (
                  <motion.button
                    key={region.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => setSelected(region)}
                    className={`relative p-4 rounded-xl border transition-all text-left ${
                      selected?.name === region.name ? "border-primary glow-primary" : "border-border/30 hover:border-border"
                    }`}
                    style={{
                      background: `linear-gradient(135deg, hsl(${region.riskLevel === "high" ? "0 72% 60%" : region.riskLevel === "medium" ? "45 93% 55%" : "170 60% 45%"} / ${0.1 + intensity * 0.2}), transparent)`,
                    }}
                  >
                    <div className={`w-3 h-3 rounded-full ${riskColors[region.riskLevel]} mb-2`} />
                    <p className="text-sm font-semibold">{region.name}</p>
                    <p className="text-xs text-muted-foreground">{region.complaints} complaints</p>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Detail panel */}
          <div className="glass-panel p-5">
            <h3 className="text-sm font-semibold mb-4">Region Details</h3>
            {selected ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-bold">{selected.name}</h4>
                  <RiskBadge level={selected.riskLevel} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-secondary/50 text-center">
                    <p className="text-xl font-bold">{selected.complaints}</p>
                    <p className="text-[10px] text-muted-foreground">Complaints</p>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/50 text-center">
                    <p className="text-xl font-bold">{selected.officers}</p>
                    <p className="text-[10px] text-muted-foreground">Flagged Officers</p>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/50 text-center">
                    <p className="text-xl font-bold">{selected.projects}</p>
                    <p className="text-[10px] text-muted-foreground">Suspicious Projects</p>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary/50 text-center">
                    <p className="text-xl font-bold text-danger">{selected.riskLevel === "high" ? "🔴" : selected.riskLevel === "medium" ? "🟡" : "🟢"}</p>
                    <p className="text-[10px] text-muted-foreground">Risk Level</p>
                  </div>
                </div>
              </motion.div>
            ) : (
              <p className="text-sm text-muted-foreground">Click a region to view details</p>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
