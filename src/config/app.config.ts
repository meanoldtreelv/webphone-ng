export const BASE_URL =
	process.env.REACT_APP_IS_PROD === "true"
		? "https://api.startxlabs.com"
		: process.env.REACT_APP_IS_STAGING === "true"
		? "https://api-staging.startxlabs.com"
		: "https://ssp-backend.ringplan.com";
