'use client'

import Hero from '@/components/Hero'
import Player from '@/components/Player'

export default function Home() {
  return (
    <main className="w-full bg-black">
      <Hero />
      <Player />
    </main>
  )
}