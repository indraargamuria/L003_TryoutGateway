import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tryout SNBT',
  description: 'Aplikasi tryout SNBT by Arga & Thor',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body className="bg-gray-50 text-gray-900 min-h-screen">
        <main className="max-w-4xl mx-auto p-4">
          {children}
        </main>
      </body>
    </html>
  )
}
