"use client"

import { X, Minus, Plus } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useCart } from "../lib/cart-context"
import { getFullImageUrl } from "../lib/api"

export default function CartSidebar() {
  const { state, dispatch } = useCart()

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } })
  }

  const removeItem = (id: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: { id } })
  }

  const closeCart = () => {
    dispatch({ type: "CLOSE_CART" })
  }

  if (!state.isOpen) return null

  return (
    <>
      {/* Cart Sidebar */}
      <div className="fixed right-0 top-0 h-full w-80 bg-white z-50 transform transition-transform duration-300 ease-in-out shadow-2xl border-l border-gray-200 flex flex-col">
        {/* Header - Fixed at top */}
        <div className="flex items-center justify-between p-3 border-b border-gray-200 bg-black text-white flex-shrink-0">
          <div className="w-6"></div> {/* Spacer for centering */}
          <h2 className="text-sm font-semibold">MY BAG</h2>
          <button
            onClick={closeCart}
            className="p-1 hover:bg-gray-800 rounded transition-colors"
            aria-label="Close cart"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Cart Items - Scrollable area */}
        <div className="flex-1 overflow-y-auto">
          {state.items.length === 0 ? (
            <div className="text-center py-6 px-3">
              <p className="text-black text-xs">Your bag is empty</p>
            </div>
          ) : (
            <div className="p-3 space-y-3 pb-4">
              {state.items.map((item) => (
                <div key={item.id} className="flex gap-2 p-2 border border-gray-200 rounded">
                  {/* Product Image */}
                  <div className="relative w-12 h-12 flex-shrink-0">
                    <Image
                      src={getFullImageUrl(item.product.images?.[0]?.url) || "/placeholder.svg"}
                      alt={item.product.title}
                      fill
                      className="object-contain rounded"
                      sizes="48px"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0 pr-1">
                        <h3 className="text-xs font-medium text-black truncate" title={item.product.title}>
                          {item.product.title}
                        </h3>
                        {item.selectedSize && (
                          <p className="text-[10px] text-black mt-0.5 truncate" title={`Size: ${item.selectedSize}`}>
                            Size: {item.selectedSize}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-0.5 text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
                        aria-label="Remove item"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Quantity and Price */}
                    <div className="flex items-center justify-between mt-1.5">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] text-black flex-shrink-0">QTY:</span>
                        <div className="flex items-center gap-0.5">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-0.5 text-black hover:text-gray-600 transition-colors flex-shrink-0"
                            disabled={item.quantity <= 1}
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-2.5 h-2.5" />
                          </button>
                          <span className="text-xs font-medium min-w-[16px] text-center text-black flex-shrink-0">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-0.5 text-black hover:text-gray-600 transition-colors flex-shrink-0"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-2.5 h-2.5" />
                          </button>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p
                          className="text-xs font-semibold text-red-600 truncate max-w-[80px]"
                          title={`PKR ${(Number.parseFloat(item.product.price) * item.quantity).toLocaleString()}`}
                        >
                          PKR {(Number.parseFloat(item.product.price) * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer - Fixed at bottom */}
        {state.items.length > 0 && (
          <div className="border-t border-gray-200 p-3 bg-white flex-shrink-0">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-black">CART SUBTOTAL:</span>
              <span
                className="text-sm font-bold text-black truncate max-w-[120px]"
                title={`PKR ${state.total.toLocaleString()}`}
              >
                PKR {state.total.toLocaleString()}
              </span>
            </div>

            <div className="space-y-1.5">
              <button
                className="w-full bg-gray-200 text-black py-2 text-xs font-semibold hover:bg-gray-300 transition-colors truncate"
                title="VIEW AND EDIT CART"
              >
                VIEW AND EDIT CART
              </button>
              <Link
                href="/checkout"
                onClick={closeCart}
                className="block w-full bg-black text-white py-2 text-xs font-semibold hover:bg-gray-800 transition-colors text-center truncate"
                title="GO TO CHECKOUT"
              >
                GO TO CHECKOUT
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
