// // // src/App.js
// // import React, { useState } from "react";
// // import "./App.css";
// // import Online from "./components/pages/online.jsx"; 


// // function App() {
// //   const [isTab, setIsTab] = useState("tab");

// //   return (
// //     <div className="app">
// //       {/* Navbar */}
// //       <nav className="navbar">
// //         <div className="nav-left">CYBOGLABS.LEGAL</div>
// //         <div className="nav-right">
// //           <a href="#info">Info</a>
// //           <a href="#help">Help</a>
// //           <a href="#dark">Dark Mode</a>
// //         </div>
// //       </nav>

// //       {/* Conditional Rendering */}
// //       {isTab === "online" ? (
// //         <Online />
// //       ) : (
// //         <main className="container">
// //           <div className="card" style={{ opacity: 0.8 }} onClick={() => setIsTab("online")}>
// //             <img
// //               src="https://img.icons8.com/ios-glyphs/64/communication.png"
// //               alt="Document"
// //             />
// //             <h2>Online NDA</h2>
// //           </div>
// //           <Card title="Offline NDA" />
// //           <Card title="Corporate" />
// //           <div className="card" style={{ opacity: 0.5 }}>
// //             <img
// //               src="https://img.icons8.com/communication.png"
// //               alt="Document"
// //             />
// //             <h2>Independent Contractor Agreement</h2>
// //           </div>
// //           <div className="card" style={{ opacity: 0.5 }}>
// //             <img
// //               src="https://img.icons8.com/ios-glyphs/64/communication.png"
// //               alt="Document"
// //             />
// //             <h2>Service Contract Agreement</h2>
// //           </div>
// //           <div className="card" style={{ opacity: 0.5 }}>
// //             <img
// //               src="https://img.icons8.com/ios-glyphs/64/communication.png"
// //               alt="Document"
// //             />
// //             <h2>Rise Token Creation</h2>
// //           </div>
// //         </main>
// //       )}

// //       {/* Footer */}
// //       <footer className="footer">
// //         <span>www.cyboglabs.com</span>
// //         <span>support@cyboglabs.com</span>
// //       </footer>
// //     </div>
// //   );
// // }


// // // Card component
// // function Card({ title }) {
// //   return (
// //     <div className="card">
// //       <img
// //         src="https://img.icons8.com/ios-glyphs/64/communication.png"
// //         alt="Document"
// //       />
// //       <h2>{title}</h2>
// //     </div>
// //   );
// // }

// // export default App;
// import React, { useState } from "react";
// import "./App.css";
// import Online from "./components/pages/online.jsx";

// function App() {
//   const [isTab, setIsTab] = useState("tab");
//   const [isDark, setIsDark] = useState(false); // <== NEW: dark mode state

//   return (
//     <div className={`app ${isDark ? "dark" : "light"}`}>
//       {/* Navbar */}
//       <nav className="navbar">
//         <div className="nav-left">CYBOGLABS.LEGAL</div>
//         <div className="nav-right">
//           <a href="#info">Info</a>
//           <a href="#help">Help</a>
//           <button className="toggle-button" onClick={() => setIsDark(!isDark)}>
//             {isDark ? "Light" : "Dark "}
//           </button>
//         </div>
//       </nav>

//       {/* Conditional Rendering */}
//       {isTab === "online" ? (
//         <Online />
//       ) : (
//         <main className="container">
//           <div className="card" style={{ opacity: 0.8 }} onClick={() => setIsTab("online")}>
//             <img
//               src="https://img.icons8.com/ios-glyphs/64/communication.png"
//               alt="Document"
//             />
//             <h2>Online NDA</h2>
//           </div>
//           <Card title="Offline NDA" />
//           <Card title="Corporate" />
//           <div className="card" style={{ opacity: 0.5 }}>
//             <img
//               src="https://img.icons8.com/communication.png"
//               alt="Document"
//             />
//             <h2>Independent Contractor Agreement</h2>
//           </div>
//           <div className="card" style={{ opacity: 0.5 }}>
//             <img
//               src="https://img.icons8.com/ios-glyphs/64/communication.png"
//               alt="Document"
//             />
//             <h2>Service Contract Agreement</h2>
//           </div>
//           <div className="card" style={{ opacity: 0.5 }}>
//             <img
//               src="https://img.icons8.com/ios-glyphs/64/communication.png"
//               alt="Document"
//             />
//             <h2>Rise Token Creation</h2>
//           </div>
//         </main>
//       )}

//       {/* Footer */}
//       <footer className="footer">
//         <span>www.cyboglabs.com</span>
//         <span>support@cyboglabs.com</span>
//       </footer>
//     </div>
//   );
// }

// // Card component
// function Card({ title }) {
//   return (
//     <div className="card">
//       <img
//         src="https://img.icons8.com/ios-glyphs/64/communication.png"
//         alt="Document"
//       />
//       <h2>{title}</h2>
//     </div>
//   );
// }

// export default App;


import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import "./App.css";
import Online from "./components/pages/online.jsx";
import Info from "./components/pages/info.jsx";
import Help from "./components/pages/help.jsx";

function App() {
  return (
    <Router>
      <Main />
    </Router>
  );
}

function Main() {
  const [isDark, setIsDark] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();


  const handleBack = () => {
    navigate("/"); // Go to the previous page
  };

  const currentPath = location.pathname;

  useEffect(() => {
    // Persist current route
    localStorage.setItem("lastPage", currentPath);
  }, [currentPath]);

  useEffect(() => {
    // Redirect to last visited page on first load
    const last = localStorage.getItem("lastPage");
    if (last && last !== currentPath) {
      navigate(last);
    }
  }, []);

  return (
    <div className={`app ${isDark ? "dark" : "light"}`}>
      <nav className="navbar">
        <div className="nav-left" onClick={handleBack}>CYBOGLABS.LEGAL</div>
        <div className="nav-right">
          <a href="/info">Info</a>
          <a href="/help">Help</a>
          <button className="toggle-button" onClick={() => setIsDark(!isDark)}>
            {isDark ? "Light" : "Dark"}
          </button>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/online" element={<Online />} />
        <Route path="/info" element={<Info />} />
        <Route path="/help" element={<Help />} />
      </Routes>

      <footer className="footer">
        <span>www.cyboglabs.com</span>
        <span>support@cyboglabs.com</span>
      </footer>
    </div>
  );
}

function Home() {
  const navigate = useNavigate();
  return (
    <main className="container">
        <div className="contain">
      <div className="card" style={{ opacity: 0.8 }} onClick={() => navigate("/online")}>
        <img src="https://img.icons8.com/ios-glyphs/64/communication.png" alt="Document" />
        <h2>Online NDA</h2>
      </div>
      <Card title="Offline NDA" />
      <Card title="Corporate" />
      <Card title="Independent Contractor Agreement" />
      <Card title="Service Contract Agreement" />
      <Card title="Rise Token Creation" />
      </div>
    </main>
  );
}

function Card({ title }) {
  return (
    <div className="card" style={{ opacity: 0.5 }}>
      <img src="https://img.icons8.com/ios-glyphs/64/communication.png" alt="Document" />
      <h2>{title}</h2>
    </div>
  );
}

export default App;
