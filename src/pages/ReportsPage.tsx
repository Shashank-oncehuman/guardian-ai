import { motion } from "framer-motion";
import { FileText, Download } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import AppLayout from "@/components/layout/AppLayout";
import RiskBadge from "@/components/dashboard/RiskBadge";
import { fetchEntities } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import type { RiskLevel } from "@/data/mockData";

export default function ReportsPage() {
  const { data: entities } = useQuery({ queryKey: ["entities-reports"], queryFn: () => fetchEntities() });

  const reports = (entities || []).filter((e) => e.risk_score >= 40).map((e) => ({
    ...e,
    sections: ["Profile Summary", "Contract Analysis", "Complaint History", "Network Relationships", "AI Prediction", "Evidence Summary"],
  }));

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Investigation Reports</h1>
          <p className="text-sm text-muted-foreground mt-1">Auto-generated corruption investigation reports</p>
        </div>

        <div className="space-y-3 max-w-4xl">
          {reports.map((report, i) => (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className="glass-panel-hover p-5 flex items-center gap-4"
            >
              <div className="p-2.5 rounded-lg bg-primary/10 shrink-0">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold">Investigation Report: {report.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{report.department} • {report.location} • Score: {report.risk_score}/100</p>
                <div className="flex gap-1.5 mt-2 flex-wrap">
                  {report.sections.slice(0, 3).map((s) => (
                    <span key={s} className="px-2 py-0.5 rounded-full bg-secondary text-[10px] text-muted-foreground">{s}</span>
                  ))}
                  <span className="text-[10px] text-muted-foreground">+{report.sections.length - 3} more</span>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <RiskBadge level={report.risk_level as RiskLevel} />
                <Button size="sm" variant="outline" onClick={() => toast.info("PDF generation available with full backend integration")} className="text-xs border-border/50 text-foreground hover:bg-secondary">
                  <Download className="w-3.5 h-3.5 mr-1.5" /> PDF
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
