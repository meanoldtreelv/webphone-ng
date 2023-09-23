import React from "react";
import { RouterProvider } from "react-router-dom";
import "./App.scss";
// import Loader from "./components/UI/Loader";
import routes from "./routes/index";
import { useGetAccountQuery } from "./services/system";

const App = () => <RouterProvider router={routes} />;

export default App;


/* <SplashScreen />
<LoginScreen />
<LoginScreen2 />
<Sidebar />
<Dashboard />
<Loader /> */