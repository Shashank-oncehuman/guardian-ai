import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, User, Building, Briefcase, Landmark, Crown, Brain, Loader2, ShieldAlert, TrendingUp, IndianRupee, AlertTriangle, Scan, Globe, ExternalLink, Link2, Clock, Twitter, Linkedin, Facebook, Instagram } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import AppLayout from "@/components/layout/AppLayout";
import RiskBadge from "@/components/dashboard/RiskBadge";
import RiskScoreGauge from "@/components/dashboard/RiskScoreGauge";
import { fetchEntities, analyzeEntity, investigateEntity, scrapeEntityIntel, fetchRelationships, fetchTimelineEvents, DbEntity, DbRelationship, DbTimelineEvent } from "@/lib/api";
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

function formatCurrency(amount: number) {
  if (!amount) return "₹0";
  if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`;
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)} L`;
  return `₹${amount.toLocaleString()}`;
}

/* ─── Live Web Report (for unknown entities not in DB) ─── */
function LiveWebReport({ query }: { query: string }) {
  const [result, setResult] = useState<any>(null);

  const scrapeMutation = useMutation({
    mutationFn: () => scrapeEntityIntel(query, "unknown"),
    onSuccess: (data) => { setResult(data); toast.success(`Web intel collected — ${data.articles_found} sources`); },
    onError: (err: any) => toast.error(err.message || "Web scraping failed"),
  });

  useEffect(() => {
    scrapeMutation.mutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-3xl space-y-4">
      <div className="glass-panel p-4 sm:p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-lg bg-primary/10">
            <Globe className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-bold">Live Web Intelligence: "{query}"</h2>
            <p className="text-xs text-muted-foreground">Not found in database — scraping worldwide sources in real-time</p>
          </div>
        </div>

        {scrapeMutation.isPending && (
          <div className="flex items-center gap-3 p-4 rounded-lg bg-primary/5 border border-primary/20">
            <Loader2 className="w-5 h-5 animate-spin text-primary" />
            <div>
              <p className="text-sm font-medium">Scanning worldwide sources...</p>
              <p className="text-xs text-muted-foreground">Searching news, public records, financial disclosures for "{query}"</p>
            </div>
          </div>
        )}

        {result && (
          <div className="space-y-4">
            {result.analysis?.summary && (
              <div className="p-3 rounded-lg bg-secondary/30">
                <p className="text-xs font-semibold mb-1">🔍 Intelligence Summary</p>
                <p className="text-xs text-muted-foreground leading-relaxed whitespace-pre-line">{result.analysis.summary}</p>
              </div>
            )}

            {result.analysis?.key_findings?.length > 0 && (
              <div>
                <p className="text-xs font-semibold mb-2">📋 Key Findings</p>
                <div className="space-y-1.5">
                  {result.analysis.key_findings.map((f: any, i: number) => (
                    <div key={i} className={`p-2.5 rounded-lg text-xs flex items-start gap-2 ${
                      f.severity === "high" ? "bg-danger/10 border border-danger/20" :
                      f.severity === "medium" ? "bg-warning/10 border border-warning/20" :
                      "bg-secondary/40 border border-border/30"
                    }`}>
                      <span className={`shrink-0 font-mono ${f.severity === "high" ? "text-danger" : f.severity === "medium" ? "text-warning" : "text-muted-foreground"}`}>[{f.severity?.toUpperCase()}]</span>
                      <div className="min-w-0">
                        <p className="text-foreground">{f.finding}</p>
                        <p className="text-muted-foreground text-[10px] mt-0.5">Source: {f.source}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {result.analysis?.corruption_signals?.length > 0 && (
              <div>
                <p className="text-xs font-semibold mb-2 flex items-center gap-1"><ShieldAlert className="w-3 h-3 text-danger" /> Corruption Signals</p>
                <div className="flex flex-wrap gap-1.5">
                  {result.analysis.corruption_signals.map((s: string, i: number) => (
                    <span key={i} className="px-2 py-0.5 rounded-full bg-danger/10 text-danger text-[10px]">{s}</span>
                  ))}
                </div>
              </div>
            )}

            {result.analysis?.financial_red_flags?.length > 0 && (
              <div>
                <p className="text-xs font-semibold mb-2">🚩 Financial Red Flags</p>
                <div className="space-y-1">
                  {result.analysis.financial_red_flags.map((flag: string, i: number) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <span className="text-danger mt-0.5">•</span>
                      <span>{flag}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {result.analysis?.linked_entities?.length > 0 && (
              <div>
                <p className="text-xs font-semibold mb-2">🔗 Linked Entities</p>
                <div className="flex flex-wrap gap-1.5">
                  {result.analysis.linked_entities.map((name: string, i: number) => (
                    <span key={i} className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px]">{name}</span>
                  ))}
                </div>
              </div>
            )}

            {result.articles?.length > 0 && (
              <div>
                <p className="text-xs font-semibold mb-2">📰 Sources ({result.articles_found})</p>
                <div className="space-y-1.5 max-h-60 overflow-y-auto">
                  {result.articles.map((a: any, i: number) => (
                    <a key={i} href={a.url} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 p-2 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition text-xs group">
                      <ExternalLink className="w-3 h-3 text-muted-foreground group-hover:text-primary shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-foreground group-hover:text-primary">{a.title}</p>
                        <p className="text-[10px] text-muted-foreground">{a.source}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {result.analysis?.risk_adjustment != null && result.analysis.risk_adjustment !== 0 && (
              <div className={`p-2.5 rounded-lg flex items-center gap-2 text-xs ${
                result.analysis.risk_adjustment > 0 ? "bg-danger/10 border border-danger/20 text-danger" : "bg-success/10 border border-success/20 text-success"
              }`}>
                <TrendingUp className="w-3.5 h-3.5" />
                <span className="font-medium">Risk Indicator: {result.analysis.risk_adjustment > 0 ? "+" : ""}{result.analysis.risk_adjustment} based on web intelligence</span>
              </div>
            )}
          </div>
        )}

        {scrapeMutation.isError && !result && (
          <div className="p-3 rounded-lg bg-danger/10 border border-danger/20 text-xs text-danger">
            Failed to collect web intelligence. Please try again.
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ─── Related Entities Section ─── */
function RelatedEntities({ entity, allEntities }: { entity: DbEntity; allEntities: DbEntity[] }) {
  const { data: relationships } = useQuery({
    queryKey: ["relationships"],
    queryFn: fetchRelationships,
  });

  const related = (relationships || [])
    .filter((r: DbRelationship) => r.source_entity_id === entity.id || r.target_entity_id === entity.id)
    .map((r: DbRelationship) => {
      const otherId = r.source_entity_id === entity.id ? r.target_entity_id : r.source_entity_id;
      const other = allEntities.find(e => e.id === otherId);
      return other ? { ...r, entity: other } : null;
    })
    .filter(Boolean) as (DbRelationship & { entity: DbEntity })[];

  if (related.length === 0) return null;

  return (
    <div className="p-3 sm:p-4 rounded-lg bg-accent/5 border border-accent/20">
      <div className="flex items-center gap-2 mb-3">
        <Link2 className="w-4 h-4 text-primary" />
        <h3 className="text-xs sm:text-sm font-semibold">Related Entities ({related.length})</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {related.map((r) => {
          const Icon = typeIcons[r.entity.type] || User;
          return (
            <div key={r.id} className="flex items-center gap-3 p-2.5 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition">
              <div className="p-1.5 rounded bg-primary/10">
                <Icon className="w-3.5 h-3.5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium truncate">{r.entity.name}</p>
                <p className="text-[10px] text-muted-foreground">{r.relationship_type} • Strength: {r.strength}/10</p>
                {r.description && <p className="text-[10px] text-muted-foreground truncate">{r.description}</p>}
              </div>
              <div className="text-right shrink-0">
                <span className={`text-xs font-bold ${r.entity.risk_score >= 61 ? "text-danger" : r.entity.risk_score >= 31 ? "text-warning" : "text-success"}`}>
                  {r.entity.risk_score}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Activity Timeline Section ─── */
function EntityTimeline({ entity }: { entity: DbEntity }) {
  const { data: events } = useQuery({
    queryKey: ["timeline-events"],
    queryFn: () => fetchTimelineEvents(),
  });

  const entityEvents = (events || []).filter((e: DbTimelineEvent) =>
    e.entities.some(name => name.toLowerCase().includes(entity.name.toLowerCase())) ||
    (e.linked_entity_ids || []).includes(entity.id)
  );

  if (entityEvents.length === 0) return null;

  return (
    <div className="p-3 sm:p-4 rounded-lg bg-accent/5 border border-accent/20">
      <div className="flex items-center gap-2 mb-3">
        <Clock className="w-4 h-4 text-primary" />
        <h3 className="text-xs sm:text-sm font-semibold">Activity Timeline ({entityEvents.length} events)</h3>
      </div>
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {entityEvents.slice(0, 10).map((event: DbTimelineEvent) => (
          <div key={event.id} className={`p-2.5 rounded-lg border text-xs ${
            event.risk_level === "high" ? "bg-danger/5 border-danger/20" :
            event.risk_level === "medium" ? "bg-warning/5 border-warning/20" :
            "bg-secondary/30 border-border/30"
          }`}>
            <div className="flex items-center justify-between mb-1">
              <span className="font-medium text-foreground">{event.title}</span>
              <span className="text-[10px] text-muted-foreground font-mono">{event.date}</span>
            </div>
            <p className="text-[10px] text-muted-foreground line-clamp-2">{event.description}</p>
            {event.source && <p className="text-[10px] text-muted-foreground mt-1">Source: {event.source}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Social Media Links ─── */
function SocialLinks({ name }: { name: string }) {
  const encoded = encodeURIComponent(name);
  const links = [
    { icon: Twitter, label: "X/Twitter", url: `https://twitter.com/search?q=${encoded}`, color: "hover:text-sky-400" },
    { icon: Linkedin, label: "LinkedIn", url: `https://www.linkedin.com/search/results/all/?keywords=${encoded}`, color: "hover:text-blue-500" },
    { icon: Facebook, label: "Facebook", url: `https://www.facebook.com/search/top?q=${encoded}`, color: "hover:text-blue-600" },
    { icon: Instagram, label: "Instagram", url: `https://www.instagram.com/explore/tags/${encoded.replace(/%20/g, "")}`, color: "hover:text-pink-500" },
    { icon: Globe, label: "Google", url: `https://www.google.com/search?q=${encoded}`, color: "hover:text-green-500" },
  ];

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-[10px] text-muted-foreground">Search on:</span>
      {links.map((l) => (
        <a key={l.label} href={l.url} target="_blank" rel="noopener noreferrer"
          className={`p-1.5 rounded-lg bg-secondary/40 hover:bg-secondary/70 transition text-muted-foreground ${l.color}`}
          title={l.label}
        >
          <l.icon className="w-3.5 h-3.5" />
        </a>
      ))}
    </div>
  );
}

/* ─── Entity Profile ─── */
function EntityProfile({ entity, allEntities }: { entity: DbEntity; allEntities: DbEntity[] }) {
  const [aiResult, setAiResult] = useState<any>(null);
  const [investigationResult, setInvestigationResult] = useState<any>(null);
  const [scrapeResult, setScrapeResult] = useState<any>(null);

  const aiMutation = useMutation({
    mutationFn: () => analyzeEntity(entity),
    onSuccess: (data) => { setAiResult(data); toast.success("AI analysis complete"); },
    onError: (err: any) => toast.error(err.message || "AI analysis failed"),
  });

  const investigateMutation = useMutation({
    mutationFn: () => investigateEntity(entity),
    onSuccess: (data) => { setInvestigationResult(data); toast.success("Deep investigation complete"); },
    onError: (err: any) => toast.error(err.message || "Investigation failed"),
  });

  const scrapeMutation = useMutation({
    mutationFn: () => scrapeEntityIntel(entity.name, entity.type),
    onSuccess: (data) => { setScrapeResult(data); toast.success(`Web scraping complete — ${data.articles_found} articles found`); },
    onError: (err: any) => toast.error(err.message || "Web scraping failed"),
  });

  useEffect(() => {
    aiMutation.mutate();
    investigateMutation.mutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entity.id]);

  const factors = [
    { label: "Contract Irregularities", value: entity.contracts_count > 40 ? 30 : entity.contracts_count > 20 ? 15 : 5, max: 30 },
    { label: "Political Connections", value: entity.political_connections, max: 20 },
    { label: "News Scandals", value: entity.news_hits, max: 50 },
    { label: "Dark Web Signals", value: entity.dark_web_signals, max: 10 },
    { label: "Financial Anomalies", value: entity.financial_anomalies, max: 15 },
  ];

  const wealthGap = (entity.known_spending || 0) - (entity.declared_income || 0);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-panel p-4 sm:p-6 space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
        <div className="mx-auto sm:mx-0">
          <RiskScoreGauge score={entity.risk_score} size={110} />
        </div>
        <div className="flex-1 min-w-0 w-full">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-lg sm:text-xl font-bold">{entity.name}</h2>
            <RiskBadge level={entity.risk_level as RiskLevel} />
            {entity.disproportionate_wealth && (
              <span className="px-2 py-0.5 rounded-full bg-danger/15 text-danger text-[10px] font-medium flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" /> Disproportionate Wealth
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground mt-1">{entity.designation} • {entity.department}</p>
          <p className="text-xs text-muted-foreground">{entity.location}</p>
          {entity.wealth_source && <p className="text-xs text-muted-foreground mt-1">💰 Source: {entity.wealth_source}</p>}
          {entity.bio && <p className="text-xs text-muted-foreground mt-2 leading-relaxed line-clamp-3 sm:line-clamp-none">{entity.bio}</p>}

          {/* Social Links */}
          <div className="mt-3">
            <SocialLinks name={entity.name} />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mt-4">
            {[
              { v: entity.contracts_count, l: "Contracts" },
              { v: entity.news_hits, l: "News Hits" },
              { v: entity.dark_web_signals, l: "Dark Web" },
            ].map((s) => (
              <div key={s.l} className="p-2 sm:p-2.5 rounded-lg bg-secondary/50 text-center">
                <p className="text-base sm:text-lg font-bold">{s.v}</p>
                <p className="text-[9px] sm:text-[10px] text-muted-foreground">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Financial Profile */}
      <div className="p-3 sm:p-4 rounded-lg bg-warning/5 border border-warning/20">
        <div className="flex items-center gap-2 mb-3">
          <IndianRupee className="w-4 h-4 text-warning" />
          <h3 className="text-xs sm:text-sm font-semibold">Financial Profile & Income-Spending Analysis</h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
          <div className="p-2 sm:p-3 rounded-lg bg-secondary/40 text-center">
            <p className="text-[10px] sm:text-xs text-muted-foreground">Declared Income</p>
            <p className="text-xs sm:text-sm font-bold text-success mt-1">{formatCurrency(entity.declared_income)}</p>
          </div>
          <div className="p-2 sm:p-3 rounded-lg bg-secondary/40 text-center">
            <p className="text-[10px] sm:text-xs text-muted-foreground">Known Spending</p>
            <p className="text-xs sm:text-sm font-bold text-danger mt-1">{formatCurrency(entity.known_spending)}</p>
          </div>
          <div className="p-2 sm:p-3 rounded-lg bg-secondary/40 text-center">
            <p className="text-[10px] sm:text-xs text-muted-foreground">Known Assets</p>
            <p className="text-xs sm:text-sm font-bold text-primary mt-1">{formatCurrency(entity.known_assets)}</p>
          </div>
          <div className="p-2 sm:p-3 rounded-lg bg-secondary/40 text-center">
            <p className="text-[10px] sm:text-xs text-muted-foreground">Spending/Income</p>
            <p className={`text-xs sm:text-sm font-bold mt-1 ${entity.income_spending_ratio > 5 ? "text-danger" : entity.income_spending_ratio > 2 ? "text-warning" : "text-success"}`}>
              {entity.income_spending_ratio}x
            </p>
          </div>
        </div>
        {wealthGap > 0 && (
          <div className="mt-3 p-2 sm:p-2.5 rounded-lg bg-danger/10 border border-danger/20 flex items-start sm:items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-danger shrink-0 mt-0.5 sm:mt-0" />
            <p className="text-[10px] sm:text-xs text-danger">
              <span className="font-semibold">Wealth Gap Detected:</span> Spending exceeds declared income by {formatCurrency(wealthGap)} — 
              assets worth {formatCurrency(entity.known_assets)} on income of {formatCurrency(entity.declared_income)}
            </p>
          </div>
        )}
      </div>

      {/* Auto-loading indicators */}
      {(aiMutation.isPending || investigateMutation.isPending) && (
        <div className="flex flex-wrap items-center gap-3 p-3 rounded-lg bg-primary/5 border border-primary/20">
          <Loader2 className="w-4 h-4 animate-spin text-primary" />
          <span className="text-xs text-muted-foreground">
            {aiMutation.isPending && investigateMutation.isPending
              ? "Running AI Risk Analysis & Deep Financial Investigation..."
              : aiMutation.isPending
              ? "Running AI Risk Analysis..."
              : "Running Deep Financial Investigation..."}
          </span>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2 sm:gap-3">
        <Button size="sm" onClick={() => aiMutation.mutate()} disabled={aiMutation.isPending} className="bg-primary hover:bg-primary/90 text-primary-foreground text-xs">
          {aiMutation.isPending ? <><Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" /> Analyzing...</> : <><Brain className="w-3.5 h-3.5 mr-1.5" /> Re-Analyze</>}
        </Button>
        <Button size="sm" onClick={() => investigateMutation.mutate()} disabled={investigateMutation.isPending} variant="outline" className="border-warning/50 text-warning hover:bg-warning/10 text-xs">
          {investigateMutation.isPending ? <><Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" /> Investigating...</> : <><Scan className="w-3.5 h-3.5 mr-1.5" /> Re-Investigate</>}
        </Button>
        <Button size="sm" onClick={() => scrapeMutation.mutate()} disabled={scrapeMutation.isPending} variant="outline" className="border-primary/50 text-primary hover:bg-primary/10 text-xs">
          {scrapeMutation.isPending ? <><Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" /> Scraping Web...</> : <><Globe className="w-3.5 h-3.5 mr-1.5" /> Scrape Web Intel</>}
        </Button>
      </div>

      {/* Related Entities */}
      <RelatedEntities entity={entity} allEntities={allEntities} />

      {/* Activity Timeline */}
      <EntityTimeline entity={entity} />

      {/* Web Scrape Results */}
      {scrapeResult && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-3 sm:p-4 rounded-lg bg-accent/5 border border-accent/20 space-y-4">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-primary" />
            <h3 className="text-xs sm:text-sm font-semibold">Web Intelligence Report — {scrapeResult.articles_found} sources scraped</h3>
          </div>
          {scrapeResult.analysis?.summary && (
            <div className="p-3 rounded-lg bg-secondary/30">
              <p className="text-xs font-semibold mb-1">🔍 Intelligence Summary</p>
              <p className="text-[10px] sm:text-xs text-muted-foreground leading-relaxed whitespace-pre-line">{scrapeResult.analysis.summary}</p>
            </div>
          )}
          {scrapeResult.analysis?.key_findings?.length > 0 && (
            <div>
              <p className="text-xs font-semibold mb-2">📋 Key Findings</p>
              <div className="space-y-1.5">
                {scrapeResult.analysis.key_findings.map((f: any, i: number) => (
                  <div key={i} className={`p-2 sm:p-2.5 rounded-lg text-[10px] sm:text-xs flex items-start gap-2 ${
                    f.severity === "high" ? "bg-danger/10 border border-danger/20" :
                    f.severity === "medium" ? "bg-warning/10 border border-warning/20" :
                    "bg-secondary/40 border border-border/30"
                  }`}>
                    <span className={`shrink-0 font-mono ${f.severity === "high" ? "text-danger" : f.severity === "medium" ? "text-warning" : "text-muted-foreground"}`}>[{f.severity?.toUpperCase()}]</span>
                    <div className="min-w-0">
                      <p className="text-foreground">{f.finding}</p>
                      <p className="text-muted-foreground text-[10px] mt-0.5">Source: {f.source}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {scrapeResult.analysis?.corruption_signals?.length > 0 && (
            <div>
              <p className="text-xs font-semibold mb-2 flex items-center gap-1"><ShieldAlert className="w-3 h-3 text-danger" /> Corruption Signals</p>
              <div className="flex flex-wrap gap-1.5">
                {scrapeResult.analysis.corruption_signals.map((s: string, i: number) => (
                  <span key={i} className="px-2 py-0.5 rounded-full bg-danger/10 text-danger text-[10px]">{s}</span>
                ))}
              </div>
            </div>
          )}
          {scrapeResult.analysis?.linked_entities?.length > 0 && (
            <div>
              <p className="text-xs font-semibold mb-2">🔗 Linked Entities Found</p>
              <div className="flex flex-wrap gap-1.5">
                {scrapeResult.analysis.linked_entities.map((name: string, i: number) => (
                  <span key={i} className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px]">{name}</span>
                ))}
              </div>
            </div>
          )}
          {scrapeResult.articles?.length > 0 && (
            <div>
              <p className="text-xs font-semibold mb-2">📰 Scraped Sources</p>
              <div className="space-y-1.5 max-h-48 overflow-y-auto">
                {scrapeResult.articles.map((a: any, i: number) => (
                  <a key={i} href={a.url} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 p-2 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition text-xs group">
                    <ExternalLink className="w-3 h-3 text-muted-foreground group-hover:text-primary shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-foreground group-hover:text-primary">{a.title}</p>
                      <p className="text-[10px] text-muted-foreground">{a.source}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
          {scrapeResult.analysis?.risk_adjustment != null && scrapeResult.analysis.risk_adjustment !== 0 && (
            <div className={`p-2.5 rounded-lg flex items-center gap-2 text-xs ${
              scrapeResult.analysis.risk_adjustment > 0 ? "bg-danger/10 border border-danger/20 text-danger" : "bg-success/10 border border-success/20 text-success"
            }`}>
              <TrendingUp className="w-3.5 h-3.5" />
              <span className="font-medium">Risk Score Adjustment: {scrapeResult.analysis.risk_adjustment > 0 ? "+" : ""}{scrapeResult.analysis.risk_adjustment} based on web intelligence</span>
            </div>
          )}
        </motion.div>
      )}

      {/* AI Analysis Result */}
      {aiResult && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-3 sm:p-4 rounded-lg bg-primary/5 border border-primary/20 space-y-3">
          <div className="flex items-center gap-2 mb-2">
            <Brain className="w-4 h-4 text-primary" />
            <h3 className="text-xs sm:text-sm font-semibold">AI Corruption Analysis</h3>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-bold text-danger">{aiResult.prediction_score}%</p>
              <p className="text-[10px] sm:text-xs text-muted-foreground">Predicted Risk</p>
            </div>
            <div className="flex-1 text-xs">
              <span className={`px-2 py-0.5 rounded-full font-medium ${
                aiResult.recommendation === "urgent_action" ? "bg-danger/15 text-danger" :
                aiResult.recommendation === "investigate" ? "bg-warning/15 text-warning" :
                "bg-success/15 text-success"
              }`}>
                {aiResult.recommendation === "urgent_action" ? "🔴 Urgent Action" :
                 aiResult.recommendation === "investigate" ? "🟡 Investigate" : "🟢 Monitor"}
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
          {aiResult.analysis && <p className="text-[10px] sm:text-xs text-muted-foreground leading-relaxed whitespace-pre-line">{aiResult.analysis}</p>}
        </motion.div>
      )}

      {/* Deep Investigation Result */}
      {investigationResult && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-3 sm:p-4 rounded-lg bg-warning/5 border border-warning/20 space-y-4">
          <div className="flex items-center gap-2">
            <Scan className="w-4 h-4 text-warning" />
            <h3 className="text-xs sm:text-sm font-semibold">Deep Financial Investigation Report</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
            <div className="p-2 sm:p-3 rounded-lg bg-secondary/40 text-center">
              <p className="text-xl sm:text-2xl font-bold text-danger">{investigationResult.corruption_score}%</p>
              <p className="text-[9px] sm:text-[10px] text-muted-foreground">Corruption Score</p>
            </div>
            <div className="p-2 sm:p-3 rounded-lg bg-secondary/40 text-center">
              <p className="text-xs sm:text-sm font-bold text-warning">{investigationResult.corruption_type || "Unknown"}</p>
              <p className="text-[9px] sm:text-[10px] text-muted-foreground">Type</p>
            </div>
            <div className="p-2 sm:p-3 rounded-lg bg-secondary/40 text-center">
              <p className="text-xs sm:text-sm font-bold text-danger">{formatCurrency(investigationResult.wealth_gap || 0)}</p>
              <p className="text-[9px] sm:text-[10px] text-muted-foreground">Wealth Gap</p>
            </div>
            <div className="p-2 sm:p-3 rounded-lg bg-secondary/40 text-center">
              <p className={`text-xs sm:text-sm font-bold ${
                investigationResult.investigation_priority === "critical" ? "text-danger" :
                investigationResult.investigation_priority === "high" ? "text-warning" : "text-success"
              }`}>
                {(investigationResult.investigation_priority || "medium").toUpperCase()}
              </p>
              <p className="text-[9px] sm:text-[10px] text-muted-foreground">Priority</p>
            </div>
          </div>
          {investigationResult.suspicious_patterns?.length > 0 && (
            <div>
              <p className="text-xs font-semibold mb-2 flex items-center gap-1"><AlertTriangle className="w-3 h-3 text-danger" /> Suspicious Patterns</p>
              <div className="flex flex-wrap gap-1.5">
                {investigationResult.suspicious_patterns.map((p: string, i: number) => (
                  <span key={i} className="px-2 py-0.5 rounded-full bg-danger/10 text-danger text-[10px]">{p}</span>
                ))}
              </div>
            </div>
          )}
          {investigationResult.money_trail_indicators?.length > 0 && (
            <div>
              <p className="text-xs font-semibold mb-2 flex items-center gap-1"><TrendingUp className="w-3 h-3 text-warning" /> Money Trail Indicators</p>
              <div className="space-y-1">
                {investigationResult.money_trail_indicators.map((m: string, i: number) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                    <span className="text-warning mt-0.5">•</span>
                    <span>{m}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {investigationResult.income_analysis && (
            <div className="p-3 rounded-lg bg-secondary/30">
              <p className="text-xs font-semibold mb-1">💰 Income Analysis</p>
              <p className="text-[10px] sm:text-xs text-muted-foreground">{investigationResult.income_analysis}</p>
            </div>
          )}
          {investigationResult.asset_analysis && (
            <div className="p-3 rounded-lg bg-secondary/30">
              <p className="text-xs font-semibold mb-1">🏠 Asset Analysis</p>
              <p className="text-[10px] sm:text-xs text-muted-foreground">{investigationResult.asset_analysis}</p>
            </div>
          )}
          {investigationResult.scraped_intel?.length > 0 && (
            <div>
              <p className="text-xs font-semibold mb-2 flex items-center gap-1"><Search className="w-3 h-3 text-primary" /> Intelligence Findings</p>
              <div className="space-y-2">
                {investigationResult.scraped_intel.map((intel: string, i: number) => (
                  <div key={i} className="p-2.5 rounded-lg bg-primary/5 border border-primary/10 text-[10px] sm:text-xs text-muted-foreground flex items-start gap-2">
                    <span className="text-primary font-mono shrink-0">[{i + 1}]</span>
                    <span>{intel}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {investigationResult.detailed_report && (
            <div className="p-3 rounded-lg bg-secondary/30">
              <p className="text-xs font-semibold mb-1">📋 Detailed Forensic Report</p>
              <p className="text-[10px] sm:text-xs text-muted-foreground leading-relaxed whitespace-pre-line">{investigationResult.detailed_report}</p>
            </div>
          )}
        </motion.div>
      )}

      {/* Risk Factor Breakdown */}
      <div>
        <h3 className="text-xs sm:text-sm font-semibold mb-3">Risk Factor Breakdown</h3>
        <div className="space-y-2.5">
          {factors.map((f) => {
            const pct = Math.min((f.value / f.max) * 100, 100);
            return (
              <div key={f.label}>
                <div className="flex justify-between text-[10px] sm:text-xs mb-1">
                  <span className="text-muted-foreground">{f.label}</span>
                  <span className="font-mono">{f.value}/{f.max}</span>
                </div>
                <div className="h-1.5 sm:h-2 rounded-full bg-secondary/50 overflow-hidden">
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
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [selected, setSelected] = useState<DbEntity | null>(null);

  useEffect(() => {
    const q = searchParams.get("q");
    if (q) setQuery(q);
  }, [searchParams]);

  const { data: entities, isLoading } = useQuery({
    queryKey: ["entities-search", query],
    queryFn: () => fetchEntities(query),
    enabled: query.length >= 2,
  });

  const { data: allEntities } = useQuery({
    queryKey: ["all-entities"],
    queryFn: () => fetchEntities(),
  });

  const filtered = entities || [];

  return (
    <AppLayout>
      <div className="space-y-4 sm:space-y-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">Entity Search & Investigation</h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">Search any person or entity worldwide — auto-scrapes real-world sources if not in database</p>
        </div>

        <div className="relative w-full max-w-2xl">
          <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 sm:w-5 h-4 sm:h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search any person, company, or entity worldwide..."
            value={query}
            onChange={(e) => { setQuery(e.target.value); setSelected(null); }}
            className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-3.5 rounded-xl bg-secondary/50 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition text-sm"
          />
        </div>

        <AnimatePresence mode="wait">
          {!selected && filtered.length > 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-4xl">
              {filtered.map((entity) => {
                const Icon = typeIcons[entity.type] || User;
                return (
                  <motion.button
                    key={entity.id}
                    whileHover={{ scale: 1.01 }}
                    onClick={() => setSelected(entity)}
                    className="glass-panel-hover p-3 sm:p-4 text-left flex items-center gap-3 sm:gap-4"
                  >
                    <div className="p-2 sm:p-2.5 rounded-lg bg-primary/10">
                      <Icon className="w-4 sm:w-5 h-4 sm:h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm font-semibold truncate">{entity.name}</p>
                      <p className="text-[10px] sm:text-xs text-muted-foreground">{entity.type} • {entity.department}</p>
                      {entity.disproportionate_wealth && (
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-danger/10 text-danger text-[9px] mt-1">
                          <AlertTriangle className="w-2.5 h-2.5" /> Wealth Gap
                        </span>
                      )}
                    </div>
                    <div className="text-right shrink-0">
                      <p className={`text-base sm:text-lg font-bold ${entity.risk_score >= 61 ? "text-danger" : entity.risk_score >= 31 ? "text-warning" : "text-success"}`}>{entity.risk_score}</p>
                      <RiskBadge level={entity.risk_level as RiskLevel} />
                    </div>
                  </motion.button>
                );
              })}
            </motion.div>
          )}

          {selected && (
            <div className="w-full max-w-3xl">
              <button onClick={() => setSelected(null)} className="text-xs text-primary hover:underline mb-3">
                ← Back to results
              </button>
              <EntityProfile entity={selected} allEntities={allEntities || []} />
            </div>
          )}

          {/* When no DB results found, auto-scrape the web */}
          {query.length >= 2 && !isLoading && filtered.length === 0 && !selected && (
            <LiveWebReport query={query} />
          )}
        </AnimatePresence>

        {isLoading && <p className="text-muted-foreground text-sm">Searching...</p>}
      </div>
    </AppLayout>
  );
}
