export async function getPosts() {
  const res = await fetch('http://localhost:8080/api/posts', { cache: 'no-store' })
  if (!res.ok) throw new Error('Erro ao buscar posts')
  return res.json()
}
export async function createPost(data) {
  const res = await fetch('http://localhost:8080/api/posts', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
  if (!res.ok) throw new Error('Erro ao criar post')
  return res.json()
}
export async function likePost(postId, userId) {
  const res = await fetch(`http://localhost:8080/api/posts/${postId}/like?userId=${userId}`, { method: 'POST' })
  if (!res.ok) throw new Error('Erro ao curtir post')
  return res.json()
}
