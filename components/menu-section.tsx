"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, ShoppingCart } from "lucide-react"
import { CartModal } from "./cart-modal"
import menuData from "@/data/menu.json"

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
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

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const categories = [...new Set(menuData.pizzas.map((pizza) => pizza.category))]
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <>
      <section id="menu" ref={ref} className="py-20 bg-[#0B0B0B]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Nuestro <span className="text-[#FFA640]">Menú</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Cada pizza es una obra maestra horneada con pasión
            </p>
            <div className="mt-6 inline-block bg-[#FFA640] text-black px-6 py-2 rounded-full font-bold">
              🔥 ¡Promoción especial! Todas las pizzas a {formatPrice(25000)}
            </div>
          </motion.div>

          {categories.map((category, categoryIndex) => (
            <div key={category} className="mb-16">
              <motion.h3
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                className="text-2xl font-bold text-[#FFA640] mb-8 capitalize"
              >
                {category}
              </motion.h3>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {menuData.pizzas
                  .filter((pizza) => pizza.category === category)
                  .map((pizza, index) => (
                    <motion.div
                      key={pizza.id}
                      initial={{ opacity: 0, y: 50 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{
                        duration: 0.6,
                        delay: categoryIndex * 0.2 + index * 0.1,
                      }}
                      whileHover={{ y: -10 }}
                    >
                      <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 overflow-hidden group">
                        <div className="relative overflow-hidden">
                          <img
                            src={pizza.image || "/placeholder.svg"}
                            alt={pizza.name}
                            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute top-4 right-4 space-y-2">
                            <Badge className="bg-[#FFA640] text-black font-bold block">
                              {formatPrice(pizza.price)}
                            </Badge>
                            {pizza.originalPrice && (
                              <Badge variant="outline" className="bg-white/10 text-gray-300 line-through text-xs block">
                                {formatPrice(pizza.originalPrice)}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <CardContent className="p-6">
                          <h4 className="text-xl font-bold text-white mb-2">{pizza.name}</h4>
                          <p className="text-gray-300 mb-4 text-sm">{pizza.description}</p>
                          <Button
                            onClick={() => addToCart(pizza)}
                            className="w-full bg-[#FFA640] hover:bg-[#FF9520] text-black font-bold"
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Agregar
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
              </div>
            </div>
          ))}
        </div>

        {/* Carrito flotante */}
        {cart.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-6 right-6 z-40"
          >
            <Button
              onClick={() => setIsCartOpen(true)}
              size="lg"
              className="bg-[#FFA640] hover:bg-[#FF9520] text-black font-bold rounded-full shadow-lg relative"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              {totalItems} pizzas
              <span className="ml-2">{formatPrice(totalPrice)}</span>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Button>
          </motion.div>
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
