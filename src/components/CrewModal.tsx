import React, { useEffect } from 'react'

interface CrewModalProps {
  isOpen: boolean
  onClose: () => void
}

const CrewModal: React.FC<CrewModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <>
      <style>{`
        @keyframes modalFadeIn {
          from {
            opacity: 0;
            transform: scale(0.8) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
      
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[200] animate-[modalFadeIn_0.3s_ease-out]"
        onClick={onClose}
      />
      
      <div className="fixed inset-0 z-[202] flex items-center justify-center p-2 md:p-4 pointer-events-none">
        <div 
          className="relative bg-[#0a0505] border-[2px] md:border-[3px] border-[#ff5500] shadow-[0_0_50px_rgba(255,85,0,0.5),inset_0_0_50px_rgba(255,85,0,0.1)] max-w-md w-full p-4 md:p-6 pointer-events-auto animate-[modalFadeIn_0.4s_ease-out]"
        >
          <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#ff5500]" />
          <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#ff5500]" />
          <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#ff5500]" />
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#ff5500]" />
          
          <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,85,0,0.03)_2px,rgba(255,85,0,0.03)_4px)] pointer-events-none" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-[#ff5500] hover:text-[#ffaa88] transition-colors duration-200 border border-[#ff5500]/50 hover:border-[#ff5500] hover:bg-[#ff5500]/10 z-10"
          >
            <span className="text-xl font-bold">×</span>
          </button>
          
          <div className="relative z-10">
            <div className="text-[#ff5500] text-sm md:text-base font-bold mb-1 uppercase tracking-wider" style={{ fontFamily: 'Orbitron, sans-serif', textShadow: '0 0 10px rgba(255, 85, 0, 0.8)' }}>
              ЕКИПАЖ
            </div>
            <div className="bg-[#1a0a0a]/90 border-2 border-[#331111] p-3 relative overflow-hidden">
              <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.4)_0px,rgba(255,68,0,0.05)_2px,rgba(0,0,0,0.4)_4px)] pointer-events-none"></div>
              <p className="text-[#ffaa88] text-xs md:text-sm leading-relaxed relative z-[1]" style={{ fontFamily: 'monospace' }}>
                Тук можете да видите информация за екипажа на кораба. Кликнете върху всеки член, за да видите подробности.
              </p>
            </div>
          </div>
          
          <div className="absolute -inset-1 bg-[#ff5500] opacity-20 blur-xl -z-10 animate-pulse" />
        </div>
      </div>
    </>
  )
}

export default CrewModal

