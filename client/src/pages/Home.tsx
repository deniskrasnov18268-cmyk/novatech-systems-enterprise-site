import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  BriefcaseBusiness,
  Building2,
  Check,
  ChevronLeft,
  ChevronRight,
  CircleDot,
  Command,
  Download,
  FileText,
  Globe2,
  Linkedin,
  Menu,
  Search,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";

type Product = {
  id: string;
  eyebrow: string;
  name: string;
  tagline: string;
  description: string;
  metric: string;
  metricLabel: string;
  accent: string;
  stats: { value: string; label: string }[];
  compare: Record<string, string | boolean>;
};

const products: Product[] = [
  {
    id: "atlas",
    eyebrow: "Infrastructure intelligence",
    name: "Atlas Core",
    tagline: "The operating layer for decisions at scale.",
    description:
      "Atlas turns fragmented operational signals into one clear, resilient command layer for teams moving critical work forward.",
    metric: "42%",
    metricLabel: "faster time-to-insight",
    accent: "#1a61f0",
    stats: [
      { value: "99.99%", label: "platform uptime" },
      { value: "14.2B", label: "signals / day" },
      { value: "65+", label: "global regions" },
    ],
    compare: {
      "Real-time signal graph": true,
      "Predictive orchestration": true,
      "Zero-trust controls": true,
      "Embedded analytics": true,
      "Dedicated success pod": "Enterprise",
    },
  },
  {
    id: "vector",
    eyebrow: "Applied intelligence",
    name: "Vector AI",
    tagline: "Models that move from insight to action.",
    description:
      "Vector AI gives enterprise teams a governed way to deploy intelligent workflows that are useful on day one and smarter every day.",
    metric: "3.4×",
    metricLabel: "more workflow throughput",
    accent: "#7c5cff",
    stats: [
      { value: "91%", label: "model precision" },
      { value: "18 min", label: "average deployment" },
      { value: "240+", label: "native connectors" },
    ],
    compare: {
      "Real-time signal graph": true,
      "Predictive orchestration": true,
      "Zero-trust controls": true,
      "Embedded analytics": "Add-on",
      "Dedicated success pod": "Enterprise",
    },
  },
  {
    id: "sentinel",
    eyebrow: "Security & resilience",
    name: "Sentinel Grid",
    tagline: "Make trust a competitive advantage.",
    description:
      "Sentinel Grid connects security posture, risk signals, and response workflows in a living system built for modern enterprise complexity.",
    metric: "68%",
    metricLabel: "lower mean time to respond",
    accent: "#12a078",
    stats: [
      { value: "0.4s", label: "signal latency" },
      { value: "100%", label: "policy coverage" },
      { value: "24/7", label: "expert monitoring" },
    ],
    compare: {
      "Real-time signal graph": true,
      "Predictive orchestration": "Add-on",
      "Zero-trust controls": true,
      "Embedded analytics": true,
      "Dedicated success pod": "Enterprise",
    },
  },
];

const caseStudies = [
  {
    client: "Apex Logistics",
    sector: "Global logistics",
    title: "From network noise to a 22% lift in on-time delivery.",
    description:
      "Apex connected 4,200+ operational signals in Atlas Core to give every regional team the same view of the network.",
    result: "22%",
    resultLabel: "on-time delivery lift",
    secondary: "31% fewer escalations",
    quote:
      "NovaTech helped us move from reacting to disruption to designing for resilience.",
    person: "Mina Okafor",
    role: "Chief Operations Officer",
    initials: "MO",
    tone: "blue",
  },
  {
    client: "Vela Health",
    sector: "Health systems",
    title: "A safer care network, built for the next million moments.",
    description:
      "Vela used Sentinel Grid to unify identity, device, and access intelligence across 62 care sites without slowing clinicians down.",
    result: "68%",
    resultLabel: "faster threat response",
    secondary: "4.8M protected identities",
    quote:
      "The platform gives our teams confidence without asking them to become security experts.",
    person: "Dr. Jonah Wei",
    role: "Chief Digital Officer",
    initials: "JW",
    tone: "green",
  },
  {
    client: "Northstar Energy",
    sector: "Energy & utilities",
    title: "Turning maintenance signals into a more adaptive grid.",
    description:
      "Northstar deployed Vector AI across field operations to predict maintenance windows and make every crew more effective.",
    result: "3.4×",
    resultLabel: "workflow throughput",
    secondary: "$18.6M protected capacity",
    quote:
      "We did not just automate tasks. We gave our people the signal to make better calls.",
    person: "Camille Torres",
    role: "VP, Grid Operations",
    initials: "CT",
    tone: "violet",
  },
];

const insights = [
  {
    category: "Signal / 01",
    tag: "Perspective",
    title: "The enterprise edge is becoming a decision layer.",
    excerpt:
      "Why the next generation of resilient companies will be defined by how quickly they turn signal into confident action.",
    author: "Amara Okoye",
    role: "Chief Strategy Officer",
    initials: "AO",
    date: "Oct 18, 2026",
    read: "6 min read",
    tone: "blue",
  },
  {
    category: "Signal / 02",
    tag: "Research",
    title: "The 2027 State of Enterprise Resilience report.",
    excerpt:
      "Our new benchmark shows the operational habits separating adaptive enterprises from the rest of the pack.",
    author: "Elias Meyer",
    role: "VP, Research & Foresight",
    initials: "EM",
    date: "Sep 29, 2026",
    read: "12 min read",
    tone: "violet",
  },
  {
    category: "Signal / 03",
    tag: "Playbook",
    title: "Designing the quiet system behind a bold transformation.",
    excerpt:
      "A practical field guide to building the governance, trust, and cadence that makes innovation compound.",
    author: "Lena Park",
    role: "Head of Enterprise Design",
    initials: "LP",
    date: "Sep 11, 2026",
    read: "8 min read",
    tone: "green",
  },
  {
    category: "Signal / 04",
    tag: "Briefing",
    title: "Five signals your operating model is ready for AI.",
    excerpt:
      "The questions leaders should ask before moving from isolated pilots to a repeatable intelligence layer.",
    author: "Ravi Shah",
    role: "Chief Technology Officer",
    initials: "RS",
    date: "Aug 26, 2026",
    read: "5 min read",
    tone: "amber",
  },
];

const reports = [
  { type: "Investor report", title: "Q3 2026 shareholder letter", meta: "PDF · 42 KB", accent: "blue", href: "/reports/q3-2026-shareholder-letter.pdf" },
  { type: "Corporate report", title: "2026 impact & resilience report", meta: "PDF · 41 KB", accent: "violet", href: "/reports/2026-impact-resilience-report.pdf" },
  { type: "Press kit", title: "NovaTech brand & media kit", meta: "ZIP · 518 B", accent: "green", href: "/reports/novatech-brand-media-kit.zip" },
];

const searchItems = [
  ...products.map((product) => ({ type: "Product", title: product.name, detail: product.tagline, id: product.id, target: "products" })),
  ...caseStudies.map((study) => ({ type: "Case study", title: study.client, detail: study.title, id: study.client, target: "stories" })),
  ...insights.map((insight) => ({ type: "Insight", title: insight.title, detail: insight.author, id: insight.title, target: "insights" })),
  ...reports.map((report) => ({ type: "Resource", title: report.title, detail: report.type, id: report.title, target: "resources" })),
];

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function NovaMark({ small = false }: { small?: boolean }) {
  return (
    <span className={`nova-mark ${small ? "nova-mark--small" : ""}`} aria-hidden="true">
      <span />
      <span />
      <span />
    </span>
  );
}

function Avatar({ initials, tone = "blue" }: { initials: string; tone?: string }) {
  return <span className={`avatar avatar--${tone}`}>{initials}</span>;
}

export default function Home() {
  const [activeProduct, setActiveProduct] = useState(products[0].id);
  const [activeStory, setActiveStory] = useState(0);
  const [storyOpen, setStoryOpen] = useState(false);
  const [insightFilter, setInsightFilter] = useState("All");
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const selectedProduct = products.find((product) => product.id === activeProduct) ?? products[0];
  const currentStory = caseStudies[activeStory];
  const filters = ["All", "Perspective", "Research", "Playbook", "Briefing"];
  const filteredInsights = insightFilter === "All" ? insights : insights.filter((insight) => insight.tag === insightFilter);
  const searchResults = useMemo(() => {
    const normalized = searchQuery.trim().toLowerCase();
    if (!normalized) return searchItems.slice(0, 6);
    return searchItems.filter((item) => `${item.title} ${item.detail} ${item.type}`.toLowerCase().includes(normalized));
  }, [searchQuery]);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setStoryOpen(false);
        setSearchOpen(false);
      }
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = storyOpen || searchOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [storyOpen, searchOpen]);

  const downloadReport = (title: string) => {
    const report = reports.find((item) => item.title === title);
    if (!report) return;
    const anchor = document.createElement("a");
    anchor.href = report.href;
    anchor.download = report.href.split("/").pop() ?? title;
    anchor.click();
  };

  const openSearchResult = (item: (typeof searchItems)[number]) => {
    setSearchOpen(false);
    if (item.type === "Product") setActiveProduct(item.id);
    if (item.type === "Case study") {
      const storyIndex = caseStudies.findIndex((story) => story.client === item.id);
      if (storyIndex >= 0) setActiveStory(storyIndex);
    }
    scrollToSection(item.target);
  };

  return (
    <div className="site-shell">
      <div className="announcement-bar">
        <span className="announcement-pulse" />
        <span>NovaTech Systems is now listed on the NYSE under NTSY</span>
        <button onClick={() => scrollToSection("resources")}>
          View investor center <ArrowUpRight size={13} />
        </button>
      </div>

      <header className="site-header">
        <div className="header-inner">
          <button className="wordmark" onClick={() => scrollToSection("top")} aria-label="NovaTech Systems home">
            <NovaMark />
            <span>NovaTech <em>Systems</em></span>
          </button>
          <nav className={`main-nav ${mobileMenuOpen ? "main-nav--open" : ""}`}>
            <button onClick={() => { scrollToSection("products"); setMobileMenuOpen(false); }}>Products</button>
            <button onClick={() => { scrollToSection("stories"); setMobileMenuOpen(false); }}>Customers</button>
            <button onClick={() => { scrollToSection("insights"); setMobileMenuOpen(false); }}>Insights</button>
            <button onClick={() => { scrollToSection("resources"); setMobileMenuOpen(false); }}>Company</button>
          </nav>
          <div className="header-actions">
            <button className="search-trigger" onClick={() => setSearchOpen(true)} aria-label="Open global search">
              <Search size={16} /> <span>Search</span> <kbd><Command size={11} /> K</kbd>
            </button>
            <button className="header-cta" onClick={() => scrollToSection("contact")}>Talk to us <ArrowUpRight size={15} /></button>
            <button className="mobile-menu-trigger" onClick={() => setMobileMenuOpen((open) => !open)} aria-label="Toggle menu">
              {mobileMenuOpen ? <X size={19} /> : <Menu size={19} />}
            </button>
          </div>
        </div>
      </header>

      <main id="top">
        <section className="hero-section">
          <div className="hero-grid">
            <div className="hero-copy">
              <div className="section-kicker"><span className="kicker-line" /> The intelligence layer for what&apos;s next</div>
              <h1>Move with <span>signal.</span><br />Build with confidence.</h1>
              <p className="hero-lede">NovaTech Systems helps the world&apos;s most ambitious enterprises turn complexity into an advantage — with intelligence that is clear, connected, and built to move.</p>
              <div className="hero-actions">
                <button className="button button--primary" onClick={() => scrollToSection("products")}>Explore the platform <ArrowRight size={16} /></button>
                <button className="button button--quiet" onClick={() => scrollToSection("stories")}>See customer outcomes <ArrowUpRight size={16} /></button>
              </div>
              <div className="hero-footnote"><ShieldCheck size={15} /> Trusted by 2,400+ teams operating at the edge of change</div>
            </div>
            <div className="signal-visual" aria-label="NovaTech signal network visualization">
              <div className="signal-orbit signal-orbit--one" />
              <div className="signal-orbit signal-orbit--two" />
              <div className="signal-orbit signal-orbit--three" />
              <div className="signal-lines" />
              <div className="signal-core"><NovaMark small /><strong>Nova<br />Core</strong><small>signal layer</small></div>
              <div className="signal-node node--one"><CircleDot size={14} /><span>Operations</span><b>+18.4%</b></div>
              <div className="signal-node node--two"><CircleDot size={14} /><span>Risk</span><b>−31.2%</b></div>
              <div className="signal-node node--three"><CircleDot size={14} /><span>Growth</span><b>3.4×</b></div>
              <div className="visual-caption"><span className="live-dot" /> Live platform signal <span>Updated 02:14:09 ago</span></div>
            </div>
          </div>
          <div className="hero-metrics">
            <div><strong>99.99%</strong><span>platform uptime</span></div>
            <div><strong>42%</strong><span>faster decisions</span></div>
            <div><strong>65+</strong><span>global regions</span></div>
            <div><strong>2.4k</strong><span>enterprise teams</span></div>
          </div>
        </section>

        <section className="logo-strip" aria-label="Selected customers">
          <span>THE TEAMS SHAPING TOMORROW</span>
          <div className="logo-row"><b>APEX</b><b>vela<span>health</span></b><b>northstar</b><b>ORBITAL</b><b>MONUMENT</b><b>civica</b></div>
        </section>

        <section className="section-block products-section" id="products">
          <div className="section-heading section-heading--split">
            <div><div className="section-kicker"><span className="kicker-line" /> Platform / 01</div><h2>One platform.<br /><span>Clearer moves.</span></h2></div>
            <p>Three connected products for the moments where your enterprise cannot afford a guess. Start with the signal you need most, then scale from there.</p>
          </div>
          <div className="product-tabs" role="tablist" aria-label="NovaTech products">
            {products.map((product, index) => (
              <button key={product.id} className={`product-tab ${activeProduct === product.id ? "product-tab--active" : ""}`} onClick={() => setActiveProduct(product.id)} role="tab" aria-selected={activeProduct === product.id}>
                <span className="tab-index">0{index + 1}</span><span><small>{product.eyebrow}</small><strong>{product.name}</strong></span><ArrowUpRight size={17} />
              </button>
            ))}
          </div>
          <div className="product-feature">
            <div className="product-feature-copy">
              <div className="product-label"><span style={{ background: selectedProduct.accent }} /> {selectedProduct.eyebrow}</div>
              <h3>{selectedProduct.name}</h3><p className="product-tagline">{selectedProduct.tagline}</p><p>{selectedProduct.description}</p>
              <button className="text-link" onClick={() => scrollToSection("contact")}>See how it works <ArrowRight size={15} /></button>
            </div>
            <div className="product-feature-metric"><strong>{selectedProduct.metric}</strong><span>{selectedProduct.metricLabel}</span><div className="metric-bars"><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /></div></div>
            <div className="product-stat-row">{selectedProduct.stats.map((stat) => <div key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}</div>
          </div>
          <div className="compare-wrap">
            <div className="compare-head"><div><div className="eyebrow-label">Capability matrix</div><h3>Compare the signal stack</h3></div><span>Choose the system that meets your next horizon.</span></div>
            <div className="compare-table">
              <div className="compare-row compare-row--labels"><div>Capabilities</div>{products.map((product) => <div key={product.id} className={activeProduct === product.id ? "compare-selected" : ""}>{product.name}<button onClick={() => setActiveProduct(product.id)} aria-label={`Select ${product.name}`}><ArrowUpRight size={14} /></button></div>)}</div>
              {Object.keys(products[0].compare).map((capability) => (
                <div className="compare-row" key={capability}><div>{capability}</div>{products.map((product) => <div key={product.id} className={activeProduct === product.id ? "compare-selected" : ""}>{product.compare[capability] === true ? <Check className="check-icon" size={16} /> : <span className="compare-value">{product.compare[capability]}</span>}</div>)}</div>
              ))}
            </div>
          </div>
        </section>

        <section className="story-section" id="stories">
          <div className="story-section-inner">
            <div className="section-heading section-heading--split section-heading--light"><div><div className="section-kicker"><span className="kicker-line" /> Customer signal / 02</div><h2>Proof in the<br /><span>real world.</span></h2></div><p>When the stakes are high, our customers use NovaTech to make the next move visible — and make it count.</p></div>
            <div className="story-carousel">
              <div className="story-visual"><div className={`story-grid story-grid--${currentStory.tone}`} /><div className="story-visual-label"><span>CASE / 0{activeStory + 1}</span><span>{currentStory.sector}</span></div><div className="story-visual-mark"><BarChart3 size={30} /><strong>{currentStory.result}</strong><span>{currentStory.resultLabel}</span></div></div>
              <div className="story-copy"><div className="story-client"><span>{currentStory.client}</span><small>{currentStory.sector}</small></div><h3>{currentStory.title}</h3><p>{currentStory.description}</p><div className="story-result"><strong>{currentStory.secondary}</strong><span>measured after 12 months</span></div><button className="button button--light" onClick={() => setStoryOpen(true)}>Read case study <ArrowUpRight size={16} /></button><div className="carousel-controls"><button onClick={() => setActiveStory((activeStory - 1 + caseStudies.length) % caseStudies.length)} aria-label="Previous case study"><ChevronLeft size={18} /></button><div>{caseStudies.map((_, index) => <button key={index} className={index === activeStory ? "dot dot--active" : "dot"} onClick={() => setActiveStory(index)} aria-label={`Go to case study ${index + 1}`} />)}</div><button onClick={() => setActiveStory((activeStory + 1) % caseStudies.length)} aria-label="Next case study"><ChevronRight size={18} /></button></div></div>
            </div>
          </div>
        </section>

        <section className="section-block insights-section" id="insights">
          <div className="section-heading section-heading--split"><div><div className="section-kicker"><span className="kicker-line" /> Field notes / 03</div><h2>Ideas for the<br /><span>next move.</span></h2></div><p>Perspectives, research, and hard-won playbooks from the people building what comes next. No noise. Just signal.</p></div>
          <div className="insight-toolbar"><div className="filter-row">{filters.map((filter) => <button key={filter} className={insightFilter === filter ? "filter-chip filter-chip--active" : "filter-chip"} onClick={() => setInsightFilter(filter)}>{filter}</button>)}</div><button className="text-link">View all insights <ArrowRight size={15} /></button></div>
          <div className="insight-grid">{filteredInsights.map((insight, index) => <article className={`insight-card ${index === 0 && insightFilter === "All" ? "insight-card--featured" : ""}`} key={insight.title}><div className="insight-card-top"><span className="insight-category">{insight.category}</span><ArrowUpRight size={18} /></div><div className="insight-art"><span>{insight.tag}</span><i className={`insight-orb insight-orb--${insight.tone}`} /></div><div className="insight-body"><div className="insight-meta"><span>{insight.date}</span><span>{insight.read}</span></div><h3>{insight.title}</h3><p>{insight.excerpt}</p><div className="author-row"><Avatar initials={insight.initials} tone={insight.tone} /><span><strong>{insight.author}</strong><small>{insight.role}</small></span></div></div></article>)}</div>
        </section>

        <section className="resource-section" id="resources">
          <div className="resource-inner"><div className="section-heading section-heading--split section-heading--light"><div><div className="section-kicker"><span className="kicker-line" /> Company / 04</div><h2>Credibility you<br /><span>can open.</span></h2></div><p>Explore the reports, resources, and newsroom signals behind a company building for the long view.</p></div><div className="resource-layout"><div className="resource-intro"><div className="resource-mark"><Building2 size={21} /><span>Investor &amp; press center</span></div><h3>Built to be<br /><em>looked into.</em></h3><p>Read our latest updates, download company materials, or connect with the team shaping NovaTech&apos;s next chapter.</p><div className="resource-links"><button>Newsroom <ArrowUpRight size={15} /></button><button>Leadership <ArrowUpRight size={15} /></button><button>Contact media <ArrowUpRight size={15} /></button></div></div><div className="report-list">{reports.map((report) => <div className="report-card" key={report.title}><div className={`report-icon report-icon--${report.accent}`}><FileText size={18} /></div><div><span>{report.type}</span><strong>{report.title}</strong><small>{report.meta}</small></div><button onClick={() => downloadReport(report.title)} aria-label={`Download ${report.title}`}><Download size={17} /></button></div>)}</div></div></div>
        </section>

        <section className="contact-section" id="contact"><div className="contact-grid"><div><div className="section-kicker"><span className="kicker-line" /> Your next horizon</div><h2>Ready to make<br />the <span>signal</span> move?</h2></div><div className="contact-copy"><p>Tell us what is changing in your world. We&apos;ll bring the right people, the sharpest questions, and a clear point of view.</p><button className="button button--primary" onClick={() => window.location.href = "mailto:hello@novatech.systems"}>Start a conversation <ArrowUpRight size={16} /></button><div className="contact-details"><span><Globe2 size={15} /> New York · London · Singapore · Everywhere</span><span><Sparkles size={15} /> hello@novatech.systems</span></div></div></div></section>
      </main>

      <footer className="site-footer"><div className="footer-main"><div className="footer-brand"><button className="wordmark wordmark--footer" onClick={() => scrollToSection("top")}><NovaMark /><span>NovaTech <em>Systems</em></span></button><p>Intelligence for the next move.</p></div><div className="footer-column"><span>Explore</span><button onClick={() => scrollToSection("products")}>Products</button><button onClick={() => scrollToSection("stories")}>Customers</button><button onClick={() => scrollToSection("insights")}>Insights</button></div><div className="footer-column"><span>Company</span><button onClick={() => scrollToSection("resources")}>Investor &amp; press</button><button>About NovaTech</button><button>Careers <small>12 open roles</small></button></div><div className="footer-column"><span>Connect</span><button><Linkedin size={14} /> LinkedIn</button><button>Contact us</button><button>Partner portal</button></div></div><div className="footer-bottom"><span>© 2026 NovaTech Systems, Inc.</span><span>Privacy <i /> Terms <i /> Accessibility</span><span className="footer-status"><span className="live-dot" /> All systems operational</span></div></footer>

      {storyOpen && <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setStoryOpen(false); }}><div className="story-modal" role="dialog" aria-modal="true" aria-labelledby="story-modal-title"><button className="modal-close" onClick={() => setStoryOpen(false)} aria-label="Close case study"><X size={18} /></button><div className={`modal-art modal-art--${currentStory.tone}`}><span>CASE / 0{activeStory + 1}</span><div><BarChart3 size={26} /><strong>{currentStory.result}</strong><small>{currentStory.resultLabel}</small></div></div><div className="modal-content"><div className="eyebrow-label">{currentStory.client} · {currentStory.sector}</div><h2 id="story-modal-title">{currentStory.title}</h2><p>{currentStory.description} NovaTech worked alongside {currentStory.client} to create a shared signal layer across teams, regions, and critical workflows.</p><div className="modal-metrics"><div><strong>{currentStory.result}</strong><span>{currentStory.resultLabel}</span></div><div><strong>{currentStory.secondary.split(" ")[0]}</strong><span>{currentStory.secondary.slice(currentStory.secondary.indexOf(" ") + 1)}</span></div><div><strong>12 mo</strong><span>to measured outcome</span></div></div><blockquote>“{currentStory.quote}”<cite><Avatar initials={currentStory.initials} tone={currentStory.tone} /> <span>{currentStory.person}<small>{currentStory.role}</small></span></cite></blockquote><button className="button button--primary" onClick={() => { setStoryOpen(false); scrollToSection("contact"); }}>Talk to our team <ArrowUpRight size={16} /></button></div></div></div>}

      {searchOpen && <div className="search-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setSearchOpen(false); }}><div className="search-panel" role="dialog" aria-modal="true" aria-label="Global search"><div className="search-input-wrap"><Search size={19} /><input autoFocus value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter" && searchResults[0]) openSearchResult(searchResults[0]); }} placeholder="Search products, insights, case studies..." /><kbd>ESC</kbd><button onClick={() => setSearchOpen(false)} aria-label="Close search"><X size={18} /></button></div><div className="search-results"><div className="search-results-label">{searchQuery ? `${searchResults.length} results` : "Quick access"}</div>{searchResults.length ? searchResults.map((item) => <button className="search-result" key={`${item.type}-${item.title}`} onClick={() => openSearchResult(item)}><span className={`search-result-icon search-result-icon--${item.type.toLowerCase().replace(" ", "-")}`}><Sparkles size={15} /></span><span><small>{item.type}</small><strong>{item.title}</strong><em>{item.detail}</em></span><ArrowUpRight size={16} /></button>) : <div className="search-empty"><Search size={24} /><strong>No signal found</strong><span>Try a different search term or browse the sections below.</span></div>}</div><div className="search-footer"><span>Search across NovaTech</span><span><kbd>↵</kbd> open result</span></div></div></div>}
    </div>
  );
}
