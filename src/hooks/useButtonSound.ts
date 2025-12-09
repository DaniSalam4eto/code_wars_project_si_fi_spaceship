import { useRef, useEffect } from 'react'
import { useSoundContext } from '../contexts/SoundContext'

export const useButtonSound = () => {
  const { sfxVolume } = useSoundContext()
  const hoverAudioRef = useRef<HTMLAudioElement | null>(null)
  const clickAudioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    hoverAudioRef.current = new Audio('/sfx_ambient_music/Button Clicks Sound Effect  SFX (mp3cut.net).mp3')
    hoverAudioRef.current.volume = sfxVolume
    hoverAudioRef.current.preload = 'auto'
    hoverAudioRef.current.load()

    clickAudioRef.current = new Audio('/sfx_ambient_music/old-radio-button-click-97549 (mp3cut.net).mp3')
    clickAudioRef.current.volume = sfxVolume
    clickAudioRef.current.preload = 'auto'
    clickAudioRef.current.load()
  }, [sfxVolume])
  useEffect(() => {
    if (hoverAudioRef.current) {
      hoverAudioRef.current.volume = sfxVolume
    }
    if (clickAudioRef.current) {
      clickAudioRef.current.volume = sfxVolume
    }
  }, [sfxVolume])

  const playHoverSound = () => {
    if (hoverAudioRef.current) {
      hoverAudioRef.current.currentTime = 0
      hoverAudioRef.current.play().catch(() => {})
    }
  }

  const playClickSound = () => {
    if (clickAudioRef.current) {
      clickAudioRef.current.currentTime = 0
      clickAudioRef.current.play().catch(() => {})
    }
  }

  return { playHoverSound, playClickSound }
}

