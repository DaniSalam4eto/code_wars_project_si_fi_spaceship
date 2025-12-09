import React from 'react'
import { useButtonSound } from '../hooks/useButtonSound'

interface ToggleSwitchProps {
  isOn: boolean
  onToggle: (newState: boolean) => void
  label: string
  color?: string
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ isOn, onToggle, label, color = '#ff5500' }) => {
  const { playClickSound, playHoverSound } = useButtonSound()

  const handleClick = () => {
    playClickSound()
    onToggle(!isOn)
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <div 
        className="relative w-12 h-20 bg-[#150a0a] rounded border border-[#331111] shadow-[inset_0_0_10px_black] p-1 cursor-pointer group"
        onClick={handleClick}
        onMouseEnter={() => playHoverSound()}
      >
        <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#221111] rounded-full border border-[#332222]" />
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#221111] rounded-full border border-[#332222]" />

        <div className="absolute top-4 bottom-4 left-1/2 -translate-x-1/2 w-2 bg-[#050000] rounded-full shadow-[inset_0_0_5px_black]" />

        <div 
          className={`absolute left-1/2 -translate-x-1/2 w-8 h-10 transition-all duration-200 ease-out z-10 flex items-center justify-center
            ${isOn ? 'top-2' : 'bottom-2'}`}
        >
          <div className={`w-full h-full rounded shadow-lg border border-[#442222] transition-colors duration-200
            ${isOn 
              ? `bg-gradient-to-b from-[${color}] to-[#441111] shadow-[0_0_15px_${color}]` 
              : 'bg-gradient-to-b from-[#442222] to-[#221111]'}`}
          >
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 flex flex-col gap-1">
                <div className="w-full h-[1px] bg-black/50" />
                <div className="w-full h-[1px] bg-black/50" />
                <div className="w-full h-[1px] bg-black/50" />
             </div>
          </div>
        </div>

        <div className={`absolute top-[-10px] right-[-5px] w-2 h-2 rounded-full transition-all duration-200 border border-black
          ${isOn ? `bg-[${color}] shadow-[0_0_8px_${color}]` : 'bg-[#331111]'}`} 
        />
      </div>
      <span className={`font-mono text-[0.6rem] tracking-wider transition-colors duration-200 ${isOn ? `text-[${color}]` : 'text-[#553333]'}`}>
        {label}
      </span>
    </div>
  )
}

export default ToggleSwitch

