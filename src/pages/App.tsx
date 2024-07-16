import { Route, Routes } from "react-router-dom";
import { Header } from "../components/Header";
import { NavigationBar } from "../components/NavigationBar";
import { Footer } from "../components/Footer";
import { Home } from "./Home";
import { NewPost } from "./NewPost";
import { About } from "./About";
import { EditPost } from "./EditPost";
import { useAxios } from "../hooks/useAxios";
import { useEffect, useState } from "react";

export interface PostType {
  id: number;
  title: string;
  dateTime: string;
  body: string;
}

function App() {
  const [posts, setPosts] = useState<PostType[]>([]);

  const { data, fetchError, isLoading } = useAxios(
    "http://localhost:3500/posts"
  );

  useEffect(() => {
    setPosts(data);
  }, [data]);

  return (
    <div className="App">
      <Header />
      <NavigationBar />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              posts={posts}
              isLoading={isLoading}
              postsFetchError={fetchError}
            />
          }
        />
        <Route path="/newPost" element={<NewPost />} />
        <Route path="/about" element={<About />} />
        <Route path="/edit:id" element={<EditPost />} />
        <Route path="/post:id" element={<EditPost />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
