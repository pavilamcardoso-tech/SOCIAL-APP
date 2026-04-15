import PostCard from '../components/PostCard'
import PostForm from '../components/PostForm'
import { getPosts } from '../lib/api'
export default async function Home() {
  const posts = await getPosts()
  return <main className="container"><h1>Social App</h1><PostForm />{posts.map((post) => <PostCard key={post.id} post={post} />)}</main>
}
