import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import { NavigationBar } from "../components/NavigationBar";
import { Footer } from "../components/Footer";

function App() {
  return (
    <div className="App">
      <Header />
      <NavigationBar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
