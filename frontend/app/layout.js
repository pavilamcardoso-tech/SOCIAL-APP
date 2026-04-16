import './globals.css'
import Header from '../components/Header'

export const metadata = { title: 'Social App', description: 'Feed com imagens e likes' }
export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <Header />
        {children}
      </body>
    </html>
  )
}
