import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { LayoutDashboard } from "lucide-react"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  return (
    <div className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="mb-10 animate-fade-in-up">
        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
          Welcome back, <br />
          <span className="glow-text-brand">{session?.user?.name?.split(' ')[0] || session?.user?.email?.split('@')[0] || "User"}</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl">
          You are currently accessing a protected workspace environment. Your session is active and secure.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-8 rounded-[2rem] md:col-span-2 relative overflow-hidden group">
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-brand-500/10 rounded-full blur-[50px] group-hover:bg-brand-500/20 transition-all duration-500"></div>
          <div className="relative z-10">
            <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-6">
              <LayoutDashboard className="w-6 h-6 text-brand-500" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">System Status</h2>
            <p className="text-gray-400 text-sm mb-6">All security protocols are running normally. No breaches detected.</p>
            
            <div className="flex items-center gap-3 bg-black/40 border border-gray-800 rounded-xl p-4">
              <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.6)] animate-pulse"></div>
              <span className="text-sm font-medium text-gray-300">Connection Secure</span>
            </div>
          </div>
        </div>

        <div className="glass-panel p-8 rounded-[2rem] flex flex-col justify-center items-center text-center relative overflow-hidden group">
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-brand-600/10 rounded-full blur-[50px] group-hover:bg-brand-600/20 transition-all duration-500"></div>
          <div className="relative z-10">
            <div className="text-5xl font-black glow-text-brand mb-2">100%</div>
            <div className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-6">Uptime</div>
            <button className="w-full py-2.5 px-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white text-sm font-medium transition-all">
              View Logs
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
