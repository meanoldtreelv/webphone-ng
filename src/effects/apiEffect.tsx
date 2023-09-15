import axios from "axios";
import { instance } from "../utils/axios";
import "../utils/endPoints";
import API_ENDPOINTS from "../utils/endPoints";

const authToken =
	"eyJhbGciOiJSUzI1NiIsImtpZCI6ImVHeXkwR1Z0YXZHeFVnX3FMbUdqXzgyODNDWEoyWTdnLW1CdVFSZlNjV0EiLCJ0eXAiOiJKV1QifQ.eyJ2ZXIiOiIxLjAiLCJpc3MiOiJodHRwczovL3JpbmdwbGFuLmIyY2xvZ2luLmNvbS9kZDgzOTc4OS0xYzExLTQ4YWYtYTQxMy1lZTVhOGRjM2I5MTkvdjIuMC8iLCJzdWIiOiJmNmQ3MTVkYy1kNGVmLTQzNTQtOTE3YS0zMjg2MDkyYTMxZjQiLCJhdWQiOiI3MzZjMzdkMy1jYTFjLTQ2NWItOGIzNi01ZWRkMDRkMTI5ZjMiLCJleHAiOjE2OTQ3Mjg3ODYsImlhdCI6MTY5NDY5OTk4NiwiYXV0aF90aW1lIjoxNjk0Njk5OTg1LCJnaXZlbl9uYW1lIjoiSGVsbG8iLCJmYW1pbHlfbmFtZSI6IlN0YXJ0eGxhYnMiLCJleHRlbnNpb25fY29tcGFueSI6IlN0YXJ0eGxhYnMiLCJlbWFpbHMiOlsiaGVsbG9Ac3RhcnR4bGFicy5jb20iXSwidGlkIjoiZGQ4Mzk3ODktMWMxMS00OGFmLWE0MTMtZWU1YThkYzNiOTE5IiwiYXRfaGFzaCI6IjlKTnNnZ2VRSFFpcWlWVWlGWV9weVEiLCJuYmYiOjE2OTQ2OTk5ODZ9.cmrKcVy4ESBO0srBVS_LSVNILvV6u7h0VZHna9rOSFJBTLldPj0Aj9576g3PybIznvCtddqELjaUqP0SFCmWdooPMqaMg7sYNPMnqSvfQjWyCNRtJz7j8D1P0xmnUv-iZErywZaFqDK-tE6KTkQoXAS4NhP_DZqogUw0tVCqWJMxJ4sgWXWI0p5-ZICITWoGRHRoCmYV7DhQ7olP-Xm81zHOjwrJYUnPGo5rVsM4rUvFHKFkIMyJ9lxYeZT8YGnd24_cRTHDYHg2jvm1BxqBQfnYNoX9qI5DNakBZEzV5zrc74xiEK3RxivfrKBOb59lWMv26YZSDTknoBh-1vzCuA";

const Headers = {
	headers: {
		Authorization: `${authToken}`,
		"X-User-Id": "60190ce750fe88ed1a544a7a",
		"Content-Type": "application/json",
	},
};
// export const instances_API = (success: Function, error: Function) => {
// 	axios
// 		.get(`https://ssp-backend.ringplan.com/system/instances`, {
// 			headers: {
// 				Authorization: `${authToken}`,
// 			},
// 		})
// 		.then((res) => success?.(res))
// 		.catch((err) => error?.(err));
// };

export const account_API = (success: Function, error: Function) => {
	axios
		.get("https://ssp-backend.ringplan.com/system/account", {
			headers: {
				Authorization: `${authToken}`,
			},
		})
		.then((res) => success?.(res))
		.catch((err) => error?.(err));
};

export const instances_API = (success: Function, error: Function) => {
	instance
		.get(`/system/instances`, {
			headers: {
				Authorization: `${authToken}`,
			},
		})
		.then((res) => success?.(res))
		.catch((err) => error?.(err));
};

// export const instances_API = (success: Function, error: Function) => {
// 	instance
// 		.get(`/system/instances`)
// 		.then((res) => success?.(res))
// 		.catch((err) => error?.(err));
// };

// export const account_API = (success: Function, error: Function) => {
// 	instance
// 		.get("/system/account")
// 		.then((res) => success?.(res))
// 		.catch((err) => error?.(err));
// };

// export const contacts_API = (success: Function, error: Function) => {
// 	instance
// 		.get(`/company/directory/contacts`, {
// 			headers: {
// 				Authorization: `${authToken}`,
// 			},
// 		})
// 		.then((res) => success?.(res))
// 		.catch((err) => error?.(err));
// };

export const extension_API = (userId: String, success: Function, error: Function) => {
	instance
		.get(`/instances/${userId}/bulks/extensions?filter_by=softphone&by_user=on`, {
			headers: {
				Authorization: `${authToken}`,
			},
		})
		.then((res) => success?.(res))
		.catch((err) => error?.(err));
};

export const user_API = (userId: String, success: Function, error: Function) => {
	instance
		.get("/statuses/v2/users?user_id=" + userId, {
			headers: {
				Authorization: `${authToken}`,
			},
		})
		.then((res) => success?.(res))
		.catch((err) => error?.(err));
};

export const callerId_API = (userId: String, success: Function, error: Function) => {
	instance
		.get(`/instances/${userId}/dids/callerids`, {
			headers: {
				Authorization: `${authToken}`,
			},
		})
		.then((res) => success?.(res))
		.catch((err) => error?.(err));
};

// Contact API

export const GET_Contact_List_API = (success: Function, error: Function) => {
	axios
		.get(`https://ssp-backend.ringplan.com/company/directory/contacts`, Headers)
		.then((res) => success?.(res))
		.catch((err) => error?.(err));
};

export const Add_contact_API = (payload: Object, success: Function, error: Function) => {
	axios
		.post(`https://ssp-backend.ringplan.com/company/directory/contacts`, payload, Headers)
		.then((res) => success?.(res))
		.catch((err) => error?.(err));
};
