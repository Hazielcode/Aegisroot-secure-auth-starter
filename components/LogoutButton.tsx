"use client"

import { signOut } from "next-auth/react"
import { LogOut } from "lucide-react"

export default function LogoutButton() {
  return (
    <button 
      onClick={() => signOut({ callbackUrl: "/signIn" })}
      className="ml-4 px-4 py-2 rounded-md bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition-all flex items-center gap-2 border border-slate-700"
    >
      <LogOut size={18} />
      <span className="hidden sm:inline">Logout</span>
    </button>
  )
}
