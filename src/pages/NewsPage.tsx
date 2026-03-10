import { motion } from "framer-motion";
import { Newspaper, ExternalLink } from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";
import RiskBadge from "@/components/dashboard/RiskBadge";
import { newsReports } from "@/data/mockData";

export default function NewsPage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Intelligence News Scanner</h1>
          <p className="text-sm text-muted-foreground mt-1">AI-powered corruption signal detection from news sources</p>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/10 border border-primary/20 max-w-2xl">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
          <span className="text-xs text-primary font-medium">Scanning {5} active news sources • Last scan: 3 min ago</span>
        </div>

        <div className="space-y-4 max-w-4xl">
          {newsReports.map((news, i) => (
            <motion.div
              key={news.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-panel-hover p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 shrink-0 mt-0.5">
                    <Newspaper className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold">{news.headline}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{news.source} • {news.date}</p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {news.linkedEntities.map((e) => (
                        <span key={e} className="px-2 py-0.5 rounded-full bg-danger/10 text-danger text-[10px] font-medium">{e}</span>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                      {news.keywords.map((kw) => (
                        <span key={kw} className="px-2 py-0.5 rounded-full bg-secondary text-muted-foreground text-[10px]">{kw}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <RiskBadge level={news.riskLevel} />
                  <button className="text-xs text-primary flex items-center gap-1 hover:underline">
                    <ExternalLink className="w-3 h-3" /> View
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
