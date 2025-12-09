import React, { useState, useEffect, useMemo, useRef } from 'react'
import { useButtonSound } from '../hooks/useButtonSound'
import { useSoundContext } from '../contexts/SoundContext'
import { LuBanana } from 'react-icons/lu'
import AZ5Button from './AZ5Button'
import Throttle from './Throttle'
import ToggleSwitch from './ToggleSwitch'
import RoundButton from './RoundButton'
import WelcomeModal from './WelcomeModal'
import CrewModal from './CrewModal'

interface Star {
  id: number
  x: number
  size: number
  duration: number
  delay: number
  color: string
  shadowColor: string
  startY: number
  animationName: string
}

const WindowStars: React.FC<{ speedMultiplier: number }> = ({ speedMultiplier }) => {
  const stars = useMemo(() => {
    const starArray: Star[] = []
    const starCount = 500

    const colorPalettes = [
      { main: [255, 255, 255], shadow: [200, 220, 255] },
      { main: [200, 240, 255], shadow: [150, 200, 255] },
      { main: [180, 210, 255], shadow: [120, 180, 255] },
      { main: [220, 255, 255], shadow: [180, 255, 255] },
    ]

    for (let i = 0; i < starCount; i++) {
      const palette = colorPalettes[Math.floor(Math.random() * colorPalettes.length)]
      const opacity = Math.random() * 0.7 + 0.5
      const brightness = Math.random() * 0.5 + 0.4
      const startY = Math.random() * 120 - 20
      
      starArray.push({
        id: i,
        x: Math.random() * 100,
        size: Math.random() * 2 + 0.5,
        duration: Math.random() * 4 + 3,
        delay: Math.random() * 2,
        color: `rgba(${palette.main[0]}, ${palette.main[1]}, ${palette.main[2]}, ${opacity})`,
        shadowColor: `rgba(${palette.shadow[0]}, ${palette.shadow[1]}, ${palette.shadow[2]}, ${brightness})`,
        startY,
        animationName: `windowStarMove${i}`,
      })
    }

    return starArray
  }, [])

  return (
    <>
      <style>{`
        ${stars.map((star) => `
          @keyframes ${star.animationName} {
            0% {
              transform: translateY(0);
              opacity: ${star.startY >= 0 && star.startY <= 100 ? '1' : '0'};
            }
            ${star.startY < 0 ? `
              ${Math.abs(star.startY) * 0.8}% {
                opacity: 1;
              }
            ` : ''}
            95% {
              opacity: 1;
            }
            100% {
              transform: translateY(calc(-100vh - 20px));
              opacity: 0;
            }
          }
        `).join('')}
        .window-star {
          will-change: transform, opacity;
          transform: translateZ(0);
        }
      `}</style>
      <div className="absolute inset-0 overflow-hidden bg-[#050b14]">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full window-star"
            style={{
              left: `${star.x}%`,
              top: `${star.startY}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              backgroundColor: star.color,
              boxShadow: `0 0 ${star.size * 2}px ${star.color}, 0 0 ${star.size * 4}px ${star.shadowColor}`,
              animation: `${star.animationName} ${star.duration / Math.max(0.1, speedMultiplier)}s linear ${star.delay}s infinite`,
            }}
          />
        ))}
      </div>
    </>
  )
}

const Spaceship: React.FC = () => {
  const [isWarping, setIsWarping] = useState(false)
  const [throttleValue, setThrottleValue] = useState(0)
  const [switch1, setSwitch1] = useState(true)
  const [switch2, setSwitch2] = useState(false)
  const [activeRounds, setActiveRounds] = useState<string[]>([])
  const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState(false)
  const [isCrewModalOpen, setIsCrewModalOpen] = useState(false)
  
  const [logs, setLogs] = useState<string[]>([
    "/// AWAITING COMMAND",
    "/// SYSTEM READY"
  ])
  const [radarDots, setRadarDots] = useState<{id: number, angle: number, distance: number, opacity: number}[]>([])
  const radarSoundRef = useRef<HTMLAudioElement | null>(null)
  const sweepAngleRef = useRef<number>(0)
  const uiSoundRef = useRef<HTMLAudioElement | null>(null)
  const { playHoverSound, playClickSound } = useButtonSound()
  
  const { sfxVolume } = useSoundContext()

  useEffect(() => {
    radarSoundRef.current = new Audio('/sfx_ambient_music/Button Clicks Sound Effect  SFX (mp3cut.net).mp3')
    radarSoundRef.current.volume = sfxVolume * 0.5
    radarSoundRef.current.preload = 'auto'
    
    uiSoundRef.current = new Audio('/sfx_ambient_music/UI Sounds_ Futuristic sound effects example (mp3cut.net).mp3')
    uiSoundRef.current.volume = sfxVolume
    uiSoundRef.current.preload = 'auto'
  }, [sfxVolume])
  useEffect(() => {
    if (radarSoundRef.current) {
      radarSoundRef.current.volume = sfxVolume * 0.5
    }
    if (uiSoundRef.current) {
      uiSoundRef.current.volume = sfxVolume
    }
  }, [sfxVolume])

  const addLog = (text: string) => {
    setLogs((prev) => [text, ...prev].slice(0, 9))
  }

  const playClick = (label: string) => {
    playClickSound()
    if (label === "LOG") {
      addLog("бананов шейк")
    } else {
      addLog("INPUT: " + label)
    }
  }

  const playRadarBeep = () => {
    if (radarSoundRef.current) {
      radarSoundRef.current.currentTime = 0
      radarSoundRef.current.play().catch(() => {})
    }
  }

  const isRadarActive = activeRounds.includes('RAD')

  useEffect(() => {
    if (!isRadarActive) {
      setRadarDots([])
      return
    }

    const interval = setInterval(() => {
      if (Math.random() > 0.6) {
        const angle = Math.random() * Math.PI * 2
        const distance = Math.random() * 60 + 10
        const id = Date.now() + Math.random()
        
        setRadarDots((prev) => [...prev, { id, angle, distance, opacity: 1 }])
        
        setTimeout(() => {
          setRadarDots((prev) => prev.filter(d => d.id !== id))
        }, 5000)
      }
    }, 2000)
    return () => clearInterval(interval)
  }, [isRadarActive])

  useEffect(() => {
    if (!isRadarActive) return

    const checkInterval = setInterval(() => {
      const currentAngle = (Date.now() / 3000) % (Math.PI * 2)
      sweepAngleRef.current = currentAngle
      
      radarDots.forEach(dot => {
        const angleDiff = Math.abs(dot.angle - currentAngle)
        const normalizedDiff = Math.min(angleDiff, Math.PI * 2 - angleDiff)
        
        if (normalizedDiff < 0.1 && dot.opacity > 0.5) {
          playRadarBeep()
          setRadarDots((prev) => prev.map(d => d.id === dot.id ? { ...d, opacity: 0.3 } : d))
        }
      })
    }, 50)
    return () => clearInterval(checkInterval)
  }, [radarDots, isRadarActive])

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isWarping) {
        const energy = Math.floor(Math.random() * (100 - 97 + 1) + 97)
        const energyBar = document.getElementById('energy-bar')
        if (energyBar) {
          energyBar.style.width = energy + '%'
        }
      }
    }, 800)
    return () => clearInterval(interval)
  }, [isWarping])

  useEffect(() => {
    if (isWarping) {
        if (throttleValue < 20) {
            addLog("/// WARNING: LOW POWER")
        }
    }
  }, [throttleValue, isWarping])

  const toggleWarp = () => {
    playClickSound()
    if (!switch1) {
        addLog("/// ERROR: MAIN POWER OFF")
        return
    }
    if (throttleValue < 10) {
        addLog("/// ERROR: INSUFFICIENT THRUST")
        return
    }

    const nextState = !isWarping
    setIsWarping(nextState)

    if (nextState) {
      addLog("/// SEQ.1 : INIT")
      addLog("/// SPEED : " + throttleValue + "%")
      
      const energyBar = document.getElementById('energy-bar')
      if (energyBar) {
        energyBar.style.width = '100%'
        energyBar.style.background = '#ff0000'
      }
    } else {
      addLog("/// SEQ.1 : STOP")
      
      const energyBar = document.getElementById('energy-bar')
      if (energyBar) {
        energyBar.style.width = '90%'
        energyBar.style.background = '#ff5500'
      }
    }
  }

  const handleEmergencyStop = () => {
    if (isWarping) {
        setIsWarping(false)
        setThrottleValue(0)
        addLog("!!! EMERGENCY STOP !!!")
        addLog("/// REACTOR SCRAM")
        
        const viewport = document.getElementById('viewport')
        if (viewport) {
            viewport.style.animation = 'shake 0.5s cubic-bezier(.36,.07,.19,.97) both'
    setTimeout(() => {
                viewport.style.animation = ''
            }, 500)
        }
    } else {
        addLog("/// EMERGENCY STOP PRESSED: SYSTEM HALT")
        setThrottleValue(0)
    }
  }

  const toggleRoundButton = (id: string) => {
    setActiveRounds(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    )
    addLog(`/// ${id} : ${!activeRounds.includes(id) ? 'ON' : 'OFF'}`)
  }

  return (
    <div className="fixed top-0 left-0 w-screen h-screen select-none font-mono overflow-hidden bg-[#050000]">
      <style>{`
        @keyframes shake {
            10%, 90% { transform: translate3d(-1px, 0, 0); }
            20%, 80% { transform: translate3d(2px, 0, 0); }
            30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
            40%, 60% { transform: translate3d(4px, 0, 0); }
        }
      `}</style>
      
      <div className={`absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,#2e1a1a_0%,#000_100%)] z-[-1] overflow-hidden ${isWarping ? 'warp-active' : ''}`} id="viewport">
        <div className="absolute top-1/2 left-1/2 w-0.5 h-0.5 bg-[#ffaaaa] shadow-[-100px_-50px_#fff,200px_150px_#fff,-300px_200px_#fff,100px_-300px_#fff,400px_-100px_#fff,-200px_-400px_#fff] animate-[fly_4s_linear_infinite] star-anim" />
        <div className="absolute top-1/2 left-1/2 w-0.5 h-0.5 bg-[#ffaaaa] shadow-[-100px_-50px_#fff,200px_150px_#fff,-300px_200px_#fff,100px_-300px_#fff,400px_-100px_#fff,-200px_-400px_#fff] animate-[fly_4s_linear_infinite] opacity-40 [animation-duration:3s] star-anim" />
        <div className={`fixed top-0 left-0 w-full h-full bg-red-600 opacity-0 transition-opacity duration-[2000ms] z-[100] mix-blend-overlay pointer-events-none ${isWarping ? 'opacity-60' : ''}`} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[320px_1fr_320px] grid-rows-[auto_auto_auto] md:grid-rows-[1fr_240px] gap-[10px] md:gap-[15px] p-[10px] md:p-[15px] w-full h-full max-w-[100vw] bg-[#110a0a] shadow-[inset_0_0_150px_rgba(255,50,0,0.3)] box-border overflow-y-auto md:overflow-hidden">

        <div className="col-start-1 row-start-1 md:[transform:perspective(1000px)_rotateY(15deg)] md:[transform-origin:right_center] border-r-0 flex flex-col relative p-[10px] md:p-[15px] bg-metal-gradient border-[2px] md:border-[3px] border-black border-t-[#4a2e2e] border-l-[#4a2e2e] shadow-[0_0_30px_rgba(0,0,0,0.9)]">
          <div className="absolute top-[6px] left-[6px] w-[6px] h-[6px] bg-[#221111] rounded-full border border-[#552222]" />
          <div className="absolute top-[6px] right-[6px] w-[6px] h-[6px] bg-[#221111] rounded-full border border-[#552222]" />
          
          <div className="bg-[#110000] border-[2px] border-[#331111] shadow-[inset_0_0_30px_#ff5500] p-[10px] text-[#ffccaa] flex-grow relative overflow-hidden mb-[15px]">
            <div className="absolute top-0 left-0 w-full h-full bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.4)_0px,rgba(255,68,0,0.1)_2px,rgba(0,0,0,0.4)_4px)] pointer-events-none z-[2]" />
            <div className="mb-3 relative z-[3]">
              <div className="text-[0.6rem] text-[#884444] mb-[2px]">PWR.MAIN</div>
              <div className="bg-[#220000] h-2 w-full border border-[#550000]">
                <div className="h-full bg-[#ff5500] w-[100%] shadow-[0_0_15px_#ff5500] transition-[width] duration-500" id="energy-bar" />
              </div>
            </div>
            <div className="mb-3 relative z-[3]">
              <div className="text-[0.6rem] text-[#884444] mb-[2px]">CAP.AUX</div>
              <div className="bg-[#220000] h-2 w-full border border-[#550000]">
                <div className="h-full bg-[#ff5500] w-[85%] shadow-[0_0_15px_#ff5500] transition-[width] duration-500" />
              </div>
            </div>
            <div className="flex gap-4 justify-center mt-6 z-[3] relative">
               <RoundButton label="NAV" active={activeRounds.includes('NAV')} onClick={() => toggleRoundButton('NAV')} />
               <RoundButton label="COM" active={activeRounds.includes('COM')} onClick={() => toggleRoundButton('COM')} />
               <RoundButton label="LIF" active={activeRounds.includes('LIF')} onClick={() => toggleRoundButton('LIF')} />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-[6px] md:gap-[8px] mt-auto pt-[10px] border-t border-[#441111]">
            {["SYS", "NAV", "COM", "A-1", "A-2", "A-3"].map(label => (
              <div key={label} onClick={() => playClick(label)} onMouseEnter={() => playHoverSound()} className="bg-[#220000] border border-[#551111] text-[#883333] text-[0.55rem] md:text-[0.6rem] py-[10px] md:py-[8px] text-center cursor-pointer transition-all duration-200 shadow-[0_2px_0_#000] font-orbitron hover:bg-[#551111] hover:text-[#ff5500] hover:shadow-[0_0_10px_#ff5500] active:translate-y-[2px] active:shadow-none touch-manipulation min-h-[44px] md:min-h-0">
                {label}
              </div>
            ))}
          </div>
        </div>

        <div className="col-start-1 md:col-start-2 row-start-2 md:row-start-1 relative border-[10px] md:border-[20px] border-[#2d1d1d] border-b-[20px] md:border-b-[40px] rounded-[4px] md:rounded-[8px] pointer-events-none group hover:border-[#ff5500] transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,85,0,0.5)] overflow-hidden bg-black min-h-[200px] md:min-h-0">
          <WindowStars speedMultiplier={isWarping ? (throttleValue / 20) : 1} />
          <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent_0px,transparent_2px,rgba(255,85,0,0.1)_2px,rgba(255,85,0,0.1)_4px)] pointer-events-none z-10" />
          <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent_0px,transparent_1px,rgba(255,85,0,0.05)_1px,rgba(255,85,0,0.05)_2px)] pointer-events-none z-10" />
          
          <div className="absolute top-4 left-4 text-[#ff5500] font-orbitron text-xs opacity-60 z-20">
            <div>SPD: {isWarping ? Math.floor(throttleValue * 299.79) : 0} Mm/s</div>
            <div>HDG: 274.15 MARK 2</div>
          </div>
        </div>

        <div className="col-start-1 md:col-start-3 row-start-3 md:row-start-1 md:[transform:perspective(1000px)_rotateY(-15deg)] md:[transform-origin:left_center] border-l-0 flex flex-col relative p-[10px] md:p-[15px] bg-metal-gradient border-[2px] md:border-[3px] border-black border-t-[#4a2e2e] border-l-[#4a2e2e] shadow-[0_0_30px_rgba(0,0,0,0.9)]">
          <div className="absolute top-[6px] left-[6px] w-[6px] h-[6px] bg-[#221111] rounded-full border border-[#552222]" />
          <div className="absolute top-[6px] right-[6px] w-[6px] h-[6px] bg-[#221111] rounded-full border border-[#552222]" />

          <div className="bg-[#110000] border-[2px] border-[#331111] shadow-[inset_0_0_30px_#ff5500] p-[10px] text-[#ffccaa] flex-grow relative overflow-hidden mb-[15px]">
             <div className="absolute top-0 left-0 w-full h-full bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.4)_0px,rgba(255,68,0,0.1)_2px,rgba(0,0,0,0.4)_4px)] pointer-events-none z-[2]" />
             
             <div className="w-[150px] h-[150px] rounded-full border border-dashed border-[#ff5500] relative overflow-hidden mx-auto mt-[10px] mb-[5px] bg-[radial-gradient(#330000,#000)] z-[3]">
                <div className={`absolute top-1/2 left-1/2 w-1/2 h-[2px] bg-[#ff5500] origin-top-left shadow-[0_0_20px_#ff5500] transition-opacity duration-300 ${isRadarActive ? 'animate-[spin_3s_linear_infinite] opacity-100' : 'opacity-30'}`} />
                {radarDots.map(dot => {
                  const centerX = 75
                  const centerY = 75
                  const x = centerX + Math.cos(dot.angle) * dot.distance
                  const y = centerY + Math.sin(dot.angle) * dot.distance
                  return (
                    <div 
                      key={dot.id}
                      className="absolute w-1.5 h-1.5 bg-[#ff0000] rounded-full shadow-[0_0_5px_#ff0000] transition-opacity duration-300"
                      style={{ 
                        left: `${x}px`, 
                        top: `${y}px`, 
                        transform: 'translate(-50%, -50%)',
                        opacity: dot.opacity 
                      }}
                    />
                  )
                })}
            </div>

            <div className="text-[0.65rem] h-[100px] overflow-y-auto text-[#ffccaa] z-[3] font-mono scrollbar-hide mt-4">
              {logs.map((log, i) => (
                <div key={i} className="mb-1">{log}</div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-[6px] md:gap-[8px] mt-auto pt-[10px] border-t border-[#441111]">
            {["RST", "LOG", "PUR", "B-1", "B-2", "B-3"].map(label => (
              <div 
                key={label} 
                onClick={() => playClick(label)} 
                onMouseEnter={() => playHoverSound()} 
                className="bg-[#220000] border border-[#551111] text-[#883333] text-[0.55rem] md:text-[0.6rem] py-[10px] md:py-[8px] text-center cursor-pointer transition-all duration-200 shadow-[0_2px_0_#000] font-orbitron hover:bg-[#551111] hover:text-[#ff5500] hover:shadow-[0_0_10px_#ff5500] active:translate-y-[2px] active:shadow-none touch-manipulation min-h-[44px] md:min-h-0 flex items-center justify-center"
              >
                {label === "LOG" ? (
                  <span className="text-sm md:text-base transition-all duration-200 hover:scale-110 inline-block">
                    <LuBanana className="w-4 h-4 md:w-5 md:h-5" />
                  </span>
                ) : (
                  label
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-1 md:col-span-3 row-start-4 md:row-start-2 flex flex-col md:flex-row justify-between items-center md:[transform:perspective(600px)_rotateX(15deg)] z-[10] border-t-[2px] border-[#ff5500] bg-[#1a0a0a] relative px-[20px] md:px-[40px] py-[15px] shadow-[0_0_30px_rgba(0,0,0,0.9)] gap-4 md:gap-0">
          <div className="absolute top-[6px] left-[6px] w-[6px] h-[6px] bg-[#221111] rounded-full border border-[#552222]" />
          <div className="absolute top-[6px] right-[6px] w-[6px] h-[6px] bg-[#221111] rounded-full border border-[#552222]" />

          <div className="flex gap-8 items-center">
             <ToggleSwitch 
                isOn={switch1} 
                onToggle={(v) => { setSwitch1(v); addLog(`/// MAIN PWR: ${v ? 'ONLINE' : 'OFFLINE'}`) }} 
                label="MAIN PWR" 
             />
             <ToggleSwitch 
                isOn={switch2} 
                onToggle={(v) => { setSwitch2(v); addLog(`/// AUX PWR: ${v ? 'ONLINE' : 'OFFLINE'}`) }} 
                label="AUX PWR" 
                color="#ffaa00"
             />
          </div>

          <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-center w-full md:w-auto">
            <Throttle 
                value={throttleValue} 
                onChange={(v) => { setThrottleValue(v); if(isWarping) addLog(`/// THRUST: ${v}%`) }} 
            />
            
            <div className="flex flex-col items-center gap-2">
                <div className="relative">
                    <div className="hidden md:block absolute top-1/2 -left-6 w-6 h-[2px] bg-[#331111]" />
                    <div className="hidden md:block absolute top-1/2 -right-6 w-6 h-[2px] bg-[#331111]" />

          <button 
            onClick={toggleWarp}
            onMouseEnter={() => playHoverSound()}
                        className={`w-[140px] md:w-[160px] h-[80px] md:h-[100px] bg-gradient-to-b from-[#441111] to-[#1a0505] border-[2px] rounded-[6px] text-[#aa4444] font-orbitron font-bold text-lg md:text-[1.5rem] cursor-pointer relative overflow-hidden transition-all duration-100 shadow-[0_5px_10px_rgba(0,0,0,0.5)] flex flex-col justify-center items-center active:translate-y-[4px] active:border-[#330000] active:bg-[#110000] active:shadow-none group
                        ${isWarping 
                            ? 'border-[#ff0000] text-[#ffaaaa] shadow-[0_0_30px_#ff0000] bg-[#550000]' 
                            : 'border-[#661111] hover:border-[#ff5500] hover:text-[#ff5500]'}`}
          >
                        <span className="z-10">{isWarping ? 'DISENGAGE' : 'ENGAGE'}</span>
                        <span className="text-[0.5rem] md:text-[0.6rem] z-10 opacity-70 mt-1">SEQ. WARP</span>
            <div className="absolute bottom-0 left-0 w-full h-[8px] bg-[repeating-linear-gradient(45deg,#000,#000_5px,#441111_5px,#441111_10px)]" />
                        
                        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[60%] bg-[#ff0000] blur-[20px] transition-opacity duration-300 ${isWarping ? 'opacity-40' : 'opacity-0 group-hover:opacity-10'}`} />
          </button>
                </div>
            </div>

            <AZ5Button onClick={handleEmergencyStop} />
          </div>

          <div className="flex gap-4">
             <RoundButton label="RADAR" active={activeRounds.includes('RAD')} onClick={() => toggleRoundButton('RAD')} />
             <RoundButton label="WEAPON" active={activeRounds.includes('WPN')} onClick={() => toggleRoundButton('WPN')} color="#ff0000" />
          </div>
        </div>

      </div>

      <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-[100]">
        <button
          onClick={() => {
            if (uiSoundRef.current) {
              uiSoundRef.current.currentTime = 0
              uiSoundRef.current.play().catch(() => {})
            }
            setIsWelcomeModalOpen(true)
          }}
          className="relative w-10 h-10 md:w-12 md:h-12 rounded-full group transition-all duration-300 hover:scale-110 active:scale-95"
        >
          <div className="absolute inset-0 rounded-full border-[2px] border-[#ff5500] bg-[#1a0a0a] shadow-[0_0_15px_rgba(255,85,0,0.5)] group-hover:shadow-[0_0_25px_rgba(255,85,0,0.8)] transition-all duration-300" />
          
          <div className="absolute inset-1.5 rounded-full bg-gradient-to-br from-[#ff5500]/20 to-[#ff5500]/5 border border-[#ff5500]/50 group-hover:from-[#ff5500]/30 group-hover:to-[#ff5500]/10 transition-all duration-300" />
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#ff5500] font-orbitron font-bold text-lg md:text-xl group-hover:text-[#ffaa88] transition-colors duration-300 drop-shadow-[0_0_8px_rgba(255,85,0,0.8)]">
            ?
          </div>
          
          <div className="absolute inset-[-4px] rounded-full border border-[#ff5500]/30 opacity-0 group-hover:opacity-100 group-hover:animate-spin transition-opacity duration-300" style={{ animationDuration: '3s' }} />
          
          <div className="absolute inset-[-8px] rounded-full bg-[#ff5500] opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300" />
        </button>
      </div>

      <div className="fixed top-4 right-4 md:top-8 md:right-8 z-[100]">
        <button
          onClick={() => {
            if (uiSoundRef.current) {
              uiSoundRef.current.currentTime = 0
              uiSoundRef.current.play().catch(() => {})
            }
            setIsCrewModalOpen(true)
          }}
          onMouseEnter={() => playHoverSound()}
          className="relative w-10 h-10 md:w-12 md:h-12 rounded-full group transition-all duration-300 hover:scale-110 active:scale-95"
        >
          <div className="absolute inset-0 rounded-full border-[2px] border-[#ff5500] bg-[#1a0a0a] shadow-[0_0_15px_rgba(255,85,0,0.5)] group-hover:shadow-[0_0_25px_rgba(255,85,0,0.8)] transition-all duration-300" />
          
          <div className="absolute inset-1.5 rounded-full bg-gradient-to-br from-[#ff5500]/20 to-[#ff5500]/5 border border-[#ff5500]/50 group-hover:from-[#ff5500]/30 group-hover:to-[#ff5500]/10 transition-all duration-300" />
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#ff5500] font-orbitron font-bold text-lg md:text-xl group-hover:text-[#ffaa88] transition-colors duration-300 drop-shadow-[0_0_8px_rgba(255,85,0,0.8)]">
            C
          </div>
          
          <div className="absolute inset-[-4px] rounded-full border border-[#ff5500]/30 opacity-0 group-hover:opacity-100 group-hover:animate-spin transition-opacity duration-300" style={{ animationDuration: '3s' }} />
          
          <div className="absolute inset-[-8px] rounded-full bg-[#ff5500] opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300" />
        </button>
      </div>

      <WelcomeModal 
        isOpen={isWelcomeModalOpen} 
        onClose={() => setIsWelcomeModalOpen(false)} 
      />

      <CrewModal 
        isOpen={isCrewModalOpen} 
        onClose={() => setIsCrewModalOpen(false)} 
      />
    </div>
  )
}

export default Spaceship
