"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Pizza, Trophy, Heart, Bell, User, LogOut } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function ProfilePage() {
  const router = useRouter()

  const userData = {
    name: "María González",
    email: "maria@email.com",
    pizzasCompradas: 15,
    pizzaFavorita: "Margherita Clásica",
    ranking: ["Margherita Clásica", "Pepperoni Suprema", "Hawaiana Tropical"],
    joinDate: "Agosto 2023",
  }

  const notifications = [
    { id: 1, type: "promo", message: "¡Nueva pizza Quattro Stagioni disponible!", date: "Hace 2 horas" },
    { id: 2, type: "order", message: "Tu pedido ha sido entregado", date: "Hace 1 día" },
    { id: 3, type: "promo", message: "20% de descuento en pizzas familiares", date: "Hace 3 días" },
  ]

  const handleLogout = () => {
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-[#0B0B0B] p-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-8"
        >
          <div>
            <Link href="/">
              <img src="/images/novvos-logo.svg" alt="Novvo's Taste" className="w-32 h-auto" />
            </Link>
            <p className="text-white">Mi Perfil</p>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10 bg-transparent"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Cerrar Sesión
          </Button>
        </motion.div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-white/10 mb-8">
            <TabsTrigger
              value="profile"
              className="text-white data-[state=active]:bg-[#FFA640] data-[state=active]:text-black"
            >
              <User className="w-4 h-4 mr-2" />
              Mi Perfil
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="text-white data-[state=active]:bg-[#FFA640] data-[state=active]:text-black"
            >
              <Bell className="w-4 h-4 mr-2" />
              Notificaciones
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Información Personal */}
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
                <Card className="bg-white/5 border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <User className="w-5 h-5 mr-2 text-[#FFA640]" />
                      Información Personal
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-gray-300 text-sm">Nombre</label>
                      <p className="text-white font-medium">{userData.name}</p>
                    </div>
                    <div>
                      <label className="text-gray-300 text-sm">Email</label>
                      <p className="text-white font-medium">{userData.email}</p>
                    </div>
                    <div>
                      <label className="text-gray-300 text-sm">Miembro desde</label>
                      <p className="text-white font-medium">{userData.joinDate}</p>
                    </div>
                    <Button className="w-full bg-[#FFA640] hover:bg-[#FF9520] text-black font-bold">
                      Editar Perfil
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Estadísticas Divertidas */}
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                <Card className="bg-white/5 border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Trophy className="w-5 h-5 mr-2 text-[#FFA640]" />
                      Tus Estadísticas
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-[#FFA640] mb-2">{userData.pizzasCompradas}</div>
                      <p className="text-gray-300">Pizzas Disfrutadas</p>
                    </div>

                    <div>
                      <label className="text-gray-300 text-sm flex items-center mb-2">
                        <Heart className="w-4 h-4 mr-1 text-red-400" />
                        Pizza Favorita
                      </label>
                      <Badge className="bg-[#FFA640] text-black font-bold">{userData.pizzaFavorita}</Badge>
                    </div>

                    <div>
                      <label className="text-gray-300 text-sm mb-2 block">Ranking de Sabores</label>
                      <div className="space-y-2">
                        {userData.ranking.map((pizza, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <span className="text-[#FFA640] font-bold">#{index + 1}</span>
                            <span className="text-white text-sm">{pizza}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Acciones Rápidas */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-6"
            >
              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Acciones Rápidas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    <Link href="/#menu">
                      <Button className="w-full bg-[#FFA640] hover:bg-[#FF9520] text-black font-bold">
                        <Pizza className="w-4 h-4 mr-2" />
                        Hacer Pedido
                      </Button>
                    </Link>
                    <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
                      Ver Historial
                    </Button>
                    <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent">
                      Mis Favoritos
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="notifications">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              {notifications.map((notification, index) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <div
                          className={`w-2 h-2 rounded-full mt-2 ${
                            notification.type === "promo" ? "bg-[#FFA640]" : "bg-green-400"
                          }`}
                        />
                        <div className="flex-1">
                          <p className="text-white font-medium mb-1">{notification.message}</p>
                          <p className="text-gray-400 text-sm">{notification.date}</p>
                        </div>
                        <Badge
                          variant="outline"
                          className={
                            notification.type === "promo"
                              ? "border-[#FFA640] text-[#FFA640]"
                              : "border-green-400 text-green-400"
                          }
                        >
                          {notification.type === "promo" ? "Promoción" : "Pedido"}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
