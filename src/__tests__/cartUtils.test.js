import { describe, it, expect } from 'vitest'
import {
  addToCart,
  removeFromCart,
  updateQuantity,
  getCartTotal,
  getCartCount,
} from '../utils/cartUtils'

const book1 = { id: 1, title: 'Дюна', author: 'Герберт', price: 890 }
const book2 = { id: 2, title: 'Холмс', author: 'Дойл', price: 520 }

describe('addToCart', () => {
  it('adds a new book to empty cart', () => {
    const result = addToCart([], book1)
    expect(result).toHaveLength(1)
    expect(result[0]).toMatchObject({ id: 1, quantity: 1 })
  })

  it('increments quantity if book already in cart', () => {
    const cart = [{ ...book1, quantity: 1 }]
    const result = addToCart(cart, book1)
    expect(result).toHaveLength(1)
    expect(result[0].quantity).toBe(2)
  })

  it('adds different books separately', () => {
    const cart = [{ ...book1, quantity: 1 }]
    const result = addToCart(cart, book2)
    expect(result).toHaveLength(2)
  })
})

describe('removeFromCart', () => {
  it('removes a book by id', () => {
    const cart = [{ ...book1, quantity: 1 }, { ...book2, quantity: 2 }]
    const result = removeFromCart(cart, 1)
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe(2)
  })

  it('returns empty array when removing last item', () => {
    const cart = [{ ...book1, quantity: 1 }]
    const result = removeFromCart(cart, 1)
    expect(result).toHaveLength(0)
  })
})

describe('updateQuantity', () => {
  it('updates quantity for a book', () => {
    const cart = [{ ...book1, quantity: 1 }]
    const result = updateQuantity(cart, 1, 5)
    expect(result[0].quantity).toBe(5)
  })

  it('removes book when quantity is 0', () => {
    const cart = [{ ...book1, quantity: 1 }]
    const result = updateQuantity(cart, 1, 0)
    expect(result).toHaveLength(0)
  })
})

describe('getCartTotal', () => {
  it('calculates total price', () => {
    const cart = [
      { ...book1, quantity: 2 },
      { ...book2, quantity: 1 },
    ]
    expect(getCartTotal(cart)).toBe(890 * 2 + 520)
  })

  it('returns 0 for empty cart', () => {
    expect(getCartTotal([])).toBe(0)
  })
})

describe('getCartCount', () => {
  it('calculates total items count', () => {
    const cart = [
      { ...book1, quantity: 2 },
      { ...book2, quantity: 3 },
    ]
    expect(getCartCount(cart)).toBe(5)
  })

  it('returns 0 for empty cart', () => {
    expect(getCartCount([])).toBe(0)
  })
})
