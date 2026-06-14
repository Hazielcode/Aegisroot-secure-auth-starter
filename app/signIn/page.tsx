"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Mail, Lock, Shield } from "lucide-react"
import AuthCard from "@/components/AuthCard"

export default function SignInPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })

    if (res?.error) {
      setError(res.error)
      setIsLoading(false)
    } else {
      router.push("/dashboard")
      router.refresh()
    }
  }

  return (
    <div className="flex-1 flex items-center justify-center p-4 min-h-screen">
      <AuthCard>
        <div className="text-center mb-8">
          <div className="mx-auto flex items-center justify-center mb-6">
            <Shield className="w-12 h-12 text-[var(--ag-accent)] drop-shadow-[0_4px_12px_rgba(37,99,235,0.4)]" strokeWidth={1.5} />
          </div>
          <h1 className="text-2xl font-bold text-[var(--ag-text-primary)] mb-2">Bienvenido de nuevo</h1>
          <p className="text-sm text-[var(--ag-text-muted)]">Inicia sesión en tu espacio de trabajo Aegisroot</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-xl text-sm flex items-center gap-2 mb-6">
            <Lock className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
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
            ) : "Iniciar sesión"}
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[rgba(37,99,235,0.15)] to-transparent"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-2 bg-[rgba(255,255,255,0.8)] backdrop-blur text-[var(--ag-text-muted)]">O continúa con</span>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            className="w-full h-[44px] rounded-[12px] bg-[rgba(255,255,255,0.80)] border border-[var(--ag-border)] font-medium text-[14px] text-[var(--ag-text-primary)] hover:bg-white hover:border-[var(--ag-border-focus)] hover:shadow-[0_2px_12px_rgba(37,99,235,0.10)] transition-all duration-200 flex items-center justify-center gap-3"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Google
          </button>
          
          <button
            onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
            className="w-full h-[44px] rounded-[12px] bg-[rgba(255,255,255,0.80)] border border-[var(--ag-border)] font-medium text-[14px] text-[var(--ag-text-primary)] hover:bg-white hover:border-[var(--ag-border-focus)] hover:shadow-[0_2px_12px_rgba(37,99,235,0.10)] transition-all duration-200 flex items-center justify-center gap-3"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub
          </button>
        </div>

        <p className="mt-8 text-center text-sm text-[var(--ag-text-secondary)]">
          ¿No tienes una cuenta?{" "}
          <Link href="/register" className="font-semibold text-[var(--ag-accent)] hover:text-[var(--ag-accent-light)] transition-colors">
            Crea tu cuenta
          </Link>
        </p>
      </AuthCard>
    </div>
  )
}
