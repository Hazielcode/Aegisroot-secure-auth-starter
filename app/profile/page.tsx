import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { User as UserIcon, Mail } from "lucide-react"
import Image from "next/image"

export default async function ProfilePage() {
  const session = await getServerSession(authOptions)

  return (
    <div className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="glass-panel p-10 rounded-[2.5rem] relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-radial from-brand-500/10 to-transparent blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-radial from-brand-600/10 to-transparent blur-[80px] translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

        <div className="relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-8 mb-12 border-b border-gray-800/60 pb-12">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-500 to-brand-600 rounded-full blur-[20px] opacity-40 group-hover:opacity-60 transition-opacity"></div>
              <div className="w-32 h-32 rounded-full bg-black border border-gray-800 flex items-center justify-center overflow-hidden relative z-10 p-1">
                <div className="w-full h-full rounded-full overflow-hidden bg-gray-900 relative">
                  {session?.user?.image ? (
                    <Image 
                      src={session.user.image} 
                      alt="Profile picture" 
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <UserIcon className="w-16 h-16 text-gray-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                  )}
                </div>
              </div>
            </div>
            
            <div className="text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-semibold tracking-widest uppercase mb-3">
                <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></span>
                Active Identity
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-white mb-3 tracking-tight">
                {session?.user?.name || "Anonymous User"}
              </h1>
              <div className="flex items-center justify-center md:justify-start gap-2 text-gray-400 font-mono text-sm bg-black/40 px-4 py-2 rounded-xl border border-gray-800 w-fit mx-auto md:mx-0">
                <Mail size={16} className="text-brand-500" />
                <span>{session?.user?.email}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-brand-500 rounded-full"></span>
              Payload Data
            </h3>
            <div className="bg-black/60 rounded-2xl p-6 border border-gray-800 relative group/code">
              <div className="absolute top-4 right-4 text-xs font-mono text-gray-600 group-hover/code:text-brand-500 transition-colors">JSON</div>
              <pre className="text-sm font-mono text-gray-300 overflow-auto whitespace-pre-wrap leading-relaxed">
                <span className="text-brand-400">{`{`}</span>
                <br/>
                {Object.entries(session?.user || {}).map(([key, value], i, arr) => (
                  <div key={key} className="pl-4">
                    <span className="text-blue-400">"{key}"</span>
                    <span className="text-gray-500">: </span>
                    <span className="text-green-400">"{value}"</span>
                    {i < arr.length - 1 ? <span className="text-gray-500">,</span> : null}
                  </div>
                ))}
                <span className="text-brand-400">{`}`}</span>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
