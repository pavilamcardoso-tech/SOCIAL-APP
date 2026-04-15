'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { loginUser } from '../../lib/api'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const result = await loginUser({ email, password })
      if (result.success) {
        localStorage.setItem('user', JSON.stringify(result.user))
        router.push('/feed')
      } else {
        setError(result.message)
      }
    } catch (err) {
      setError('Erro ao fazer login')
    }
  }

  return (
    <div className="container">
      <div className="form">
        <h2>Login</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            className="input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="input"
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="button" type="submit">Entrar</button>
        </form>
        <p>Não tem conta? <a href="/signup">Cadastrar</a></p>
      </div>
    </div>
  )
}