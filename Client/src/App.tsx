import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<h1>This is the Home Page</h1>}></Route>
          <Route path="/signin" element={<h1>This is Sign In page</h1>}></Route>
          <Route
            path="/about"
            element={<h1>This is the About Page</h1>}
          ></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
