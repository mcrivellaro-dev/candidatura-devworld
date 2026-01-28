import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { fetchPostDetails } from "../api/post";
import { fetchUsers } from "../api/user";
import type { User } from "../interfaces/user.interface";
import type { Post } from "../interfaces/post.interface";
import { Header } from "../components/Header";
import { ThemeContext } from "../context/theme-context";

export const PostDetails = () => {
  const theme = useContext(ThemeContext);

  let { postId } = useParams();
  const [users, setUsers] = useState<User[]>([]);
  const [post, setPost] = useState<Post | null>(null)
  const navigate = useNavigate();

  const getUser = (id: number) => {
    const user: User | undefined = users.find((user: User) => user.id === id)
    if (user) {
      return user.name
    }
    return ''
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

  useEffect(() => {
    fetchUsers().then(users => {
      setUsers(users)
      if (postId) {
        fetchPostDetails(postId).then((post: Post) => {
          setPost(post)
        })
      }
    });
  }, []);

  return (
    <>
      <Header title="Dettaglio Post" />

      <div className="flex justify-center p-2">
        <div className='w-[60%] border rounded-xl p-2 mb-4'>
          {post && <>
            <p className='text-left text-[0.75rem]'>Post pubblicato da: {getUser(post.userId)} alias
              <Link to={`/user/${post.userId}`}><span className={`${theme?.textPrimaryColor ?? "text-red-600"} cursor-pointer`}> {getUserName(post.userId)}</span></Link></p>
            <p className="text-[2rem] text-left leading-none mb-1.5">{post.title}</p>
            <p className='text-[1rem] text-left'>{post.body}</p>
            <div className='flex justify-end mt-4'>
              <button onClick={() => navigate('/')}>Torna alla lista</button>
            </div>
          </>}
        </div>
      </div>
    </>

  )
}