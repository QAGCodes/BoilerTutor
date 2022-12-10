import './App.css';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Signup from "./pages/signup"
import Login from "./pages/login"
import Allusers from "./pages/allusers"
import Test from "./pages/test"
import Navbar from "./pages/navbar"

// Student's pages
import HomeStudent from "./pages/student/homeStudent"
import PastSessionsStudent from "./pages/student/pastSessionsStudent"
import SessionSelectionStudent from "./pages/student/sessionSelectionStudent"
import SubjectSelectionStudent from "./pages/student/subjectSelectionStudent"

// Tutors's pages
import EditAvailability from './pages/tutor/editAvailability';
import AddNew from './pages/tutor/addNew';
import HomeTutor from './pages/tutor/homeTutor';
import PastSessionsTutor from './pages/tutor/pastSessionsTutor';

function App() {

  const location = useLocation();
  const hideNavbar =
    location.pathname === "/" ||
    location.pathname === "/login" ? null : (
      <Navbar></Navbar>
    );

  return (
    <div className = "App">
      {hideNavbar}
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/allusers" element={<Allusers />} />
          <Route path="/test" element={<Test />} />

          {/* Student pages */}
          <Route path="/homeStudent" element={<HomeStudent />} />
          <Route path="/pastSessionsStudent" element={<PastSessionsStudent />} />
          <Route path="/sessionSelectionStudent" element={<SessionSelectionStudent />} />
          <Route path="/subjectSelectionStudent" element={<SubjectSelectionStudent />} />

          {/* Tutor pages */}
          <Route path="/editAvailability" element={<EditAvailability />} />
          <Route path="/addNew" element={<AddNew />} />
          <Route path="/homeTutor" element={<HomeTutor />} />
          <Route path="/pastSessionsTutor" element={<PastSessionsTutor />} />
        </Routes>
      
    </div>
  );
}

export default App;
