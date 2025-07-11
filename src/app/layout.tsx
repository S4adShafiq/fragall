import type React from "react"
import type { Metadata } from "next"
import { Alata } from "next/font/google"
import "./globals.css"
import Header from "./components/header"
import Footer from "./components/footer"
import { CartProvider } from "../lib/cart-context"
import CartSidebar from "../components/cart-sidebar"

const alata = Alata({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-alata",
  display: "swap",
})

export const metadata: Metadata = {
  title: "J. Fragnance",
  description: "Generated by create next app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${alata.variable} antialiased`}>
        <CartProvider>
          <Header />
          {children}
          <Footer />
          <CartSidebar />
        </CartProvider>
      </body>
    </html>
  )
}
