'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Profile() {
  const [user, setUser] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    } else {
      router.push('/login')
    }
  }, [router])

  if (!user) return <div>Carregando...</div>

  return (
    <main className="container">
      <h1>Perfil</h1>
      <div className="card">
        <div className="card-content">
          <p><strong>Nome:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      </div>
    </main>
  )
}