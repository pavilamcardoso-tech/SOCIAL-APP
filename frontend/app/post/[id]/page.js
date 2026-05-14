'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import PostCard from '../../../components/PostCard'
import EmptyState from '../../../components/EmptyState'
import { getCurrentUser } from '../../../components/AuthGate'
import { getPostById } from '../../../lib/api'

export default function PostDetail() {
  const params = useParams()
  const id = params?.id
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!id) return
    let cancelled = false
    setLoading(true)
    setError('')
    const me = getCurrentUser()
    getPostById(id, me?.id)
      .then((p) => { if (!cancelled) setPost(p) })
      .catch(() => { if (!cancelled) setError('Post não encontrado.') })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [id])

  if (loading) return <p className="text-sm text-neutral-500">Carregando…</p>
  if (error || !post) {
    return <EmptyState icon="🔍" title="Post não encontrado" description={error} />
  }

  return (
    <main>
      <PostCard post={post} />
    </main>
  )
}
