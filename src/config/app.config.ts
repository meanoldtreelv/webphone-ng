export const BASE_URL =
	process.env.REACT_APP_IS_PROD === "true"
		? "https://api.example.com"
		: process.env.REACT_APP_IS_STAGING === "true"
		? "https://api-staging.example.com"
		: "https://ssp-backend.ringplan.com";

export const STORAGE_BASE_URL =
	process.env.REACT_APP_IS_PROD === "true"
		? "https://storage-service.ringplan.com"
		: process.env.REACT_APP_IS_STAGING === "true"
		? "https://storage-service.ringplan.com"
		: "https://storage-service.ringplan.com";
