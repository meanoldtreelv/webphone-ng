import { useEffect, useState } from "react";
import axios from "axios"; // You may need to install axios using `npm install axios`
import BaseLayout from "layouts/BaseLayout";
import styles from "./Clio.module.scss";
import { CLIO_BASE_URL, clioClientId, clioClientSecret } from "config/app.config";
import { getClioCallBackUrl } from "config/env.config";
import { getCookie, removeCookie, setCookie } from "typescript-cookie";
import { clioConstants } from "constants/clioConstants";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { isClioLoggedIn } from "redux/clio/clioSelectors";
import { Link } from "react-router-dom";

import { ClipLoader } from "react-spinners";
import { setIsClioLoggedIn } from "redux/clio/clioSlice";

const Clio = () => {
	const clioLoggedIn = useSelector(isClioLoggedIn);
	const dispatch = useDispatch();

	const [loading, setLoading] = useState(false);
	const [srvrError, setSrvrError] = useState(false);

	const navigate = useNavigate();
	// Get the current URL
	const currentURL = window.location.href;

	// Create a URL object
	const url = new URL(currentURL);

	// Get the value of the 'code' parameter
	const code = url.searchParams.get("code");

	// Log or use the 'code' value
	// console.log(code); // This will print the 'code' value if present in the URL
	// console.log(getClioCallBackUrl());

	const handleAuthorization = async () => {
		const state = Math.random().toString(36).substring(7); // Generating a random state value

		const params = new URLSearchParams({
			response_type: "code",
			client_id: clioClientId, // Your client ID
			redirect_uri: getClioCallBackUrl(), // Your redirect URI
			redirect_on_decline: true,
		});

		const clioUrl = `https://app.clio.com/oauth/authorize?${params.toString()}`;

		try {
			// Initiate OAuth flow by redirecting the user to the Clio authorization URL
			window.location.href = clioUrl;
		} catch (error) {
			console.error("Error occurred during authorization:", error);
			// Handle errors here
		}
	};

	const handleToken = async () => {
		try {
			const data = new URLSearchParams({
				client_id: clioClientId,
				client_secret: clioClientSecret,
				grant_type: "authorization_code",
				code: code,
				redirect_uri: getClioCallBackUrl(),
			});

			const response = await axios.post(`${CLIO_BASE_URL}/oauth/token`, data, {
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
			});

			console.log(response.data); // Handle the response data here
			setCookie(clioConstants.clioAccessToken, response?.data?.access_token);
			setCookie(clioConstants.clioRefreshToken, response?.data?.refresh_token);
			navigate("/dashboard");
		} catch (error) {
			console.error("Error:", error);
		}
	};

	useEffect(() => {
		// Call the function to make the POST request
		if (code) {
			handleToken();
		}
	}, [code]);

	const deAuthorizeHandler = async () => {
		setLoading(true);
		setSrvrError(false);
		const token = getCookie(clioConstants.clioAccessToken);

		try {
			const data = new URLSearchParams({
				token: token,
			});

			const response = await axios.post(`${CLIO_BASE_URL}/oauth/deauthorize`, data, {
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/x-www-form-urlencoded",
				},
			});

			console.log(response); // Handle the response data here
			setSrvrError(false);
			removeCookie(clioConstants.clioAccessToken, response?.data?.access_token);
			removeCookie(clioConstants.clioRefreshToken, response?.data?.refresh_token);
			dispatch(setIsClioLoggedIn(false));
			setLoading(false);
		} catch (error) {
			console.error("Error:", error);
			setSrvrError(true);
			setLoading(false);
		}
	};

	return (
		<div className={styles.clio}>
			<BaseLayout>
				{!clioLoggedIn ? (
					<div className={styles.button}>
						<button onClick={handleAuthorization}>Authorize with Clio</button>
					</div>
				) : (
					<div className={styles.text}>
						You are currently Logged-In on Clio, Please go to <Link to={"/dashboard"}>Dashboard</Link> to see more...!!!
						<br />
						or
						<br />
						you want to log out ?{" "}
						<span onClick={deAuthorizeHandler}>
							Click here {loading && <ClipLoader color="var(--default-primary)" size={14} />}
						</span>
						<br />
						<br />
						{srvrError && (
							<p className={styles.error}>Something went wrong, please refresh the page or try again later...!!!</p>
						)}
					</div>
				)}
			</BaseLayout>
			{/* <CallConnectorWidget /> */}
		</div>
	);
};

export default Clio;
