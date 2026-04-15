'use client'
import { useState } from 'react'
import { likePost } from '../lib/api'
export default function PostCard({ post }) {
  const [likes, setLikes] = useState(post.likeCount)
  async function handleLike() { const data = await likePost(post.id, 1); setLikes(data.likes) }
  return <div className="card"><img src={post.imageUrl} alt={post.description} /><div className="card-content"><strong>@{post.username}</strong><p>{post.description}</p><button className="button" onClick={handleLike}>❤️ {likes}</button></div></div>
}
