"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Clock, Phone, MessageCircle, Truck } from "lucide-react"

export function LocationSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const openWhatsApp = () => {
    const phoneNumber = "+573245256142"
    const message = "¡Hola! Me gustaría hacer un pedido de Novvo's Pizza 🍕"
    const encodedMessage = encodeURIComponent(message)
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank")
  }

  const coverageAreas = ["El Prado", "Boston", "Abajo", "Montecristo", "Villa Tarel", "Los Pinos", "Las Delicias"]

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-[#0B0B0B] mb-4">Cobertura de Delivery</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Cocina oculta - Llevamos nuestras pizzas directamente a tu puerta
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <Card className="border-2 border-[#FFA640]/20 hover:border-[#FFA640] transition-colors">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Truck className="w-6 h-6 text-[#FFA640] mt-1" />
                  <div>
                    <h3 className="font-bold text-lg text-[#0B0B0B] mb-2">Barrios con Cobertura</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {coverageAreas.map((area, index) => (
                        <motion.div
                          key={area}
                          initial={{ opacity: 0, x: -20 }}
                          animate={isInView ? { opacity: 1, x: 0 } : {}}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="bg-[#FFA640]/10 text-[#0B0B0B] px-3 py-2 rounded-lg text-sm font-medium"
                        >
                          📍 {area}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-[#FFA640]/20 hover:border-[#FFA640] transition-colors">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Clock className="w-6 h-6 text-[#FFA640] mt-1" />
                  <div>
                    <h3 className="font-bold text-lg text-[#0B0B0B] mb-2">Horarios de Delivery</h3>
                    <div className="text-gray-600 space-y-1">
                      <p>Lunes a Jueves: 11:00 - 23:00</p>
                      <p>Viernes a Sábado: 11:00 - 24:00</p>
                      <p>Domingo: 12:00 - 22:00</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-[#FFA640]/20 hover:border-[#FFA640] transition-colors">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Phone className="w-6 h-6 text-[#FFA640] mt-1" />
                  <div>
                    <h3 className="font-bold text-lg text-[#0B0B0B] mb-2">Contacto</h3>
                    <p className="text-gray-600 mb-4">
                      WhatsApp: +57 324 525 6142
                      <br />
                      Email: contact@innogrowth.co
                    </p>
                    <Button onClick={openWhatsApp} className="bg-green-500 hover:bg-green-600 text-white font-bold">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Pedir por WhatsApp
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-[#FFA640]/10 to-[#FFA640]/5 rounded-2xl p-8 h-96 flex flex-col items-center justify-center text-center">
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                className="text-6xl mb-4"
              >
                🍕
              </motion.div>
              <h3 className="text-2xl font-bold text-[#0B0B0B] mb-4">Cocina Oculta</h3>
              <p className="text-gray-600 mb-6">
                Preparamos cada pizza con amor desde nuestra cocina especializada y la llevamos directamente a tu hogar.
              </p>
              <div className="bg-[#FFA640] text-black px-6 py-3 rounded-full font-bold">🚚 Delivery en 30-45 min</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
