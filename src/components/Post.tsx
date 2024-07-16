import { PostType } from "../pages/App";

export const Post: React.FC<Pick<PostType, "title" | "dateTime" | "body">> = ({
  title,
  dateTime,
  body,
}) => {
  return (
    <article>
      <h3>{title}</h3>
      <p>{dateTime}</p>
      <p>{body}</p>
    </article>
  );
};
