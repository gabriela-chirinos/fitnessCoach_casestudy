'use client'

import { motion } from 'framer-motion'
import PetalMark from './PetalMark'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Method', href: '#method' },
  { label: 'Programs', href: '#programs' },
  { label: 'Results', href: '#results' },
  { label: 'Community', href: '#community' },
]

const socialLinks = [
  {
    label: 'IG',
    href: 'https://instagram.com',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
      </svg>
    ),
  },
  {
    label: 'TT',
    href: 'https://tiktok.com',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: 'YT',
    href: 'https://youtube.com',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="5" width="20" height="14" rx="3" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M10 9l5 3-5 3V9z" fill="currentColor"/>
      </svg>
    ),
  },
]

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
  const handleLinkClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault()
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="relative bg-espresso border-t border-sakura/5 px-6 py-16 overflow-hidden">
      {/* Subtle warmth at top */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(196,133,122,0.4) 50%, transparent 100%)',
        }}
      />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-16">
          {/* Logo col */}
          <div>
            <button onClick={scrollToTop} className="flex items-center gap-2.5 group mb-4">
              <PetalMark size={20} color="#C4857A" />
              <span className="font-display text-lg tracking-widest2 font-light text-sakura/80 group-hover:text-sakura transition-colors">
                Xiomara S.
              </span>
            </button>
            <p className="font-sans text-xs text-sakura/30 leading-relaxed max-w-xs">
              Online coaching, nutrition, and community for women ready to do the work. Miami · Worldwide.
            </p>
          </div>

          {/* Navigation col */}
          <div>
            <p className="font-sans text-[10px] tracking-widest3 uppercase text-sakura/30 mb-5">Navigate</p>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="font-sans text-xs tracking-wide text-sakura/40 hover:text-petal transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact col */}
          <div>
            <p className="font-sans text-[10px] tracking-widest3 uppercase text-sakura/30 mb-5">Connect</p>
            <div className="flex gap-4 mb-6">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sakura/30 hover:text-petal transition-colors duration-300"
                  aria-label={s.label}
                >
                  {s.icon}
                </a>
              ))}
            </div>
            <a
              href="mailto:hello@elenavasquez.com"
              className="font-mono text-[10px] text-sakura/25 hover:text-rosegold/60 transition-colors duration-300 tracking-widest block"
            >
              hello@soku.com
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-sakura/5 mb-8" />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-sans text-[10px] text-sakura/20 tracking-wide">
            © {new Date().getFullYear()} Xiomara S. All rights reserved.
          </p>

          {/* Closing line */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1.5 }}
            className="font-display text-base italic text-sakura/30 hover:text-petal/50 transition-colors duration-500"
          >
            Begin your journey today.
          </motion.p>

          <div className="flex items-center gap-4">
            <a href="#" className="font-sans text-[10px] text-sakura/20 hover:text-sakura/40 transition-colors tracking-wide">Privacy</a>
            <span className="text-sakura/15">·</span>
            <a href="#" className="font-sans text-[10px] text-sakura/20 hover:text-sakura/40 transition-colors tracking-wide">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
