'use client'

interface PetalMarkProps {
  size?: number
  color?: string
  className?: string
  opacity?: number
}

export default function PetalMark({
  size = 32,
  color = '#C4857A',
  className = '',
  opacity = 1,
}: PetalMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ opacity }}
      aria-hidden="true"
    >
      {/* Five petals arranged around center */}
      <g transform="translate(20, 20)">
        {[0, 72, 144, 216, 288].map((angle, i) => (
          <ellipse
            key={i}
            cx={0}
            cy={-7}
            rx={3.5}
            ry={7}
            fill={color}
            transform={`rotate(${angle})`}
            opacity={0.85}
          />
        ))}
        {/* Center dot */}
        <circle cx={0} cy={0} r={2} fill={color} />
      </g>
    </svg>
  )
}

/* Ghost petal for decorative floating elements */
export function GhostPetal({
  size = 60,
  color = '#F2C4CE',
  className = '',
  style,
}: {
  size?: number
  color?: string
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <g transform="translate(30, 30)">
        {[0, 72, 144, 216, 288].map((angle, i) => (
          <ellipse
            key={i}
            cx={0}
            cy={-10}
            rx={5.5}
            ry={11}
            fill={color}
            transform={`rotate(${angle})`}
          />
        ))}
        <circle cx={0} cy={0} r={3} fill={color} />
      </g>
    </svg>
  )
}
