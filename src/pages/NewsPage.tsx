import { useState } from "react";
import { motion } from "framer-motion";
import { Newspaper, ExternalLink, Globe, Loader2, Search } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import AppLayout from "@/components/layout/AppLayout";
import RiskBadge from "@/components/dashboard/RiskBadge";
import { fetchNewsReports, scrapeLatestNews } from "@/lib/api";
import type { RiskLevel } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function NewsPage() {
  const { data: news, isLoading } = useQuery({ queryKey: ["news"], queryFn: fetchNewsReports });
  const [scrapeQuery, setScrapeQuery] = useState("");
  const [scrapeResults, setScrapeResults] = useState<any>(null);

  const scrapeMutation = useMutation({
    mutationFn: (q: string) => scrapeLatestNews(q),
    onSuccess: (data) => { setScrapeResults(data); toast.success(`Found ${data.articles_found} articles from the web`); },
    onError: (err: any) => toast.error(err.message || "News scraping failed"),
  });

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Intelligence News Scanner</h1>
          <p className="text-sm text-muted-foreground mt-1">AI-powered corruption signal detection from news sources + live web scraping</p>
        </div>

        {/* Live Web Scraping */}
        <div className="glass-panel p-4 max-w-2xl space-y-3">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-semibold">Live Web Scraping (Firecrawl)</h3>
          </div>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search corruption news... (e.g. 'government scam India 2024')"
                value={scrapeQuery}
                onChange={(e) => setScrapeQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && scrapeQuery.length >= 3 && scrapeMutation.mutate(scrapeQuery)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-secondary/50 border border-border/50 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <Button
              size="sm"
              onClick={() => scrapeMutation.mutate(scrapeQuery)}
              disabled={scrapeMutation.isPending || scrapeQuery.length < 3}
            >
              {scrapeMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Scrape"}
            </Button>
          </div>
        </div>

        {/* Scraped Results */}
        {scrapeResults && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3 max-w-4xl">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Globe className="w-4 h-4 text-primary" />
              Live Results — {scrapeResults.articles_found} sources
            </div>

            {scrapeResults.analysis?.summary && (
              <div className="glass-panel p-4">
                <p className="text-xs font-semibold mb-1">🔍 AI Analysis</p>
                <p className="text-xs text-muted-foreground leading-relaxed whitespace-pre-line">{scrapeResults.analysis.summary}</p>
              </div>
            )}

            {scrapeResults.analysis?.corruption_signals?.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {scrapeResults.analysis.corruption_signals.map((s: string, i: number) => (
                  <span key={i} className="px-2 py-0.5 rounded-full bg-danger/10 text-danger text-[10px] font-medium">{s}</span>
                ))}
              </div>
            )}

            {scrapeResults.articles?.map((a: any, i: number) => (
              <motion.a
                key={i}
                href={a.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.03 }}
                className="glass-panel-hover p-4 flex items-start gap-3 group block"
              >
                <div className="p-2 rounded-lg bg-primary/10 shrink-0 mt-0.5">
                  <ExternalLink className="w-3.5 h-3.5 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold group-hover:text-primary transition">{a.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{a.source}</p>
                  {a.description && <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{a.description}</p>}
                </div>
              </motion.a>
            ))}
          </motion.div>
        )}

        {/* Existing DB News */}
        <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/10 border border-primary/20 max-w-2xl">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
          <span className="text-xs text-primary font-medium">Database signals • {news?.length ?? 0} records</span>
        </div>

        <div className="space-y-4 max-w-4xl">
          {isLoading && <p className="text-sm text-muted-foreground">Loading news signals...</p>}
          {(news || []).map((n, i) => (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass-panel-hover p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 shrink-0 mt-0.5">
                    <Newspaper className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold">{n.headline}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{n.source} • {n.published_date}</p>
                    {n.content && <p className="text-xs text-muted-foreground mt-1.5">{n.content}</p>}
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {(n.linked_entities || []).map((e) => (
                        <span key={e} className="px-2 py-0.5 rounded-full bg-danger/10 text-danger text-[10px] font-medium">{e}</span>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                      {(n.keywords || []).map((kw) => (
                        <span key={kw} className="px-2 py-0.5 rounded-full bg-secondary text-muted-foreground text-[10px]">{kw}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <RiskBadge level={n.risk_level as RiskLevel} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
