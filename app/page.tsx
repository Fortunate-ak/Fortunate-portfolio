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
import type { MotionStyle, UseInViewOptions } from "framer-motion"; 
import {
  Star, ArrowRight, MapPin, ChevronDown, ExternalLink,
  Github, Linkedin, Mail, Terminal, Code2, Database,
  Cpu, Globe, Zap, BookOpen, Trophy, Users, Phone,
  ChevronRight, Circle,
} from "lucide-react";

// ─── PERSONAL DATA ────────────────────────────────────────────────────────

const ME = {
  name: "Fortunate T. Misihairahwi",
  nameShort: "Fortunate",
  initials: "F.M",
  title: "Full-Stack Software Engineer & AI/ML Enthusiast",
  titleShort: "Full-Stack Engineer",
  subtitle: "Building intelligent, high-performance applications that enhance user experiences.",
  location: "Harare, Zimbabwe",
  coords: "17.8252° S, 31.0335° E · GMT+2",
  email: "fortunatetmisihairahwi@gmail.com",
  phone: "+263 781 334 685",
  github: "Fortunate-ak",
  linkedin: "fortunate-misihairahwi-875366381",
  status: "Open to opportunities",
  bio: "Technology is more than just code — it's about solving real-world problems, improving lives, and pushing boundaries. I specialize in building efficient and scalable applications across various platforms, ensuring users get the best experience possible.",
  mission: "Translating complex problems into robust, elegant technical solutions. Currently focused on Full-Stack Web Development, AI/ML integration, and building impactful products.",
};

const HIGHLIGHTS = [
  {
    id: "education",
    label: "Education",
    icon: BookOpen,
    color: "from-cyan-500 to-blue-500",
    colorSolid: "#06b6d4",
    short: "B.Sc. Software Engineering · HIT Zimbabwe",
    long: "Pursuing a Bachelor of Science in Software Engineering at the Harare Institute of Technology (HIT), Zimbabwe. Expected graduation: October 2028. Building a strong foundation in algorithms, distributed systems, web development, and AI/ML fundamentals.",
  },
  {
    id: "experience",
    label: "Experience",
    icon: Code2,
    color: "from-violet-500 to-purple-500",
    colorSolid: "#8b5cf6",
    short: "Full-Stack Dev · Hackathons · Tutoring",
    long: "Built full-stack solutions using Django REST Framework and React/Next.js. Participated in hackathons with rapid prototype development. Volunteered as a Programming Tutor, teaching fundamentals and debugging to junior developers.",
  },
  {
    id: "collaboration",
    label: "Collaboration",
    icon: Users,
    color: "from-emerald-500 to-teal-500",
    colorSolid: "#10b981",
    short: "Open source · Mentoring · Teamwork",
    long: "Strong believer in knowledge-sharing and teamwork. Contribute to open-source projects, mentor new developers, and thrive working alongside brilliant minds. Always eager to learn, collaborate, and grow together on ambitious projects.",
  },
];

const SKILLS = [
  { label: "Frontend", color: "#06b6d4", items: ["React", "Next.js", "TypeScript", "HTML5/CSS3"] },
  { label: "Backend", color: "#8b5cf6", items: ["Python", "Django", "Node.js", "REST APIs"] },
  { label: "Data & AI", color: "#f59e0b", items: ["TensorFlow", "SQL", "PostgreSQL", "MySQL"] },
  { label: "Tooling", color: "#10b981", items: ["Git & GitHub", "Agile", "UI/UX Design", "C# / .NET"] },
];

const PROJECTS = [
  {
    num: "01",
    name: "E-Commerce Store",
    desc: "Full-featured e-commerce platform with product listings, cart, and checkout flow.",
    tags: ["JavaScript", "React", "Node.js"],
    stars: "12",
    href: "https://github.com/Fortunate-ak/E-commerce-store",
    color: "#06b6d4",
  },
  {
    num: "02",
    name: "Quick-Buy Engine",
    desc: "Fast, intelligent purchasing engine built with TypeScript for streamlined buying workflows.",
    tags: ["TypeScript", "Next.js", "REST API"],
    stars: "8",
    href: "https://github.com/Fortunate-ak/quick-buy-engine",
    color: "#8b5cf6",
  },
  {
    num: "03",
    name: "MyApp",
    desc: "Full-stack web application showcasing Django backend with a modern JavaScript frontend.",
    tags: ["JavaScript", "Django", "Python"],
    stars: "5",
    href: "https://github.com/Fortunate-ak/myapp",
    color: "#f59e0b",
  },
  {
    num: "04",
    name: "MineApp",
    desc: "Dynamic JavaScript application with interactive UI components and data management features.",
    tags: ["JavaScript", "HTML5", "CSS3"],
    stars: "4",
    href: "https://github.com/Fortunate-ak/mineapp",
    color: "#10b981",
  },
];


const FOOTER_LINKS = [
  { label: "GitHub", sub: "View my repositories", href: `https://github.com/${ME.github}`, icon: Github },
  { label: "LinkedIn", sub: "Connect with me", href: `https://www.linkedin.com/in/${ME.linkedin}`, icon: Linkedin },
  { label: "Contact Me", sub: "Let's work together", href: `mailto:${ME.email}`, icon: Mail },
];

// ─── HELPERS ──────────────────────────────────────────────────────────────

function useScrollReveal(margin = "-80px") {
  const ref = useRef<HTMLDivElement>(null);

  // derive the correct options type from the hook itself
  const opts = { once: true, margin };

  const inView = useInView(ref, opts);
  return { ref, inView };
}
function TypewriterText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const timeout = setTimeout(() => setStarted(true), delay * 1000);
    return () => clearTimeout(timeout);
  }, [inView, delay]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 35);
    return () => clearInterval(interval);
  }, [started, text]);

  return (
    <span ref={ref}>
      {displayed}
      {started && displayed.length < text.length && (
        <span className="animate-pulse text-cyan-400">▋</span>
      )}
    </span>
  );
}

// ─── COMPONENTS ───────────────────────────────────────────────────────────

function TerminalWindow({
  children,
  title = "terminal",
  className = "",
}: React.PropsWithChildren<{ title?: string; className?: string }>) {
  return (
    <div className={`bg-[#0d1117] border border-white/10 rounded-xl overflow-hidden ${className}`}>
      <div className="flex items-center gap-2 px-4 py-3 bg-[#161b22] border-b border-white/08">
        <span className="w-3 h-3 rounded-full bg-red-500/70" />
        <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
        <span className="w-3 h-3 rounded-full bg-emerald-500/70" />
        <span className="ml-3 text-[10px] font-mono text-white/25 tracking-widest uppercase">{title}</span>
      </div>
      <div className="p-5 font-mono text-sm">{children}</div>
    </div>
  );
}

function HighlightCard({ item, index }: { item: typeof HIGHLIGHTS[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const Icon = item.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="flex-1 min-w-0 cursor-pointer"
    >
      <motion.div
        animate={{
          backgroundColor: hovered ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.02)",
          borderColor: hovered ? item.colorSolid + "50" : "rgba(255,255,255,0.08)",
        }}
        transition={{ duration: 0.3 }}
        className="relative border rounded-2xl p-7 h-full overflow-hidden"
      >
        {/* top accent */}
        <motion.div
          animate={{ scaleX: hovered ? 1 : 0 }}
          initial={{ scaleX: 0 }}
          transition={{ duration: 0.4 }}
          style={{ originX: 0 }}
          className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${item.color}`}
        />

        {/* glow */}
        <motion.div
          animate={{ opacity: hovered ? 0.12 : 0 }}
          className={`absolute inset-0 bg-gradient-to-br ${item.color} pointer-events-none`}
        />

        <div className="relative z-10">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
            style={{ backgroundColor: item.colorSolid + "20", border: `1px solid ${item.colorSolid}30` }}
          >
            <Icon size={18} style={{ color: item.colorSolid }} />
          </div>
          <p className="text-xs font-mono uppercase tracking-widest text-white/35 mb-1">{item.label}</p>
          <p className="text-white/70 text-sm font-semibold mb-4">{item.short}</p>

          <AnimatePresence>
            {hovered && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="text-sm text-white/50 leading-relaxed overflow-hidden"
              >
                {item.long}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}

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
      className="group"
    >
      <motion.a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        animate={{ backgroundColor: hovered ? "rgba(255,255,255,0.03)" : "transparent" }}
        className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 py-6 px-5 rounded-2xl border border-transparent group-hover:border-white/10 transition-colors duration-300 cursor-pointer block"
      >
        <span
          className="text-5xl md:text-6xl font-black select-none shrink-0 transition-colors duration-300"
          style={{
            color: hovered ? project.color + "40" : "rgba(255,255,255,0.05)",
            letterSpacing: "-0.05em",
          }}
        >
          {project.num}
        </span>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1">
            <h3 className="text-xl font-bold text-white tracking-tight">{project.name}</h3>
            <motion.div animate={{ x: hovered ? 4 : 0 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
              <ExternalLink size={14} className="text-white/20 group-hover:text-white/50 transition-colors" />
            </motion.div>
          </div>
          <p className="text-white/40 text-sm leading-relaxed">{project.desc}</p>
        </div>

        <div className="flex flex-wrap gap-2 md:max-w-[280px]">
          {project.tags.map((t) => (
            <span
              key={t}
              className="px-3 py-1 rounded-full text-[11px] font-mono font-semibold"
              style={{
                backgroundColor: project.color + "15",
                border: `1px solid ${project.color}30`,
                color: project.color,
              }}
            >
              {t}
            </span>
          ))}
        </div>

        <div
          className="flex items-center gap-1.5 shrink-0 transition-colors duration-300"
          style={{ color: hovered ? project.color : "rgba(255,255,255,0.25)" }}
        >
          <Star size={14} className="fill-current" />
          <span className="text-sm font-mono">{project.stars}</span>
        </div>
      </motion.a>
      <div className="h-px bg-white/[0.05] mx-5" />
    </motion.div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────

export default function Portfolio() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });
  const [navScrolled, setNavScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#080c10] text-white overflow-x-hidden selection:bg-cyan-500 selection:text-black" style={{ fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}>

      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700;800&family=Syne:wght@400;500;600;700;800&display=swap');
        .font-display { font-family: 'Syne', sans-serif; }
        .font-mono-custom { font-family: 'JetBrains Mono', monospace; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #080c10; }
        ::-webkit-scrollbar-thumb { background: #06b6d4; border-radius: 2px; }
      `}</style>

      {/* Scroll progress */}
      <motion.div
  style={{
    scaleX,
    background: "linear-gradient(90deg, #06b6d4, #8b5cf6, #10b981)",
  } as MotionStyle}                         // ← cast to MotionStyle
  className="fixed top-0 left-0 right-0 h-[2px] z-50 origin-left"
/>

     
      {/* ── NAV ── */}
      <motion.nav
        animate={{
          backgroundColor: navScrolled ? "rgba(8,12,16,0.9)" : "transparent",
          backdropFilter: navScrolled ? "blur(20px)" : "none",
        }}
        transition={{ duration: 0.4 }}
        className="fixed top-0 left-0 right-0 z-40 border-b border-transparent"
        style={{ borderBottomColor: navScrolled ? "rgba(6,182,212,0.1)" : "transparent" }}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <motion.a
            href="#"
            whileHover={{ scale: 1.05 }}
            className="font-mono-custom font-bold text-sm tracking-widest"
            style={{ color: "#06b6d4" }}
          >
            <span className="text-white/40">~/</span>fortunate
          </motion.a>

          <div className="hidden md:flex items-center gap-8">
            {["About", "Skills", "Projects", "Contact"].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-xs font-mono tracking-widest uppercase text-white/40 hover:text-cyan-400 transition-colors duration-200"
              >
                {link}
              </a>
            ))}
          </div>

          <a
            href={`https://github.com/${ME.github}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg border border-cyan-500/20 text-xs font-mono text-cyan-400/70 hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all duration-200"
          >
            <Github size={13} />
            GitHub
          </a>
        </div>
      </motion.nav>

      {/* ══════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden pt-16">

        {/* Background glows */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full opacity-10" style={{ background: "radial-gradient(ellipse, #06b6d4, transparent 70%)" }} />
          <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full opacity-8" style={{ background: "radial-gradient(ellipse, #8b5cf6, transparent 70%)" }} />
          <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] rounded-full opacity-6" style={{ background: "radial-gradient(ellipse, #10b981, transparent 70%)" }} />
        </div>

        <div className="relative z-10 w-full max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center">

            {/* Left — main content */}
            <div>
              {/* Status badge */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-emerald-500/25 bg-emerald-500/5 mb-8"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[11px] font-mono text-emerald-400/80 tracking-widest uppercase">{ME.status}</span>
              </motion.div>

              {/* Name */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                <h1
                  className="font-display font-black leading-[0.95] mb-4"
                  style={{ fontSize: "clamp(2.5rem, 5.5vw, 4.8rem)", letterSpacing: "-0.03em" }}
                >
                  <span className="text-white">Fortunate</span>
                  <br />
                  <span style={{ WebkitTextStroke: "1px rgba(6,182,212,0.6)", color: "transparent" }}>
                    Misihairahwi
                  </span>
                </h1>
              </motion.div>

              {/* Title with typewriter */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex items-center gap-2 mb-6"
              >
                <span className="text-cyan-400/60 font-mono text-sm">$</span>
                <span className="text-cyan-300/80 font-mono text-sm">
                  <TypewriterText text={ME.title} delay={0.6} />
                </span>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="text-white/45 text-sm leading-relaxed max-w-lg mb-10 font-mono"
              >
                {ME.subtitle}
              </motion.p>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.85 }}
                className="flex items-center gap-4 flex-wrap"
              >
                <motion.a
                  href="#projects"
                  whileHover={{ scale: 1.03, boxShadow: "0 0 30px rgba(6,182,212,0.3)" }}
                  whileTap={{ scale: 0.97 }}
                  className="px-6 py-3 rounded-lg font-mono text-sm font-bold tracking-wide text-black transition-all"
                  style={{ background: "linear-gradient(135deg, #06b6d4, #0891b2)" }}
                >
                  View Projects →
                </motion.a>
                <a
                  href={`mailto:${ME.email}`}
                  className="px-6 py-3 rounded-lg border border-white/10 text-sm font-mono text-white/50 hover:text-white hover:border-white/30 transition-all"
                >
                  Get in touch
                </a>
              </motion.div>

              {/* Social icons */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1 }}
                className="flex items-center gap-4 mt-8"
              >
                {[
                  { icon: Github, href: `https://github.com/${ME.github}`, color: "#ffffff" },
                  { icon: Linkedin, href: `https://www.linkedin.com/in/${ME.linkedin}`, color: "#0ea5e9" },
                  { icon: Mail, href: `mailto:${ME.email}`, color: "#10b981" },
                  { icon: Phone, href: `tel:${ME.phone}`, color: "#f59e0b" },
                ].map(({ icon: Icon, href, color }, i) => (
                  <motion.a
                    key={i}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.15, color }}
                    className="text-white/25 transition-colors"
                    style={{ color: "rgba(255,255,255,0.25)" }}
                  >
                    <Icon size={18} />
                  </motion.a>
                ))}
              </motion.div>
            </div>

            {/* Right — terminal card */}
            <motion.div
              initial={{ opacity: 0, x: 40, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <TerminalWindow title="profile.sh">
                <div className="space-y-4 text-xs leading-relaxed">
                  <div>
                    <p className="text-white/25">$ cat about.txt</p>
                    <p className="text-white/65 mt-1 leading-6">{ME.bio}</p>
                  </div>
                  <div>
                    <p className="text-white/25">$ whoami</p>
                    <p style={{ color: "#06b6d4" }} className="mt-1">{ME.name}</p>
                  </div>
                  <div>
                    <p className="text-white/25">$ geo --location</p>
                    <p style={{ color: "#10b981" }} className="mt-1">
                      <MapPin size={11} className="inline mr-1 mb-0.5" />
                      {ME.location} · {ME.coords}
                    </p>
                  </div>
                  <div>
                    <p className="text-white/25">$ university --current</p>
                    <p style={{ color: "#8b5cf6" }} className="mt-1">Harare Institute of Technology · B.Sc. SE · 2028</p>
                  </div>
                  <div>
                    <p className="text-white/25">$ status</p>
                    <p className="text-white/60 mt-1">
                      <span style={{ color: "#10b981" }}>●</span> {ME.status}
                      <span className="animate-pulse text-cyan-400 ml-1">▋</span>
                    </p>
                  </div>
                </div>
              </TerminalWindow>
            </motion.div>

          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/20"
        >
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase">Scroll to explore</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>
            <ChevronDown size={16} />
          </motion.div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════
          ABOUT / HIGHLIGHTS
      ══════════════════════════════════════════════════ */}
      <section id="about" className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-14"
          >
            <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-cyan-500/60">01 / About</span>
            <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, rgba(6,182,212,0.3), transparent)" }} />
            <span className="text-xs font-mono text-white/20 italic">Hover to read more.</span>
          </motion.div>

          <div className="flex flex-col md:flex-row gap-5">
            {HIGHLIGHTS.map((item, i) => <HighlightCard key={item.id} item={item} index={i} />)}
          </div>

          {/* Mission statement */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-10"
          >
            <TerminalWindow title="mission.txt">
              <p className="text-white/25 text-xs mb-2">$ cat mission.txt</p>
              <p className="text-white/60 text-sm leading-7">{ME.mission}</p>
              <p className="mt-4 text-xs" style={{ color: "#06b6d4" }}>
                Learn | Build | Innovate | Share
              </p>
            </TerminalWindow>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          SKILLS
      ══════════════════════════════════════════════════ */}
      <section id="skills" className="py-28 px-6 border-y" style={{ borderColor: "rgba(6,182,212,0.08)", backgroundColor: "rgba(6,182,212,0.02)" }}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-16"
          >
            <span className="text-[10px] font-mono tracking-[0.35em] uppercase text-cyan-500/60">02 / Skills</span>
            <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, rgba(6,182,212,0.3), transparent)" }} />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {SKILLS.map((group, gi) => (
              <motion.div
                key={group.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: gi * 0.1 }}
                viewport={{ once: true }}
                className="p-6 rounded-2xl border border-white/06 bg-white/[0.02]"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: group.color }} />
                  <span className="text-xs font-mono tracking-widest uppercase" style={{ color: group.color }}>{group.label}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <motion.span
                      key={skill}
                      whileHover={{ scale: 1.05, borderColor: group.color + "60" }}
                      className="px-4 py-2 rounded-lg text-xs font-mono text-white/55 border border-white/08 bg-white/[0.03] hover:text-white cursor-default transition-colors"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Craft statement */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            {["Building scalable", "apps, websites,", "and automations."].map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * i }}
                viewport={{ once: true }}
                className="font-display font-black text-white leading-tight"
                style={{ fontSize: "clamp(1.6rem, 4vw, 3rem)", letterSpacing: "-0.02em" }}
              >
                {i === 1 ? (
                  <span style={{ WebkitTextStroke: "1px rgba(6,182,212,0.5)", color: "transparent" }}>{line}</span>
                ) : line}
              </motion.p>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════�v
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-12"
          >
            <span className="text-[10px] font-mono tracking-[0.35em] uppercase" style={{ color: "rgba(139,92,246,0.7)" }}>04 / Testimonials</span>
            <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, rgba(139,92,246,0.3), transparent)" }} />
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: i * 0.12 }}
                viewport={{ once: true }}
                className="p-6 rounded-2xl border border-white/06 bg-white/[0.02]"
              >
                <p className="text-white/50 text-sm leading-7 font-mono mb-5">"{t.text}"</p>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold" style={{ backgroundColor: "rgba(139,92,246,0.2)", color: "#8b5cf6" }}>
                    {t.author[0]}
                  </div>
                  <span className="text-xs font-mono text-white/35">— {t.author}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          CONTACT
      ══════════════════════════════════════════════════ */}
      <section id="contact" className="py-28 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[10px] font-mono tracking-[0.35em] uppercase text-cyan-500/50 mb-8"
          >
            04 / Let's Talk
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            viewport={{ once: true }}
            className="font-display font-black text-white leading-tight mb-4"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)", letterSpacing: "-0.03em" }}
          >
            Got a project in mind?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="text-white/35 font-mono text-sm mb-10"
          >
            I'm always open to exciting opportunities and collaborations.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-4 flex-wrap"
          >
            <motion.a
              href={`mailto:${ME.email}`}
              whileHover={{ scale: 1.03, boxShadow: "0 0 40px rgba(6,182,212,0.25)" }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-8 py-4 rounded-xl font-mono text-sm font-bold text-black"
              style={{ background: "linear-gradient(135deg, #06b6d4, #0891b2)" }}
            >
              <Mail size={15} />
              {ME.email}
            </motion.a>
            <a
              href={`tel:${ME.phone}`}
              className="flex items-center gap-2 px-6 py-4 rounded-xl border border-white/10 font-mono text-sm text-white/50 hover:text-white hover:border-white/30 transition-all"
            >
              <Phone size={15} />
              {ME.phone}
            </a>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          FOOTER BLOCKS
      ══════════════════════════════════════════════════ */}
      <section className="py-16 px-6 border-t" style={{ borderColor: "rgba(6,182,212,0.08)" }}>
        <div className="max-w-6xl mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[10px] font-mono tracking-[0.35em] uppercase text-white/20 mb-8"
          >
            More to explore
          </motion.p>
          <div className="flex flex-col md:flex-row gap-4">
            {FOOTER_LINKS.map((item, i) => {
              const Icon = item.icon;
              const colors = ["#06b6d4", "#8b5cf6", "#10b981"];
              const color = colors[i];
              return (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ borderColor: color + "40", backgroundColor: color + "08" }}
                  className="flex-1 flex items-center justify-between p-7 rounded-2xl border border-white/07 bg-white/[0.02] transition-all duration-300 group cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: color + "15", border: `1px solid ${color}25` }}>
                      <Icon size={16} style={{ color }} />
                    </div>
                    <div>
                      <p className="font-display font-bold text-white text-lg">{item.label}</p>
                      <p className="text-xs font-mono text-white/30 mt-0.5">{item.sub}</p>
                    </div>
                  </div>
                  <motion.div
                    className="text-white/25"
                    whileHover={{ x: 6 }}
                    transition={{ type: "spring", stiffness: 300, damping: 18 }}
                  >
                    <ArrowRight size={20} />
                  </motion.div>
                </motion.a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom bar */}
      <div className="border-t px-6 py-8" style={{ borderColor: "rgba(6,182,212,0.06)" }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs font-mono text-white/20">
            © 2025 · <span style={{ color: "#06b6d4" }}>Fortunate T. Misihairahwi</span> · Harare, Zimbabwe
          </p>
          <p className="text-xs font-mono text-white/15">
            Built with Next.js · Tailwind · Framer Motion
          </p>
        </div>
      </div>
    </div>
  );
}