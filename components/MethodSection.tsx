'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import PetalMark from './PetalMark'

const pillars = [
  {
    number: '01',
    headline: 'Wellness',
    body: 'Not a destination. A daily practice. One choice at a time.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#C4857A" strokeWidth="1.5"/>
        <path d="M12 8v4l3 3" stroke="#C4857A" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    number: '02',
    headline: 'Simplicity',
    body: 'The plan you can stick to is the plan that works. Always.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M4 6h16M4 12h10M4 18h6" stroke="#C4857A" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    number: '03',
    headline: 'Consistency',
    body: "Results don't come from perfect days. They come from showing up anyway.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M3 12l4 4 5-6 4 3 5-7" stroke="#C4857A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    number: '04',
    headline: 'Community',
    body: "You don't have to do this alone. That's the whole point.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="9" cy="8" r="3" stroke="#C4857A" strokeWidth="1.5"/>
        <circle cx="17" cy="9" r="2.5" stroke="#C4857A" strokeWidth="1.5"/>
        <path d="M3 20c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="#C4857A" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M17 14c2.209 0 4 1.791 4 4" stroke="#C4857A" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
}

export default function MethodSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="method"
      className="relative py-14 md:py-20 px-6 overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #FAF6F2 0%, #F5EDE6 100%)' }}
    >
      {/* Subtle background texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 80%, rgba(196,168,130,0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(242,196,206,0.1) 0%, transparent 50%)
          `,
        }}
      />

      <div className="max-w-7xl mx-auto" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-10 md:mb-14"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <PetalMark size={16} color="#C4857A" />
            <span className="font-sans text-xs tracking-widest2 uppercase text-rosegold">The Method</span>
            <PetalMark size={16} color="#C4857A" />
          </div>
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl text-espresso font-light italic">
            Four pillars. <span className="font-semibold not-italic">One life.</span>
          </h2>
        </motion.div>

        {/* Pillars grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.number}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              whileHover={{
                y: -10,
                boxShadow: '0 24px 64px rgba(232,164,160,0.25)',
              }}
              transition={{ duration: 0.35 }}
              className="group relative bg-sakura/80 border border-petal/40 p-8 md:p-10 rounded-sm hover:border-blush/60 transition-colors duration-300"
            >
              {/* Number */}
              <div className="flex items-center justify-between mb-8">
                <span
                  className="font-display text-5xl md:text-6xl font-light text-rosegold/20 group-hover:text-rosegold/35 transition-colors duration-300 leading-none"
                >
                  {pillar.number}
                </span>
                <div className="opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                  {pillar.icon}
                </div>
              </div>

              {/* Headline */}
              <h3 className="font-display text-3xl md:text-4xl text-espresso font-light italic mb-4 group-hover:text-rosegold transition-colors duration-300">
                {pillar.headline}
              </h3>

              {/* Divider */}
              <div className="w-8 h-px bg-rosegold/40 mb-5 group-hover:w-16 transition-all duration-500" />

              {/* Body */}
              <p className="font-sans text-sm leading-relaxed text-espresso/60 group-hover:text-espresso/80 transition-colors duration-300">
                {pillar.body}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7, duration: 1 }}
          className="text-center mt-10 md:mt-14"
        >
          <p className="font-display text-2xl md:text-3xl italic text-espresso/40">
            "The work is simple. The results are real."
          </p>
        </motion.div>
      </div>
    </section>
  )
}
