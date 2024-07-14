import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/App";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import { Home } from "./pages/Home";
import { NewPost } from "./pages/NewPost";
import { About } from "./pages/About";
import "./index.css";
import { Missing } from "./pages/Missing";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="/post" element={<NewPost />} />
      <Route path="/about" element={<About />} />
      <Route path="*" element={<Missing />} />
    </Route>
  )
);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
