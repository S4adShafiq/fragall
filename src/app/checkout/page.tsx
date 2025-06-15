"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronUp, ChevronDown } from "lucide-react"
import { useCart } from "../../lib/cart-context"
import { getFullImageUrl } from "../../lib/api"

export default function CheckoutPage() {
  const { state } = useCart()
  const [isOrderSummaryOpen, setIsOrderSummaryOpen] = useState(true)
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    streetAddress: "",
    country: "Pakistan",
    stateProvince: "",
    city: "",
    zipCode: "",
    phoneNumber: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleNext = () => {
    // Handle form submission and move to next step
    console.log("Form data:", formData)
  }

  const shippingCost = 169.0
  const subtotal = state.total
  const total = subtotal + shippingCost

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Progress Header */}
      <div className="bg-white border-b border-gray-200 py-4">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            {/* Step 1 - Active */}
            <div className="flex items-center">
              <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm font-semibold">
                1
              </div>
              <span className="ml-2 text-sm font-medium text-black">Shipping</span>
            </div>

            {/* Connector Line */}
            <div className="w-16 h-px bg-gray-300"></div>

            {/* Step 2 - Inactive */}
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm font-semibold">
                2
              </div>
              <span className="ml-2 text-sm font-medium text-gray-500">Review & Payments</span>
            </div>
          </div>

          <Link href="#" className="text-sm text-blue-600 hover:underline">
            Sign In
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Shipping Form */}
          <div className="lg:col-span-2">
            {/* Shipping Address */}
            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <h2 className="text-lg font-semibold text-black mb-6">Shipping Address</h2>

              <div className="space-y-4">
                {/* Email Address */}
                <div>
                  <label className="block text-sm font-medium text-black mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-sm"
                    required
                  />
                  <p className="text-xs text-gray-600 mt-1">You can create an account after checkout.</p>
                </div>

                {/* First Name & Last Name */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-black mb-1">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black mb-1">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-sm"
                      required
                    />
                  </div>
                </div>

                {/* Street Address */}
                <div>
                  <label className="block text-sm font-medium text-black mb-1">
                    Street Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="streetAddress"
                    value={formData.streetAddress}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-sm"
                    required
                  />
                </div>

                {/* Country & State/Province */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-black mb-1">
                      Country <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-sm"
                    >
                      <option value="Pakistan">Pakistan</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black mb-1">State/Province</label>
                    <input
                      type="text"
                      name="stateProvince"
                      value={formData.stateProvince}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-sm"
                    />
                  </div>
                </div>

                {/* City & Zip/Postal Code */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-black mb-1">City</label>
                    <select
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-sm"
                    >
                      <option value="">--Select City--</option>
                      <option value="Karachi">Karachi</option>
                      <option value="Lahore">Lahore</option>
                      <option value="Islamabad">Islamabad</option>
                      <option value="Rawalpindi">Rawalpindi</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black mb-1">Zip/Postal Code</label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-sm"
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-medium text-black mb-1">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-sm"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Shipping Methods */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-black">Shipping Methods</h2>
                <Link href="#" className="text-sm text-blue-600 hover:underline">
                  See our Shipping Policy
                </Link>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 font-medium text-black">Select</th>
                      <th className="text-left py-2 font-medium text-black">Method</th>
                      <th className="text-left py-2 font-medium text-black">Price</th>
                      <th className="text-left py-2 font-medium text-black">Method Title</th>
                      <th className="text-left py-2 font-medium text-black">Carrier Title</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-3">
                        <input
                          type="radio"
                          name="shipping"
                          value="local"
                          defaultChecked
                          className="w-4 h-4 text-blue-600"
                        />
                      </td>
                      <td className="py-3"></td>
                      <td className="py-3 font-medium text-black">PKR 169.00</td>
                      <td className="py-3 text-black">Fixed</td>
                      <td className="py-3 text-black">Local Shipment</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="flex justify-end mt-6">
                <button
                  onClick={handleNext}
                  className="px-6 py-2 bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors"
                >
                  NEXT
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-sm sticky top-4">
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setIsOrderSummaryOpen(!isOrderSummaryOpen)}
              >
                <h2 className="text-lg font-semibold text-black">Order Summary</h2>
                {isOrderSummaryOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </div>

              <p className="text-sm text-gray-600 mt-1">{state.items.length} Items in Cart</p>

              {isOrderSummaryOpen && (
                <div className="mt-4 space-y-4">
                  {state.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="relative w-12 h-12 flex-shrink-0">
                        <Image
                          src={getFullImageUrl(item.product.images?.[0]?.url) || "/placeholder.svg"}
                          alt={item.product.title}
                          fill
                          className="object-contain rounded"
                          sizes="48px"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-black">{item.product.title}</h3>
                        <p className="text-xs text-gray-600">Qty {item.quantity}</p>
                        <p className="text-sm font-semibold text-black">
                          PKR {(Number.parseFloat(item.product.price) * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}

                  <div className="border-t border-gray-200 pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal:</span>
                      <span className="text-black">PKR {subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Shipping:</span>
                      <span className="text-black">PKR {shippingCost.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-base font-semibold border-t border-gray-200 pt-2">
                      <span className="text-black">Total:</span>
                      <span className="text-black">PKR {total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
