import type { Item } from '../hooks/useItems'
import { ItemImage } from './ItemImage'

interface ItemCardProps {
  item: Item
  onAddToCart: (item: Item) => void
}

function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`
}

export function ItemCard({ item, onAddToCart }: ItemCardProps) {
  const inStock = item.stock > 0

  return (
    <div className="item-card">
      <div className="item-card__image">
        <ItemImage id={item.id} name={item.name} />
        {!inStock && <span className="item-card__badge item-card__badge--out">Out of stock</span>}
        {inStock && item.stock <= 10 && (
          <span className="item-card__badge item-card__badge--low">Only {item.stock} left</span>
        )}
      </div>
      <div className="item-card__body">
        <h3 className="item-card__name">{item.name}</h3>
        <p className="item-card__desc">{item.description}</p>
        <div className="item-card__footer">
          <span className="item-card__price">{formatPrice(item.price)}</span>
          <button className="item-card__btn" disabled={!inStock} onClick={() => onAddToCart(item)}>
            {inStock ? 'Add to cart' : 'Unavailable'}
          </button>
        </div>
      </div>
    </div>
  )
}
