"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Instagram, Facebook, MessageCircle, ShoppingCart, PartyPopper } from "lucide-react"

// Icono personalizado para TikTok
const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43V7.83a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.26z" />
  </svg>
)

// Icono personalizado para Rappi
const RappiIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
  </svg>
)

export default function LinkTreePage() {
  const [showModal, setShowModal] = useState(false)
  const [modalMessage, setModalMessage] = useState("")

  const openModal = (message: string) => {
    setModalMessage(message)
    setShowModal(true)
  }

  const openWhatsApp = (message: string) => {
    const phoneNumber = "+573245256142"
    const encodedMessage = encodeURIComponent(message)
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank")
  }

  const openInstagram = () => {
    window.open("https://www.instagram.com/novvostaste/", "_blank")
  }

  const openWhatsAppDirect = () => {
    openWhatsApp("¡Hola! Me gustaría hacer un pedido de Novvo's Pizza 🍕")
  }

  const openCatering = () => {
    openWhatsApp(
      "¡Hola! Estoy interesado/a en contratar el servicio de catering de Novvo's Pizza para mi fiesta/evento. Me gustaría conocer más detalles sobre opciones, precios y disponibilidad. ¡Gracias! 🍕🎉",
    )
  }

  const socialButtons = [
    {
      icon: <Instagram className="w-6 h-6" />,
      color: "bg-gradient-to-r from-purple-500 to-pink-500",
      action: openInstagram,
      available: true,
    },
    {
      icon: <Facebook className="w-6 h-6" />,
      color: "bg-blue-600",
      action: () => openModal("Facebook"),
      available: false,
    },
    {
      icon: <TikTokIcon />,
      color: "bg-black",
      action: () => openModal("TikTok"),
      available: false,
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      color: "bg-green-500",
      action: openWhatsAppDirect,
      available: true,
    },
  ]

  const mainButtons = [
    {
      icon: <ShoppingCart className="w-6 h-6" />,
      title: "Hacer Nuevo Pedido",
      description: "Explora nuestro menú y haz tu pedido",
      color: "bg-[#FFA640] hover:bg-[#FF9520]",
      textColor: "text-black",
      action: () => (window.location.href = "/"),
      available: true,
    },
    {
      icon: <RappiIcon />,
      title: "Pedir por Rappi",
      description: "Ordena a través de la app de Rappi",
      color: "bg-orange-500 hover:bg-orange-600",
      textColor: "text-white",
      action: () => openModal("Rappi"),
      available: false,
    },
    {
      icon: <PartyPopper className="w-6 h-6" />,
      title: "Catering Para Fiestas",
      description: "Perfecto para eventos y celebraciones",
      color: "bg-purple-600 hover:bg-purple-700",
      textColor: "text-white",
      action: openCatering,
      available: true,
    },
  ]

  const [currentYear, setCurrentYear] = useState<number>()
  useEffect(() => {
    setCurrentYear(new Date().getFullYear())
  }, [])

  return (
    <div className="min-h-screen bg-[#0B0B0B] flex flex-col items-center justify-center p-4 max-w-md mx-auto">
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-8"
      >
        <img src="/images/novvos-logo.svg" alt="Novvo's Pizza" className="w-48 h-auto" />
      </motion.div>

      {/* Redes Sociales */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex space-x-4 mb-8"
      >
        {socialButtons.map((social, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={social.action}
            className={`${social.color} p-3 rounded-full text-white shadow-lg transition-all duration-300 ${
              !social.available ? "opacity-60" : ""
            }`}
          >
            {social.icon}
          </motion.button>
        ))}
      </motion.div>

      {/* Botones Principales */}
      <div className="w-full space-y-4">
        {mainButtons.map((button, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
          >
            <Card
              className={`bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer ${
                !button.available ? "opacity-60" : ""
              }`}
              onClick={button.action}
            >
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <div className={`${button.color} p-3 rounded-full ${button.textColor} flex-shrink-0`}>
                    {button.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-bold text-lg mb-1">{button.title}</h3>
                    <p className="text-gray-300 text-sm">{button.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="mt-8 text-center"
      >
        <p className="text-gray-400 text-sm">La libertad de sabores 🍕</p>
        <p className="text-gray-500 text-xs mt-2">© {currentYear ?? ''} Novvo's Pizza</p>
      </motion.div>

      {/* Modal "Próximamente" */}
      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setShowModal(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="bg-white rounded-2xl p-6 max-w-sm w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-bold text-[#0B0B0B] mb-2">¡Próximamente!</h3>
              <p className="text-gray-600 mb-6">
                Estamos trabajando para traerte {modalMessage} muy pronto. ¡Mantente atento a nuestras redes sociales!
              </p>
              <Button
                onClick={() => setShowModal(false)}
                className="bg-[#FFA640] hover:bg-[#FF9520] text-black font-bold w-full"
              >
                Entendido
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
