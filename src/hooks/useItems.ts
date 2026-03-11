import { useEffect, useState } from 'react'
import axios from 'axios'

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
    axios.get<Item[]>('http://localhost:8082/items')
      .then((res) => {
        setItems(res.data)
        setLoading(false)
      })
      .catch((err: Error) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  return { items, loading, error }
}
