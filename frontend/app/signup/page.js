'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { registerUser } from '../../lib/api'

export default function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const user = await registerUser({ name, email, password })
      localStorage.setItem('user', JSON.stringify(user))
      router.push('/feed')
    } catch (err) {
      setError('Erro ao cadastrar')
    }
  }

  return (
    <div className="container">
      <div className="form">
        <h2>Cadastro</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            className="input"
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
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
          <button className="button" type="submit">Cadastrar</button>
        </form>
        <p>Já tem conta? <a href="/login">Entrar</a></p>
      </div>
    </div>
  )
}