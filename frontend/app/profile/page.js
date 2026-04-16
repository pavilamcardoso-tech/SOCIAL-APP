'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import PostForm from '../../components/PostForm'
import PostCard from '../../components/PostCard'
import { getPosts } from '../../lib/api'

export default function Profile() {
  const [user, setUser] = useState(null)
  const router = useRouter()
  const [posts, setPosts] = useState([])
  const [loadingPosts, setLoadingPosts] = useState(false)
  const [postsError, setPostsError] = useState('')

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    } else {
      router.push('/login')
    }
  }, [router])

  useEffect(() => {
    if (!user?.id) return

    let cancelled = false
    setLoadingPosts(true)
    setPostsError('')

    getPosts({ userId: user.id })
      .then((data) => {
        if (cancelled) return
        setPosts(Array.isArray(data) ? data : [])
      })
      .catch(() => {
        if (cancelled) return
        setPostsError('Erro ao carregar seus posts.')
        setPosts([])
      })
      .finally(() => {
        if (cancelled) return
        setLoadingPosts(false)
      })

    return () => {
      cancelled = true
    }
  }, [user?.id])

  if (!user) return <div>Carregando...</div>

  return (
    <main className="container">
      <h1>Perfil</h1>
      <div className="card">
        <div className="card-content">
          <p><strong>Nome:</strong> {user.name ?? user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <h3>Meus Posts</h3>
          <PostForm />
          {postsError && <p style={{ color: 'red' }}>{postsError}</p>}
          {loadingPosts ? (
            <p>Carregando posts...</p>
          ) : posts.length > 0 ? (
            posts.map((post) => <PostCard key={post.id} post={post} />)
          ) : (
            <p>Você ainda não tem publicações.</p>
          )}

        </div>
      </div>
    </main>
  )
}