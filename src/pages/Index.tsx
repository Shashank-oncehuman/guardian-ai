import { motion } from "framer-motion";
import { AlertTriangle, FileSearch, Users, Brain, Shield, Activity, Eye } from "lucide-react";
import { Area, AreaChart, Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { useQuery } from "@tanstack/react-query";
import AppLayout from "@/components/layout/AppLayout";
import StatCard from "@/components/dashboard/StatCard";
import RiskBadge from "@/components/dashboard/RiskBadge";
import ScrollReveal from "@/components/cinematic/ScrollReveal";
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
      <div className="space-y-6 relative z-10">
        {/* Cinematic Hero Header */}
        <ScrollReveal direction="up">
          <div className="relative overflow-hidden rounded-2xl p-8 mb-2">
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 animate-pulse-glow" />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background" />
            
            <div className="relative flex items-center justify-between">
              <div>
                <motion.div
                  initial={{ opacity: 0, letterSpacing: "0.3em", filter: "blur(8px)" }}
                  animate={{ opacity: 1, letterSpacing: "0.05em", filter: "blur(0px)" }}
                  transition={{ duration: 1.2, delay: 2.4 }}
                >
                  <h1 className="text-3xl md:text-4xl font-bold text-gradient-primary">
                    Intelligence Dashboard
                  </h1>
                </motion.div>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 0.7, y: 0 }}
                  transition={{ delay: 3.0, duration: 0.6 }}
                  className="text-sm text-muted-foreground mt-2"
                >
                  Real-time corruption intelligence overview
                </motion.p>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 3.2 }}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 border border-success/20 backdrop-blur-sm"
              >
                <Activity className="w-3.5 h-3.5 text-success animate-pulse-glow" />
                <span className="text-xs text-success font-medium tracking-wide">Live Monitoring</span>
              </motion.div>
            </div>
          </div>
        </ScrollReveal>

        {/* Stats with staggered cinematic reveal */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {[
            { title: "Total Complaints", value: stats?.totalComplaints ?? 0, change: 12.5, icon: AlertTriangle, delay: 0 },
            { title: "High Risk Officials", value: stats?.highRiskOfficials ?? 0, change: -3.2, icon: Users, delay: 0.1 },
            { title: "Suspicious Contractors", value: stats?.suspiciousContractors ?? 0, change: 8.1, icon: FileSearch, delay: 0.2 },
            { title: "Entities Analyzed", value: stats?.totalEntities ?? 0, change: 24.7, icon: Brain, delay: 0.3 },
          ].map((stat, i) => (
            <ScrollReveal key={stat.title} direction="up" delay={stat.delay}>
              <StatCard title={stat.title} value={stat.value} change={stat.change} icon={stat.icon} />
            </ScrollReveal>
          ))}
        </div>

        {/* Charts with cinematic scroll reveal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <ScrollReveal direction="left">
            <div className="glass-panel p-5 group hover:border-primary/20 transition-all duration-500">
              <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
                <Eye className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                Corruption Trend Analysis
              </h3>
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
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div className="glass-panel p-5 group hover:border-primary/20 transition-all duration-500">
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
            </div>
          </ScrollReveal>
        </div>

        {/* Bottom panels */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <ScrollReveal direction="scale" delay={0.1}>
            <div className="glass-panel p-5 group">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-4 h-4 text-danger" />
                <h3 className="text-sm font-semibold">High Risk Entities</h3>
              </div>
              <div className="space-y-3">
                {highRiskEntities.map((entity, i) => (
                  <motion.div
                    key={entity.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ x: 4, backgroundColor: "hsl(222, 30%, 16%)" }}
                    className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 transition-colors cursor-pointer"
                  >
                    <div>
                      <p className="text-sm font-medium">{entity.name}</p>
                      <p className="text-xs text-muted-foreground">{entity.department} • {entity.location}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-bold text-danger">{entity.risk_score}</span>
                      <RiskBadge level={entity.risk_level as RiskLevel} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="scale" delay={0.2}>
            <div className="glass-panel p-5">
              <h3 className="text-sm font-semibold mb-4">Recent Intelligence Signals</h3>
              <div className="space-y-3">
                {recentNews.map((n, i) => (
                  <motion.div
                    key={n.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ x: -4 }}
                    className="p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-all duration-300 cursor-pointer"
                  >
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
                  </motion.div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </AppLayout>
  );
}
