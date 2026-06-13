import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import SessionProvider from "@/components/SessionProvider"
import Navbar from "@/components/Navbar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Auth Next.js Demo",
  description: "Next.js App Router authentication demo",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-950 text-slate-50 min-h-screen flex flex-col`}>
        <SessionProvider>
          <Navbar />
          <main className="flex-1 flex flex-col w-full">
            {children}
          </main>
        </SessionProvider>
      </body>
    </html>
  )
}
