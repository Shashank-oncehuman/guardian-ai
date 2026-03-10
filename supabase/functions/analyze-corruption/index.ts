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

    const prompt = `You are an AI corruption risk analyst. Analyze the following entity profile and provide a detailed corruption risk assessment.

Entity: ${entityData.name}
Type: ${entityData.type}
Department: ${entityData.department || 'N/A'}
Designation: ${entityData.designation || 'N/A'}
Location: ${entityData.location}
Background: ${entityData.bio || 'No background available'}

Current Statistics:
- Complaints: ${entityData.complaints_count}
- Contracts: ${entityData.contracts_count}
- News Mentions: ${entityData.news_hits}
- Political Connections: ${entityData.political_connections}
- Dark Web Signals: ${entityData.dark_web_signals}
- Financial Anomalies: ${entityData.financial_anomalies}
- Current Risk Score: ${entityData.risk_score}/100

Provide a JSON response with:
1. "prediction_score": A corruption probability percentage (0-100)
2. "risk_factors": Array of detected risk factor strings
3. "analysis": A 2-3 paragraph analysis of the corruption risk
4. "recommendation": One of "monitor", "investigate", "urgent_action"
5. "confidence": Your confidence level as a percentage

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
          { role: "system", content: "You are an AI corruption intelligence analyst. Always respond with valid JSON only. No markdown formatting." },
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
      return new Response(JSON.stringify({ error: "AI analysis failed" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    // Parse the JSON from the AI response
    let analysis;
    try {
      // Remove potential markdown code fences
      const cleaned = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      analysis = JSON.parse(cleaned);
    } catch {
      console.error("Failed to parse AI response:", content);
      analysis = {
        prediction_score: entityData.risk_score,
        risk_factors: ["Unable to parse AI analysis"],
        analysis: content || "Analysis unavailable",
        recommendation: entityData.risk_score >= 60 ? "investigate" : "monitor",
        confidence: 50,
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
