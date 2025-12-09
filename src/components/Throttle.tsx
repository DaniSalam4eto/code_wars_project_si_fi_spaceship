import React, { useState, useRef, useEffect } from 'react'
import { useButtonSound } from '../hooks/useButtonSound'

interface ThrottleProps {
  value: number
  onChange: (value: number) => void
  label?: string
  className?: string
}

const Throttle: React.FC<ThrottleProps> = ({ value, onChange, label = "THRUST", className }) => {
  const { playHoverSound } = useButtonSound()
  const [isDragging, setIsDragging] = useState(false)
  const trackRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    playHoverSound()
    updateValue(e.clientY)
  }

  const updateValue = (clientY: number) => {
    if (!trackRef.current) return
    const rect = trackRef.current.getBoundingClientRect()
    const height = rect.height
    const relativeY = clientY - rect.top
    const percentage = 1 - Math.max(0, Math.min(1, relativeY / height))
    onChange(Math.round(percentage * 100))
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        updateValue(e.clientY)
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging])

  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      <div className="relative h-48 w-16 bg-[#150a0a] rounded-lg border-2 border-[#331111] shadow-[inset_0_0_20px_black] p-1 flex justify-center">
        <div className="absolute inset-y-2 left-1 w-2 flex flex-col justify-between py-2 pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <div key={i} className={`w-full h-[1px] ${i % 3 === 0 ? 'bg-[#ff5500]/50 w-3' : 'bg-[#552222] w-2'}`} />
          ))}
        </div>
        
        <div 
          ref={trackRef}
          className="relative w-8 h-full bg-[#0a0505] rounded border border-[#221111] cursor-pointer overflow-hidden group"
          onMouseDown={handleMouseDown}
        >
          <div 
            className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-[#331111] to-[#ff5500]/20 transition-all duration-75"
            style={{ height: `${value}%` }}
          />
          
          <div 
            className="absolute left-0 w-full h-8 bg-gradient-to-b from-[#442222] to-[#221111] border-y border-[#ff5500] shadow-[0_0_10px_#ff5500] transition-all duration-75 flex items-center justify-center group-hover:brightness-125"
            style={{ bottom: `calc(${value}% - 16px)` }}
          >
            <div className="w-4 h-[2px] bg-[#ff5500] shadow-[0_0_5px_#ff5500]" />
          </div>
        </div>
      </div>
      
      <div className="text-[#ff5500] font-orbitron text-xs tracking-wider flex flex-col items-center">
        <span className="text-[0.6rem] text-[#884444]">{label}</span>
        <span className="font-bold">{Math.round(value)}%</span>
      </div>
    </div>
  )
}

export default Throttle

