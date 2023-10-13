import React from "react";
import { RouterProvider } from "react-router-dom";
import "./App.scss";
import routes from "./routes/index";
import { useGetAccountQuery } from "./services/system";

const App = () => <RouterProvider router={routes} />;

export default App;
