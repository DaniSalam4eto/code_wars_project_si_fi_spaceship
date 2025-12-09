import React from 'react'
import { useButtonSound } from '../hooks/useButtonSound'

interface RoundButtonProps {
  label: string
  active?: boolean
  onClick?: () => void
  color?: string
}

const RoundButton: React.FC<RoundButtonProps> = ({ label, active = false, onClick, color = '#ff5500' }) => {
  const { playClickSound, playHoverSound } = useButtonSound()

  const handleClick = () => {
    playClickSound()
    if (onClick) onClick()
  }

  return (
    <div className="flex flex-col items-center gap-1.5">
      <button
        onClick={handleClick}
        onMouseEnter={() => playHoverSound()}
        className={`relative w-12 h-12 rounded-full border-[3px] transition-all duration-200 group active:scale-95
          ${active 
            ? `border-[${color}] bg-[#220a0a] shadow-[0_0_15px_${color}]` 
            : 'border-[#442222] bg-[#110505] hover:border-[#663333]'}`}
      >
        <div className={`absolute inset-1 rounded-full opacity-50 
          ${active 
            ? `bg-[radial-gradient(circle_at_30%_30%,${color},transparent)]` 
            : 'bg-[radial-gradient(circle_at_30%_30%,#442222,transparent)]'}`} 
        />
        
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full transition-all duration-200
          ${active ? `bg-[${color}] shadow-[0_0_10px_${color}]` : 'bg-[#331111]'}`} 
        />

        <div className="absolute inset-[-2px] rounded-full border border-[#ff5500] opacity-0 scale-110 group-hover:scale-125 group-hover:opacity-30 transition-all duration-500" />
      </button>
      <span 
        className={`font-orbitron text-[0.5rem] tracking-widest ${active ? '' : 'text-[#664444]'}`}
        style={active ? { color: color } : undefined}
      >
        {label}
      </span>
    </div>
  )
}

export default RoundButton

