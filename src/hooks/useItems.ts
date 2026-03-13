import { useEffect, useState } from 'react'
import { getItems } from '../api/api'

export interface Item {
  id: number
  name: string
  description: string
  price: number
  stock: number
  created_at: string
}

interface UseItemsResult {
  items: Item[]
  loading: boolean
  error: string | null
}

export function useItems(): UseItemsResult {
  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getItems()
        setItems(data)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [])

  return { items, loading, error }
}
