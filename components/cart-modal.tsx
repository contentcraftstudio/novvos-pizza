"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X, Plus, Minus, Trash2, ShoppingCart } from "lucide-react"
import { useMemo } from "react"

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
}

interface CartModalProps {
  isOpen: boolean
  onClose: () => void
  cart: CartItem[]
  updateQuantity: (id: number, quantity: number) => void
  removeFromCart: (id: number) => void
}

export function CartModal({ isOpen, onClose, cart, updateQuantity, removeFromCart }: CartModalProps) {
  const formatPrice = useMemo(() => {
    return (price: number) =>
      new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(price)
  }, [])

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

  const sendWhatsAppOrder = () => {
    const phoneNumber = "+573245256142"
    let message = "🍕 *PEDIDO NOVVO'S PIZZA* 🍕\n\n"

    message += "📋 *Detalle del pedido:*\n"
    cart.forEach((item, index) => {
      message += `${index + 1}. *${item.name}*\n`
      message += `   Cantidad: ${item.quantity}\n`
      message += `   Precio unitario: ${formatPrice(item.price)}\n`
      message += `   Subtotal: ${formatPrice(item.price * item.quantity)}\n\n`
    })

    message += `💰 *TOTAL: ${formatPrice(total)}*\n\n`
    message += `📦 Total de pizzas: ${totalItems}\n\n`
    message += "¡Gracias por elegir Novvo's Pizza! 🧡"

    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`

    window.open(whatsappUrl, "_blank")
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50"
          />

          {/* Modal - Posicionado desde abajo hacia arriba */}
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 z-50 md:left-1/2 md:right-auto md:-translate-x-1/2 md:w-full md:max-w-2xl md:bottom-4 md:rounded-t-2xl"
            style={{ maxHeight: "85vh" }}
          >
            <Card className="bg-white h-full flex flex-col rounded-t-2xl md:rounded-2xl shadow-2xl">
              {/* Header fijo */}
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b bg-white rounded-t-2xl md:rounded-t-2xl flex-shrink-0">
                <CardTitle className="text-xl md:text-2xl font-bold text-[#0B0B0B] flex items-center">
                  <ShoppingCart className="w-5 h-5 md:w-6 md:h-6 mr-2 text-[#FFA640]" />
                  Tu Carrito ({totalItems} pizzas)
                </CardTitle>
                <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-500 hover:text-gray-700">
                  <X className="w-5 h-5" />
                </Button>
              </CardHeader>

              {/* Contenido scrolleable */}
              <CardContent className="flex-1 overflow-y-auto p-4 md:p-6" style={{ maxHeight: "calc(85vh - 200px)" }}>
                {cart.length === 0 ? (
                  <div className="text-center py-8 md:py-12">
                    <div className="text-4xl md:text-6xl mb-4">🍕</div>
                    <h3 className="text-lg md:text-xl font-semibold text-gray-600 mb-2">Tu carrito está vacío</h3>
                    <p className="text-gray-500">¡Agrega algunas pizzas deliciosas!</p>
                  </div>
                ) : (
                  <div className="space-y-3 md:space-y-4">
                    {cart.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="bg-gray-50 rounded-lg p-3 md:p-4"
                      >
                        {/* Layout móvil */}
                        <div className="md:hidden">
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex-1">
                              <h4 className="font-bold text-[#0B0B0B] text-sm">{item.name}</h4>
                              <p className="text-[#FFA640] font-semibold text-sm">{formatPrice(item.price)} c/u</p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFromCart(item.id)}
                              className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>

                          <div className="flex items-center justify-between">
                            {/* Controles de cantidad */}
                            <div className="flex items-center space-x-2 bg-white rounded-lg border">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                                className="h-8 w-8 p-0 hover:bg-gray-100"
                              >
                                <Minus className="w-3 h-3" />
                              </Button>
                              <span className="font-semibold text-[#0B0B0B] min-w-[2rem] text-center text-sm">
                                {item.quantity}
                              </span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="h-8 w-8 p-0 hover:bg-gray-100"
                              >
                                <Plus className="w-3 h-3" />
                              </Button>
                            </div>

                            {/* Subtotal */}
                            <div className="text-right">
                              <p className="font-bold text-[#0B0B0B] text-sm">
                                {formatPrice(item.price * item.quantity)}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Layout desktop */}
                        <div className="hidden md:flex items-center justify-between">
                          <div className="flex-1">
                            <h4 className="font-bold text-[#0B0B0B] mb-1">{item.name}</h4>
                            <p className="text-[#FFA640] font-semibold">{formatPrice(item.price)} c/u</p>
                          </div>

                          <div className="flex items-center space-x-3">
                            {/* Controles de cantidad */}
                            <div className="flex items-center space-x-2 bg-white rounded-lg border">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                                className="h-8 w-8 p-0 hover:bg-gray-100"
                              >
                                <Minus className="w-4 h-4" />
                              </Button>
                              <span className="font-semibold text-[#0B0B0B] min-w-[2rem] text-center">
                                {item.quantity}
                              </span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="h-8 w-8 p-0 hover:bg-gray-100"
                              >
                                <Plus className="w-4 h-4" />
                              </Button>
                            </div>

                            {/* Subtotal */}
                            <div className="text-right min-w-[100px]">
                              <p className="font-bold text-[#0B0B0B]">{formatPrice(item.price * item.quantity)}</p>
                            </div>

                            {/* Botón eliminar */}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFromCart(item.id)}
                              className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </CardContent>

              {/* Footer fijo */}
              {cart.length > 0 && (
                <div className="border-t p-4 md:p-6 bg-gray-50 rounded-b-2xl md:rounded-b-2xl flex-shrink-0">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg md:text-xl font-bold text-[#0B0B0B]">Total:</span>
                    <span className="text-xl md:text-2xl font-bold text-[#FFA640]">{formatPrice(total)}</span>
                  </div>

                  <Button
                    onClick={sendWhatsAppOrder}
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 text-base md:text-lg"
                  >
                    <ShoppingCart className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                    Hacer Pedido por WhatsApp
                  </Button>

                  <p className="text-center text-xs md:text-sm text-gray-500 mt-2">
                    Te redirigiremos a WhatsApp para confirmar tu pedido
                  </p>
                </div>
              )}
            </Card>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
