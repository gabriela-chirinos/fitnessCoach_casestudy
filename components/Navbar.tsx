'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import PetalMark from './PetalMark'

const navLinks = [
  { label: 'About',     href: '#about' },
  { label: 'Method',    href: '#method' },
  { label: 'Programs',  href: '#programs' },
  { label: 'Community', href: '#community' },
]

// ─── Blossom button petal config ──────────────────────────────────────────────
// 5 petals at 72° intervals. Each has a closed/open state defined below.
const PETALS = [
  { id: 0, angle: 270 }, // top
  { id: 1, angle: 342 }, // top-right
  { id: 2, angle: 54  }, // bottom-right
  { id: 3, angle: 126 }, // bottom-left
  { id: 4, angle: 198 }, // top-left
]

// When open: petals 0,1,4 scatter; petals 2 and 3 form the × arms
const petalOpen: Record<number, { x: number; y: number; rotate: number; scale: number; opacity: number }> = {
  0: { x: 0,   y: -28, rotate: 30,  scale: 0.3, opacity: 0 }, // scatter up
  1: { x: 28,  y: -14, rotate: 80,  scale: 0.3, opacity: 0 }, // scatter right
  2: { x: 0,   y: 0,   rotate: 45,  scale: 1.0, opacity: 1 }, // ✕ arm 1
  3: { x: 0,   y: 0,   rotate: -45, scale: 1.0, opacity: 1 }, // ✕ arm 2
  4: { x: -28, y: -14, rotate: -80, scale: 0.3, opacity: 0 }, // scatter left
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Prevent body scroll while menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const handleLinkClick = (href: string) => {
    setMenuOpen(false)
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    }, 400) // let menu close first
  }

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-sakura/90 backdrop-blur-md border-b border-petal/30' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 md:h-20 flex items-center justify-between">

          {/* Logo */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
            className="flex items-center gap-2.5 group z-[60] relative"
          >
            <PetalMark size={22} color="#C4857A" />
            <span className={`font-display text-xl md:text-2xl tracking-widest2 font-light transition-colors duration-300 ${
              menuOpen ? 'text-espresso' : scrolled ? 'text-espresso' : 'text-sakura'
            }`}>
              Soku
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleLinkClick(link.href) }}
                className={`font-sans text-xs tracking-widest2 uppercase transition-all duration-300 relative group ${
                  scrolled ? 'text-espresso/60 hover:text-espresso' : 'text-sakura/70 hover:text-sakura'
                }`}
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-rosegold group-hover:w-full transition-all duration-300" />
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); handleLinkClick('#contact') }}
              className="btn-sweep font-sans text-xs tracking-widest2 uppercase px-6 py-2.5 border border-rosegold text-rosegold transition-all duration-300 hover:text-espresso"
            >
              Work With Me
            </a>
          </div>

          {/* ── Blossom hamburger button ──────────────────────────────── */}
          <BlossomButton open={menuOpen} onToggle={() => setMenuOpen(o => !o)} />

        </div>
      </motion.nav>

      {/* ── Full-screen overlay menu ──────────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && <MobileMenu onLinkClick={handleLinkClick} />}
      </AnimatePresence>
    </>
  )
}

// ─── Blossom Button ───────────────────────────────────────────────────────────
function BlossomButton({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  // Petal positions around center — each 10px from origin
  const r = 10
  const petalPos = PETALS.map(p => ({
    ...p,
    cx: Math.cos((p.angle * Math.PI) / 180) * r,
    cy: Math.sin((p.angle * Math.PI) / 180) * r,
  }))

  return (
    <button
      onClick={onToggle}
      aria-label={open ? 'Close menu' : 'Open menu'}
      className="md:hidden relative z-[60] w-11 h-11 flex items-center justify-center"
    >
      {/* Bloom background circle — pulses pink */}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{
          backgroundColor: open ? 'rgba(242,196,206,0.30)' : 'rgba(242,196,206,0)',
          scale: open ? 1 : 0.6,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      />

      {/* SVG canvas for the petals */}
      <svg width="36" height="36" viewBox="-18 -18 36 36" overflow="visible">
        {/* Slow spin wrapper — stops when open */}
        <motion.g
          animate={{ rotate: open ? 0 : 360 }}
          transition={open
            ? { duration: 0.4 }
            : { duration: 18, repeat: Infinity, ease: 'linear' }
          }
        >
          {petalPos.map((p) => {
            const target = petalOpen[p.id]
            return (
              <motion.ellipse
                key={p.id}
                cx={p.cx}
                cy={p.cy}
                rx={3.5}
                ry={7}
                fill="#F2C4CE"
                transform={`rotate(${p.angle + 90}, ${p.cx}, ${p.cy})`}
                animate={open
                  ? {
                      cx: target.x + p.cx,
                      cy: target.y + p.cy,
                      scale: target.scale,
                      opacity: target.opacity,
                      rotate: target.rotate,
                    }
                  : {
                      cx: p.cx,
                      cy: p.cy,
                      scale: 1,
                      opacity: 0.9,
                      rotate: 0,
                    }
                }
                transition={{ type: 'spring', stiffness: 260, damping: 18, delay: p.id * 0.04 }}
              />
            )
          })}

          {/* Center dot */}
          <motion.circle
            cx={0} cy={0} r={2.5}
            fill="#E8A4A0"
            animate={{ scale: open ? 1.4 : 1, fill: open ? '#C4857A' : '#E8A4A0' }}
            transition={{ duration: 0.3 }}
          />
        </motion.g>
      </svg>
    </button>
  )
}

// ─── Mobile Menu Overlay ──────────────────────────────────────────────────────
// Blooms open from top-right corner via clip-path circle expansion
const FLOATING_PETALS = [
  { size: 70,  top: '8%',  left: '5%',  dur: 7,  del: 0 },
  { size: 50,  top: '15%', left: '80%', dur: 9,  del: 1.2 },
  { size: 90,  top: '45%', left: '88%', dur: 8,  del: 0.5 },
  { size: 55,  top: '70%', left: '10%', dur: 10, del: 2 },
  { size: 40,  top: '85%', left: '65%', dur: 7,  del: 0.8 },
  { size: 60,  top: '30%', left: '50%', dur: 11, del: 1.5 },
]

const linkVariants: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.25 + i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  }),
  exit: (i: number) => ({
    opacity: 0,
    x: -20,
    transition: { delay: i * 0.05, duration: 0.3 },
  }),
}

function MobileMenu({ onLinkClick }: { onLinkClick: (href: string) => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-40 overflow-hidden"
      initial={{ clipPath: 'circle(0% at calc(100% - 44px) 40px)' }}
      animate={{ clipPath: 'circle(160% at calc(100% - 44px) 40px)' }}
      exit={{ clipPath: 'circle(0% at calc(100% - 44px) 40px)' }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      style={{
        background: 'linear-gradient(150deg, #FAF6F2 0%, #F8EEF2 40%, #F2D8DE 100%)',
      }}
    >
      {/* Floating ghost petals */}
      {FLOATING_PETALS.map((p, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none"
          style={{ top: p.top, left: p.left }}
          animate={{ y: [0, -12, 0], rotate: [0, 8, 0] }}
          transition={{ duration: p.dur, delay: p.del, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg width={p.size} height={p.size} viewBox="0 0 60 60" fill="none" opacity={0.18}>
            <g transform="translate(30 30)">
              {[0, 72, 144, 216, 288].map((a, j) => (
                <ellipse
                  key={j}
                  cx={0} cy={-10} rx={5} ry={11}
                  fill="#F2C4CE"
                  transform={`rotate(${a})`}
                />
              ))}
              <circle cx={0} cy={0} r={3} fill="#E8A4A0" />
            </g>
          </svg>
        </motion.div>
      ))}

      {/* Warm radial glow center */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(242,196,206,0.25) 0%, transparent 70%)',
        }}
      />

      {/* Nav content */}
      <div className="relative z-10 h-full flex flex-col items-start justify-center px-10 pb-16 pt-24 gap-1">

        {/* Section label */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="font-sans text-[10px] tracking-widest3 uppercase text-rosegold/60 mb-6"
        >
          Navigate
        </motion.p>

        {/* Nav links */}
        {navLinks.map((link, i) => (
          <motion.a
            key={link.label}
            href={link.href}
            custom={i}
            variants={linkVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => { e.preventDefault(); onLinkClick(link.href) }}
            className="group flex items-center gap-4 py-3"
          >
            {/* Petal bullet — blooms in on hover */}
            <motion.span
              className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <svg width="12" height="12" viewBox="0 0 40 40" fill="none">
                <g transform="translate(20 20)">
                  {[0,72,144,216,288].map((a,j) => (
                    <ellipse key={j} cx={0} cy={-7} rx={3.5} ry={7} fill="#C4857A" transform={`rotate(${a})`} />
                  ))}
                  <circle cx={0} cy={0} r={2} fill="#C4857A" />
                </g>
              </svg>
            </motion.span>

            <span className="font-display text-3xl text-espresso/80 font-light italic group-hover:text-rosegold transition-colors duration-300 leading-tight">
              {link.label}
            </span>
          </motion.a>
        ))}

        {/* CTA */}
        <motion.a
          href="#contact"
          custom={navLinks.length}
          variants={linkVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => { e.preventDefault(); onLinkClick('#contact') }}
          className="mt-8 font-sans text-xs tracking-widest2 uppercase px-8 py-3.5 rounded-full bg-rosegold text-sakura active:scale-95 transition-transform"
        >
          Work With Me
        </motion.a>

        {/* Bottom decorative line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          exit={{ scaleX: 0 }}
          transition={{ delay: 0.55, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-10 left-10 right-10 h-px bg-petal/40 origin-left"
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="absolute bottom-5 left-10 font-display text-sm italic text-espresso/30"
        >
          Strong looks good on you.
        </motion.p>

      </div>
    </motion.div>
  )
}
