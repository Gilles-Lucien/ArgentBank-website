import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";

import { Nav } from "./components/nav/Nav.jsx";
import { Footer } from "./components/footer/Footer.jsx";
import { Home } from "./pages/Home/index.jsx";
import { Login } from "./pages/Login/index.jsx";
import { User } from "./pages/User/index.jsx";

function App() {
  return (
    <>
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<Login />} />
          <Route path="/user" element={<User />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
