import React from 'react'
import { useButtonSound } from '../hooks/useButtonSound'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({ children, onMouseEnter, onClick, ...props }) => {
  const { playHoverSound, playClickSound } = useButtonSound()

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    playHoverSound()
    if (onMouseEnter) {
      onMouseEnter(e)
    }
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    playClickSound()
    if (onClick) {
      onClick(e)
    }
  }

  return (
    <button
      {...props}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
      className={`px-6 py-2 text-[#ff5500] hover:text-[#ffaa88] font-bold tracking-widest uppercase text-sm relative group glitch-button ${props.className || ''}`}
      style={{ fontFamily: 'Orbitron, sans-serif', textShadow: '0 0 10px rgba(255, 85, 0, 0.6)' }}
    >
      <span className="relative z-10 glitch-text" data-text={children}>{children}</span>
      <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#ff5500] scale-x-0 group-hover:scale-x-100 transition-transform duration-75 origin-center shadow-[0_0_10px_rgba(255,85,0,0.9)]"></span>
    </button>
  )
}

export default Button
