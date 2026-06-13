"use client"

import Link from "next/link"
import { useSession } from "next-auth/react"
import { User as UserIcon, LayoutDashboard } from "lucide-react"
import LogoutButton from "./LogoutButton"

export default function Navbar() {
  const { data: session, status } = useSession()

  return (
    <nav className="w-full bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
              AuthDemo
            </Link>
          </div>
          
          <div className="flex items-center gap-4">
            {status === "authenticated" ? (
              <>
                <Link href="/dashboard" className="text-slate-300 hover:text-white flex items-center gap-2 transition-colors">
                  <LayoutDashboard size={18} />
                  <span className="hidden sm:inline">Dashboard</span>
                </Link>
                <Link href="/profile" className="text-slate-300 hover:text-white flex items-center gap-2 transition-colors">
                  <UserIcon size={18} />
                  <span className="hidden sm:inline">Profile</span>
                </Link>
                <LogoutButton />
              </>
            ) : status === "unauthenticated" && (
              <>
                <Link href="/signIn" className="text-slate-300 hover:text-white transition-colors">
                  Sign In
                </Link>
                <Link href="/register" className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition-all">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
