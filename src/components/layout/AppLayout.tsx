import { ReactNode, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import AppSidebar from "./AppSidebar";
import { Menu, X } from "lucide-react";

export default function AppLayout({ children }: { children: ReactNode }) {
  const isMobile = useIsMobile();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile overlay */}
      {isMobile && mobileOpen && (
        <div className="fixed inset-0 bg-background/60 backdrop-blur-sm z-40" onClick={() => setMobileOpen(false)} />
      )}

      <AppSidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      {/* Mobile header */}
      {isMobile && (
        <header className="fixed top-0 left-0 right-0 z-30 h-14 glass-panel rounded-none border-x-0 border-t-0 flex items-center px-4 gap-3">
          <button onClick={() => setMobileOpen(true)} className="p-1.5 rounded-lg hover:bg-secondary/50 text-muted-foreground">
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="IntegrityAI" className="w-7 h-7" />
            <span className="text-sm font-bold text-gradient-primary">IntegrityAI</span>
          </div>
        </header>
      )}

      <main className={`min-h-screen p-4 sm:p-6 transition-all relative z-10 ${isMobile ? "ml-0 pt-18" : "ml-[260px]"}`}>
        {children}
      </main>
    </div>
  );
}
