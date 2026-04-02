import { useParams, Link } from 'react-router-dom'
import { books } from '../data/books'

export default function BookDetail({ onAddToCart }) {
  const { id } = useParams()
  const book = books.find((b) => b.id === Number(id))

  if (!book) {
    return (
      <div className="detail-not-found">
        <h2>Книга не найдена</h2>
        <Link to="/" className="btn btn-back">← Вернуться в каталог</Link>
      </div>
    )
  }

  return (
    <section className="book-detail">
      <Link to="/" className="btn btn-back">← Назад в каталог</Link>
      <div className="detail-content">
        <div className="detail-cover-wrap">
          <img src={book.cover} alt={book.title} className="detail-cover" />
        </div>
        <div className="detail-info">
          <span className="detail-genre">{book.genre}</span>
          <h1 className="detail-title">{book.title}</h1>
          <p className="detail-author">{book.author}</p>
          <div className="detail-rating">
            {'★'.repeat(Math.round(book.rating))}{'☆'.repeat(5 - Math.round(book.rating))}
            <span className="rating-num">{book.rating}</span>
          </div>
          <p className="detail-desc">{book.description}</p>
          <div className="detail-buy">
            <span className="detail-price">{book.price} ₽</span>
            <button className="btn btn-add btn-lg" onClick={() => onAddToCart(book)}>
              Добавить в корзину
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
