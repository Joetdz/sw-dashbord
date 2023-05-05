import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { IconCheck, IconX } from "@tabler/icons-react";
import { Notification } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";
import { useNetwork } from "@mantine/hooks";
import LoginPage from "./pages/login";
import HomePage from "./pages/home";
import CarsPage from "./pages/cars";
import TripsPage from "./pages/trips";
import PassengersPage from "./pages/passengers";
import DriversPage from "./pages/drivers";
import ServicesPage from "./pages/services";
import SettingsPage from "./pages/settings";
import SingleCarPage from "./pages/singleCar";
import "./App.css";

function App() {
  const token = localStorage.getItem("gari");

  const networkStatus = useNetwork();

  return (
    <>
      {networkStatus.online ? (
        <Notification
          icon={<IconCheck size="1.1rem" />}
          color="teal"
          title="Status"
          sx={{ position: "absolute", top: "2%", right: "2%", zIndex: 9999 }}
          withCloseButton={true}
          closeButtonProps={{ "aria-label": "Hide notification" }}>
          Vous êtes connectés
        </Notification>
      ) : (
        <Notification icon={<IconAlertCircle size="1.1rem" />} color="red">
          Vous êtes hors ligne
        </Notification>
      )}
      <Routes>
        <Route index path="/" element={token ? <HomePage /> : <LoginPage />} />
        <Route path="/cars" element={<CarsPage />} />
        <Route path="/cars/:id" element={<SingleCarPage />} />
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
