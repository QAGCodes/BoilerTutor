import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/signup"
import Allusers from "./pages/allusers"

function App() {
  return (
    <div className = "App">
      <Router>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/allusers" element={<Allusers />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
