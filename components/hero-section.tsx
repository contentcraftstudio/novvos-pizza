"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useMemo, useEffect, useState } from "react"

export function HeroSection() {
  const scrollToMenu = () => {
    document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" })
  }

  // Generate particles only on client-side to avoid hydration mismatch
  const [particles, setParticles] = useState<Array<{
    left: number
    top: number
    duration: number
    delay: number
    size: number
    opacity: number
  }>>([])
  const [isMobile, setIsMobile] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Set loaded state to true after initial render
    setIsLoaded(true)
    
    // Check if mobile
    const checkMobile = () => window.innerWidth < 768
    const mobile = checkMobile()
    setIsMobile(mobile)
    
    // Generate particles based on device type
    const particleCount = mobile ? 8 : 20
    const generated = Array.from({ length: particleCount }).map(() => {
      const size = mobile ? 1 + Math.random() * 2 : 2 + Math.random() * 3
      return {
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: mobile ? 3 + Math.random() * 3 : 4 + Math.random() * 4,
        delay: Math.random() * 2,
        size: size,
        opacity: mobile ? 0.4 + Math.random() * 0.3 : 0.4 + Math.random() * 0.4
      }
    })
    
    setParticles(generated)
    
    // Handle resize with debounce
    let resizeTimeout: NodeJS.Timeout
    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        setIsMobile(checkMobile())
      }, 100)
    }
    
    window.addEventListener('resize', handleResize, { passive: true })
    return () => {
      clearTimeout(resizeTimeout)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0B0B0B]">
      {/* Animated background with optimized performance */}
      <motion.div
        className="absolute inset-0 opacity-30"
        initial={false}
        animate={{
          scale: isMobile ? 1 : [1, 1.03, 1],
          rotate: isMobile ? 0 : [0, 0.5, 0],
        }}
        transition={{
          duration: isMobile ? 20 : 15,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        style={{
          willChange: 'transform',
          transform: 'translateZ(0)', // Force GPU acceleration
        }}
      >
        <div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: `url('/images/pizza-oven.jpg')`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            transform: 'translateZ(0)', // Force GPU acceleration
          }}
        />
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 md:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ 
            duration: 0.8, 
            ease: 'easeOut',
            ...(typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches 
              ? { duration: 0 }
              : {})
          }}
          className="max-w-4xl mx-auto w-full"
        >
          <div className="w-full flex justify-center">
            <img 
              src="/images/novvos-logo.svg" 
              alt="Novvos Pizza" 
              className="w-[280px] sm:w-96 md:w-[450px] lg:w-[500px] h-auto"
              loading="eager"
              width={500}
              height={200}
            />
          </div>
        </motion.div>

        <motion.p 
          className="text-base sm:text-lg md:text-xl text-gray-200 text-center max-w-2xl mx-auto mb-6 sm:mb-8 px-2"
          initial={{ opacity: 0, y: 10 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ 
            delay: 0.2,
            duration: 0.6,
            ease: 'easeOut',
            ...(typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches 
              ? { duration: 0 }
              : {})
          }}
        >
          Ingredientes frescos, preparación artesanal y un sabor inigualable en cada bocado.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
          transition={{ 
            duration: 0.6, 
            delay: 0.4,
            type: 'spring',
            stiffness: 100,
            damping: 10,
            ...(typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches 
              ? { duration: 0 }
              : {})
          }}
        >
          <Button 
            onClick={scrollToMenu}
            size={isMobile ? 'default' : 'lg'}
            className="bg-[#FFA640] hover:bg-[#e69538] text-black font-bold text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-full transition-all duration-200 active:scale-95 transform hover:scale-105 focus:ring-2 focus:ring-[#FFA640] focus:ring-opacity-50"
          >
            Ver Menú
          </Button>
        </motion.div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((particle, index) => (
          <motion.div
            key={index}
            className="absolute rounded-full bg-[#FFA640]"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              willChange: 'transform, opacity',
              transform: 'translateZ(0)',
              opacity: isMobile ? 0 : undefined, // Hide particles on mobile
            }}
            initial={false}
            animate={{
              opacity: isMobile ? 0 : [0, particle.opacity, 0],
              scale: isMobile ? 0 : [0.5, 1, 0.5],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Number.POSITIVE_INFINITY,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
    </section>
  )
}
