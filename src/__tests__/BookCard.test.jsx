import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import BookCard from '../components/BookCard'

const mockBook = {
  id: 1,
  title: 'Тестовая книга',
  author: 'Тестовый автор',
  price: 999,
  genre: 'Фантастика',
  cover: 'https://example.com/cover.jpg',
  rating: 4.5,
}

function renderBookCard(onAddToCart = vi.fn()) {
  return render(
    <MemoryRouter>
      <BookCard book={mockBook} onAddToCart={onAddToCart} />
    </MemoryRouter>
  )
}

describe('BookCard', () => {
  it('renders book title', () => {
    renderBookCard()
    expect(screen.getByText('Тестовая книга')).toBeInTheDocument()
  })

  it('renders book author', () => {
    renderBookCard()
    expect(screen.getByText('Тестовый автор')).toBeInTheDocument()
  })

  it('renders book price', () => {
    renderBookCard()
    expect(screen.getByText('999 ₽')).toBeInTheDocument()
  })

  it('renders genre tag', () => {
    renderBookCard()
    expect(screen.getByText('Фантастика')).toBeInTheDocument()
  })

  it('calls onAddToCart when button is clicked', async () => {
    const onAddToCart = vi.fn()
    renderBookCard(onAddToCart)
    await userEvent.click(screen.getByText('В корзину'))
    expect(onAddToCart).toHaveBeenCalledWith(mockBook)
  })
})
