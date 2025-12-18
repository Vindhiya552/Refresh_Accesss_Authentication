import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./orgedit.css";
import "./home.css";
import "./layout.css";

import "./orglist.css";
import App from "./App.jsx";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )
