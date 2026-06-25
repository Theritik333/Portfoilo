// import { Routes, Route } from "react-router-dom"
// import Navbar from "./components/Navbar"
// import ScheduleBtn from "./components/ScheduleBtn"
// import Home from "./pages/Home"
// import Projects from "./pages/Projects"
// import ProjectDetail from "./pages/ProjectDetail"
// import About from "./pages/About"
// import Contact from "./pages/Contact"
// import ScrollToTop from "./components/ScrollToTop";

// export default function App() {
//   return (
//     <>
//       <Navbar />
//       <ScrollToTop />

//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/projects" element={<Projects />} />
//         <Route path="/projects/:slug" element={<ProjectDetail />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/contact" element={<Contact />} />
//       </Routes>
//       <ScheduleBtn />
//     </>
//   )
// }

import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ScheduleBtn from "./components/ScheduleBtn";
import ScrollToTop from "./components/ScrollToTop";

// Lazy Pages
const Home = lazy(() => import("./pages/Home"));
const Projects = lazy(() => import("./pages/Projects"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-10 h-10 border-2 border-gray-200 border-t-black rounded-full animate-spin" />
    </div>
  );
}

export default function App() {
  return (
    <>
      <Navbar />
      <ScrollToTop />

      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Suspense>

      <ScheduleBtn />
    </>
  );
}