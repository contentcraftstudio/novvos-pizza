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
    let message = "🌟 *PEDIDO NOVVO'S TASTE - K-BOX* 🌟\n\n"

    message += "📋 *Detalle del pedido K-Box:*\n"
    cart.forEach((item, index) => {
      message += `${index + 1}. ${item.name} x${item.quantity} - ${formatPrice(item.price * item.quantity)}\n`
    })

    message += `💰 *TOTAL: ${formatPrice(total)}*\n\n`
    message += `📦 Total de K-Box: ${totalItems}\n\n`
    message += "¡Gracias por elegir Novvo's Taste y nuestra exclusiva K-Box! 🧡"

    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`

    window.open(whatsappUrl, "_blank")
    onClose()
  }

  // Optimized animation variants for better mobile performance
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        duration: 0.2,
        type: "tween" as const 
      } 
    },
    exit: { 
      opacity: 0, 
      transition: { 
        duration: 0.15,
        type: "tween" as const 
      } 
    }
  };

  const modalVariants = {
    hidden: { 
      opacity: 0, 
      y: "100%" 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring" as const,
        damping: 30,
        stiffness: 300,
        mass: 0.5
      } 
    },
    exit: { 
      opacity: 0, 
      y: "100%",
      transition: { 
        duration: 0.2,
        type: "tween" as const
      } 
    }
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Overlay with optimized animation */}
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50 touch-none"
          />

          {/* Modal with optimized animation and touch handling */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed bottom-0 left-0 right-0 z-50 w-full max-h-[90vh] md:left-1/2 md:right-auto md:-translate-x-1/2 md:max-w-2xl md:bottom-4 md:rounded-t-2xl custom-scrollbar"
            style={{
              maxHeight: "90vh",
              overscrollBehavior: 'contain',
              WebkitOverflowScrolling: 'touch',
              touchAction: 'pan-y',
              WebkitTapHighlightColor: 'transparent'
            }}
          >
            <Card className="bg-white h-full flex flex-col rounded-t-2xl md:rounded-2xl shadow-2xl">
              {/* Header fijo */}
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b bg-white rounded-t-2xl md:rounded-t-2xl flex-shrink-0 sticky top-0 z-10">
                <CardTitle className="text-xl md:text-2xl font-bold text-[#0B0B0B] flex items-center">
                  <ShoppingCart className="w-5 h-5 md:w-6 md:h-6 mr-2 text-[#FFA640]" />
                  Tu Pedido ({totalItems} K-Box)
                </CardTitle>
                <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-500 hover:text-gray-700">
                  <X className="w-5 h-5" />
                </Button>
              </CardHeader>

              {/* Contenido scrolleable */}
              <CardContent 
                className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6 custom-scrollbar" 
                style={{ 
                  maxHeight: "calc(90vh - 160px)",
                  WebkitOverflowScrolling: 'touch',
                  msOverflowStyle: 'none',
                  overscrollBehavior: 'contain',
                  scrollbarWidth: 'none'
                } as React.CSSProperties}
              >
                {cart.length === 0 ? (
                  <div className="text-center py-8 md:py-12">
                    <div className="text-4xl md:text-6xl mb-4">🌟</div>
                    <h3 className="text-lg md:text-xl font-semibold text-gray-600 mb-2">Tu pedido está vacío</h3>
                    <p className="text-gray-500">¡Prueba nuestras exclusivas K-Box!</p>
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
                          <div className="flex justify-between items-start gap-2 mb-3">
                            <div className="flex-1 min-w-0">
                              <h4 className="font-bold text-[#0B0B0B] text-sm truncate">{item.name}</h4>
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
                            <div className="flex items-center bg-white rounded-lg border">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  updateQuantity(item.id, Math.max(0, item.quantity - 1));
                                }}
                                className="h-9 w-9 sm:h-10 sm:w-10 flex items-center justify-center active:bg-gray-100 transition-colors rounded-l"
                                aria-label="Reducir cantidad"
                              >
                                <Minus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                              </button>
                              <span className="font-semibold text-[#0B0B0B] min-w-[2rem] sm:min-w-[2.5rem] text-center text-sm sm:text-base">
                                {item.quantity}
                              </span>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  updateQuantity(item.id, item.quantity + 1);
                                }}
                                className="h-9 w-9 sm:h-10 sm:w-10 flex items-center justify-center active:bg-gray-100 transition-colors rounded-r"
                                aria-label="Aumentar cantidad"
                              >
                                <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                              </button>
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
                <div className="border-t p-4 md:p-6 bg-gray-50 rounded-b-2xl md:rounded-b-2xl flex-shrink-0 sticky bottom-0">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg md:text-xl font-bold text-[#0B0B0B]">Total:</span>
                    <span className="text-xl md:text-2xl font-bold text-[#FFA640]">{formatPrice(total)}</span>
                  </div>

                  <Button
                    onClick={sendWhatsAppOrder}
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 text-base md:text-lg transform transition-transform active:scale-95"
                  >
                    <ShoppingCart className="w-5 h-5 md:w-6 md:h-6 mr-2" />
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
