import { Link } from "react-router";
import type { Post } from "../interfaces/post.interface";
import type { User } from "../interfaces/user.interface";
import { useContext, useMemo } from "react";
import { ThemeContext } from "../context/theme-context";

interface Props {
  post: Post;
  users: User[]
}

export const PostRow = ({ post, users }: Props) => {
  const theme = useContext(ThemeContext);

  const getUserInitials = () => {
    if (users.length) {
      const user: User | undefined = users.find((user: User) => user.id === post.userId)
      const splittedName = user?.name.split(' ')
      if (splittedName && splittedName.length >= 2) {
        return splittedName[0].charAt(0) + splittedName[1].charAt(0)
      }
    }
  }


  const getUserName = () => {
    if (users.length) {
      const user: User | undefined = users.find((user: User) => user.id === post.userId)
      if (user) {
        return user.username
      }
      return ''
    }
  }

  // const userInitials = useMemo(() => getUserInitials(), [post.userId, users]);
  // const userName = useMemo(() => getUserName(), [post.userId, users]);

  return (
    <div key={post.id} className='md:w-[48%] w-full'>
      <div className='flex flex-row gap-4 w-full'>
        <div className='flex items-center justify-center pl-1.5 pt-0.5'>
          <Link className={`flex w-12.5 h-12.5 ${theme?.primaryColor ?? ""} rounded-xl justify-center items-center cursor-pointer`} to={`/post/${post.id}`}>
            <div className='text-2xl font-semibold text-white'>{getUserInitials()}</div>
          </Link>
        </div>
        <div className="flex flex-col justify-start">
          <h3 className="text-[2rem] text-left leading-none mb-1.5 line-clamp-1" key={post.id}>{post.title}</h3>
          {/* <p className='text-[1rem] text-left line-clamp-1'>{post.body}</p> */}
          <div className="flex justify-start">
            <p className='text-[0.75rem]'>Pubblicato da: <Link to={`/user/${post.userId}`}>
              {theme?.textPrimaryColor === "text-red-600" && <span className="text-red-600 cursor-pointer">
                {getUserName()}
              </span>}
              {theme?.textPrimaryColor === "text-blue-600" && <span className="text-blue-600 cursor-pointer">
                {getUserName()}
              </span>}
              {theme?.textPrimaryColor === "text-green-600" && <span className="text-green-600 cursor-pointer">
                {getUserName()}
              </span>}
            </Link>
            </p>
          </div>
        </div>
      </div>
      <hr className="h-px my-4 bg-[#eeeeee] border-0"></hr>
    </div>
  )
}