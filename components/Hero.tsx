'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'

export default function Hero() {
  const titleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const title = titleRef.current
    if (!title) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = title.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      title.style.setProperty('--mouse-x', `${x}px`)
      title.style.setProperty('--mouse-y', `${y}px`)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Background Gradient with Glitch */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-screen filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-magenta-600 rounded-full mix-blend-screen filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
      </div>

      {/* Scanlines */}
      <div className="absolute inset-0 pointer-events-none scanlines"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Logo */}
        <div className="mb-8 inline-block relative">
          <div className="absolute inset-0 bg-cyan-500/20 blur-xl rounded-full"></div>
          <Image
            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 80'%3E%3Ctext x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-size='48' font-weight='bold' fill='white' font-family='system-ui'%3EPEAK%3C/text%3E%3C/svg%3E"
            alt="Peak Magnetic"
            width={200}
            height={80}
            className="relative z-20 drop-shadow-lg"
          />
        </div>

        {/* Main Title with Glitch */}
        <div
          ref={titleRef}
          className="relative mb-6 group"
          style={{
            '--mouse-x': '0px',
            '--mouse-y': '0px',
          } as React.CSSProperties}
        >
          <h1 className="text-7xl md:text-8xl font-black tracking-tighter leading-tight relative z-10">
            <span className="glitch inline-block" data-text="MAGNETIC">
              MAGNETIC
            </span>
          </h1>

          {/* RGB Split Effect on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <h1 className="text-7xl md:text-8xl font-black tracking-tighter leading-tight blur-sm text-cyan-500 mix-blend-screen">
              MAGNETIC
            </h1>
          </div>
        </div>

        {/* Subtitle */}
        <p className="text-gray-400 text-lg md:text-xl mb-12 font-light tracking-widest">
          IBIZA ELECTRONIC MUSIC RADIO
        </p>

        {/* Decorative Line */}
        <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 via-magenta-500 to-cyan-500 mx-auto mb-12 animate-pulse"></div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="px-8 py-4 bg-cyan-500 hover:bg-cyan-600 text-black font-bold rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 text-lg">
            LISTEN LIVE
          </button>
          <button className="px-8 py-4 border-2 border-cyan-500 hover:bg-cyan-500/10 text-cyan-400 font-bold rounded-lg transition-all duration-200">
            EXPLORE
          </button>
        </div>
      </div>

      {/* Bottom Accent */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
    </section>
  )
}
