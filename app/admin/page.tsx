"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ShoppingCart, DollarSign, TrendingUp, Users, Pizza, Eye, Edit, Trash2, Plus } from "lucide-react"
import ordersData from "@/data/orders.json"
import usersData from "@/data/users.json"
import menuData from "@/data/menu.json"

export default function AdminDashboard() {
  const [orders] = useState(ordersData.orders)
  const [users] = useState(usersData.users)
  const [menu] = useState(menuData.pizzas)

  // Estado para la fecha de hoy y para los labels de fechas
  const [today, setToday] = useState<string>("")
  const [orderDates, setOrderDates] = useState<{[id: string]: string}>({})

  useEffect(() => {
    const now = new Date()
    setToday(now.toDateString())
    const dates: {[id: string]: string} = {}
    ordersData.orders.forEach(order => {
      dates[order.id] = new Date(order.timestamp).toLocaleDateString()
    })
    setOrderDates(dates)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "sin_aceptar":
        return "bg-red-500"
      case "en_preparacion":
        return "bg-yellow-500"
      case "despachado":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "sin_aceptar":
        return "Sin Aceptar"
      case "en_preparacion":
        return "En Preparación"
      case "despachado":
        return "Despachado"
      default:
        return status
    }
  }

  const totalVentas = orders.reduce((sum, order) => sum + order.total, 0)
  const pedidosHoy = orders.filter(
    (order) => new Date(order.timestamp).toDateString() === today,
  ).length

  return (
    <div className="min-h-screen bg-[#0B0B0B] p-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-4xl font-bold text-[#FFA640] mb-2">Dashboard Admin</h1>
          <p className="text-white">Panel de control de Novvo's Pizza</p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Pedidos Hoy</p>
                  <p className="text-2xl font-bold text-white">{pedidosHoy}</p>
                </div>
                <ShoppingCart className="w-8 h-8 text-[#FFA640]" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Ventas Totales</p>
                  <p className="text-2xl font-bold text-white">${totalVentas.toFixed(2)}</p>
                </div>
                <DollarSign className="w-8 h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Clientes</p>
                  <p className="text-2xl font-bold text-white">{users.length}</p>
                </div>
                <Users className="w-8 h-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Pizzas en Menú</p>
                  <p className="text-2xl font-bold text-white">{menu.length}</p>
                </div>
                <Pizza className="w-8 h-8 text-[#FFA640]" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Tabs */}
        <Tabs defaultValue="orders" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-white/10 mb-8">
            <TabsTrigger
              value="orders"
              className="text-white data-[state=active]:bg-[#FFA640] data-[state=active]:text-black"
            >
              Pedidos
            </TabsTrigger>
            <TabsTrigger
              value="sales"
              className="text-white data-[state=active]:bg-[#FFA640] data-[state=active]:text-black"
            >
              Ventas
            </TabsTrigger>
            <TabsTrigger
              value="menu"
              className="text-white data-[state=active]:bg-[#FFA640] data-[state=active]:text-black"
            >
              Menú
            </TabsTrigger>
            <TabsTrigger
              value="customers"
              className="text-white data-[state=active]:bg-[#FFA640] data-[state=active]:text-black"
            >
              Clientes
            </TabsTrigger>
          </TabsList>

          {/* Pedidos */}
          <TabsContent value="orders">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Pedidos Activos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-white/10">
                          <th className="text-left text-gray-300 p-3">ID</th>
                          <th className="text-left text-gray-300 p-3">Cliente</th>
                          <th className="text-left text-gray-300 p-3">Pizzas</th>
                          <th className="text-left text-gray-300 p-3">Total</th>
                          <th className="text-left text-gray-300 p-3">Estado</th>
                          <th className="text-left text-gray-300 p-3">Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map((order) => (
                          <tr key={order.id} className="border-b border-white/5">
                            <td className="text-white p-3 font-mono text-sm">{order.id}</td>
                            <td className="text-white p-3">{order.customer}</td>
                            <td className="text-white p-3">
                              {order.items.map((item) => `${item.quantity}x ${item.name}`).join(", ")}
                            </td>
                            <td className="text-white p-3 font-bold">${order.total.toFixed(2)}</td>
                            <td className="p-3">
                              <Badge className={`${getStatusColor(order.status)} text-white`}>
                                {getStatusText(order.status)}
                              </Badge>
                            </td>
                            <td className="p-3">
                              <div className="flex space-x-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                                >
                                  <Eye className="w-4 h-4" />
                                </Button>
                                <Button size="sm" className="bg-[#FFA640] hover:bg-[#FF9520] text-black">
                                  <Edit className="w-4 h-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Ventas */}
          <TabsContent value="sales">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid md:grid-cols-2 gap-6"
            >
              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Historial de Pagos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="flex justify-between items-center p-3 bg-white/5 rounded">
                        <div>
                          <p className="text-white font-medium">{order.customer}</p>
                          <p className="text-gray-400 text-sm">{orderDates[order.id]}</p>
                        </div>
                        <p className="text-[#FFA640] font-bold">${order.total.toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-[#FFA640]" />
                    Gráficas de Ventas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-white/5 rounded">
                    <div className="text-center text-gray-400">
                      <TrendingUp className="w-12 h-12 mx-auto mb-4" />
                      <p>Gráficas de ventas</p>
                      <p className="text-sm">Se integrarán próximamente</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Menú */}
          <TabsContent value="menu">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Card className="bg-white/5 border-white/10">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-white">Gestión de Menú</CardTitle>
                  <Button className="bg-[#FFA640] hover:bg-[#FF9520] text-black font-bold">
                    <Plus className="w-4 h-4 mr-2" />
                    Nueva Pizza
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {menu.map((pizza) => (
                      <div key={pizza.id} className="bg-white/5 rounded-lg p-4">
                        <img
                          src={pizza.image || "/placeholder.svg"}
                          alt={pizza.name}
                          className="w-full h-32 object-cover rounded mb-3"
                        />
                        <h4 className="text-white font-bold mb-2">{pizza.name}</h4>
                        <p className="text-gray-300 text-sm mb-3">{pizza.description}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-[#FFA640] font-bold">${pizza.price}</span>
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-red-500 text-red-400 hover:bg-red-500/10 bg-transparent"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Clientes */}
          <TabsContent value="customers">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Base de Clientes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-white/10">
                          <th className="text-left text-gray-300 p-3">Nombre</th>
                          <th className="text-left text-gray-300 p-3">Email</th>
                          <th className="text-left text-gray-300 p-3">Pizzas Compradas</th>
                          <th className="text-left text-gray-300 p-3">Pizza Favorita</th>
                          <th className="text-left text-gray-300 p-3">Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((user) => (
                          <tr key={user.id} className="border-b border-white/5">
                            <td className="text-white p-3">{user.name}</td>
                            <td className="text-gray-300 p-3">{user.email}</td>
                            <td className="text-white p-3 font-bold">{user.pizzasCompradas}</td>
                            <td className="text-white p-3">{user.pizzaFavorita}</td>
                            <td className="p-3">
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                              >
                                <Eye className="w-4 h-4 mr-2" />
                                Ver Perfil
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
