'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'

export default function Home() {
  const router = useRouter()
  const supabase = createClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#1a1a1a] to-[#2d2d2d] p-4">
      <div className="bg-[#1C1C1C] p-8 rounded-xl shadow-2xl max-w-[400px] w-full">
        <h1 className="text-2xl font-bold text-white mb-4">Protected Home Page</h1>
        <p className="text-gray-300 mb-6">
          You&apos;re signed in! This content is only visible to authenticated users.
        </p>
        <button
          onClick={handleSignOut}
          className="w-full bg-[#f86767] hover:bg-[#e55757] text-white py-2 px-4 rounded-md transition-colors"
        >
          Sign Out
        </button>
      </div>
    </main>
  )
}
