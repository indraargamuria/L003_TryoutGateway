'use client';

import { useEffect, useState } from 'react';
import { createBrowserSupabaseClient } from '@/lib/supabase-browser';
import { Database } from '@/types/supabase';

type Order = Database['public']['Tables']['orders']['Row'];
type Package = Database['public']['Tables']['packages']['Row'];

type OrderWithPackage = Order & {
  packages: Package | null;
};

export default function MyOrdersPage() {
  const supabase = createBrowserSupabaseClient();
  const [orders, setOrders] = useState<OrderWithPackage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        setOrders([]);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('orders')
        .select('*, packages(*)')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false });

      if (!error && data) {
        setOrders(data as OrderWithPackage[]);
      }

      setLoading(false);
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <p className="p-4">Loading your orders...</p>;
  }

  if (!orders.length) {
    return <p className="p-4">You have no orders yet.</p>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
      <h1 className="text-xl font-bold">My Orders</h1>
      {orders.map((order) => (
        <div
          key={order.id}
          className="border rounded-xl p-4 shadow bg-white dark:bg-zinc-800"
        >
          <h2 className="text-lg font-semibold">
            {order.packages?.name || 'Unknown Package'}
          </h2>
          <p>
            Status:{' '}
            <span
                className={`font-medium ${
                order.status === 'paid' ? 'text-green-600' : 'text-yellow-500'
                }`}
            >
                {order.status}
            </span>
            </p>
            {order.status === 'paid' ? (
            <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                {order.packages?.description || 'No content available.'}
            </div>
            ) : (
            <p className="mt-2 text-sm italic text-zinc-500">
                Content will be unlocked after payment is confirmed.
            </p>
            )}

        </div>
      ))}
    </div>
  );
}
