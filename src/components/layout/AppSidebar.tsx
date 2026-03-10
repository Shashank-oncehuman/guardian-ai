import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard, Search, Network, Newspaper, Shield, FileText,
  MessageSquareWarning, Map, ChevronLeft, ChevronRight, Eye
} from "lucide-react";

const navItems = [
  { path: "/", label: "Dashboard", icon: LayoutDashboard },
  { path: "/search", label: "Entity Search", icon: Search },
  { path: "/network", label: "Network Graph", icon: Network },
  { path: "/news", label: "News Scanner", icon: Newspaper },
  { path: "/whistleblower", label: "Whistleblower", icon: MessageSquareWarning },
  { path: "/reports", label: "Reports", icon: FileText },
  { path: "/heatmap", label: "Heatmap", icon: Map },
];

export default function AppSidebar() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 260 }}
      className="fixed left-0 top-0 h-screen glass-panel z-50 flex flex-col border-r border-border/50"
    >
      <div className="flex items-center gap-3 px-4 py-5 border-b border-border/50">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/20 shrink-0">
          <Eye className="w-5 h-5 text-primary" />
        </div>
        {!collapsed && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h1 className="text-sm font-bold tracking-wide text-gradient-primary">IntegrityAI</h1>
            <p className="text-[10px] text-muted-foreground tracking-widest uppercase">Intelligence System</p>
          </motion.div>
        )}
      </div>

      <nav className="flex-1 py-4 space-y-1 px-2 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link key={item.path} to={item.path}>
              <motion.div
                whileHover={{ x: 4 }}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  isActive
                    ? "bg-primary/15 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                }`}
              >
                <item.icon className="w-5 h-5 shrink-0" />
                {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
              </motion.div>
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-border/50">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center justify-center w-full py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      <div className="px-4 py-3 border-t border-border/50">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-success" />
            <span className="text-xs text-muted-foreground">System Secure</span>
          </div>
        )}
      </div>
    </motion.aside>
  );
}
