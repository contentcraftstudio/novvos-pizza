"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Instagram, Truck, MessageCircle } from "lucide-react"
import { useEffect, useState } from "react"

export function Footer() {
  const [currentYear, setCurrentYear] = useState<number>()
  useEffect(() => {
    setCurrentYear(new Date().getFullYear())
  }, [])

  return (
    <footer className="bg-[#0B0B0B] text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <img src="/images/novvos-logo.svg" alt="Novvos Pizza" className="w-32 h-auto mb-4" />
            <p className="text-gray-300 text-sm">
              Novvo's Taste - Experiencias únicas en cada bocado. Calidad premium en k-box artesanales.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="font-bold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="#menu" className="hover:text-[#FFA640] transition-colors">
                  Menú
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-[#FFA640] transition-colors">
                  Mi Cuenta
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#FFA640] transition-colors">
                  Promociones
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#FFA640] transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="font-bold mb-4">Políticas</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="#" className="hover:text-[#FFA640] transition-colors">
                  Términos y Condiciones
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#FFA640] transition-colors">
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#FFA640] transition-colors">
                  Política de Entrega
                </Link>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="font-bold mb-4">Síguenos</h4>
            <div className="flex flex-col space-y-4">
              <Link 
                href="https://www.instagram.com/novvostaste/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-300 hover:text-[#FFA640] transition-colors"
              >
                <Instagram className="w-5 h-5" />
                <span>@novvostaste</span>
              </Link>
              <Link 
                href="https://wa.me/573245256142" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-300 hover:text-[#25D366] transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                <span>+57 324 525 6142</span>
              </Link>
              <Link 
                href="https://www.rappi.com.co/restaurantes/delivery/335245-novvo-s-taste?utm_source=app&utm_medium=deeplink&utm_campaign=share" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-300 hover:text-[#00E59A] transition-colors"
              >
                <Truck className="w-5 h-5" />
                <span>Pide por Delivery</span>
              </Link>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-400 space-y-2"
        >
          <p>&copy; {currentYear ?? ''} Novvo's Taste. Todos los derechos reservados.</p>
          <p>
            Desarrollado por{" "}
            <Link
              href="https://www.coderlabs.co/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#FFA640] hover:text-[#FF9520] transition-colors font-medium"
            >
              CoderLabs
            </Link>
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
