import { Link } from "react-router-dom";

export const NavigationBar: React.FC = () => {
  return (
    <nav className="NavigationBar">
      <form className="searchForm">
        <label htmlFor="search">Search Posts</label>
        <input id="search" type="text" placeholder="Search Posts" />
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/newPost">New Post</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </form>
    </nav>
  );
};
