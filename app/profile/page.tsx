import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { User as UserIcon, Mail } from "lucide-react"
import Image from "next/image"

export default async function ProfilePage() {
  const session = await getServerSession(authOptions)

  return (
    <div className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="glass-panel p-10 rounded-[2.5rem] relative overflow-hidden group bg-white">
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-8 mb-12 border-b border-gray-100 pb-12">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-white border border-gray-200 flex items-center justify-center overflow-hidden relative z-10 p-1 shadow-sm">
                <div className="w-full h-full rounded-full overflow-hidden bg-gray-100 relative">
                  {session?.user?.image ? (
                    <Image 
                      src={session.user.image} 
                      alt="Profile picture" 
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <UserIcon className="w-16 h-16 text-gray-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                  )}
                </div>
              </div>
            </div>
            
            <div className="text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[#4285F4] text-xs font-semibold tracking-widest uppercase mb-3">
                <span className="w-2 h-2 rounded-full bg-[#4285F4] animate-pulse"></span>
                Active Identity
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-3 tracking-tight">
                {session?.user?.name || "Anonymous User"}
              </h1>
              <div className="flex items-center justify-center md:justify-start gap-2 text-gray-600 font-mono text-sm bg-gray-50 px-4 py-2 rounded-xl border border-gray-200 w-fit mx-auto md:mx-0">
                <Mail size={16} className="text-[#4285F4]" />
                <span>{session?.user?.email}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-[#4285F4] rounded-full"></span>
              Payload Data
            </h3>
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 relative group/code shadow-inner">
              <div className="absolute top-4 right-4 text-xs font-mono text-gray-400 group-hover/code:text-[#4285F4] transition-colors">JSON</div>
              <pre className="text-sm font-mono text-gray-700 overflow-auto whitespace-pre-wrap leading-relaxed">
                <span className="text-gray-500">{`{`}</span>
                <br/>
                {Object.entries(session?.user || {}).map(([key, value], i, arr) => (
                  <div key={key} className="pl-4">
                    <span className="text-[#4285F4]">"{key}"</span>
                    <span className="text-gray-400">: </span>
                    <span className="text-[#34A853]">"{value}"</span>
                    {i < arr.length - 1 ? <span className="text-gray-400">,</span> : null}
                  </div>
                ))}
                <span className="text-gray-500">{`}`}</span>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
