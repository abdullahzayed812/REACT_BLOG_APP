import { Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";

interface NavigationBarProps {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
}

export const NavigationBar: React.FC<NavigationBarProps> = ({ search, setSearch }) => {
  return (
    <nav className="Nav">
      <form className="searchForm">
        <label htmlFor="search">Search Posts</label>
        <input
          id="search"
          type="text"
          placeholder="Search Posts"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
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
