import { useDataContext } from "../context/DataContext";

export const Header: React.FC = () => {
  const { width } = useDataContext();

  return (
    <header className="Header">
      <h1>React Js Blog</h1>

      {width ? <h2>{width < 768 ? "Mobile" : width < 992 ? "Tablet" : "Desktop"}</h2> : null}
    </header>
  );
};
