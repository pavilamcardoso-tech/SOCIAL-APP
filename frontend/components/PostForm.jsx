'use client'
import { useState } from 'react'
import { createPost } from '../lib/api'
export default function PostForm() {
  const [imageUrl, setImageUrl] = useState('')
  const [description, setDescription] = useState('')
  async function handleSubmit(e) { e.preventDefault(); await createPost({ userId: 1, imageUrl, description }); window.location.reload() }
  return <form className="form" onSubmit={handleSubmit}><h2>Novo post</h2><input className="input" placeholder="URL da imagem" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} /><textarea className="textarea" placeholder="Descrição" value={description} onChange={(e) => setDescription(e.target.value)} /><button className="button" type="submit">Publicar</button></form>
}
