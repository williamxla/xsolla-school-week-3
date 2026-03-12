import type { CartItem } from '../hooks/useCart'

interface CartSidebarProps {
  open: boolean
  onClose: () => void
  cartItems: CartItem[]
  onUpdateQuantity: (itemId: number, quantity: number) => void
  onRemove: (itemId: number) => void
  onClear: () => void
  totalPrice: number
}

function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`
}

export function CartSidebar({
  open,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemove,
  onClear,
  totalPrice,
}: CartSidebarProps) {
  return (
    <>
      {open && <div className="cart-overlay" onClick={onClose} />}
      <aside className={`cart-sidebar ${open ? 'cart-sidebar--open' : ''}`}>
        <div className="cart-sidebar__header">
          <h2 className="cart-sidebar__title">Your Cart</h2>
          <button className="cart-sidebar__close" onClick={onClose} aria-label="Close cart">
            ✕
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="cart-sidebar__empty">
            <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
              <circle cx="28" cy="28" r="27" stroke="#e0e0f0" strokeWidth="2" />
              <path
                d="M17 20h3l3 14h12l3-10H22"
                stroke="#c0c0d8"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="25" cy="38" r="1.5" fill="#c0c0d8" />
              <circle cx="34" cy="38" r="1.5" fill="#c0c0d8" />
            </svg>
            <p>Your cart is empty</p>
          </div>
        ) : (
          <>
            <ul className="cart-sidebar__list">
              {cartItems.map(({ item, quantity }) => (
                <li key={item.id} className="cart-item">
                  <div className="cart-item__info">
                    <span className="cart-item__name">{item.name}</span>
                    <span className="cart-item__unit-price">{formatPrice(item.price)} each</span>
                  </div>
                  <div className="cart-item__controls">
                    <div className="cart-item__qty">
                      <button
                        className="cart-item__qty-btn"
                        onClick={() => onUpdateQuantity(item.id, quantity - 1)}
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="cart-item__qty-value">{quantity}</span>
                      <button
                        className="cart-item__qty-btn"
                        onClick={() => onUpdateQuantity(item.id, quantity + 1)}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                    <span className="cart-item__subtotal">{formatPrice(item.price * quantity)}</span>
                    <button
                      className="cart-item__remove"
                      onClick={() => onRemove(item.id)}
                      aria-label={`Remove ${item.name}`}
                    >
                      ✕
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="cart-sidebar__footer">
              <div className="cart-sidebar__total">
                <span>Total</span>
                <span className="cart-sidebar__total-price">{formatPrice(totalPrice)}</span>
              </div>
              <button className="cart-sidebar__checkout">Checkout</button>
              <button className="cart-sidebar__clear" onClick={onClear}>
                Clear cart
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  )
}
