import { useContext, useEffect, useState } from "react"
import { fetchPosts } from "../api/post";
import { fetchUsers } from "../api/user";
import { Header } from "../components/Header";
import { PostRow } from "../components/PostRow";
import type { Post } from "../interfaces/post.interface";
import type { User } from "../interfaces/user.interface";
import { ThemeContext } from "../context/theme-context";

export const PostsList = () => {

  const theme = useContext(ThemeContext);
  const [posts, setPosts] = useState<Post[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [selectedUser, setSelectedUser] = useState<number | null>(null)

  useEffect(() => {
    fetchPosts().then(posts => {
      setPosts(posts)
    });

    fetchUsers().then(users => {
      setUsers(users)
    });
  }, [])

  const handleSelectedUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const userId = parseInt(event.target.value)
    if (userId === 0) {
      setSelectedUser(null)
    } else {
      setSelectedUser(userId)
    }
  }

  const handlePrimaryColorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const color = event.target.value
    theme?.setPrimaryColor(color)
    theme?.setTextPrimaryColor(color.replace('bg-', 'text-'))
  }

  return (
    <>
      <Header title="Elenco Post" />
      <div className="flex w-full p-4 justify-between gap-2">
        <div>
          <label htmlFor="users">Scegli utente:</label>
          <select name="users" id="users" className="border rounded ml-1" onChange={handleSelectedUserChange}>
            <option value={0}>Tutti</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>{user.username}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="users">Scegli colore primario:</label>
          <select name="users" id="users" className="border rounded ml-1" onChange={handlePrimaryColorChange}>
            <option value={'bg-red-600'}>Rosso</option>
            <option value={'bg-blue-600'}>Blu</option>
            <option value={'bg-green-600'}>Verde</option>
          </select>
        </div>
      </div>
      <div className='flex flex-wrap p-2'>
        {posts
          .filter((post: Post) => {
            if (selectedUser) {
              return post.userId === selectedUser
            }
            return true
          })
          .map((post: Post) => (
            <PostRow key={post.id} post={post} users={users} />
          ))}
      </div>
    </>

  )
}