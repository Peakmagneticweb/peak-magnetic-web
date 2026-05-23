'use client'

import { useEffect, useRef, useState } from 'react'

const STREAM_URL = 'https://sonic.sistemahost.es:8122/stream'

export default function Player() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  const togglePlay = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play().catch((err) => {
        console.error('Play error:', err)
      })
    }
    setIsPlaying(!isPlaying)
  }

  const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds)) return '00:00'
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => setCurrentTime(audio.currentTime)
    const updateDuration = () => setDuration(audio.duration)
    const handleEnded = () => setIsPlaying(false)

    audio.addEventListener('timeupdate', updateTime)
    audio.addEventListener('loadedmetadata', updateDuration)
    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.removeEventListener('timeupdate', updateTime)
      audio.removeEventListener('loadedmetadata', updateDuration)
      audio.removeEventListener('ended', handleEnded)
    }
  }, [isPlaying])

  return (
    <section className="w-full bg-black border-t border-gray-800 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4 tracking-widest">LISTEN LIVE</h2>
          <p className="text-gray-500 text-sm mb-4">Peak Magnetic Radio Stream</p>
        </div>

        <audio ref={audioRef} crossOrigin="anonymous">
          <source src={STREAM_URL} type="audio/mpeg" />
        </audio>

        <div className="bg-gray-950 border border-gray-800 rounded-lg p-6 backdrop-blur-sm">
          {/* Player Controls */}
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={togglePlay}
              className="w-16 h-16 bg-cyan-500 hover:bg-cyan-600 rounded-lg flex items-center justify-center transition-colors transform hover:scale-105 active:scale-95"
            >
              <span className="text-2xl font-bold text-black">
                {isPlaying ? '⏸' : '▶'}
              </span>
            </button>

            <div className="flex-1">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-mono text-gray-400">
                  {isPlaying ? 'STREAMING' : 'OFFLINE'}
                </span>
                <span className="text-xs text-gray-600 font-mono">
                  {formatTime(currentTime)}
                </span>
              </div>
              <div className="w-full bg-gray-800 h-1 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-cyan-500 to-magenta h-full transition-all"
                  style={{
                    width: duration ? `${(currentTime / duration) * 100}%` : '0%',
                  }}
                ></div>
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="text-center text-sm text-gray-400 font-mono">
            <p>🔴 LIVE BROADCAST</p>
            <p className="text-xs mt-2 text-gray-600">Electronic Music From Ibiza</p>
          </div>
        </div>
      </div>
    </section>
  )
}