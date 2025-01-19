import { PostType } from "../pages/App";

export const Post: React.FC<Pick<PostType, "title" | "datetime" | "body">> = ({ title, datetime, body }) => {
  return (
    <article>
      <h3 className="post-title">{title}</h3>
      <p className="post-datetime">{datetime}</p>
      <p className="post-body">{body}</p>
    </article>
  );
};
