"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"
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
            <img src="/images/novvos-logo.svg" alt="Novvo's Pizza" className="w-32 h-auto mb-4" />
            <p className="text-gray-300 text-sm">
              La mejor pizza individual de la ciudad. Sabores únicos, calidad premium.
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
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-300 hover:text-[#FFA640] transition-colors">
                <Facebook className="w-6 h-6" />
              </Link>
              <Link href="#" className="text-gray-300 hover:text-[#FFA640] transition-colors">
                <Instagram className="w-6 h-6" />
              </Link>
              <Link href="#" className="text-gray-300 hover:text-[#FFA640] transition-colors">
                <Twitter className="w-6 h-6" />
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
          <p>&copy; {currentYear ?? ''} Novvo's Pizza. Todos los derechos reservados.</p>
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
