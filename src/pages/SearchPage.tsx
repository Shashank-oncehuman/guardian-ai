import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, User, Building, Briefcase, Landmark } from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";
import RiskBadge from "@/components/dashboard/RiskBadge";
import RiskScoreGauge from "@/components/dashboard/RiskScoreGauge";
import { entities, Entity } from "@/data/mockData";

const typeIcons: Record<string, typeof User> = {
  officer: User,
  politician: Landmark,
  contractor: Briefcase,
  company: Building,
};

function EntityProfile({ entity }: { entity: Entity }) {
  const factors = [
    { label: "Complaint History", value: entity.complaints, max: 25, weight: 25 },
    { label: "Contract Irregularities", value: entity.contracts > 40 ? 30 : entity.contracts > 20 ? 15 : 5, max: 30, weight: 30 },
    { label: "Political Connections", value: entity.politicalConnections, max: 20, weight: 20 },
    { label: "News Scandals", value: entity.newsHits, max: 15, weight: 15 },
    { label: "Dark Web Signals", value: entity.darkWebSignals, max: 25, weight: 25 },
    { label: "Financial Anomalies", value: entity.financialAnomalies, max: 20, weight: 20 },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-panel p-6 space-y-6">
      <div className="flex items-start gap-6">
        <RiskScoreGauge score={entity.riskScore} size={130} />
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold">{entity.name}</h2>
            <RiskBadge level={entity.riskLevel} />
          </div>
          <p className="text-sm text-muted-foreground mt-1">{entity.designation} • {entity.department}</p>
          <p className="text-xs text-muted-foreground">{entity.location}</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
            <div className="p-2.5 rounded-lg bg-secondary/50 text-center">
              <p className="text-lg font-bold">{entity.complaints}</p>
              <p className="text-[10px] text-muted-foreground">Complaints</p>
            </div>
            <div className="p-2.5 rounded-lg bg-secondary/50 text-center">
              <p className="text-lg font-bold">{entity.contracts}</p>
              <p className="text-[10px] text-muted-foreground">Contracts</p>
            </div>
            <div className="p-2.5 rounded-lg bg-secondary/50 text-center">
              <p className="text-lg font-bold">{entity.newsHits}</p>
              <p className="text-[10px] text-muted-foreground">News Hits</p>
            </div>
            <div className="p-2.5 rounded-lg bg-secondary/50 text-center">
              <p className="text-lg font-bold">{entity.darkWebSignals}</p>
              <p className="text-[10px] text-muted-foreground">Dark Web</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">AI Corruption Prediction</h3>
        <div className="flex items-center gap-4 p-4 rounded-lg bg-secondary/30">
          <div className="text-center">
            <p className="text-3xl font-bold text-gradient-danger">{entity.predictionScore}%</p>
            <p className="text-xs text-muted-foreground mt-1">Corruption Probability</p>
          </div>
          <div className="flex-1">
            <p className="text-xs text-muted-foreground mb-1">Risk Factors Detected:</p>
            <div className="flex flex-wrap gap-1.5">
              {entity.complaints > 5 && <span className="px-2 py-0.5 rounded-full bg-danger/15 text-danger text-[10px]">Complaint Pattern</span>}
              {entity.contracts > 30 && <span className="px-2 py-0.5 rounded-full bg-warning/15 text-warning text-[10px]">Contract Favoritism</span>}
              {entity.politicalConnections > 3 && <span className="px-2 py-0.5 rounded-full bg-primary/15 text-primary text-[10px]">Political Links</span>}
              {entity.financialAnomalies > 3 && <span className="px-2 py-0.5 rounded-full bg-danger/15 text-danger text-[10px]">Financial Anomalies</span>}
              {entity.darkWebSignals > 0 && <span className="px-2 py-0.5 rounded-full bg-danger/15 text-danger text-[10px]">Dark Web Activity</span>}
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">Risk Factor Breakdown</h3>
        <div className="space-y-2.5">
          {factors.map((f) => {
            const pct = Math.min((f.value / f.max) * 100, 100);
            return (
              <div key={f.label}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">{f.label}</span>
                  <span className="font-mono">{f.value}/{f.max}</span>
                </div>
                <div className="h-2 rounded-full bg-secondary/50 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`h-full rounded-full ${pct >= 70 ? "bg-danger" : pct >= 40 ? "bg-warning" : "bg-success"}`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Entity | null>(null);

  const filtered = query.length >= 2
    ? entities.filter((e) => e.name.toLowerCase().includes(query.toLowerCase()) || e.department?.toLowerCase().includes(query.toLowerCase()))
    : [];

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Entity Search</h1>
          <p className="text-sm text-muted-foreground mt-1">Search officers, politicians, contractors, and companies</p>
        </div>

        <div className="relative max-w-2xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by name, department, or location..."
            value={query}
            onChange={(e) => { setQuery(e.target.value); setSelected(null); }}
            className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-secondary/50 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition"
          />
        </div>

        <AnimatePresence mode="wait">
          {!selected && filtered.length > 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-4xl">
              {filtered.map((entity) => {
                const Icon = typeIcons[entity.type] || User;
                return (
                  <motion.button
                    key={entity.id}
                    whileHover={{ scale: 1.01 }}
                    onClick={() => setSelected(entity)}
                    className="glass-panel-hover p-4 text-left flex items-center gap-4"
                  >
                    <div className="p-2.5 rounded-lg bg-primary/10">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold truncate">{entity.name}</p>
                      <p className="text-xs text-muted-foreground">{entity.type} • {entity.department}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className={`text-lg font-bold ${entity.riskScore >= 61 ? "text-danger" : entity.riskScore >= 31 ? "text-warning" : "text-success"}`}>{entity.riskScore}</p>
                      <RiskBadge level={entity.riskLevel} />
                    </div>
                  </motion.button>
                );
              })}
            </motion.div>
          )}

          {selected && (
            <div className="max-w-3xl">
              <button onClick={() => setSelected(null)} className="text-xs text-primary hover:underline mb-3">
                ← Back to results
              </button>
              <EntityProfile entity={selected} />
            </div>
          )}
        </AnimatePresence>

        {query.length >= 2 && filtered.length === 0 && !selected && (
          <p className="text-muted-foreground text-sm">No entities found matching "{query}"</p>
        )}
      </div>
    </AppLayout>
  );
}
