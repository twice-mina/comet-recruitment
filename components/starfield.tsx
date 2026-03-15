'use client'

// Stable star/shooting-star data generated once (not on every render)
const stars = Array.from({ length: 80 }, (_, i) => ({
  id: i,
  x: ((i * 127.3 + 43.7) % 100),
  y: ((i * 83.1 + 17.9) % 100),
  size: (i % 5) * 0.5 + 0.5,  // 0.5–2.5px
  delay: (i % 40) * 0.1,       // 0–4s
  duration: (i % 30) * 0.1 + 2, // 2–5s
}))

const shootingStars = [
  { id: 0, top: 15, delay: 2 },
  { id: 1, top: 35, delay: 6 },
  { id: 2, top: 55, delay: 10 },
]

export function Starfield() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Twinkling stars */}
      {stars.map(star => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white animate-twinkle"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
          }}
        />
      ))}

      {/* Shooting stars */}
      {shootingStars.map(s => (
        <div
          key={s.id}
          className="absolute h-px bg-gradient-to-r from-transparent via-white to-transparent animate-shoot"
          style={{
            top: `${s.top}%`,
            width: '120px',
            animationDelay: `${s.delay}s`,
            animationDuration: '6s',
          }}
        />
      ))}
    </div>
  )
}
