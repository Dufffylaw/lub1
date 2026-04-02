import { Link } from 'react-router-dom'
import { getCartTotal } from '../utils/cartUtils'

export default function Cart({ cart, onRemove, onUpdateQuantity }) {
  if (cart.length === 0) {
    return (
      <section className="cart-section">
        <h2 className="section-title">Корзина</h2>
        <div className="empty-state">
          <span className="empty-icon">🛒</span>
          <p>Корзина пуста</p>
          <Link to="/" className="btn btn-add">Перейти в каталог</Link>
        </div>
      </section>
    )
  }

  return (
    <section className="cart-section">
      <h2 className="section-title">Корзина</h2>
      <div className="cart-items">
        {cart.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.cover} alt={item.title} className="cart-item-cover" />
            <div className="cart-item-info">
              <h3 className="cart-item-title">{item.title}</h3>
              <p className="cart-item-author">{item.author}</p>
            </div>
            <div className="cart-item-qty">
              <button
                className="qty-btn"
                onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
              >
                −
              </button>
              <span className="qty-value">{item.quantity}</span>
              <button
                className="qty-btn"
                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              >
                +
              </button>
            </div>
            <span className="cart-item-price">{item.price * item.quantity} ₽</span>
            <button className="btn-remove" onClick={() => onRemove(item.id)}>✕</button>
          </div>
        ))}
      </div>
      <div className="cart-total">
        <span>Итого:</span>
        <span className="total-price">{getCartTotal(cart)} ₽</span>
      </div>
      <button className="btn btn-checkout">Оформить заказ</button>
    </section>
  )
}
