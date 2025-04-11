'use client';

import { useEffect, useState } from 'react';
import { createBrowserSupabaseClient } from '@/lib/supabase-browser';




interface Package {
  id: string;
  name: string;
  description: string;
  price: number;
}

declare global {
  interface Window {
    snap: any;
  }
}

export default function PackagesPage() {
  const [packages, setPackages] = useState<Package[]>([]);

  const supabase = createBrowserSupabaseClient();

  useEffect(() => {
    const fetchPackages = async () => {
      const { data } = await supabase.from('packages').select('*');
      setPackages(data || []);
    };
    fetchPackages();
  }, []);

  const handleOrder = async (pkg: Package) => {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
  
    if (userError || !user) {
      alert('Gagal mendapatkan user!');
      return;
    }
  
    const res = await fetch('/api/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: user.id, // ⬅️ penting!
        package_id: pkg.id,
        price: pkg.price,
      }),
    });
  
    const { token } = await res.json();
  
    if (window.snap) {
      window.snap.pay(token, {
        onSuccess: function () {
          alert('Payment successful!');
        },
        onPending: function () {
          alert('Waiting for payment...');
        },
        onError: function () {
          alert('Payment failed.');
        },
        onClose: function () {
          alert('You closed the popup without finishing the payment');
        },
      });
    }
  };
  
  
  
  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Available Tryout Packages</h1>
      <div className="space-y-4">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className="p-4 border rounded-lg shadow bg-white dark:bg-gray-800"
          >
            <h2 className="text-xl font-semibold">{pkg.name}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">{pkg.description}</p>
            <p className="mt-2 font-bold text-green-600 dark:text-green-400">
              Rp {pkg.price.toLocaleString('id-ID')}
            </p>
            <button
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={() => handleOrder(pkg)}
            >
              Order Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
