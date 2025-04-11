'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { createBrowserClient } from '@supabase/ssr'
import type { Database } from '@/types/database'

type Package = Database['public']['Tables']['packages']['Row']

export default function Home() {
  const [packages, setPackages] = useState<Package[]>([])

  const supabase = createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    const fetchPackages = async () => {
      const { data, error } = await supabase.from('packages').select('*')
      if (error) {
        console.error('Error fetching packages:', error)
      } else {
        setPackages(data)
      }
    }

    fetchPackages()
  }, [])

  return (
    <main className="min-h-screen bg-gray-100 p-4 text-gray-800 dark:bg-gray-900 dark:text-white">
      <h1 className="text-2xl font-bold mb-6">Available Tryout Packages</h1>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {packages.map((pkg) => (
          <div key={pkg.id} className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-md">
            <h2 className="text-xl font-semibold mb-2">{pkg.name}</h2>
            <p className="mb-2 text-sm text-gray-600 dark:text-gray-300">{pkg.description}</p>
            <p className="text-lg font-bold mb-4">Rp {pkg.price.toLocaleString()}</p>
            <Link href={`/checkout/${pkg.id}`}>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition">
                Order
              </button>
            </Link>
          </div>
        ))}
      </div>
    </main>
  )
}
