import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Share2, Sparkles, Workflow, ImagePlay, AppWindow, LifeBuoy,
  ArrowUpRight, ArrowRight, Mail, MapPin, Menu, X as XIcon,
  CheckCircle2, Check, PhoneCall, Cpu, Clock, Zap, Send,
  Globe, Instagram, Youtube, Github, Linkedin, ExternalLink,
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const reduceMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const EMAIL = 'hello@automateflows.org'
const EMAIL_SUBJECT = 'Automation inquiry — AutomateFlows.org'
const EMAIL_BODY = `Hi AutomateFlows,

I'd like to automate the following in my business:


What I'm hoping to achieve:


Thanks,`

// Opens a Gmail compose window pre-filled and ready to send TO ${EMAIL}.
// (The visitor is the sender; the message is addressed to hello@automateflows.org.)
const GMAIL_COMPOSE =
  `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(EMAIL)}` +
  `&su=${encodeURIComponent(EMAIL_SUBJECT)}&body=${encodeURIComponent(EMAIL_BODY)}`

// Web3Forms access key (public/safe to embed client-side). Submissions are
// emailed to the address registered with this key at web3forms.com.
const WEB3FORMS_ACCESS_KEY = '7b37b45a-1682-49b9-8551-ac7a79d9de3f'

/* ---------------------------------- data ---------------------------------- */

const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'Portfolio', href: '#work' },
  { label: 'Pricing', href: '#pricing' },
]

const STATS = [
  { end: 8, suffix: '+', label: 'Live automation systems' },
  { end: 310, suffix: '+', label: 'AI prompts engineered' },
  { static: '24/7', label: 'Systems run autonomously' },
  { end: 40, suffix: 'h+', label: 'Saved per month, per client' },
]

const SERVICES = [
  {
    icon: Share2,
    title: 'Social Media Automation',
    text: 'AI-generated content, automated posting to Facebook, Instagram, X/Twitter, and Stories. Complete with hashtag rotation, caption hooks, and peak-time scheduling.',
    tag: 'Runs 24/7 — zero effort',
  },
  {
    icon: Sparkles,
    title: 'AI Content Pipelines',
    text: 'Automated blog posts, menu generation, newsletters, and product descriptions powered by Claude, GPT, and custom AI models. Content that sounds human, runs on autopilot.',
    tag: 'Endless content, zero burnout',
  },
  {
    icon: Workflow,
    title: 'Workflow Automation',
    text: 'Connect your tools — CRM, email, invoicing, scheduling — into seamless automated workflows. Eliminate copy-paste, manual data entry, and forgotten follow-ups.',
    tag: 'Save hours every single day',
  },
  {
    icon: ImagePlay,
    title: 'AI Image & Video Generation',
    text: 'Automated visual content creation using AI image generators and video animation. Perfect for social media, marketing campaigns, and product visuals.',
    tag: 'Unlimited creative output',
  },
  {
    icon: AppWindow,
    title: 'Custom Web Applications',
    text: 'Modern web platforms built with Next.js, Supabase, and cloud infrastructure. From SaaS products to content platforms — fast, scalable, and production-ready.',
    tag: 'Built to scale with you',
  },
  {
    icon: LifeBuoy,
    title: 'Maintenance & Retainers',
    text: 'Keep your automation running smoothly. Monthly retainers include monitoring, updates, new features, and priority support. Your systems never miss a beat.',
    tag: 'Always on, always improving',
  },
]

const PROCESS = [
  {
    n: '01',
    title: 'Discovery Call',
    text: 'We map your repetitive tasks, bottlenecks, and goals. Free, 30 minutes.',
    meta: 'Free · 30 min',
  },
  {
    n: '02',
    title: 'Blueprint',
    text: 'I design the automation architecture — what connects where, and what runs when.',
    meta: 'Architecture · diagram',
  },
  {
    n: '03',
    title: 'Build & Test',
    text: 'Custom development, thorough testing, and iteration until everything runs perfectly.',
    meta: 'Build · QA · iterate',
  },
  {
    n: '04',
    title: 'Launch & Support',
    text: 'Go live with monitoring. I stay on to ensure everything runs smoothly.',
    meta: 'Live · monitored',
  },
]

const PORTFOLIO = [
  {
    emoji: '🍽️',
    title: 'Daily Menu Platform',
    feature: true,
    tags: ['3 Websites', 'AI Menus', 'Bilingual', 'Multi-platform', 'Supabase'],
    text: 'AI generates daily menus (soup, main course, salad & side dish) with AI-generated food photos, bilingual cooking steps, and community kitchen features. Auto-posts to Facebook, Instagram & X/Twitter — including Stories. Serves 3 websites with unique content daily.',
    stats: [
      { v: '3', k: 'websites' },
      { v: '5+', k: 'social accounts' },
      { v: 'Daily', k: 'fresh content' },
    ],
    links: [
      { icon: Globe, label: 'dailymenuforall.com', url: 'https://www.dailymenuforall.com' },
      { icon: Globe, label: 'gunlukmenu.com', url: 'https://www.gunlukmenu.com' },
      { icon: Globe, label: 'dailyhalalmenu.com', url: 'https://www.dailyhalalmenu.com' },
      { icon: Instagram, label: 'Instagram', url: 'https://www.instagram.com/dailymenuforall/' },
    ],
  },
  {
    emoji: '🏔️',
    title: 'Best Travel Plan',
    tags: ['AI Images', 'Video Animation', 'Auto-post'],
    text: 'Two-part project: a full-stack travel cost planning web app built with React, TypeScript & Supabase — plus a fully automated system generating AI landscape images, animating them into videos with audio, and posting to Instagram with rotating hashtags and captions daily.',
    stats: [
      { v: '126', k: 'commits' },
      { v: '310+', k: 'AI prompts' },
      { v: '0', k: 'manual work' },
    ],
    links: [
      { icon: Instagram, label: 'Instagram', url: 'https://www.instagram.com/besttravelplan_landscapshare/' },
    ],
  },
  {
    emoji: '🧬',
    title: 'Longevity Decoded — YouTube Channel',
    tags: ['n8n Workflows', 'AI Video', 'AI Voice', 'Hetzner VPS', 'Whisper AI'],
    text: 'Fully automated YouTube channel pipeline: select a topic in n8n, AI does keyword research & competitor analysis, generates scripts, produces AI voice & video clips, adds subtitles via Whisper AI, edits everything together, and auto-uploads to YouTube. Zero manual editing.',
    stats: [
      { v: '~€50', k: '/month cost' },
      { v: '30min', k: 'topic to upload' },
      { v: '0', k: 'manual editing' },
    ],
    links: [
      { icon: Youtube, label: 'YouTube', url: 'https://www.youtube.com/@LongevityDecoded-tier3' },
    ],
  },
  {
    emoji: '🪴',
    title: 'Plant Warrior — Indoor Plant Tips',
    tags: ['AI Video', 'AI Voice Clone', 'Instagram', 'YouTube'],
    text: 'AI-powered content channel sharing tips & tricks about indoor plants. Uses a one-time voice sample to generate new AI voiceovers for every video topic automatically. Fully AI-generated content — from script to voice to final video — posted to Instagram and YouTube.',
    stats: [
      { v: '1x', k: 'voice sample' },
      { v: '100%', k: 'AI generated' },
      { v: '2', k: 'platforms' },
    ],
    links: [
      { icon: Instagram, label: 'Instagram', url: 'https://www.instagram.com/plantwarriorlive/' },
      { icon: Youtube, label: 'YouTube', url: 'https://www.youtube.com/@plantwarriorlive' },
    ],
  },
  {
    emoji: '🎵',
    title: 'Words Between Silence — AI Music Channel',
    tags: ['Suno AI', 'n8n Workflows', 'FFmpeg', 'YouTube API', 'X API'],
    text: 'Fully automated AI music YouTube channel. Every 5 hours, a new emotional song is born — lyrics selected from 100 phrases, one of 20 genres randomly chosen, music generated by Suno AI, cover art by FLUX.1-schnell, video assembled via FFmpeg, then uploaded to YouTube and posted to X. Zero human touch.',
    stats: [
      { v: '5', k: 'songs/day' },
      { v: '20', k: 'genres' },
      { v: '0', k: 'human intervention' },
    ],
    links: [
      { icon: Youtube, label: 'YouTube', url: 'https://www.youtube.com/@WordsBetweenSilence' },
      { icon: XIcon, label: 'X / Twitter', url: 'https://x.com/Ibrahim60527521' },
    ],
  },
]

const STACK = [
  'n8n', 'Claude', 'GPT', 'Supabase', 'Next.js', 'React', 'TypeScript',
  'FFmpeg', 'Whisper AI', 'Suno AI', 'FLUX.1', 'Hetzner',
]

const PRICING = [
  {
    name: 'Starter',
    sub: 'Your First Win',
    price: 'custom scoped',
    blurb: 'One powerful automation that pays for itself — fast',
    features: [
      'Single automation system',
      'Up to 3 platform integrations',
      'Cron-based scheduling',
      '1 week of post-launch support',
      'Documentation & handoff',
    ],
    cta: 'Get Started',
    featured: false,
  },
  {
    name: 'Growth',
    sub: 'Full Transformation',
    price: 'built for scale',
    blurb: 'Your entire operation, automated — focus on growth, not grind',
    features: [
      'Multi-platform automation',
      'AI content generation pipeline',
      'Custom web dashboard',
      'Image/video generation',
      '2 weeks post-launch support',
      'Priority communication',
    ],
    cta: 'Email Me',
    featured: true,
  },
  {
    name: 'Retainer',
    sub: 'Always Evolving',
    price: 'month by month',
    blurb: 'Continuous upgrades, monitoring & growth — without lifting a finger',
    features: [
      'Everything in Growth',
      'Monthly feature additions',
      '24/7 monitoring & fixes',
      'Performance optimization',
      'Priority Slack/email support',
      'Quarterly strategy review',
    ],
    cta: "Let's Talk",
    featured: false,
  },
]

/* -------------------------------- primitives ------------------------------- */

function Logo({ className = '' }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-accent glow-primary">
        <span className="font-mono text-[15px] font-bold text-white">{'</>'}</span>
      </span>
      <span className="font-display text-[1.05rem] font-bold tracking-tight">
        Automate<span className="gradient-text">Flows</span>
      </span>
    </span>
  )
}

function CountUp({ end, suffix = '', duration = 2000 }) {
  const [value, setValue] = useState(reduceMotion ? end : 0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    if (reduceMotion) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const startTs = performance.now()
        const tick = (now) => {
          const t = Math.min(1, (now - startTs) / duration)
          const eased = 1 - Math.pow(1 - t, 3)
          setValue(Math.round(end * eased))
          if (t < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      }
    }, { threshold: 0.4 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [end, duration])

  return <span ref={ref} className="tabular-nums">{value}{suffix}</span>
}

function Eyebrow({ children }) {
  return (
    <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent/80">{children}</p>
  )
}

/* ---------------------------------- navbar --------------------------------- */

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <nav
        className={`fixed top-4 left-1/2 z-50 w-[calc(100%-1.5rem)] max-w-5xl -translate-x-1/2 rounded-full px-4 sm:px-6 py-2.5 transition-all duration-500 ${
          scrolled ? 'glass shadow-lg shadow-black/40' : 'bg-transparent'
        }`}
      >
        <div className="flex items-center justify-between">
          <a href="#home" className="shrink-0"><Logo /></a>
          <ul className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-sm font-medium text-muted transition-colors hover:text-ink">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <a
              href={GMAIL_COMPOSE} target="_blank" rel="noopener noreferrer"
              className="magnetic-btn hidden sm:inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white glow-primary"
            >
              Email Me <ArrowUpRight className="h-4 w-4" />
            </a>
            <button
              onClick={() => setOpen(true)}
              className="lg:hidden grid h-10 w-10 place-items-center rounded-full border border-divider text-ink"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-[60] bg-deep/95 backdrop-blur-2xl transition-all duration-500 lg:hidden ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <div className="flex items-center justify-between px-6 py-6">
          <Logo />
          <button
            onClick={() => setOpen(false)}
            className="grid h-10 w-10 place-items-center rounded-full border border-divider text-ink"
            aria-label="Close menu"
          >
            <XIcon className="h-5 w-5" />
          </button>
        </div>
        <div className="flex flex-col gap-2 px-6 pt-8">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="border-b border-divider py-4 font-display text-3xl font-semibold tracking-tight text-ink"
            >
              {l.label}
            </a>
          ))}
          <a
            href={GMAIL_COMPOSE} target="_blank" rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 font-semibold text-white"
          >
            Email Me <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </>
  )
}

/* ----------------------------------- hero ---------------------------------- */

function Hero() {
  const ref = useRef(null)
  useEffect(() => {
    if (reduceMotion) return
    const ctx = gsap.context(() => {
      gsap.from('.hero-meta', { y: 24, opacity: 0, duration: 0.8, delay: 0.2, ease: 'power3.out' })
      gsap.from('.hero-line-1', { y: 40, opacity: 0, duration: 1, delay: 0.35, ease: 'power3.out' })
      gsap.from('.hero-line-2', { y: 60, opacity: 0, duration: 1.2, delay: 0.55, ease: 'power3.out' })
      gsap.from('.hero-sub', { y: 24, opacity: 0, duration: 0.8, delay: 0.85, ease: 'power3.out' })
      gsap.from('.hero-cta', { y: 24, opacity: 0, duration: 0.8, delay: 1, stagger: 0.12, ease: 'power3.out' })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section id="home" ref={ref} className="relative min-h-[100dvh] overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=2400&q=80"
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-[0.18]"
      />
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-br from-deep/90 via-background/60 to-deep/90" />
      <div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-background to-transparent" />
      {/* glow blobs */}
      <div className="pointer-events-none absolute -top-24 right-0 h-[28rem] w-[28rem] rounded-full bg-primary/25 blur-[120px]" />
      <div className="pointer-events-none absolute top-1/3 -left-24 h-80 w-80 rounded-full bg-accent/15 blur-[120px]" />
      {/* floating code particles top-right */}
      <div className="pointer-events-none absolute right-8 top-28 hidden sm:block">
        {['{ }', '</>', 'AI', '01', 'fn()'].map((t, i) => (
          <span
            key={t}
            className="absolute font-mono text-sm text-accent/40 animate-float"
            style={{
              top: `${i * 46}px`,
              right: `${(i % 2) * 70 + 10}px`,
              animationDelay: `${i * 0.7}s`,
            }}
          >
            {t}
          </span>
        ))}
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-7xl flex-col justify-end px-6 pb-24 pt-32 sm:px-10 lg:px-16">
        <div className="hero-meta mb-7 inline-flex w-fit items-center gap-2 rounded-full border border-divider glass px-4 py-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-accent ring-pulse" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          <span className="font-mono text-xs tracking-wide text-muted">Available for new projects — EU based</span>
        </div>

        <h1 className="max-w-5xl font-display text-5xl font-bold leading-[0.95] tracking-tighter text-ink sm:text-7xl lg:text-[5.5rem]">
          <span className="hero-line-1 block">Stop doing manually what</span>
          <span className="hero-line-2 mt-1 block font-serif italic font-medium gradient-text">
            AI can automate for your business
          </span>
        </h1>

        <p className="hero-sub mt-8 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
          I build custom AI-powered automation systems that handle your social media, content,
          workflows, and repetitive tasks — so you can focus on growing your business.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href={GMAIL_COMPOSE} target="_blank" rel="noopener noreferrer"
            className="hero-cta magnetic-btn inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 font-semibold text-white glow-primary"
          >
            <Mail className="h-4 w-4" /> Email Me <ArrowUpRight className="h-4 w-4" />
          </a>
          <a
            href="#work"
            className="hero-cta magnetic-btn inline-flex items-center gap-2 rounded-full glass border border-divider px-7 py-3.5 font-semibold text-ink"
          >
            See My Work <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <p className="hero-cta mt-6 font-mono text-sm text-muted">
          Or email me directly:{' '}
          <a
            href={GMAIL_COMPOSE}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline-offset-4 hover:underline"
          >
            {EMAIL}
          </a>
        </p>
      </div>
    </section>
  )
}

/* ---------------------------------- stats ---------------------------------- */

function Stats() {
  return (
    <section className="relative border-y border-divider bg-surface/40">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px lg:grid-cols-4">
        {STATS.map((s, i) => (
          <div key={i} className="relative px-6 py-12 sm:px-10 text-center lg:text-left">
            <div className="font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
              {s.static ? s.static : <CountUp end={s.end} suffix={s.suffix} />}
            </div>
            <p className="mt-3 text-sm text-muted">{s.label}</p>
            <div className="mt-5 h-px overflow-hidden">
              <div className="h-full w-full bg-gradient-to-r from-transparent via-primary to-transparent"
                style={reduceMotion ? {} : { animation: `pillar-sweep 3s ease-in-out ${i * 0.4}s infinite` }} />
            </div>
          </div>
        ))}
      </div>
      <style>{`@keyframes pillar-sweep {0%{transform:translateX(-100%)}50%{transform:translateX(100%)}100%{transform:translateX(100%)}}`}</style>
    </section>
  )
}

/* --------------------- interactive feature demos (3) ----------------------- */

// 3a. Social — stacked post shuffler
function PostShuffler() {
  const posts = [
    { p: 'Instagram', c: 'from-pink-500 to-orange-400', t: 'New reel scheduled · 6:00 PM peak', h: '#automation #ai' },
    { p: 'X / Twitter', c: 'from-sky-400 to-blue-500', t: 'Thread queued · caption hook A/B', h: '#buildinpublic' },
    { p: 'Facebook', c: 'from-blue-500 to-indigo-500', t: 'Story posted · auto-generated', h: '#smallbiz #content' },
  ]
  const [top, setTop] = useState(0)
  useEffect(() => {
    if (reduceMotion) return
    const id = setInterval(() => setTop((t) => (t + 1) % posts.length), 3000)
    return () => clearInterval(id)
  }, [])
  return (
    <div className="relative h-44 w-full">
      {posts.map((post, i) => {
        const order = (i - top + posts.length) % posts.length
        return (
          <div
            key={post.p}
            className="absolute inset-x-2 top-2 rounded-2xl border border-divider bg-surface p-4 transition-all duration-700"
            style={{
              transform: `translateY(${order * 14}px) scale(${1 - order * 0.06})`,
              opacity: order === 0 ? 1 : 0.5 - order * 0.12,
              zIndex: posts.length - order,
              filter: order === 0 ? 'none' : 'blur(1px)',
            }}
          >
            <div className="flex items-center gap-2">
              <span className={`h-7 w-7 rounded-lg bg-gradient-to-br ${post.c}`} />
              <span className="font-mono text-xs text-muted">{post.p}</span>
              <span className="ml-auto font-mono text-[10px] text-accent">auto</span>
            </div>
            <p className="mt-3 text-sm text-ink">{post.t}</p>
            <p className="mt-1 font-mono text-[11px] text-primary-light">{post.h}</p>
          </div>
        )
      })}
    </div>
  )
}

// 3b. Signature animation — AI content pipeline (re-skinned falling code tokens)
function CodeScanSignature() {
  const [status, setStatus] = useState(0)
  const states = ['drafting copy…', 'optimizing tone…', 'publishing →', 'queued ✓']
  useEffect(() => {
    if (reduceMotion) return
    const id = setInterval(() => setStatus((s) => (s + 1) % states.length), 2300)
    return () => clearInterval(id)
  }, [])
  const tokens = [
    { x: 16, d: 0, dur: 2.6, s: 13, t: '{' },
    { x: 30, d: 0.6, dur: 3.1, s: 11, t: '</>' },
    { x: 44, d: 1.2, dur: 2.4, s: 14, t: 'AI' },
    { x: 56, d: 0.3, dur: 2.9, s: 12, t: ';' },
    { x: 68, d: 1.6, dur: 3.3, s: 13, t: '01' },
    { x: 80, d: 0.9, dur: 2.7, s: 11, t: '}' },
    { x: 90, d: 2.0, dur: 3.0, s: 12, t: '→' },
  ]
  return (
    <div className="relative h-44 w-full overflow-hidden rounded-2xl border border-divider bg-gradient-to-b from-[#0e0e1a] to-[#0a0a12]">
      {/* blobs */}
      <div className="absolute -top-6 left-6 h-20 w-20 rounded-full bg-primary/30 blur-2xl" />
      <div className="absolute bottom-2 right-8 h-24 w-24 rounded-full bg-accent/20 blur-2xl" />
      {/* header strip */}
      <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-4 py-2 font-mono text-[10px] text-muted">
        <span>pipeline.run</span>
        <span className="text-accent">{status + 1}/4</span>
      </div>
      {/* source conduit (pipe) */}
      <div className="absolute left-4 right-4 top-9 h-1.5 rounded-full bg-gradient-to-r from-primary via-accent to-primary opacity-70" />
      {/* falling tokens */}
      {tokens.map((tk, i) => (
        <span
          key={i}
          className="absolute font-mono font-medium text-accent"
          style={{
            left: `${tk.x}%`,
            top: '40px',
            fontSize: `${tk.s}px`,
            animation: reduceMotion ? 'none' : `flow-fall ${tk.dur}s ${tk.d}s linear infinite`,
          }}
        >
          {tk.t}
        </span>
      ))}
      {/* surface line */}
      <svg className="absolute inset-x-0 bottom-7 w-full" height="14" preserveAspectRatio="none" viewBox="0 0 300 14">
        <path d="M0 7 Q 37 0 75 7 T 150 7 T 225 7 T 300 7" fill="none" stroke="#7c5cff" strokeOpacity="0.5" strokeWidth="1.5" />
      </svg>
      {/* ripples */}
      {[28, 52, 74].map((x, i) => (
        <span
          key={x}
          className="absolute bottom-7 h-3 w-3 rounded-full border border-accent"
          style={{ left: `${x}%`, animation: reduceMotion ? 'none' : `flow-ripple 2.4s ${i * 0.6}s ease-out infinite` }}
        />
      ))}
      {/* footer status */}
      <div className="absolute inset-x-0 bottom-0 flex items-center gap-2 px-4 py-2">
        <span className="h-1.5 w-1.5 rounded-full bg-accent ring-pulse" />
        <span key={status} className="font-mono text-[11px] text-ink" style={{ animation: reduceMotion ? 'none' : 'flow-fadein 0.4s ease' }}>
          {states[status]}
        </span>
      </div>
      <style>{`
        @keyframes flow-fall {0%{transform:translateY(-6px);opacity:0}12%{opacity:1}82%{opacity:1}100%{transform:translateY(86px);opacity:0}}
        @keyframes flow-ripple {0%{transform:scale(0.4);opacity:0.9}80%{transform:scale(3.2);opacity:0}100%{transform:scale(3.2);opacity:0}}
        @keyframes flow-fadein {from{opacity:0;transform:translateY(2px)}to{opacity:1;transform:translateY(0)}}
      `}</style>
    </div>
  )
}

// 3c. Workflow — cursor connects nodes / triggers run
function WorkflowScheduler() {
  const [step, setStep] = useState(0)
  useEffect(() => {
    if (reduceMotion) return
    const id = setInterval(() => setStep((s) => (s + 1) % 5), 1400)
    return () => clearInterval(id)
  }, [])
  const nodes = [
    { x: 14, y: 30, label: 'Trigger' },
    { x: 50, y: 64, label: 'AI step' },
    { x: 84, y: 30, label: 'Publish' },
  ]
  const cursorPos = [
    { x: 14, y: 30 }, { x: 50, y: 64 }, { x: 84, y: 30 }, { x: 84, y: 30 }, { x: 50, y: 20 },
  ][step]
  const ran = step >= 3
  return (
    <div className="relative h-44 w-full overflow-hidden rounded-2xl border border-divider bg-[#0e0e1a]">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute inset-x-0 top-0 flex items-center justify-between px-4 py-2 font-mono text-[10px] text-muted">
        <span>workflow.n8n</span>
        <span className={ran ? 'text-accent' : 'text-muted'}>{ran ? 'running ✓' : 'idle'}</span>
      </div>
      {/* connectors */}
      <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
        <line x1="14%" y1="30%" x2="50%" y2="64%" stroke={step >= 1 ? '#22d3ee' : '#2a2a3d'} strokeWidth="2" strokeDasharray="4 4" />
        <line x1="50%" y1="64%" x2="84%" y2="30%" stroke={step >= 2 ? '#22d3ee' : '#2a2a3d'} strokeWidth="2" strokeDasharray="4 4" />
      </svg>
      {/* nodes */}
      {nodes.map((n, i) => (
        <div
          key={n.label}
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-lg border px-2.5 py-1.5 font-mono text-[10px] transition-all duration-500"
          style={{
            left: `${n.x}%`, top: `${n.y}%`,
            borderColor: step >= i ? '#7c5cff' : 'rgba(255,255,255,0.1)',
            color: step >= i ? '#f4f4f8' : '#9aa0b4',
            background: step >= i ? 'rgba(124,92,255,0.15)' : 'transparent',
            boxShadow: step >= i ? '0 0 16px -4px rgba(124,92,255,0.6)' : 'none',
          }}
        >
          {n.label}
        </div>
      ))}
      {/* cursor */}
      <svg
        className="absolute h-5 w-5 transition-all duration-700 ease-out drop-shadow"
        style={{ left: `calc(${cursorPos.x}% - 4px)`, top: `calc(${cursorPos.y}% - 2px)` }}
        viewBox="0 0 24 24" fill="white"
      >
        <path d="M4 2l16 7-7 2-2 7z" stroke="#0a0a0f" strokeWidth="1" />
      </svg>
      <div className="absolute inset-x-0 bottom-0 flex items-center gap-2 px-4 py-2">
        <span className="h-1.5 w-1.5 rounded-full bg-accent ring-pulse" />
        <span className="font-mono text-[11px] text-ink">
          {ran ? 'auto-runs on schedule' : 'connecting tools…'}
        </span>
      </div>
    </div>
  )
}

function Features() {
  const ref = useRef(null)
  useEffect(() => {
    if (reduceMotion) return
    const ctx = gsap.context(() => {
      gsap.from('.feature-card', {
        scrollTrigger: { trigger: ref.current, start: 'top 80%', once: true },
        y: 40, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  const cards = [
    { eyebrow: 'social', title: 'Posts that publish themselves', demo: <PostShuffler />,
      text: 'AI writes, schedules, and posts across every platform — at peak times, with rotating hooks and hashtags.',
      bullets: ['Facebook · Instagram · X', 'Stories + reels', 'Peak-time scheduling'] },
    { eyebrow: 'content pipeline', title: 'Content on autopilot', demo: <CodeScanSignature />,
      text: 'Claude, GPT, and custom models draft blogs, menus, and newsletters that sound human — running on a loop.',
      bullets: ['Claude + GPT', 'Human-sounding copy', 'Endless, on-brand'] },
    { eyebrow: 'workflows', title: 'Your tools, wired together', demo: <WorkflowScheduler />,
      text: 'Connect CRM, email, invoicing, and scheduling into one flow — triggered on a cron, no copy-paste.',
      bullets: ['n8n orchestration', 'Cron-scheduled', 'Zero manual entry'] },
  ]

  return (
    <section ref={ref} className="relative py-28 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <div className="max-w-2xl">
          <Eyebrow>// in action</Eyebrow>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            Real systems, running while you sleep
          </h2>
          <p className="mt-5 text-muted">
            Every system is custom-built to your business. No templates, no generic tools — real
            automation that runs 24/7.
          </p>
        </div>
        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {cards.map((c) => (
            <div key={c.title} className="feature-card rounded-3xl card-border bg-surface p-6 sm:p-8 lift-on-hover">
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent/70">// {c.eyebrow}</p>
              <h3 className="mt-2 font-display text-xl font-semibold text-ink">{c.title}</h3>
              <div className="mt-6">{c.demo}</div>
              <p className="mt-6 text-sm leading-relaxed text-muted">{c.text}</p>
              <ul className="mt-4 space-y-2">
                {c.bullets.map((b) => (
                  <li key={b} className="flex items-center gap-2 font-mono text-xs text-muted">
                    <Check className="h-3.5 w-3.5 text-primary-light" /> {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* -------------------------------- services --------------------------------- */

function Services() {
  const ref = useRef(null)
  useEffect(() => {
    if (reduceMotion) return
    const ctx = gsap.context(() => {
      gsap.from('.svc-tile', {
        scrollTrigger: { trigger: ref.current, start: 'top 78%', once: true },
        y: 30, opacity: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out',
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section id="services" ref={ref} className="relative bg-deep py-28 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <div className="max-w-2xl">
          <Eyebrow>// services</Eyebrow>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            What I automate for you
          </h2>
          <p className="mt-5 text-muted">
            Every system is custom-built to your business. No templates, no generic tools — real
            automation that runs while you sleep.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-3xl bg-white/[0.06] sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => {
            const Icon = s.icon
            return (
              <div key={s.title} className="svc-tile group relative bg-deep p-8 transition-colors duration-300 hover:bg-surface/60 sm:p-9">
                <span className="inline-grid h-12 w-12 place-items-center rounded-xl bg-primary/15 text-primary-light transition-transform duration-300 group-hover:scale-110">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-6 font-display text-xl font-semibold text-ink">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{s.text}</p>
                <p className="mt-5 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wide text-accent">
                  <Zap className="h-3.5 w-3.5" /> {s.tag}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* --------------------------------- process --------------------------------- */

function Process() {
  const ref = useRef(null)
  useEffect(() => {
    if (reduceMotion) return
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.protocol-card')
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return
        gsap.to(card, {
          scrollTrigger: { trigger: card, start: 'top top+=110', end: '+=460', scrub: 1 },
          scale: 0.93, filter: 'blur(6px) saturate(0.7)', opacity: 0.45, ease: 'none',
        })
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section id="process" ref={ref} className="relative py-28 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <div className="max-w-2xl">
          <Eyebrow>// how it works</Eyebrow>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            From idea to running system in 2 weeks
          </h2>
        </div>
      </div>

      <div className="relative mx-auto mt-14 max-w-5xl px-6 sm:px-10" style={{ minHeight: '300vh' }}>
        {PROCESS.map((p) => (
          <div key={p.n} className="protocol-card sticky top-24 mb-8" style={{ willChange: 'transform' }}>
            <div className="grid grid-cols-1 gap-6 overflow-hidden rounded-3xl card-border bg-surface p-8 sm:grid-cols-5 sm:p-10">
              <div className="sm:col-span-3">
                <span className="font-mono text-5xl font-bold text-primary/30">{p.n}</span>
                <h3 className="mt-4 font-display text-2xl font-semibold text-ink sm:text-3xl">{p.title}</h3>
                <p className="mt-4 max-w-md leading-relaxed text-muted">{p.text}</p>
                <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-divider px-3 py-1 font-mono text-[11px] uppercase tracking-wide text-accent">
                  {p.meta}
                </p>
              </div>
              <div className="relative sm:col-span-2">
                <div className="grid h-full min-h-[140px] place-items-center overflow-hidden rounded-2xl bg-gradient-to-br from-primary/15 to-accent/10">
                  <div className="grid-bg absolute inset-0 opacity-40" />
                  <span className="relative font-mono text-7xl font-bold gradient-text">{p.n}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* -------------------------------- portfolio -------------------------------- */

function ProjectCard({ p }) {
  return (
    <div className={`group relative flex flex-col rounded-3xl card-border bg-surface p-7 sm:p-8 lift-on-hover ${p.feature ? 'lg:col-span-2' : ''}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-xl bg-white/[0.04] text-2xl">{p.emoji}</span>
          <h3 className="font-display text-lg font-semibold leading-tight text-ink sm:text-xl">{p.title}</h3>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {p.tags.map((t) => (
          <span key={t} className="rounded-full border border-divider px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide text-muted">
            {t}
          </span>
        ))}
      </div>

      <p className={`mt-5 text-sm leading-relaxed text-muted ${p.feature ? 'max-w-2xl' : ''}`}>{p.text}</p>

      <div className="mt-6 grid grid-cols-3 gap-3 border-t border-divider pt-5">
        {p.stats.map((s) => (
          <div key={s.k}>
            <div className="font-display text-xl font-bold text-ink">{s.v}</div>
            <div className="font-mono text-[10px] uppercase tracking-wide text-muted">{s.k}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {p.links.map((l) => {
          const Icon = l.icon
          return (
            <a
              key={l.label}
              href={l.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.04] px-3 py-1.5 text-xs text-ink transition-colors hover:bg-primary/20"
            >
              <Icon className="h-3.5 w-3.5 text-accent" /> {l.label}
            </a>
          )
        })}
      </div>
    </div>
  )
}

function Portfolio() {
  const ref = useRef(null)
  useEffect(() => {
    if (reduceMotion) return
    const ctx = gsap.context(() => {
      gsap.from('.proj-wrap > *', {
        scrollTrigger: { trigger: ref.current, start: 'top 75%', once: true },
        y: 36, opacity: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out',
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section id="work" ref={ref} className="relative border-t border-divider py-28 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <div className="max-w-2xl">
          <Eyebrow>// portfolio</Eyebrow>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            Systems I've built &amp; run
          </h2>
          <p className="mt-5 text-muted">
            These aren't concepts — they're live systems running 24/7 right now.
          </p>
        </div>

        <div className="proj-wrap mt-14 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {PORTFOLIO.map((p) => (
            <ProjectCard key={p.title} p={p} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------- tech stack -------------------------------- */

function TechStrip() {
  return (
    <section className="relative border-y border-divider bg-surface/30 py-14">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <p className="text-center font-mono text-xs uppercase tracking-[0.3em] text-muted">
          // the tools I build with
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          {STACK.map((t) => (
            <span key={t} className="rounded-full border border-divider bg-white/[0.03] px-4 py-2 font-mono text-sm text-ink transition-colors hover:border-primary/40 hover:text-accent">
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

/* --------------------------------- pricing --------------------------------- */

function Pricing() {
  const ref = useRef(null)
  useEffect(() => {
    if (reduceMotion) return
    const ctx = gsap.context(() => {
      gsap.from('.price-card', {
        scrollTrigger: { trigger: ref.current, start: 'top 78%', once: true },
        y: 36, opacity: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out',
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section id="pricing" ref={ref} className="relative py-28 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>// pricing</Eyebrow>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            The right fit for every business
          </h2>
          <p className="mt-5 text-muted">
            Every project is unique. Let's talk about yours and build something that delivers real,
            lasting results.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 items-start gap-6 lg:grid-cols-3">
          {PRICING.map((tier) => (
            <div
              key={tier.name}
              className={`price-card relative flex flex-col rounded-3xl p-8 ${
                tier.featured
                  ? 'card-border bg-gradient-to-b from-primary/15 to-surface glow-primary lg:-mt-4 lg:pb-12'
                  : 'card-border bg-surface'
              }`}
            >
              {tier.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 font-mono text-[10px] uppercase tracking-wide text-white">
                  Most popular
                </span>
              )}
              <div className="flex items-baseline justify-between">
                <h3 className="font-display text-2xl font-bold text-ink">{tier.name}</h3>
                <span className="font-mono text-[11px] uppercase tracking-wide text-accent">{tier.sub}</span>
              </div>
              <p className="mt-2 font-mono text-sm text-muted">{tier.price}</p>
              <p className="mt-4 text-sm leading-relaxed text-muted">{tier.blurb}</p>

              <ul className="mt-7 flex-1 space-y-3">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-ink">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary-light" /> {f}
                  </li>
                ))}
              </ul>

              <a
                href={GMAIL_COMPOSE} target="_blank" rel="noopener noreferrer"
                className={`magnetic-btn mt-8 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-semibold ${
                  tier.featured ? 'bg-primary text-white glow-primary' : 'border border-divider text-ink hover:bg-white/[0.04]'
                }`}
              >
                {tier.cta} <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* --------------------------------- contact --------------------------------- */

function Contact() {
  const [status, setStatus] = useState('idle') // 'idle' | 'sending' | 'sent' | 'error'
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '', botcheck: '' })

  const onSubmit = async (e) => {
    e.preventDefault()
    if (status === 'sending') return
    if (form.botcheck) return // honeypot tripped — silently drop bots
    setStatus('sending')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: 'New automation inquiry — AutomateFlows.org',
          from_name: 'AutomateFlows website',
          name: form.name,
          email: form.email,
          company: form.company || '—',
          message: form.message,
        }),
      })
      const data = await res.json()
      if (data.success) setStatus('sent')
      else setStatus('error')
    } catch {
      setStatus('error')
    }
  }

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  return (
    <section id="contact" className="relative border-t border-divider py-28 sm:py-32">
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/15 blur-[120px]" />
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 sm:px-10 lg:grid-cols-12 lg:px-16">
        <div className="lg:col-span-5">
          <Eyebrow>// let's talk</Eyebrow>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            Ready to automate your business?
          </h2>
          <p className="mt-5 max-w-md text-muted">
            Send me a quick message and I'll get back to you. I'll map out exactly what can be
            automated and how much time you'll save.
          </p>

          <div className="mt-10 space-y-3">
            <a href={GMAIL_COMPOSE} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 rounded-2xl card-border bg-surface p-4 transition-colors hover:bg-surface-hover">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/15 text-primary-light"><Mail className="h-5 w-5" /></span>
              <div>
                <div className="text-sm font-semibold text-ink">hello@automateflows.org</div>
                <div className="font-mono text-xs text-muted">Replies within a day</div>
              </div>
            </a>
            <div className="flex items-center gap-4 rounded-2xl card-border bg-surface p-4">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent/15 text-accent"><MapPin className="h-5 w-5" /></span>
              <div>
                <div className="text-sm font-semibold text-ink">Brussels, Belgium</div>
                <div className="font-mono text-xs text-muted">EU based · working worldwide</div>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-2xl card-border bg-surface p-4">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/15 text-primary-light"><PhoneCall className="h-5 w-5" /></span>
              <div>
                <div className="text-sm font-semibold text-ink">Free 30-min discovery call</div>
                <div className="font-mono text-xs text-muted">No obligation, no jargon</div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          {status === 'sent' ? (
            <div className="grid h-full min-h-[420px] place-items-center rounded-3xl card-border bg-surface p-10 text-center">
              <div>
                <CheckCircle2 className="mx-auto h-14 w-14 text-accent" />
                <h3 className="mt-6 font-display text-2xl font-bold text-ink">Thanks — your message is on its way.</h3>
                <p className="mx-auto mt-3 max-w-sm text-muted">
                  I've got your details and I'll get back to you shortly — usually within a day.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="rounded-3xl card-border bg-surface p-7 sm:p-9">
              {/* honeypot — hidden from humans, catches bots */}
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={form.botcheck}
                onChange={update('botcheck')}
                className="hidden"
                aria-hidden="true"
              />
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field label="Name" value={form.name} onChange={update('name')} required placeholder="Jane Doe" />
                <Field label="Email" type="email" value={form.email} onChange={update('email')} required placeholder="jane@company.com" />
              </div>
              <div className="mt-5">
                <Field label="Company / project" value={form.company} onChange={update('company')} placeholder="What are you building?" />
              </div>
              <div className="mt-5">
                <label className="mb-2 block font-mono text-xs uppercase tracking-wide text-muted">What do you want to automate?</label>
                <textarea
                  rows={5}
                  required
                  value={form.message}
                  onChange={update('message')}
                  placeholder="Tell me about the repetitive tasks eating your time…"
                  className="w-full resize-none rounded-2xl border border-divider bg-background px-4 py-3 text-ink placeholder:text-muted/60 outline-none transition-colors focus:border-primary"
                />
              </div>
              <button
                type="submit"
                disabled={status === 'sending'}
                className="magnetic-btn mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 font-semibold text-white glow-primary disabled:opacity-70"
              >
                {status === 'sending' ? (
                  <>Sending…</>
                ) : (
                  <>Send <Send className="h-4 w-4" /></>
                )}
              </button>
              {status === 'error' ? (
                <p className="mt-4 text-center font-mono text-[11px] text-red-400">
                  Something went wrong. Please email{' '}
                  <a href={GMAIL_COMPOSE} target="_blank" rel="noopener noreferrer" className="underline hover:text-red-300">hello@automateflows.org</a> directly.
                </p>
              ) : (
                <p className="mt-4 text-center font-mono text-[11px] text-muted">
                  Sent straight to my inbox — your details stay between us.
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

function Field({ label, type = 'text', value, onChange, required, placeholder }) {
  return (
    <div>
      <label className="mb-2 block font-mono text-xs uppercase tracking-wide text-muted">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-divider bg-background px-4 py-3 text-ink placeholder:text-muted/60 outline-none transition-colors focus:border-primary"
      />
    </div>
  )
}

/* ---------------------------------- footer --------------------------------- */

function Footer() {
  return (
    <footer className="relative border-t border-divider bg-deep">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">
              Custom AI-powered automation systems for modern businesses. Built to run while you sleep.
            </p>
            <a
              href={GMAIL_COMPOSE}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 flex w-fit items-center gap-2 text-sm font-semibold text-ink transition-colors hover:text-accent"
            >
              <Mail className="h-4 w-4 text-accent" /> {EMAIL}
            </a>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-divider px-3 py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-accent ring-pulse" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              <span className="font-mono text-[11px] text-muted">Systems Operational</span>
            </div>
          </div>

          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-muted">Services</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {['Social Media', 'AI Content', 'Workflows', 'Web Apps'].map((l) => (
                <li key={l}><a href="#services" className="text-muted transition-colors hover:text-ink">{l}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-muted">Explore</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><a href="#process" className="text-muted transition-colors hover:text-ink">Process</a></li>
              <li><a href="#work" className="text-muted transition-colors hover:text-ink">Portfolio</a></li>
              <li><a href="#pricing" className="text-muted transition-colors hover:text-ink">Pricing</a></li>
              <li><a href={GMAIL_COMPOSE} target="_blank" rel="noopener noreferrer" className="text-muted transition-colors hover:text-ink">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-muted">Connect</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><a href="https://www.linkedin.com/in/baser-ibrahim-brussels/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-muted transition-colors hover:text-ink"><Linkedin className="h-4 w-4" /> LinkedIn</a></li>
              <li><a href="https://x.com/Ibrahim60527521" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-muted transition-colors hover:text-ink"><XIcon className="h-4 w-4" /> X / Twitter</a></li>
              <li><a href="https://github.com/cnaysolutions/automateflows" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-muted transition-colors hover:text-ink"><Github className="h-4 w-4" /> GitHub</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-divider pt-8 sm:flex-row">
          <p className="font-mono text-xs text-muted">© 2026 AutomateFlows — Brussels, Belgium</p>
          <div className="flex items-center gap-6 font-mono text-xs">
            <Link to="/privacy" className="text-muted transition-colors hover:text-ink">Privacy</Link>
            <Link to="/terms" className="text-muted transition-colors hover:text-ink">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ----------------------------------- app ----------------------------------- */

export default function App() {
  useEffect(() => {
    const id = setTimeout(() => ScrollTrigger.refresh(), 300)
    return () => clearTimeout(id)
  }, [])

  return (
    <div className="relative">
      <div className="noise-overlay" />
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Features />
        <Services />
        <Process />
        <Portfolio />
        <TechStrip />
        <Pricing />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
