import { useEffect } from "react";
import axios from "axios"; // You may need to install axios using `npm install axios`
import BaseLayout from "layouts/BaseLayout";
import styles from "./Clio.module.scss";
import { CLIO_BASE_URL, clioClientId, clioClientSecret } from "config/app.config";
import { getClioCallBackUrl } from "config/env.config";
import { setCookie } from "typescript-cookie";
import { clioConstants } from "constants/clioConstants";
import { useNavigate } from "react-router";

const Clio = () => {
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

	return (
		<div className={styles.clio}>
			<BaseLayout>
				{!code && (
					<div className={styles.button}>
						<button onClick={handleAuthorization}>Authorize with Clio</button>
					</div>
				)}
			</BaseLayout>
			{/* <CallConnectorWidget /> */}
		</div>
	);
};

export default Clio;
