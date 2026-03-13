import axios from 'axios'
import type { Item } from '../hooks/useItems'

const api = axios.create({
  baseURL: 'http://localhost:8082',
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const register = async (email: string, password: string) => {
  const response = await api.post('/register', { email, password })
  return response.data
}

export const login = async (email: string, password: string) => {
  const response = await api.post('/login', { email, password })
  return response.data
}

export const getItems = async (): Promise<Item[]> => {
  const response = await api.get<Item[]>('/items')
  return response.data
}

export const addCartItem = async (itemId: number, quantity: number) => {
  const response = await api.patch(`/user/cart/items/${itemId}`, { quantity })
  return response.data
}

export const getCart = async () => {
  const response = await api.get('/user/cart')
  return response.data
}

export const createOrder = async (lineItems: { item_id: number; quantity: number; price: number }[], total: number) => {
  const response = await api.post('/orders', { line_items: lineItems, total }, {
    headers: { 'Idempotency-Key': crypto.randomUUID() },
  })
  return response.data
}
