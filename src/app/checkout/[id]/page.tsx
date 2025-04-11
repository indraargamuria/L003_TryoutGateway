import { notFound } from 'next/navigation'
import { createServerClient } from '@/lib/supabase-server'

type Props = {
  params: { id?: string }
}

export default async function CheckoutPage({ params }: Props) {
  const id = params.id
  if (!id) return notFound()

  const supabase = await createServerClient()
  const { data: order, error } = await supabase
    .from('orders')
    .select('*, packages!orders_package_id_fkey(*)')
    .eq('id', id)
    .single()

  if (error || !order) {
    console.error('Error fetching order:', error)
    return notFound()
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Checkout Page</h1>
      <p className="mb-2">Order ID: <strong>{order.id}</strong></p>
      <p className="mb-2">Status: <strong>{order.status}</strong></p>
      <p className="mb-2">Package: <strong>{order.packages?.name}</strong></p>

      {order.status === 'paid' ? (
        <div>
          <p className="font-semibold mt-4">Content:</p>
          <pre className="bg-gray-900 text-white p-4 rounded">{order.packages?.content}</pre>
        </div>
      ) : (
        <p className="mt-4 text-yellow-700 font-semibold">Please complete payment to unlock content.</p>
      )}
    </div>
  )
}
