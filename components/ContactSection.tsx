'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import PetalMark from './PetalMark'

export default function ContactSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="contact"
      className="relative py-16 md:py-20 px-6 overflow-hidden bg-espresso grain"
    >
      {/* Subtle warm glow — no flowers, just atmosphere */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 50% 70% at 50% 50%, rgba(196,133,122,0.1) 0%, transparent 60%),
            radial-gradient(ellipse 80% 40% at 20% 100%, rgba(196,168,130,0.05) 0%, transparent 50%)
          `,
        }}
      />

      <div className="max-w-xl mx-auto text-center relative z-10" ref={ref}>
        {/* Top rule with petal mark */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <span className="block w-12 h-px bg-petal/30" />
          <PetalMark size={18} color="#C4857A" />
          <span className="block w-12 h-px bg-petal/30" />
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-6xl sm:text-7xl md:text-8xl text-sakura font-light italic leading-none mb-6"
        >
          Strong
          <span className="text-petal"> looks good on you.</span>
        </motion.h2>

        {/* Sub copy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.9 }}
          className="mb-8 space-y-2"
        >
          <p className="font-sans text-sm text-sakura/50 tracking-wide">
            Limited spots available.
          </p>
          <p className="font-sans text-xs text-rosegold/60 tracking-widest2 uppercase">
            Applications open now
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.45, duration: 0.9 }}
          className="mb-10"
        >
          <motion.a
            href="mailto:hello@elenavasquez.com"
            whileHover={{ scale: 1.02 }}
            className="btn-sweep inline-block font-sans text-xs tracking-widest2 uppercase px-12 py-4 bg-rosegold text-sakura hover:text-espresso transition-colors duration-500 relative z-10"
          >
            Apply Now
          </motion.a>
        </motion.div>

        {/* Email */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.65, duration: 0.9 }}
        >
          <a
            href="mailto:hello@esoku.com"
            className="font-mono text-xs text-sakura/25 hover:text-rosegold/60 transition-colors duration-300 tracking-widest"
          >
            hello@esoku.com
          </a>
        </motion.div>
      </div>
    </section>
  )
}
