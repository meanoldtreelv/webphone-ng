import React, { useEffect } from "react";
import axios from "axios"; // You may need to install axios using `npm install axios`
import BaseLayout from "layouts/BaseLayout";
import styles from "./Clio.module.scss";

const Clio = () => {
	// Get the current URL
	const currentURL = window.location.href;

	// Create a URL object
	const url = new URL(currentURL);

	// Get the value of the 'code' parameter
	const code = url.searchParams.get("code");

	// Log or use the 'code' value
	console.log(code); // This will print the 'code' value if present in the URL

	const handleAuthorization = async () => {
		const state = Math.random().toString(36).substring(7); // Generating a random state value

		const params = new URLSearchParams({
			response_type: "code",
			client_id: "jYlHcnubtdNSKp54GSYFZydDRpdOWwfLhxd9UcGV", // Your client ID
			redirect_uri: "http://127.0.0.1:3000/clio", // Your redirect URI
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
				client_id: "jYlHcnubtdNSKp54GSYFZydDRpdOWwfLhxd9UcGV",
				client_secret: "1B8RmcDzBKVKV2QKw1fJsTmVQQ9jYbhy3biNzCGp",
				grant_type: "authorization_code",
				code: code,
				redirect_uri: "http://127.0.0.1:3000/clio",
			});

			const response = await axios.post("https://app.clio.com/oauth/token", data, {
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
			});

			console.log(response.data); // Handle the response data here
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
					<div>
						<button onClick={handleAuthorization}>Authorize with Clio</button>
					</div>
				)}
			</BaseLayout>
			{/* <CallConnectorWidget /> */}
		</div>
	);
};

export default Clio;
