"use client"

import { signOut } from "next-auth/react"
import { LogOut } from "lucide-react"

export default function LogoutButton() {
  return (
    <button 
      onClick={() => signOut({ callbackUrl: "/signIn" })}
      className="ml-2 px-4 py-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-all flex items-center gap-2 border border-red-200 hover:border-red-300 text-sm font-medium"
    >
      <LogOut size={16} />
      <span className="hidden sm:inline">Logout</span>
    </button>
  )
}
