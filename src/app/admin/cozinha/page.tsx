'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface OrderItem {
  id: string
  quantity: number
  price: number
  product: {
    name: string
  }
}

interface CustomerInfo {
  name: string
  phone: string
  address: string
}

interface Order {
  id: string
  status: 'RECEBIDO' | 'EM_PREPARO' | 'PRONTO_PARA_ENTREGA' | 'DESPACHADO'
  total: number
  customerInfo: CustomerInfo
  items: OrderItem[]
  createdAt: string
}

export default function KitchenPage() {
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    fetchOrders()

    const channel = supabase
      .channel('orders')
      .on('broadcast', { event: 'order_updated' }, (payload) => {
        setOrders(prev => prev.map(order =>
          order.id === payload.payload.id ? payload.payload : order
        ))
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const fetchOrders = async () => {
    const res = await fetch('/api/orders')
    const data = await res.json()
    setOrders(data)
  }

  const updateStatus = async (orderId: string, status: Order['status']) => {
    await fetch('/api/orders', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: orderId, status })
    })
  }

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'RECEBIDO': return 'bg-red-500'
      case 'EM_PREPARO': return 'bg-yellow-500'
      case 'PRONTO_PARA_ENTREGA': return 'bg-blue-500'
      case 'DESPACHADO': return 'bg-green-500'
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Painel da Cozinha</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((order) => (
          <Card key={order.id} className="text-center">
            <CardHeader>
              <CardTitle>Pedido #{order.id.slice(-6)}</CardTitle>
              <CardDescription>
                {new Date(order.createdAt).toLocaleTimeString()}
              </CardDescription>
              <div className={`w-full h-4 rounded ${getStatusColor(order.status)}`}></div>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{order.status.replace('_', ' ')}</p>
              <div className="space-y-2 mb-4">
                {order.items.map((item) => (
                  <p key={item.id}>{item.quantity}x {item.product.name}</p>
                ))}
              </div>
              <div className="space-y-2">
                {order.status === 'RECEBIDO' && (
                  <Button
                    onClick={() => updateStatus(order.id, 'EM_PREPARO')}
                    className="w-full text-lg py-6"
                  >
                    Iniciar Preparo
                  </Button>
                )}
                {order.status === 'EM_PREPARO' && (
                  <Button
                    onClick={() => updateStatus(order.id, 'PRONTO_PARA_ENTREGA')}
                    className="w-full text-lg py-6"
                  >
                    Pronto para Entrega
                  </Button>
                )}
                {order.status === 'PRONTO_PARA_ENTREGA' && (
                  <Button
                    onClick={() => updateStatus(order.id, 'DESPACHADO')}
                    className="w-full text-lg py-6"
                  >
                    Despachar
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
