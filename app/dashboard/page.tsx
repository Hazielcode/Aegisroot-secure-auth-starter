"use client"

import { useSession } from "next-auth/react"
import { LayoutDashboard, Users, Shield, Activity, User, LogOut } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"

export default function DashboardPage() {
  const { data: session } = useSession()
  const pathname = usePathname()

  const userName = session?.user?.name?.split(' ')[0] || session?.user?.email?.split('@')[0] || "Usuario"
  const currentDate = new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

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
      <main className="flex-1 ml-[260px] p-8 max-w-6xl mx-auto w-full z-10">
        <header className="sticky top-0 bg-transparent backdrop-blur-sm pb-6 mb-8 border-b border-[var(--ag-border)] flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold text-[var(--ag-text-primary)]">Buenos días, {userName}</h1>
            <p className="text-[var(--ag-text-muted)] mt-1 capitalize">{currentDate}</p>
          </div>
          <button 
            onClick={() => signOut({ callbackUrl: "/signIn" })}
            className="flex items-center gap-2 text-[var(--ag-text-secondary)] hover:text-red-500 transition-colors text-sm font-medium"
          >
            <LogOut size={16} />
            Cerrar sesión
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Stat Card 1 */}
          <div className="bg-white border border-[var(--ag-border)] rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[var(--ag-text-muted)] text-sm font-medium mb-1">Conexiones Seguras</p>
                <p className="text-3xl font-bold text-[var(--ag-accent)]">2,481</p>
              </div>
              <div className="w-12 h-12 bg-[var(--ag-accent-dim)] rounded-xl flex items-center justify-center text-[var(--ag-accent)]">
                <Shield size={24} />
              </div>
            </div>
          </div>

          {/* Stat Card 2 */}
          <div className="bg-white border border-[var(--ag-border)] rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[var(--ag-text-muted)] text-sm font-medium mb-1">Uptime del Servidor</p>
                <p className="text-3xl font-bold text-[var(--ag-accent)]">99.9%</p>
              </div>
              <div className="w-12 h-12 bg-[var(--ag-accent-dim)] rounded-xl flex items-center justify-center text-[var(--ag-accent)]">
                <Activity size={24} />
              </div>
            </div>
          </div>

          {/* Stat Card 3 */}
          <div className="bg-white border border-[var(--ag-border)] rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[var(--ag-text-muted)] text-sm font-medium mb-1">Sesiones Activas</p>
                <p className="text-3xl font-bold text-[var(--ag-accent)]">14</p>
              </div>
              <div className="w-12 h-12 bg-[var(--ag-accent-dim)] rounded-xl flex items-center justify-center text-[var(--ag-accent)]">
                <Users size={24} />
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-xl font-bold text-[var(--ag-text-primary)] mb-4">Actividad Reciente</h2>
        <div className="bg-white border border-[var(--ag-border)] rounded-2xl overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[var(--ag-bg-subtle)]/50 border-b border-[var(--ag-border)]">
                <th className="px-6 py-4 text-xs font-semibold text-[var(--ag-text-muted)] uppercase tracking-wider">Evento</th>
                <th className="px-6 py-4 text-xs font-semibold text-[var(--ag-text-muted)] uppercase tracking-wider">Estado</th>
                <th className="px-6 py-4 text-xs font-semibold text-[var(--ag-text-muted)] uppercase tracking-wider">Fecha</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--ag-border)]">
              {[
                { event: "Inicio de sesión", status: "Completado", date: "Hace 2 min" },
                { event: "Verificación OAuth", status: "Completado", date: "Hace 2 min" },
                { event: "Actualización de token", status: "Completado", date: "Ayer" },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-[var(--ag-bg-subtle)]/30 transition-colors">
                  <td className="px-6 py-4 text-sm text-[var(--ag-text-primary)] font-medium">{row.event}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-[var(--ag-text-muted)]">{row.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}
