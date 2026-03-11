import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { entityData } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const incomeSpendingRatio = entityData.declared_income > 0
      ? (entityData.known_spending / entityData.declared_income).toFixed(2)
      : "N/A";

    const assetIncomeRatio = entityData.declared_income > 0
      ? (entityData.known_assets / entityData.declared_income).toFixed(2)
      : "N/A";

    const prompt = `You are a forensic financial investigator AI. Analyze this entity's financial profile to detect corruption through income-spending-asset discrepancies.

Entity: ${entityData.name}
Type: ${entityData.type}
Department: ${entityData.department || 'N/A'}
Location: ${entityData.location}
Wealth Source: ${entityData.wealth_source || 'Unknown'}

FINANCIAL PROFILE:
- Declared Annual Income: ₹${(entityData.declared_income || 0).toLocaleString()}
- Known Spending: ₹${(entityData.known_spending || 0).toLocaleString()}
- Known Assets: ₹${(entityData.known_assets || 0).toLocaleString()}
- Income-to-Spending Ratio: ${incomeSpendingRatio}x
- Asset-to-Income Ratio: ${assetIncomeRatio}x

CORRUPTION INDICATORS:
- Complaints: ${entityData.complaints_count}
- Contract Irregularities: ${entityData.contracts_count}
- Political Connections: ${entityData.political_connections}
- News Mentions: ${entityData.news_hits}
- Dark Web Signals: ${entityData.dark_web_signals}
- Financial Anomalies: ${entityData.financial_anomalies}
- Current Risk Score: ${entityData.risk_score}/100

Analyze and return a JSON response with:
1. "corruption_score": Overall corruption probability 0-100 based on financial discrepancies
2. "disproportionate_wealth": boolean - true if assets/spending far exceed declared income
3. "wealth_gap": The estimated gap between declared income and actual wealth in rupees
4. "wealth_gap_percentage": How many times the spending/assets exceed income
5. "suspicious_patterns": Array of specific suspicious financial patterns detected
6. "income_analysis": Brief analysis of income vs spending discrepancy
7. "asset_analysis": Brief analysis of asset accumulation vs income
8. "money_trail_indicators": Array of possible money laundering or bribery indicators
9. "corruption_type": Most likely type of corruption (e.g., "embezzlement", "bribery", "money laundering", "kickbacks", "disproportionate assets")
10. "investigation_priority": "critical" | "high" | "medium" | "low"
11. "detailed_report": A 3-4 paragraph detailed forensic financial analysis
12. "scraped_intel": Array of 3-5 simulated intelligence findings that would come from public records, news, and financial databases about this person's corruption activities

Respond ONLY with valid JSON, no markdown.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: "You are a forensic financial intelligence AI specializing in corruption detection through financial analysis. Always respond with valid JSON only." },
          { role: "user", content: prompt },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limited. Please try again later." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add credits." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "Investigation analysis failed" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    let analysis;
    try {
      const cleaned = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      analysis = JSON.parse(cleaned);
    } catch {
      console.error("Failed to parse AI response:", content);
      analysis = {
        corruption_score: entityData.risk_score,
        disproportionate_wealth: (entityData.known_spending || 0) > (entityData.declared_income || 1) * 5,
        wealth_gap: (entityData.known_spending || 0) - (entityData.declared_income || 0),
        suspicious_patterns: ["Unable to parse detailed analysis"],
        detailed_report: content || "Analysis unavailable",
        investigation_priority: entityData.risk_score >= 70 ? "critical" : "medium",
      };
    }

    return new Response(JSON.stringify(analysis), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("Error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
