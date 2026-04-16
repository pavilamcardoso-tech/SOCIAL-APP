const API_BASE = 'http://127.0.0.1:8080/api'

export async function getPosts({ userId } = {}) {
  const url =
    userId === undefined || userId === null
      ? `${API_BASE}/posts`
      : `${API_BASE}/posts?userId=${encodeURIComponent(userId)}`

  const res = await fetch(url, { cache: 'no-store' })
  if (!res.ok) throw new Error('Erro ao buscar posts')
  return res.json()
}

export async function createPost(data) {
  const res = await fetch(`${API_BASE}/posts`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
  if (!res.ok) throw new Error('Erro ao criar post')
  return res.json()
}

export async function likePost(postId, userId) {
  const res = await fetch(`${API_BASE}/posts/${postId}/like?userId=${userId}`, { method: 'POST' })
  if (!res.ok) throw new Error('Erro ao curtir post')
  return res.json()
}

export async function registerUser(data) {
  const res = await fetch(`${API_BASE}/auth/register`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
  if (!res.ok) throw new Error('Erro ao registrar usuário')
  return res.json()
}



export async function loginUser(data) {
  const res = await fetch(`${API_BASE}/auth/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
  if (!res.ok) throw new Error('Erro ao fazer login')
  return res.json()
}

export async function getUserPosts(userId) {
  const res = await fetch(`${API_BASE}/posts?userId=${encodeURIComponent(userId)}`, { cache: 'no-store' })
  if (!res.ok) throw new Error('Erro ao buscar posts do usuário')
  return res.json()
}
