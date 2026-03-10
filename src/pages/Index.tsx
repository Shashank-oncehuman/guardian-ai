import { motion } from "framer-motion";
import { AlertTriangle, FileSearch, Users, Brain, Shield, Activity } from "lucide-react";
import { Area, AreaChart, Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { useQuery } from "@tanstack/react-query";
import AppLayout from "@/components/layout/AppLayout";
import StatCard from "@/components/dashboard/StatCard";
import RiskBadge from "@/components/dashboard/RiskBadge";
import { fetchDashboardStats, fetchEntities, fetchNewsReports } from "@/lib/api";
import type { RiskLevel } from "@/data/mockData";
import { trendData, departmentRisk } from "@/data/mockData";

export default function Dashboard() {
  const { data: stats } = useQuery({ queryKey: ["dashboard-stats"], queryFn: fetchDashboardStats });
  const { data: entities } = useQuery({ queryKey: ["entities-high"], queryFn: () => fetchEntities() });
  const { data: news } = useQuery({ queryKey: ["news"], queryFn: fetchNewsReports });

  const highRiskEntities = (entities || []).filter((e) => e.risk_level === "high").slice(0, 6);
  const recentNews = (news || []).slice(0, 5);

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Intelligence Dashboard</h1>
            <p className="text-sm text-muted-foreground mt-1">Real-time corruption intelligence overview</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-success/10 border border-success/20">
            <Activity className="w-3.5 h-3.5 text-success animate-pulse-glow" />
            <span className="text-xs text-success font-medium">Live Monitoring</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          <StatCard title="Total Complaints" value={stats?.totalComplaints ?? 0} change={12.5} icon={AlertTriangle} />
          <StatCard title="High Risk Officials" value={stats?.highRiskOfficials ?? 0} change={-3.2} icon={Users} />
          <StatCard title="Suspicious Contractors" value={stats?.suspiciousContractors ?? 0} change={8.1} icon={FileSearch} />
          <StatCard title="Entities Analyzed" value={stats?.totalEntities ?? 0} change={24.7} icon={Brain} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-panel p-5">
            <h3 className="text-sm font-semibold mb-4">Corruption Trend Analysis</h3>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="colorComplaints" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorResolved" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(170, 60%, 45%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(170, 60%, 45%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 30%, 18%)" />
                <XAxis dataKey="month" stroke="hsl(215, 20%, 55%)" fontSize={12} />
                <YAxis stroke="hsl(215, 20%, 55%)" fontSize={12} />
                <Tooltip contentStyle={{ background: "hsl(222, 40%, 10%)", border: "1px solid hsl(222, 30%, 18%)", borderRadius: "8px", color: "hsl(210, 40%, 92%)" }} />
                <Area type="monotone" dataKey="complaints" stroke="hsl(217, 91%, 60%)" fill="url(#colorComplaints)" strokeWidth={2} />
                <Area type="monotone" dataKey="resolved" stroke="hsl(170, 60%, 45%)" fill="url(#colorResolved)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-panel p-5">
            <h3 className="text-sm font-semibold mb-4">Department Risk Ranking</h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={departmentRisk} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 30%, 18%)" />
                <XAxis type="number" stroke="hsl(215, 20%, 55%)" fontSize={12} />
                <YAxis dataKey="department" type="category" stroke="hsl(215, 20%, 55%)" fontSize={11} width={100} />
                <Tooltip contentStyle={{ background: "hsl(222, 40%, 10%)", border: "1px solid hsl(222, 30%, 18%)", borderRadius: "8px", color: "hsl(210, 40%, 92%)" }} />
                <Bar dataKey="risk" fill="hsl(217, 91%, 60%)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-panel p-5">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-4 h-4 text-danger" />
              <h3 className="text-sm font-semibold">High Risk Entities</h3>
            </div>
            <div className="space-y-3">
              {highRiskEntities.map((entity) => (
                <div key={entity.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
                  <div>
                    <p className="text-sm font-medium">{entity.name}</p>
                    <p className="text-xs text-muted-foreground">{entity.department} • {entity.location}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-bold text-danger">{entity.risk_score}</span>
                    <RiskBadge level={entity.risk_level as RiskLevel} />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-panel p-5">
            <h3 className="text-sm font-semibold mb-4">Recent Intelligence Signals</h3>
            <div className="space-y-3">
              {recentNews.map((n) => (
                <div key={n.id} className="p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium">{n.headline}</p>
                      <p className="text-xs text-muted-foreground mt-1">{n.source} • {n.published_date}</p>
                      <div className="flex gap-1.5 mt-2 flex-wrap">
                        {(n.keywords || []).map((kw) => (
                          <span key={kw} className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-medium">{kw}</span>
                        ))}
                      </div>
                    </div>
                    <RiskBadge level={n.risk_level as RiskLevel} />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </AppLayout>
  );
}
