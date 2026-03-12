import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard, Search, Network, Newspaper, Shield, FileText,
  MessageSquareWarning, Map, ChevronLeft, ChevronRight, X
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const navItems = [
  { path: "/", label: "Dashboard", icon: LayoutDashboard },
  { path: "/search", label: "Entity Search", icon: Search },
  { path: "/network", label: "Network Graph", icon: Network },
  { path: "/news", label: "News Scanner", icon: Newspaper },
  { path: "/whistleblower", label: "Whistleblower", icon: MessageSquareWarning },
  { path: "/reports", label: "Reports", icon: FileText },
  { path: "/heatmap", label: "Heatmap", icon: Map },
];

interface Props {
  mobileOpen?: boolean;
  onClose?: () => void;
}

export default function AppSidebar({ mobileOpen, onClose }: Props) {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [collapsed, setCollapsed] = useState(false);

  if (isMobile && !mobileOpen) return null;

  return (
    <motion.aside
      initial={isMobile ? { x: -280 } : false}
      animate={{ width: isMobile ? 260 : collapsed ? 72 : 260, x: 0 }}
      exit={isMobile ? { x: -280 } : undefined}
      className={`${isMobile ? "fixed" : "fixed"} left-0 top-0 h-screen glass-panel z-50 flex flex-col border-r border-border/50`}
    >
      <div className="flex items-center gap-3 px-4 py-4 border-b border-border/50">
        <img src="/logo.png" alt="IntegrityAI" className="w-9 h-9 shrink-0 rounded-lg" />
        {(!collapsed || isMobile) && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 min-w-0">
            <h1 className="text-sm font-bold tracking-wide text-gradient-primary">IntegrityAI</h1>
            <p className="text-[10px] text-muted-foreground tracking-widest uppercase">Intelligence System</p>
          </motion.div>
        )}
        {isMobile && (
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-secondary/50 text-muted-foreground ml-auto">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <nav className="flex-1 py-4 space-y-1 px-2 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link key={item.path} to={item.path} onClick={isMobile ? onClose : undefined}>
              <motion.div
                whileHover={{ x: 4 }}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  isActive
                    ? "bg-primary/15 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                }`}
              >
                <item.icon className="w-5 h-5 shrink-0" />
                {(!collapsed || isMobile) && <span className="text-sm font-medium">{item.label}</span>}
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {!isMobile && (
        <div className="p-3 border-t border-border/50">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="flex items-center justify-center w-full py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>
      )}

      <div className="px-4 py-3 border-t border-border/50">
        {(!collapsed || isMobile) && (
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-success" />
            <span className="text-xs text-muted-foreground">System Secure</span>
          </div>
        )}
      </div>
    </motion.aside>
  );
}
