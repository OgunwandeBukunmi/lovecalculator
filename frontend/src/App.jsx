import React from "react";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home.jsx";
import Register from "./components/Register.jsx";
import Prank from "./components/Prank.jsx";
import Dashboard from "./components/dashboard.jsx";
import Play from "./components/Play.jsx";
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/play/:pranker" element={<Play />} />
        <Route path="/d/:user" element={<Dashboard />} />
        <Route path="/prank/:pranker" element={<Prank />} />
      </Routes>
    </>
  );
};

export default App;
