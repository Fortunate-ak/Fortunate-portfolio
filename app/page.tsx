"use client";

import { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  AnimatePresence,
} from "framer-motion";
import {
  Star,
  ArrowRight,
  MapPin,
  Search,
  ChevronDown,
  ExternalLink,
  Github,
  Twitter,
  Linkedin,
  Terminal,
  Zap,
  Code2,
  Globe,
  Send,
} from "lucide-react";

// ─── DATA ──────────────────────────────────────────────────────────────────

const NAME = "JOHN DOE";
const NAME_SPACED = "J . O . H . N  D . O . E";
const TITLE = "Full-Stack Developer & Creative Technologist";
const LOCATION = { label: "Kraków, Poland", lat: "50.0647° N", lng: "19.9450° E", tz: "GMT+1" };

const HIGHLIGHTS = [
  {
    id: "education",
    label: "Education",
    icon: "🎓",
    short: "AGH University of Science & Technology",
    long:
      "Pursuing a B.Sc. in Computer Science at AGH University, Kraków. Coursework spanning algorithms, distributed systems, and machine learning. Dean's List for academic excellence across 3 consecutive semesters. Thesis on LLM-powered developer tooling.",
  },
  {
    id: "experience",
    label: "Experience",
    icon: "⚡",
    short: "3+ years · startups & freelance",
    long:
      "Shipped production code for two Y Combinator-backed startups, leading frontend architecture and design systems. Freelanced for 20+ clients across Europe and the US — building everything from SaaS dashboards to AI-powered browser extensions.",
  },
  {
    id: "competitions",
    label: "Competitions",
    icon: "🏆",
    short: "Hackathons & open source",
    long:
      "1st place at HackYeah 2023 (Poland's largest hackathon) with an AI-driven civic tech app. Top 5% on Codeforces. Regular contributor to open-source tooling — 1.2k+ GitHub stars across personal projects.",
  },
];

const PROJECTS = [
  {
    num: "01",
    name: "Nexus AI",
    desc: "LLM-powered coding assistant with context-aware completions and real-time pair programming.",
    tags: ["Next.js", "Python", "OpenAI", "WebSockets"],
    stars: "1.4k",
    href: "#",
  },
  {
    num: "02",
    name: "FlowBoard",
    desc: "Visual workflow automation platform — drag-and-drop pipelines with 60+ integrations.",
    tags: ["React", "Node.js", "Postgres", "Docker"],
    stars: "892",
    href: "#",
  },
  {
    num: "03",
    name: "Radar CLI",
    desc: "Terminal dashboard for monitoring cloud infra spend with anomaly detection alerts.",
    tags: ["Rust", "AWS SDK", "SQLite"],
    stars: "634",
    href: "#",
  },
  {
    num: "04",
    name: "PixelSync",
    desc: "Real-time collaborative design canvas inspired by Figma — multiplayer cursors & vector editing.",
    tags: ["C++", "WebRTC", "Canvas API", "TypeScript"],
    stars: "411",
    href: "#",
  },
];

const FOOTER_LINKS = [
  { label: "Guestbook", sub: "Leave a note", href: "#" },
  { label: "Achievements", sub: "Certs & awards", href: "#" },
  { label: "My Links", sub: "Find me online", href: "#" },
];

// ─── ANIMATIONS ────────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

// ─── COMPONENTS ────────────────────────────────────────────────────────────

function useScrollReveal() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return { ref, inView };
}

/** Magnetic hover effect wrapper */
function Magnetic({ children, strength = 0.25 }: { children: React.ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const springX = useSpring(pos.x, { stiffness: 200, damping: 20 });
  const springY = useSpring(pos.y, { stiffness: 200, damping: 20 });

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setPos({ x: (e.clientX - cx) * strength, y: (e.clientY - cy) * strength });
  };
  const handleLeave = () => setPos({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: springX, y: springY }}
    >
      {children}
    </motion.div>
  );
}

/** Highlight card that expands on hover */
function HighlightCard({ item, index }: { item: typeof HIGHLIGHTS[0]; index: number })  {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: "-60px" }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative flex-1 min-w-0 cursor-pointer group"
    >
      <motion.div
        animate={{
          backgroundColor: hovered ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.03)",
          borderColor: hovered ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.07)",
        }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="border rounded-2xl p-7 h-full overflow-hidden"
        style={{ minHeight: 180 }}
      >
        {/* accent line */}
        <motion.div
          animate={{ scaleX: hovered ? 1 : 0 }}
          initial={{ scaleX: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{ originX: 0 }}
          className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-white/60 via-white/30 to-transparent rounded-t-2xl"
        />

        <span className="text-3xl mb-4 block">{item.icon}</span>
        <p className="text-xs font-mono uppercase tracking-widest text-white/40 mb-1">
          {item.label}
        </p>
        <p className="text-white/70 text-sm font-medium mb-4">{item.short}</p>

        <AnimatePresence>
          {hovered && (
            <motion.p
              key="desc"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="text-sm text-white/55 leading-relaxed overflow-hidden"
            >
              {item.long}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

/** Project row */
function ProjectRow({ project, index }: { project: typeof PROJECTS[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const { ref, inView } = useScrollReveal();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="group relative"
    >
      <motion.div
        animate={{ backgroundColor: hovered ? "rgba(255,255,255,0.04)" : "transparent" }}
        className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 py-6 px-5 rounded-2xl border border-transparent group-hover:border-white/10 transition-colors duration-300 cursor-pointer"
      >
        {/* Number */}
        <span
          className="text-5xl md:text-6xl font-black text-white/[0.06] select-none shrink-0 group-hover:text-white/[0.12] transition-colors duration-300"
          style={{ fontVariantNumeric: "tabular-nums", letterSpacing: "-0.05em" }}
        >
          {project.num}
        </span>

        {/* Title + desc */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1">
            <h3 className="text-xl font-bold text-white tracking-tight">{project.name}</h3>
            <motion.div animate={{ x: hovered ? 4 : 0 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
              <ExternalLink size={14} className="text-white/30 group-hover:text-white/60 transition-colors" />
            </motion.div>
          </div>
          <p className="text-white/45 text-sm leading-relaxed">{project.desc}</p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 md:max-w-[260px]">
          {project.tags.map((t) => (
            <span
              key={t}
              className="px-3 py-1 rounded-full text-[11px] font-mono font-semibold tracking-wider bg-white/[0.06] text-white/50 border border-white/10"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Stars */}
        <div className="flex items-center gap-1.5 text-white/35 group-hover:text-amber-400/70 transition-colors duration-300 shrink-0">
          <Star size={14} className="fill-current" />
          <span className="text-sm font-mono">{project.stars}</span>
        </div>
      </motion.div>

      {/* divider */}
      <div className="h-px bg-white/[0.06] mx-5" />
    </motion.div>
  );
}

/** Footer block */
function FooterBlock({ item, index }: { item: typeof FOOTER_LINKS[0]; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      href={item.href}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="flex-1 min-w-0"
    >
      <motion.div
        animate={{
          backgroundColor: hovered ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.02)",
          borderColor: hovered ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.07)",
        }}
        transition={{ duration: 0.3 }}
        className="border rounded-2xl p-8 flex items-center justify-between cursor-pointer"
      >
        <div>
          <p className="text-xl md:text-2xl font-bold text-white tracking-tight">{item.label}</p>
          <p className="text-sm text-white/35 mt-1 font-mono">{item.sub}</p>
        </div>
        <motion.div
          animate={{ x: hovered ? 8 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 18 }}
        >
          <ArrowRight size={22} className="text-white/40" />
        </motion.div>
      </motion.div>
    </motion.a>
  );
}

// ─── MAIN EXPORT ───────────────────────────────────────────────────────────

export default function Portfolio() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  // Hero parallax
  const heroRef = useRef(null);
  const { scrollY } = useScroll({ target: heroRef });
  const nameY = useTransform(scrollY, [0, 500], [0, -80]);
  const nameOpacity = useTransform(scrollY, [0, 350], [1, 0]);

  const [aiQuery, setAiQuery] = useState("");
  const [navScrolled, setNavScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#080808] text-white overflow-x-hidden selection:bg-white selection:text-black">
      {/* ── Scroll progress bar ── */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[2px] bg-white/60 origin-left z-50"
      />

      {/* ── NAV ── */}
      <motion.nav
        animate={{
          backgroundColor: navScrolled ? "rgba(8,8,8,0.85)" : "transparent",
          backdropFilter: navScrolled ? "blur(20px)" : "none",
          borderBottomColor: navScrolled ? "rgba(255,255,255,0.06)" : "transparent",
        }}
        transition={{ duration: 0.4 }}
        className="fixed top-0 left-0 right-0 z-40 border-b"
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Magnetic>
            <a href="#" className="font-black text-sm tracking-[0.2em] uppercase text-white/80 hover:text-white transition-colors">
              JD
            </a>
          </Magnetic>

          {/* Links */}
          <div className="hidden md:flex items-center gap-8">
            {["Work", "About me", "Skills", "Contact"].map((link) => (
              <Magnetic key={link} strength={0.15}>
                <a
                  href={`#${link.toLowerCase().replace(" ", "-")}`}
                  className="text-xs font-mono tracking-widest uppercase text-white/45 hover:text-white transition-colors duration-200"
                >
                  {link}
                </a>
              </Magnetic>
            ))}
          </div>

          {/* CTA */}
          <Magnetic>
            <a
              href="#contact"
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 text-xs font-mono tracking-widest uppercase text-white/50 hover:text-white hover:border-white/40 transition-all duration-200"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Available
            </a>
          </Magnetic>
        </div>
      </motion.nav>

      {/* ════════════════════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6"
      >
        {/* Ambient glow */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-white/[0.025] blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[300px] rounded-full bg-indigo-900/20 blur-[100px]" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[300px] rounded-full bg-violet-900/15 blur-[100px]" />
        </div>

        {/* Noise texture overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "200px",
          }}
        />

        <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center text-center pt-24">
          {/* Tag line */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xs font-mono tracking-[0.35em] uppercase text-white/35 mb-10"
          >
            Full-Stack · Creative Technologist
          </motion.p>

          {/* AI pill */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mb-14 w-full max-w-lg"
          >
            <div className="relative group">
              {/* glow ring on focus */}
              <div className="absolute -inset-[1px] rounded-full bg-gradient-to-r from-white/10 via-white/20 to-white/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 blur-sm" />
              <div className="relative flex items-center gap-3 bg-white/[0.05] border border-white/10 rounded-full px-5 py-3.5 backdrop-blur-md group-hover:border-white/20 transition-colors duration-300">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                  <Search size={14} className="text-white/35 shrink-0" />
                </div>
                <input
                  type="text"
                  value={aiQuery}
                  onChange={(e) => setAiQuery(e.target.value)}
                  placeholder={`Ask me anything about ${NAME.split(" ")[0]}…`}
                  className="flex-1 bg-transparent text-sm text-white/70 placeholder:text-white/30 outline-none font-mono tracking-wide"
                />
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.94 }}
                  className="shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-white/90 text-black"
                >
                  <Send size={12} />
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Massive name */}
          <motion.div
            style={{ y: nameY, opacity: nameOpacity }}
            className="overflow-hidden w-full"
          >
            <motion.h1
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="font-black leading-none tracking-tighter text-white select-none"
              style={{
                fontSize: "clamp(2.8rem, 10vw, 9.5rem)",
                letterSpacing: "0.05em",
                wordSpacing: "0.15em",
              }}
            >
              {NAME_SPACED}
            </motion.h1>
          </motion.div>

          {/* Sub title */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.65 }}
            className="mt-8 text-sm md:text-base text-white/35 max-w-sm font-mono tracking-wider"
          >
            Turning complex problems into elegant digital experiences.
          </motion.p>

          {/* CTA row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-10 flex items-center gap-5"
          >
            <motion.a
              href="#work"
              whileHover={{ scale: 1.03, backgroundColor: "rgba(255,255,255,1)" }}
              whileTap={{ scale: 0.97 }}
              className="px-6 py-3 rounded-full bg-white text-black text-sm font-bold tracking-wide transition-colors"
            >
              View Work
            </motion.a>
            <a href="#contact" className="px-6 py-3 rounded-full border border-white/15 text-sm text-white/60 hover:text-white hover:border-white/35 transition-all font-mono tracking-wider">
              Contact →
            </a>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/25"
        >
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown size={16} />
          </motion.div>
        </motion.div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          HIGHLIGHTS
      ════════════════════════════════════════════════════════════ */}
      <section id="about-me" className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section label */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-14"
          >
            <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-white/30">
              01 / About
            </span>
            <div className="flex-1 h-px bg-white/[0.06]" />
            <span className="text-xs font-mono text-white/25 italic">Hover to read more.</span>
          </motion.div>

          {/* Cards */}
          <div className="flex flex-col md:flex-row gap-5">
            {HIGHLIGHTS.map((item, i) => (
              <HighlightCard key={item.id} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          CRAFT / VALUE PROP
      ════════════════════════════════════════════════════════════ */}
      <section id="skills" className="py-28 px-6 border-y border-white/[0.05]">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Big text */}
            <div>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-[10px] font-mono tracking-[0.35em] uppercase text-white/30 mb-8"
              >
                02 / Craft
              </motion.p>

              {["Building scalable", "apps, websites,", "and automations."].map((line, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: true }}
                  className="font-black text-white leading-tight"
                  style={{ fontSize: "clamp(1.8rem, 4vw, 3.2rem)", letterSpacing: "-0.02em" }}
                >
                  {line}
                </motion.p>
              ))}

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="mt-6 text-white/40 text-sm leading-relaxed max-w-md"
              >
                I obsess over the intersection of performance and aesthetics — where sub-100ms interactions meet pixel-perfect layouts. Every product I touch gets faster, cleaner, and more delightful.
              </motion.p>
            </div>

            {/* Terminal + skills */}
            <div className="flex flex-col gap-5">
              {/* Terminal block */}
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                className="bg-white/[0.04] border border-white/08 rounded-2xl p-5 font-mono text-sm"
              >
                {/* Terminal chrome */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-3 h-3 rounded-full bg-red-500/60" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/60" />
                  <span className="ml-3 text-[10px] text-white/20 tracking-widest uppercase">terminal</span>
                </div>
                <p className="text-white/30 text-xs mb-1">$ whoami --location</p>
                <p className="text-emerald-400/80 text-xs">
                  <MapPin size={11} className="inline mr-1.5 mb-0.5" />
                  {LOCATION.label}
                </p>
                <p className="text-white/25 text-xs mt-2">$ geo --coords</p>
                <p className="text-cyan-400/70 text-xs">
                  {LOCATION.lat}, {LOCATION.lng} · {LOCATION.tz}
                </p>
                <p className="text-white/25 text-xs mt-2">$ status</p>
                <p className="text-white/60 text-xs">
                  <span className="text-emerald-400">●</span> Open to new opportunities
                </p>
              </motion.div>

              {/* Skill tags */}
              {[
                { label: "Frontend", skills: ["React", "Next.js", "Framer Motion", "Tailwind"] },
                { label: "Backend", skills: ["Node.js", "Python", "Rust", "PostgreSQL"] },
                { label: "Tooling", skills: ["Docker", "AWS", "CI/CD", "Figma"] },
              ].map((group, gi) => (
                <motion.div
                  key={group.label}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 + gi * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3 flex-wrap"
                >
                  <span className="text-[10px] font-mono tracking-widest uppercase text-white/20 w-16 shrink-0">
                    {group.label}
                  </span>
                  {group.skills.map((s) => (
                    <span
                      key={s}
                      className="px-3 py-1.5 rounded-full text-[11px] font-mono bg-white/[0.05] border border-white/10 text-white/45 hover:text-white hover:border-white/30 hover:bg-white/[0.09] transition-all cursor-default"
                    >
                      {s}
                    </span>
                  ))}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          PROJECTS
      ════════════════════════════════════════════════════════════ */}
      <section id="work" className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-14"
          >
            <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-white/30">
              03 / Featured Work
            </span>
            <div className="flex-1 h-px bg-white/[0.06]" />
            <a
              href="#"
              className="flex items-center gap-1.5 text-xs font-mono text-white/25 hover:text-white/60 transition-colors"
            >
              <Github size={12} />
              All repos →
            </a>
          </motion.div>

          <div>
            {PROJECTS.map((p, i) => (
              <ProjectRow key={p.num} project={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          CONTACT STRIP
      ════════════════════════════════════════════════════════════ */}
      <section
        id="contact"
        className="py-24 px-6 border-y border-white/[0.05] bg-white/[0.015]"
      >
        <div className="max-w-6xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-[10px] font-mono tracking-[0.35em] uppercase text-white/25 mb-6"
          >
            04 / Let's talk
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="font-black text-white leading-tight mb-8"
            style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)", letterSpacing: "-0.03em" }}
          >
            Got a project in mind?
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-4 flex-wrap"
          >
            <Magnetic>
              <a
                href="mailto:hello@johndoe.dev"
                className="group flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-bold text-sm tracking-wide hover:bg-white/90 transition-colors"
              >
                hello@johndoe.dev
                <motion.span
                  animate={{ x: 0 }}
                  whileHover={{ x: 3 }}
                  className="inline-block"
                >
                  →
                </motion.span>
              </a>
            </Magnetic>
            {[
              { icon: Github, href: "#" },
              { icon: Twitter, href: "#" },
              { icon: Linkedin, href: "#" },
            ].map(({ icon: Icon, href }, i) => (
              <Magnetic key={i}>
                <a
                  href={href}
                  className="flex items-center justify-center w-12 h-12 rounded-full border border-white/12 text-white/40 hover:text-white hover:border-white/35 transition-all"
                >
                  <Icon size={16} />
                </a>
              </Magnetic>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          FOOTER BLOCKS
      ════════════════════════════════════════════════════════════ */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[10px] font-mono tracking-[0.35em] uppercase text-white/25 mb-8"
          >
            More to explore
          </motion.p>
          <div className="flex flex-col md:flex-row gap-4">
            {FOOTER_LINKS.map((item, i) => (
              <FooterBlock key={item.label} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom bar ── */}
      <div className="border-t border-white/[0.05] py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs font-mono text-white/20 tracking-widest uppercase">
            © 2025 · {NAME} · Kraków, PL
          </p>
          <p className="text-xs font-mono text-white/15">
            Designed & built with ♡ in Next.js + Framer Motion
          </p>
        </div>
      </div>
    </div>
  );
}
