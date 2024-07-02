/* eslint-disable no-unused-vars */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/Home/HomePage";
import About from "./pages/About/AboutPage";
import Analyze from "./pages/Analyze/AnalyzePage";
import DashboardLayout from "./components/DashboardLayout";
import Datasets from "./pages/Dashboard/Datasets/Datasets";
import Indices from "./pages/Dashboard/Indices/Indices";
// import Signup from "./pages/Dashboard/Signup";
import AuthRequired from "./components/auth/AuthRequired";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import AnalystRequest from "./pages/Dashboard/AnalystRequest";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="analyze" element={<Analyze />} />
          <Route path="about" element={<About />} />
          <Route path="login" element={<Login />} />
          <Route element={<AuthRequired />}>
            <Route path="dashboard" element={<DashboardLayout />}>
              <Route index element={<Datasets />} />
              <Route path="indices" element={<Indices />} />
              <Route path="analyst-requests" element={<AnalystRequest />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
