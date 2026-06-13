"use client"

import Link from "next/link"
import { useSession } from "next-auth/react"
import { User as UserIcon, LayoutDashboard } from "lucide-react"
import LogoutButton from "./LogoutButton"

export default function Navbar() {
  const { data: session, status } = useSession()

  return (
    <nav className="fixed w-full top-0 z-50 px-4 py-4 sm:px-6 lg:px-8 pointer-events-none">
      <div className="max-w-5xl mx-auto glass-panel rounded-2xl px-6 py-3 flex justify-between items-center pointer-events-auto transition-all duration-300">
        <div className="flex-shrink-0">
          <Link href="/" className="text-xl font-bold flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-full bg-[#4285F4] flex items-center justify-center shadow-md group-hover:shadow-lg transition-all">
              <span className="text-white text-lg font-black tracking-tighter">A</span>
            </div>
            <span className="text-gray-900 hidden sm:block tracking-wide">Aegisroot</span>
          </Link>
        </div>
        
        <div className="flex items-center gap-6">
          {status === "authenticated" ? (
            <>
              <Link href="/dashboard" className="text-gray-600 hover:text-gray-900 flex items-center gap-2 transition-colors text-sm font-medium">
                <LayoutDashboard size={16} />
                <span className="hidden sm:inline">Dashboard</span>
              </Link>
              <Link href="/profile" className="text-gray-600 hover:text-gray-900 flex items-center gap-2 transition-colors text-sm font-medium">
                <UserIcon size={16} />
                <span className="hidden sm:inline">Profile</span>
              </Link>
              <LogoutButton />
            </>
          ) : status === "unauthenticated" && (
            <>
              <Link href="/signIn" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">
                Log in
              </Link>
              <Link href="/signIn" className="px-5 py-2 rounded-xl bg-[#4285F4] text-white font-semibold hover:bg-[#3367D6] transition-all text-sm shadow-md">
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
