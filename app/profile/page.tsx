"use client"

import { useSession } from "next-auth/react"
import { LayoutDashboard, Shield, User, LogOut, Mail } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"

export default function ProfilePage() {
  const { data: session } = useSession()
  const pathname = usePathname()

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Perfil", href: "/profile", icon: User },
  ]

  return (
    <div className="flex-1 flex min-h-screen">
      {/* Sidebar Fijo 260px */}
      <aside className="fixed left-0 top-0 bottom-0 w-[260px] bg-[rgba(255,255,255,0.85)] backdrop-blur-xl border-r border-[var(--ag-border)] flex flex-col z-20">
        <div className="p-6">
          <Link href="/" className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-[var(--ag-accent)] drop-shadow-[0_2px_8px_rgba(37,99,235,0.3)]" />
            <span className="font-bold text-[var(--ag-text-primary)] text-xl tracking-tight">Aegisroot</span>
          </Link>
        </div>
        
        <nav className="flex-1 px-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-all duration-200 ${
                  isActive 
                    ? "bg-[var(--ag-accent-dim)] text-[var(--ag-accent)] font-semibold border-l-2 border-[var(--ag-accent)]" 
                    : "text-[var(--ag-text-secondary)] hover:bg-[var(--ag-accent-dim)] hover:text-[var(--ag-accent)] font-medium"
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 mt-auto border-t border-[var(--ag-border)]">
          <div className="flex items-center gap-3 p-2">
            <div className="w-10 h-10 rounded-full bg-[var(--ag-accent-dim)] flex items-center justify-center flex-shrink-0 text-[var(--ag-accent)] overflow-hidden">
              {session?.user?.image ? (
                <img src={session.user.image} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <User size={20} />
              )}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-semibold text-[var(--ag-text-primary)] truncate">{session?.user?.name || "Usuario"}</p>
              <p className="text-xs text-[var(--ag-text-muted)] truncate">{session?.user?.email}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-[260px] flex items-center justify-center p-8 z-10 relative">
        <div className="w-full max-w-md bg-[rgba(255,255,255,0.85)] backdrop-blur-xl border border-[var(--ag-border)] rounded-3xl p-10 shadow-[var(--ag-card-shadow)] text-center transition-all duration-300 hover:shadow-[0_12px_32px_rgba(37,99,235,0.12),_0_1px_0_rgba(255,255,255,0.9)_inset]">
          <div className="mx-auto w-20 h-20 rounded-full ring-2 ring-blue-300 shadow-[0_0_24px_rgba(37,99,235,0.3)] mb-6 flex items-center justify-center bg-[var(--ag-bg-subtle)] overflow-hidden">
            {session?.user?.image ? (
              <img src={session.user.image} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <User className="w-10 h-10 text-[var(--ag-accent)]" />
            )}
          </div>

          <h2 className="text-2xl font-bold text-[var(--ag-text-primary)] mb-1">
            {session?.user?.name || "Usuario Anónimo"}
          </h2>
          <div className="flex items-center justify-center gap-2 text-sm text-[var(--ag-text-muted)] mb-4">
            <Mail size={14} />
            {session?.user?.email}
          </div>

          <div className="mb-8">
            <span className="inline-block bg-[var(--ag-accent-dim)] text-[var(--ag-accent)] text-xs font-medium rounded-full px-4 py-1.5 uppercase tracking-wider">
              {/* This assumes NextAuth standard providers. For custom logic, maybe infer provider from image or just show active. */}
              Usuario Autenticado
            </span>
          </div>

          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[rgba(37,99,235,0.2)] to-transparent mb-8"></div>

          <button
            onClick={() => signOut({ callbackUrl: "/signIn" })}
            className="w-full h-11 rounded-xl font-medium text-red-500 border border-red-200 hover:bg-red-50 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <LogOut size={18} />
            Cerrar sesión de forma segura
          </button>
        </div>
      </main>
    </div>
  )
}
