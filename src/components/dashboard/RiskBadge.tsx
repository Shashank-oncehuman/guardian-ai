import { RiskLevel } from "@/data/mockData";

const config: Record<RiskLevel, { label: string; classes: string }> = {
  low: { label: "Low Risk", classes: "bg-success/15 text-success border-success/30" },
  medium: { label: "Medium Risk", classes: "bg-warning/15 text-warning border-warning/30" },
  high: { label: "High Risk", classes: "bg-danger/15 text-danger border-danger/30" },
};

export default function RiskBadge({ level }: { level: RiskLevel }) {
  const { label, classes } = config[level];
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${classes}`}>
      {label}
    </span>
  );
}
