// lib/midtrans.ts
import midtransClient from 'midtrans-client';

export const snap = new midtransClient.Snap({
  isProduction: false, // ganti true kalau sudah production
  serverKey: process.env.MIDTRANS_SERVER_KEY || '',
  clientKey: process.env.MIDTRANS_CLIENT_KEY || '',
});
