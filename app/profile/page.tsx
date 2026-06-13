import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { User as UserIcon, Mail } from "lucide-react"
import Image from "next/image"

export default async function ProfilePage() {
  const session = await getServerSession(authOptions)

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl max-w-2xl mx-auto">
        <div className="flex flex-col items-center text-center">
          <div className="w-24 h-24 rounded-full bg-slate-800 border-4 border-slate-700 flex items-center justify-center overflow-hidden mb-6 relative">
            {session?.user?.image ? (
              <Image 
                src={session.user.image} 
                alt="Profile picture" 
                fill
                className="object-cover"
              />
            ) : (
              <UserIcon className="w-12 h-12 text-slate-400" />
            )}
          </div>
          
          <h1 className="text-3xl font-bold text-white mb-2">
            {session?.user?.name || "No Name Provided"}
          </h1>
          
          <div className="flex items-center gap-2 text-slate-400 mb-8 bg-slate-800/50 px-4 py-2 rounded-full">
            <Mail size={16} />
            <span>{session?.user?.email}</span>
          </div>
        </div>

        <div className="space-y-4 border-t border-slate-800 pt-8">
          <h3 className="text-lg font-semibold text-slate-300">Account Information</h3>
          <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-700/30">
            <pre className="text-sm text-slate-400 overflow-auto whitespace-pre-wrap">
              {JSON.stringify(session?.user, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}
