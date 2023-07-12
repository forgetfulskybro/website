import './globals.css'
import { Fira_Code } from 'next/font/google'

const Fira = Fira_Code({ subsets: ['latin'] })

export const metadata = {
  title: 'ForGetFulSkybro',
  description: 'Portfolio for ForGetFulSkyBro',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head><link rel="icon" href="/Me.png" sizes="any" /></head>
      <body className={Fira.className}>{children}</body>
    </html>
  )
}
