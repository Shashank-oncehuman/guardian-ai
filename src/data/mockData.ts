export type RiskLevel = "low" | "medium" | "high";

export interface Entity {
  id: string;
  name: string;
  type: "officer" | "politician" | "contractor" | "company";
  department?: string;
  designation?: string;
  location: string;
  riskScore: number;
  riskLevel: RiskLevel;
  complaints: number;
  contracts: number;
  newsHits: number;
  politicalConnections: number;
  darkWebSignals: number;
  financialAnomalies: number;
  predictionScore: number;
  avatar?: string;
}

export interface Complaint {
  id: string;
  trackingId: string;
  entityName: string;
  department: string;
  location: string;
  description: string;
  amount?: number;
  status: "pending" | "investigating" | "resolved";
  date: string;
  anonymous: boolean;
}

export interface NewsReport {
  id: string;
  headline: string;
  source: string;
  date: string;
  linkedEntities: string[];
  keywords: string[];
  riskLevel: RiskLevel;
}

export interface GraphNode {
  id: string;
  name: string;
  type: string;
  riskScore: number;
  val: number;
}

export interface GraphLink {
  source: string;
  target: string;
  type: string;
}

export const entities: Entity[] = [
  { id: "1", name: "Rajesh Kumar", type: "officer", department: "Public Works", designation: "Chief Engineer", location: "Delhi", riskScore: 72, riskLevel: "high", complaints: 14, contracts: 47, newsHits: 8, politicalConnections: 5, darkWebSignals: 2, financialAnomalies: 6, predictionScore: 72 },
  { id: "2", name: "Suresh Patel", type: "politician", department: "Municipal Corp", designation: "Councillor", location: "Mumbai", riskScore: 85, riskLevel: "high", complaints: 22, contracts: 31, newsHits: 15, politicalConnections: 12, darkWebSignals: 4, financialAnomalies: 9, predictionScore: 85 },
  { id: "3", name: "SK Infrastructure", type: "company", department: "Construction", designation: "Contractor Firm", location: "Gujarat", riskScore: 68, riskLevel: "high", complaints: 9, contracts: 63, newsHits: 5, politicalConnections: 7, darkWebSignals: 3, financialAnomalies: 8, predictionScore: 68 },
  { id: "4", name: "Anita Sharma", type: "officer", department: "Education", designation: "Director", location: "Rajasthan", riskScore: 25, riskLevel: "low", complaints: 2, contracts: 12, newsHits: 1, politicalConnections: 1, darkWebSignals: 0, financialAnomalies: 1, predictionScore: 25 },
  { id: "5", name: "Vikram Singh", type: "contractor", department: "Road Construction", designation: "Contractor", location: "UP", riskScore: 54, riskLevel: "medium", complaints: 7, contracts: 28, newsHits: 3, politicalConnections: 4, darkWebSignals: 1, financialAnomalies: 4, predictionScore: 54 },
  { id: "6", name: "Meera Reddy", type: "politician", department: "State Assembly", designation: "MLA", location: "Telangana", riskScore: 41, riskLevel: "medium", complaints: 5, contracts: 19, newsHits: 4, politicalConnections: 8, darkWebSignals: 0, financialAnomalies: 3, predictionScore: 41 },
  { id: "7", name: "Golden Builders Pvt Ltd", type: "company", department: "Real Estate", designation: "Developer", location: "Karnataka", riskScore: 78, riskLevel: "high", complaints: 18, contracts: 55, newsHits: 11, politicalConnections: 9, darkWebSignals: 5, financialAnomalies: 7, predictionScore: 78 },
  { id: "8", name: "Arun Mishra", type: "officer", department: "Revenue", designation: "Collector", location: "MP", riskScore: 33, riskLevel: "medium", complaints: 4, contracts: 15, newsHits: 2, politicalConnections: 3, darkWebSignals: 0, financialAnomalies: 2, predictionScore: 33 },
  { id: "9", name: "Priya Nair", type: "officer", department: "Health", designation: "CMO", location: "Kerala", riskScore: 15, riskLevel: "low", complaints: 1, contracts: 8, newsHits: 0, politicalConnections: 1, darkWebSignals: 0, financialAnomalies: 0, predictionScore: 15 },
  { id: "10", name: "National Roads Corp", type: "company", department: "Infrastructure", designation: "PSU", location: "Delhi", riskScore: 45, riskLevel: "medium", complaints: 6, contracts: 72, newsHits: 7, politicalConnections: 6, darkWebSignals: 1, financialAnomalies: 5, predictionScore: 45 },
];

export const complaints: Complaint[] = [
  { id: "1", trackingId: "WB-2026-001", entityName: "Rajesh Kumar", department: "Public Works", location: "Delhi", description: "Alleged favoritism in highway contract award to SK Infrastructure", amount: 45000000, status: "investigating", date: "2026-02-15", anonymous: true },
  { id: "2", trackingId: "WB-2026-002", entityName: "Suresh Patel", department: "Municipal Corp", location: "Mumbai", description: "Inflated project costs for city drainage renovation", amount: 120000000, status: "pending", date: "2026-02-28", anonymous: true },
  { id: "3", trackingId: "WB-2026-003", entityName: "Golden Builders Pvt Ltd", department: "Real Estate", location: "Karnataka", description: "Suspected land acquisition fraud with political backing", amount: 250000000, status: "investigating", date: "2026-01-10", anonymous: false },
  { id: "4", trackingId: "WB-2026-004", entityName: "Vikram Singh", department: "Road Construction", location: "UP", description: "Sub-standard material used in road construction project", amount: 8000000, status: "resolved", date: "2025-12-05", anonymous: true },
];

export const newsReports: NewsReport[] = [
  { id: "1", headline: "Highway Contract Scam Investigation Widens", source: "Times of India", date: "2026-03-08", linkedEntities: ["Rajesh Kumar", "SK Infrastructure"], keywords: ["scam", "highway", "contract"], riskLevel: "high" },
  { id: "2", headline: "Municipal Fund Misuse Allegations Against Councillor", source: "NDTV", date: "2026-03-05", linkedEntities: ["Suresh Patel"], keywords: ["fund misuse", "municipal", "corruption"], riskLevel: "high" },
  { id: "3", headline: "Real Estate Developer Under Scanner for Land Deals", source: "Economic Times", date: "2026-03-01", linkedEntities: ["Golden Builders Pvt Ltd"], keywords: ["real estate", "land fraud", "investigation"], riskLevel: "high" },
  { id: "4", headline: "Road Construction Quality Audit Reveals Irregularities", source: "The Hindu", date: "2026-02-25", linkedEntities: ["Vikram Singh"], keywords: ["road", "quality", "irregularity"], riskLevel: "medium" },
  { id: "5", headline: "State Assembly Questions Infrastructure Spending", source: "Indian Express", date: "2026-02-20", linkedEntities: ["Meera Reddy", "National Roads Corp"], keywords: ["infrastructure", "spending", "assembly"], riskLevel: "medium" },
];

export const graphData = {
  nodes: [
    { id: "rajesh", name: "Rajesh Kumar", type: "officer", riskScore: 72, val: 15 },
    { id: "suresh", name: "Suresh Patel", type: "politician", riskScore: 85, val: 18 },
    { id: "sk_infra", name: "SK Infrastructure", type: "company", riskScore: 68, val: 14 },
    { id: "golden", name: "Golden Builders", type: "company", riskScore: 78, val: 16 },
    { id: "vikram", name: "Vikram Singh", type: "contractor", riskScore: 54, val: 10 },
    { id: "meera", name: "Meera Reddy", type: "politician", riskScore: 41, val: 8 },
    { id: "highway_proj", name: "Highway NH-44 Project", type: "project", riskScore: 70, val: 12 },
    { id: "drain_proj", name: "City Drainage Project", type: "project", riskScore: 60, val: 10 },
    { id: "land_proj", name: "Land Development Phase 2", type: "project", riskScore: 75, val: 13 },
    { id: "anita", name: "Anita Sharma", type: "officer", riskScore: 25, val: 6 },
    { id: "nrc", name: "National Roads Corp", type: "company", riskScore: 45, val: 9 },
  ] as GraphNode[],
  links: [
    { source: "rajesh", target: "sk_infra", type: "contract" },
    { source: "rajesh", target: "highway_proj", type: "oversight" },
    { source: "sk_infra", target: "highway_proj", type: "contract" },
    { source: "suresh", target: "drain_proj", type: "political" },
    { source: "suresh", target: "golden", type: "financial" },
    { source: "golden", target: "land_proj", type: "contract" },
    { source: "vikram", target: "highway_proj", type: "subcontract" },
    { source: "vikram", target: "sk_infra", type: "financial" },
    { source: "meera", target: "nrc", type: "political" },
    { source: "meera", target: "suresh", type: "political" },
    { source: "rajesh", target: "suresh", type: "complaint" },
    { source: "nrc", target: "highway_proj", type: "contract" },
  ] as GraphLink[],
};

export const dashboardStats = {
  totalComplaints: 1247,
  highRiskOfficials: 23,
  suspiciousContractors: 45,
  aiPredictions: 156,
  complaintsChange: 12.5,
  officialsChange: -3.2,
  contractorsChange: 8.1,
  predictionsChange: 24.7,
};

export const trendData = [
  { month: "Sep", complaints: 89, investigations: 34, resolved: 22 },
  { month: "Oct", complaints: 102, investigations: 41, resolved: 28 },
  { month: "Nov", complaints: 95, investigations: 38, resolved: 31 },
  { month: "Dec", complaints: 118, investigations: 52, resolved: 35 },
  { month: "Jan", complaints: 134, investigations: 58, resolved: 40 },
  { month: "Feb", complaints: 127, investigations: 63, resolved: 45 },
  { month: "Mar", complaints: 142, investigations: 71, resolved: 48 },
];

export const departmentRisk = [
  { department: "Public Works", risk: 78, complaints: 245 },
  { department: "Municipal Corp", risk: 72, complaints: 198 },
  { department: "Revenue", risk: 65, complaints: 167 },
  { department: "Infrastructure", risk: 61, complaints: 156 },
  { department: "Education", risk: 38, complaints: 89 },
  { department: "Health", risk: 28, complaints: 54 },
];

export const heatmapRegions = [
  { name: "Delhi", lat: 28.6, lng: 77.2, complaints: 234, riskLevel: "high" as RiskLevel, officers: 12, projects: 8 },
  { name: "Mumbai", lat: 19.07, lng: 72.87, complaints: 198, riskLevel: "high" as RiskLevel, officers: 9, projects: 11 },
  { name: "Gujarat", lat: 22.3, lng: 71.8, complaints: 156, riskLevel: "high" as RiskLevel, officers: 7, projects: 6 },
  { name: "UP", lat: 26.85, lng: 80.95, complaints: 178, riskLevel: "high" as RiskLevel, officers: 14, projects: 9 },
  { name: "Karnataka", lat: 15.3, lng: 75.7, complaints: 112, riskLevel: "medium" as RiskLevel, officers: 5, projects: 7 },
  { name: "Rajasthan", lat: 27.02, lng: 74.2, complaints: 67, riskLevel: "medium" as RiskLevel, officers: 4, projects: 3 },
  { name: "MP", lat: 23.47, lng: 77.9, complaints: 89, riskLevel: "medium" as RiskLevel, officers: 6, projects: 5 },
  { name: "Kerala", lat: 10.85, lng: 76.27, complaints: 34, riskLevel: "low" as RiskLevel, officers: 2, projects: 2 },
  { name: "Telangana", lat: 18.11, lng: 79.01, complaints: 78, riskLevel: "medium" as RiskLevel, officers: 4, projects: 4 },
  { name: "Tamil Nadu", lat: 11.13, lng: 78.66, complaints: 45, riskLevel: "low" as RiskLevel, officers: 3, projects: 3 },
];
