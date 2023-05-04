import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginPage from "./pages/login";
import HomePage from "./pages/home";
import CarsPage from "./pages/cars";
import TripsPage from "./pages/trips";
import PassengersPage from "./pages/passengers";
import DriversPage from "./pages/drivers";
import ServicesPage from "./pages/services";
import SettingsPage from "./pages/settings";
import "./App.css";

function App() {
  const token = localStorage.getItem("gari");

  return (
    <>
      <Routes>
        <Route index path="/" element={token ? <HomePage /> : <LoginPage />} />
        <Route path="/cars" element={<CarsPage />} />
        <Route path="/trips" element={<TripsPage />} />
        <Route path="/passengers" element={<PassengersPage />} />
        <Route path="/drivers" element={<DriversPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </>
  );
}

export default App;
