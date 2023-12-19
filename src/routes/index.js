import React from "react";
import SignIn from "../pages/Signin";
import OTPVerification from "../pages/Otp";
import SongList from "../pages/Songs";
import { Route, Routes } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/verify" element={<OTPVerification />} />
      <Route path="/songs" element={<PrivateRoutes component={SongList} />} />
    </Routes>
  );
};

export default AllRoutes;
