import './App.css'
import { ItemCard } from './components/ItemCard'
import { useItems } from './hooks/useItems'

function App() {
  const { items, loading, error } = useItems()

  return (
    <div className="shop">
      <header className="shop__header">
        <div className="shop__header-inner">
          <div className="shop__logo">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="28" height="28" rx="6" fill="#6366f1" />
              <path d="M8 10h12M8 14h8M8 18h10" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span>Xsolla Shop</span>
          </div>
          <nav className="shop__nav">
            <a href="#">Home</a>
            <a href="#">Cart</a>
          </nav>
        </div>
      </header>

      <main className="shop__main">
        <section className="shop__hero">
          <h1>Welcome to Xsolla Shop</h1>
          <p>Discover our exclusive collection of merchandise</p>
        </section>

        <section className="shop__catalog">
          {loading && (
            <div className="shop__state">
              <div className="spinner" />
              <p>Loading items...</p>
            </div>
          )}

          {error && (
            <div className="shop__state shop__state--error">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <circle cx="24" cy="24" r="22" stroke="#ef4444" strokeWidth="2" />
                <path d="M24 14v14M24 32v2" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
              <p>Failed to load items: {error}</p>
              <button onClick={() => window.location.reload()}>Try again</button>
            </div>
          )}

          {!loading && !error && items.length === 0 && (
            <div className="shop__state">
              <p>No items available right now.</p>
            </div>
          )}

          {!loading && !error && items.length > 0 && (
            <>
              <div className="shop__catalog-header">
                <h2>All Items</h2>
                <span className="shop__count">{items.length} products</span>
              </div>
              <div className="shop__grid">
                {items.map((item) => (
                  <ItemCard key={item.id} item={item} />
                ))}
              </div>
            </>
          )}
        </section>
      </main>

      <footer className="shop__footer">
        <p>© 2026 Xsolla Shop. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
