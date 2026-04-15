import PostCard from '../../components/PostCard'
import PostForm from '../../components/PostForm'
import Header from '../../components/Header'
import { getPosts } from '../../lib/api'

export default async function Feed() {
  const posts = await getPosts()
  return (
    <>
      <Header />
      <main className="container">
        <h1>Feed</h1>
        <PostForm />
        {posts.map((post) => <PostCard key={post.id} post={post} />)}
      </main>
    </>
  )
}