'use client'
import { useState } from 'react'
import { likePost } from '../lib/api'

export default function PostCard({ post }) {
  const [likes, setLikes] = useState(post.likeCount)
  const [comments, setComments] = useState(post.comments || [])
  const [commentText, setCommentText] = useState('')

  async function handleLike() {
    const data = await likePost(post.id, 1)
    setLikes(data.likes)
  }

  function handleCommentSubmit(event) {
    event.preventDefault()
    const trimmed = commentText.trim()
    if (!trimmed) return

    const newComment = {
      id: Date.now(),
      user: 'Você',
      text: trimmed,
    }

    setComments((current) => [...current, newComment])
    setCommentText('')
  }

  return (
    <div className="card">
      <img src={post.imageUrl} alt={post.description} />
      <div className="card-content">
        <strong>@{post.username}</strong>
        <p>{post.description}</p>
        <button className="button" onClick={handleLike}>❤️ {likes}</button>
      </div>
      <div className="comments-section">
        <h3>Comentários</h3>
        {comments.length > 0 ? (
          <div className="comments-list">
            {comments.map((comment) => (
              <div key={comment.id} className="comment">
                <strong>{comment.user}:</strong> {comment.text}
              </div>
            ))}
          </div>
        ) : (
          <p className="comment-empty">Seja o primeiro a comentar!</p>
        )}
        <form className="comment-form" onSubmit={handleCommentSubmit}>
          <input
            className="input"
            type="text"
            placeholder="Escreva um comentário..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <button className="button" type="submit">Comentar</button>
        </form>
      </div>
    </div>
  )
}
