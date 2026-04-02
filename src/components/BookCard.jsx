import { Link } from 'react-router-dom'

export default function BookCard({ book, onAddToCart }) {
  return (
    <div className="book-card">
      <Link to={`/book/${book.id}`} className="book-card-link">
        <div className="book-cover-wrap">
          <img src={book.cover} alt={book.title} className="book-cover" loading="lazy" />
          <div className="book-genre-tag">{book.genre}</div>
        </div>
        <div className="book-info">
          <h3 className="book-title">{book.title}</h3>
          <p className="book-author">{book.author}</p>
          <div className="book-rating">
            {'★'.repeat(Math.round(book.rating))}{'☆'.repeat(5 - Math.round(book.rating))}
            <span className="rating-num">{book.rating}</span>
          </div>
        </div>
      </Link>
      <div className="book-bottom">
        <span className="book-price">{book.price} ₽</span>
        <button className="btn btn-add" onClick={() => onAddToCart(book)}>
          В корзину
        </button>
      </div>
    </div>
  )
}
