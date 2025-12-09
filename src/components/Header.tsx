import React from 'react'
import Button from './Button'

interface HeaderProps {
  onNavigate: (view: 'SYSTEMS' | 'SHIP' | 'CREW') => void
}

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  return (
    <header className="w-full h-12 md:h-14 fixed top-0 left-0 z-50 flex items-center justify-center pointer-events-none">
      <div className="relative w-[90%] md:w-[65%] h-full pointer-events-auto">
        <svg className="absolute top-0 left-0 w-full h-full overflow-visible pointer-events-none" viewBox="0 0 650 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="blockyPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <rect width="20" height="20" fill="rgba(26, 0, 0, 0.3)" />
              <rect x="0" y="0" width="10" height="10" fill="rgba(40, 0, 0, 0.2)" />
              <rect x="10" y="10" width="10" height="10" fill="rgba(40, 0, 0, 0.2)" />
            </pattern>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          <path 
            d="M30 0 L620 0 L590 38 L60 38 Z" 
            stroke="rgba(255, 85, 0, 0.8)" 
            strokeWidth="1.5" 
            fill="url(#blockyPattern)" 
            className="drop-shadow-[0_0_8px_rgba(255,85,0,0.6)]"
            filter="url(#glow)"
          />
          <path 
            d="M30 0 L620 0 L590 38 L60 38 Z" 
            fill="rgba(26, 0, 0, 0.85)" 
          />
          
          <path 
            d="M30 0 L620 0 L590 38 L60 38 Z" 
            stroke="rgba(255, 85, 0, 0.4)" 
            strokeWidth="3" 
            fill="none" 
            className="blur-sm"
          />
          <path 
            d="M30 0 L620 0 L590 38 L60 38 Z" 
            stroke="rgba(255, 85, 0, 0.3)" 
            strokeWidth="5" 
            fill="none" 
            className="blur-md"
          />
          
          <line 
            x1="30" 
            y1="0" 
            x2="620" 
            y2="0" 
            stroke="rgba(255, 85, 0, 0.9)" 
            strokeWidth="1.5"
            className="drop-shadow-[0_0_10px_rgba(255,85,0,0.8)]"
          />
          <line 
            x1="30" 
            y1="0" 
            x2="620" 
            y2="0" 
            stroke="rgba(255, 85, 0, 0.5)" 
            strokeWidth="3"
            className="blur-sm"
          />
          
          <line 
            x1="60" 
            y1="38" 
            x2="590" 
            y2="38" 
            stroke="rgba(255, 85, 0, 0.9)" 
            strokeWidth="1.5"
            className="drop-shadow-[0_0_10px_rgba(255,85,0,0.8)]"
          />
          <line 
            x1="60" 
            y1="38" 
            x2="590" 
            y2="38" 
            stroke="rgba(255, 85, 0, 0.5)" 
            strokeWidth="3"
            className="blur-sm"
          />
          
          <line 
            x1="30" 
            y1="0" 
            x2="60" 
            y2="38" 
            stroke="rgba(255, 85, 0, 0.9)" 
            strokeWidth="1.5"
            className="drop-shadow-[0_0_10px_rgba(255,85,0,0.8)]"
          />
          <line 
            x1="30" 
            y1="0" 
            x2="60" 
            y2="38" 
            stroke="rgba(255, 85, 0, 0.5)" 
            strokeWidth="3"
            className="blur-sm"
          />
          
          <line 
            x1="620" 
            y1="0" 
            x2="590" 
            y2="38" 
            stroke="rgba(255, 85, 0, 0.9)" 
            strokeWidth="1.5"
            className="drop-shadow-[0_0_10px_rgba(255,85,0,0.8)]"
          />
          <line 
            x1="620" 
            y1="0" 
            x2="590" 
            y2="38" 
            stroke="rgba(255, 85, 0, 0.5)" 
            strokeWidth="3"
            className="blur-sm"
          />
          
          <line 
            x1="100" 
            y1="12" 
            x2="120" 
            y2="12" 
            stroke="rgba(255, 85, 0, 0.6)" 
            strokeWidth="1"
            className="animate-pulse"
          >
            <animate attributeName="opacity" values="0.2;1;0.2" dur="1.5s" repeatCount="indefinite" />
          </line>
          <line 
            x1="530" 
            y1="12" 
            x2="550" 
            y2="12" 
            stroke="rgba(255, 85, 0, 0.6)" 
            strokeWidth="1"
            className="animate-pulse"
          >
            <animate attributeName="opacity" values="0.2;1;0.2" dur="1.8s" repeatCount="indefinite" />
          </line>
        </svg>

        <div className="flex items-center justify-center gap-2 md:gap-8 relative z-10 h-full">
          <Button onClick={() => onNavigate('SYSTEMS')} className="text-xs md:text-sm px-3 md:px-6 py-1.5 md:py-2">SYSTEMS</Button>
          <Button onClick={() => onNavigate('SHIP')} className="text-xs md:text-sm px-3 md:px-6 py-1.5 md:py-2">SHIP</Button>
          <Button onClick={() => onNavigate('CREW')} className="text-xs md:text-sm px-3 md:px-6 py-1.5 md:py-2">CREW</Button>
        </div>
      </div>
    </header>
  )
}

export default Header
