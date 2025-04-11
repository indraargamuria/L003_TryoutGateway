import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import midtransClient from 'midtrans-client';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: Request) {
    
  const supabase = createRouteHandlerClient({ cookies });
  const body = await req.json();

  const { user_id, package_id, price } = body;

  if (!user_id || !package_id || !price) {
    return NextResponse.json(
      { error: 'Missing required fields' },
      { status: 400 }
    );
  }

  const { data: orders, error: insertError } = await supabase
    .from('orders')
    .insert({
      user_id,
      package_id,
      status: 'pending',
    })
    .select(); // aman, no .single()

  if (insertError || !orders || orders.length === 0) {
    console.error('Insert order failed:', insertError);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }

  const order = orders[0];

  // Midtrans
  const snap = new midtransClient.Snap({
    isProduction: false,
    serverKey: process.env.MIDTRANS_SERVER_KEY!,
  });

  const transaction = await snap.createTransaction({
    transaction_details: {
      order_id: order.id || uuidv4(),
      gross_amount: price,
    },
    credit_card: {
      secure: true,
    },
    customer_details: {
      first_name: 'User',
      email: 'user@example.com',
    },
  });

  return NextResponse.json({ token: transaction.token });
}
