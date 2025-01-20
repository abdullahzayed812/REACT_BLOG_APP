interface HeaderProps {
  width: number | undefined;
}

export const Header: React.FC<HeaderProps> = ({ width }) => {
  return (
    <header className="Header">
      <h1>React Js Blog</h1>

      {width ? <h2>{width < 768 ? "Mobile" : width < 992 ? "Tablet" : "Desktop"}</h2> : null}
    </header>
  );
};
