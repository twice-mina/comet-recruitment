'use client'
import { useEffect, useState } from 'react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import type { ISourceOptions } from '@tsparticles/engine'

export function Starfield() {
  const [init, setInit] = useState(false)

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => setInit(true))
  }, [])

  const options: ISourceOptions = {
    background: { color: { value: 'transparent' } },
    fpsLimit: 60,
    particles: {
      number: { value: 120, density: { enable: true } },
      color: { value: ['#ffffff', '#c7d2fe', '#e0e7ff'] },
      shape: { type: 'circle' },
      opacity: {
        value: { min: 0.1, max: 0.8 },
        animation: {
          enable: true,
          speed: 0.8,
          sync: false,
        },
      },
      size: {
        value: { min: 0.5, max: 2.5 },
        animation: { enable: true, speed: 1, sync: false },
      },
      move: {
        enable: true,
        speed: 0.2,
        direction: 'none',
        random: true,
        straight: false,
        outModes: { default: 'out' },
      },
    },
    emitters: [
      {
        direction: 'bottom-right',
        rate: { delay: 5, quantity: 1 },
        position: { x: 0, y: 0 },
        size: { width: 0, height: 0 },
        particles: {
          color: { value: '#ffffff' },
          shape: { type: 'line' },
          opacity: { value: 0.7 },
          size: { value: { min: 1, max: 2 } },
          move: {
            enable: true,
            speed: 25,
            direction: 'bottom-right',
            straight: true,
            outModes: { default: 'out' },
          },
          life: { duration: { value: 0.5 }, count: 1 },
          rotate: { value: 45, animation: { enable: false } },
        },
      },
    ],
    detectRetina: true,
    interactivity: {
      events: { onHover: { enable: false }, onClick: { enable: false } },
    },
  }

  if (!init) return null

  return (
    <Particles
      id="starfield"
      className="absolute inset-0 pointer-events-none"
      options={options}
    />
  )
}
