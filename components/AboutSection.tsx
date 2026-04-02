'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import PetalMark, { GhostPetal } from './PetalMark'
import videoSrc from '../assets/cardVideo.mp4'

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  }),
}

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="about"
      ref={ref}
      className="relative bg-sakura py-14 md:py-20 px-6 overflow-hidden"
    >
      {/* Background petal watermark */}
      <div className="absolute right-[-8%] top-1/2 -translate-y-1/2 pointer-events-none">
        <GhostPetal
          size={420}
          color="#F2C4CE"
          style={{ opacity: 0.1 }}
          className="animate-float"
        />
      </div>

      {/* Monogram watermark */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none"
        style={{ opacity: 0.035 }}
      >
        <span
          className="font-display font-bold text-[28vw] text-espresso leading-none"
          style={{ letterSpacing: '-0.05em' }}
        >
          X
        </span>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-14 lg:gap-20 items-center">

          {/* Left — compact video portrait */}
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="relative order-2 lg:order-1 flex justify-center lg:justify-start"
          >
            {/* Outer decorative offset border */}
            <div
              className="relative"
              style={{ padding: '0' }}
            >
              {/* Offset shadow border */}
              <div
                className="absolute border border-petal/35"
                style={{
                  inset: '-8px',
                  borderRadius: '2px',
                  pointerEvents: 'none',
                }}
              />

              {/* Video card */}
              <div
                className="relative overflow-hidden rounded-sm"
                style={{
                  width: 'clamp(200px, 28vw, 270px)',
                  aspectRatio: '3 / 4',
                }}
              >
                {/* Video */}
                <video
                  src={videoSrc}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Warm tone overlay — preserves brand palette feel over video */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `
                      linear-gradient(to bottom, rgba(44,31,26,0) 45%, rgba(44,31,26,0.65) 100%),
                      rgba(196,133,122,0.08)
                    `,
                    mixBlendMode: 'multiply',
                  }}
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(to bottom, transparent 50%, rgba(44,31,26,0.55) 100%)',
                  }}
                />

                {/* Name stamp — bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                  <p className="font-display text-base text-sakura/85 italic leading-tight">Xiomara S.</p>
                  <p className="font-sans text-[10px] tracking-widest2 uppercase text-sakura/50 mt-0.5">
                    Coach · Miami
                  </p>
                </div>

                {/* Petal stamp top-right */}
                <div className="absolute top-3 right-3 z-10">
                  <PetalMark size={18} color="#FAF6F2" opacity={0.45} />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right — copy */}
          <div className="order-1 lg:order-2">
            {/* Section label */}
            <motion.div
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="flex items-center gap-3 mb-8"
            >
              <PetalMark size={18} color="#C4857A" />
              <span className="font-sans text-xs tracking-widest2 uppercase text-rosegold">About</span>
            </motion.div>

            {/* Headline */}
            <motion.h2
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="font-display text-5xl md:text-6xl lg:text-7xl text-espresso leading-tight font-light italic mb-10"
            >
              I didn&apos;t find <br />
              <span className="font-semibold not-italic text-rosegold">the shortcut.</span>
              <br />
              I found the work.
            </motion.h2>

            {/* Body copy */}
            {[
              "I'm not here to sell you a quick fix.",
              "I'm here because I know what it feels like to want more — more energy, more confidence, more strength — and not know where to start.",
              "I figured it out. Now I help other women do the same.",
            ].map((para, i) => (
              <motion.p
                key={i}
                custom={i + 2}
                variants={fadeUp}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                className={`font-sans text-base md:text-lg leading-relaxed mb-5 ${
                  i === 2 ? 'text-espresso font-medium' : 'text-espresso/70'
                }`}
              >
                {para}
              </motion.p>
            ))}

            {/* Closing line */}
            <motion.p
              custom={5}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="font-display text-2xl md:text-3xl italic text-sand mt-2"
            >
              Simple. Consistent. Real.
            </motion.p>

            {/* Signature line */}
            <motion.div
              custom={6}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="flex items-center gap-4 mt-10 pt-8 border-t border-petal/40"
            >
              <PetalMark size={20} color="#C4857A" />
              <div>
                <p className="font-display text-lg italic text-espresso/60">Xiomara S.</p>
                <p className="font-sans text-xs tracking-widest uppercase text-espresso/40 mt-0.5">
                  NASM CPT · Nutrition Coach
                </p>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}
