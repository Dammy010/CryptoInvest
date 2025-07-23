import { Routes, Route } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import AboutPage from "../pages/AboutPage";
import DashboardPage from "../pages/DashboardPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
    </Routes>
  );
}