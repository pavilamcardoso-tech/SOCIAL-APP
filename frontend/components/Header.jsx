'use client'
import { useRouter } from 'next/navigation'

export default function Header() {
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem('user')
    router.push('/login')
  }

  return (
    <header style={{ background: '#e91e63', color: 'white', padding: '10px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <h2>Social App</h2>
      <nav>
        <button onClick={() => router.push('/feed')} style={{ margin: '0 10px', background: 'transparent', color: 'white', border: 'none', cursor: 'pointer' }}>Feed</button>
        <button onClick={() => router.push('/profile')} style={{ margin: '0 10px', background: 'transparent', color: 'white', border: 'none', cursor: 'pointer' }}>Perfil</button>
        <button onClick={handleLogout} style={{ margin: '0 10px', background: 'transparent', color: 'white', border: 'none', cursor: 'pointer' }}>Sair</button>
      </nav>
    </header>
  )
}