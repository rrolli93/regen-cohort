'use client'

import { useState, useEffect, useRef } from 'react'
import { supabase } from '@/lib/supabase'

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const T = {
  bg: '#0A0A0A',
  card: '#111111',
  text: '#F5F0E8',
  muted: '#8A8580',
  accent: '#C9A96E',
  border: '#2A2520',
  maxW: 900,
  // Gold gradient — dark bronze → pale champagne → bronze (Assembly-style)
  goldGrad: 'linear-gradient(135deg, #A07830 0%, #D4B47A 35%, #F5E4A8 55%, #D4B47A 75%, #A07830 100%)',
} as const

// Gradient gold text style — apply as inline style object
const goldText: React.CSSProperties = {
  background: T.goldGrad,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
}

// ─── CORNER BRACKET DECORATION ───────────────────────────────────────────────
// Art Deco L-bracket + diamond corners — used on bordered boxes (Assembly style)

// Reusable bordered box with corner decorations
function DecoratedBox({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  const corner = (rot: number) => (
    <div style={{
      position: 'absolute',
      width: 28, height: 28,
      transform: `rotate(${rot}deg)`,
      ...(rot === 0   ? { top: -1, left: -1 }   : {}),
      ...(rot === 90  ? { top: -1, right: -1 }   : {}),
      ...(rot === 180 ? { bottom: -1, right: -1 } : {}),
      ...(rot === 270 ? { bottom: -1, left: -1 }  : {}),
    }}>
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <defs>
          <linearGradient id={`cg-${rot}`} x1="0" y1="0" x2="28" y2="28" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#8B6B2E" />
            <stop offset="50%" stopColor="#F3E1A0" />
            <stop offset="100%" stopColor="#8B6B2E" />
          </linearGradient>
        </defs>
        {/* L-shaped bracket lines */}
        <line x1="0" y1="14" x2="0" y2="0" stroke={`url(#cg-${rot})`} strokeWidth="1"/>
        <line x1="0" y1="0" x2="14" y2="0" stroke={`url(#cg-${rot})`} strokeWidth="1"/>
        {/* Diamond at corner tip */}
        <rect x="14" y="1" width="7" height="7" transform="rotate(45 14 5)"
          fill="none" stroke={`url(#cg-${rot})`} strokeWidth="0.8"/>
      </svg>
    </div>
  )
  return (
    <div style={{
      position: 'relative',
      border: '0.5px solid rgba(201,169,110,0.35)',
      ...style,
    }}>
      {corner(0)}
      {corner(90)}
      {corner(180)}
      {corner(270)}
      {children}
    </div>
  )
}

// ─── SCROLL REVEAL HOOK ───────────────────────────────────────────────────────
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    // Only animate if element is not yet in view on load
    const rect = el.getBoundingClientRect()
    const inView = rect.top < window.innerHeight
    if (inView) return // skip animation for above-fold elements
    el.style.opacity = '0'
    el.style.transform = 'translateY(20px)'
    el.style.transition = 'opacity 0.7s ease, transform 0.7s ease'
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1'
          el.style.transform = 'translateY(0)'
          obs.unobserve(el)
        }
      },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

function Reveal({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  const ref = useScrollReveal()
  return <div ref={ref} style={style}>{children}</div>
}

// ─── EYEBROW ─────────────────────────────────────────────────────────────────
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      fontSize: 11,
      letterSpacing: '0.2em',
      color: T.accent,
      textTransform: 'uppercase',
      fontFamily: 'var(--font-inter), sans-serif',
      fontWeight: 400,
      marginBottom: 24,
    }}>
      {children}
    </div>
  )
}

// ─── GOLD RULE — thin 1px × 40px gradient gold line above section headlines ──
function GoldRule() {
  return (
    <div style={{
      width: 40,
      height: 1,
      background: T.goldGrad,
      marginBottom: 20,
    }} />
  )
}

// ─── CTA BUTTON ──────────────────────────────────────────────────────────────
function CTAButton({
  children,
  href,
  onClick,
  type = 'button',
  disabled,
  style,
}: {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  type?: 'button' | 'submit'
  disabled?: boolean
  style?: React.CSSProperties
}) {
  const base: React.CSSProperties = {
    display: 'inline-block',
    border: '1px solid ' + T.accent,
    color: T.accent,
    backgroundColor: 'transparent',
    padding: '14px 32px',
    borderRadius: 0,
    fontSize: 12,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    textDecoration: 'none',
    fontFamily: 'var(--font-inter), sans-serif',
    fontWeight: 400,
    cursor: disabled ? 'wait' : 'pointer',
    transition: 'background-color 0.3s, color 0.3s',
    opacity: disabled ? 0.6 : 1,
    ...style,
  }

  const onEnter = (e: React.MouseEvent<HTMLElement>) => {
    if (!disabled) {
      ;(e.currentTarget as HTMLElement).style.backgroundColor = T.accent
      ;(e.currentTarget as HTMLElement).style.color = '#000'
    }
  }
  const onLeave = (e: React.MouseEvent<HTMLElement>) => {
    ;(e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'
    ;(e.currentTarget as HTMLElement).style.color = T.accent
  }

  if (href) {
    return (
      <a href={href} style={base} onMouseEnter={onEnter} onMouseLeave={onLeave}>
        {children}
      </a>
    )
  }
  return (
    <button type={type} style={base} disabled={disabled} onMouseEnter={onEnter} onMouseLeave={onLeave} onClick={onClick}>
      {children}
    </button>
  )
}

// ─── NAV ─────────────────────────────────────────────────────────────────────
function Nav() {
  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      borderBottom: '1px solid ' + T.border,
      backdropFilter: 'blur(12px)',
      backgroundColor: 'rgba(10,10,10,0.9)',
    }}>
      <div style={{
        maxWidth: T.maxW,
        margin: '0 auto',
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 56,
      }}>
        <span style={{
          fontFamily: 'var(--font-cormorant), serif',
          fontSize: 13,
          letterSpacing: '0.22em',
          fontWeight: 300,
          ...goldText,
        }}>
          REGEN COHORT
        </span>
        <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
          {['Protocol', 'Structure', 'Measure', 'Apply'].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} style={{
              fontSize: 11,
              letterSpacing: '0.15em',
              color: T.muted,
              textDecoration: 'none',
              textTransform: 'uppercase',
              fontFamily: 'var(--font-inter), sans-serif',
              fontWeight: 300,
              transition: 'color 0.2s',
            }}
              onMouseEnter={e => (e.currentTarget.style.color = T.accent)}
              onMouseLeave={e => (e.currentTarget.style.color = T.muted)}
            >
              {item}
            </a>
          ))}
          <CTAButton href="#apply" style={{ padding: '7px 18px', fontSize: 11 }}>
            Apply
          </CTAButton>
        </div>
      </div>
    </nav>
  )
}

// ─── HERO ────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      paddingTop: 56,
      borderBottom: '1px solid ' + T.border,
    }}>
      <div style={{
        maxWidth: T.maxW,
        margin: '0 auto',
        padding: '120px 24px',
        animation: 'heroFadeIn 0.8s ease forwards',
      }}>
        {/* Eyebrow */}
        <div style={{ marginBottom: 48 }}>
          <Eyebrow>Powered by Roumai Medical</Eyebrow>
          <div style={{
            display: 'inline-block',
            border: '1px solid ' + T.border,
            borderLeft: '1px solid ' + T.accent,
            padding: '4px 14px',
            fontSize: 11,
            letterSpacing: '0.2em',
            color: T.muted,
            textTransform: 'uppercase',
            fontFamily: 'var(--font-inter), sans-serif',
            fontWeight: 300,
          }}>
            Cohort 01 — 2026 — 8 Participants
          </div>
        </div>

        {/* Headline */}
        <h1 style={{
          fontFamily: 'var(--font-cormorant), serif',
          fontSize: 'clamp(52px, 8vw, 96px)',
          fontWeight: 300,
          lineHeight: 1.0,
          color: T.text,
          marginBottom: 40,
          maxWidth: 820,
        }}>
          <span style={{ color: '#F5F0E8' }}>Regenerative protocols.</span><br />
          <span style={goldText}>Longitudinal data.</span><br />
          <span style={{ color: '#F5F0E8' }}>Private cohort.</span>
        </h1>

        <p style={{
          fontSize: 16,
          color: T.muted,
          maxWidth: 520,
          marginBottom: 52,
          lineHeight: 1.8,
          fontWeight: 300,
        }}>
          An 8-person private longevity program combining MSC-derived lysate infusions with
          systematic biomarker tracking over 6 months. Standardized. Data-first. By application only.
        </p>

        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <CTAButton href="#apply">Apply to Cohort 01</CTAButton>
          <CTAButton href="#protocol" style={{ borderColor: T.border, color: T.muted }}>
            Learn the Protocol
          </CTAButton>
        </div>

        {/* Stats bar */}
        <div style={{ marginTop: 100, borderTop: '1px solid ' + T.border, paddingTop: 60 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0 }}>
            {[
              { num: '8–16', label: 'Participants' },
              { num: '6', label: 'Month program' },
              { num: '30+', label: 'Biomarkers tracked' },
              { num: '2–3', label: 'Clinic visits' },
            ].map((s, i, arr) => (
              <div key={s.label} style={{
                paddingRight: 40,
                paddingLeft: i === 0 ? 0 : 40,
                borderRight: i < arr.length - 1 ? '1px solid ' + T.border : 'none',
              }}>
                <div style={{
                  width: 32,
                  height: 1,
                  backgroundColor: T.accent,
                  marginBottom: 16,
                }} />
                <div style={{
                  fontFamily: 'var(--font-cormorant), serif',
                  fontSize: 48,
                  fontWeight: 300,
                  color: T.text,
                  lineHeight: 1.0,
                }}>
                  {s.num}
                </div>
                <div style={{
                  fontSize: 11,
                  color: T.muted,
                  letterSpacing: '0.15em',
                  marginTop: 10,
                  textTransform: 'uppercase',
                  fontFamily: 'var(--font-inter), sans-serif',
                  fontWeight: 400,
                }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── SCROLLING MARQUEE ───────────────────────────────────────────────────────
function Marquee() {
  const items = ['REGEN COHORT', '◆', 'COHORT 01', '◆', 'SHENZHEN 2026', '◆', 'BY APPLICATION ONLY', '◆', 'MSC LYSATE', '◆', 'LONGITUDINAL DATA', '◆']
  // Double the content so the loop is seamless
  return (
    <div style={{
      borderTop: '0.5px solid ' + T.border,
      borderBottom: '0.5px solid ' + T.border,
      overflow: 'hidden',
      padding: '13px 0',
      backgroundColor: T.bg,
    }}>
      <div style={{
        display: 'flex',
        width: 'max-content',
        animation: 'marqueeScroll 28s linear infinite',
      }}>
        {[0, 1].map(i => (
          <div key={i} style={{
            display: 'flex',
            alignItems: 'center',
            gap: 32,
            paddingRight: 32,
            whiteSpace: 'nowrap',
          }}>
            {items.map((item, idx) => (
              <span key={idx} style={{
                fontFamily: 'var(--font-inter), sans-serif',
                fontSize: 10,
                fontWeight: 400,
                letterSpacing: '0.22em',
                color: item === '◆' ? T.accent : T.muted,
                textTransform: 'uppercase',
                opacity: item === '◆' ? 0.7 : 0.45,
              }}>
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── PLAY BUTTON ─────────────────────────────────────────────────────────────
function PlayButton() {
  const [hovered, setHovered] = useState(false)
  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 20,
      background: 'rgba(10,10,10,0.45)',
      pointerEvents: 'none',
    }}>
      {/* Circle play button */}
      <div
        style={{
          width: 80,
          height: 80,
          border: `1px solid ${hovered ? T.accent : 'rgba(201,169,110,0.5)'}`,
          borderRadius: '50%',
          backgroundColor: hovered ? 'rgba(201,169,110,0.12)' : 'rgba(10,10,10,0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'border-color 0.3s, background-color 0.3s',
          pointerEvents: 'auto',
          cursor: 'pointer',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Triangle */}
        <div style={{
          width: 0,
          height: 0,
          borderTop: '12px solid transparent',
          borderBottom: '12px solid transparent',
          borderLeft: `20px solid ${T.accent}`,
          marginLeft: 5,
        }} />
      </div>
      {/* Label */}
      <span style={{
        fontFamily: 'var(--font-inter), sans-serif',
        fontSize: 11,
        fontWeight: 400,
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        color: hovered ? T.accent : T.muted,
        transition: 'color 0.3s',
      }}>
        Play Teaser — 1:05
      </span>
    </div>
  )
}

// ─── TEASER VIDEO ────────────────────────────────────────────────────────────
function TeaserSection() {
  const [playing, setPlaying] = useState(false)
  const [paused, setPaused] = useState(false)
  const [hovering, setHovering] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const handlePlay = () => {
    setPlaying(true)
    setPaused(false)
    if (videoRef.current) {
      videoRef.current.play()
    }
  }

  const handleTogglePause = () => {
    if (!videoRef.current) return
    if (paused) {
      videoRef.current.play()
      setPaused(false)
    } else {
      videoRef.current.pause()
      setPaused(true)
    }
  }

  const handleEnded = () => {
    setPlaying(false)
    setPaused(false)
    if (videoRef.current) {
      videoRef.current.currentTime = 0
      videoRef.current.load()
    }
  }

  return (
    <section style={{ borderBottom: '1px solid ' + T.border, padding: '0' }}>
      <div
        onClick={!playing ? handlePlay : handleTogglePause}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '16 / 9',
          backgroundColor: T.bg,
          cursor: 'pointer',
          overflow: 'hidden',
        }}
      >
        {/* Video element */}
        <video
          ref={videoRef}
          src="https://github.com/rrolli93/regen-cohort/releases/download/teaser-v4/regen-cohort-teaser-v4.mp4"
          poster="/teaser-poster.jpg"
          muted={false}
          playsInline
          onEnded={handleEnded}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />

        {/* Pre-play overlay */}
        {!playing && (
          <PlayButton />
        )}

        {/* Pause indicator — shown on hover while playing and not paused */}
        {playing && !paused && hovering && (
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(10,10,10,0.35)',
            transition: 'opacity 0.2s',
          }}>
            <div style={{
              display: 'flex',
              gap: 6,
              alignItems: 'center',
            }}>
              <div style={{ width: 4, height: 28, background: T.accent, borderRadius: 2 }} />
              <div style={{ width: 4, height: 28, background: T.accent, borderRadius: 2 }} />
            </div>
          </div>
        )}

        {/* Resume indicator — shown on hover while paused */}
        {playing && paused && (
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(10,10,10,0.55)',
          }}>
            {/* Play triangle */}
            <div style={{
              width: 0,
              height: 0,
              borderStyle: 'solid',
              borderWidth: '18px 0 18px 32px',
              borderColor: `transparent transparent transparent ${T.accent}`,
              marginBottom: 16,
            }} />
            <span style={{
              fontFamily: 'var(--font-inter), sans-serif',
              fontSize: 11,
              fontWeight: 400,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: T.muted,
            }}>Click to resume</span>
          </div>
        )}

        {/* Gold border frame */}
        <div style={{
          position: 'absolute',
          inset: 0,
          border: '1px solid ' + T.border,
          pointerEvents: 'none',
        }} />
      </div>
    </section>
  )
}

// ─── PROTOCOL ────────────────────────────────────────────────────────────────
function Protocol() {
  const cards = [
    {
      num: '01',
      title: 'MSC Lysate Infusions',
      desc: 'Standardized mesenchymal stem cell-derived lysate administered in structured cycles. Sourced from licensed Roumai Medical batches with full traceability documentation.',
      tags: ['Swiss-coordinated', 'Batch-controlled', 'IV administration'],
    },
    {
      num: '02',
      title: 'Structured Visit Protocol',
      desc: 'International participants attend 2–3 concentrated clinic visits in Shenzhen across 6 months. Each visit delivers burst lysate dosing under physician supervision, with remote biomarker tracking between visits.',
      tags: ['2–3 clinic visits', 'Physician-supervised', 'Remote follow-up'],
    },
    {
      num: '03',
      title: 'Longitudinal Biomarker Stack',
      desc: 'Comprehensive blood panel, epigenetic age scoring, body composition, and continuous passive capture (HRV, sleep) across all program phases.',
      tags: ['DunedinPACE', 'GrimAge', 'Wearable integration'],
    },
  ]

  return (
    <section id="protocol" style={{ borderBottom: '1px solid ' + T.border, padding: '160px 0' }}>
      <div style={{ maxWidth: T.maxW, margin: '0 auto', padding: '0 24px' }}>
        <Reveal style={{ marginBottom: 72 }}>
          <Eyebrow>The Protocol</Eyebrow>
          <GoldRule />
          <h2 style={{
            fontFamily: 'var(--font-cormorant), serif',
            fontSize: 'clamp(36px, 5vw, 56px)',
            fontWeight: 300,
            lineHeight: 1.0,
            color: T.text,
          }}>
            Three pillars.<br />One integrated program.
          </h2>
        </Reveal>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 1,
          backgroundColor: T.border,
        }}>
          {cards.map(card => (
            <CardProtocol key={card.num} card={card} />
          ))}
        </div>
      </div>
    </section>
  )
}

function CardProtocol({ card }: { card: { num: string; title: string; desc: string; tags: string[] } }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      style={{
        backgroundColor: hovered ? '#161616' : T.card,
        padding: '48px 36px',
        transition: 'background-color 0.3s',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'default',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Gold line top */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1,
        backgroundColor: T.accent,
        opacity: hovered ? 1 : 0.3,
        transition: 'opacity 0.3s',
      }} />
      {/* Ghost number */}
      <div style={{
        position: 'absolute', top: 10, right: 16,
        fontFamily: 'var(--font-cormorant), serif',
        fontSize: 120,
        fontWeight: 300,
        lineHeight: 1,
        color: T.text,
        opacity: 0.04,
        pointerEvents: 'none',
        userSelect: 'none',
      }}>
        {card.num}
      </div>

      <div style={{ fontSize: 11, color: T.accent, letterSpacing: '0.2em', marginBottom: 24, fontFamily: 'var(--font-inter)', fontWeight: 400 }}>
        {card.num}
      </div>
      <h3 style={{
        fontFamily: 'var(--font-cormorant), serif',
        fontSize: 24,
        fontWeight: 300,
        lineHeight: 1.0,
        color: T.text,
        marginBottom: 20,
      }}>
        {card.title}
      </h3>
      <p style={{ fontSize: 14, color: T.muted, lineHeight: 1.8, marginBottom: 32, fontWeight: 300 }}>
        {card.desc}
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {card.tags.map(t => (
          <span key={t} style={{
            fontSize: 10,
            letterSpacing: '0.12em',
            color: T.muted,
            border: '1px solid ' + T.border,
            padding: '3px 10px',
            textTransform: 'uppercase',
            fontFamily: 'var(--font-inter)',
            fontWeight: 400,
          }}>{t}</span>
        ))}
      </div>
    </div>
  )
}

// ─── STRUCTURE ───────────────────────────────────────────────────────────────
function Structure() {
  const phases = [
    { label: 'Week 0', title: 'Intake & Screening', desc: 'Application review, medical history, eligibility confirmation.' },
    { label: 'Week 1', title: 'Baseline Assessment', desc: 'Full biomarker panel, epigenetic clock, wearable setup.' },
    { label: 'Week 3', title: 'MSC IV Anchor — Shenzhen', desc: 'MSC IV anchor at Roumai clinic, Shenzhen. Days 4–6: concentrated lysate dosing under physician supervision.' },
    { label: 'Month 3', title: 'Mid-Program Return Visit (Option A)', desc: 'Return visit — mid-program bloods, epigenetic retest, lysate booster doses.' },
    { label: 'Week 24', title: 'Final Assessment', desc: 'Return visit — full biomarker panel, epigenetic re-scoring, final lysate doses, exit consultation.' },
    { label: 'Within 4 weeks', title: 'Individual Report', desc: 'Individual before/after report delivered within 4 weeks of final visit.' },
  ]

  const callouts = [
    { title: 'Standardized Data', desc: 'Unified collection protocol across all 8 participants enables true cross-participant analysis.' },
    { title: 'Passive Capture', desc: 'Companion app integrates wearable data — sleep staging, HRV, recovery scores — automatically.' },
    { title: 'Protocol Companion', desc: 'Personalized digital companion tracks adherence, surfaces alerts, and delivers weekly snapshots.' },
  ]

  return (
    <section id="structure" style={{ borderBottom: '1px solid ' + T.border, padding: '160px 0' }}>
      <div style={{ maxWidth: T.maxW, margin: '0 auto', padding: '0 24px' }}>
        <Reveal style={{ marginBottom: 80 }}>
          <Eyebrow>Cohort Structure</Eyebrow>
          <GoldRule />
          <h2 style={{
            fontFamily: 'var(--font-cormorant), serif',
            fontSize: 'clamp(36px, 5vw, 56px)',
            fontWeight: 300,
            lineHeight: 1.0,
            color: T.text,
          }}>
            Six months.<br />Standardized at every step.
          </h2>
        </Reveal>

        {/* Timeline */}
        <Reveal style={{ position: 'relative', marginBottom: 80 }}>
          <div style={{
            position: 'absolute', left: 0, top: 16, bottom: 16, width: 1,
            backgroundColor: T.border,
          }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {phases.map((phase, i) => {
              const isGold = i === 0 || i === 2 || i === phases.length - 1
              return (
                <div key={i} style={{ display: 'flex', gap: 40, padding: '20px 0', paddingLeft: 28, position: 'relative' }}>
                  <div style={{
                    position: 'absolute',
                    left: -4,
                    top: 24,
                    width: 8,
                    height: 8,
                    backgroundColor: isGold ? T.accent : T.border,
                    border: '1px solid ' + (isGold ? T.accent : T.border),
                  }} />
                  <div style={{ width: 110, flexShrink: 0 }}>
                    <span style={{ fontSize: 11, color: T.accent, letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: 'var(--font-inter)', fontWeight: 400 }}>
                      {phase.label}
                    </span>
                  </div>
                  <div>
                    <div style={{
                      fontFamily: 'var(--font-cormorant), serif',
                      fontSize: 18,
                      fontWeight: 300,
                      lineHeight: 1.0,
                      color: i === 2 ? T.accent : T.text,
                      marginBottom: 6,
                    }}>
                      {phase.title}
                    </div>
                    <div style={{ fontSize: 14, color: T.muted, lineHeight: 1.8, fontWeight: 300 }}>
                      {phase.desc}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </Reveal>

        {/* Callouts */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 1, backgroundColor: T.border }}>
          {callouts.map((c, idx) => (
            <CalloutCard key={c.title} c={c} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  )
}

function CalloutCard({ c, idx }: { c: { title: string; desc: string }; idx: number }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      style={{
        backgroundColor: T.card,
        padding: '36px 28px',
        transition: 'background-color 0.3s',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1,
        backgroundColor: T.accent,
        opacity: hovered ? 1 : 0.25,
        transition: 'opacity 0.3s',
      }} />
      <div style={{
        fontSize: 11,
        color: T.accent,
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        fontFamily: 'var(--font-inter)',
        fontWeight: 400,
        marginBottom: 16,
      }}>
        0{idx + 1}
      </div>
      <div style={{
        fontFamily: 'var(--font-cormorant), serif',
        fontSize: 20,
        fontWeight: 300,
        lineHeight: 1.0,
        color: T.text,
        marginBottom: 14,
      }}>
        {c.title}
      </div>
      <div style={{ fontSize: 14, color: T.muted, lineHeight: 1.8, fontWeight: 300 }}>{c.desc}</div>
    </div>
  )
}

// ─── MEASURE ─────────────────────────────────────────────────────────────────
function Measure() {
  const categories = [
    { cat: 'Epigenetic Age', items: ['DunedinPACE', 'GrimAge v2'] },
    { cat: 'Inflammatory Panel', items: ['hs-CRP', 'IL-6', 'TNF-α', 'GDF-15'] },
    { cat: 'Metabolic Markers', items: ['Fasting insulin', 'HbA1c', 'Lipid panel', 'ApoB', 'HOMA-IR'] },
    { cat: 'Hormonal Status', items: ['Total/Free testosterone', 'IGF-1', 'DHEA-S', 'Cortisol AM', 'TSH'] },
    { cat: 'Sleep & HRV', items: ['Sleep staging', 'Resting HRV', 'Recovery score', 'Readiness index'] },
    { cat: 'Subjective Wellbeing', items: ['Energy (VAS)', 'Cognitive clarity', 'Physical performance', 'Mood composite'] },
    { cat: 'Face Imaging', items: ['Standardized photography', 'Skin analysis', 'Chronological vs perceived age'] },
  ]

  return (
    <section id="measure" style={{ borderBottom: '1px solid ' + T.border, padding: '160px 0' }}>
      <div style={{ maxWidth: T.maxW, margin: '0 auto', padding: '0 24px' }}>
        <Reveal style={{ marginBottom: 72 }}>
          <Eyebrow>What We Measure</Eyebrow>
          <GoldRule />
          <h2 style={{
            fontFamily: 'var(--font-cormorant), serif',
            fontSize: 'clamp(36px, 5vw, 56px)',
            fontWeight: 300,
            lineHeight: 1.0,
            color: T.text,
          }}>
            Comprehensive.<br />Not curated for comfort.
          </h2>
        </Reveal>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: 0,
          marginBottom: 80,
          border: '1px solid ' + T.border,
        }}>
          {categories.map(cat => (
            <CatCard key={cat.cat} cat={cat} />
          ))}
        </div>

        {/* Pull quote */}
        <Reveal>
          <div style={{
            borderLeft: '1px solid ' + T.accent,
            paddingLeft: 40,
            maxWidth: 560,
          }}>
            <p style={{
              fontFamily: 'var(--font-cormorant), serif',
              fontSize: 'clamp(32px, 4.5vw, 48px)',
              fontWeight: 300,
              lineHeight: 1.0,
              fontStyle: 'italic',
              color: T.text,
              marginBottom: 20,
            }}>
              &ldquo;Our edge is the data.&rdquo;
            </p>
            <p style={{ fontSize: 11, color: T.muted, letterSpacing: '0.2em', textTransform: 'uppercase', fontFamily: 'var(--font-inter)', fontWeight: 400 }}>
              REGEN COHORT 01 — Program Principle
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function CatCard({ cat }: { cat: { cat: string; items: string[] } }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      style={{
        backgroundColor: hovered ? T.card : T.bg,
        padding: '28px 24px',
        transition: 'background-color 0.3s',
        borderRight: '1px solid ' + T.border,
        borderBottom: '1px solid ' + T.border,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{
        fontSize: 11,
        letterSpacing: '0.15em',
        color: T.accent,
        textTransform: 'uppercase',
        marginBottom: 18,
        fontFamily: 'var(--font-inter)',
        fontWeight: 400,
      }}>
        {cat.cat}
      </div>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {cat.items.map(item => (
          <li key={item} style={{
            fontSize: 13,
            color: T.muted,
            padding: '5px 0',
            borderBottom: '1px solid ' + T.border,
            display: 'flex',
            gap: 10,
            alignItems: 'center',
            fontWeight: 300,
          }}>
            <span style={{ color: T.border, fontSize: 10 }}>—</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

// ─── PULL QUOTE SECTION ───────────────────────────────────────────────────────
function PullQuote() {
  return (
    <section style={{ borderBottom: '1px solid ' + T.border, padding: '120px 0', backgroundColor: T.bg }}>
      <div style={{ maxWidth: T.maxW, margin: '0 auto', padding: '0 24px' }}>
        <Reveal>
          <DecoratedBox style={{ padding: '64px 72px', textAlign: 'center' }}>
            {/* Diamond separator top */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 48 }}>
              <div style={{ height: '0.5px', width: 60, background: T.goldGrad }} />
              <span style={{ fontSize: 10, ...goldText }}>◆</span>
              <div style={{ height: '0.5px', width: 60, background: T.goldGrad }} />
            </div>

            <p style={{
              fontFamily: 'var(--font-cormorant), serif',
              fontSize: 'clamp(28px, 3.5vw, 44px)',
              fontWeight: 300,
              lineHeight: 1.3,
              fontStyle: 'italic',
              color: T.text,
              maxWidth: 640,
              margin: '0 auto 32px',
            }}>
              &ldquo;You are not a patient.
              You are a data point in the most important longevity dataset being built.&rdquo;
            </p>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 0 }}>
              <div style={{ height: '0.5px', width: 40, background: T.goldGrad }} />
              <span style={{
                fontFamily: 'var(--font-inter), sans-serif',
                fontSize: 10,
                fontWeight: 400,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: T.muted,
              }}>
                REGEN COHORT 01 — Program Principle
              </span>
              <div style={{ height: '0.5px', width: 40, background: T.goldGrad }} />
            </div>
          </DecoratedBox>
        </Reveal>
      </div>
    </section>
  )
}

// ─── SUPPLY CHAIN ────────────────────────────────────────────────────────────
function SupplyChain() {
  return (
    <section style={{ borderBottom: '1px solid ' + T.border, padding: '160px 0', backgroundColor: T.card }}>
      <div style={{ maxWidth: T.maxW, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
          <Reveal>
            <Eyebrow>Supply Chain</Eyebrow>
            <GoldRule />
            <h2 style={{
              fontFamily: 'var(--font-cormorant), serif',
              fontSize: 'clamp(32px, 4vw, 48px)',
              fontWeight: 300,
              lineHeight: 1.0,
              color: T.text,
              marginBottom: 32,
            }}>
              Licensed source.<br />Traceable batches.
            </h2>
            <p style={{ fontSize: 14, color: T.muted, lineHeight: 1.8, marginBottom: 20, fontWeight: 300 }}>
              Roumai Medical supplies standardized mesenchymal stem cell-derived lysate from
              licensed manufacturing operations. Each batch undergoes quality control documentation
              before Swiss-coordinated distribution.
            </p>
            <p style={{ fontSize: 14, color: T.muted, lineHeight: 1.8, fontWeight: 300 }}>
              Batch traceability, documentation, and supply continuity are core to the program&apos;s
              integrity. We do not source from unverified providers.
            </p>
          </Reveal>
          <Reveal>
            <DecoratedBox style={{
              padding: '52px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 18,
            }}>
              <img
                src="/roumai-logo.png"
                alt="Roumai Medical"
                style={{ display: 'block', width: 200, height: 'auto', opacity: 0.9 }}
              />
              <div style={{
                fontFamily: 'var(--font-cormorant), serif',
                fontSize: 14,
                fontWeight: 300,
                color: T.muted,
                letterSpacing: '0.12em',
              }}>
                ROUMAI Medical
              </div>
              <div style={{
                fontSize: 11,
                letterSpacing: '0.15em',
                color: T.muted,
                textTransform: 'uppercase',
                fontFamily: 'var(--font-inter)',
                fontWeight: 400,
              }}>
                Licensed MSC Lysate Supplier
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', marginTop: 4 }}>
                {['Swiss-coordinated', 'Batch-controlled', 'Licensed operations'].map(t => (
                  <span key={t} style={{
                    fontSize: 10,
                    letterSpacing: '0.1em',
                    color: T.muted,
                    border: '1px solid ' + T.border,
                    padding: '2px 10px',
                    textTransform: 'uppercase',
                    fontFamily: 'var(--font-inter)',
                    fontWeight: 400,
                  }}>
                    {t}
                  </span>
                ))}
              </div>
            </DecoratedBox>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

// ─── WHO FOR ─────────────────────────────────────────────────────────────────
function WhoFor() {
  const profiles = [
    'Quantified-self practitioners with existing biomarker baselines',
    'Longevity-focused individuals who have explored IV therapy protocols',
    'Willing to travel internationally for treatment (Cohort 01 in Shenzhen, China)',
    'Biohackers interested in systematic, data-tracked regenerative protocols',
    'Those willing to commit to all 3 treatment cycles and follow-up assessments',
    'Individuals aged 30–60 with no active autoimmune conditions',
  ]

  const locations = [
    { city: 'Shenzhen', note: 'Cohort 01 — Primary site' },
    { city: 'Morocco', note: 'Cohort 02' },
    { city: 'Mexico', note: 'Cohort 03' },
    { city: 'Chile', note: 'Cohort 04' },
    { city: 'Switzerland', note: 'Cohort 05' },
  ]

  return (
    <section style={{ borderBottom: '1px solid ' + T.border, padding: '160px 0' }}>
      <div style={{ maxWidth: T.maxW, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80 }}>
          <Reveal>
            <Eyebrow>Who This Is For</Eyebrow>
            <GoldRule />
            <h2 style={{
              fontFamily: 'var(--font-cormorant), serif',
              fontSize: 'clamp(32px, 4vw, 48px)',
              fontWeight: 300,
              lineHeight: 1.0,
              color: T.text,
              marginBottom: 40,
            }}>
              Qualifying profile.
            </h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {profiles.map((p, i) => (
                <li key={i} style={{
                  display: 'flex',
                  gap: 16,
                  padding: '16px 0',
                  borderBottom: '1px solid ' + T.border,
                  fontSize: 14,
                  color: T.muted,
                  lineHeight: 1.8,
                  fontWeight: 300,
                }}>
                  <span style={{ color: T.accent, fontSize: 10, paddingTop: 5, flexShrink: 0 }}>—</span>
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal>
            <Eyebrow>Treatment Locations</Eyebrow>
            <GoldRule />
            <h2 style={{
              fontFamily: 'var(--font-cormorant), serif',
              fontSize: 'clamp(32px, 4vw, 48px)',
              fontWeight: 300,
              lineHeight: 1.0,
              color: T.text,
              marginBottom: 40,
            }}>
              Where it happens.
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 1, backgroundColor: T.border }}>
              {locations.map(loc => (
                <LocationRow key={loc.city} loc={loc} />
              ))}
            </div>
            <div style={{
              marginTop: 1,
              padding: '20px 24px',
              border: '1px solid ' + T.border,
              borderLeft: '1px solid ' + T.accent,
            }}>
              <div style={{ fontSize: 13, color: T.muted, lineHeight: 1.8, fontWeight: 300 }}>
                Cohort 01 takes place at Roumai Medical&apos;s partner clinic in Shenzhen, where GMP manufacturing and clinical infrastructure are co-located. Subsequent cohorts expand across the global treatment roadmap above.
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function LocationRow({ loc }: { loc: { city: string; note: string } }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 24px',
        backgroundColor: hovered ? '#161616' : T.card,
        transition: 'background-color 0.3s',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div>
        <div style={{
          fontFamily: 'var(--font-cormorant), serif',
          fontSize: 20,
          fontWeight: 300,
          lineHeight: 1.0,
          color: T.text,
        }}>
          {loc.city}
        </div>
        <div style={{ fontSize: 11, color: T.muted, marginTop: 4, letterSpacing: '0.08em' }}>{loc.note}</div>
      </div>
      <div style={{ width: 6, height: 6, backgroundColor: T.accent }} />
    </div>
  )
}

// ─── APPLY ───────────────────────────────────────────────────────────────────
function Apply() {
  const [form, setForm] = useState({ name: '', email: '', country: '', why_join: '', prior_stem_cell: '' })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const inputStyle: React.CSSProperties = {
    width: '100%',
    backgroundColor: T.card,
    border: '0.5px solid ' + T.border,
    color: T.text,
    padding: '14px 16px',
    borderRadius: 0,
    fontSize: 14,
    outline: 'none',
    boxSizing: 'border-box',
    fontFamily: 'var(--font-inter), sans-serif',
    fontWeight: 300,
    transition: 'border-color 0.2s',
  }

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: 11,
    letterSpacing: '0.2em',
    color: T.muted,
    textTransform: 'uppercase',
    fontFamily: 'var(--font-inter)',
    fontWeight: 400,
    marginBottom: 8,
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.prior_stem_cell) { setErrorMsg('Please answer the stem cell question.'); return }
    setStatus('submitting')
    setErrorMsg('')
    const { error } = await supabase.from('waitlist').insert({
      name: form.name,
      email: form.email,
      country: form.country,
      why_join: form.why_join,
      prior_stem_cell: form.prior_stem_cell === 'yes',
    })
    if (error) {
      if (error.code === '23505') {
        setErrorMsg('This email is already registered.')
      } else {
        setErrorMsg('Submission failed. Please try again.')
      }
      setStatus('error')
    } else {
      setStatus('success')
    }
  }

  const whatHappensNext = [
    'We review your application within 72 hours',
    'Shortlisted candidates receive a private briefing call',
    'Final selection confirmed — program details shared',
  ]

  return (
    <section id="apply" style={{ borderBottom: '1px solid ' + T.border, padding: '160px 0' }}>
      <div style={{ maxWidth: T.maxW, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 80, alignItems: 'start' }}>
          <Reveal>
            <Eyebrow>Application</Eyebrow>
            <GoldRule />
            <h2 style={{
              fontFamily: 'var(--font-cormorant), serif',
              fontSize: 'clamp(36px, 5vw, 56px)',
              fontWeight: 300,
              lineHeight: 1.0,
              color: T.text,
              marginBottom: 28,
            }}>
              Apply to<br />Cohort 01.
            </h2>
            <p style={{ fontSize: 14, color: T.muted, lineHeight: 1.8, marginBottom: 36, fontWeight: 300 }}>
              We review every application individually. Cohort 01 is limited to 8 participants.
              Acceptance is based on profile fit, readiness, and commitment to full program participation.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 36 }}>
              {['8 total spots', 'Rolling review', 'Response within 72h', 'No cost to apply'].map(item => (
                <div key={item} style={{
                  display: 'flex',
                  gap: 14,
                  alignItems: 'center',
                  fontSize: 13,
                  color: T.muted,
                  fontWeight: 300,
                }}>
                  <span style={{ color: T.accent, fontSize: 10 }}>—</span>
                  {item}
                </div>
              ))}
            </div>

            <div style={{
              padding: '20px 24px',
              border: '0.5px solid ' + T.border,
              borderLeft: '1px solid ' + T.accent,
              marginBottom: 44,
            }}>
              <p style={{ fontSize: 13, color: T.muted, lineHeight: 1.8, margin: 0, fontWeight: 300 }}>
                Program investment is disclosed during the private briefing call. Please apply only if you are comfortable with premium longevity programs in the $80,000–95,000 range.
              </p>
            </div>

            <div style={{ fontSize: 11, letterSpacing: '0.2em', color: T.muted, textTransform: 'uppercase', fontFamily: 'var(--font-inter)', marginBottom: 20 }}>
              What happens next
            </div>
            {whatHappensNext.map((step, i) => (
              <div key={i} style={{
                display: 'flex',
                gap: 18,
                padding: '14px 0',
                borderBottom: i < whatHappensNext.length - 1 ? '1px solid ' + T.border : 'none',
                alignItems: 'flex-start',
              }}>
                <span style={{
                  fontFamily: 'var(--font-cormorant), serif',
                  fontSize: 14,
                  fontWeight: 300,
                  color: T.accent,
                  flexShrink: 0,
                  minWidth: 16,
                }}>
                  {i + 1}
                </span>
                <span style={{ fontSize: 13, color: T.muted, lineHeight: 1.8, fontWeight: 300 }}>{step}</span>
              </div>
            ))}
          </Reveal>

          <Reveal>
            {status === 'success' ? (
              <DecoratedBox style={{ padding: '52px 40px', textAlign: 'center' }}>
                <div style={{
                  fontFamily: 'var(--font-cormorant), serif',
                  fontSize: 32,
                  fontWeight: 300,
                  marginBottom: 20,
                  ...goldText,
                }}>
                  Application received.
                </div>
                <p style={{ fontSize: 14, color: T.muted, lineHeight: 1.8, fontWeight: 300 }}>
                  We will review your submission and respond within 72 hours.
                  Check your email for confirmation.
                </p>
              </DecoratedBox>
            ) : (
              <DecoratedBox style={{ padding: '40px 40px 48px' }}>
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <div>
                  <label style={labelStyle}>Full Name</label>
                  <input
                    style={inputStyle} type="text" required
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    onFocus={e => (e.target.style.borderColor = T.accent)}
                    onBlur={e => (e.target.style.borderColor = T.border)}
                  />
                </div>

                <div>
                  <label style={labelStyle}>Email</label>
                  <input
                    style={inputStyle} type="email" required
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    onFocus={e => (e.target.style.borderColor = T.accent)}
                    onBlur={e => (e.target.style.borderColor = T.border)}
                  />
                </div>

                <div>
                  <label style={labelStyle}>Country of Residence</label>
                  <input
                    style={inputStyle} type="text" required
                    value={form.country}
                    onChange={e => setForm(f => ({ ...f, country: e.target.value }))}
                    onFocus={e => (e.target.style.borderColor = T.accent)}
                    onBlur={e => (e.target.style.borderColor = T.border)}
                  />
                </div>

                <div>
                  <label style={labelStyle}>Why do you want to join Cohort 01?</label>
                  <textarea
                    style={{ ...inputStyle, minHeight: 100, resize: 'vertical', paddingTop: 14 }}
                    required
                    value={form.why_join}
                    onChange={e => setForm(f => ({ ...f, why_join: e.target.value }))}
                    onFocus={e => (e.target.style.borderColor = T.accent)}
                    onBlur={e => (e.target.style.borderColor = T.border)}
                  />
                </div>

                <div>
                  <label style={labelStyle}>Have you done stem cell therapy before?</label>
                  <div style={{ display: 'flex', gap: 1, backgroundColor: T.border }}>
                    {['yes', 'no'].map(val => (
                      <label key={val} style={{
                        flex: 1,
                        border: 'none',
                        padding: '14px 16px',
                        cursor: 'pointer',
                        textAlign: 'center',
                        fontSize: 12,
                        letterSpacing: '0.1em',
                        color: form.prior_stem_cell === val ? T.accent : T.muted,
                        textTransform: 'uppercase',
                        backgroundColor: form.prior_stem_cell === val ? T.card : T.card,
                        outline: form.prior_stem_cell === val ? '1px solid ' + T.accent : 'none',
                        transition: 'all 0.2s',
                        fontFamily: 'var(--font-inter)',
                        fontWeight: 400,
                      }}>
                        <input
                          type="radio" name="prior_stem_cell" value={val}
                          style={{ display: 'none' }}
                          onChange={() => setForm(f => ({ ...f, prior_stem_cell: val }))}
                        />
                        {val === 'yes' ? 'Yes' : 'No'}
                      </label>
                    ))}
                  </div>
                </div>

                {errorMsg && (
                  <div style={{
                    fontSize: 13,
                    color: '#c9736e',
                    padding: '12px 16px',
                    border: '0.5px solid #c9736e',
                  }}>
                    {errorMsg}
                  </div>
                )}

                <CTAButton type="submit" disabled={status === 'submitting'} style={{ width: '100%', textAlign: 'center' }}>
                  {status === 'submitting' ? 'Submitting...' : 'Submit Application'}
                </CTAButton>
              </form>
              </DecoratedBox>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  )
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ padding: '80px 0 48px', backgroundColor: T.card }}>
      <div style={{ maxWidth: T.maxW, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, marginBottom: 60 }}>
          <div>
            <div style={{
              fontFamily: 'var(--font-cormorant), serif',
              fontSize: 16,
              fontWeight: 300,
              color: T.text,
              marginBottom: 16,
              letterSpacing: '0.18em',
            }}>
              REGEN COHORT
            </div>
            <p style={{ fontSize: 13, color: T.muted, lineHeight: 1.8, maxWidth: 340, fontWeight: 300 }}>
              A private longevity program. Not a medical service. Not a clinical trial.
              Participants engage voluntarily and are encouraged to consult qualified medical professionals.
            </p>
          </div>
          <div>
            <div style={{
              fontSize: 11,
              letterSpacing: '0.2em',
              color: T.muted,
              textTransform: 'uppercase',
              fontFamily: 'var(--font-inter)',
              fontWeight: 400,
              marginBottom: 16,
            }}>
              Contact
            </div>
            <span style={{ fontSize: 13, color: T.muted, fontWeight: 300 }}>Contact details coming soon.</span>
          </div>
        </div>

        <div style={{ borderTop: '1px solid ' + T.border, paddingTop: 28 }}>
          <p style={{ fontSize: 12, color: T.muted, lineHeight: 1.8, marginBottom: 20, maxWidth: 760, fontWeight: 300 }}>
            <span style={{ color: T.text }}>Disclaimer:</span> REGEN COHORT is a private longevity program, not a licensed medical service or clinical trial. No therapeutic claims are made. Participants should consult qualified healthcare professionals before enrolling. Information on this page is for educational purposes only.
          </p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
            <span style={{ fontSize: 12, color: T.muted, fontWeight: 300 }}>© 2026 REGEN COHORT. All rights reserved.</span>
            <span style={{ fontSize: 12, color: T.muted, fontWeight: 300 }}>Powered by Roumai Medical</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <TeaserSection />
        <Protocol />
        <Structure />
        <Measure />
        <PullQuote />
        <SupplyChain />
        <WhoFor />
        <Apply />
      </main>
      <Footer />
    </>
  )
}
