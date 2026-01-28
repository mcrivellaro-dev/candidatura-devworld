import { BrowserRouter, Route, Routes } from "react-router"
import { PostsList } from "./screens/PostsList"
import { UserDetails } from "./screens/UserDetails"
import { PostDetails } from "./screens/PostDetails"
import { ThemeProvider } from "./context/theme-context"

export const App = () => {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PostsList />} />
          <Route path="/user/:userId" element={<UserDetails />} />
          <Route path="/post/:postId" element={<PostDetails />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}