import { get } from 'http'
import PostCard from '../../components/PostCard'
import PostForm from '../../components/PostForm'
import { getPosts } from '../../lib/api'
import  Header from '../../components/Header'
import  AuthGuard from '../../components/AuthGuard'


export default async function Feed() {
  const posts = await getPosts()
  
 

 
  return (
    <>
      <AuthGuard>
        <main className="container">
          <h1>Feed</h1>
          <PostForm />
          {posts.map((post) => <PostCard key={post.id} post={post} />)}
        </main>
      </AuthGuard>
    </>
    
  )
}