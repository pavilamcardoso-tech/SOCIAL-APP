'use client'
import { useState, useEffect } from 'react'
import { createPost } from '../lib/api'

export default function PostForm() {
  const [imageUrl, setImageUrl] = useState('')
  const [description, setDescription] = useState('')
  const [user, setUser] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    if (!user?.id) {
      setError('Faça login para publicar um post.')
      return
    }

    try {
      await createPost({ userId: user.id, imageUrl, description })
      window.location.reload()
    } catch {
      setError('Erro ao publicar post')
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>Novo post</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        className="input"
        placeholder="URL da imagem"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <textarea
        className="textarea"
        placeholder="Descrição"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button className="button" type="submit">Publicar</button>
    </form>
  )
}
  