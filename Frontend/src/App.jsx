/* eslint-disable no-unused-vars */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Analyze from "./pages/Analyze/Analyze";
import DashboardLayout from "./components/DashboardLayout";
import Datasets from "./pages/Dashboard/Datasets/Datasets";
import Indices from "./pages/Dashboard/Indices";
import Signup from "./pages/Dashboard/Signup";
import AuthRequired from "./components/AuthRequired";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="analyze" element={<Analyze />} />
          <Route path="about" element={<About />} />
          <Route path="login" element={<Login />} />
          <Route element={<AuthRequired />}>
            <Route path="dashboard" element={<DashboardLayout />}>
              <Route index element={<Datasets />} />
              <Route path="indices" element={<Indices />} />
              <Route path="signup" element={<Signup />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
