import { supabase } from "@/integrations/supabase/client";

export interface DbEntity {
  id: string;
  name: string;
  type: string;
  department: string | null;
  designation: string | null;
  location: string;
  risk_score: number;
  risk_level: string;
  complaints_count: number;
  contracts_count: number;
  news_hits: number;
  political_connections: number;
  dark_web_signals: number;
  financial_anomalies: number;
  prediction_score: number;
  avatar_url: string | null;
  bio: string | null;
  created_at: string;
  declared_income: number;
  known_spending: number;
  known_assets: number;
  wealth_source: string | null;
  income_spending_ratio: number;
  disproportionate_wealth: boolean;
}

export interface DbComplaint {
  id: string;
  tracking_id: string;
  reporter_name: string | null;
  entity_name: string;
  entity_id: string | null;
  department: string | null;
  location: string | null;
  description: string;
  amount: number | null;
  status: string;
  anonymous: boolean;
  created_at: string;
}

export interface DbNewsReport {
  id: string;
  headline: string;
  source: string;
  published_date: string | null;
  linked_entities: string[];
  keywords: string[];
  risk_level: string;
  content: string | null;
  url: string | null;
  created_at: string;
}

export interface DbRelationship {
  id: string;
  source_entity_id: string;
  target_entity_id: string;
  relationship_type: string;
  description: string | null;
  strength: number;
}

export async function fetchEntities(search?: string) {
  let query = supabase.from("entities").select("*").order("risk_score", { ascending: false });
  if (search && search.length >= 2) {
    query = query.or(`name.ilike.%${search}%,department.ilike.%${search}%,location.ilike.%${search}%`);
  }
  const { data, error } = await query;
  if (error) throw error;
  return data as DbEntity[];
}

export async function fetchEntityById(id: string) {
  const { data, error } = await supabase.from("entities").select("*").eq("id", id).single();
  if (error) throw error;
  return data as DbEntity;
}

export async function fetchComplaints() {
  const { data, error } = await supabase.from("complaints").select("*").order("created_at", { ascending: false });
  if (error) throw error;
  return data as DbComplaint[];
}

export async function submitComplaint(complaint: {
  tracking_id: string;
  entity_name: string;
  department?: string;
  location?: string;
  description: string;
  amount?: number;
  anonymous: boolean;
  reporter_name?: string;
}) {
  const { data, error } = await supabase.from("complaints").insert(complaint).select().single();
  if (error) throw error;
  return data;
}

export async function fetchNewsReports() {
  const { data, error } = await supabase.from("news_reports").select("*").order("published_date", { ascending: false });
  if (error) throw error;
  return data as DbNewsReport[];
}

export async function fetchRelationships() {
  const { data, error } = await supabase.from("relationships").select("*");
  if (error) throw error;
  return data as DbRelationship[];
}

export async function fetchDashboardStats() {
  const [entitiesRes, complaintsRes, newsRes] = await Promise.all([
    supabase.from("entities").select("id, risk_score, risk_level, type"),
    supabase.from("complaints").select("id, status"),
    supabase.from("news_reports").select("id"),
  ]);

  const entities = entitiesRes.data || [];
  const complaints = complaintsRes.data || [];

  return {
    totalComplaints: complaints.length,
    highRiskOfficials: entities.filter((e: any) => e.risk_level === "high" && (e.type === "officer" || e.type === "politician")).length,
    suspiciousContractors: entities.filter((e: any) => e.risk_level === "high" && (e.type === "contractor" || e.type === "company")).length,
    aiPredictions: entities.filter((e: any) => e.risk_score > 0).length,
    totalEntities: entities.length,
    investigating: complaints.filter((c: any) => c.status === "investigating").length,
  };
}

export async function analyzeEntity(entityData: DbEntity) {
  const { data, error } = await supabase.functions.invoke("analyze-corruption", {
    body: { entityData },
  });
  if (error) throw error;
  return data;
}

export async function investigateEntity(entityData: DbEntity) {
  const { data, error } = await supabase.functions.invoke("investigate-entity", {
    body: { entityData },
  });
  if (error) throw error;
  return data;
}

export async function scrapeEntityIntel(entityName: string, entityType: string) {
  const { data, error } = await supabase.functions.invoke("scrape-entity-intel", {
    body: { entityName, entityType },
  });
  if (error) throw error;
  return data;
}

export async function scrapeLatestNews(query: string) {
  const { data, error } = await supabase.functions.invoke("scrape-entity-intel", {
    body: { entityName: query, entityType: "news_scan" },
  });
  if (error) throw error;
  return data;
}

export interface DbTimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  category: string;
  risk_level: string;
  entities: string[];
  proof: string | null;
  source: string | null;
  linked_entity_ids: string[] | null;
  created_at: string;
}

export async function fetchTimelineEvents(category?: string) {
  let query = supabase.from("timeline_events").select("*").order("date", { ascending: false });
  if (category && category !== "all") {
    query = query.eq("category", category);
  }
  const { data, error } = await query;
  if (error) throw error;
  return data as DbTimelineEvent[];
}

export async function seedTimelineEvents(events: Omit<DbTimelineEvent, "id" | "created_at">[]) {
  const { data, error } = await supabase.from("timeline_events").insert(events).select();
  if (error) throw error;
  return data;
}
