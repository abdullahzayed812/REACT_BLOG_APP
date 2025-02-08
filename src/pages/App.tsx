import { Route, Routes } from "react-router-dom";
import { Header } from "../components/Header";
import { NavigationBar } from "../components/NavigationBar";
import { Footer } from "../components/Footer";
import { Home } from "./Home";
import { NewPost } from "./NewPost";
import { About } from "./About";
import { EditPost } from "./EditPost";
import { PostDetails } from "./PostDetails";
import { Missing } from "./Missing";
import { DataProvider } from "../context/DataContext";

export interface PostType {
  id: number;
  title: string;
  datetime: string;
  body: string;
}

function App() {
  return (
    <div className="App">
      <DataProvider>
        <Header />
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/newPost" element={<NewPost />} />

          <Route path="/edit/:id" element={<EditPost />} />

          <Route path="/post/:id" element={<PostDetails />} />

          <Route path="/about" element={<About />} />

          <Route path="*" element={<Missing />} />
        </Routes>
        <Footer />
      </DataProvider>
    </div>
  );
}

export default App;
