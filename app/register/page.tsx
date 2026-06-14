"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Mail, Lock, Shield, User } from "lucide-react"
import AuthCard from "@/components/AuthCard"

export default function RegisterPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      })

      if (res.ok) {
        router.push("/signIn")
      } else {
        const data = await res.json()
        setError(data.message || "Ocurrió un error al registrarse.")
      }
    } catch (err) {
      setError("Ocurrió un error al registrarse.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex-1 flex items-center justify-center p-4 min-h-screen">
      <AuthCard>
        <div className="text-center mb-8">
          <div className="mx-auto flex items-center justify-center mb-6">
            <Shield className="w-12 h-12 text-[var(--ag-accent)] drop-shadow-[0_4px_12px_rgba(37,99,235,0.4)]" strokeWidth={1.5} />
          </div>
          <h1 className="text-2xl font-bold text-[var(--ag-text-primary)] mb-2">Crea tu cuenta</h1>
          <p className="text-sm text-[var(--ag-text-muted)]">Únete a Aegisroot hoy mismo</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-xl text-sm flex items-center gap-2 mb-6">
            <Lock className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <div>
            <label className="block text-xs font-medium text-[var(--ag-text-secondary)] mb-1.5">Nombre completo</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User className="h-4 w-4 text-[var(--ag-text-muted)]" />
              </div>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-11 h-[44px] px-[16px] rounded-[12px] bg-[rgba(239,246,255,0.60)] border border-[var(--ag-border)] text-[var(--ag-text-primary)] placeholder-[var(--ag-text-muted)] focus:bg-white focus:border-[var(--ag-border-focus)] focus:shadow-[var(--ag-glow-ring)] focus:outline-none transition-all duration-200"
                placeholder="Juan Pérez"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-[var(--ag-text-secondary)] mb-1.5">Correo Electrónico</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="h-4 w-4 text-[var(--ag-text-muted)]" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-11 h-[44px] px-[16px] rounded-[12px] bg-[rgba(239,246,255,0.60)] border border-[var(--ag-border)] text-[var(--ag-text-primary)] placeholder-[var(--ag-text-muted)] focus:bg-white focus:border-[var(--ag-border-focus)] focus:shadow-[var(--ag-glow-ring)] focus:outline-none transition-all duration-200"
                placeholder="tu@correo.com"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-xs font-medium text-[var(--ag-text-secondary)] mb-1.5">Contraseña</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-4 w-4 text-[var(--ag-text-muted)]" />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 h-[44px] px-[16px] rounded-[12px] bg-[rgba(239,246,255,0.60)] border border-[var(--ag-border)] text-[var(--ag-text-primary)] placeholder-[var(--ag-text-muted)] focus:bg-white focus:border-[var(--ag-border-focus)] focus:shadow-[var(--ag-glow-ring)] focus:outline-none transition-all duration-200"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="mt-2 w-full h-[44px] rounded-[12px] font-semibold text-[14px] text-white tracking-[0.01em] bg-[linear-gradient(135deg,#1D4ED8_0%,#2563EB_50%,#0EA5E9_100%)] shadow-[0_4px_16px_rgba(37,99,235,0.35)] hover:-translate-y-[1px] hover:shadow-[0_8px_24px_rgba(37,99,235,0.45)] active:translate-y-0 transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] disabled:opacity-50 flex items-center justify-center border-none"
          >
            {isLoading ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : "Registrarse"}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-[var(--ag-text-secondary)]">
          ¿Ya tienes una cuenta?{" "}
          <Link href="/signIn" className="font-semibold text-[var(--ag-accent)] hover:text-[var(--ag-accent-light)] transition-colors">
            Inicia sesión
          </Link>
        </p>
      </AuthCard>
    </div>
  )
}
