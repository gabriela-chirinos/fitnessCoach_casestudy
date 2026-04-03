'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import heroImage from '../assets/IMAGE1.png'

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section
      ref={containerRef}
      className="relative h-screen min-h-[700px] overflow-hidden grain"
      id="hero"
    >
      {/* Background image with parallax */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 scale-110">
        <Image
          src={heroImage}
          alt="Coach hero"
          fill
          priority
          className="object-cover object-center"
        />
      </motion.div>

      {/* Overlay: dark left-to-right gradient + bottom fade for text legibility */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background: `
            linear-gradient(105deg, rgba(44,31,26,0.82) 0%, rgba(44,31,26,0.52) 45%, rgba(44,31,26,0.12) 100%),
            linear-gradient(to top, rgba(44,31,26,0.65) 0%, rgba(44,31,26,0.1) 45%, transparent 70%)
          `,
        }}
      />

      {/* Content — bottom-left editorial layout */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-20 h-full flex flex-col justify-center md:justify-end pt-20 md:pt-0 pb-10 md:pb-24 px-8 md:px-16 lg:px-24"
      >
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 flex items-center gap-3"
        >
          <span className="block w-10 h-px bg-petal/60" />
          <span className="font-sans text-[11px] tracking-widest3 uppercase text-petal/80">
            Personal Training
          </span>
        </motion.div>

        {/* Headline block */}
        <div className="mb-7 md:mb-9">
          {/* Line 1 */}
          <div className="overflow-hidden">
            <motion.h1
              className="font-display text-[clamp(1.9rem,6.5vw,6rem)] text-sakura leading-[0.92] tracking-tight font-light italic"
              initial={{ x: -70, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 1.05, ease: [0.16, 1, 0.3, 1] }}
              
            >
              Begin where you are. 
            </motion.h1>
          </div>

          {/* Line 2: bold word + italic tagline on the same baseline */}
          <div className="overflow-hidden flex items-baseline flex-wrap gap-x-5 gap-y-1">
            <motion.h1
              className="font-display text-[clamp(1.9rem,6.5vw,6rem)] text-petal leading-[0.92] tracking-tight font-semibold"
              initial={{ x: -70, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.65, duration: 1.05, ease: [0.16, 1, 0.3, 1] }}
            >
              Your practice
            </motion.h1>
            <motion.span
              className="font-display text-[clamp(1.1rem,3.5vw,3.2rem)] text-rosegold/85 leading-none italic font-light"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.82, duration: 1.05, ease: [0.16, 1, 0.3, 1] }}
            >
              starts here.
            </motion.span>
          </div>
        </div>

        {/* Bottom row: sublines left, CTA right */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-end justify-between flex-wrap gap-6"
        >
          <div>
            <p className="font-sans text-sm md:text-base text-sakura/70 tracking-widest mb-1">
              Online coaching · Nutrition · Community
            </p>
            <p className="font-sans text-xs md:text-sm text-sakura/45 tracking-wider">
              for women ready to do the work.
            </p>
          </div>

      
        </motion.div>
      </motion.div>

      {/* Scroll indicator — bottom center */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
      >
        <span className="font-sans text-[10px] tracking-widest2 uppercase text-sakura/35">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-8 bg-gradient-to-b from-sakura/35 to-transparent"
        />
      </motion.div>
    </section>
  )
}
