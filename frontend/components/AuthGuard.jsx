'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AuthGuard({ children }) {
  const router = useRouter()
  const [authorized, setAuthorized] = useState(false)

  useEffect(() => {
    // 1. Busca o que o Java salvou no localStorage
    const user = localStorage.getItem('user')

    if (!user) {
      // 2. Se não tiver nada, manda para o login
      setAuthorized(false)
      router.push('/login')
    } else {
      // 3. Se tiver, libera o acesso
      setAuthorized(true)
    }
  }, [router])

  // Só renderiza os "children" (o conteúdo da página) se estiver autorizado
  return authorized ? <>{children}</> : null
}