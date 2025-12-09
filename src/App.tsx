import React, { useEffect, useRef, useState } from 'react'
import Stars from './components/Stars'
import Header from './components/Header'
import Spaceship from './components/Spaceship'
import Crew from './components/Crew'
import SettingsModal from './components/SettingsModal'
import { SoundProvider, useSoundContext } from './contexts/SoundContext'

const STORAGE_KEY_MAIN_MUSIC = 'spaceship-main-music-volume'

const AppContent: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [mainMusicVolume, setMainMusicVolume] = useState(() => {
    // Load from localStorage on initial render
    const saved = localStorage.getItem(STORAGE_KEY_MAIN_MUSIC)
    if (saved !== null) {
      const parsed = parseFloat(saved)
      if (!isNaN(parsed) && parsed >= 0 && parsed <= 1) {
        return parsed
      }
    }
    return 0.4 // default value
  })
  const { sfxVolume, setSfxVolume } = useSoundContext()
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [currentView, setCurrentView] = useState<'SHIP' | 'CREW' | 'SYSTEMS'>('SHIP')

  // Save to localStorage whenever mainMusicVolume changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_MAIN_MUSIC, mainMusicVolume.toString())
  }, [mainMusicVolume])

  useEffect(() => {
    audioRef.current = new Audio('/sfx_ambient_music/Voyager_ Ambient SPACE Music for Colonizing the Cosmos (Relaxing Sci Fi Music).mp3')
    audioRef.current.loop = true
    audioRef.current.volume = mainMusicVolume
    audioRef.current.play().catch(() => {})

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = mainMusicVolume
    }
  }, [mainMusicVolume])

  return (
    <div className="min-h-screen bg-[#050b14] w-full h-screen relative overflow-hidden">
      <Stars />
      <Header onNavigate={setCurrentView} />
      
      {/* Main Content Area with Transition */}
      <main className="w-full h-screen relative z-10 pt-12 md:pt-14">
        
        {/* Ship View Container */}
        <div 
          className={`absolute inset-0 transition-all duration-700 ease-in-out transform ${
            currentView === 'CREW' 
              ? 'translate-x-[-100%] opacity-50 blur-sm pointer-events-none' 
              : 'translate-x-0 opacity-100 blur-none'
          }`}
        >
          <Spaceship />
          
          {/* Info for Ship Page (Bulgarian) */}
          <div className={`absolute top-20 left-4 max-w-xs text-left z-[55] pointer-events-none transition-opacity duration-300 ${currentView === 'SHIP' ? 'opacity-100' : 'opacity-0'}`}>
             <div className="text-[#ff5500] text-sm md:text-base font-bold mb-1">КОРАБ</div>
             <p className="text-[#ffaa88] text-xs md:text-sm bg-black/40 p-2 rounded border border-[#ff5500]/20">
               Това е главният контролен панел на кораба. Тук можете да управлявате системите и навигацията.
             </p>
          </div>
        </div>

        {/* Crew View Container */}
        <div 
          className={`absolute inset-0 transition-all duration-700 ease-in-out transform ${
            currentView === 'CREW' 
              ? 'translate-x-0 opacity-100' 
              : 'translate-x-[100%] opacity-0 pointer-events-none'
          }`}
        >
          {currentView === 'CREW' && <Crew onBack={() => setCurrentView('SHIP')} />}
        </div>

      </main>
      
      <button
        onClick={() => setIsSettingsOpen(true)}
        className="fixed top-2 right-2 md:top-4 md:right-4 z-[100] w-9 h-9 md:w-10 md:h-10 flex items-center justify-center text-[#ff5500] hover:text-[#ffaa88] transition-all duration-300 hover:scale-110 active:scale-95 border-2 border-[#ff5500]/50 hover:border-[#ff5500] bg-[#1a0a0a]/80 hover:bg-[#1a0a0a] backdrop-blur-sm touch-manipulation"
        title="Settings"
      >
        <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        mainMusicVolume={mainMusicVolume}
        onMainMusicVolumeChange={setMainMusicVolume}
        sfxVolume={sfxVolume}
        onSfxVolumeChange={setSfxVolume}
      />
    </div>
  )
}

const App: React.FC = () => {
  return (
    <SoundProvider>
      <AppContent />
    </SoundProvider>
  )
}

export default App
