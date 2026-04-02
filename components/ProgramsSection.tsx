'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const programs = [
  {
    tag: 'Start Here',
    name: 'The Foundation',
    tagline: 'For the woman starting fresh.',
    description:
      "We build from the ground up. Sustainable habits, movement you enjoy, and nutrition that doesn\u2019t feel like punishment.",
    details: ['12-week program', 'Custom training plan', 'Nutrition fundamentals', 'Weekly check-ins'],
    cta: 'Begin Here',
    // Card colors — solid and opaque so text is always legible
    cardBg: 'linear-gradient(145deg, #F5D8DF 0%, #FAE8EC 100%)',
    tagBg: 'rgba(196,133,122,0.12)',
    tagColor: '#8A4A43',
    textColor: '#2C1F1A',
    subtextColor: 'rgba(44,31,26,0.58)',
    accentColor: '#C4857A',
    chipBg: 'rgba(196,133,122,0.10)',
    chipColor: 'rgba(44,31,26,0.55)',
    chipBorder: 'rgba(196,133,122,0.22)',
    ctaBg: '#C4857A',
    ctaText: '#FAF6F2',
    borderColor: 'rgba(242,196,206,0.55)',
    shadow: '0 8px 40px rgba(196,133,122,0.18), 0 2px 8px rgba(44,31,26,0.06)',
    glow: '0 16px 56px rgba(242,196,206,0.35)',
    featured: false,
  },
  {
    tag: 'Most Popular',
    name: 'The Method',
    tagline: 'Nutrition, training, mindset.',
    description:
      "The full picture. Every variable calibrated to you \u2014 because one size has never fit all.",
    details: ['16-week program', 'Fully customised plan', 'Mindset coaching', 'Daily support access'],
    cta: 'Get The Method',
    cardBg: 'linear-gradient(145deg, #2C1F1A 0%, #3D2820 100%)',
    tagBg: 'rgba(242,196,206,0.15)',
    tagColor: '#F2C4CE',
    textColor: '#FAF6F2',
    subtextColor: 'rgba(250,246,242,0.60)',
    accentColor: '#F2C4CE',
    chipBg: 'rgba(242,196,206,0.10)',
    chipColor: 'rgba(250,246,242,0.65)',
    chipBorder: 'rgba(242,196,206,0.20)',
    ctaBg: '#F2C4CE',
    ctaText: '#2C1F1A',
    borderColor: 'rgba(242,196,206,0.25)',
    shadow: '0 12px 48px rgba(44,31,26,0.30), 0 4px 12px rgba(44,31,26,0.18)',
    glow: '0 20px 64px rgba(232,164,160,0.22)',
    featured: true,
  },
  {
    tag: 'Premium',
    name: 'The Inner Circle',
    tagline: '1:1 coaching. Limited spots.',
    description:
      'For the woman ready to go all in. Completely bespoke, completely private. Applications reviewed personally.',
    details: ['Ongoing 1:1', 'Direct access 7 days', 'Bespoke protocol', 'Limited spots'],
    cta: 'Apply Now',
    cardBg: 'linear-gradient(145deg, #D4B896 0%, #E8D4BC 100%)',
    tagBg: 'rgba(44,31,26,0.10)',
    tagColor: '#5C3D2A',
    textColor: '#2C1F1A',
    subtextColor: 'rgba(44,31,26,0.55)',
    accentColor: '#8A5A3A',
    chipBg: 'rgba(44,31,26,0.07)',
    chipColor: 'rgba(44,31,26,0.52)',
    chipBorder: 'rgba(44,31,26,0.14)',
    ctaBg: '#2C1F1A',
    ctaText: '#FAF6F2',
    borderColor: 'rgba(196,168,130,0.50)',
    shadow: '0 8px 40px rgba(196,168,130,0.22), 0 2px 8px rgba(44,31,26,0.06)',
    glow: '0 16px 56px rgba(196,168,130,0.30)',
    featured: false,
  },
]

const ENTRANCE_DELAYS  = [0.12, 0.28, 0.44]
const FLOAT_DURATIONS  = [5.4, 6.8, 5.8]
const FLOAT_DELAYS     = ['0s', '1.6s', '0.8s']

export default function ProgramsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      id="programs"
      className="relative py-16 md:py-24 px-5 overflow-hidden bg-sakura"
    >
      {/* Very subtle warm texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 60%, rgba(196,133,122,0.05) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10" ref={ref}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-10 md:mb-14"
        >
          <span className="font-sans text-[11px] tracking-widest2 uppercase text-rosegold mb-3 block">
            Programs
          </span>
          <h2 className="font-display text-5xl md:text-6xl text-espresso font-light italic leading-tight">
            An invitation,{' '}
            <span className="font-semibold not-italic text-rosegold">not a price list.</span>
          </h2>
          <p className="font-sans text-sm text-espresso/45 mt-4 max-w-xs mx-auto leading-relaxed">
            Choose where you are. Commit to where you want to be.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {programs.map((p, i) => (
            <BubbleCard
              key={p.name}
              program={p}
              isInView={isInView}
              entranceDelay={ENTRANCE_DELAYS[i]}
              floatDuration={FLOAT_DURATIONS[i]}
              floatDelay={FLOAT_DELAYS[i]}
            />
          ))}
        </div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.9, duration: 1 }}
          className="text-center mt-7 font-sans text-[11px] text-espresso/30 tracking-wide"
        >
          All programs include a complimentary discovery call. No commitment until you&apos;re ready.
        </motion.p>

      </div>
    </section>
  )
}

type Program = typeof programs[number]

function BubbleCard({
  program: p,
  isInView,
  entranceDelay,
  floatDuration,
  floatDelay,
}: {
  program: Program
  isInView: boolean
  entranceDelay: number
  floatDuration: number
  floatDelay: string
}) {
  const [entered, setEntered] = useState(false)

  return (
    <motion.div
      initial={{ scale: 0.15, opacity: 0, y: 16 }}
      animate={isInView ? { scale: 1, opacity: 1, y: 0 } : {}}
      transition={{
        type: 'spring',
        stiffness: 155,
        damping: 11,
        mass: 0.85,
        delay: entranceDelay,
        opacity: { duration: 0.3, delay: entranceDelay },
        y: { type: 'spring', stiffness: 200, damping: 18, delay: entranceDelay },
      }}
      onAnimationComplete={() => setEntered(true)}
      whileHover={{
        scale: 1.025,
        y: -6,
        transition: { type: 'spring', stiffness: 380, damping: 22 },
      }}
      whileTap={{ scale: 0.97, transition: { duration: 0.1 } }}
      className="relative flex flex-col rounded-[24px] overflow-hidden"
      style={{
        background: p.cardBg,
        border: `1px solid ${p.borderColor}`,
        boxShadow: p.featured ? p.glow : p.shadow,
        animation: entered
          ? `bubbleFloat ${floatDuration}s ease-in-out infinite ${floatDelay}`
          : 'none',
      }}
    >
      {/* Top sheen — soap bubble highlight */}
      <div
        className="absolute top-0 left-0 right-0 h-1/3 pointer-events-none rounded-t-[24px]"
        style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.10) 0%, transparent 100%)' }}
      />

      <div className="relative flex flex-col flex-1 p-6">

        {/* Tag pill */}
        <div className="mb-5">
          <span
            className="font-sans text-[10px] tracking-widest2 uppercase px-3 py-1.5 rounded-full"
            style={{
              backgroundColor: p.tagBg,
              color: p.tagColor,
              border: `1px solid ${p.tagBg}`,
            }}
          >
            {p.tag}
          </span>
        </div>

        {/* Name */}
        <h3
          className="font-display text-[2.1rem] font-light italic leading-tight mb-1.5"
          style={{ color: p.textColor }}
        >
          {p.name}
        </h3>

        {/* Tagline */}
        <p
          className="font-sans text-[11px] tracking-wide uppercase mb-4"
          style={{ color: p.subtextColor }}
        >
          {p.tagline}
        </p>

        {/* Accent rule */}
        <div
          className="w-7 h-px mb-4 rounded-full"
          style={{ backgroundColor: p.accentColor, opacity: 0.45 }}
        />

        {/* Description */}
        <p
          className="font-sans text-[13px] leading-relaxed mb-5 flex-grow"
          style={{ color: p.subtextColor }}
        >
          {p.description}
        </p>

        {/* Detail chips */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {p.details.map((detail) => (
            <span
              key={detail}
              className="font-sans text-[10px] tracking-wide rounded-full px-3 py-1"
              style={{
                backgroundColor: p.chipBg,
                color: p.chipColor,
                border: `1px solid ${p.chipBorder}`,
              }}
            >
              {detail}
            </span>
          ))}
        </div>

        {/* CTA */}
        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault()
            document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
          }}
          className="block w-full text-center font-sans text-xs tracking-widest2 uppercase py-3.5 rounded-full transition-all duration-300 active:scale-95"
          style={{
            backgroundColor: p.ctaBg,
            color: p.ctaText,
          }}
        >
          {p.cta}
        </a>

      </div>
    </motion.div>
  )
}
