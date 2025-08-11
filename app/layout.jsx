import './globals.css'

export const metadata = {
  title: 'CryptoConverter',
  description: 'Real-time crypto dashboard with charts and converter',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-900 text-white min-h-screen">{children}</body>
    </html>
  )
}