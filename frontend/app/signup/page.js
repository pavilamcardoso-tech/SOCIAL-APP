'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { registerUser } from '../../lib/api'

export default function Signup() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const router = useRouter()

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      const user = await registerUser({ username, email, password })
      localStorage.setItem('user', JSON.stringify(user))
      router.push('/')
      router.refresh()
    } catch {
      setError('Erro ao cadastrar. O email pode já estar em uso.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="mx-auto max-w-md">
      <div className="card space-y-4 p-6">
        <header className="space-y-1">
          <h1 className="text-xl font-bold">Criar conta</h1>
          <p className="text-sm text-neutral-500">Leva menos de um minuto.</p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            className="input-field"
            type="text"
            placeholder="Nome de usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            minLength={2}
          />
          <input
            className="input-field"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="input-field"
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={3}
          />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button type="submit" disabled={submitting} className="btn-primary w-full">
            {submitting ? 'Criando…' : 'Cadastrar'}
          </button>
        </form>

        <p className="text-center text-sm text-neutral-500">
          Já tem conta?{' '}
          <Link href="/login" className="font-semibold text-brand-600 hover:underline">Entrar</Link>
        </p>
      </div>
    </main>
  )
}
