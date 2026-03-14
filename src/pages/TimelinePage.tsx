import { motion } from "framer-motion";
import { Calendar, AlertTriangle, Users, Banknote, FileWarning, Globe, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import RiskBadge from "@/components/dashboard/RiskBadge";
import type { RiskLevel } from "@/data/mockData";

interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  category: "scandal" | "investigation" | "policy" | "financial" | "international" | "arrest";
  riskLevel: RiskLevel;
  entities: string[];
  proof: string;
  source: string;
}

const timelineEvents: TimelineEvent[] = [
  {
    id: "1", date: "2024-01-10", title: "Hindenburg Report Exposes Adani Group",
    description: "Hindenburg Research publishes damning report alleging stock manipulation, accounting fraud, and use of offshore shell entities by the Adani Group, wiping $150B in market value.",
    category: "financial", riskLevel: "high", entities: ["Gautam Adani", "Narendra Modi"],
    proof: "Hindenburg Research Report — 100+ pages of forensic financial analysis documenting offshore shell companies in Mauritius, Cyprus, UAE linked to Adani family.",
    source: "Hindenburg Research, Jan 2023"
  },
  {
    id: "2", date: "2023-03-15", title: "Electoral Bonds Scheme Data Released",
    description: "Supreme Court orders disclosure of Electoral Bonds data revealing massive anonymous donations to BJP from corporations receiving government contracts.",
    category: "financial", riskLevel: "high", entities: ["Narendra Modi", "BJP", "Gautam Adani"],
    proof: "SBI disclosed data showing ₹16,518 Cr in bonds; top donors include companies that received government contracts worth thousands of crores shortly after donating.",
    source: "Supreme Court of India, Feb 2024"
  },
  {
    id: "3", date: "2023-06-20", title: "Pegasus Spyware Scandal — India Connection",
    description: "Investigation reveals Indian government purchased Pegasus spyware from NSO Group (Israel) to surveil journalists, opposition leaders, and activists.",
    category: "international", riskLevel: "high", entities: ["Narendra Modi", "Benjamin Netanyahu", "Amit Shah"],
    proof: "Pegasus Project by Forbidden Stories & Amnesty International confirmed 300+ Indian phone numbers on target list including Rahul Gandhi's close aides.",
    source: "The Wire, Pegasus Project 2021-2023"
  },
  {
    id: "4", date: "2022-11-05", title: "Nirav Modi PNB Fraud — Extradition Approved",
    description: "UK courts approve extradition of Nirav Modi for ₹13,500 Cr Punjab National Bank fraud. Questions raised about how he obtained passport and fled India.",
    category: "arrest", riskLevel: "high", entities: ["Nirav Modi", "Narendra Modi"],
    proof: "CBI chargesheet documents ₹13,578 Cr fraud using fraudulent Letters of Undertaking (LoUs). ED attached assets worth ₹2,500 Cr.",
    source: "CBI, ED Chargesheets"
  },
  {
    id: "5", date: "2023-09-12", title: "Trump Indictment — Election Interference",
    description: "Donald Trump indicted on federal charges related to efforts to overturn 2020 election results, including January 6th Capitol events.",
    category: "investigation", riskLevel: "high", entities: ["Donald Trump"],
    proof: "DOJ Special Counsel Jack Smith's indictment — 4 federal charges including conspiracy to defraud the United States.",
    source: "US Department of Justice, Aug 2023"
  },
  {
    id: "6", date: "2022-02-24", title: "Russia-Ukraine War — Putin's Oligarch Network Exposed",
    description: "Western sanctions following Ukraine invasion expose Putin's hidden wealth network through oligarchs, estimated at $200B+ in hidden assets.",
    category: "international", riskLevel: "high", entities: ["Vladimir Putin"],
    proof: "ICIJ Pandora Papers, FinCEN Files, and EU sanctions lists document properties in Monaco, yachts, and shell companies linked to Putin's inner circle.",
    source: "ICIJ, Pandora Papers"
  },
  {
    id: "7", date: "2024-03-25", title: "Arvind Kejriwal Arrested by ED",
    description: "Delhi CM Arvind Kejriwal arrested by Enforcement Directorate in excise policy case. Critics call it political vendetta; ED claims money trail evidence.",
    category: "arrest", riskLevel: "medium", entities: ["Arvind Kejriwal"],
    proof: "ED alleges ₹100 Cr kickback trail; Supreme Court later grants bail noting 'no evidence of direct involvement' found so far.",
    source: "ED, Supreme Court Orders 2024"
  },
  {
    id: "8", date: "2023-07-10", title: "1MDB Scandal — Najib Razak Sentencing Upheld",
    description: "Malaysia's Federal Court upholds Najib Razak's 12-year prison sentence for 1MDB corruption involving $4.5 billion siphoned from sovereign wealth fund.",
    category: "scandal", riskLevel: "high", entities: ["Najib Razak"],
    proof: "DOJ traced $4.5B stolen from 1MDB; $731M deposited directly into Najib's personal accounts. Convicted on 7 counts.",
    source: "US DOJ, Malaysian Courts"
  },
  {
    id: "9", date: "2024-06-15", title: "Adani Group Wins Major Airport Contracts",
    description: "Adani Group awarded management of 8 major Indian airports despite no prior aviation experience, raising crony capitalism concerns.",
    category: "policy", riskLevel: "high", entities: ["Gautam Adani", "Narendra Modi"],
    proof: "AAI data shows bidding criteria appeared tailored for Adani. Airports include Mumbai, Lucknow, Ahmedabad, Mangaluru, Jaipur, Guwahati, Thiruvananthapuram.",
    source: "CAG Reports, Parliamentary Questions"
  },
  {
    id: "10", date: "2023-12-01", title: "Netanyahu Corruption Trial Continues",
    description: "Israeli PM Benjamin Netanyahu faces ongoing trial on bribery, fraud, and breach of trust charges involving media moguls and telecom executives.",
    category: "investigation", riskLevel: "high", entities: ["Benjamin Netanyahu"],
    proof: "Case 4000: Allegedly promoted regulatory decisions worth ~$500M to Bezeq telecom in exchange for favorable coverage on Walla! news site.",
    source: "Israeli State Attorney's Office"
  },
  {
    id: "11", date: "2024-09-20", title: "Jay Shah Becomes ICC Chairman",
    description: "Amit Shah's son Jay Shah elected ICC Chairman at age 35 with no cricket-playing background, raising nepotism and conflict-of-interest concerns.",
    category: "scandal", riskLevel: "medium", entities: ["Amit Shah", "Jay Shah"],
    proof: "Jay Shah's company revenue grew from ₹50,000 to ₹80 Cr after BJP came to power in 2014. BCCI revenue tripled during his tenure as secretary.",
    source: "The Wire, Financial Disclosures"
  },
  {
    id: "12", date: "2025-01-15", title: "Xi Jinping's Anti-Corruption Purge — Military Generals",
    description: "China's anti-corruption campaign targets top military generals including former Defense Minister Li Shangfu, exposing CCP internal power struggles.",
    category: "investigation", riskLevel: "high", entities: ["Xi Jinping"],
    proof: "Over 100 military officials purged since 2023. Li Shangfu disappeared from public view for months before formal investigation announced.",
    source: "CCDI, Reuters, South China Morning Post"
  },
  {
    id: "13", date: "2024-11-10", title: "Erdogan Family Offshore Wealth Exposed",
    description: "New leaks reveal Turkish President Erdogan's family members control offshore accounts and shell companies worth hundreds of millions.",
    category: "financial", riskLevel: "high", entities: ["Recep Tayyip Erdogan"],
    proof: "Paradise Papers & subsequent leaks document companies in Isle of Man and British Virgin Islands linked to Erdogan's son-in-law and brother.",
    source: "ICIJ, Paradise Papers"
  },
  {
    id: "14", date: "2025-03-01", title: "Trump-Putin Helsinki Summit Transcripts Leaked",
    description: "Previously undisclosed details of private Trump-Putin meetings surface, revealing discussions about sanctions relief in exchange for election support.",
    category: "international", riskLevel: "high", entities: ["Donald Trump", "Vladimir Putin"],
    proof: "Mueller Report documented 140+ contacts between Trump campaign and Russian-linked operatives. Senate Intelligence Committee confirmed Russian interference.",
    source: "Mueller Report, Senate Intelligence Committee"
  },
  {
    id: "15", date: "2024-08-05", title: "Modi Government Accused of Weaponizing ED/CBI",
    description: "Opposition leaders allege systematic misuse of ED and CBI against political opponents — 95% of ED cases target opposition-ruled states.",
    category: "policy", riskLevel: "high", entities: ["Narendra Modi", "Amit Shah"],
    proof: "Data analysis shows 95% of politically-linked ED raids target opposition leaders. Conviction rate in ED cases remains below 1%.",
    source: "NDTV Data Analysis, Parliamentary Records"
  },
];

const categoryConfig: Record<string, { icon: typeof Calendar; color: string; label: string }> = {
  scandal: { icon: AlertTriangle, color: "text-destructive", label: "Scandal" },
  investigation: { icon: FileWarning, color: "text-warning", label: "Investigation" },
  policy: { icon: Users, color: "text-primary", label: "Policy Abuse" },
  financial: { icon: Banknote, color: "text-accent", label: "Financial" },
  international: { icon: Globe, color: "text-primary", label: "International" },
  arrest: { icon: AlertTriangle, color: "text-destructive", label: "Arrest" },
};

function TimelineCard({ event, index }: { event: TimelineEvent; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const config = categoryConfig[event.category];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="relative flex gap-4"
    >
      {/* Timeline line & dot */}
      <div className="flex flex-col items-center shrink-0">
        <div className={`w-10 h-10 rounded-full border-2 border-border bg-card flex items-center justify-center ${config.color}`}>
          <Icon className="w-4 h-4" />
        </div>
        {index < timelineEvents.length - 1 && (
          <div className="w-0.5 flex-1 bg-border/50 mt-2" />
        )}
      </div>

      {/* Card */}
      <div className="glass-panel-hover p-4 mb-4 flex-1 max-w-3xl">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-mono text-muted-foreground bg-secondary px-2 py-0.5 rounded">
                {new Date(event.date).toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" })}
              </span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full bg-secondary ${config.color}`}>
                {config.label}
              </span>
              <RiskBadge level={event.riskLevel} />
            </div>
            <h3 className="text-sm font-semibold text-foreground">{event.title}</h3>
          </div>
          <button
            onClick={() => setExpanded(!expanded)}
            className="p-1.5 rounded-lg hover:bg-secondary/80 text-muted-foreground shrink-0"
          >
            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        <p className="text-xs text-muted-foreground leading-relaxed">{event.description}</p>

        <div className="flex flex-wrap gap-1.5 mt-2">
          {event.entities.map((e) => (
            <span key={e} className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-medium">{e}</span>
          ))}
        </div>

        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mt-3 pt-3 border-t border-border/50 space-y-2"
          >
            <div>
              <p className="text-[10px] font-semibold text-destructive uppercase tracking-wider mb-1">Evidence / Proof</p>
              <p className="text-xs text-foreground/80 leading-relaxed">{event.proof}</p>
            </div>
            <div>
              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">Source</p>
              <p className="text-xs text-accent">{event.source}</p>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export default function TimelinePage() {
  const [filter, setFilter] = useState<string>("all");
  const sorted = [...timelineEvents]
    .filter((e) => filter === "all" || e.category === filter)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Corruption Timeline</h1>
          <p className="text-sm text-muted-foreground mt-1">Chronological history of corruption events, investigations, and scandals with evidence</p>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2">
          {["all", ...Object.keys(categoryConfig)].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                filter === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat === "all" ? "All Events" : categoryConfig[cat].label}
            </button>
          ))}
        </div>

        {/* Timeline */}
        <div className="pl-1">
          {sorted.map((event, i) => (
            <TimelineCard key={event.id} event={event} index={i} />
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
