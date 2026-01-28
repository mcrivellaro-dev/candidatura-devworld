import { useEffect, useState } from "react"
import { fetchPosts } from "../api/post";
import { fetchUsers } from "../api/user";
import { Link } from "react-router";
import type { Post } from "../interfaces/post.interface";
import type { User } from "../interfaces/user.interface";
import { Header } from "../components/Header";

export const PostsList = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)


  useEffect(() => {
    fetchPosts().then(posts => {
      setPosts(posts)
    });

    fetchUsers().then(users => {
      setUsers(users)
    });
  }, [])

  const getUserInitials = (id: number) => {
    if (users.length) {
      const user: User | undefined = users.find((user: User) => user.id === id)
      const splittedName = user?.name.split(' ')
      if (splittedName && splittedName.length >= 2) {
        return splittedName[0].charAt(0) + splittedName[1].charAt(0)
      }
    }
  }

  const getUserName = (id: number) => {
    if (users.length) {
      const user: User | undefined = users.find((user: User) => user.id === id)
      if (user) {
        return user.username
      }
      return ''
    }
  }

  return (
    <>
      {/* {selectedPost && <div className='w-full border rounded-xl p-2 mb-4'>
        <p className='text-left'>Post pubblicato da: {getUser(selectedPost.userId)} alias
          <Link to={`/user/${selectedPost.userId}`}><span className='text-red-600 cursor-pointer'> {getUserName(selectedPost.userId)}</span></Link></p>
        <p className="text-[2rem] text-left leading-none mb-1.5">{selectedPost.title}</p>
        <p className='text-[1rem] text-left line-clamp-2'>{selectedPost.body}</p>
        <div className='flex justify-end mt-4'>
          <button onClick={() => setSelectedPost(null)}>Chiudi</button>
        </div>
      </div>} */}
      <Header title="Elenco Post" />

      <div className='flex flex-wrap p-2'>
        {posts.map((post: Post) => (
          <div key={post.id} className='max-w-[48%]'>
            <div className='flex flex-row gap-2'>
              <div className='flex items-center justify-center pl-1.5'>
                <Link className='flex w-12.5 h-12.5 bg-red-600 rounded-xl justify-center items-center cursor-pointer' to={`/post/${post.id}`}>
                  <div className='text-2xl font-semibold text-white'>{getUserInitials(post.userId)}</div>
                </Link>
              </div>
              <div className="flex flex-col justify-start">
                <h3 className="text-[2rem] text-left leading-none mb-1.5 line-clamp-1" key={post.id}>{post.title}</h3>
                <p className='text-[1rem] text-left line-clamp-2'>{post.body}</p>
                <div className="flex justify-start">
                  <p className='text-[0.75rem]'>Pubblicato da: <Link to={`/user/${post.userId}`}><span className='text-red-600 cursor-pointer'>{getUserName(post.userId)}</span></Link></p>
                </div>
              </div>
            </div>
            {<hr className="h-px my-4 bg-[#eeeeee] border-0"></hr>}
          </div>
        ))}
      </div>
    </>

  )
}