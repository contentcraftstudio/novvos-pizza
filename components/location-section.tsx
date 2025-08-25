"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Clock, Phone, MessageCircle, Truck } from "lucide-react"

export function LocationSection() {
  const ref = useRef(null)
  const [isMobile, setIsMobile] = useState(false)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  
  useEffect(() => {
    const checkMobile = () => window.innerWidth < 768
    setIsMobile(checkMobile())
    
    const handleResize = () => {
      setIsMobile(checkMobile())
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const openWhatsApp = () => {
    const phoneNumber = "+573245256142"
    const message = "¡Hola! Me gustaría hacer un pedido de K-Box de Novvos 🍕"
    const encodedMessage = encodeURIComponent(message)
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank")
  }

  const coverageAreas = [
    "El Prado", 
    "Boston", 
    "Abajo", 
    "Montecristo", 
    "Villa Tarel", 
    "Los Pinos", 
    "Las Delicias",
    "Centro",
    "La Paz",
    "La Magdalena"
  ]

  return (
    <section ref={ref} className="py-16 md:py-20 lg:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={(isInView || isMobile) ? { opacity: 1, y: 0 } : {}}
          transition={{ 
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1],
            ...(typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches 
              ? { duration: 0 }
              : {})
          }}
          className="text-center mb-12 md:mb-16 lg:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#0B0B0B] mb-3 md:mb-4">
            Zona de Cobertura
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Entregamos nuestras deliciosas K-Box directamente a tu puerta
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
          {/* Card 1: Coverage Areas */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={(isInView || isMobile) ? { opacity: 1, y: 0 } : {}}
            transition={{ 
              duration: 0.6, 
              delay: 0.2,
              ease: [0.16, 1, 0.3, 1],
              ...(typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches 
                ? { duration: 0 }
                : {})
            }}
            className="lg:col-span-1"
          >
            <Card className="h-full border-2 border-[#FFA640]/20 hover:border-[#FFA640] transition-all duration-300 hover:shadow-lg">
              <CardContent className="p-6 h-full flex flex-col">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-[#FFA640]/10 rounded-lg">
                    <Truck className="w-6 h-6 text-[#FFA640]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0B0B0B]">Zonas de Cobertura</h3>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-2 flex-grow">
                  {coverageAreas.map((area, index) => (
                    <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg">
                      <Truck className="w-4 h-4 text-[#FFA640] flex-shrink-0" />
                      <span className="text-sm sm:text-base text-gray-700 font-medium">{area}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Card 2: Schedule */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={(isInView || isMobile) ? { opacity: 1, y: 0 } : {}}
            transition={{ 
              duration: 0.6, 
              delay: 0.3,
              ease: [0.16, 1, 0.3, 1],
              ...(typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches 
                ? { duration: 0 }
                : {})
            }}
            className="lg:col-span-1"
          >
            <Card className="h-full border-2 border-[#FFA640]/20 hover:border-[#FFA640] transition-all duration-300 hover:shadow-lg">
              <CardContent className="p-6 h-full flex flex-col">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 bg-[#FFA640]/10 rounded-lg">
                    <Clock className="w-6 h-6 text-[#FFA640]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0B0B0B]">Horario de Entrega</h3>
                </div>
                <div className="bg-gradient-to-br from-[#FFA640]/5 to-[#FFA640]/10 p-6 rounded-xl flex-grow flex flex-col justify-center">
                  <div className="flex items-center justify-center space-x-3 mb-4">
                    <Clock className="w-6 h-6 text-[#FFA640]" />
                    <p className="text-lg font-medium text-gray-800">Jueves a Domingo y Festivos</p>
                  </div>
                  <p className="text-2xl font-bold text-center text-gray-900">4:00 PM - 9:00 PM</p>
                  <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600 mb-2">*Cerrado de Lunes a Miércoles</p>
                  </div>
                  <div className="mt-2 w-full h-2 bg-gradient-to-r from-[#FFA640]/30 via-[#FFA640] to-[#FFA640]/30 rounded-full"></div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Card 3: Contact & WhatsApp */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={(isInView || isMobile) ? { opacity: 1, y: 0 } : {}}
            transition={{ 
              duration: 0.6, 
              delay: 0.4,
              ease: [0.16, 1, 0.3, 1],
              ...(typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches 
                ? { duration: 0 }
                : {})
            }}
            className="lg:col-span-1"
          >
            <Card className="h-full border-2 border-[#FFA640]/20 hover:border-[#FFA640] transition-all duration-300 hover:shadow-lg">
              <CardContent className="p-6 h-full flex flex-col">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 bg-[#FFA640]/10 rounded-lg">
                    <Phone className="w-6 h-6 text-[#FFA640]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0B0B0B]">Contacto</h3>
                </div>
                <div className="space-y-4 flex-grow flex flex-col">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-gray-700">
                      <MessageCircle className="w-5 h-5 text-[#25D366]" />
                      <span>WhatsApp: <span className="font-medium">+57 324 525 6142</span></span>
                    </div>
                    <div className="flex items-start space-x-2 text-gray-600">
                      <svg className="w-5 h-5 text-[#FFA640] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span>contacto@innogrowth.co</span>
                    </div>
                  </div>
                  <div className="mt-auto pt-4">
                    <Button
                      onClick={openWhatsApp}
                      size="lg"
                      className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-6 text-base transition-all duration-300 transform hover:scale-[1.02]"
                    >
                      <MessageCircle className="w-5 h-5 mr-2" />
                      Pedir por WhatsApp
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Kitchen Info Card - Full Width */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={(isInView || isMobile) ? { opacity: 1, y: 0 } : {}}
          transition={{ 
            duration: 0.6, 
            delay: 0.5,
            ease: [0.16, 1, 0.3, 1],
            ...(typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches 
              ? { duration: 0 }
              : {})
          }}
          className="mt-8 md:mt-12"
        >
          <div className="bg-gradient-to-r from-[#FFA640]/5 to-[#FFA640]/10 rounded-2xl p-8 md:p-10 lg:p-12 flex flex-col md:flex-row items-center justify-between">
            <div className="text-center md:text-left mb-6 md:mb-0 md:mr-8">
              <h3 className="text-2xl md:text-3xl font-bold text-[#0B0B0B] mb-3">Cocina Oculta</h3>
              <p className="text-gray-600 mb-6 max-w-2xl">
                Preparamos cada K-Box con ingredientes frescos y mucho amor desde nuestra cocina especializada, 
                para llevarte una experiencia culinaria única directamente a tu hogar.
              </p>
              <div className="inline-flex items-center bg-[#FFA640] text-black px-6 py-3 rounded-full font-bold text-sm md:text-base">
                <Truck className="w-5 h-5 mr-2" />
                <span>Delivery en 15-20 min</span>
              </div>
            </div>
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="text-7xl md:text-8xl"
            >
              🍕
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
