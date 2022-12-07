import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard"
import Allusers from "./pages/allusers"
import Test from "./pages/test"

function App() {
  return (
    <div className = "App">
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/allusers" element={<Allusers />} />
          <Route path="/test" element={<Test />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
