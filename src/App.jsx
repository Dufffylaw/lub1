import { useState, useCallback } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import BookList from './components/BookList'
import BookDetail from './components/BookDetail'
import Cart from './components/Cart'
import Footer from './components/Footer'
import { addToCart, removeFromCart, updateQuantity, getCartCount } from './utils/cartUtils'
import './App.css'

export default function App() {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('bookshelf-cart')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  const saveCart = (newCart) => {
    setCart(newCart)
    localStorage.setItem('bookshelf-cart', JSON.stringify(newCart))
  }

  const handleAddToCart = useCallback(
    (book) => saveCart(addToCart(cart, book)),
    [cart]
  )

  const handleRemove = useCallback(
    (bookId) => saveCart(removeFromCart(cart, bookId)),
    [cart]
  )

  const handleUpdateQuantity = useCallback(
    (bookId, qty) => saveCart(updateQuantity(cart, bookId, qty)),
    [cart]
  )

  return (
    <div className="app">
      <Header cartCount={getCartCount(cart)} />
      <main className="main">
        <div className="container">
          <Routes>
            <Route path="/" element={<BookList onAddToCart={handleAddToCart} />} />
            <Route path="/book/:id" element={<BookDetail onAddToCart={handleAddToCart} />} />
            <Route path="/cart" element={
              <Cart cart={cart} onRemove={handleRemove} onUpdateQuantity={handleUpdateQuantity} />
            } />
          </Routes>
        </div>
      </main>
      <Footer />
    </div>
  )
}
