import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import BookList from '../components/BookList'

function renderBookList() {
  return render(
    <MemoryRouter>
      <BookList onAddToCart={vi.fn()} />
    </MemoryRouter>
  )
}

describe('BookList', () => {
  it('renders the catalog title', () => {
    renderBookList()
    expect(screen.getByText('Каталог книг')).toBeInTheDocument()
  })

  it('renders book cards', () => {
    renderBookList()
    expect(screen.getByText('Дюна')).toBeInTheDocument()
    expect(screen.getByText('Мастер и Маргарита')).toBeInTheDocument()
  })

  it('filters books by genre', async () => {
    renderBookList()
    const user = userEvent.setup()
    await user.click(screen.getByRole('button', { name: 'Детектив' }))
    expect(screen.getByText('Убийство в «Восточном экспрессе»')).toBeInTheDocument()
    expect(screen.queryByText('Дюна')).not.toBeInTheDocument()
  })

  it('filters books by search query', async () => {
    renderBookList()
    const user = userEvent.setup()
    const searchInput = screen.getByPlaceholderText('Поиск по названию или автору...')
    await user.type(searchInput, 'Булгаков')
    expect(screen.getByText('Мастер и Маргарита')).toBeInTheDocument()
    expect(screen.queryByText('Дюна')).not.toBeInTheDocument()
  })

  it('shows empty state when no books match', async () => {
    renderBookList()
    const user = userEvent.setup()
    const searchInput = screen.getByPlaceholderText('Поиск по названию или автору...')
    await user.type(searchInput, 'несуществующая книга xyz')
    expect(screen.getByText('Книги не найдены. Попробуйте другой запрос.')).toBeInTheDocument()
  })
})
