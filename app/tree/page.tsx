"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Instagram, MessageCircle, ShoppingCart, PartyPopper, MapPin, Clock, Truck, Menu } from "lucide-react"

// Types
interface SocialLink {
  icon: React.ReactNode;
  label: string;
  action: () => void;
  color: string;
}

interface MainButton {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  textColor: string;
  action: () => void;
  available: boolean;
}

interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
}

// Custom Icons
const RappiIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    className="w-5 h-5"
    fill="currentColor"
  >
    <path d="M12 15a2 2 0 0 1-2-2V6.5a2 2 0 0 1 4 0V13a2 2 0 0 1-2 2m0-9a.5.5 0 0 0-.5.5V13a.5.5 0 0 0 1 0V6.5A.5.5 0 0 0 12 6m7 4.5a.5.5 0 0 0-.5.5v3a4.5 4.5 0 0 1-9 0v-1a.5.5 0 0 0-1 0v1a5.5 5.5 0 0 0 5 5.48V20h-1.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1H14v-1.02A5.5 5.5 0 0 0 19.5 14v-3a.5.5 0 0 0-.5-.5" />
  </svg>
)

// Components
const InfoCard = ({ icon, title, value }: InfoCardProps) => (
  <div className="flex items-center space-x-3">
    <div className="p-2 bg-gray-700/50 rounded-lg text-[#FFA640]">
      {icon}
    </div>
    <div>
      <p className="text-xs text-gray-300">{title}</p>
      <p className="text-sm font-medium">{value}</p>
    </div>
  </div>
)

const LinkCard = ({
  icon,
  title,
  description,
  color,
  textColor,
  action,
  available = true
}: MainButton) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={action}
    disabled={!available}
    className={`w-full py-4 px-6 rounded-xl flex items-center space-x-3 ${color} ${textColor} font-medium text-base transition-all hover:shadow-lg ${!available ? 'opacity-60' : ''}`}
  >
    <span className="text-xl">{icon}</span>
    <div className="text-left">
      <div className="font-semibold">{title}</div>
      <div className="text-xs font-normal opacity-90">{description}</div>
    </div>
  </motion.button>
)

export default function LinkTreePage() {
  const [showModal, setShowModal] = useState(false)
  const [modalMessage, setModalMessage] = useState("")
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

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
    openWhatsApp("¡Hola! Me gustaría hacer un pedido de Novvo's Taste 🍕")
  }

  const openCatering = () => {
    openWhatsApp(
      "¡Hola! Estoy interesado/a en contratar el servicio de catering de Novvo's Taste para mi fiesta/evento. Me gustaría conocer más detalles sobre opciones, precios y disponibilidad. ¡Gracias! 🍕🎉"
    )
  }

  const openRappi = () => {
    window.open("https://www.rappi.com.co/restaurantes/delivery/335245-novvo-s-taste", "_blank")
  }

  const socialLinks: SocialLink[] = [
    {
      icon: <Instagram className="w-5 h-5" />,
      label: "@novvostaste",
      action: openInstagram,
      color: "text-pink-500 hover:text-pink-400"
    },
    {
      icon: <MessageCircle className="w-5 h-5" />,
      label: "WhatsApp",
      action: openWhatsAppDirect,
      color: "text-green-500 hover:text-green-400"
    }
  ]

  const mainButtons: MainButton[] = [
    {
      icon: <Menu className="w-5 h-5" />,
      title: "Ver menú",
      description: "Explora nuestra deliciosa selección",
      color: "bg-gradient-to-r from-[#FFA640] to-[#FF8C00]",
      textColor: "text-black",
      action: () => (window.location.href = "/#menu"),
      available: true,
    },
    {
      icon: <ShoppingCart className="w-5 h-5" />,
      title: "Pedir por Rappi",
      description: "Ordena a través de la app de Rappi",
      color: "bg-red-600 hover:bg-red-700",
      textColor: "text-white",
      action: openRappi,
      available: true,
    },
    {
      icon: <MessageCircle className="w-5 h-5" />,
      title: "Pedir por WhatsApp",
      description: "Haz tu pedido directamente por WhatsApp",
      color: "bg-green-500 hover:bg-green-600",
      textColor: "text-white",
      action: openWhatsAppDirect,
      available: true,
    },
  ]

  const infoCards = [
    {
      icon: <Clock className="w-5 h-5" />,
      title: "Horario",
      value: "Jue-Dom 4-9PM"
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      title: "Ubicación",
      value: "Barranquilla, Colombia"
    },
    {
      icon: <Clock className="w-5 h-5" />,
      title: "Tiempo de Entrega",
      value: "10-20 min aprox."
    },
    {
      icon: <Truck className="w-5 h-5" />,
      title: "Domicilios",
      value: "Zonas aledañas"
    }
  ]

  if (!isMounted) return null

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8 max-w-md">
        {/* Profile Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="w-48 h-auto mx-auto mb-4">
            <img
              src="/images/novvos-logo.svg"
              alt="Novvo's Taste"
              className="w-full h-auto object-contain"
            />
          </div>
          <p className="text-gray-300 mb-6">K-box artesanal con ingredientes premium</p>
          
          {/* Social Links */}
          <div className="flex justify-center space-x-6 mb-8">
            {socialLinks.map((social, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center space-x-2 ${social.color} transition-colors`}
                onClick={social.action}
              >
                {social.icon}
                <span className="text-sm">{social.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Info Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 gap-4 mb-8"
        >
          {infoCards.map((card, index) => (
            <div 
              key={index}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50 hover:border-[#FFA640]/30 transition-colors"
            >
              <InfoCard 
                icon={card.icon}
                title={card.title}
                value={card.value}
              />
            </div>
          ))}
        </motion.div>

        {/* Main Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-4 mb-8"
        >
          {mainButtons.map((button, index) => (
            <LinkCard
              key={index}
              icon={button.icon}
              title={button.title}
              description={button.description}
              color={button.color}
              textColor={button.textColor}
              action={button.action}
              available={button.available}
            />
          ))}
        </motion.div>

        {/* Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center text-gray-500 text-xs"
        >
          <p>© {new Date().getFullYear()} Novvo's Taste. Todos los derechos reservados.</p>
        </motion.div>
      </div>

      {/* Modal */}
      {showModal && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50"
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gray-800 rounded-xl p-6 max-w-sm w-full border border-gray-700/50"
          >
            <h3 className="text-xl font-bold mb-4">¡Próximamente!</h3>
            <p className="mb-6 text-gray-300">{modalMessage} estará disponible próximamente.</p>
            <button
              onClick={() => setShowModal(false)}
              className="w-full bg-gradient-to-r from-[#FFA640] to-[#FF8C00] text-black py-3 px-4 rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Entendido
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
