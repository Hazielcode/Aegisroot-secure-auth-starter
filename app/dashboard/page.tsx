import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { LayoutDashboard } from "lucide-react"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  return (
    <div className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="mb-10 animate-fade-in-up">
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4 transform transition-all duration-500 hover:scale-[1.01]">
          Bienvenido de nuevo, <br />
          <span className="glow-text-brand">{session?.user?.name?.split(' ')[0] || session?.user?.email?.split('@')[0] || "Usuario"}</span>
        </h1>
        <p className="text-slate-500 text-lg max-w-2xl font-medium">
          Estás accediendo a un entorno de trabajo protegido. Tu sesión está activa y cifrada de extremo a extremo.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel-light p-8 rounded-[2rem] md:col-span-2 relative overflow-hidden group transition-all duration-500 hover:shadow-2xl hover:shadow-[#4285F4]/10 hover:-translate-y-1">
          <div className="relative z-10">
            <div className="w-12 h-12 bg-white border border-slate-100 shadow-sm rounded-2xl flex items-center justify-center mb-6 transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
              <LayoutDashboard className="w-6 h-6 text-[#4285F4]" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Estado del Sistema</h2>
            <p className="text-slate-500 text-sm mb-6 font-medium">Todos los protocolos de seguridad operan con normalidad. No se detectan anomalías.</p>
            
            <div className="flex items-center gap-3 bg-white/60 border border-slate-200 rounded-xl p-4 transition-colors duration-300 group-hover:bg-white/90">
              <div className="w-3 h-3 rounded-full bg-green-500 shadow-md animate-pulse"></div>
              <span className="text-sm font-bold text-green-600">Conexión Segura Activa</span>
            </div>
          </div>
        </div>

        <div className="glass-panel-light p-8 rounded-[2rem] flex flex-col justify-center items-center text-center relative overflow-hidden group transition-all duration-500 hover:shadow-2xl hover:shadow-[#4285F4]/10 hover:-translate-y-1">
          <div className="relative z-10 w-full">
            <div className="text-5xl font-black text-[#4285F4] mb-2 transform transition-all duration-500 group-hover:scale-110">100%</div>
            <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">Uptime del Servidor</div>
            <button className="w-full py-3 px-4 rounded-xl shadow-sm text-sm font-bold text-slate-700 bg-white/80 border border-slate-200 hover:bg-white hover:text-[#4285F4] hover:border-[#4285F4]/30 hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0">
              Ver Registros de Actividad
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
