import { Route, Routes } from "react-router-dom";
import { Header } from "../components/Header";
import { NavigationBar } from "../components/NavigationBar";
import { Footer } from "../components/Footer";
import { Home } from "./Home";
import { NewPost } from "./NewPost";
import { About } from "./About";
import { EditPost } from "./EditPost";
import { useAxios } from "../hooks/useAxios";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";
import { PostDetails } from "./PostDetails";
import { Missing } from "./Missing";
import { useWindowSize } from "../hooks/useWindowSize";

export interface PostType {
  id: number;
  title: string;
  datetime: string;
  body: string;
}

function App() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<PostType[]>([]);
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");
  const navigate = useNavigate();

  const { width } = useWindowSize();
  const { data, fetchError, isLoading } = useAxios("http://localhost:3500/posts");

  useEffect(() => {
    setPosts(data);
  }, [data]);

  useEffect(() => {
    const filteredResults = posts.filter(
      (post: PostType) =>
        post.body.toLowerCase().includes(search.toLowerCase()) ||
        post.title.toLowerCase().includes(search.toLowerCase())
    );

    setSearchResults(filteredResults.reverse());
  }, [posts, search]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const newPost = { id, title: postTitle, datetime: Date.now().toLocaleString(), body: postBody };
    try {
      const response = await api.post("/posts", newPost);
      const allPosts = [...posts, response.data];
      setPosts(allPosts);
      setPostTitle("");
      setPostBody("");
      navigate("/");
    } catch (err: any) {
      console.log(`Error: ${err.message}`);
    }
  };

  const handleEdit = async (id: number | undefined) => {
    if (!id) return;
    const datetime = new Date().toLocaleDateString();
    const updatedPost = { id, title: editTitle, datetime, body: editBody };
    try {
      const response = await api.put(`/posts/${id}`, updatedPost);
      setPosts(posts.map((post) => (post.id === id ? { ...response.data } : post)));
      setEditTitle("");
      setEditBody("");
      navigate("/");
    } catch (err: any) {
      console.log(`Error: ${err.message}`);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/posts/${id}`);
      const postsList = posts.filter((post) => post.id !== id);
      setPosts(postsList);
      navigate("/");
    } catch (err: any) {
      console.log(`Error: ${err.message}`);
    }
  };

  return (
    <div className="App">
      <Header width={width} />
      <NavigationBar search={search} setSearch={setSearch} />
      <Routes>
        <Route path="/" element={<Home posts={searchResults} isLoading={isLoading} postsFetchError={fetchError} />} />

        <Route
          path="/newPost"
          element={
            <NewPost
              handleSubmit={handleSubmit}
              postTitle={postTitle}
              setPostTitle={setPostTitle}
              postBody={postBody}
              setPostBody={setPostBody}
            />
          }
        />

        <Route
          path="/edit/:id"
          element={
            <EditPost
              posts={posts}
              handleEdit={handleEdit}
              editTitle={editTitle}
              setEditTitle={setEditTitle}
              editBody={editBody}
              setEditBody={setEditBody}
            />
          }
        />

        <Route path="/post/:id" element={<PostDetails posts={posts} handleDelete={handleDelete} />} />

        <Route path="/about" element={<About />} />

        <Route path="*" element={<Missing />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
