import { io } from "socket.io-client";
import { React, useEffect, useRef } from "react";
import UserRouter from "./router/UserRouter";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

// const socket = io.connect("http://localhost:8000");
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<UserRouter />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
