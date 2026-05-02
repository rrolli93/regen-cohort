'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

// ─── NAV ────────────────────────────────────────────────────────────────────
function Nav() {
  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      borderBottom: '1px solid var(--border)',
      backdropFilter: 'blur(12px)',
      backgroundColor: 'rgba(10,10,10,0.85)',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 56 }}>
        <span style={{ fontFamily: 'DM Serif Display, serif', fontSize: 15, letterSpacing: '0.18em', color: 'var(--text)' }}>
          REGEN COHORT
        </span>
        <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
          {['Protocol', 'Structure', 'Measure', 'Apply'].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} style={{
              fontSize: 12, letterSpacing: '0.12em', color: 'var(--text-2)',
              textDecoration: 'none', textTransform: 'uppercase', transition: 'color 0.2s',
            }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-2)')}
            >
              {item}
            </a>
          ))}
          <a href="#apply" style={{
            fontSize: 12, letterSpacing: '0.1em', color: '#000',
            backgroundColor: 'var(--accent)', padding: '7px 16px',
            borderRadius: 2, textDecoration: 'none', fontWeight: 500,
            textTransform: 'uppercase',
          }}>
            Apply
          </a>
        </div>
      </div>
    </nav>
  )
}

// ─── HERO ────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      justifyContent: 'center', paddingTop: 56,
      borderBottom: '1px solid var(--border)',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '80px 24px' }}>
        {/* Partner badge */}
        <div style={{ marginBottom: 40, display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 6, height: 6, borderRadius: '50%',
            backgroundColor: 'var(--accent)',
          }} />
          <span style={{ fontSize: 11, letterSpacing: '0.2em', color: 'var(--text-2)', textTransform: 'uppercase' }}>
            Powered by Roumai Medical
          </span>
        </div>

        {/* Cohort badge — amber left border + increased padding */}
        <div style={{
          display: 'inline-block', marginBottom: 32,
          border: '1px solid var(--border-2)',
          borderLeft: '2px solid var(--accent)',
          padding: '4px 12px 4px 14px', borderRadius: 2,
          fontSize: 11, letterSpacing: '0.2em', color: 'var(--text-3)',
          textTransform: 'uppercase',
        }}>
          Cohort 01 — 2026 — 8 Participants
        </div>

        {/* Hero headline with animated radial glow */}
        <div style={{ position: 'relative', display: 'inline-block', width: '100%' }}>
          {/* Animated glow orb behind h1 */}
          <div style={{
            position: 'absolute',
            top: '50%', left: '20%',
            transform: 'translate(-50%, -50%)',
            width: 600, height: 400,
            background: 'radial-gradient(ellipse at center, var(--accent-glow) 0%, transparent 70%)',
            animation: 'heroGlow 4s ease-in-out infinite alternate',
            pointerEvents: 'none',
            zIndex: 0,
          }} />
          <h1 style={{ fontSize: 'clamp(42px, 7vw, 96px)', marginBottom: 28, maxWidth: 900, color: 'var(--text)', position: 'relative', zIndex: 1 }}>
            Regenerative protocols.<br />
            <span style={{ color: 'var(--accent)' }}>Longitudinal data.</span><br />
            Private cohort.
          </h1>
        </div>

        <p style={{ fontSize: 17, color: 'var(--text-2)', maxWidth: 560, marginBottom: 48, lineHeight: 1.7 }}>
          An 8-person observational wellness program combining MSC-derived lysate infusions with
          systematic biomarker tracking over 6 months. Standardized. Data-first. By application only.
        </p>

        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <a href="#apply" style={{
            backgroundColor: 'var(--accent)', color: '#000',
            padding: '14px 32px', borderRadius: 2, textDecoration: 'none',
            fontSize: 13, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase',
            transition: 'background-color 0.2s',
          }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--accent-dim)')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'var(--accent)')}
          >
            Apply to Cohort 01
          </a>
          <a href="#protocol" style={{
            border: '1px solid var(--border-2)', color: 'var(--text)',
            padding: '14px 32px', borderRadius: 2, textDecoration: 'none',
            fontSize: 13, letterSpacing: '0.08em', textTransform: 'uppercase',
            transition: 'border-color 0.2s, color 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-2)'; e.currentTarget.style.color = 'var(--text)' }}
          >
            Learn the Protocol
          </a>
        </div>

        {/* Stats row — bordered cells with gold accent lines */}
        <div style={{ marginTop: 80, borderTop: '1px solid var(--border)', paddingTop: 40 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0 }}>
            {[
              { num: '8', label: 'Participants' },
              { num: '6', label: 'Month program' },
              { num: '40+', label: 'Biomarkers tracked' },
              { num: '3', label: 'Treatment cycles' },
            ].map((s, i, arr) => (
              <div key={s.label} style={{
                paddingRight: 32, paddingLeft: i === 0 ? 0 : 32,
                borderRight: i < arr.length - 1 ? '1px solid var(--border)' : 'none',
              }}>
                {/* Gold accent line above number */}
                <div style={{
                  width: 24, height: 4,
                  backgroundColor: 'var(--accent)',
                  marginBottom: 12,
                }} />
                <div style={{ fontSize: 36, fontFamily: 'DM Serif Display, serif', color: 'var(--text)', lineHeight: 1 }}>{s.num}</div>
                <div style={{ fontSize: 12, color: 'var(--text-3)', letterSpacing: '0.1em', marginTop: 6, textTransform: 'uppercase' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── PROTOCOL ───────────────────────────────────────────────────────────────
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
      title: 'Regenerative Cofactors',
      desc: 'Adjunct supplementation stack selected to support systemic recovery and biomarker response. Personalized to individual baseline labs. No pharmaceutical claims.',
      tags: ['NAD+ precursors', 'Anti-inflammatory', 'Mitochondrial support'],
    },
    {
      num: '03',
      title: 'Longitudinal Biomarker Stack',
      desc: 'Comprehensive blood panel, epigenetic age scoring, body composition, and continuous passive capture (HRV, sleep) across all program phases.',
      tags: ['DunedinPACE', 'GrimAge', 'Wearable integration'],
    },
  ]

  return (
    <section id="protocol" style={{ borderBottom: '1px solid var(--border)', padding: '100px 0' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ marginBottom: 64 }}>
          <div style={{ fontSize: 11, letterSpacing: '0.2em', color: 'var(--text-3)', textTransform: 'uppercase', marginBottom: 16 }}>The Protocol</div>
          <h2 style={{ fontSize: 'clamp(32px, 4vw, 52px)', maxWidth: 600 }}>
            Three pillars.<br />One integrated program.
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 1, backgroundColor: 'var(--border)' }}>
          {cards.map(card => (
            <div key={card.num}
              style={{
                backgroundColor: 'var(--bg-2)', padding: '40px 36px',
                transition: 'background-color 0.2s, box-shadow 0.3s',
                position: 'relative', overflow: 'hidden',
                /* Gold shimmer line at top via box-shadow inset substitute — using background-image on a pseudo-div */
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = 'var(--bg-3)'
                e.currentTarget.style.boxShadow = '0 0 40px 0 var(--accent-glow)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = 'var(--bg-2)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              {/* Gold shimmer top border */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 1,
                background: 'linear-gradient(to right, transparent, var(--accent), transparent)',
              }} />

              {/* Ghost number */}
              <div style={{
                position: 'absolute', top: 16, right: 20,
                fontFamily: 'DM Serif Display, serif',
                fontSize: 120, lineHeight: 1,
                color: 'var(--text-3)', opacity: 0.06,
                pointerEvents: 'none', userSelect: 'none',
              }}>
                {card.num}
              </div>

              <div style={{ fontSize: 11, color: 'var(--accent)', letterSpacing: '0.2em', marginBottom: 20, position: 'relative', zIndex: 1 }}>{card.num}</div>
              <h3 style={{ fontSize: 22, marginBottom: 16, color: 'var(--text)', position: 'relative', zIndex: 1 }}>{card.title}</h3>
              <p style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.75, marginBottom: 28, position: 'relative', zIndex: 1 }}>{card.desc}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, position: 'relative', zIndex: 1 }}>
                {card.tags.map(t => (
                  <span key={t}
                    style={{
                      fontSize: 11, letterSpacing: '0.1em', color: 'var(--text-3)',
                      border: '1px solid var(--border-2)', padding: '3px 10px', borderRadius: 20,
                      textTransform: 'uppercase', transition: 'background 0.2s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'var(--accent-glow)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  >{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── COHORT STRUCTURE ────────────────────────────────────────────────────────
function Structure() {
  const phases = [
    { label: 'Week 0', title: 'Intake & Screening', desc: 'Application review, medical history, eligibility confirmation.' },
    { label: 'Week 1', title: 'Baseline Assessment', desc: 'Full biomarker panel, epigenetic clock, body composition, wearable setup.' },
    { label: 'Weeks 2–12', title: 'Treatment Cycles', desc: '3 infusion cycles, bi-weekly check-ins, passive data collection.' },
    { label: 'Week 14', title: 'Follow-up Labs', desc: 'Mid-program biomarker snapshot, protocol adjustment if indicated.' },
    { label: 'Week 24', title: 'Final Assessment', desc: 'Complete biomarker stack repeat, epigenetic re-scoring, data review.' },
    { label: 'Ongoing', title: 'Data Review', desc: 'Longitudinal dataset compiled, individual reports delivered.' },
  ]

  // SVG Icons for callout cards
  const BarChartIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="14" width="3" height="8" />
      <rect x="7" y="9" width="3" height="13" />
      <rect x="12" y="11" width="3" height="11" />
      <rect x="17" y="5" width="3" height="17" />
    </svg>
  )

  const WaveformIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="2,12 5,12 7,5 9,19 11,12 13,12 15,8 17,16 19,12 22,12" />
    </svg>
  )

  const PhoneIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
      <line x1="12" y1="18" x2="12" y2="18" strokeWidth="2" />
    </svg>
  )

  const callouts = [
    { icon: <BarChartIcon />, title: 'Standardized Data', desc: 'Unified collection protocol across all 8 participants enables true cross-participant analysis.' },
    { icon: <WaveformIcon />, title: 'Passive Capture', desc: 'Companion app integrates wearable data — sleep staging, HRV, recovery scores — automatically.' },
    { icon: <PhoneIcon />, title: 'Protocol Companion', desc: 'Personalized digital companion tracks adherence, surfaces alerts, and delivers weekly snapshots.' },
  ]

  return (
    <section id="structure" style={{ borderBottom: '1px solid var(--border)', padding: '100px 0' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ marginBottom: 64 }}>
          <div style={{ fontSize: 11, letterSpacing: '0.2em', color: 'var(--text-3)', textTransform: 'uppercase', marginBottom: 16 }}>Cohort Structure</div>
          <h2 style={{ fontSize: 'clamp(32px, 4vw, 52px)' }}>
            Six months.<br />Standardized at every step.
          </h2>
        </div>

        {/* Timeline */}
        <div style={{ position: 'relative', marginBottom: 72 }}>
          {/* Gradient vertical line */}
          <div style={{
            position: 'absolute', left: 0, top: 12, bottom: 12, width: 1,
            background: 'linear-gradient(to bottom, var(--accent), var(--border-2))',
          }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {phases.map((phase, i) => {
              const isFirst = i === 0
              const isLast = i === phases.length - 1
              const isTreatment = i === 2
              const isGold = isFirst || isLast || isTreatment
              const dotSize = isGold ? 12 : 10

              return (
                <div key={i} style={{ display: 'flex', gap: 32, padding: '20px 0', paddingLeft: 28, position: 'relative' }}>
                  <div style={{
                    position: 'absolute',
                    left: -(dotSize / 2),
                    top: 22,
                    width: dotSize, height: dotSize, borderRadius: '50%',
                    backgroundColor: isGold ? 'var(--accent)' : 'var(--bg-3)',
                    border: `1px solid ${isGold ? 'var(--accent)' : 'var(--border-2)'}`,
                    boxShadow: isGold ? '0 0 12px var(--accent-glow)' : 'none',
                  }} />
                  <div style={{ width: 100, flexShrink: 0 }}>
                    <span style={{ fontSize: 11, color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{phase.label}</span>
                  </div>
                  <div>
                    <div style={{
                      fontSize: 15,
                      fontWeight: isTreatment ? 600 : 500,
                      color: isTreatment ? 'var(--accent)' : 'var(--text)',
                      marginBottom: 4,
                    }}>{phase.title}</div>
                    <div style={{ fontSize: 13, color: 'var(--text-2)' }}>{phase.desc}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Callouts */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
          {callouts.map(c => (
            <div key={c.title}
              style={{
                backgroundColor: 'var(--bg-2)', border: '1px solid var(--border)',
                borderLeft: '1px solid var(--border)',
                padding: '28px 24px', borderRadius: 2,
                position: 'relative', overflow: 'hidden',
                transition: 'border-left 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderLeft = '2px solid var(--accent)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderLeft = '1px solid var(--border)'
              }}
            >
              {/* Gold shimmer top border */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 1,
                background: 'linear-gradient(to right, transparent, var(--accent), transparent)',
              }} />
              <div style={{ marginBottom: 12 }}>{c.icon}</div>
              <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--text)', marginBottom: 8 }}>{c.title}</div>
              <div style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.65 }}>{c.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── WHAT WE MEASURE ────────────────────────────────────────────────────────
function Measure() {
  const categories = [
    {
      cat: 'Epigenetic Age',
      items: ['DunedinPACE', 'GrimAge v2', 'PhenoAge', 'TruAge score'],
    },
    {
      cat: 'Inflammatory Panel',
      items: ['hs-CRP', 'IL-6', 'TNF-α', 'Ferritin', 'ESR'],
    },
    {
      cat: 'Metabolic Markers',
      items: ['Fasting insulin', 'HbA1c', 'Lipid panel', 'ApoB', 'HOMA-IR'],
    },
    {
      cat: 'Hormonal Status',
      items: ['Total/Free testosterone', 'IGF-1', 'DHEA-S', 'Cortisol AM', 'TSH'],
    },
    {
      cat: 'Body Composition',
      items: ['DEXA or BIA', 'Visceral fat index', 'Lean mass %', 'Bone density'],
    },
    {
      cat: 'Sleep & HRV',
      items: ['Sleep staging', 'Resting HRV', 'Recovery score', 'Readiness index'],
    },
    {
      cat: 'Subjective Wellbeing',
      items: ['Energy (VAS)', 'Cognitive clarity', 'Physical performance', 'Mood composite'],
    },
    {
      cat: 'Face Imaging',
      items: ['Standardized photography', 'Skin analysis', 'Chronological vs perceived age'],
    },
  ]

  return (
    <section id="measure" style={{ borderBottom: '1px solid var(--border)', padding: '100px 0' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ marginBottom: 64 }}>
          <div style={{ fontSize: 11, letterSpacing: '0.2em', color: 'var(--text-3)', textTransform: 'uppercase', marginBottom: 16 }}>What We Measure</div>
          <h2 style={{ fontSize: 'clamp(32px, 4vw, 52px)', maxWidth: 600 }}>
            Comprehensive.<br />Not curated for comfort.
          </h2>
        </div>

        {/* Biomarker score visualization */}
        <div style={{ maxWidth: 600, marginBottom: 56 }}>
          <div style={{
            backgroundColor: 'var(--bg-2)', border: '1px solid var(--border)',
            borderRadius: 2, padding: '24px 28px',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <span style={{ fontSize: 11, letterSpacing: '0.15em', color: 'var(--text-3)', textTransform: 'uppercase' }}>Epigenetic Age Index</span>
              <span style={{ fontSize: 11, letterSpacing: '0.1em', color: 'var(--text-3)', textTransform: 'uppercase' }}>Tracked monthly</span>
            </div>
            {/* Bar track */}
            <div style={{ position: 'relative', height: 6, backgroundColor: 'var(--bg-3)', borderRadius: 3, overflow: 'visible' }}>
              {/* Filled portion at 62% */}
              <div style={{
                position: 'absolute', left: 0, top: 0, bottom: 0,
                width: '62%', backgroundColor: 'var(--accent)',
                borderRadius: 3,
              }} />
              {/* Dot at 62% */}
              <div style={{
                position: 'absolute', top: '50%', left: '62%',
                transform: 'translate(-50%, -50%)',
                width: 12, height: 12, borderRadius: '50%',
                backgroundColor: 'var(--accent)',
                boxShadow: '0 0 8px var(--accent-glow)',
                border: '2px solid var(--bg-2)',
              }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
              <span style={{ fontSize: 11, color: 'var(--text-3)' }}>Biological Age Score</span>
              <span style={{ fontSize: 11, color: 'var(--accent)', fontFamily: 'DM Serif Display, serif' }}>62%</span>
            </div>
          </div>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 1,
          backgroundColor: 'var(--border)', marginBottom: 64,
        }}>
          {categories.map(cat => (
            <div key={cat.cat}
              style={{ backgroundColor: 'var(--bg)', padding: '28px 24px', transition: 'background-color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--bg-2)')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'var(--bg)')}
            >
              <div
                style={{
                  fontSize: 11, letterSpacing: '0.15em', color: 'var(--accent)',
                  textTransform: 'uppercase', marginBottom: 16,
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--accent)')}
              >{cat.cat}</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {cat.items.map(item => (
                  <li key={item} style={{ fontSize: 13, color: 'var(--text-2)', padding: '4px 0', borderBottom: '1px solid var(--border)', display: 'flex', gap: 8, alignItems: 'center' }}>
                    <span style={{ color: 'var(--border-2)', fontSize: 10 }}>—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Pull quote — upgraded */}
        <div style={{
          borderLeft: '3px solid var(--accent)', paddingLeft: 32,
          maxWidth: 600,
        }}>
          <p style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(28px, 4vw, 44px)', color: 'var(--text)', lineHeight: 1.4, fontStyle: 'italic', marginBottom: 16 }}>
            &ldquo;Our edge is the data.&rdquo;
          </p>
          <p style={{ fontSize: 13, color: 'var(--text-3)', letterSpacing: '0.08em', marginBottom: 8 }}>
            REGEN COHORT 01 — Program Principle
          </p>
          {/* Cohort logo mark */}
          <p style={{ fontFamily: 'DM Serif Display, serif', fontSize: 11, letterSpacing: '0.3em', color: 'var(--text-3)', marginTop: 4 }}>
            RC
          </p>
        </div>
      </div>
    </section>
  )
}

// ─── SUPPLY CHAIN ────────────────────────────────────────────────────────────
function SupplyChain() {
  // Roumai Logo — actual brand asset
  const RoumaiLogo = () => (
    <img
      src="/roumai-logo.png"
      alt="Roumai Medical"
      width={240}
      height={93}
      style={{ display: 'block', width: 240, height: 'auto' }}
    />
  )

  return (
    <section style={{ borderBottom: '1px solid var(--border)', padding: '100px 0', backgroundColor: 'var(--bg-2)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 11, letterSpacing: '0.2em', color: 'var(--text-3)', textTransform: 'uppercase', marginBottom: 16 }}>Supply Chain</div>
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', marginBottom: 24 }}>
              Licensed source.<br />Traceable batches.
            </h2>
            <p style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.75, marginBottom: 24 }}>
              Roumai Medical supplies standardized mesenchymal stem cell-derived lysate from
              licensed manufacturing operations. Each batch undergoes quality control documentation
              before Swiss-coordinated distribution.
            </p>
            <p style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.75 }}>
              Batch traceability, documentation, and supply continuity are core to the program&apos;s
              integrity. We do not source from unverified providers.
            </p>
          </div>
          <div>
            {/* Supplier card with shimmer border animation */}
            <div style={{
              border: '1px solid var(--border-2)', padding: '48px',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16,
              borderRadius: 2,
              animation: 'borderShimmer 3s ease-in-out infinite',
            }}>
              {/* Roumai Logo */}
              <RoumaiLogo />

              <div style={{ fontSize: 11, letterSpacing: '0.15em', color: 'var(--text-3)', textTransform: 'uppercase', marginTop: 4 }}>
                Licensed MSC Lysate Supplier
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', marginTop: 8 }}>
                {['Swiss-coordinated', 'Batch-controlled', 'Licensed operations'].map(t => (
                  <span key={t}
                    style={{
                      fontSize: 10, letterSpacing: '0.1em', color: 'var(--text-3)',
                      border: '1px solid var(--border)', padding: '2px 8px', borderRadius: 20,
                      textTransform: 'uppercase',
                      transition: 'background 0.2s, border-color 0.2s',
                      cursor: 'default',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = 'var(--accent-glow)'
                      e.currentTarget.style.borderColor = 'var(--accent)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'transparent'
                      e.currentTarget.style.borderColor = 'var(--border)'
                    }}
                  >{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── WHO THIS IS FOR ─────────────────────────────────────────────────────────
function WhoFor() {
  const profiles = [
    'Quantified-self practitioners with existing biomarker baselines',
    'Longevity-focused individuals who have explored IV therapy protocols',
    'Willing to travel internationally for treatment (Cohort 01 in Shenzhen, China)',
    'Biohackers interested in systematic, data-tracked regenerative protocols',
    'Those willing to commit to all 3 treatment cycles and follow-up assessments',
    'Individuals aged 30–65 with no active autoimmune conditions',
  ]

  const locations = [
    { city: 'Shenzhen', note: 'Cohort 01 — Primary site' },
    { city: 'Morocco', note: 'Cohort 02' },
    { city: 'Mexico', note: 'Cohort 03' },
    { city: 'Chile', note: 'Cohort 04' },
    { city: 'Switzerland', note: 'Cohort 05' },
  ]

  return (
    <section style={{ borderBottom: '1px solid var(--border)', padding: '100px 0' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80 }}>
          <div>
            <div style={{ fontSize: 11, letterSpacing: '0.2em', color: 'var(--text-3)', textTransform: 'uppercase', marginBottom: 16 }}>Who This Is For</div>
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', marginBottom: 32 }}>
              Qualifying profile.
            </h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {profiles.map((p, i) => (
                <li key={i} style={{
                  display: 'flex', gap: 16, padding: '14px 0',
                  borderBottom: '1px solid var(--border)',
                  fontSize: 14, color: 'var(--text-2)', lineHeight: 1.6,
                }}>
                  <span style={{ color: 'var(--accent)', fontSize: 10, paddingTop: 4, flexShrink: 0 }}>◆</span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div style={{ fontSize: 11, letterSpacing: '0.2em', color: 'var(--text-3)', textTransform: 'uppercase', marginBottom: 16 }}>Treatment Locations</div>
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', marginBottom: 32 }}>
              Where it happens.
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {locations.map(loc => (
                <div key={loc.city} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '20px 24px',
                  border: '1px solid var(--border)',
                  borderRadius: 2,
                }}>
                  <div>
                    <div style={{ fontSize: 17, fontFamily: 'DM Serif Display, serif', color: 'var(--text)' }}>{loc.city}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 2 }}>{loc.note}</div>
                  </div>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'var(--accent)' }} />
                </div>
              ))}
            </div>
            <div style={{
              marginTop: 24, padding: '20px 24px',
              backgroundColor: 'var(--accent-glow)',
              border: '1px solid var(--accent)',
              borderRadius: 2,
            }}>
              <div style={{ fontSize: 12, color: 'var(--text-2)', lineHeight: 1.65 }}>
                Cohort 01 takes place in Shenzhen. Subsequent cohorts expand across the global treatment roadmap above.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── APPLY FORM ──────────────────────────────────────────────────────────────
function Apply() {
  const [form, setForm] = useState({ name: '', email: '', country: '', why_join: '', prior_stem_cell: '' })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  // Floating label state per field
  const [labelStates, setLabelStates] = useState<Record<string, { focused: boolean }>>({
    name: { focused: false },
    email: { focused: false },
    country: { focused: false },
    why_join: { focused: false },
  })

  const setFieldFocus = (field: string, focused: boolean) => {
    setLabelStates(prev => ({ ...prev, [field]: { focused } }))
  }

  const getFloatingLabelStyle = (field: string, value: string): React.CSSProperties => {
    const isActive = labelStates[field]?.focused || value.length > 0
    return {
      position: 'absolute',
      left: 16,
      top: isActive ? -10 : '50%',
      transform: isActive ? 'none' : 'translateY(-50%)',
      fontSize: isActive ? 11 : 13,
      letterSpacing: isActive ? '0.12em' : '0.04em',
      color: isActive ? 'var(--accent)' : 'var(--text-3)',
      textTransform: 'uppercase' as const,
      transition: 'all 0.2s ease',
      pointerEvents: 'none',
      zIndex: 2,
      backgroundColor: isActive ? 'var(--bg)' : 'transparent',
      padding: isActive ? '0 4px' : '0',
    }
  }

  const getFloatingLabelStyleTextarea = (field: string, value: string): React.CSSProperties => {
    const isActive = labelStates[field]?.focused || value.length > 0
    return {
      position: 'absolute',
      left: 16,
      top: isActive ? -10 : 14,
      fontSize: isActive ? 11 : 13,
      letterSpacing: isActive ? '0.12em' : '0.04em',
      color: isActive ? 'var(--accent)' : 'var(--text-3)',
      textTransform: 'uppercase' as const,
      transition: 'all 0.2s ease',
      pointerEvents: 'none',
      zIndex: 2,
      backgroundColor: isActive ? 'var(--bg)' : 'transparent',
      padding: isActive ? '0 4px' : '0',
    }
  }

  const baseInputStyle: React.CSSProperties = {
    width: '100%', backgroundColor: 'var(--bg-2)', border: '1px solid var(--border-2)',
    color: 'var(--text)', padding: '12px 16px', borderRadius: 2, fontSize: 14,
    outline: 'none', boxSizing: 'border-box' as const,
    fontFamily: 'Inter, sans-serif',
    transition: 'border-color 0.2s, box-shadow 0.2s',
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
    <section id="apply" style={{ borderBottom: '1px solid var(--border)', padding: '100px 0' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 80, alignItems: 'start' }}>
          <div>
            <div style={{ fontSize: 11, letterSpacing: '0.2em', color: 'var(--text-3)', textTransform: 'uppercase', marginBottom: 16 }}>Application</div>
            <h2 style={{ fontSize: 'clamp(32px, 4vw, 52px)', marginBottom: 24 }}>
              Apply to<br />Cohort 01.
            </h2>
            <p style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.75, marginBottom: 32 }}>
              We review every application individually. Cohort 01 is limited to 8 participants.
              Acceptance is based on profile fit, readiness, and commitment to full program participation.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {['8 total spots', 'Rolling review', 'Response within 72h', 'No cost to apply'].map(item => (
                <div key={item} style={{ display: 'flex', gap: 12, alignItems: 'center', fontSize: 13, color: 'var(--text-2)' }}>
                  <span style={{ color: 'var(--accent)', fontSize: 10 }}>◆</span>
                  {item}
                </div>
              ))}
            </div>

            {/* What happens next */}
            <div style={{ marginTop: 40 }}>
              <div style={{ fontSize: 11, letterSpacing: '0.15em', color: 'var(--text-3)', textTransform: 'uppercase', marginBottom: 16 }}>
                What happens next
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {whatHappensNext.map((step, i) => (
                  <div key={i} style={{
                    display: 'flex', gap: 16, padding: '12px 0',
                    borderBottom: i < whatHappensNext.length - 1 ? '1px solid var(--border)' : 'none',
                    alignItems: 'flex-start',
                  }}>
                    <span style={{ color: 'var(--accent)', fontSize: 12, fontFamily: 'DM Serif Display, serif', flexShrink: 0, minWidth: 16 }}>
                      {i + 1}
                    </span>
                    <span style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.6 }}>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            {status === 'success' ? (
              <div style={{
                border: '1px solid var(--accent)', padding: '48px 40px',
                borderRadius: 2, textAlign: 'center',
                backgroundColor: 'var(--accent-glow)',
              }}>
                <div style={{ fontSize: 32, color: 'var(--accent)', marginBottom: 16 }}>◈</div>
                <h3 style={{ fontSize: 24, color: 'var(--text)', marginBottom: 12 }}>Application received.</h3>
                <p style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.75 }}>
                  We will review your submission and respond within 72 hours.
                  Check your email for confirmation.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {/* Full Name — floating label */}
                <div style={{ position: 'relative' }}>
                  <label style={getFloatingLabelStyle('name', form.name)}>Full Name</label>
                  <input
                    style={baseInputStyle} type="text" required
                    value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    onFocus={e => {
                      setFieldFocus('name', true)
                      e.target.style.borderColor = 'var(--accent)'
                      e.target.style.boxShadow = '0 0 0 1px var(--accent)'
                    }}
                    onBlur={e => {
                      setFieldFocus('name', false)
                      e.target.style.borderColor = 'var(--border-2)'
                      e.target.style.boxShadow = 'none'
                    }}
                  />
                </div>

                {/* Email — floating label */}
                <div style={{ position: 'relative' }}>
                  <label style={getFloatingLabelStyle('email', form.email)}>Email</label>
                  <input
                    style={baseInputStyle} type="email" required
                    value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    onFocus={e => {
                      setFieldFocus('email', true)
                      e.target.style.borderColor = 'var(--accent)'
                      e.target.style.boxShadow = '0 0 0 1px var(--accent)'
                    }}
                    onBlur={e => {
                      setFieldFocus('email', false)
                      e.target.style.borderColor = 'var(--border-2)'
                      e.target.style.boxShadow = 'none'
                    }}
                  />
                </div>

                {/* Country — floating label */}
                <div style={{ position: 'relative' }}>
                  <label style={getFloatingLabelStyle('country', form.country)}>Country of Residence</label>
                  <input
                    style={baseInputStyle} type="text" required
                    value={form.country} onChange={e => setForm(f => ({ ...f, country: e.target.value }))}
                    onFocus={e => {
                      setFieldFocus('country', true)
                      e.target.style.borderColor = 'var(--accent)'
                      e.target.style.boxShadow = '0 0 0 1px var(--accent)'
                    }}
                    onBlur={e => {
                      setFieldFocus('country', false)
                      e.target.style.borderColor = 'var(--border-2)'
                      e.target.style.boxShadow = 'none'
                    }}
                  />
                </div>

                {/* Why join — floating label textarea */}
                <div style={{ position: 'relative' }}>
                  <label style={getFloatingLabelStyleTextarea('why_join', form.why_join)}>Why do you want to join Cohort 01?</label>
                  <textarea
                    style={{ ...baseInputStyle, minHeight: 100, resize: 'vertical', paddingTop: 16 }}
                    required
                    value={form.why_join}
                    onChange={e => setForm(f => ({ ...f, why_join: e.target.value }))}
                    onFocus={e => {
                      setFieldFocus('why_join', true)
                      e.target.style.borderColor = 'var(--accent)'
                      e.target.style.boxShadow = '0 0 0 1px var(--accent)'
                    }}
                    onBlur={e => {
                      setFieldFocus('why_join', false)
                      e.target.style.borderColor = 'var(--border-2)'
                      e.target.style.boxShadow = 'none'
                    }}
                  />
                </div>

                {/* Stem cell radio */}
                <div>
                  <label style={{
                    display: 'block', fontSize: 11, letterSpacing: '0.15em',
                    color: 'var(--text-3)', textTransform: 'uppercase', marginBottom: 8,
                  }}>Have you done stem cell therapy before?</label>
                  <div style={{ display: 'flex', gap: 12 }}>
                    {['yes', 'no'].map(val => (
                      <label key={val} style={{
                        flex: 1, border: `1px solid ${form.prior_stem_cell === val ? 'var(--accent)' : 'var(--border-2)'}`,
                        padding: '12px 16px', cursor: 'pointer', textAlign: 'center',
                        fontSize: 13, color: form.prior_stem_cell === val ? 'var(--accent)' : 'var(--text-2)',
                        borderRadius: 2, transition: 'all 0.2s',
                        textTransform: 'capitalize',
                        backgroundColor: form.prior_stem_cell === val ? 'var(--accent-glow)' : 'transparent',
                        boxShadow: form.prior_stem_cell === val ? 'inset 0 0 0 1px var(--accent)' : 'none',
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
                  <div style={{ fontSize: 13, color: '#f87171', padding: '10px 14px', border: '1px solid rgba(248,113,113,0.3)', borderRadius: 2 }}>
                    {errorMsg}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  style={{
                    backgroundColor: status === 'submitting' ? 'var(--accent-dim)' : 'var(--accent)',
                    color: '#000', padding: '14px 32px', border: 'none',
                    borderRadius: 2, fontSize: 13, fontWeight: 600,
                    letterSpacing: '0.08em', textTransform: 'uppercase',
                    cursor: status === 'submitting' ? 'wait' : 'pointer',
                    transition: 'background-color 0.2s, background-position 0.6s',
                    fontFamily: 'Inter, sans-serif',
                    backgroundSize: '200% auto',
                    backgroundPosition: 'left center',
                  }}
                  onMouseEnter={e => {
                    if (status !== 'submitting') {
                      e.currentTarget.style.backgroundImage = 'linear-gradient(to right, var(--accent) 0%, var(--accent-dim) 40%, rgba(255,255,255,0.15) 50%, var(--accent-dim) 60%, var(--accent) 100%)'
                      e.currentTarget.style.backgroundSize = '200% auto'
                      e.currentTarget.style.animation = 'btnShimmer 0.8s linear forwards'
                    }
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.backgroundImage = 'none'
                    e.currentTarget.style.animation = 'none'
                  }}
                >
                  {status === 'submitting' ? 'Submitting...' : 'Submit Application'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ padding: '60px 0 40px', backgroundColor: 'var(--bg-2)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, marginBottom: 48 }}>
          <div>
            <div style={{ fontFamily: 'DM Serif Display, serif', fontSize: 18, color: 'var(--text)', marginBottom: 12, letterSpacing: '0.08em' }}>
              REGEN COHORT
            </div>
            <p style={{ fontSize: 13, color: 'var(--text-3)', lineHeight: 1.65, maxWidth: 360 }}>
              A private observational wellness program. Not a medical service. Not a clinical trial.
              Participants engage voluntarily and are encouraged to consult qualified medical professionals.
            </p>
          </div>
          <div>
            <div style={{ fontSize: 11, letterSpacing: '0.15em', color: 'var(--text-3)', textTransform: 'uppercase', marginBottom: 12 }}>Contact</div>
            <span style={{ fontSize: 13, color: 'var(--text-3)' }}>Contact details coming soon.</span>
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--border)', paddingTop: 24 }}>
          <p style={{ fontSize: 12, color: 'var(--text-3)', lineHeight: 1.65, marginBottom: 16, maxWidth: 800 }}>
            <strong style={{ color: 'var(--text-2)' }}>Wellness Disclaimer:</strong> REGEN COHORT is an observational wellness program, not a licensed medical service or clinical trial. No therapeutic claims are made. Participants should consult qualified healthcare professionals before enrolling. Information on this page is for educational purposes only.
          </p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
            <span style={{ fontSize: 12, color: 'var(--text-3)' }}>© 2026 REGEN COHORT. All rights reserved.</span>
            <span style={{ fontSize: 12, color: 'var(--text-3)' }}>Powered by Roumai Medical</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

// ─── MAIN PAGE ───────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Protocol />
        <Structure />
        <Measure />
        <SupplyChain />
        <WhoFor />
        <Apply />
      </main>
      <Footer />
    </>
  )
}
