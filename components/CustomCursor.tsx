'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'

// ─── Types ────────────────────────────────────────────────────────────────────
interface FallingPetal {
  id: number
  x: number       // spawn left (px, viewport)
  y: number       // spawn top  (px, viewport)
  size: number    // diameter 7–15px
  rotation: number
  color: string
  driftX: number  // final horizontal offset from spawn
  driftY: number  // final vertical drop from spawn
  spin: number    // final rotation at end of fall
}

// ─── Constants ────────────────────────────────────────────────────────────────
const PETAL_COLORS = ['#F2C4CE', '#E8A4A0', '#C4857A', '#FAD9DF', '#FAF6F2']
const MIN_SPAWN_DIST = 45   // px of movement before spawning a new petal
const MIN_SPAWN_MS   = 90   // ms between spawns regardless of distance
const MAX_PETALS     = 14   // max live petal fragments in the DOM
let uid = 0

// ─── Component ────────────────────────────────────────────────────────────────
export default function CustomCursor() {
  const [petals,     setPetals]     = useState<FallingPetal[]>([])
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible,  setIsVisible]  = useState(false)

  // Raw motion values — updated synchronously on every mousemove
  const rawX = useMotionValue(-200)
  const rawY = useMotionValue(-200)

  // Springs give the blossom a silky lag behind the real cursor.
  // High stiffness = responsive. Lower damping = slight overshoot / organic feel.
  const x = useSpring(rawX, { stiffness: 480, damping: 36, mass: 0.25 })
  const y = useSpring(rawY, { stiffness: 480, damping: 36, mass: 0.25 })

  // Refs to throttle petal spawning without re-rendering
  const lastSpawnPos  = useRef({ x: 0, y: 0 })
  const lastSpawnTime = useRef(0)

  // Create one falling-petal particle with random drift baked in at spawn time
  const spawnPetal = useCallback((cx: number, cy: number) => {
    const id    = ++uid
    const size  = 7  + Math.random() * 8
    const color = PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)]

    const petal: FallingPetal = {
      id,
      x:        cx,
      y:        cy,
      size,
      rotation: Math.random() * 360,
      color,
      driftX:   (Math.random() - 0.5) * 55,
      driftY:   55 + Math.random() * 45,
      spin:     (Math.random() > 0.5 ? 1 : -1) * (140 + Math.random() * 120),
    }

    setPetals(prev => [...prev.slice(-(MAX_PETALS - 1)), petal])

    // Remove from state after the animation finishes
    setTimeout(() => setPetals(prev => prev.filter(p => p.id !== id)), 1400)
  }, [])

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX)
      rawY.set(e.clientY)
      setIsVisible(true)

      // Distance-based + time-based spawn throttle
      const dx   = e.clientX - lastSpawnPos.current.x
      const dy   = e.clientY - lastSpawnPos.current.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      const now  = Date.now()

      if (dist > MIN_SPAWN_DIST && now - lastSpawnTime.current > MIN_SPAWN_MS) {
        spawnPetal(e.clientX, e.clientY)
        lastSpawnPos.current = { x: e.clientX, y: e.clientY }
        lastSpawnTime.current = now
      }
    }

    const onLeave = () => setIsVisible(false)
    const onEnter = () => setIsVisible(true)
    const onHoverIn  = () => setIsHovering(true)
    const onHoverOut = () => setIsHovering(false)

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)

    const interactives = document.querySelectorAll('a, button, [role="button"]')
    interactives.forEach(el => {
      el.addEventListener('mouseenter', onHoverIn)
      el.addEventListener('mouseleave', onHoverOut)
    })

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      interactives.forEach(el => {
        el.removeEventListener('mouseenter', onHoverIn)
        el.removeEventListener('mouseleave', onHoverOut)
      })
    }
  }, [rawX, rawY, spawnPetal])

  return (
    <>
      {/* ── Falling petal trail ─────────────────────────────────────────── */}
      <AnimatePresence>
        {petals.map(petal => (
          <motion.div
            key={petal.id}
            className="fixed pointer-events-none z-[9998]"
            // `left` / `top` pin the spawn origin; x/y/rotate animate FROM there
            style={{
              left:   petal.x - petal.size / 2,
              top:    petal.y - petal.size / 2,
              width:  petal.size,
              height: petal.size,
            }}
            initial={{ opacity: 0.75, scale: 1,   x: 0, y: 0, rotate: petal.rotation }}
            animate={{ opacity: 0,    scale: 0.25, x: petal.driftX, y: petal.driftY, rotate: petal.rotation + petal.spin }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <SinglePetal color={petal.color} />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* ── Main cherry blossom cursor ──────────────────────────────────── */}
      <motion.div
        className="fixed pointer-events-none z-[9999]"
        style={{
          x,
          y,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ opacity: { duration: 0.2 } }}
      >
        {/* Scale wrapper: blooms larger on hover */}
        <motion.div
          animate={{ scale: isHovering ? 1.9 : 1 }}
          transition={{ type: 'spring', stiffness: 380, damping: 22 }}
        >
          {/* Rotation wrapper: constant slow spin */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
          >
            <BlossomSVG isHovering={isHovering} />
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  )
}

// ─── Cherry blossom SVG ───────────────────────────────────────────────────────
// 5 petals + 6 stamens + center dot — all inline, no external file needed
function BlossomSVG({ isHovering }: { isHovering: boolean }) {
  const petalFill   = isHovering ? '#F2C4CE' : '#C4857A'
  const stamenColor = isHovering ? '#E8A4A0' : '#FAF6F2'
  const centerFill  = isHovering ? '#E8A4A0' : '#FAF6F2'

  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block' }}
    >
      <g transform="translate(20 20)">
        {/* 5 petals — each is an ellipse rotated around the center */}
        {[0, 72, 144, 216, 288].map((angle, i) => (
          <g key={i} transform={`rotate(${angle})`}>
            <motion.ellipse
              cx={0}
              cy={-8.5}
              rx={4.8}
              ry={9.5}
              fill={petalFill}
              animate={{
                rx: isHovering ? 5.8 : 4.8,
                ry: isHovering ? 11  : 9.5,
                cy: isHovering ? -9.5 : -8.5,
              }}
              transition={{ duration: 0.35, delay: i * 0.04, ease: 'easeOut' }}
              opacity={0.92}
            />
          </g>
        ))}

        {/* 6 stamens radiating from center */}
        {[0, 60, 120, 180, 240, 300].map((angle, i) => {
          const rad = (angle * Math.PI) / 180
          return (
            <motion.line
              key={`st-${i}`}
              x1={0}
              y1={0}
              x2={Math.cos(rad) * 4.5}
              y2={Math.sin(rad) * 4.5}
              stroke={stamenColor}
              strokeWidth={0.9}
              strokeLinecap="round"
              animate={{ opacity: isHovering ? 1 : 0.7 }}
              transition={{ duration: 0.3 }}
            />
          )
        })}

        {/* Center */}
        <motion.circle
          cx={0}
          cy={0}
          r={2.2}
          fill={centerFill}
          animate={{ r: isHovering ? 2.8 : 2.2 }}
          transition={{ duration: 0.3 }}
        />
      </g>
    </svg>
  )
}

// ─── Single falling petal fragment ───────────────────────────────────────────
// A simple teardrop/ellipse — lightweight, renders fast
function SinglePetal({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 20 28" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <ellipse cx="10" cy="14" rx="7" ry="12" fill={color} opacity="0.72" />
    </svg>
  )
}
