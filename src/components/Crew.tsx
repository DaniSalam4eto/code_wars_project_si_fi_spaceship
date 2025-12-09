import React, { useState, useRef, useEffect } from 'react'
import { useButtonSound } from '../hooks/useButtonSound'
import { useSoundContext } from '../contexts/SoundContext'

interface CrewMember {
  id: number
  name: string
  role: string
  description: string
  country: string
  image: string
  x: number // percentage
  y: number // percentage
}

const CREW_DATA: CrewMember[] = [
  {
    id: 1,
    name: "Alex 'Navigator' Chen",
    role: "Navigation Systems",
    description: "Expert in celestial mechanics and warp theory.",
    country: "Китай",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    x: 20,
    y: 30
  },
  {
    id: 2,
    name: "Sarah 'Spark' Connor",
    role: "Engineering",
    description: "Keeps the engines purring even in critical conditions.",
    country: "САЩ",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    x: 50,
    y: 50
  },
  {
    id: 3,
    name: "Dr. Ivan Petrov",
    role: "Medical",
    description: "Specialized in zero-g surgery and alien biology.",
    country: "България",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ivan",
    x: 80,
    y: 40
  }
]

interface CrewProps {
  onBack: () => void
}

const Crew: React.FC<CrewProps> = ({ onBack }) => {
  const [selectedMember, setSelectedMember] = useState<CrewMember | null>(null)
  const [hoveredMember, setHoveredMember] = useState<number | null>(null)
  const { playHoverSound, playClickSound } = useButtonSound()
  const { sfxVolume } = useSoundContext()
  const mousePos = useRef({ x: 0, y: 0 })
  
  const paperSoundRef = useRef<HTMLAudioElement | null>(null)
  const uiSoundRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    uiSoundRef.current = new Audio('/sfx_ambient_music/UI Sounds_ Futuristic sound effects example (mp3cut.net).mp3')
    uiSoundRef.current.volume = sfxVolume
    uiSoundRef.current.preload = 'auto'
    
    paperSoundRef.current = new Audio('/sfx_ambient_music/crumping-paper-109585 (mp3cut.net).mp3')
    paperSoundRef.current.volume = sfxVolume * 0.6
    paperSoundRef.current.preload = 'auto'
  }, [sfxVolume])

  useEffect(() => {
    if (paperSoundRef.current) {
      paperSoundRef.current.volume = sfxVolume * 0.6
    }
    if (uiSoundRef.current) {
      uiSoundRef.current.volume = sfxVolume
    }
  }, [sfxVolume])

  const handleMouseMove = (e: React.MouseEvent) => {
    // Calculate mouse position relative to center for parallax/tilt effect
    const { clientX, clientY } = e
    const { innerWidth, innerHeight } = window
    mousePos.current = {
      x: (clientX / innerWidth) * 2 - 1,
      y: (clientY / innerHeight) * 2 - 1
    }
  }

  const handleMemberClick = (member: CrewMember) => {
    if (uiSoundRef.current) {
      uiSoundRef.current.currentTime = 0
      uiSoundRef.current.play().catch(() => {})
    }
    setSelectedMember(member)
  }

  const handleMemberHover = (id: number | null) => {
    setHoveredMember(id)
    if (id !== null && paperSoundRef.current) {
       // Play hover sound
       paperSoundRef.current.currentTime = 0
       paperSoundRef.current.play().catch(() => {})
    }
  }

  return (
    <div 
      className="w-full h-full absolute top-0 left-0 z-50 overflow-hidden bg-[#110a0a] shadow-[inset_0_0_150px_rgba(255,50,0,0.3)] flex flex-col"
      onMouseMove={handleMouseMove}
    >
      {/* Back Button */}
      <div 
        onClick={() => {
          playClickSound()
          onBack()
        }}
        className="fixed top-1/2 left-4 -translate-y-1/2 z-[60] text-[#ff5500] hover:text-[#ffaa88] transition-colors duration-300 cursor-pointer text-4xl md:text-5xl"
        style={{ fontFamily: 'Orbitron, sans-serif', textShadow: '0 0 20px rgba(255, 85, 0, 0.8)' }}
      >
        &lt;
      </div>

      {/* Info Section (Bulgarian) */}
      <div className="absolute top-20 right-4 max-w-xs text-right z-[55] pointer-events-none">
         <div className="text-[#ff5500] text-sm md:text-base font-bold mb-1 uppercase tracking-wider" style={{ fontFamily: 'Orbitron, sans-serif', textShadow: '0 0 10px rgba(255, 85, 0, 0.8)' }}>ЕКИПАЖ</div>
         <div className="bg-[#1a0a0a]/90 border-2 border-[#331111] p-3 relative overflow-hidden">
           <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.4)_0px,rgba(255,68,0,0.05)_2px,rgba(0,0,0,0.4)_4px)] pointer-events-none"></div>
           <p className="text-[#ffaa88] text-xs md:text-sm leading-relaxed relative z-[1]" style={{ fontFamily: 'monospace' }}>
             Тук можете да видите информация за екипажа на кораба. Кликнете върху всеки член, за да видите подробности.
           </p>
         </div>
      </div>

      {/* Board Container */}
      <div className="flex-1 relative w-full h-full overflow-auto p-10 mt-16 flex items-center justify-center">
        <div className="relative w-full max-w-6xl h-[80vh] bg-[#050000] border-4 border-[#331111] shadow-[0_0_50px_rgba(0,0,0,0.9),inset_0_0_100px_rgba(255,50,0,0.1)] overflow-hidden relative">
            <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(255,85,0,0.02)_10px,rgba(255,85,0,0.02)_20px)] pointer-events-none"></div>
            
            <div className="absolute inset-0 opacity-30 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,_rgba(255,85,0,0.15),transparent_70%)]"></div>
            
            {/* Pins */}
            {CREW_DATA.map((member) => (
              <div
                key={member.id}
                className="absolute transform transition-all duration-300 cursor-pointer group"
                style={{
                  left: `${member.x}%`,
                  top: `${member.y}%`,
                  transform: `translate(-50%, -50%) ${hoveredMember === member.id ? 'scale(1.1) rotate(2deg)' : 'scale(1) rotate(0deg)'}`,
                  zIndex: hoveredMember === member.id ? 20 : 10
                }}
                onMouseEnter={() => handleMemberHover(member.id)}
                onMouseLeave={() => handleMemberHover(null)}
                onClick={() => handleMemberClick(member)}
              >
                {/* Pin Head */}
                <div className="w-4 h-4 rounded-full bg-red-600 shadow-lg mx-auto mb-[-8px] relative z-10 border border-black"></div>
                
                {/* Paper/Card */}
                <div className="bg-[#1a0a0a] border-2 border-[#331111] text-[#ffaa88] p-2 w-32 shadow-[0_0_20px_rgba(255,85,0,0.3)] transform rotate-1 transition-all duration-300 group-hover:rotate-0 group-hover:border-[#ff5500] group-hover:shadow-[0_0_30px_rgba(255,85,0,0.6)] relative">
                   <div className="w-full h-24 bg-[#110000] border border-[#441111] mb-2 overflow-hidden relative">
                      <img src={member.image} alt={member.name} className="w-full h-full object-cover opacity-90" />
                      <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.3)_0px,rgba(255,68,0,0.05)_2px,rgba(0,0,0,0.3)_4px)] pointer-events-none"></div>
                   </div>
                   <div className="text-[10px] font-mono font-bold truncate text-[#ff5500] uppercase tracking-wider" style={{ fontFamily: 'Orbitron, sans-serif', textShadow: '0 0 5px rgba(255, 85, 0, 0.6)' }}>{member.name}</div>
                   
                   <div className="absolute inset-[-8px] rounded-full bg-[#ff5500] opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Popup Modal */}
      {selectedMember && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4" onClick={() => setSelectedMember(null)}>
          <div 
            className="bg-[#0a0a0a] border-2 border-[#ff5500] text-[#ffaa88] max-w-4xl w-full p-6 relative flex flex-col md:flex-row gap-6 shadow-[0_0_50px_#ff5500,inset_0_0_30px_rgba(255,85,0,0.1)]"
            onClick={(e) => e.stopPropagation()}
          >
             <div className="absolute top-0 left-0 w-full h-full bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.4)_0px,rgba(255,68,0,0.05)_2px,rgba(0,0,0,0.4)_4px)] pointer-events-none"></div>
             
             <button 
               className="absolute top-2 right-2 z-10 text-[#ff5500] hover:text-[#ffaa88] transition-colors w-8 h-8 flex items-center justify-center border border-[#ff5500]/50 hover:border-[#ff5500] bg-[#1a0a0a] hover:bg-[#2a1a1a]"
               onClick={() => setSelectedMember(null)}
             >
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
               </svg>
             </button>

             {/* Left Image */}
             <div className="w-full md:w-1/3 aspect-square bg-[#110000] border-2 border-[#331111] overflow-hidden relative group z-[1]">
                <img src={selectedMember.image} alt={selectedMember.name} className="w-full h-full object-cover opacity-90" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.3)_0px,rgba(255,68,0,0.05)_2px,rgba(0,0,0,0.3)_4px)] pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-[#ff5500]/20 to-transparent">
                  <div className="text-[#ff5500] text-xs font-mono uppercase tracking-widest" style={{ fontFamily: 'Orbitron, sans-serif', textShadow: '0 0 10px rgba(255, 85, 0, 0.8)' }}>CREW MEMBER</div>
                </div>
             </div>

             {/* Right Info with Spaceship */}
             <div className="flex-1 flex flex-col justify-center relative z-[1]">
                <h2 className="text-2xl md:text-3xl font-bold text-[#ff5500] mb-2 uppercase tracking-wider" style={{ fontFamily: 'Orbitron, sans-serif', textShadow: '0 0 15px rgba(255, 85, 0, 0.8)' }}>{selectedMember.name}</h2>
                
                <div className="flex items-center gap-2 mb-4 text-[#ffccaa]">
                  <div className="p-1.5 rounded-full bg-[#ff5500]/20 border border-[#ff5500] shadow-[0_0_10px_rgba(255,85,0,0.5)]">
                    <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <span className="font-mono uppercase tracking-wider text-[#ffaa88]" style={{ fontFamily: 'Orbitron, sans-serif' }}>{selectedMember.role}</span>
                </div>

                <div className="bg-[#110000] border border-[#331111] p-4 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-full bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.4)_0px,rgba(255,68,0,0.1)_2px,rgba(0,0,0,0.4)_4px)] pointer-events-none z-[2]"></div>
                  <div className="relative z-[3]">
                    <p className="text-sm md:text-base leading-relaxed text-[#ffccaa] mb-3" style={{ fontFamily: 'monospace' }}>
                      {selectedMember.description}
                    </p>
                    <div className="pt-3 border-t border-[#331111]">
                      <span className="text-xs text-[#884444] uppercase tracking-wider" style={{ fontFamily: 'Orbitron, sans-serif' }}>Държава на произход: </span>
                      <span className="text-sm text-[#ff5500] font-bold" style={{ fontFamily: 'Orbitron, sans-serif' }}>{selectedMember.country}</span>
                    </div>
                  </div>
                </div>
             </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Crew

