import { OrderStatus } from '@/components/order-status'
import { api } from '@/lib/axios'

export interface GetOrderDetailsParams {
  orderId: string
}

export interface GetOrderDetailsResponse {
  id: string
  status: OrderStatus
  totalInCents: number
  customer: {
    name: string
    email: string
    phone: string | null
  }
  orderItems: {
    id: string
    product: {
      name: string
    }
    priceInCents: number
    quantity: number
  }[]
  createdAt: string
}

export async function getOrderDetails({ orderId }: GetOrderDetailsParams) {
  const response = await api.get(`/orders/${orderId}`)

  return response.data
}
