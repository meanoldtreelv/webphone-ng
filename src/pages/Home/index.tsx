import SplashScreen from "./../../components/SplashScreen";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import routePaths from "./../../constants/routes";

const Home = () => {
	const navigate = useNavigate();

	useEffect(() => {
		setTimeout(() => {
			navigate(routePaths.AUTH.LOGIN.ROUTE); // Remove the extra parentheses
		}, 2000);
	}, []);

	return <SplashScreen />;
};

export default Home;
