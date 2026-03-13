import { useReducer, useEffect, useState } from 'react'
import type { Item } from './useItems'
import { getCart, addCartItem } from '../api/api'

export interface CartItem {
  item: Item
  quantity: number
}

type Action =
  | { type: 'ADD'; item: Item }
  | { type: 'CLEAR' }
  | { type: 'INIT'; cartItems: CartItem[] }

const cartReducer = (state: CartItem[], action: Action): CartItem[] => {
  switch (action.type) {
    case 'INIT':
      return action.cartItems
    case 'ADD': {
      const existing = state.find((ci) => ci.item.id === action.item.id)
      if (existing) {
        return state.map((ci) =>
          ci.item.id === action.item.id ? { ...ci, quantity: ci.quantity + 1 } : ci
        )
      }
      return [...state, { item: action.item, quantity: 1 }]
    }
    case 'CLEAR':
      return []
    default:
      return state
  }
}

export const useCart = (items: Item[]) => {
  const [cartItems, dispatch] = useReducer(cartReducer, [])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetch = async () => {
      const token = localStorage.getItem('token')
      if (!token) {
        setLoading(false)
        return
      }
      try {
        const data = await getCart()
        const mapped: CartItem[] = data
          .map((entry: { item_id: number; quantity: number }) => {
            const item = items.find((i) => i.id === entry.item_id)
            if (!item) return null
            return { item, quantity: entry.quantity }
          })
          .filter(Boolean)
        dispatch({ type: 'INIT', cartItems: mapped })
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [items])

  const addToCart = async (item: Item) => {
    const existing = cartItems.find((ci) => ci.item.id === item.id)
    const newQuantity = (existing?.quantity ?? 0) + 1
    await addCartItem(item.id, newQuantity)
    dispatch({ type: 'ADD', item })
  }

  const clearCart = () => dispatch({ type: 'CLEAR' })

  const totalItems = cartItems.reduce((sum, ci) => sum + ci.quantity, 0)
  const totalPrice = cartItems.reduce((sum, ci) => sum + ci.item.price * ci.quantity, 0)

  return { cartItems, addToCart, clearCart, totalItems, totalPrice, loading, error }
}
