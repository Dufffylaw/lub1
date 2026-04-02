import { useState, useMemo } from 'react'
import { books } from '../data/books'
import BookCard from './BookCard'
import SearchBar from './SearchBar'

export default function BookList({ onAddToCart }) {
  const [search, setSearch] = useState('')
  const [activeGenre, setActiveGenre] = useState('Все')

  const filtered = useMemo(() => {
    return books.filter((book) => {
      const matchesGenre = activeGenre === 'Все' || book.genre === activeGenre
      const q = search.toLowerCase()
      const matchesSearch =
        !q ||
        book.title.toLowerCase().includes(q) ||
        book.author.toLowerCase().includes(q)
      return matchesGenre && matchesSearch
    })
  }, [search, activeGenre])

  return (
    <section className="book-list-section">
      <h2 className="section-title">Каталог книг</h2>
      <SearchBar
        search={search}
        onSearchChange={setSearch}
        activeGenre={activeGenre}
        onGenreChange={setActiveGenre}
      />
      {filtered.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon">📖</span>
          <p>Книги не найдены. Попробуйте другой запрос.</p>
        </div>
      ) : (
        <div className="book-grid">
          {filtered.map((book) => (
            <BookCard key={book.id} book={book} onAddToCart={onAddToCart} />
          ))}
        </div>
      )}
    </section>
  )
}
