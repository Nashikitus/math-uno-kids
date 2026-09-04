'use client'

import { useEffect, useRef } from 'react'

const PLAYER_SCRIPT = 'https://scripts.converteai.net/cae5b100-485e-4109-be60-ea8cd512b8d7/players/6a9a4c333b0e064f20b83058/v4/player.js'

export function VturbPlayer() {
  const hostRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return

    host.innerHTML = '<vturb-smartplayer id="vid-6a9a4c333b0e064f20b83058" style="display:block;margin:0 auto;width:100%;max-width:400px"><div class="vturb-player-placeholder" style="position:relative;width:100%;padding:177.77777777777777% 0 0;z-index:0;background-color:black"></div></vturb-smartplayer>'

    const script = document.createElement('script')
    script.src = PLAYER_SCRIPT
    script.async = true
    document.head.appendChild(script)

    return () => {
      script.remove()
      host.replaceChildren()
    }
  }, [])

  return <div ref={hostRef} className="vturb-host" aria-label="Player do vídeo" />
}
