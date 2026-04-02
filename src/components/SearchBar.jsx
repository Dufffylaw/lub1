import { genres } from '../data/books'

export default function SearchBar({ search, onSearchChange, activeGenre, onGenreChange }) {
  return (
    <div className="search-bar">
      <div className="search-input-wrap">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          className="search-input"
          placeholder="Поиск по названию или автору..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        {search && (
          <button className="search-clear" onClick={() => onSearchChange('')}>✕</button>
        )}
      </div>
      <div className="genre-filters">
        {genres.map((genre) => (
          <button
            key={genre}
            className={`genre-btn ${activeGenre === genre ? 'active' : ''}`}
            onClick={() => onGenreChange(genre)}
          >
            {genre}
          </button>
        ))}
      </div>
    </div>
  )
}
