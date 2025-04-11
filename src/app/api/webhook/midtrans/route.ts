import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Init Supabase Admin
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Pakai service role buat write access penuh
)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const { order_id, transaction_status } = body

    if (transaction_status === 'settlement' || transaction_status === 'capture') {
      // Update order status ke "paid"
      const { error } = await supabase
        .from('orders')
        .update({ status: 'paid' })
        .eq('order_id', order_id)

      if (error) {
        console.error('Failed to update status:', error)
        return NextResponse.json({ error: 'DB update error' }, { status: 500 })
      }

      console.log('✅ Order updated:', order_id)
    }

    return NextResponse.json({ received: true }, { status: 200 })
  } catch (err) {
    console.error('Webhook error:', err)
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
