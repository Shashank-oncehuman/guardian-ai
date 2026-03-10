import { motion } from "framer-motion";
import { Newspaper, ExternalLink } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import AppLayout from "@/components/layout/AppLayout";
import RiskBadge from "@/components/dashboard/RiskBadge";
import { fetchNewsReports } from "@/lib/api";
import type { RiskLevel } from "@/data/mockData";

export default function NewsPage() {
  const { data: news, isLoading } = useQuery({ queryKey: ["news"], queryFn: fetchNewsReports });

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Intelligence News Scanner</h1>
          <p className="text-sm text-muted-foreground mt-1">AI-powered corruption signal detection from news sources</p>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/10 border border-primary/20 max-w-2xl">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
          <span className="text-xs text-primary font-medium">Scanning active news sources • {news?.length ?? 0} signals detected</span>
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
