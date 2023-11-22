export const BASE_URL =
	process.env.REACT_APP_IS_PROD === "true"
		? "https://api.example.com"
		: process.env.REACT_APP_IS_STAGING === "true"
		? "https://api-staging.example.com"
		: "https://ssp-backend.ringplan.com";

//clio secret code
export const clioClientId = "jYlHcnubtdNSKp54GSYFZydDRpdOWwfLhxd9UcGV";
export const clioClientSecret = "1B8RmcDzBKVKV2QKw1fJsTmVQQ9jYbhy3biNzCGp";
