import { useCallback, useRef, useEffect, useMemo } from "react";
import ForceGraph2D from "react-force-graph-2d";
import { useQuery } from "@tanstack/react-query";
import AppLayout from "@/components/layout/AppLayout";
import { fetchEntities, fetchRelationships } from "@/lib/api";

const typeColors: Record<string, string> = {
  officer: "#3A86FF",
  politician: "#FF4D4D",
  company: "#F59E0B",
  contractor: "#F97316",
  celebrity: "#A855F7",
  business_magnate: "#EC4899",
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

  const { data: entities } = useQuery({ queryKey: ["entities-all"], queryFn: () => fetchEntities() });
  const { data: relationships } = useQuery({ queryKey: ["relationships"], queryFn: fetchRelationships });

  const graphData = useMemo(() => {
    if (!entities || !relationships) return { nodes: [], links: [] };
    
    const relEntityIds = new Set<string>();
    relationships.forEach((r) => {
      relEntityIds.add(r.source_entity_id);
      relEntityIds.add(r.target_entity_id);
    });

    const nodes = entities
      .filter((e) => relEntityIds.has(e.id))
      .map((e) => ({
        id: e.id,
        name: e.name,
        type: e.type,
        riskScore: e.risk_score,
        val: Math.max(6, e.risk_score / 6),
      }));

    const links = relationships.map((r) => ({
      source: r.source_entity_id,
      target: r.target_entity_id,
      type: r.relationship_type,
    }));

    return { nodes, links };
  }, [entities, relationships]);

  useEffect(() => {
    if (graphRef.current) {
      graphRef.current.d3Force("charge").strength(-400);
    }
  }, [graphData]);

  const paintNode = useCallback((node: any, ctx: CanvasRenderingContext2D) => {
    const r = node.val || 8;
    const color = typeColors[node.type] || "#3A86FF";
    ctx.shadowColor = color;
    ctx.shadowBlur = node.riskScore > 60 ? 15 : 5;
    ctx.beginPath();
    ctx.arc(node.x, node.y, r, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.shadowBlur = 0;
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
          <p className="text-sm text-muted-foreground mt-1">Interactive relationship visualization from database</p>
        </div>
        <div className="flex flex-wrap gap-4">
          {Object.entries(typeColors).map(([type, color]) => (
            <div key={type} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
              <span className="text-xs text-muted-foreground capitalize">{type.replace('_', ' ')}</span>
            </div>
          ))}
        </div>
        <div ref={containerRef} className="glass-panel overflow-hidden" style={{ height: "calc(100vh - 200px)" }}>
          {graphData.nodes.length > 0 ? (
            <ForceGraph2D
              ref={graphRef}
              graphData={graphData}
              nodeCanvasObject={paintNode}
              nodePointerAreaPaint={(node: any, color, ctx) => {
                ctx.beginPath();
                ctx.arc(node.x, node.y, (node.val || 8) + 4, 0, 2 * Math.PI);
                ctx.fillStyle = color;
                ctx.fill();
              }}
              linkColor={(link: any) => linkColors[link.type] || "#3A86FF"}
              linkWidth={1.5}
              linkDirectionalParticles={2}
              linkDirectionalParticleWidth={2}
              linkDirectionalParticleColor={(link: any) => linkColors[link.type] || "#3A86FF"}
              backgroundColor="transparent"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground text-sm">Loading network data...</div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
