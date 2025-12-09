import React, { useEffect, useState } from 'react'

interface SettingsModalProps {
  isOpen: boolean
  onClose: () => void
  mainMusicVolume: number
  onMainMusicVolumeChange: (volume: number) => void
  sfxVolume: number
  onSfxVolumeChange: (volume: number) => void
}

const SettingsModal: React.FC<SettingsModalProps> = ({ 
  isOpen, 
  onClose,
  mainMusicVolume,
  onMainMusicVolumeChange,
  sfxVolume,
  onSfxVolumeChange
}) => {
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
          className="relative bg-[#0a0505] border-[2px] md:border-[3px] border-[#ff5500] shadow-[0_0_50px_rgba(255,85,0,0.5),inset_0_0_50px_rgba(255,85,0,0.1)] max-w-lg w-full p-4 md:p-8 pointer-events-auto animate-[modalFadeIn_0.4s_ease-out] max-h-[90vh] overflow-y-auto scrollbar-hide"
          style={{ animation: 'modalFadeIn 0.4s ease-out, pulseGlow 2s ease-in-out infinite' }}
          onClick={(e) => e.stopPropagation()}
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
            <h2 className="text-[#ff5500] font-orbitron text-2xl mb-8 tracking-widest uppercase text-center animate-[textReveal_0.6s_ease-out_0.2s_both]">
              Настройки
            </h2>
            
            <div className="space-y-8 animate-[textReveal_0.8s_ease-out_0.4s_both]">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-[#ffccaa] font-orbitron text-sm tracking-wider">
                    Основна Музика
                  </label>
                  <span className="text-[#ff5500] font-mono text-sm">
                    {Math.round(mainMusicVolume * 100)}%
                  </span>
                </div>
                <div className="relative">
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={mainMusicVolume}
                    onChange={(e) => onMainMusicVolumeChange(parseFloat(e.target.value))}
                    className="w-full h-2 bg-[#1a0a0a] rounded-lg appearance-none cursor-pointer slider"
                    style={{
                      background: `linear-gradient(to right, #ff5500 0%, #ff5500 ${mainMusicVolume * 100}%, #1a0a0a ${mainMusicVolume * 100}%, #1a0a0a 100%)`
                    }}
                  />
                  <style>{`
                    .slider::-webkit-slider-thumb {
                      appearance: none;
                      width: 18px;
                      height: 18px;
                      border-radius: 50%;
                      background: #ff5500;
                      cursor: pointer;
                      box-shadow: 0 0 10px rgba(255, 85, 0, 0.8), 0 0 20px rgba(255, 85, 0, 0.4);
                      border: 2px solid #ffaa88;
                    }
                    .slider::-moz-range-thumb {
                      width: 18px;
                      height: 18px;
                      border-radius: 50%;
                      background: #ff5500;
                      cursor: pointer;
                      box-shadow: 0 0 10px rgba(255, 85, 0, 0.8), 0 0 20px rgba(255, 85, 0, 0.4);
                      border: 2px solid #ffaa88;
                    }
                  `}</style>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-[#ffccaa] font-orbitron text-sm tracking-wider">
                    Звукови Ефекти
                  </label>
                  <span className="text-[#ff5500] font-mono text-sm">
                    {Math.round(sfxVolume * 100)}%
                  </span>
                </div>
                <div className="relative">
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={sfxVolume}
                    onChange={(e) => onSfxVolumeChange(parseFloat(e.target.value))}
                    className="w-full h-2 bg-[#1a0a0a] rounded-lg appearance-none cursor-pointer slider"
                    style={{
                      background: `linear-gradient(to right, #ff5500 0%, #ff5500 ${sfxVolume * 100}%, #1a0a0a ${sfxVolume * 100}%, #1a0a0a 100%)`
                    }}
                  />
                </div>
              </div>

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

export default SettingsModal

