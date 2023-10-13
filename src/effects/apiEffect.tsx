import axios from "axios";
// import { instance } from "../utils/axios";
import "../constants/endPoints";
// import API_ENDPOINTS from "../constants/endPoints";

const authToken =
	"eyJhbGciOiJSUzI1NiIsImtpZCI6ImVHeXkwR1Z0YXZHeFVnX3FMbUdqXzgyODNDWEoyWTdnLW1CdVFSZlNjV0EiLCJ0eXAiOiJKV1QifQ.eyJ2ZXIiOiIxLjAiLCJpc3MiOiJodHRwczovL3JpbmdwbGFuLmIyY2xvZ2luLmNvbS9kZDgzOTc4OS0xYzExLTQ4YWYtYTQxMy1lZTVhOGRjM2I5MTkvdjIuMC8iLCJzdWIiOiJmNmQ3MTVkYy1kNGVmLTQzNTQtOTE3YS0zMjg2MDkyYTMxZjQiLCJhdWQiOiI3MzZjMzdkMy1jYTFjLTQ2NWItOGIzNi01ZWRkMDRkMTI5ZjMiLCJleHAiOjE2OTcxMDQ5NzAsImlhdCI6MTY5NzA3NjE3MCwiYXV0aF90aW1lIjoxNjk2OTE4MTU4LCJnaXZlbl9uYW1lIjoiSGVsbG8iLCJmYW1pbHlfbmFtZSI6IlN0YXJ0eGxhYnMiLCJleHRlbnNpb25fY29tcGFueSI6IlN0YXJ0eGxhYnMiLCJlbWFpbHMiOlsiaGVsbG9Ac3RhcnR4bGFicy5jb20iXSwidGlkIjoiZGQ4Mzk3ODktMWMxMS00OGFmLWE0MTMtZWU1YThkYzNiOTE5IiwiYXRfaGFzaCI6IldhVjRteGE4WFg4bnZRMS13XzFUMlEiLCJuYmYiOjE2OTcwNzYxNzB9.QDBnJPBIy8LMpqnuYIIEvjhzPTMVdR-I889S43BCo_CQhIuBd6u6RRBV2-Y5nopbF1ZQm1bKBz-zNIbUWMYl78TbYxHAJLrWg9NYozj80mr4ATowkHTmjRovp2EC6tTAFr96q55KMDsislPd0XY3BwgHx51MjyQxXXF4iE_IL41-9gqulShERt5INIGPeU9BH8QQVQqA5P3B8kNn1jUCg8rv0ZcY0KKy5QnOF-FsNpodiNvjg88eNFhLjqiu-MDgIkDpSk6WnR_DaEgiRmMM2I7keYVGZ82R19rjRW00yB6f9eES7y8y2Y9q4DKdy984mG8W2x8Br-l1HJeFhaBBUA";

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

// export const account_API = (success: Function, error: Function) => {
// 	axios
// 		.get("https://ssp-backend.ringplan.com/system/account", {
// 			headers: {
// 				Authorization: `${authToken}`,
// 			},
// 		})
// 		.then((res) => success?.(res))
// 		.catch((err) => error?.(err));
// };

// export const instances_API = (success: Function, error: Function) => {
// 	instance
// 		.get(`/system/instances`, {
// 			headers: {
// 				Authorization: `${authToken}`,
// 			},
// 		})
// 		.then((res) => success?.(res))
// 		.catch((err) => error?.(err));
// };

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
	axios
		.get(`https://ssp-backend.ringplan.com/instances/${userId}/bulks/extensions?by_user=on`, {
			headers: {
				Authorization: `${authToken}`,
			},
		})
		.then((res) => success?.(res))
		.catch((err) => error?.(err));
};

export const GET_user_extension_API = (cnt_id: String, success: Function, error: Function) => {
	axios
		.get(`https://ssp-backend.ringplan.com/account/${cnt_id}/extensions`, {
			headers: {
				Authorization: `${authToken}`,
			},
		})
		.then((res) => success?.(res))
		.catch((err) => error?.(err));
};

// export const user_API = (userId: String, success: Function, error: Function) => {
// 	instance
// 		.get("/statuses/v2/users?user_id=" + userId, {
// 			headers: {
// 				Authorization: `${authToken}`,
// 			},
// 		})
// 		.then((res) => success?.(res))
// 		.catch((err) => error?.(err));
// };

// export const callerId_API = (userId: String, success: Function, error: Function) => {
// 	instance
// 		.get(`/instances/${userId}/dids/callerids`, {
// 			headers: {
// 				Authorization: `${authToken}`,
// 			},
// 		})
// 		.then((res) => success?.(res))
// 		.catch((err) => error?.(err));
// };

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

export const GET_Contact_Salutation_API = (success: Function, error: Function) => {
	axios
		.get(`https://ssp-backend.ringplan.com/company/directory/contacts/options`, Headers)
		.then((res) => success?.(res))
		.catch((err) => error?.(err));
};

export const DELETE_Contact_API = (dircnt_id: String, success: Function, error: Function) => {
	axios
		.delete(`https://ssp-backend.ringplan.com/company/directory/contacts/${dircnt_id}`, Headers)
		.then((res) => success?.(res))
		.catch((err) => error?.(err));
};

export const UPDATE_Contact_API = (dircnt_id: String, success: Function, error: Function) => {
	axios
		.put(`https://ssp-backend.ringplan.com/company/directory/contacts/${dircnt_id}`, Headers)
		.then((res) => success?.(res))
		.catch((err) => error?.(err));
};
