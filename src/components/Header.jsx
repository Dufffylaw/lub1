import { Link } from 'react-router-dom'

export default function Header({ cartCount }) {
  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="logo">
          <span className="logo-icon">📚</span>
          <span className="logo-text">BookShelf</span>
        </Link>
        <nav className="nav">
          <Link to="/" className="nav-link">Каталог</Link>
          <Link to="/cart" className="nav-link cart-link">
            🛒 Корзина
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
        </nav>
      </div>
    </header>
  )
}
