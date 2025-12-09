import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface SoundContextType {
  sfxVolume: number
  setSfxVolume: (volume: number) => void
}

const SoundContext = createContext<SoundContextType | undefined>(undefined)

const STORAGE_KEY = 'spaceship-sfx-volume'

export const SoundProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [sfxVolume, setSfxVolume] = useState(() => {
    // Load from localStorage on initial render
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved !== null) {
      const parsed = parseFloat(saved)
      if (!isNaN(parsed) && parsed >= 0 && parsed <= 1) {
        return parsed
      }
    }
    return 0.3 // default value
  })

  // Save to localStorage whenever sfxVolume changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, sfxVolume.toString())
  }, [sfxVolume])

  const handleSetSfxVolume = (volume: number) => {
    setSfxVolume(volume)
  }

  return (
    <SoundContext.Provider value={{ sfxVolume, setSfxVolume: handleSetSfxVolume }}>
      {children}
    </SoundContext.Provider>
  )
}

export const useSoundContext = () => {
  const context = useContext(SoundContext)
  if (context === undefined) {
    throw new Error('useSoundContext must be used within a SoundProvider')
  }
  return context
}


