'use client'

import { useEffect, useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import type { Database } from '@/types/database'

const supabase = createBrowserClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function DashboardPage() {
  const [packages, setPackages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPaidPackages = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser()

      if (userError || !user) return

      const { data, error } = await supabase
        .from('orders')
        .select('package_id, packages(name, description)')
        .eq('user_id', user.id)
        .eq('status', 'paid')

      if (error) {
        console.error(error)
        return
      }

      const mapped = data.map((order) => order.packages)
      setPackages(mapped)
      setLoading(false)
    }

    fetchPaidPackages()
  }, [])

  if (loading) return <p className="text-center mt-10">Loading...</p>

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Your Tryout Packages</h1>
      {packages.length === 0 ? (
        <p>No packages purchased yet.</p>
      ) : (
        <ul className="space-y-4">
          {packages.map((pkg, idx) => (
            <li key={idx} className="p-4 border rounded-xl bg-white shadow-md">
              <h2 className="text-lg font-semibold">{pkg.name}</h2>
              <p className="text-gray-600">{pkg.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
