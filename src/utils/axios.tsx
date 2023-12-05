// import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
// // import getConfig from "next/config";
// import { generateFormData, isUserAuthenticated, parseCookies, resetUserCookie, setCookie, showToast } from ".";

// // const { publicRuntimeConfig } = getConfig();
// // Import the config object
// import { BASE_URL } from "../config/app.config";

// const instance = axios.create({
// 	baseURL: BASE_URL,
// });

// function handle401() {
// 	return new Promise(async (resolve, reject) => {
// 		try {
// 			let cookies: any = parseCookies();
// 			if (cookies) {
// 				cookies = JSON.parse(cookies.user);
// 				const apiPayload = generateFormData({ refresh: cookies?.refreshToken });
// 				const response: any = await instance.post("refresh-token/", apiPayload);
// 				const data: any = response.data;
// 				const statusCode = data?.status?.code;
// 				if (statusCode === 200) {
// 					const data = { ...cookies, refreshToken: response.data.refresh, accessToken: response.data.access };
// 					setCookie("user", JSON.stringify(data));
// 					resolve(true);
// 				} else {
// 					reject("Session expired.");
// 				}
// 			}
// 			reject("Session Expired.");
// 		} catch (error) {
// 			reject("Session expired.");
// 		}
// 	});
// }

// // instance.interceptors.request.use(
// // 	function (config: AxiosRequestConfig) {
// // 		const cookies: any = parseCookies();

// // 		if (cookies?.user) {
// // 			const user = JSON.parse(cookies.user);
// // 			if (user.accessToken) {
// // 				config.headers["Authorization"] = `Bearer ${user.accessToken}`;
// // 			}
// // 		}

// // 		// Do something before request is sent
// // 		return config;
// // 	},
// // 	function (error: AxiosError) {
// // 		// Do something with request error
// // 		return Promise.reject(error);
// // 	},
// // );

// // instance.interceptors.request.use(
// // 	function (config: AxiosRequestConfig) {
// // 		const cookies: any = parseCookies();

// // 		if (cookies?.user) {
// // 			const user = JSON.parse(cookies.user);
// // 			if (user.accessToken) {
// // 				// Explicitly define the headers object if it's undefined
// // 				config.headers = config.headers || {};
// // 				config.headers["Authorization"] = `Bearer ${user.accessToken}`;
// // 			}
// // 		}

// // 		// Do something before request is sent
// // 		return config;
// // 	},
// // 	function (error: AxiosError) {
// // 		// Do something with request error
// // 		return Promise.reject(error);
// // 	},
// // );

// instance.interceptors.request.use(
// 	function (config) {
// 		const cookies: any = parseCookies();

// 		if (cookies?.user) {
// 			const user = JSON.parse(cookies.user);
// 			if (user.accessToken) {
// 				// Explicitly define the headers object if it's undefined
// 				config.headers = config.headers || {};
// 				config.headers["Authorization"] = `Bearer ${user.accessToken}`;
// 			}
// 		}

// 		// Do something before request is sent
// 		return config;
// 	},
// 	function (error: AxiosError) {
// 		// Do something with request error
// 		return Promise.reject(error);
// 	},
// );

// instance.interceptors.response.use(
// 	async function (response: AxiosResponse) {
// 		// Any status code that lie within the range of 2xx cause this function to trigger
// 		// Do something with response data
// 		const data: any = response.data;
// 		const statusCode = data?.status?.code;

// 		if (statusCode === 200) {
// 			return data;
// 		}

// 		if (statusCode === 401 && isUserAuthenticated()) {
// 			try {
// 				await handle401();
// 				showToast("Session refreshed.", "default", "refreshed");
// 			} catch (error) {
// 				resetUserCookie();
// 				/* Need to reset store or context here & push user to
// 				   signin screen
// 				*/
// 				showToast("Session Expired.Please login again.", "error");
// 				return Promise.reject(error);
// 			}
// 		}
// 	},
// 	function (error: AxiosError) {
// 		return Promise.reject(error);
// 	},
// );

// export { instance };
