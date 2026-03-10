import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, User, Building, Briefcase, Landmark, Crown, Brain, Loader2 } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import AppLayout from "@/components/layout/AppLayout";
import RiskBadge from "@/components/dashboard/RiskBadge";
import RiskScoreGauge from "@/components/dashboard/RiskScoreGauge";
import { fetchEntities, analyzeEntity, DbEntity } from "@/lib/api";
import type { RiskLevel } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const typeIcons: Record<string, typeof User> = {
  officer: User,
  politician: Landmark,
  contractor: Briefcase,
  company: Building,
  celebrity: Crown,
  business_magnate: Crown,
};

function EntityProfile({ entity }: { entity: DbEntity }) {
  const [aiResult, setAiResult] = useState<any>(null);

  const aiMutation = useMutation({
    mutationFn: () => analyzeEntity(entity),
    onSuccess: (data) => {
      setAiResult(data);
      toast.success("AI analysis complete");
    },
    onError: (err: any) => {
      toast.error(err.message || "AI analysis failed");
    },
  });

  const factors = [
    { label: "Complaint History", value: entity.complaints_count, max: 35 },
    { label: "Contract Irregularities", value: entity.contracts_count > 40 ? 30 : entity.contracts_count > 20 ? 15 : 5, max: 30 },
    { label: "Political Connections", value: entity.political_connections, max: 20 },
    { label: "News Scandals", value: entity.news_hits, max: 50 },
    { label: "Dark Web Signals", value: entity.dark_web_signals, max: 10 },
    { label: "Financial Anomalies", value: entity.financial_anomalies, max: 15 },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-panel p-6 space-y-6">
      <div className="flex items-start gap-6">
        <RiskScoreGauge score={entity.risk_score} size={130} />
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold">{entity.name}</h2>
            <RiskBadge level={entity.risk_level as RiskLevel} />
          </div>
          <p className="text-sm text-muted-foreground mt-1">{entity.designation} • {entity.department}</p>
          <p className="text-xs text-muted-foreground">{entity.location}</p>
          {entity.bio && <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{entity.bio}</p>}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
            {[
              { v: entity.complaints_count, l: "Complaints" },
              { v: entity.contracts_count, l: "Contracts" },
              { v: entity.news_hits, l: "News Hits" },
              { v: entity.dark_web_signals, l: "Dark Web" },
            ].map((s) => (
              <div key={s.l} className="p-2.5 rounded-lg bg-secondary/50 text-center">
                <p className="text-lg font-bold">{s.v}</p>
                <p className="text-[10px] text-muted-foreground">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Analysis Button */}
      <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Brain className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-semibold">AI Corruption Analysis</h3>
          </div>
          <Button
            size="sm"
            onClick={() => aiMutation.mutate()}
            disabled={aiMutation.isPending}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            {aiMutation.isPending ? <><Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" /> Analyzing...</> : "Run AI Analysis"}
          </Button>
        </div>

        {aiResult ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
            <div className="flex items-center gap-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-gradient-danger">{aiResult.prediction_score}%</p>
                <p className="text-xs text-muted-foreground">AI Predicted Risk</p>
              </div>
              <div className="flex-1 text-xs">
                <span className={`px-2 py-0.5 rounded-full font-medium ${
                  aiResult.recommendation === "urgent_action" ? "bg-danger/15 text-danger" :
                  aiResult.recommendation === "investigate" ? "bg-warning/15 text-warning" :
                  "bg-success/15 text-success"
                }`}>
                  {aiResult.recommendation === "urgent_action" ? "🔴 Urgent Action Required" :
                   aiResult.recommendation === "investigate" ? "🟡 Investigation Recommended" :
                   "🟢 Continue Monitoring"}
                </span>
                <span className="ml-2 text-muted-foreground">Confidence: {aiResult.confidence}%</span>
              </div>
            </div>
            {aiResult.risk_factors && (
              <div className="flex flex-wrap gap-1.5">
                {aiResult.risk_factors.map((f: string, i: number) => (
                  <span key={i} className="px-2 py-0.5 rounded-full bg-danger/10 text-danger text-[10px]">{f}</span>
                ))}
              </div>
            )}
            {aiResult.analysis && (
              <p className="text-xs text-muted-foreground leading-relaxed whitespace-pre-line">{aiResult.analysis}</p>
            )}
          </motion.div>
        ) : (
          <p className="text-xs text-muted-foreground">Click "Run AI Analysis" to get an AI-powered corruption risk assessment.</p>
        )}
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
  const [selected, setSelected] = useState<DbEntity | null>(null);

  const { data: entities, isLoading } = useQuery({
    queryKey: ["entities-search", query],
    queryFn: () => fetchEntities(query),
    enabled: query.length >= 2,
  });

  const filtered = entities || [];

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Entity Search</h1>
          <p className="text-sm text-muted-foreground mt-1">Search officers, politicians, contractors, companies & public figures</p>
        </div>

        <div className="relative max-w-2xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by name, department, or location... (e.g. Nirav Modi, Vijay Mallya)"
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
                      <p className={`text-lg font-bold ${entity.risk_score >= 61 ? "text-danger" : entity.risk_score >= 31 ? "text-warning" : "text-success"}`}>{entity.risk_score}</p>
                      <RiskBadge level={entity.risk_level as RiskLevel} />
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

        {isLoading && <p className="text-muted-foreground text-sm">Searching...</p>}
        {query.length >= 2 && !isLoading && filtered.length === 0 && !selected && (
          <p className="text-muted-foreground text-sm">No entities found matching "{query}"</p>
        )}
      </div>
    </AppLayout>
  );
}
