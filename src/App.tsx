import React from "react";
import logo from "./logo.svg";
import "./App.css";
import SplashScreen from "components/SplashScreen";
import LoginScreen from "components/LoginPage/LoginScreen";
import LoginScreen2 from "components/LoginPage/LoginScreen2";
import Sidebar from "components/shared/Sidebar";
import Dashboard from "components/Pages/dashboard";
import Loader from "components/shared/Loader";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "components/Pages/home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<LoginScreen2 />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
      {/* <SplashScreen /> */}
      {/* <LoginScreen /> */}
      {/* <LoginScreen2 /> */}
      {/* <Sidebar /> */}
      {/* <Dashboard /> */}
      {/* <Loader /> */}
      {/* <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div> */}
    </>
  );
}

export default App;
