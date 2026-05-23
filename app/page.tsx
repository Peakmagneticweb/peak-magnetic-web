'use client'

import { useState, useRef } from 'react'

const STREAM_URL = 'https://sonic.sistemahost.es:8122/stream'

export default function Home() {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const togglePlay = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play().catch(() => setIsPlaying(false))
      setIsPlaying(true)
    }
  }

  return (
    <main className="w-full min-h-screen bg-black flex flex-col items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-screen filter blur-3xl opacity-10"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-600 rounded-full mix-blend-screen filter blur-3xl opacity-10"></div>
      </div>

      <div className="relative z-10 text-center max-w-2xl">
        <div className="mb-12">
          <h1 className="text-8xl md:text-9xl font-black tracking-tighter mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              PEAK
            </span>
          </h1>
          <h2 className="text-6xl md:text-7xl font-black tracking-tighter text-white">
            MAGNETIC
          </h2>
        </div>

        <p className="text-gray-400 text-lg md:text-xl mb-12 font-light tracking-widest">
          IBIZA ELECTRONIC MUSIC RADIO
        </p>

        <audio ref={audioRef} crossOrigin="anonymous">
          <source src={STREAM_URL} type="audio/mpeg" />
        </audio>

        <button
          onClick={togglePlay}
          className="mb-8 px-12 py-6 bg-cyan-500 hover:bg-cyan-600 text-black font-bold text-xl rounded-lg transition-all transform hover:scale-110 active:scale-95"
        >
          {isPlaying ? '⏸ PAUSE' : '▶ LISTEN LIVE'}
        </button>

        <p className="text-gray-500 text-sm font-mono">
          {isPlaying ? '🔴 LIVE STREAMING' : '⚫ OFFLINE'}
        </p>
      </div>
    </main>
  )
}