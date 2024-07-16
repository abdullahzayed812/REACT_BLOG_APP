import { Feed } from "../components/Feed";
import { PostType } from "./App";

interface Props {
  posts: PostType[];
  isLoading: boolean;
  postsFetchError: string | null;
}

export const Home: React.FC<Props> = ({
  posts,
  isLoading,
  postsFetchError,
}) => {
  return (
    <main className="Home">
      {isLoading ? <p>Loading...</p> : null}
      {!isLoading && postsFetchError ? <p>{postsFetchError}</p> : null}
      {!isLoading && !postsFetchError ? (
        posts.length ? (
          <Feed posts={posts} />
        ) : (
          <p>No posts to display.</p>
        )
      ) : null}
    </main>
  );
};
