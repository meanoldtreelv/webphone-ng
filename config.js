const env = {
	API_URL:
		process.env.REACT_APP_IS_PROD === "true"
			? "https://api.startxlabs.com"
			: process.env.REACT_APP_IS_STAGING === "true"
			? "https://api-staging.startxlabs.com"
			: "https://v4-api.startxlabs.com",
};

export default env;
