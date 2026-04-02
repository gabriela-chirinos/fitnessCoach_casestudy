'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import PetalMark from './PetalMark'
import testimonialImg1 from '../assets/Testimonial1.png'
import testimonialImg2 from '../assets/testimonial2.png'
import testimonialImg3 from '../assets/testimonial3.png'

const testimonialImages = [testimonialImg1, testimonialImg2, testimonialImg3]

const testimonials = [
  {
    quote: 'She made it simple enough to actually stick to.',
    name: 'Jasmine',
    location: 'Miami',
    detail: 'Lost 15 lbs · 4 months',
    accent: '#E8A4A0',
    accentText: '#7A3A36',
  },
  {
    quote: 'I stopped starting over.',
    name: 'Priya',
    location: 'LA',
    detail: 'The Method · 16 weeks',
    accent: '#F2C4CE',
    accentText: '#7A4850',
  },
  {
    quote: "I didn't change my life. I just changed my habits.",
    name: 'Kezia',
    location: 'New Mexico',
    detail: 'Inner Circle · Ongoing',
    accent: '#C4A882',
    accentText: '#5C3D24',
  },
]

const stats = [
  { number: '200+', label: 'Women Coached' },
  { number: '94%',  label: 'Retention Rate' },
  { number: '4.9',  label: 'Avg Rating' },
  { number: '3 yrs', label: 'In Practice' },
]

export default function TransformationSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="results"
      className="relative py-16 md:py-24 px-5 overflow-hidden bg-sakura"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 50% 50% at 10% 90%, rgba(232,164,160,0.10) 0%, transparent 60%),
            radial-gradient(ellipse 40% 40% at 90% 10%, rgba(196,168,130,0.07) 0%, transparent 60%)
          `,
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10" ref={ref}>

        {/* ── Section header ───────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-10 md:mb-14"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <PetalMark size={14} color="#C4857A" />
            <span className="font-sans text-[11px] tracking-widest2 uppercase text-rosegold">Transformations</span>
            <PetalMark size={14} color="#C4857A" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-espresso font-light italic mb-8">
            Real women.{' '}
            <span className="font-semibold not-italic">Real results.</span>
          </h2>

          {/* Stats bar */}
          <div className="grid grid-cols-4 gap-3 py-5 px-4 border border-petal/35 rounded-2xl bg-white/40 max-w-lg mx-auto">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <p className="font-display text-xl md:text-3xl text-espresso font-light">{stat.number}</p>
                <p className="font-sans text-[9px] tracking-widest uppercase text-espresso/38 mt-1 leading-tight">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Testimonial cards ────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: 0.18 + i * 0.12,
                duration: 0.85,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -4, transition: { type: 'spring', stiffness: 380, damping: 22 } }}
              className="group flex flex-col rounded-2xl overflow-hidden bg-white border border-petal/30"
              style={{
                boxShadow: '0 4px 24px rgba(196,133,122,0.10), 0 1px 4px rgba(44,31,26,0.05)',
              }}
            >
              {/* Testimonial photo */}
              <div className="relative w-full h-36 md:h-44 overflow-hidden">
                <Image
                  src={testimonialImages[i]}
                  alt={`${t.name}'s transformation`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ objectPosition: '50% 30%' }}
                  sizes="(max-width: 768px) 90vw, 33vw"
                />
                {/* Subtle warm overlay */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `linear-gradient(to bottom, transparent 50%, rgba(44,31,26,0.35) 100%)`,
                  }}
                />
                {/* Name stamp over photo */}
                <div className="absolute bottom-3 left-4 z-10">
                  <p className="font-display text-sm italic text-sakura/90">{t.name}</p>
                  <p className="font-sans text-[9px] tracking-wide text-sakura/60">{t.location}</p>
                </div>
              </div>

              {/* Quote + attribution */}
              <div className="p-4 flex flex-col flex-1">
                <p className="font-display text-base md:text-lg italic text-espresso leading-snug mb-3 flex-grow">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <span
                  className="self-start font-sans text-[9px] tracking-wide uppercase rounded-full px-2.5 py-1"
                  style={{
                    backgroundColor: `${t.accent}20`,
                    color: t.accentText,
                  }}
                >
                  {t.detail}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7, duration: 1 }}
          className="text-center mt-10"
        >
          <p className="font-display text-lg italic text-espresso/40 mb-5">
            Your story is still being written.
          </p>
          <a
            href="#programs"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#programs')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="btn-sweep inline-block font-sans text-xs tracking-widest2 uppercase px-8 py-3.5 border border-rosegold text-rosegold hover:text-espresso transition-colors duration-500"
          >
            See the Programs
          </a>
        </motion.div>

      </div>
    </section>
  )
}
