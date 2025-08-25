"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState, useEffect, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, ShoppingCart } from "lucide-react"
import Image from "next/image"
import { CartModal } from "./cart-modal"
import menuData from "@/data/menu.json"

interface Pizza {
  id: number
  name: string
  description: string
  price: number
  originalPrice: number
  image: string
  category: string
}

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
}

interface MenuData {
  pizzas: Pizza[]
}


export function MenuSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const [cart, setCart] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  const addToCart = (pizza: any) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === pizza.id)
      if (existing) {
        return prev.map((item) => (item.id === pizza.id ? { ...item, quantity: item.quantity + 1 } : item))
      }
      return [...prev, { id: pizza.id, name: pizza.name, price: pizza.price, quantity: 1 }]
    })
  }

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(id)
      return
    }
    setCart((prev) => prev.map((item) => (item.id === id ? { ...item, quantity } : item)))
  }

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id))
  }

  const formatPrice = useMemo(() => {
    return (price: number) =>
      new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(price)
  }, [])

  // Mobile detection
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    // Only run on client-side
    if (typeof window !== 'undefined') {
      const checkMobile = () => window.innerWidth < 768;
      setIsMobile(checkMobile());
      
      const handleResize = () => {
        setIsMobile(checkMobile());
      };
      
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const menu = menuData as MenuData
  const categories = [...new Set(menu.pizzas.map((pizza: Pizza) => pizza.category))]
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  // Animation variants - desktop optimized with mobile fallback
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: isMobile ? 0.05 : 0.1,
        delayChildren: isMobile ? 0 : 0.1,
        ease: 'easeOut',
        when: "beforeChildren",
        staggerDirection: 1
      }
    }
  } as const;

  const itemVariants = {
    hidden: { 
      opacity: isMobile ? 1 : 0, 
      y: isMobile ? 0 : 20 
    },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: isMobile ? 0.2 : 0.4,
        ease: 'easeOut',
        type: 'spring',
        stiffness: 100,
        damping: 10
      }
    }
  } as const;

  // Mobile detection is now handled in useState and useEffect

  return (
    <>
      <section id="menu" ref={ref} className="py-12 md:py-20 bg-[#0B0B0B] w-full overflow-hidden">
        <div className="container mx-auto px-4 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView || isMobile ? { opacity: 1, y: 0 } : {}}
            transition={{ 
              duration: isMobile ? 0.3 : 0.5, 
              ease: [0.16, 1, 0.3, 1],
              delay: isMobile ? 0 : 0.1
            }}
            className="text-center mb-12 md:mb-16 w-full overflow-x-hidden"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 md:mb-4 px-2">
              Nuestro <span className="text-[#FFA640]">Menú</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto px-2">
              Descubre la revolución gastronómica: K-Box. No es una pizza, es una experiencia única con ingredientes selectos y preparación artesanal.
            </p>
            <motion.div 
              initial={{ scale: isMobile ? 1 : 0.95, opacity: isMobile ? 1 : 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                delay: isMobile ? 0 : 0.15, 
                type: isMobile ? 'tween' : 'spring', 
                stiffness: isMobile ? 100 : 150,
                duration: isMobile ? 0.3 : 0.5
              }}
              className="w-full inline-block"
            >
              <div className="mt-4 md:mt-6 inline-block bg-[#FFA640] text-black px-4 py-2 md:px-6 md:py-2 rounded-full font-bold text-sm md:text-base">
                🔥 ¡Prueba nuestra exclusiva K-Box desde {formatPrice(25000)}!
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
            className="space-y-16 md:space-y-20 w-full"
          >
            {categories.map((category: string, categoryIndex: number) => (
              <div key={category} className="relative">
                <motion.h3
                  variants={itemVariants}
                  className="text-2xl font-bold text-[#FFA640] mb-6 md:mb-8 pl-2 border-l-4 border-[#FFA640]"
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </motion.h3>

                <motion.div 
                  variants={containerVariants}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 w-full px-2 sm:px-0"
                >
                  {menu.pizzas
                    .filter((pizza: Pizza) => {
                      const imageName = `${pizza.name.replace(/\s+/g, '').toUpperCase()}.png`;
                      // List of available pizza images
                      const availablePizzas = [
                        'MIXTA',
                        'HAWAIANA',
                        'QUILLERA',
                        'AMARANTTA',
                        '4QUESOS',
                      ];
                      return pizza.category === category && 
                             availablePizzas.includes(pizza.name.replace(/\s+/g, '').toUpperCase());
                    })
                    .map((pizza: Pizza) => (
                      <motion.div
                        key={pizza.id}
                        variants={itemVariants}
                        className="h-full w-full"
                        whileHover={isMobile ? {} : { y: -5 }}
                      >
                        <Card className={`h-full bg-[#1A1A1A] border-[#2A2A2A] ${!isMobile ? 'hover:border-[#FFA640] transition-all duration-300' : ''} overflow-hidden w-full`}>
                          <div className="relative w-full h-56 sm:h-64 md:h-72 bg-black/10 overflow-hidden">
                            <Image
                              src={`/images/k-box/${pizza.name.replace(/\s+/g, '').toUpperCase()}.png`}
                              alt={pizza.name}
                              width={400}
                              height={300}
                              className="object-cover object-bottom w-full h-full"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              priority={false}
                            />
                          </div>
                          <CardContent className="p-4 sm:p-5 md:p-6">
                            <div className="flex flex-col h-full">
                              <div className="flex-1">
                                <div className="flex justify-between items-start mb-3 sm:mb-4">
                                  <h3 className="text-lg sm:text-xl font-bold text-white">{pizza.name}</h3>
                                  <Badge 
                                    variant="outline" 
                                    className="bg-[#FFA640] text-black border-[#FFA640] text-xs sm:text-sm px-2 py-1 whitespace-nowrap"
                                  >
                                    {formatPrice(pizza.price)}
                                  </Badge>
                                </div>
                                <p className="text-sm sm:text-base text-gray-400 mb-4 sm:mb-6 leading-relaxed">
                                  {pizza.description}
                                </p>
                              </div>
                              <Button
                                onClick={() => addToCart(pizza)}
                                className="w-full bg-[#FFA640] hover:bg-[#e69538] text-black font-bold mt-auto py-2 sm:py-2.5 text-sm sm:text-base transition-transform active:scale-95"
                              >
                                <Plus className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                                Añadir al carrito
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              ))}
          </motion.div>
        </div>

        {/* Floating Cart Button */}
        {totalItems > 0 && (
          <div className="fixed bottom-4 right-4 z-40 sm:bottom-6 sm:right-6 safe-area-inset-bottom" style={{ right: 'max(1rem, env(safe-area-inset-right, 1rem))' }}>
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: 0.5, 
                type: 'spring',
                stiffness: 300,
                damping: 20
              }}
              whileTap={{ scale: 0.95 }}
              className="w-14 h-14 sm:w-16 sm:h-16"
              style={{
                position: 'fixed',
                right: 'calc(1rem + env(safe-area-inset-right, 0px))',
                bottom: 'calc(1rem + env(safe-area-inset-bottom, 0px))',
                zIndex: 40
              }}
            >
              <Button
                onClick={() => setIsCartOpen(true)}
                className="rounded-full w-full h-full p-0 bg-[#FFA640] hover:bg-[#e69538] text-black relative shadow-xl transition-transform active:scale-95"
                aria-label="Ver carrito"
                style={{
                  boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                  WebkitTapHighlightColor: 'transparent'
                }}
              >
                <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6" />
                <motion.span 
                  key={totalItems}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                  className="absolute -top-1 -right-1 bg-white text-black rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold"
                >
                  {totalItems > 9 ? '9+' : totalItems}
                </motion.span>
              </Button>
            </motion.div>
          </div>
        )}
      </section>

      {/* Modal del carrito */}
      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
      />
    </>
  )
}
