import {
  createContext,
  Dispatch,
  FormEvent,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { useWindowSize } from "../hooks/useWindowSize";
import { PostType } from "../pages/App";
import { useNavigate } from "react-router-dom";
import { useAxios } from "../hooks/useAxios";
import { api } from "../api";

interface DataProviderProps extends PropsWithChildren {}

interface ContextProps {
  width: number | undefined;
  posts: PostType[];
  setPosts: Dispatch<SetStateAction<PostType[]>>;
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  searchResults: PostType[];
  setSearchResults: Dispatch<SetStateAction<PostType[]>>;
  postTitle: string;
  setPostTitle: Dispatch<SetStateAction<string>>;
  postBody: string;
  setPostBody: Dispatch<SetStateAction<string>>;
  editTitle: string;
  setEditTitle: Dispatch<SetStateAction<string>>;
  editBody: string;
  setEditBody: Dispatch<SetStateAction<string>>;
  fetchError: string | null;
  isLoading: boolean;
  handleSubmit: (e: FormEvent) => Promise<void>;
  handleEdit: (id: number | undefined) => Promise<void>;
  handleDelete: (id: number) => Promise<void>;
}

export const DataContext = createContext<ContextProps | undefined>(undefined);

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
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
    <DataContext.Provider
      value={{
        width,
        posts,
        setPosts,
        search,
        setSearch,
        searchResults,
        setSearchResults,
        postTitle,
        setPostTitle,
        postBody,
        setPostBody,
        editTitle,
        setEditTitle,
        editBody,
        setEditBody,
        fetchError,
        isLoading,
        handleDelete,
        handleEdit,
        handleSubmit,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = (): ContextProps => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useDataContext must be used within a DataProvider");
  }
  return context;
};
