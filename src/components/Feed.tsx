import { PostType } from "../pages/App";
import { Post } from "./Post";

interface Props {
  posts: PostType[];
}

export const Feed: React.FC<Props> = ({ posts }) => {
  return (
    <>
      {posts.map((post) => (
        <>
          <Post key={post.id} post={post} />
        </>
      ))}
    </>
  );
};
