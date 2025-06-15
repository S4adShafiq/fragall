"use client"

import type React from "react"
import { createContext, useContext, useReducer, useEffect } from "react"
import type { Product } from "./api"

export interface CartItem {
  id: string
  product: Product
  quantity: number
  selectedSize?: string
}

interface CartState {
  items: CartItem[]
  isOpen: boolean
  total: number
}

type CartAction =
  | { type: "ADD_ITEM"; payload: { product: Product; selectedSize?: string } }
  | { type: "REMOVE_ITEM"; payload: { id: string } }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "TOGGLE_CART" }
  | { type: "OPEN_CART" }
  | { type: "CLOSE_CART" }
  | { type: "CLEAR_CART" }
  | { type: "LOAD_CART"; payload: CartItem[] }

const CartContext = createContext<{
  state: CartState
  dispatch: React.Dispatch<CartAction>
} | null>(null)

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const { product, selectedSize } = action.payload
      const itemId = `${product.id}-${selectedSize || "default"}`

      const existingItem = state.items.find((item) => item.id === itemId)

      let newItems: CartItem[]
      if (existingItem) {
        newItems = state.items.map((item) => (item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item))
      } else {
        newItems = [
          ...state.items,
          {
            id: itemId,
            product,
            quantity: 1,
            selectedSize,
          },
        ]
      }

      const total = newItems.reduce((sum, item) => sum + Number.parseFloat(item.product.price) * item.quantity, 0)

      return {
        ...state,
        items: newItems,
        total,
        isOpen: true,
      }
    }

    case "REMOVE_ITEM": {
      const newItems = state.items.filter((item) => item.id !== action.payload.id)
      const total = newItems.reduce((sum, item) => sum + Number.parseFloat(item.product.price) * item.quantity, 0)

      return {
        ...state,
        items: newItems,
        total,
      }
    }

    case "UPDATE_QUANTITY": {
      const { id, quantity } = action.payload

      if (quantity <= 0) {
        return cartReducer(state, { type: "REMOVE_ITEM", payload: { id } })
      }

      const newItems = state.items.map((item) => (item.id === id ? { ...item, quantity } : item))

      const total = newItems.reduce((sum, item) => sum + Number.parseFloat(item.product.price) * item.quantity, 0)

      return {
        ...state,
        items: newItems,
        total,
      }
    }

    case "TOGGLE_CART":
      return { ...state, isOpen: !state.isOpen }

    case "OPEN_CART":
      return { ...state, isOpen: true }

    case "CLOSE_CART":
      return { ...state, isOpen: false }

    case "CLEAR_CART":
      return { ...state, items: [], total: 0 }

    case "LOAD_CART":
      const total = action.payload.reduce((sum, item) => sum + Number.parseFloat(item.product.price) * item.quantity, 0)
      return { ...state, items: action.payload, total }

    default:
      return state
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    isOpen: false,
    total: 0,
  })

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("junaid-jamshed-cart")
    if (savedCart) {
      try {
        const cartItems = JSON.parse(savedCart)
        dispatch({ type: "LOAD_CART", payload: cartItems })
      } catch (error) {
        console.error("Error loading cart from localStorage:", error)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("junaid-jamshed-cart", JSON.stringify(state.items))
  }, [state.items])

  return <CartContext.Provider value={{ state, dispatch }}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
