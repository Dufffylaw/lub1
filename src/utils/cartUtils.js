export function addToCart(cart, book) {
  const existing = cart.find((item) => item.id === book.id)
  if (existing) {
    return cart.map((item) =>
      item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
    )
  }
  return [...cart, { ...book, quantity: 1 }]
}

export function removeFromCart(cart, bookId) {
  return cart.filter((item) => item.id !== bookId)
}

export function updateQuantity(cart, bookId, quantity) {
  if (quantity <= 0) return removeFromCart(cart, bookId)
  return cart.map((item) =>
    item.id === bookId ? { ...item, quantity } : item
  )
}

export function getCartTotal(cart) {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
}

export function getCartCount(cart) {
  return cart.reduce((count, item) => count + item.quantity, 0)
}
