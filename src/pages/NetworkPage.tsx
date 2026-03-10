import { useCallback, useRef, useEffect } from "react";
import ForceGraph2D from "react-force-graph-2d";
import AppLayout from "@/components/layout/AppLayout";
import { graphData } from "@/data/mockData";

const nodeColors: Record<string, string> = {
  officer: "#3A86FF",
  politician: "#FF4D4D",
  company: "#F59E0B",
  contractor: "#F97316",
  project: "#2EC4B6",
};

const linkColors: Record<string, string> = {
  contract: "#3A86FF",
  financial: "#FF4D4D",
  political: "#F59E0B",
  oversight: "#2EC4B6",
  subcontract: "#F97316",
  complaint: "#EF4444",
};

export default function NetworkPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const graphRef = useRef<any>(null);

  useEffect(() => {
    if (graphRef.current) {
      graphRef.current.d3Force("charge").strength(-300);
    }
  }, []);

  const paintNode = useCallback((node: any, ctx: CanvasRenderingContext2D) => {
    const r = node.val || 8;
    const color = nodeColors[node.type] || "#3A86FF";

    // Glow
    ctx.shadowColor = color;
    ctx.shadowBlur = node.riskScore > 60 ? 15 : 5;

    ctx.beginPath();
    ctx.arc(node.x, node.y, r, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();

    ctx.shadowBlur = 0;

    // Label
    ctx.font = "4px Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.fillStyle = "#E2E8F0";
    ctx.fillText(node.name, node.x, node.y + r + 6);
  }, []);

  return (
    <AppLayout>
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl font-bold">Corruption Network Graph</h1>
          <p className="text-sm text-muted-foreground mt-1">Interactive relationship visualization</p>
        </div>

        <div className="flex flex-wrap gap-4">
          {Object.entries(nodeColors).map(([type, color]) => (
            <div key={type} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
              <span className="text-xs text-muted-foreground capitalize">{type}</span>
            </div>
          ))}
        </div>

        <div ref={containerRef} className="glass-panel overflow-hidden" style={{ height: "calc(100vh - 200px)" }}>
          <ForceGraph2D
            ref={graphRef}
            graphData={graphData}
            nodeCanvasObject={paintNode}
            nodePointerAreaPaint={(node: any, color, ctx) => {
              const r = node.val || 8;
              ctx.beginPath();
              ctx.arc(node.x, node.y, r + 4, 0, 2 * Math.PI);
              ctx.fillStyle = color;
              ctx.fill();
            }}
            linkColor={(link: any) => linkColors[link.type] || "#3A86FF"}
            linkWidth={1.5}
            linkDirectionalParticles={2}
            linkDirectionalParticleWidth={2}
            linkDirectionalParticleColor={(link: any) => linkColors[link.type] || "#3A86FF"}
            backgroundColor="transparent"
            width={containerRef.current?.clientWidth || 800}
            height={containerRef.current?.clientHeight || 600}
          />
        </div>
      </div>
    </AppLayout>
  );
}
