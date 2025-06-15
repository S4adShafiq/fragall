"use client"

import { ShoppingCart } from "lucide-react"
import { useCart } from "../lib/cart-context"

export default function CartIcon() {
  const { state, dispatch } = useCart()

  const toggleCart = () => {
    dispatch({ type: "TOGGLE_CART" })
  }

  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <button
      onClick={toggleCart}
      className="relative p-2 text-black hover:text-gray-600 transition-colors"
      aria-label="Open shopping cart"
    >
      <ShoppingCart className="w-4 h-4" />
      {totalItems > 0 && (
        <span className="absolute -top-0.5 -right-0.5 bg-red-600 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-semibold">
          {totalItems > 99 ? "99+" : totalItems}
        </span>
      )}
    </button>
  )
}
