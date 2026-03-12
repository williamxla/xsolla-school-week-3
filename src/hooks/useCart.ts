import { useState } from 'react'
import type { Item } from './useItems'

export interface CartItem {
  item: Item
  quantity: number
}

export function useCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  function addToCart(item: Item) {
    setCartItems((prev) => {
      const existing = prev.find((ci) => ci.item.id === item.id)
      if (existing) {
        return prev.map((ci) =>
          ci.item.id === item.id ? { ...ci, quantity: ci.quantity + 1 } : ci
        )
      }
      return [...prev, { item, quantity: 1 }]
    })
  }

  function removeFromCart(itemId: number) {
    setCartItems((prev) => prev.filter((ci) => ci.item.id !== itemId))
  }

  function updateQuantity(itemId: number, quantity: number) {
    if (quantity <= 0) {
      removeFromCart(itemId)
      return
    }
    setCartItems((prev) =>
      prev.map((ci) => (ci.item.id === itemId ? { ...ci, quantity } : ci))
    )
  }

  function clearCart() {
    setCartItems([])
  }

  const totalItems = cartItems.reduce((sum, ci) => sum + ci.quantity, 0)
  const totalPrice = cartItems.reduce((sum, ci) => sum + ci.item.price * ci.quantity, 0)

  return { cartItems, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice }
}
