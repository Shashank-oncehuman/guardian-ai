import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { entityName, entityType } = await req.json();
    if (!entityName) {
      return new Response(JSON.stringify({ success: false, error: "Entity name is required" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const FIRECRAWL_API_KEY = Deno.env.get("FIRECRAWL_API_KEY");
    if (!FIRECRAWL_API_KEY) {
      return new Response(JSON.stringify({ success: false, error: "Firecrawl connector not configured" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return new Response(JSON.stringify({ success: false, error: "LOVABLE_API_KEY not configured" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Build corruption-focused search queries
    const queries = [
      `${entityName} corruption scandal investigation`,
      `${entityName} fraud charges case`,
      `${entityName} income assets disproportionate wealth`,
    ];

    console.log("Scraping intel for:", entityName, "queries:", queries.length);

    // Run searches in parallel
    const searchPromises = queries.map((query) =>
      fetch("https://api.firecrawl.dev/v1/search", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${FIRECRAWL_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query,
          limit: 5,
          scrapeOptions: { formats: ["markdown"] },
        }),
      }).then(async (r) => {
        if (!r.ok) {
          const errText = await r.text();
          console.error(`Firecrawl search error for "${query}":`, r.status, errText);
          if (r.status === 402) throw new Error("INSUFFICIENT_CREDITS");
          return { success: false, data: [] };
        }
        return r.json();
      }).catch((err) => {
        if (err.message === "INSUFFICIENT_CREDITS") throw err;
        console.error(`Firecrawl fetch error for "${query}":`, err);
        return { success: false, data: [] };
      })
    );

    let allResults: any[];
    try {
      allResults = await Promise.all(searchPromises);
    } catch (err: any) {
      if (err.message === "INSUFFICIENT_CREDITS") {
        return new Response(JSON.stringify({ success: false, error: "Firecrawl credits exhausted. Please upgrade your Firecrawl plan." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      throw err;
    }

    // Deduplicate results by URL
    const seen = new Set<string>();
    const articles: any[] = [];
    for (const result of allResults) {
      for (const item of (result.data || [])) {
        if (item.url && !seen.has(item.url)) {
          seen.add(item.url);
          articles.push({
            url: item.url,
            title: item.title || item.metadata?.title || "Untitled",
            description: item.description || "",
            markdown: (item.markdown || "").slice(0, 2000),
            source: new URL(item.url).hostname,
          });
        }
      }
    }

    console.log(`Found ${articles.length} unique articles for ${entityName}`);

    // Use AI to analyze all scraped content and produce corruption intel summary
    const snippets = articles.slice(0, 8).map((a, i) =>
      `[${i + 1}] "${a.title}" (${a.source})\n${a.markdown.slice(0, 500)}`
    ).join("\n\n---\n\n");

    const aiPrompt = `You are a corruption intelligence analyst. I scraped the following web articles about "${entityName}" (${entityType || "unknown type"}).

Analyze ALL the scraped content below and produce a JSON response with:
1. "corruption_signals": Array of specific corruption signals found (max 10)
2. "key_findings": Array of key findings with source attribution (max 8), each as { "finding": string, "source": string, "severity": "high"|"medium"|"low" }
3. "financial_red_flags": Array of financial red flags detected
4. "linked_entities": Array of names of other people/companies linked to this person in corruption
5. "summary": A 2-3 paragraph intelligence summary of what was found
6. "risk_adjustment": A number (-20 to +20) suggesting how much to adjust the corruption risk score based on what was found

SCRAPED CONTENT:
${snippets || "No articles found."}

Respond ONLY with valid JSON.`;

    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: "You are a corruption intelligence analyst. Always respond with valid JSON only." },
          { role: "user", content: aiPrompt },
        ],
      }),
    });

    let aiAnalysis: any = null;
    if (aiResponse.ok) {
      const aiData = await aiResponse.json();
      const content = aiData.choices?.[0]?.message?.content || "";
      try {
        const cleaned = content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
        aiAnalysis = JSON.parse(cleaned);
      } catch {
        console.error("Failed to parse AI analysis:", content);
        aiAnalysis = { summary: content, corruption_signals: [], key_findings: [], financial_red_flags: [], linked_entities: [], risk_adjustment: 0 };
      }
    }

    return new Response(JSON.stringify({
      success: true,
      articles_found: articles.length,
      articles: articles.slice(0, 10),
      analysis: aiAnalysis,
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (e) {
    console.error("Error:", e);
    return new Response(JSON.stringify({ success: false, error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
