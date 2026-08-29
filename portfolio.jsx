import React, { useState, useEffect, useRef, useCallback } from "react";
import { Github, Linkedin, Mail, ArrowUpRight, Copy, Check, Download, MousePointer2, ExternalLink, Globe, Lock, ChevronLeft, ChevronRight, Trophy, Sparkles } from "lucide-react";

/* ============================== DATA ============================== */

const PROFILE_IMG = "ProfilePic.JPG";
const RESUME_URL  = "jose resume 3rd yr.pdf";

const STATS = [
  { value: 6, suffix: "+", label: "Live Projects" },
  { value: 6, suffix: "",  label: "Competitions Won" },
];

const NAV_ITEMS = [
  { id: "home",     label: "Home" },
  { id: "about",    label: "About me" },
  { id: "projects", label: "projects" },
  { id: "journey",  label: "Journey" },
  { id: "skills",   label: "Toolkit" },
  { id: "contact",  label: "Contact" },
];

/* Cleaned 6 Featured Projects */
const PROJECTS = [
  { n:"01", tag:"Freelance Agency",    title:"AeriX Digital Agency",    desc:"Co-founded a digital agency delivering custom web platforms, branding, SEO, and tech strategy for growing businesses.", link:"https://aerixdigital.vercel.app/",           cta:"Visit Live Agency", site:"https://aerixdigital.vercel.app/", url:"aerixdigital.vercel.app" },
  { n:"02", tag:"E-Commerce / Client", title:"Earth & Eve Wellness",    desc:"Designed & developed an elegant, natural wellness e-commerce brand experience for a Chennai-based health startup.",   link:"https://earthandeve.in/",                   cta:"Visit Live Store",  site:"https://earthandeve.in/", url:"earthandeve.in" },
  { n:"03", tag:"Cybersecurity Tool",  title:"Vulnerability Scanner",   desc:"Analyzes HTTPS posture, security headers, cookies, and GitHub secrets in real time — fully local, no cloud required.", link:"https://vulnerability-scanner-hazel.vercel.app/", cta:"Launch Scanner",   site:"https://vulnerability-scanner-hazel.vercel.app/", url:"vulnerability-scanner-hazel.vercel.app" },
  { n:"04", tag:"Management System",  title:"Smart Campus WebApp",      desc:"MERN app streamlining college admin — student portals for complaints, lab slots & leaves.",                           link:"https://smart-campus-jose.vercel.app/",         cta:"View Live App",     site:"https://smart-campus-jose.vercel.app/", img:"SmartCampus.png", url:"smart-campus-jose.vercel.app" },
  { n:"05", tag:"Healthcare Assistant",title:"Healthcare Chatbot",       desc:"AI assistant for symptom checking, with a real-time 'Consult Doctor' video call option.",                             link:"https://github.com/hackerjose25/chat_bot.git",  cta:"View Repository",   img:"Healthcare Chatbot.png", url:"github.com/hackerjose25/chat_bot" },
  { n:"06", tag:"Web3 / Blockchain",  title:"Innov2Earn Platform",      desc:"Users solve challenges, earn tokens on Polygon, and vote in DAO-inspired governance.",                               link:"https://www.whitehatters.xyz/",                 cta:"Visit Platform",    site:"https://www.whitehatters.xyz/", url:"whitehatters.xyz" },
];

const JOURNEY = [
  { y:"'26", date:"March 2026",  title:"Innovat3 Hackathon",           body:"Built Innov2Earn, a Web3 platform, and won a premium .xyz domain for a year.",             tag:"$17 domain" },
  { y:"'26", date:"March 2026",  title:"1st Prize — Code Relay",       body:"Secured 1st Prize in Code Relay during TECHNOVA, conducted by LICET and CSI.",             tag:"₹750 voucher" },
  { y:"'25", date:"Sep 2025",    title:"Conference Paper Presenter",   body:"Presented at the Professional Development Conference & Exposition, ITEF, Chennai Trade Centre.", tag:"Speaker" },
  { y:"'25", date:"Aug 2025",    title:"3rd Place — Paper Presentation",body:"Showcased 'Blockchain in Education' at FLAIR'2K25, on hybrid system security.",           tag:"₹700 prize" },
  { y:"'24", date:"Dec 2024",    title:"3rd Place Overall",            body:"Anti-Human Trafficking Club event at Madras School of Social Work.",                        tag:"₹2500 prize" },
  { y:"'24", date:"Nov 2024",    title:"Code Conquest Winner",         body:"1st place in the Code Conquest programming competition at TechVenture.",                    tag:"1st place" },
];

const MARQUEE_SKILLS = [
  "Web Development","Artificial Intelligence","Blockchain & Web3","Fullstack Development",
  "Cybersecurity & Threat Analysis","React & Next.js","Node.js & Express",
  "MERN Stack Architecture","REST APIs & JWT Auth","Python & C++",
  "Smart Contracts & Polygon","UI/UX Design","SQL & MongoDB","Digital Strategy & SEO",
];

const SKILLS = [
  { cat:"Languages",        items:["JavaScript","Python","C","C++","Java","SQL"] },
  { cat:"Web & Frameworks", items:["HTML5","CSS3","React.js","Next.js","Node.js","Express.js","Tailwind CSS"] },
  { cat:"Backend & Web3",   items:["REST APIs","JWT Auth","MongoDB","MySQL","Cloudinary","Solidity","Polygon / Web3.js"] },
  { cat:"Tools",            items:["VS Code","Git & GitHub","Vercel","Postman","Figma","Canva","Blender"] },
];

/* ============================== CSS SYSTEM ============================== */

const HEYNESH_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,800&family=JetBrains+Mono:wght@400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg:          #EDECDA;
    --bg-card:     #E3E2CE;
    --bg-dark:     #0A0A0A;
    --bg-dark-card:#141414;
    --text:        #000000;
    --text-muted:  #5C5B52;
    --accent:      #FFFF23;
    --accent-hover:#F5F51B;
    --line:        rgba(0,0,0,0.12);
    --line-strong: rgba(0,0,0,0.22);
    --font-sans:   'Plus Jakarta Sans', -apple-system, sans-serif;
    --font-mono:   'JetBrains Mono', monospace;
    --ease-out:    cubic-bezier(0.16, 1, 0.3, 1);
  }

  html { background: var(--bg); color: var(--text); }
  body {
    font-family: var(--font-sans);
    background: var(--bg);
    color: var(--text);
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  ::selection { background: var(--accent); color: #000; }
  a { color: inherit; text-decoration: none; }

  /* ── Heynesh Gradient Text ── */
  .h2-gradient {
    background: linear-gradient(266deg, #3D3D3D 11.86%, #000000 92.59%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  /* ── Line Mask Reveal ── */
  .line-mask {
    overflow: hidden;
    display: block;
  }
  .line-mask .line-inner {
    display: block;
    transform: translateY(120%);
    transition: transform 1.1s cubic-bezier(0.16, 1, 0.3, 1);
    will-change: transform;
  }
  .line-mask.in-view .line-inner {
    transform: translateY(0%);
  }

  /* ── Hero Container ── */
  .hero-container {
    position: relative;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 28px clamp(24px, 5vw, 80px) 48px;
    z-index: 1;
    will-change: transform, opacity;
  }

  .curtain-wrapper {
    position: relative;
    z-index: 10;
    background: var(--bg);
    border-top-left-radius: 36px;
    border-top-right-radius: 36px;
    box-shadow: 0 -28px 70px rgba(0,0,0,0.14);
  }

  /* ── Heynesh Nav Link Hover Clone Roll ── */
  .nav-roll-btn {
    position: relative;
    overflow: hidden;
    display: inline-block;
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    padding: 8px 18px;
    border-radius: 100px;
    border: none;
    background: transparent;
    color: var(--text-muted);
    cursor: pointer;
    font-weight: 500;
  }
  .nav-roll-btn .text-original,
  .nav-roll-btn .text-clone {
    display: block;
    transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .nav-roll-btn .text-clone {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: translateY(100%);
    color: #000;
    font-weight: 700;
  }
  .nav-roll-btn:hover .text-original { transform: translateY(-100%); }
  .nav-roll-btn:hover .text-clone { transform: translateY(0%); }

  .nav-roll-btn.active {
    background: var(--accent);
    color: #000;
    font-weight: 700;
  }

  /* ── Fixed Nav Bar ── */
  .fixed-nav-bar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 80px;
    z-index: 500;
    pointer-events: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 clamp(24px, 5vw, 80px);
  }

  .floating-pill {
    pointer-events: auto;
    display: flex;
    align-items: center;
    gap: 4px;
    background: rgba(237, 236, 218, 0.84);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border: 1.5px solid rgba(0, 0, 0, 0.16);
    border-radius: 100px;
    padding: 6px 10px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  }

  /* ── SCROLL-PINNED HORIZONTAL PROJECTS SECTION ── */
  .projects-pinned-container {
    position: relative;
    height: 520vh; /* Calibrated scroll distance for 6 projects */
    background: var(--bg-dark);
    color: #FFF;
    border-top-left-radius: 36px;
    border-top-right-radius: 36px;
  }

  .projects-sticky-viewport {
    position: sticky;
    top: 0;
    height: 100vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 28px clamp(24px, 5vw, 80px) 32px;
    background: var(--bg-dark);
  }

  .projects-horizontal-track {
    display: flex;
    gap: 40px;
    height: 65vh;
    align-items: center;
    will-change: transform;
  }

  /* Dark Blended Live Project Card */
  .dark-project-card {
    flex: 0 0 clamp(320px, 78vw, 1000px);
    height: 100%;
    background: #121212;
    border: 1px solid rgba(255, 255, 255, 0.09);
    border-radius: 28px;
    padding: 28px;
    display: grid;
    grid-template-columns: 1.15fr 0.85fr;
    gap: 32px;
    align-items: center;
    color: #FFF;
    transition: transform 0.4s var(--ease-out), opacity 0.4s, filter 0.4s, border-color 0.4s;
    user-select: none;
  }

  /* Card Dimming on Hover */
  .projects-horizontal-track:hover .dark-project-card {
    opacity: 0.25;
    filter: grayscale(60%) blur(1px);
  }
  .projects-horizontal-track:hover .dark-project-card:hover {
    opacity: 1 !important;
    filter: none !important;
    transform: scale(1.018);
    border-color: rgba(255, 255, 35, 0.45);
    box-shadow: 0 30px 80px rgba(0,0,0,0.6);
  }

  /* Live Browser Window Frame */
  .live-browser-frame {
    position: relative;
    width: 100%;
    height: 100%;
    min-height: 280px;
    background: #080808;
    border-radius: 18px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  .browser-header-bar {
    height: 36px;
    background: #1A1A1A;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 14px;
    flex-shrink: 0;
  }

  .browser-dots {
    display: flex;
    gap: 6px;
  }
  .browser-dot {
    width: 10px; height: 10px; border-radius: 50%;
  }

  .browser-url-bar {
    font-family: var(--font-mono);
    font-size: 10.5px;
    color: rgba(255, 255, 255, 0.5);
    background: rgba(0, 0, 0, 0.4);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 100px;
    padding: 3px 14px;
    display: flex;
    align-items: center;
    gap: 6px;
    max-width: 260px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .browser-viewport-content {
    position: relative;
    flex: 1;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: #000;
  }

  .card-dark-arrow-btn {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: rgba(255,255,255,0.08);
    border: 1px solid rgba(255,255,255,0.15);
    color: #FFF;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.3s, color 0.3s, transform 0.4s var(--ease-out);
  }
  .dark-project-card:hover .card-dark-arrow-btn {
    background: var(--accent);
    color: #000;
    transform: rotate(45deg);
  }

  /* Progress indicator bar */
  .projects-scroll-bar-wrap {
    width: 100%;
    height: 4px;
    background: rgba(255,255,255,0.1);
    border-radius: 100px;
    overflow: hidden;
  }
  .projects-scroll-bar-fill {
    height: 100%;
    background: var(--accent);
    width: 0%;
    transition: width 0.1s linear;
  }

  /* ── Custom Yellow Follower Cursor ── */
  .jr-cursor-dot {
    position: fixed; top: 0; left: 0; width: 8px; height: 8px;
    border-radius: 50%; background: var(--accent);
    transform: translate(-50%,-50%); pointer-events: none; z-index: 9990;
  }
  .jr-cursor-ring {
    position: fixed; top: 0; left: 0; width: 32px; height: 32px;
    border-radius: 50%; border: 1.5px solid var(--line-strong);
    transform: translate(-50%,-50%); pointer-events: none; z-index: 9989;
  }

  /* ── Marquee ── */
  @keyframes marquee-spin {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }
  .marquee-track {
    display: flex;
    width: max-content;
    gap: 60px;
    animation: marquee-spin 35s linear infinite;
  }
  .marquee-track:hover { animation-play-state: paused; }

  /* ── Buttons ── */
  .btn-black {
    font-family: var(--font-mono);
    font-size: 12px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    background: #0A0A0A;
    color: var(--accent);
    padding: 16px 32px;
    border-radius: 100px;
    border: none;
    font-weight: 700;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    transition: transform 0.3s var(--ease-out), box-shadow 0.3s;
  }
  .btn-black:hover {
    transform: translateY(-3px);
    box-shadow: 0 16px 36px -8px rgba(0,0,0,0.35);
  }

  .btn-outline {
    font-family: var(--font-mono);
    font-size: 12px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    background: transparent;
    color: var(--text);
    padding: 16px 32px;
    border-radius: 100px;
    border: 1.5px solid var(--line-strong);
    font-weight: 600;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    transition: background 0.25s, transform 0.3s var(--ease-out), border-color 0.25s;
  }
  .btn-outline:hover {
    background: rgba(0,0,0,0.06);
    border-color: #000;
    transform: translateY(-3px);
  }

  /* ── Toast ── */
  @keyframes toast-slide {
    from { transform: translateX(-50%) translateY(20px); opacity: 0; }
    to   { transform: translateX(-50%) translateY(0); opacity: 1; }
  }
  .toast-box {
    position: fixed; bottom: 32px; left: 50%;
    transform: translateX(-50%);
    background: #0A0A0A; color: var(--accent);
    font-family: var(--font-mono); font-size: 12px;
    padding: 12px 24px; border-radius: 100px;
    z-index: 9999;
    animation: toast-slide 0.4s var(--ease-out);
    box-shadow: 0 12px 40px rgba(0,0,0,0.3);
  }

  /* Responsive */
  @media (max-width: 900px) {
    .hero-layout { grid-template-columns: 1fr !important; gap: 32px !important; }
    .dark-project-card { grid-template-columns: 1fr !important; flex: 0 0 85vw !important; }
    .skill-grid-row { grid-template-columns: 1fr !important; }
    .fixed-nav-bar { justify-content: center !important; }
    .nav-logo-desktop { display: none !important; }
  }
`;

/* ============================== HOOKS ============================== */

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.unobserve(el); } },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function LineMask({ children, as: Tag = "div", className = "", delay = 0, style = {} }) {
  const [ref, inView] = useInView(0.1);
  return (
    <Tag ref={ref} className={`line-mask ${inView ? "in-view" : ""} ${className}`} style={style}>
      <span className="line-inner" style={{ transitionDelay: `${delay}ms` }}>
        {children}
      </span>
    </Tag>
  );
}

function ScrambleText({ text, className = "" }) {
  const [display, setDisplay] = useState(text);
  const frame = useRef(null);
  const chars = "!<>-_\\/[]{}—=+*^?#01";

  const run = useCallback(() => {
    let iter = 0;
    clearInterval(frame.current);
    frame.current = setInterval(() => {
      setDisplay(text.split("").map((ch, i) => {
        if (ch === " ") return " ";
        if (i < iter) return text[i];
        return chars[Math.floor(Math.random() * chars.length)];
      }).join(""));
      iter += 1 / 2.5;
      if (iter >= text.length) clearInterval(frame.current);
    }, 25);
  }, [text]);

  useEffect(() => () => clearInterval(frame.current), []);

  return <span className={className} onMouseEnter={run}>{display}</span>;
}

function Counter({ value, suffix = "" }) {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView(0.2);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1200;
    const step = 16;
    const inc = value / (duration / step);
    const timer = setInterval(() => {
      start += inc;
      if (start >= value) { setCount(value); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, step);
    return () => clearInterval(timer);
  }, [inView, value]);

  return <span ref={ref}>{count}{suffix}</span>;
}

function Magnetic({ children, strength = 0.3 }) {
  const ref = useRef(null);
  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };
  const onLeave = () => { if (ref.current) ref.current.style.transform = "translate(0,0)"; };
  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} style={{ transition: "transform 0.35s var(--ease-out)", display: "inline-block" }}>
      {children}
    </div>
  );
}

/* Custom Yellow Ring Cursor Component */
function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const move = (e) => { pos.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("mousemove", move);
    let raf;
    const loop = () => {
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.18;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.18;
      if (dotRef.current) {
        dotRef.current.style.left = `${pos.current.x}px`;
        dotRef.current.style.top  = `${pos.current.y}px`;
      }
      if (ringRef.current) {
        ringRef.current.style.left = `${ringPos.current.x}px`;
        ringRef.current.style.top  = `${ringPos.current.y}px`;
      }
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => { window.removeEventListener("mousemove", move); cancelAnimationFrame(raf); };
  }, []);

  return (
    <>
      <div ref={dotRef} className="jr-cursor-dot" />
      <div ref={ringRef} className="jr-cursor-ring" />
    </>
  );
}

/* ============================== CONFETTI ============================== */

function useConfetti() {
  const [pieces, setPieces] = useState([]);
  const burst = useCallback((x, y) => {
    const colors = ["#FFFF23", "#000", "#5C5B52", "#E3E2CE"];
    const newPieces = Array.from({ length: 24 }).map((_, i) => ({
      id: `${Date.now()}-${i}`, x, y,
      dx: (Math.random() - 0.5) * 260,
      dy: -Math.random() * 260 - 80,
      rot: Math.random() * 360,
      color: colors[i % colors.length],
      size: 6 + Math.random() * 6,
    }));
    setPieces(p => [...p, ...newPieces]);
    setTimeout(() => setPieces(p => p.filter(pc => !newPieces.find(np => np.id === pc.id))), 1000);
  }, []);
  return [pieces, burst];
}

function ConfettiLayer({ pieces }) {
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9999 }}>
      {pieces.map(p => (
        <span key={p.id} style={{
          position: "fixed", left: p.x, top: p.y,
          width: p.size, height: p.size * 0.5,
          background: p.color, borderRadius: 2,
          "--dx": `${p.dx}px`, "--dy": `${p.dy}px`, "--rot": `${p.rot}deg`,
          animation: "confetti-fall 1s cubic-bezier(.16,1,.3,1) forwards",
        }} />
      ))}
    </div>
  );
}

/* ============================== INTERACTIVE ACHIEVEMENT CARD ============================== */

function InteractiveAchievementCard({ item, onBurst, setCursorLabel }) {
  const cardRef = useRef(null);
  const [transformStyle, setTransformStyle] = useState("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
  const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -12;
    const rotY = ((x - centerX) / centerX) * 12;

    setTransformStyle(`perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale3d(1.04, 1.04, 1.04)`);
    setSpotlightPos({ x, y });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTransformStyle("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
  };

  const handleClick = (e) => {
    if (onBurst) {
      onBurst(e.clientX, e.clientY);
    }
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 250);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{
        flex: "0 0 auto",
        width: 340,
        background: isHovered
          ? `radial-gradient(350px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(255, 255, 35, 0.14), #141414 70%)`
          : "#141414",
        borderRadius: 24,
        padding: 32,
        border: isHovered ? "1.5px solid rgba(255, 255, 35, 0.5)" : "1px solid rgba(255, 255, 255, 0.08)",
        transform: isClicked ? "scale(0.96)" : transformStyle,
        transition: isHovered
          ? "transform 0.12s ease-out, border 0.3s ease, box-shadow 0.3s ease"
          : "transform 0.5s ease-out, border 0.3s ease, box-shadow 0.3s ease",
        boxShadow: isHovered
          ? "0 24px 48px rgba(0,0,0,0.65), 0 0 30px rgba(255, 255, 35, 0.18)"
          : "0 10px 30px rgba(0,0,0,0.2)",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        userSelect: "none",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{
          fontWeight: 800,
          fontSize: 38,
          letterSpacing: "-0.04em",
          color: isHovered ? "#FFFF23" : "var(--accent)",
          textShadow: isHovered ? "0 0 16px rgba(255,255,35,0.7)" : "none",
          transition: "all 0.3s ease",
        }}>
          {item.y}
        </span>
        <span style={{
          fontFamily: "var(--font-mono)",
          fontSize: 10.5,
          padding: "6px 14px",
          borderRadius: 100,
          background: isHovered ? "rgba(255, 255, 35, 0.2)" : "rgba(255, 255, 255, 0.05)",
          border: isHovered ? "1px solid var(--accent)" : "1px solid rgba(255, 255, 255, 0.15)",
          color: isHovered ? "#FFFF23" : "var(--accent)",
          fontWeight: 600,
          transition: "all 0.3s ease",
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}>
          <Trophy size={11} /> {item.tag}
        </span>
      </div>

      <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 18 }}>
        {item.date}
      </div>

      <h3 style={{
        fontWeight: 700,
        fontSize: 20,
        marginTop: 8,
        color: "#FFF",
        lineHeight: 1.3,
        transform: isHovered ? "translateX(4px)" : "translateX(0)",
        transition: "transform 0.3s ease",
      }}>
        {item.title}
      </h3>

      <p style={{
        color: "rgba(255,255,255,0.6)",
        fontSize: 14,
        lineHeight: 1.65,
        marginTop: 12,
      }}>
        {item.body}
      </p>
    </div>
  );
}

/* ============================== MAIN PORTFOLIO ============================== */

export default function Portfolio() {
  const [scrollProgress, setScrollProgress]               = useState(0);
  const [projectScrollProgress, setProjectScrollProgress] = useState(0);
  const [maxTrackTranslate, setMaxTrackTranslate]         = useState(0);
  const [activeTab, setActiveTab]                         = useState("home");
  const [copied, setCopied]                               = useState(false);
  const [toast, setToast]                                 = useState(null);
  const [pieces, burst]                                   = useConfetti();

  const heroRef          = useRef(null);
  const projectsPinRef   = useRef(null);
  const trackRef         = useRef(null);
  const journeyDragRef   = useRef(null);
  const journeyDragState = useRef({ down: false, startX: 0, scrollLeft: 0 });

  /* ── Lenis Smooth Scroll Engine ── */
  useEffect(() => {
    if (window.Lenis) {
      const lenis = new window.Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);

      return () => lenis.destroy();
    }
  }, []);

  /* ── Measure Track Scroll Width ── */
  useEffect(() => {
    const updateWidths = () => {
      if (trackRef.current) {
        const totalWidth = trackRef.current.scrollWidth;
        const viewportWidth = window.innerWidth;
        setMaxTrackTranslate(totalWidth - viewportWidth + 120);
      }
    };
    updateWidths();
    window.addEventListener("resize", updateWidths);
    return () => window.removeEventListener("resize", updateWidths);
  }, []);

  /* ── 60fps Scroll Transform Loop ── */
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      /* Hero transform progress: Opacity stays 1 until scrolled past 45% */
      const heroHeight = heroRef.current ? heroRef.current.offsetHeight : window.innerHeight;
      const rawProgress = Math.min(Math.max(scrollY / heroHeight, 0), 1);
      setScrollProgress(rawProgress);

      /* Pinned Projects Section Scroll Calculation */
      if (projectsPinRef.current) {
        const rect = projectsPinRef.current.getBoundingClientRect();
        const totalScrollable = projectsPinRef.current.offsetHeight - window.innerHeight;
        const currentScrolled = -rect.top;
        const pProgress = Math.min(Math.max(currentScrolled / totalScrollable, 0), 1);
        setProjectScrollProgress(pProgress);
      }

      /* Active tab detection */
      const sections = ["home", "about", "projects", "journey", "skills", "contact"];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && scrollY >= el.offsetTop - 300) {
          setActiveTab(id);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const triggerToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const copyEmail = (e) => {
    navigator.clipboard?.writeText("joseregish25@gmail.com");
    setCopied(true);
    const rect = e.currentTarget.getBoundingClientRect();
    burst(rect.left + rect.width / 2, rect.top + rect.height / 2);
    triggerToast("📋 Email copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  /* Drag journey deck */
  const onJourneyDragStart = (e) => {
    journeyDragState.current.down = true;
    journeyDragState.current.startX = e.touches ? e.touches[0].clientX : e.clientX;
    journeyDragState.current.scrollLeft = journeyDragRef.current.scrollLeft;
    if (journeyDragRef.current) journeyDragRef.current.style.cursor = "grabbing";
  };
  const onJourneyDragMove = (e) => {
    if (!journeyDragState.current.down) return;
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    journeyDragRef.current.scrollLeft = journeyDragState.current.scrollLeft - (x - journeyDragState.current.startX);
  };
  const onJourneyDragEnd = () => {
    journeyDragState.current.down = false;
    if (journeyDragRef.current) journeyDragRef.current.style.cursor = "grab";
  };

  const slideJourney = (direction) => {
    if (journeyDragRef.current) {
      const amount = direction === "left" ? -360 : 360;
      journeyDragRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  /* Refined Hero fading: Opacity is 1 for the first 40% of scroll so photo frame is never hidden */
  const heroFadeProgress = Math.max(0, (scrollProgress - 0.35) / 0.65);
  const heroScale        = 1 - heroFadeProgress * 0.06;
  const heroOpacity      = 1 - heroFadeProgress * 0.85;
  const heroBlur         = heroFadeProgress * 14;
  const logoY            = scrollProgress * 12;
  const isScrolled       = scrollProgress > 0.05;

  /* Calculated horizontal pixel translation across 6 projects */
  const projectTrackPixelX = projectScrollProgress * maxTrackTranslate;
  const activeProjectNumber = Math.min(Math.floor(projectScrollProgress * PROJECTS.length) + 1, PROJECTS.length);

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <style>{HEYNESH_CSS}</style>
      <CustomCursor />
      <ConfettiLayer pieces={pieces} />
      {toast && <div className="toast-box">{toast}</div>}

      {/* ════════════ FIXED NAV BAR WITH FLOATING PILL ════════════ */}
      <header className="fixed-nav-bar">
        <div
          className="nav-logo-desktop"
          style={{
            fontWeight: 800, fontSize: 22, letterSpacing: "-0.03em",
            pointerEvents: isScrolled ? "none" : "auto", cursor: "pointer",
            opacity: isScrolled ? 0 : 1,
            transform: isScrolled ? "translateY(-14px)" : `translateY(${logoY}px)`,
            transition: "opacity 0.4s var(--ease-out), transform 0.4s var(--ease-out)",
          }}
          onClick={() => scrollTo("home")}
        >
          Jose<span style={{ color: "var(--text-muted)" }}>.Regish</span>
        </div>

        <nav className="floating-pill">
          {NAV_ITEMS.map(n => (
            <button
              key={n.id}
              className={`nav-roll-btn ${activeTab === n.id ? "active" : ""}`}
              onClick={() => scrollTo(n.id)}
            >
              <span className="text-original">{n.label}</span>
              <span className="text-clone">{n.label}</span>
            </button>
          ))}
        </nav>

        <div
          className="nav-logo-desktop"
          style={{
            pointerEvents: isScrolled ? "none" : "auto",
            opacity: isScrolled ? 0 : 1,
            transform: isScrolled ? "translateY(-14px)" : "translateY(0px)",
            transition: "opacity 0.4s var(--ease-out), transform 0.4s var(--ease-out)",
          }}
        >
          <Magnetic>
            <a href="mailto:joseregish25@gmail.com" className="nav-roll-btn" style={{ border: "1.5px solid var(--line-strong)", background: "rgba(255,255,255,0.4)" }}>
              <span className="text-original">Let's Talk →</span>
              <span className="text-clone">Let's Talk →</span>
            </a>
          </Magnetic>
        </div>
      </header>

      {/* ════════════ HERO SECTION (Perfected Photo Frame View) ════════════ */}
      <section
        id="home"
        ref={heroRef}
        className="hero-container"
        style={{
          transform: `scale(${heroScale})`,
          opacity: heroOpacity,
          filter: `blur(${heroBlur}px)`,
        }}
      >
        <div style={{ height: 80 }} />

        {/* GIANT HERO BANNER LOGO */}
        <div style={{ padding: "10px 0", borderBottom: "1.5px solid var(--line-strong)", marginBottom: 24 }}>
          <h1 style={{
            fontWeight: 800, fontSize: "clamp(56px, 11vw, 170px)",
            letterSpacing: "-0.05em", lineHeight: 0.85,
            textTransform: "uppercase", display: "flex", gap: "0.25em", flexWrap: "wrap",
          }}>
            <span>JOSE</span>
            <span className="h2-gradient">REGISH</span>
          </h1>
        </div>

        <div className="hero-layout" style={{ display: "grid", gridTemplateColumns: "1.25fr 0.75fr", gap: 50, alignItems: "center", width: "100%", maxWidth: 1240, margin: "0 auto" }}>
          <div>
            <div style={{ marginBottom: 18 }}>
              <span style={{
                fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: ".14em",
                textTransform: "uppercase", color: "var(--text-muted)",
                background: "var(--bg-card)", border: "1.5px solid var(--line)",
                padding: "8px 16px", borderRadius: 100, display: "inline-block",
              }}>
                ✦ Aspiring IT Engineer & Creative Developer
              </span>
            </div>

            <h2 style={{ fontWeight: 800, letterSpacing: "-0.045em", lineHeight: 0.98, fontSize: "clamp(38px, 5vw, 70px)", marginBottom: 20 }} className="h2-gradient">
              <LineMask delay={0}>Building clean interfaces</LineMask>
              <LineMask delay={100}>& intelligent applications.</LineMask>
            </h2>

            <p style={{ fontSize: "clamp(15px, 1.7vw, 19px)", lineHeight: 1.6, color: "var(--text-muted)", maxWidth: 500, marginBottom: 32 }}>
              Crafting <strong style={{ color: "var(--text)" }}>AI experiments, Web3 dApps,</strong> and{" "}
              <strong style={{ color: "var(--text)" }}>fullstack systems</strong> with refined design and efficient code.
            </p>

            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 32 }}>
              <Magnetic>
                <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" className="btn-black">
                  <Download size={15} /> Resume PDF
                </a>
              </Magnetic>
              <Magnetic>
                <button onClick={copyEmail} className="btn-outline">
                  {copied ? <Check size={15} /> : <Copy size={15} />}
                  {copied ? "Copied!" : "Copy Email"}
                </button>
              </Magnetic>
            </div>

            <div style={{ display: "flex", gap: 24 }}>
              <a href="https://www.linkedin.com/in/jose-regish-9b7196350" target="_blank" rel="noopener noreferrer"
                style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-muted)", display: "flex", alignItems: "center", gap: 6 }}>
                <Linkedin size={14} /> LinkedIn
              </a>
              <a href="https://github.com/hackerjose25" target="_blank" rel="noopener noreferrer"
                style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-muted)", display: "flex", alignItems: "center", gap: 6 }}>
                <Github size={14} /> GitHub
              </a>
            </div>
          </div>

          {/* Profile Photo & Stats — Fits Entire Frame Cleanly */}
          <div style={{ display: "flex", flexDirection: "column", gap: 18, alignItems: "center" }}>
            <div style={{ position: "relative", width: "100%", maxWidth: 320, borderRadius: 24, overflow: "hidden", border: "2px solid var(--line-strong)" }}>
              <img
                src={PROFILE_IMG}
                alt="Jose Regish"
                style={{ width: "100%", aspectRatio: "3/3.8", objectFit: "cover", objectPosition: "center top", display: "block" }}
              />
              {[["top","left"],["top","right"],["bottom","left"],["bottom","right"]].map(([v,h]) => (
                <span key={`${v}${h}`} style={{
                  position: "absolute", width: 20, height: 20,
                  [v]: 14, [h]: 14,
                  borderTop:    v === "top"    ? "3px solid var(--accent)" : "none",
                  borderBottom: v === "bottom" ? "3px solid var(--accent)" : "none",
                  borderLeft:   h === "left"   ? "3px solid var(--accent)" : "none",
                  borderRight:  h === "right"  ? "3px solid var(--accent)" : "none",
                }} />
              ))}
            </div>

            <div style={{ display: "flex", gap: 14, width: "100%", maxWidth: 320 }}>
              {STATS.map(s => (
                <div key={s.label} style={{
                  flex: 1, background: "var(--bg-dark)", color: "#FFF",
                  borderRadius: 18, padding: "16px 18px",
                }}>
                  <div style={{ fontWeight: 800, fontSize: 32, letterSpacing: "-0.03em", lineHeight: 1 }}>
                    <Counter value={s.value} suffix={s.suffix} />
                  </div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 10.5, color: "rgba(255,255,255,0.5)", marginTop: 4 }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div />
      </section>

      {/* ════════════ CURTAIN WRAPPER ════════════ */}
      <div className="curtain-wrapper">
        {/* Marquee Header Divider */}
        <div style={{ borderBottom: "1.5px solid var(--line-strong)", padding: "18px 0", overflow: "hidden", background: "var(--bg-dark)" }}>
          <div className="marquee-track">
            {[0, 1].map(i => (
              <span key={i} style={{ display: "flex", alignItems: "center", gap: 60, whiteSpace: "nowrap", fontWeight: 700, fontSize: 18, color: "rgba(255,255,255,0.6)" }}>
                {MARQUEE_SKILLS.map(t => (
                  <React.Fragment key={t}>{t} <span style={{ color: "var(--accent)" }}>✦</span></React.Fragment>
                ))}
              </span>
            ))}
          </div>
        </div>

        {/* ════════════ ABOUT ME SECTION ════════════ */}
        <section id="about" style={{ maxWidth: 1240, margin: "0 auto", padding: "120px clamp(24px, 5vw, 80px) 80px" }}>
          <LineMask as="div" style={{ marginBottom: 14 }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--text-muted)" }}>
              01 // About Me
            </span>
          </LineMask>
          <LineMask as="h2" delay={100} className="h2-gradient" style={{ fontWeight: 800, fontSize: "clamp(38px, 5.5vw, 76px)", letterSpacing: "-0.04em", lineHeight: 1, marginBottom: 32 }}>
            Passionate about building software<br />
            that merges tech excellence & design.
          </LineMask>
          <p style={{ fontSize: "clamp(16px, 1.8vw, 22px)", lineHeight: 1.65, color: "var(--text-muted)", maxWidth: 820 }}>
            I am a 3rd-year IT student focused on modern fullstack applications, AI assistant platforms, and Web3 decentralized tools. I co-founded AeriX Digital Agency and have won multiple hackathons and coding competitions across South India.
          </p>
        </section>
      </div>

      {/* ════════════ SCROLL-PINNED HORIZONTAL PROJECTS SECTION (6 FEATURED LIVE PROJECTS) ════════════ */}
      <section id="projects" ref={projectsPinRef} className="projects-pinned-container">
        <div className="projects-sticky-viewport">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 20 }}>
            <div>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>
                02 // Featured Live Projects ({PROJECTS.length})
              </span>
              <h2 style={{ fontWeight: 800, fontSize: "clamp(36px, 5.5vw, 76px)", letterSpacing: "-0.04em", marginTop: 8, lineHeight: 0.98, color: "#FFF" }}>
                Featured Works<span style={{ color: "var(--accent)" }}>.</span>
              </h2>
            </div>
          </div>

          {/* Mouse-Wheel Pinned Horizontal Track */}
          <div style={{ overflow: "hidden", width: "100%", margin: "16px 0" }}>
            <div
              ref={trackRef}
              className="projects-horizontal-track"
              style={{ transform: `translateX(-${projectTrackPixelX}px)` }}
            >
              {PROJECTS.map((p, i) => (
                <div key={p.n} className="dark-project-card">
                  
                  {/* LIVE BROWSER PREVIEW FRAME (Clickable display opens live site) */}
                  <a
                    href={p.link === "#" ? undefined : p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="live-browser-frame"
                    style={{ cursor: "pointer", textDecoration: "none", color: "inherit", display: "flex" }}
                  >
                    <div className="browser-header-bar">
                      <div className="browser-dots">
                        <span className="browser-dot" style={{ background: "#FF5F56" }} />
                        <span className="browser-dot" style={{ background: "#FFBD2E" }} />
                        <span className="browser-dot" style={{ background: "#27C93F" }} />
                      </div>

                      <div className="browser-url-bar">
                        <Lock size={10} style={{ flexShrink: 0 }} />
                        <span>https://{p.url}</span>
                      </div>

                      <span style={{ color: "rgba(255,255,255,0.6)" }}>
                        <ExternalLink size={13} />
                      </span>
                    </div>

                    <div className="browser-viewport-content">
                      {p.site ? (
                        <iframe
                          src={p.site}
                          title={p.title}
                          loading="lazy"
                          style={{
                            width: "200%", height: "200%",
                            border: "none",
                            transform: "scale(0.5)",
                            transformOrigin: "top left",
                            pointerEvents: "none",
                          }}
                        />
                      ) : p.img ? (
                        <img
                          src={p.img}
                          alt={p.title}
                          style={{
                            width: "100%", height: "100%",
                            objectFit: "cover", objectPosition: "top center",
                            display: "block",
                          }}
                        />
                      ) : (
                        <div style={{
                          width: "100%", height: "100%",
                          background: "radial-gradient(circle at 30% 30%, #1E1E1E, #050505)",
                          display: "flex", flexDirection: "column",
                          alignItems: "center", justifyContent: "center", gap: 12,
                        }}>
                          <Globe size={40} style={{ color: "rgba(255,255,35,0.3)" }} />
                          <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "rgba(255,255,255,0.4)" }}>
                            Live Repository & Docs
                          </span>
                        </div>
                      )}
                    </div>
                  </a>

                  {/* Card Content & Meta */}
                  <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                        <span style={{
                          fontFamily: "var(--font-mono)", fontSize: 10.5, letterSpacing: ".1em",
                          textTransform: "uppercase", color: "var(--accent)",
                          background: "rgba(255,255,35,0.1)", border: "1px solid rgba(255,255,35,0.2)",
                          padding: "5px 12px", borderRadius: 100,
                        }}>
                          {p.tag}
                        </span>
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "rgba(255,255,255,0.35)" }}>
                          {p.n} / {String(PROJECTS.length).padStart(2, "0")}
                        </span>
                      </div>

                      <h3 style={{ fontWeight: 800, fontSize: "clamp(24px, 2.8vw, 38px)", letterSpacing: "-0.03em", color: "#FFF", marginBottom: 12 }}>
                        <ScrambleText text={p.title} />
                      </h3>

                      <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14.5, lineHeight: 1.6 }}>
                        {p.desc}
                      </p>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 24, paddingTop: 18, borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                      <a
                        href={p.link === "#" ? undefined : p.link}
                        target="_blank" rel="noopener noreferrer"
                        style={{
                          fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: ".06em",
                          textTransform: "uppercase", fontWeight: 700, display: "inline-flex",
                          alignItems: "center", gap: 8, color: "var(--accent)",
                          borderBottom: "1.5px solid var(--accent)", paddingBottom: 3,
                        }}
                      >
                        {p.cta} <ArrowUpRight size={14} />
                      </a>

                      <a
                        href={p.link === "#" ? undefined : p.link}
                        target="_blank" rel="noopener noreferrer"
                        className="card-dark-arrow-btn"
                      >
                        <ArrowUpRight size={18} />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Progress Bar */}
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "rgba(255,255,255,0.35)", minWidth: 60 }}>
              PROJECT {activeProjectNumber} / {PROJECTS.length}
            </span>
            <div className="projects-scroll-bar-wrap">
              <div className="projects-scroll-bar-fill" style={{ width: `${projectScrollProgress * 100}%` }} />
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ JOURNEY SECTION ════════════ */}
      <section id="journey" style={{ background: "#050505", color: "#FFF", padding: "120px 0" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 clamp(24px, 5vw, 80px) 48px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 20 }}>
            <div>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>
                03 // Achievements
              </span>
              <h2 style={{ fontWeight: 800, fontSize: "clamp(36px, 5vw, 76px)", letterSpacing: "-0.04em", marginTop: 12, lineHeight: 1 }}>
                Milestones,<br />
                <span style={{ color: "rgba(255,255,255,0.4)" }}>interactive deck.</span>
              </h2>
            </div>

            {/* Interactive Control Buttons & Prev/Next */}
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <Magnetic strength={0.2}>
                <button
                  onClick={() => slideJourney("left")}
                  style={{
                    width: 44, height: 44, borderRadius: "50%",
                    background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.15)",
                    color: "#FFF", display: "flex", alignItems: "center", justifyContent: "center",
                    cursor: "pointer", transition: "all 0.25s",
                  }}
                >
                  <ChevronLeft size={20} />
                </button>
              </Magnetic>

              <Magnetic strength={0.2}>
                <button
                  onClick={() => slideJourney("right")}
                  style={{
                    width: 44, height: 44, borderRadius: "50%",
                    background: "var(--accent)", border: "none",
                    color: "#000", display: "flex", alignItems: "center", justifyContent: "center",
                    cursor: "pointer", transition: "all 0.25s", fontWeight: 700,
                  }}
                >
                  <ChevronRight size={20} />
                </button>
              </Magnetic>
            </div>
          </div>
        </div>

        {/* 3D Tilt & Confetti Card Deck */}
        <div
          ref={journeyDragRef}
          onMouseDown={onJourneyDragStart} onMouseMove={onJourneyDragMove}
          onMouseUp={onJourneyDragEnd}    onMouseLeave={onJourneyDragEnd}
          onTouchStart={onJourneyDragStart} onTouchMove={onJourneyDragMove} onTouchEnd={onJourneyDragEnd}
          style={{
            display: "flex", gap: 24, overflowX: "auto",
            padding: "20px clamp(24px, 5vw, 80px) 48px",
            userSelect: "none", scrollbarWidth: "none",
          }}
        >
          {JOURNEY.map(j => (
            <InteractiveAchievementCard
              key={j.title}
              item={j}
              onBurst={burst}
            />
          ))}
        </div>
      </section>

      {/* ════════════ SKILLS SECTION ════════════ */}
      <section id="skills" style={{ maxWidth: 1240, margin: "0 auto", padding: "120px clamp(24px, 5vw, 80px)" }}>
        <LineMask as="div" style={{ marginBottom: 14 }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--text-muted)" }}>
            04 // Technical Stack
          </span>
        </LineMask>
        <LineMask as="h2" delay={100} className="h2-gradient" style={{ fontWeight: 800, fontSize: "clamp(40px, 6vw, 84px)", letterSpacing: "-0.04em", lineHeight: 0.98, marginBottom: 60 }}>
          Languages, frameworks<br />
          <span style={{ color: "var(--text-muted)" }}>& engineering tools.</span>
        </LineMask>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {SKILLS.map((s, i) => (
            <div key={s.cat} className="skill-grid-row" style={{
              display: "grid", gridTemplateColumns: "0.4fr 1.6fr", gap: 30,
              padding: "32px 0", borderTop: "1.5px solid var(--line-strong)",
              alignItems: "center",
            }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--text-muted)" }}>
                {s.cat}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {s.items.map(item => (
                  <span key={item} style={{
                    fontFamily: "var(--font-mono)", fontSize: 12, padding: "8px 18px",
                    borderRadius: 100, border: "1.5px solid var(--line-strong)",
                    background: "rgba(0,0,0,0.03)", transition: "all 0.25s",
                  }}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════ CONTACT SECTION ════════════ */}
      <section id="contact" style={{ background: "var(--bg-dark)", color: "#FFF", padding: "140px clamp(24px, 5vw, 80px) 80px", borderTopLeftRadius: 36, borderTopRightRadius: 36 }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>
            Got a project in mind?
          </span>
          <h2 style={{ fontWeight: 800, fontSize: "clamp(48px, 8vw, 116px)", letterSpacing: "-0.04em", lineHeight: 0.98, marginTop: 20, marginBottom: 48 }}>
            Let's build something <span style={{ color: "var(--accent)" }}>exceptional.</span>
          </h2>

          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 80 }}>
            <Magnetic>
              <a href="mailto:joseregish25@gmail.com" className="btn-black" style={{ background: "var(--accent)", color: "#000" }}>
                <Mail size={16} /> Send Email Directly
              </a>
            </Magnetic>
            <Magnetic>
              <button onClick={copyEmail} className="btn-outline" style={{ borderColor: "rgba(255,255,255,0.3)", color: "#FFF" }}>
                {copied ? <Check size={16} /> : <Copy size={16} />}
                joseregish25@gmail.com
              </button>
            </Magnetic>
          </div>

          <footer style={{ borderTop: "1px solid rgba(255,255,255,0.12)", paddingTop: 40, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 20 }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "rgba(255,255,255,0.4)" }}>
              © 2026 Jose Regish — HackerJose25
            </div>
            <div style={{ display: "flex", gap: 24 }}>
              <a href="https://www.linkedin.com/in/jose-regish-9b7196350" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "rgba(255,255,255,0.5)" }}>LinkedIn</a>
              <a href="https://github.com/hackerjose25" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "rgba(255,255,255,0.5)" }}>GitHub</a>
              <a href="mailto:joseregish25@gmail.com" style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "rgba(255,255,255,0.5)" }}>Email</a>
            </div>
          </footer>
        </div>
      </section>
    </div>
  );
}
