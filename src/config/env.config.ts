export const isLocalhost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
export const isDev = window.location.hostname === "webphone.dev.ringplan.com";
const isTesting = window.location.hostname === "webphone.testing.ringplan.com";
const isProd = window.location.hostname === "webphone.ringplan.com";
const isFromSSO = window.localStorage.getItem("fromSSO");
const getLoginUrl = () => {
	// let url = "";
	let url = "https://b2clogin.ringplan.com";
	// if (isDev) {
	//   url = "https://b2clogin.dev.ringplan.com";
	// }

	// use production url on localhost because extension is not working on dev

	if (isProd || isLocalhost || isDev) {
		url = "https://b2clogin.ringplan.com";
	}

	return url;
};

const getGoBackUrl = () => {
	let url = "";
	if (isLocalhost) {
		url = "http://localhost:3000/callback";
	}
	if (isDev) {
		url = "https://webphone.dev.ringplan.com/callback";
	}
	if (isProd) {
		url = "https://webphone.ringplan.com/callback";
	}
	url = window.location.origin + "/callback";
	return url;
};

const getBackendUrl = () => {
	let url = "";

	// if (isDev) {
	//   url = "https://ssp-backend.dev.ringplan.com";
	// }

	// use production url on localhost because extension is not working on dev
	if (isProd || isLocalhost || isDev) {
		url = "https://ssp-backend.ringplan.com";
	}
	url = "https://ssp-backend.ringplan.com";
	return url;
};

const getServerUrl = () => {
	let url = "";

	if (isDev || isLocalhost) {
		url = "m.dev.ringplan.com";
	}
	if (isProd) {
		url = "sip.ringplan.com";
	}
	url = "m.dev.ringplan.com";

	return url;
};

const getStorageServicesUrl = () => {
	let url = "";

	// if (isDev) {
	//   url = "https://ssp-backend.dev.ringplan.com";
	// }

	// use production url on localhost because extension is not working on dev
	if (isProd || isLocalhost || isDev) {
		url = "https://storage-service.ringplan.com";
	}
	url = "https://storage-service.ringplan.com";
	return url;
};

export { getServerUrl, getBackendUrl, getGoBackUrl, getLoginUrl, getStorageServicesUrl };
