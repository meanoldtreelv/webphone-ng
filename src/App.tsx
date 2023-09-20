import React from "react";
import { RouterProvider } from "react-router-dom";
import "./App.scss";
// import Loader from "./components/UI/Loader";
import routes from './routes/index';

const App = () => {
	return (
		<>
			<RouterProvider router={routes} />
			
			{/* <SplashScreen /> */}
			{/* <LoginScreen /> */}
			{/* <LoginScreen2 /> */}
			{/* <Sidebar /> */}
			{/* <Dashboard /> */}
			{/* <Loader /> */}
		</>
	);
}

export default App;
