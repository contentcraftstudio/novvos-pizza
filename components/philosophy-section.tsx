"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"

export function PhilosophySection() {
  const ref = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const isInView = useInView(ref, { 
    once: true, 
    margin: isMobile ? '-20%' : '-10%',
    amount: 0.1
  })
  
  useEffect(() => {
    // Set loaded state
    setIsLoaded(true)
    
    // Check if mobile on client-side
    const checkMobile = () => {
      if (typeof window === 'undefined') return false
      return window.innerWidth < 768
    }
    
    const mobile = checkMobile()
    setIsMobile(mobile)
    
    // Debounce resize handler
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
    <section ref={ref} className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start">
          {/* Left Column - All Text Content */}
          <div className="space-y-8 md:space-y-10 lg:pr-10">
            <motion.div
              initial={{ opacity: 0, x: isMobile ? 0 : -30 }}
              animate={(isInView || isMobile) && isLoaded ? { 
                opacity: 1, 
                x: 0 
              } : {}}
              transition={{ 
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
                ...(typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches 
                  ? { duration: 0 }
                  : {})
              }}
            >
              <motion.h2
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#0B0B0B] mb-6 md:mb-8 lg:mb-10 leading-tight text-left"
                initial={{ opacity: isMobile ? 1 : 0, y: isMobile ? 0 : 10 }}
                animate={(isInView || isMobile) && isLoaded ? { 
                  opacity: 1,
                  y: 0
                } : {}}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.2,
                  ease: [0.16, 1, 0.3, 1],
                  ...(typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches 
                    ? { duration: 0 }
                    : {})
                }}
              >
                <span className="relative inline-block mb-2 md:mb-4 pb-1 md:pb-2">
                  La pizza individual no es soledad,
                  <motion.span 
                    className="absolute bottom-0 left-0 w-full h-0.5 md:h-1 bg-[#FFA640] block"
                    initial={{ scaleX: 0 }}
                    animate={(isInView || isMobile) && isLoaded ? { scaleX: 1 } : {}}
                    transition={{ 
                      duration: 0.8, 
                      delay: 0.4,
                      ease: [0.16, 1, 0.3, 1],
                      ...(typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches 
                        ? { duration: 0 }
                        : {})
                    }}
                    style={{ originX: 0 }}
                  />
                </span>
                <span className="relative inline-block text-[#FFA640] mt-1 md:mt-2 pb-1 md:pb-2">
                  es libertad de sabores.
                  <motion.span 
                    className="absolute bottom-0 left-0 w-full h-0.5 md:h-1 bg-[#0B0B0B] block"
                    initial={{ scaleX: 0 }}
                    animate={(isInView || isMobile) && isLoaded ? { scaleX: 1 } : {}}
                    transition={{ 
                      duration: 0.8, 
                      delay: 0.6,
                      ease: [0.16, 1, 0.3, 1],
                      ...(typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches 
                        ? { duration: 0 }
                        : {})
                    }}
                    style={{ originX: 0 }}
                  />
                </span>
              </motion.h2>
            </motion.div>

            <motion.div 
              className="flex items-start space-x-3 sm:space-x-4 p-4 sm:p-5 rounded-xl bg-white hover:bg-gray-50 transition-colors duration-200 shadow-sm border border-gray-100 max-w-2xl"
              initial={isMobile ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              animate={(isInView || isMobile) && isLoaded ? { 
                opacity: 1, 
                x: 0 
              } : {}}
              transition={{ 
                duration: 0.5, 
                delay: 0.5,
                ease: [0.16, 1, 0.3, 1]
              }}
            >
              <div className="flex-shrink-0 mt-0.5">
                <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full bg-[#FFA640] flex items-center justify-center shadow-md">
                  <span className="text-white font-bold text-base sm:text-lg">1</span>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#0B0B0B] mb-2 sm:mb-2.5">Ingredientes Premium</h3>
                <p className="text-gray-600 text-sm sm:text-[15px] md:text-base leading-relaxed">
                  Seleccionamos los mejores ingredientes para garantizar un sabor excepcional en cada bocado. 
                  Nuestros productos son cuidadosamente seleccionados para ofrecerte la mejor experiencia gastronómica.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Only Image */}
          <motion.div 
            className="relative overflow-hidden rounded-2xl shadow-xl transform hover:shadow-2xl transition-all duration-300 lg:sticky lg:top-24"
            initial={{ opacity: 0, y: 20 }}
            animate={(isInView || isMobile) && isLoaded ? { 
              opacity: 1, 
              y: 0 
            } : {}}
            transition={{ 
              duration: 0.6, 
              delay: 0.6,
              ease: [0.16, 1, 0.3, 1],
              ...(typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches 
                ? { duration: 0 }
                : {})
            }}
            whileHover={isMobile ? {} : { y: -5 }}
          >
            <img
              src="/images/novvos-branding-premium.png"
              alt="Branding premium de Novvo's Pizza con iluminación cálida"
              className="w-full h-auto"
              loading="lazy"
              width={600}
              height={800}
              style={{ objectFit: 'cover' }}
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B]/40 via-transparent to-transparent"
              initial={{ opacity: 0 }}
              animate={(isInView || isMobile) && isLoaded ? { opacity: 1 } : {}}
              transition={{ 
                duration: 1, 
                delay: 0.8,
                ...(typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches 
                  ? { duration: 0 }
                  : {})
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
