import SplashScreen from "components/SplashScreen";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
	const navigate = useNavigate();
	useEffect(() => {
		setTimeout(() => {
			navigate("/login"); // Remove the extra parentheses
		}, 2000);
	}, []);

	return (
		<>
			<SplashScreen />
		</>
	);
};

export default Home;
