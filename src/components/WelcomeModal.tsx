import React, { useEffect } from 'react'

interface WelcomeModalProps {
  isOpen: boolean
  onClose: () => void
}

const WelcomeModal: React.FC<WelcomeModalProps> = ({ isOpen, onClose }) => {
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
        
        @keyframes scanLine {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100vh);
          }
        }
        
        @keyframes glitch {
          0%, 100% {
            transform: translate(0);
            text-shadow: 0 0 5px rgba(255, 85, 0, 0.5);
          }
          20% {
            transform: translate(-1px, 1px);
            text-shadow: -1px 1px 5px rgba(255, 85, 0, 0.5), 1px -1px 5px rgba(0, 255, 255, 0.3);
          }
          40% {
            transform: translate(-1px, -1px);
            text-shadow: -1px -1px 5px rgba(255, 85, 0, 0.5), 1px 1px 5px rgba(0, 255, 255, 0.3);
          }
          60% {
            transform: translate(1px, 1px);
            text-shadow: 1px 1px 5px rgba(255, 85, 0, 0.5), -1px -1px 5px rgba(0, 255, 255, 0.3);
          }
          80% {
            transform: translate(1px, -1px);
            text-shadow: 1px -1px 5px rgba(255, 85, 0, 0.5), -1px 1px 5px rgba(0, 255, 255, 0.3);
          }
        }
        
        @keyframes pulseGlow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(255, 85, 0, 0.3), 0 0 40px rgba(255, 85, 0, 0.2), inset 0 0 30px rgba(255, 85, 0, 0.1);
          }
          50% {
            box-shadow: 0 0 30px rgba(255, 85, 0, 0.5), 0 0 60px rgba(255, 85, 0, 0.3), inset 0 0 40px rgba(255, 85, 0, 0.2);
          }
        }
        
        @keyframes textReveal {
          from {
            opacity: 0;
            transform: translateY(10px);
            filter: blur(5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
        }
      `}</style>
      
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[200] animate-[modalFadeIn_0.3s_ease-out]"
        onClick={onClose}
      />
      
      <div className="fixed inset-0 z-[201] pointer-events-none overflow-hidden">
        <div className="absolute w-full h-[2px] bg-gradient-to-b from-transparent via-[#ff5500]/50 to-transparent animate-[scanLine_3s_linear_infinite]" />
      </div>
      
      <div className="fixed inset-0 z-[202] flex items-center justify-center p-2 md:p-4 pointer-events-none">
        <div 
          className="relative bg-[#0a0505] border-[2px] md:border-[3px] border-[#ff5500] shadow-[0_0_50px_rgba(255,85,0,0.5),inset_0_0_50px_rgba(255,85,0,0.1)] max-w-2xl w-full p-4 md:p-8 pointer-events-auto animate-[modalFadeIn_0.4s_ease-out] max-h-[90vh] overflow-y-auto scrollbar-hide"
          style={{ animation: 'modalFadeIn 0.4s ease-out, pulseGlow 2s ease-in-out infinite' }}
        >
          <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#ff5500]" />
          <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#ff5500]" />
          <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#ff5500]" />
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#ff5500]" />
          
          <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,85,0,0.03)_2px,rgba(255,85,0,0.03)_4px)] pointer-events-none" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-[#ff5500] hover:text-[#ffaa88] transition-colors duration-200 border border-[#ff5500]/50 hover:border-[#ff5500] hover:bg-[#ff5500]/10"
          >
            <span className="text-xl font-bold">×</span>
          </button>
          
          <div className="relative z-10">
            <h2 className="text-[#ff5500] font-orbitron text-2xl mb-6 tracking-widest uppercase text-center animate-[textReveal_0.6s_ease-out_0.2s_both]">
              Информация
            </h2>
            
            <div className="text-[#ffccaa] font-mono text-lg leading-relaxed space-y-4 animate-[textReveal_0.8s_ease-out_0.4s_both]">
              <p className="relative" style={{ animation: 'glitch 4s ease-in-out infinite' }}>
                Добре дошли капитане, в момента се намирате в
              </p>
              
              <div className="flex items-center gap-2 my-6">
                <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-[#ff5500] to-transparent" />
                <div className="w-2 h-2 bg-[#ff5500] rounded-full shadow-[0_0_10px_#ff5500]" />
                <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-[#ff5500] to-transparent" />
              </div>
            </div>
          </div>
          
          <div className="absolute -inset-1 bg-[#ff5500] opacity-20 blur-xl -z-10 animate-pulse" />
        </div>
      </div>
    </>
  )
}

export default WelcomeModal

