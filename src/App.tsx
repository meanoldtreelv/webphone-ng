import React from "react";
import logo from "./logo.svg";
import "./App.css";
import SplashScreen from "components/SplashScreen";
import LoginScreen from "components/LoginPage/LoginScreen";
import LoginScreen2 from "components/LoginPage/LoginScreen2";
import Sidebar from "components/shared/Sidebar";

function App() {
  return (
    <>
      {/* <SplashScreen /> */}
      {/* <LoginScreen /> */}
      {/* <LoginScreen2 /> */}
      <Sidebar />
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
