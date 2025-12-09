import React, { useState } from 'react'
import { useButtonSound } from '../hooks/useButtonSound'

interface AZ5ButtonProps {
  onClick?: () => void
  className?: string
}

const AZ5Button: React.FC<AZ5ButtonProps> = ({ onClick, className }) => {
  const { playClickSound, playHoverSound } = useButtonSound()
  const [isPressed, setIsPressed] = useState(false)

  const handleClick = () => {
    playClickSound()
    setIsPressed(true)
    setTimeout(() => setIsPressed(false), 200)
    if (onClick) onClick()
  }

  return (
    <div className={`relative flex flex-col items-center gap-2 ${className}`}>
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 bg-[#2a1a1a] rounded-full shadow-[0_5px_15px_rgba(0,0,0,0.8)] border-4 border-[#1a0a0a]" />
        
        <button
          onClick={handleClick}
          onMouseEnter={() => playHoverSound()}
          className={`absolute inset-2 rounded-full bg-gradient-to-br from-[#ff3333] to-[#990000] border-4 border-[#ff6666] shadow-[inset_0_2px_10px_rgba(255,255,255,0.4),0_0_15px_rgba(255,0,0,0.5)] transition-all duration-100 flex items-center justify-center group overflow-hidden
            ${isPressed ? 'scale-95 translate-y-1 shadow-none brightness-75' : 'hover:brightness-110 active:scale-95 active:translate-y-1'}`}
        >
          <span className="font-orbitron font-bold text-[#440000] text-[0.5rem] leading-tight tracking-wider drop-shadow-[0_1px_0_rgba(255,255,255,0.4)] z-10 px-1 text-center">EMERGENCY STOP</span>
          
          <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/30 to-transparent rounded-t-full pointer-events-none" />
          
          <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(0,0,0,0.1)_10px,rgba(0,0,0,0.1)_20px)] pointer-events-none" />
        </button>
      </div>
      <span className="text-[#ff3333] font-mono text-[0.6rem] tracking-[0.2em] uppercase bg-[#1a0a0a] px-2 py-0.5 border border-[#331111] shadow-[0_0_5px_rgba(255,0,0,0.2)]">
        Emergency Stop
      </span>
    </div>
  )
}

export default AZ5Button

