'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image, { StaticImageData } from 'next/image'
import PetalMark from './PetalMark'
import deadliftImg from '../assets/deadlift.png'
import onFloorImg from '../assets/onfloorpng.png'
import threeGirlsImg from '../assets/3girls.png'
import nutritionImg from '../assets/nutrition.png'
import sidebackImg from '../assets/sidebackpng.png'
import sideProfileImg from '../assets/side profile.png'

interface GridItem {
  type: 'tall' | 'square' | 'wide'
  caption: string
  tag: string
  gradient?: string
  img?: StaticImageData
  imgPosition?: string // CSS object-position
}

const gridItems: GridItem[] = [
  {
    type: 'tall',
    caption: 'Morning movement',
    tag: 'Training',
    img: deadliftImg,
    imgPosition: 'center center',
  },
  {
    type: 'square',
    caption: 'Sunday meal prep',
    tag: 'Nutrition',
    img: nutritionImg,
    imgPosition: 'center center',
  },
  {
    type: 'square',
    caption: 'Real results',
    tag: 'Results',
    img: sidebackImg,
    imgPosition: 'center bottom',
  },
  {
    type: 'wide',
    caption: 'The work behind the work',
    tag: 'Behind the scenes',
    img: onFloorImg,
    imgPosition: '50% 60%',
  },
  {
    type: 'square',
    caption: 'Your body is not your enemy',
    tag: 'The Plan',
    img: sideProfileImg,
    imgPosition: 'center center',
  },
  {
    type: 'square',
    caption: 'Our community',
    tag: 'Community',
    img: threeGirlsImg,
    imgPosition: 'center center',
  },
]

const communityStats = [
  { number: '42K', label: 'Followers' },
  { number: 'Daily', label: 'Content' },
  { number: 'Free', label: 'Resources' },
]

export default function CommunitySection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="community"
      className="relative py-28 md:py-40 px-6 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #FAF6F2 0%, #F5ECE8 100%)' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(242,196,206,0.12) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10" ref={ref}>
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-end mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 mb-6">
              <PetalMark size={16} color="#C4857A" />
              <span className="font-sans text-xs tracking-widest2 uppercase text-rosegold">Community</span>
            </div>
            <h2 className="font-display text-5xl md:text-6xl lg:text-7xl text-espresso font-light leading-tight">
              This is the part <br />
              where you realise <br />
              <span className="font-semibold italic text-rosegold">you&apos;ve found</span>
              <br />
              <span className="font-semibold italic text-rosegold">your people.</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.9 }}
          >
            <p className="font-sans text-base text-espresso/60 leading-relaxed mb-8 max-w-sm">
              Real daily content. Honest conversations. A community that shows up for itself, every single day.
            </p>

            <div className="grid grid-cols-3 gap-4 mb-8">
              {communityStats.map((stat, i) => (
                <div key={i}>
                  <p className="font-display text-4xl text-espresso font-light">{stat.number}</p>
                  <p className="font-sans text-xs tracking-widest uppercase text-espresso/40 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-sweep inline-flex items-center gap-3 font-sans text-xs tracking-widest2 uppercase px-8 py-4 bg-espresso text-sakura hover:text-espresso transition-colors duration-500 group"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
                <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.5"/>
                <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.5"/>
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
              </svg>
              Join the Community
            </a>
          </motion.div>
        </div>

        {/* Instagram-style grid */}
        <div className="grid grid-cols-3 gap-2 md:gap-3">
          {gridItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.1 + i * 0.07, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.02, zIndex: 10 }}
              className={`relative overflow-hidden rounded-sm group ${
                item.type === 'wide' ? 'col-span-2' : item.type === 'tall' ? 'row-span-2' : 'col-span-1'
              }`}
              style={{
                aspectRatio: item.type === 'wide' ? '16/9' : item.type === 'tall' ? '1/2' : '1/1',
              }}
            >
              {/* Background — real image or gradient fallback */}
              {item.img ? (
                <Image
                  src={item.img}
                  alt={item.caption}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ objectPosition: item.imgPosition ?? 'center center' }}
                  sizes="(max-width: 768px) 33vw, 25vw"
                />
              ) : (
                <div
                  className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                  style={{ background: item.gradient }}
                />
              )}

              {/* Warm overlay — softens photos into brand palette */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(to bottom, rgba(44,31,26,0.08) 0%, rgba(44,31,26,0.28) 100%)',
                  mixBlendMode: item.img ? 'multiply' : 'normal',
                }}
              />

              {/* Hover light bloom */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse at 50% 30%, rgba(255,235,215,0.18) 0%, transparent 60%)',
                }}
              />

              {/* Tag */}
              <div className="absolute top-3 left-3 z-10">
                <span className="font-sans text-[9px] tracking-widest uppercase text-sakura/80 bg-espresso/35 px-2 py-1 backdrop-blur-sm">
                  {item.tag}
                </span>
              </div>

              {/* Caption on hover */}
              <div
                className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10"
                style={{ background: 'linear-gradient(to top, rgba(44,31,26,0.65) 0%, transparent 55%)' }}
              >
                <p className="font-sans text-xs text-sakura/90 tracking-wide">{item.caption}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7, duration: 1 }}
          className="text-center mt-12 font-sans text-xs text-espresso/35 tracking-wide"
        >
          Follow along for daily training, nutrition, and real talk.
        </motion.p>
      </div>
    </section>
  )
}
