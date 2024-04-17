import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./components/Login";
import RankList from "./components/RankList";
import Dashboard from "./components/Dashboard";
import Evaluation from "./components/Evaluation";
import Test from "./components/Test";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/test" element={<Test />} />
        <Route path="/ranklist" element={<RankList />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/evaluation" element={<Evaluation />} />
      </Routes>
    </Router>
  );
};

export default App;
