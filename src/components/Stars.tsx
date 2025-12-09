import React, { useMemo } from 'react'

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

const Stars: React.FC = () => {
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
      
      let startY
      if (i < starCount * 0.4) {
        startY = Math.random() * 40 + 60
      } else if (i < starCount * 0.7) {
        startY = Math.random() * 40 + 20
      } else {
        startY = Math.random() * 120 - 20
      }

      starArray.push({
        id: i,
        x: Math.random() * 100,
        size: Math.random() * 2.5 + 0.5,
        duration: Math.random() * 6 + 4,
        delay: Math.random() * 2,
        color: `rgba(${palette.main[0]}, ${palette.main[1]}, ${palette.main[2]}, ${opacity})`,
        shadowColor: `rgba(${palette.shadow[0]}, ${palette.shadow[1]}, ${palette.shadow[2]}, ${brightness})`,
        startY,
        animationName: `starMoveUp${i}`,
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
              transform: translate3d(0, ${star.startY}vh, 0);
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
              transform: translate3d(0, calc(${star.startY}vh - 100vh - 20px), 0);
              opacity: 0;
            }
          }
        `).join('')}
        .star {
          will-change: transform, opacity;
          transform: translateZ(0);
        }
      `}</style>
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full star"
            style={{
              left: `${star.x}%`,
              top: '0px',
              width: `${star.size}px`,
              height: `${star.size}px`,
              backgroundColor: star.color,
              boxShadow: `0 0 ${star.size * 2}px ${star.color}, 0 0 ${star.size * 4}px ${star.shadowColor}`,
              animation: `${star.animationName} ${star.duration}s linear ${star.delay}s infinite`,
            }}
          />
        ))}
      </div>
    </>
  )
}

export default Stars
