import { motion } from "framer-motion";
import { Calendar, AlertTriangle, Users, Banknote, FileWarning, Globe, ChevronDown, ChevronUp, Loader2, Database } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import RiskBadge from "@/components/dashboard/RiskBadge";
import ScrollReveal from "@/components/cinematic/ScrollReveal";
import type { RiskLevel } from "@/data/mockData";
import { fetchTimelineEvents, seedTimelineEvents, type DbTimelineEvent } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const SEED_EVENTS = [
  { date: "2024-01-10", title: "Hindenburg Report Exposes Adani Group", description: "Hindenburg Research publishes damning report alleging stock manipulation, accounting fraud, and use of offshore shell entities by the Adani Group, wiping $150B in market value.", category: "financial", risk_level: "high", entities: ["Gautam Adani", "Narendra Modi"], proof: "Hindenburg Research Report — 100+ pages of forensic financial analysis documenting offshore shell companies in Mauritius, Cyprus, UAE linked to Adani family.", source: "Hindenburg Research, Jan 2023" },
  { date: "2023-03-15", title: "Electoral Bonds Scheme Data Released", description: "Supreme Court orders disclosure of Electoral Bonds data revealing massive anonymous donations to BJP from corporations receiving government contracts.", category: "financial", risk_level: "high", entities: ["Narendra Modi", "BJP", "Gautam Adani"], proof: "SBI disclosed data showing ₹16,518 Cr in bonds; top donors include companies that received government contracts worth thousands of crores shortly after donating.", source: "Supreme Court of India, Feb 2024" },
  { date: "2023-06-20", title: "Pegasus Spyware Scandal — India Connection", description: "Investigation reveals Indian government purchased Pegasus spyware from NSO Group to surveil journalists, opposition leaders, and activists.", category: "international", risk_level: "high", entities: ["Narendra Modi", "Benjamin Netanyahu", "Amit Shah"], proof: "Pegasus Project by Forbidden Stories & Amnesty International confirmed 300+ Indian phone numbers on target list.", source: "The Wire, Pegasus Project 2021-2023" },
  { date: "2022-11-05", title: "Nirav Modi PNB Fraud — Extradition Approved", description: "UK courts approve extradition of Nirav Modi for ₹13,500 Cr Punjab National Bank fraud.", category: "arrest", risk_level: "high", entities: ["Nirav Modi"], proof: "CBI chargesheet documents ₹13,578 Cr fraud using fraudulent Letters of Undertaking. ED attached assets worth ₹2,500 Cr.", source: "CBI, ED Chargesheets" },
  { date: "2023-09-12", title: "Trump Indictment — Election Interference", description: "Donald Trump indicted on federal charges related to efforts to overturn 2020 election results.", category: "investigation", risk_level: "high", entities: ["Donald Trump"], proof: "DOJ Special Counsel Jack Smith indictment — 4 federal charges including conspiracy to defraud the United States.", source: "US Department of Justice, Aug 2023" },
  { date: "2022-02-24", title: "Russia-Ukraine War — Putin Oligarch Network Exposed", description: "Western sanctions following Ukraine invasion expose Putin hidden wealth network estimated at $200B+.", category: "international", risk_level: "high", entities: ["Vladimir Putin"], proof: "ICIJ Pandora Papers, FinCEN Files, and EU sanctions lists document shell companies linked to Putin inner circle.", source: "ICIJ, Pandora Papers" },
  { date: "2024-03-25", title: "Arvind Kejriwal Arrested by ED", description: "Delhi CM arrested by Enforcement Directorate in excise policy case. Critics call it political vendetta.", category: "arrest", risk_level: "medium", entities: ["Arvind Kejriwal"], proof: "ED alleges ₹100 Cr kickback trail; Supreme Court later grants bail noting no evidence of direct involvement.", source: "ED, Supreme Court Orders 2024" },
  { date: "2023-07-10", title: "1MDB Scandal — Najib Razak Sentencing Upheld", description: "Malaysia Federal Court upholds 12-year prison sentence for 1MDB corruption involving $4.5B siphoned.", category: "scandal", risk_level: "high", entities: ["Najib Razak"], proof: "DOJ traced $4.5B stolen from 1MDB; $731M deposited directly into Najib personal accounts.", source: "US DOJ, Malaysian Courts" },
  { date: "2024-06-15", title: "Adani Group Wins Major Airport Contracts", description: "Adani Group awarded management of 8 major Indian airports despite no prior aviation experience.", category: "policy", risk_level: "high", entities: ["Gautam Adani", "Narendra Modi"], proof: "AAI data shows bidding criteria appeared tailored for Adani.", source: "CAG Reports, Parliamentary Questions" },
  { date: "2023-12-01", title: "Netanyahu Corruption Trial Continues", description: "Israeli PM faces ongoing trial on bribery, fraud, and breach of trust charges.", category: "investigation", risk_level: "high", entities: ["Benjamin Netanyahu"], proof: "Case 4000: Allegedly promoted regulatory decisions worth ~$500M to Bezeq telecom.", source: "Israeli State Attorney Office" },
  { date: "2024-09-20", title: "Jay Shah Becomes ICC Chairman", description: "Amit Shah son elected ICC Chairman at age 35 with no cricket-playing background.", category: "scandal", risk_level: "medium", entities: ["Amit Shah", "Jay Shah"], proof: "Jay Shah company revenue grew from ₹50,000 to ₹80 Cr after BJP came to power.", source: "The Wire, Financial Disclosures" },
  { date: "2025-01-15", title: "Xi Jinping Anti-Corruption Purge — Military Generals", description: "China anti-corruption campaign targets top military generals.", category: "investigation", risk_level: "high", entities: ["Xi Jinping"], proof: "Over 100 military officials purged since 2023.", source: "CCDI, Reuters" },
  { date: "2024-11-10", title: "Erdogan Family Offshore Wealth Exposed", description: "Leaks reveal Erdogan family control offshore accounts worth hundreds of millions.", category: "financial", risk_level: "high", entities: ["Recep Tayyip Erdogan"], proof: "Paradise Papers document companies in Isle of Man and BVI.", source: "ICIJ, Paradise Papers" },
  { date: "2025-03-01", title: "Trump-Putin Helsinki Summit Transcripts Leaked", description: "Undisclosed details of private Trump-Putin meetings surface.", category: "international", risk_level: "high", entities: ["Donald Trump", "Vladimir Putin"], proof: "Mueller Report documented 140+ contacts between Trump campaign and Russian-linked operatives.", source: "Mueller Report, Senate Intelligence Committee" },
  { date: "2024-08-05", title: "Modi Government Accused of Weaponizing ED/CBI", description: "Opposition alleges 95% of ED cases target opposition-ruled states.", category: "policy", risk_level: "high", entities: ["Narendra Modi", "Amit Shah"], proof: "95% of politically-linked ED raids target opposition. Conviction rate below 1%.", source: "NDTV Data Analysis" },
  { date: "2013-04-15", title: "Saradha Chit Fund Scam — ₹2,500 Cr Ponzi Scheme", description: "Saradha Group chit fund collapses affecting 1.7 million depositors across West Bengal and Northeast India. TMC leaders implicated.", category: "scandal", risk_level: "high", entities: ["Mamata Banerjee", "Sudipta Sen", "Madan Mitra"], proof: "CBI chargesheet names TMC MPs Kunal Ghosh, Srinjoy Bose. Sudipta Sen letter names senior TMC leaders as beneficiaries of ₹2,460 Cr fraud.", source: "CBI Chargesheet, Sudipta Sen Confession" },
  { date: "2013-07-07", title: "Vyapam Scam — Madhya Pradesh Mega Fraud", description: "Massive admission and recruitment fraud involving 2,000+ accused including politicians, bureaucrats. Over 40 mysterious deaths of witnesses.", category: "scandal", risk_level: "high", entities: ["Shivraj Singh Chouhan", "BJP"], proof: "Supreme Court-monitored CBI probe. Over 2,500 accused chargesheeted. 40+ witnesses died mysteriously. Scam spans 13 years.", source: "Supreme Court Orders, CBI Investigation" },
  { date: "2011-08-25", title: "Bellary Mining Scam — Reddy Brothers Empire", description: "Illegal mining in Karnataka Bellary district caused ₹16,000 Cr loss to exchequer. BJP government shielded operations.", category: "financial", risk_level: "high", entities: ["Gali Janardhan Reddy", "B.S. Yediyurappa", "BJP"], proof: "Lokayukta Justice Santosh Hegde report documented ₹16,085 Cr illegal mining. Yediyurappa forced to resign as CM.", source: "Lokayukta Report, CBI Chargesheet" },
  { date: "2010-11-14", title: "2G Spectrum Scam — ₹1.76 Lakh Cr Loss", description: "Former Telecom Minister A. Raja allocated 2G spectrum licenses at throwaway prices causing massive loss.", category: "scandal", risk_level: "high", entities: ["A. Raja", "Kanimozhi", "DMK"], proof: "CAG report estimated ₹1.76 lakh Cr loss. Supreme Court cancelled 122 licenses. All accused later acquitted in 2017.", source: "CAG Report, Supreme Court Judgment" },
  { date: "2013-09-18", title: "Coalgate Scam — Coal Block Allocation Fraud", description: "CAG reveals government allocated 194 coal blocks without competitive bidding, causing ₹1.86 lakh Cr loss.", category: "financial", risk_level: "high", entities: ["Manmohan Singh", "Congress"], proof: "Supreme Court cancelled 214 of 218 coal blocks. CBI filed 14 FIRs.", source: "CAG Report 2012, Supreme Court 2014" },
  { date: "2017-02-10", title: "Sasikala Convicted — Disproportionate Assets", description: "Supreme Court convicts Sasikala in disproportionate assets case worth ₹66.65 Cr, ending her CM bid.", category: "arrest", risk_level: "high", entities: ["Sasikala Natarajan", "J. Jayalalithaa", "AIADMK"], proof: "Assets worth ₹66.65 Cr found disproportionate. 4-year sentence. Properties in Kodanad and Chennai seized.", source: "Supreme Court Judgment" },
  { date: "2019-03-06", title: "Rafale Deal Controversy — Crony Capitalism", description: "Opposition alleges Modi government changed Rafale deal terms to benefit Anil Ambani over HAL, costing ₹41,000 Cr extra.", category: "policy", risk_level: "high", entities: ["Narendra Modi", "Anil Ambani", "Dassault Aviation"], proof: "Original: 126 jets via HAL at ₹526 Cr/unit. New: 36 jets at ₹1,670 Cr/unit with Reliance Defence as offset partner.", source: "CAG Report, The Hindu Rafale Papers" },
  { date: "2020-09-17", title: "Hathras Cover-Up — UP Police Accused", description: "UP Police accused of cremating Dalit gang-rape victim at 2 AM without family consent. Media access blocked.", category: "scandal", risk_level: "high", entities: ["Yogi Adityanath", "BJP"], proof: "Allahabad HC took suo motu cognizance. CBI investigation confirmed assault. UN human rights body expressed concern.", source: "Allahabad High Court, CBI Report" },
  { date: "2021-10-03", title: "Lakhimpur Kheri — Minister Son Kills Farmers", description: "Union Minister Ajay Mishra son accused of mowing down 4 protesting farmers with convoy SUV.", category: "arrest", risk_level: "high", entities: ["Ajay Mishra", "Ashish Mishra", "Narendra Modi"], proof: "SIT confirmed SUV ran over farmers. Despite charges, Ajay Mishra retained as Union Minister.", source: "SIT Chargesheet, Supreme Court Orders" },
  { date: "2022-06-10", title: "Maharashtra Political Crisis — Operation Lotus", description: "Eknath Shinde leads rebellion splitting Shiv Sena. Opposition alleges BJP-engineered defection using money power.", category: "policy", risk_level: "high", entities: ["Eknath Shinde", "Devendra Fadnavis", "BJP"], proof: "Rebel MLAs flown to Guwahati in chartered flights. ED cases against Shinde faction dropped after joining BJP.", source: "Supreme Court Judgment, ED Records" },
  { date: "2023-05-03", title: "Manipur Violence — State-Sponsored Ethnic Cleansing", description: "Ethnic violence leaves 200+ dead. Viral video of women paraded naked shocks nation. PM silent 78 days.", category: "scandal", risk_level: "high", entities: ["N. Biren Singh", "Narendra Modi", "BJP"], proof: "Women paraded naked on video. Internet shutdown 5 months. 60,000+ displaced. Army deployed but violence continued.", source: "Supreme Court Hearings, NHRC Report" },
  { date: "2018-01-24", title: "PNB Scam — Mehul Choksi Flees India", description: "Jeweller Mehul Choksi, co-accused in ₹13,500 Cr PNB fraud, flees to Antigua.", category: "financial", risk_level: "high", entities: ["Mehul Choksi", "Nirav Modi"], proof: "Choksi obtained Antigua citizenship before fleeing. Passport revoked. ₹2,565 Cr assets attached.", source: "ED, Interpol Red Notice" },
  { date: "2024-07-23", title: "NEET Paper Leak Scandal — Nationwide Protests", description: "NEET-UG 2024 exam integrity compromised. 67 students score perfect 720 raising suspicions.", category: "scandal", risk_level: "high", entities: ["NTA", "Dharmendra Pradhan"], proof: "Bihar Police arrested paper leak gang. Supreme Court ordered investigation. 1,500+ arrested.", source: "Supreme Court Orders, CBI FIR" },
  { date: "2016-11-08", title: "Demonetisation — Critics Call It Organised Loot", description: "PM Modi bans ₹500 and ₹1000 notes overnight. 86% currency invalidated. 100+ deaths in queues. 99.3% notes returned.", category: "policy", risk_level: "high", entities: ["Narendra Modi", "BJP"], proof: "RBI confirmed 99.3% of demonetised currency returned, defeating stated purpose. GDP dropped 2%. BJP insiders allegedly tipped off.", source: "RBI Annual Report 2018" },
  { date: "2015-10-05", title: "Sheena Bora Murder — Indrani Mukerjea Case", description: "Former media executive Indrani Mukerjea arrested for murder of daughter Sheena Bora.", category: "arrest", risk_level: "high", entities: ["Indrani Mukerjea", "Peter Mukerjea"], proof: "Skeletal remains found in Raigad. Financial trail shows insurance fraud and property disputes as motive.", source: "CBI Investigation" },
] as const;

const categoryConfig: Record<string, { icon: typeof Calendar; color: string; label: string }> = {
  scandal: { icon: AlertTriangle, color: "text-destructive", label: "Scandal" },
  investigation: { icon: FileWarning, color: "text-warning", label: "Investigation" },
  policy: { icon: Users, color: "text-primary", label: "Policy Abuse" },
  financial: { icon: Banknote, color: "text-accent", label: "Financial" },
  international: { icon: Globe, color: "text-primary", label: "International" },
  arrest: { icon: AlertTriangle, color: "text-destructive", label: "Arrest" },
};

function EntityLink({ name }: { name: string }) {
  const navigate = useNavigate();
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        navigate(`/search?q=${encodeURIComponent(name)}`);
      }}
      className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-medium hover:bg-primary/25 hover:scale-105 transition-all duration-200 cursor-pointer"
    >
      {name}
    </button>
  );
}

function TimelineCard({ event, index, total }: { event: DbTimelineEvent; index: number; total: number }) {
  const [expanded, setExpanded] = useState(false);
  const config = categoryConfig[event.category] || categoryConfig.scandal;
  const Icon = config.icon;

  return (
    <ScrollReveal direction={index % 2 === 0 ? "left" : "right"} delay={index * 0.02}>
      <div className="relative flex gap-4">
        <div className="flex flex-col items-center shrink-0">
          <motion.div
            whileHover={{ scale: 1.2, rotate: 10 }}
            className={`w-10 h-10 rounded-full border-2 border-border bg-card flex items-center justify-center ${config.color} transition-shadow hover:shadow-lg`}
          >
            <Icon className="w-4 h-4" />
          </motion.div>
          {index < total - 1 && <div className="w-0.5 flex-1 bg-border/50 mt-2" />}
        </div>

        <motion.div
          whileHover={{ y: -2 }}
          className="glass-panel-hover p-4 mb-4 flex-1 max-w-3xl"
        >
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="text-[10px] font-mono text-muted-foreground bg-secondary px-2 py-0.5 rounded">
                  {new Date(event.date).toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" })}
                </span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full bg-secondary ${config.color}`}>
                  {config.label}
                </span>
                <RiskBadge level={event.risk_level as RiskLevel} />
              </div>
              <h3 className="text-sm font-semibold text-foreground">{event.title}</h3>
            </div>
            <button onClick={() => setExpanded(!expanded)} className="p-1.5 rounded-lg hover:bg-secondary/80 text-muted-foreground shrink-0">
              {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

          <p className="text-xs text-muted-foreground leading-relaxed">{event.description}</p>

          <div className="flex flex-wrap gap-1.5 mt-2">
            {event.entities.map((e) => (
              <EntityLink key={e} name={e} />
            ))}
          </div>

          {expanded && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-3 pt-3 border-t border-border/50 space-y-2">
              {event.proof && (
                <div>
                  <p className="text-[10px] font-semibold text-destructive uppercase tracking-wider mb-1">Evidence / Proof</p>
                  <p className="text-xs text-foreground/80 leading-relaxed">{event.proof}</p>
                </div>
              )}
              {event.source && (
                <div>
                  <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">Source</p>
                  <p className="text-xs text-accent">{event.source}</p>
                </div>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
    </ScrollReveal>
  );
}

export default function TimelinePage() {
  const [filter, setFilter] = useState<string>("all");
  const { toast } = useToast();

  const { data: events, isLoading, refetch } = useQuery({
    queryKey: ["timeline-events", filter],
    queryFn: () => fetchTimelineEvents(filter),
  });

  const [seeding, setSeeding] = useState(false);

  const handleSeed = async () => {
    setSeeding(true);
    try {
      await seedTimelineEvents(SEED_EVENTS.map(e => ({
        ...e,
        risk_level: e.risk_level,
        entities: [...e.entities],
        linked_entity_ids: null,
      })));
      toast({ title: "Database seeded", description: `${SEED_EVENTS.length} timeline events added.` });
      refetch();
    } catch (err: any) {
      toast({ title: "Seed failed", description: err.message, variant: "destructive" });
    } finally {
      setSeeding(false);
    }
  };

  const isEmpty = !isLoading && (!events || events.length === 0);

  return (
    <AppLayout>
      <div className="space-y-6 relative z-10">
        <ScrollReveal direction="up">
          <div>
            <motion.h1
              initial={{ opacity: 0, letterSpacing: "0.2em", filter: "blur(6px)" }}
              animate={{ opacity: 1, letterSpacing: "0.02em", filter: "blur(0px)" }}
              transition={{ duration: 0.8 }}
              className="text-2xl font-bold"
            >
              Corruption Timeline
            </motion.h1>
            <p className="text-sm text-muted-foreground mt-1">Chronological history of corruption events, investigations, and scandals with evidence</p>
          </div>
        </ScrollReveal>

        <div className="flex flex-wrap gap-2">
          {["all", ...Object.keys(categoryConfig)].map((cat) => (
            <motion.button
              key={cat}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
                filter === cat ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25" : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat === "all" ? "All Events" : categoryConfig[cat].label}
            </motion.button>
          ))}
        </div>

        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
          </div>
        )}

        {isEmpty && (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Database className="w-12 h-12 text-muted-foreground/50" />
            <p className="text-muted-foreground">No timeline events in database yet.</p>
            <Button onClick={handleSeed} disabled={seeding} variant="default">
              {seeding ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Seeding...</> : "Seed 30 Events"}
            </Button>
          </div>
        )}

        {events && events.length > 0 && (
          <div className="pl-1">
            {events.map((event, i) => (
              <TimelineCard key={event.id} event={event} index={i} total={events.length} />
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
