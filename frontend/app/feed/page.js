'use client'

import { useEffect, useState } from 'react'
import PostCard from '../../components/PostCard'
import PostForm from '../../components/PostForm'
import { getPosts } from '../../lib/api'
import  AuthGuard from '../../components/AuthGuard'


const ORDER_OPTIONS = [
  { value: 'createdAt:desc', label: 'Mais recentes' },
  { value: 'likes:desc', label: 'Mais curtidos' },
  { value: 'username:asc', label: 'Usuário (A-Z)' },
]

export default function Feed() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [order, setOrder] = useState('createdAt:desc')

  useEffect(() => {
    let cancelled = false
    const [sortBy, direction] = order.split(':')

    setLoading(true)
    setError('')

    getPosts({ sortBy, direction })
      .then((data) => {
        if (cancelled) return
        setPosts(Array.isArray(data) ? data : [])
      })
      .catch(() => {
        if (cancelled) return
        setError('Erro ao carregar o feed.')
        setPosts([])
      })
      .finally(() => {
        if (cancelled) return
        setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [order])

  return (
    <>
      <AuthGuard>
        <main className="container">
          <h1>Feed</h1>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12 }}>
            <label>
              <strong>Ordenar:</strong>{' '}
              <select value={order} onChange={(e) => setOrder(e.target.value)}>
                {ORDER_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <PostForm />
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {loading ? (
            <p>Carregando posts...</p>
          ) : (
            posts.map((post) => <PostCard key={post.id} post={post} />)
          )}
        </main>
      </AuthGuard>
    </>
    
  )
}