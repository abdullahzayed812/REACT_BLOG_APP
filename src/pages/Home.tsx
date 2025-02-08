import { Feed } from "../components/Feed";
import { useDataContext } from "../context/DataContext";

export const Home: React.FC = () => {
  const { isLoading, fetchError, posts } = useDataContext();
  return (
    <main className="Home">
      {isLoading ? <p>Loading...</p> : null}
      {!isLoading && fetchError ? <p>{fetchError}</p> : null}
      {!isLoading && !fetchError ? posts.length ? <Feed posts={posts} /> : <p>No posts to display.</p> : null}
    </main>
  );
};
