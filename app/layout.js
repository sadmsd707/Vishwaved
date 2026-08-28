import './globals.css'

export const metadata = {
  title: 'TestFlow — Online Test Platform',
  description: 'Create, manage, and conduct secure online tests for MCQ and Numerical questions.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
