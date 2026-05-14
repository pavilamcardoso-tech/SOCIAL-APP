'use client'

import { useRouter } from 'next/navigation'

// Wrapper para ações que exigem login: se não houver usuário no localStorage,
// redireciona para /login em vez de executar a ação.
export function getCurrentUser() {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem('user')
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function useRequireAuth() {
  const router = useRouter()
  return (callback) => {
    const user = getCurrentUser()
    if (!user) {
      router.push('/login')
      return null
    }
    return callback(user)
  }
}
