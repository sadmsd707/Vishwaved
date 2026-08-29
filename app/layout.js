import './globals.css'

export const metadata = {
  title: 'VishwaVed Science Academy — Excellence in Education & Online Testing',
  description: 'Premier educational academy offering dedicated coaching for IIT-JEE, NEET, MHT-CET, and Foundation with smart online testing.',
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
  openGraph: {
    title: 'VishwaVed Science Academy',
    description: 'Empowering students with expert faculty, modern labs, and smart online assessments in Baramati.',
    siteName: 'VishwaVed Science Academy',
    type: 'website',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icon.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}
