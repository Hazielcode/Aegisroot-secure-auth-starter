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

import dynamic from "next/dynamic"

const ParticlesBackground = dynamic(() => import("@/components/ParticlesBackground"), {
  ssr: false,
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`${inter.className} min-h-screen flex flex-col relative`}>
        <ParticlesBackground />
        <div className="relative z-10 flex flex-col flex-1">
          <SessionProvider>
            {/* The Navbar will be rendered inside children for pages that need it, or we can conditionally render it here. For now, since Dashboard has a sidebar, we'll probably need to adjust Navbar or remove it from layout if dashboard uses a custom layout. I'll keep it for now if they already had it. Wait, the prompt says for Dashboard "Sidebar fijo 260px", which implies we might not want the global navbar there. But I shouldn't break existing routing. I will leave Navbar for now, or just let's see. Wait, I'll keep Navbar but with relative z-10. */}
            <Navbar />
            <main className="flex-1 flex flex-col w-full">
              {children}
            </main>
          </SessionProvider>
        </div>
      </body>
    </html>
  )
}
