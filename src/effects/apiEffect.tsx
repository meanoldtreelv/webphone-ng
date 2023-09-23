import axios from "axios";
import { instance } from "../utils/axios";
import "../constants/endPoints";
import API_ENDPOINTS from "../constants/endPoints";

const authToken =
	"eyJhbGciOiJSUzI1NiIsImtpZCI6ImVHeXkwR1Z0YXZHeFVnX3FMbUdqXzgyODNDWEoyWTdnLW1CdVFSZlNjV0EiLCJ0eXAiOiJKV1QifQ.eyJ2ZXIiOiIxLjAiLCJpc3MiOiJodHRwczovL3JpbmdwbGFuLmIyY2xvZ2luLmNvbS9kZDgzOTc4OS0xYzExLTQ4YWYtYTQxMy1lZTVhOGRjM2I5MTkvdjIuMC8iLCJzdWIiOiJmNmQ3MTVkYy1kNGVmLTQzNTQtOTE3YS0zMjg2MDkyYTMxZjQiLCJhdWQiOiI3MzZjMzdkMy1jYTFjLTQ2NWItOGIzNi01ZWRkMDRkMTI5ZjMiLCJleHAiOjE2OTQ3ODAzMDIsImlhdCI6MTY5NDc1MTUwMiwiYXV0aF90aW1lIjoxNjk0NzUxNTAwLCJnaXZlbl9uYW1lIjoiSGVsbG8iLCJmYW1pbHlfbmFtZSI6IlN0YXJ0eGxhYnMiLCJleHRlbnNpb25fY29tcGFueSI6IlN0YXJ0eGxhYnMiLCJlbWFpbHMiOlsiaGVsbG9Ac3RhcnR4bGFicy5jb20iXSwidGlkIjoiZGQ4Mzk3ODktMWMxMS00OGFmLWE0MTMtZWU1YThkYzNiOTE5IiwiYXRfaGFzaCI6IkxCbFJQU0t4ekotLUNLSFZTdlVMTXciLCJuYmYiOjE2OTQ3NTE1MDJ9.SQAjLLFPn_JW77LyBFTj7kO4kfze9WBDfwFDKEG_aqyaKZnS_faah5lBQ7O_OtkN79kg6cz7XkGTn2veR4qWi3V9bsNPzVu7LTEL-90NDBTKJjprjoVpo-RMc7VfX0y4sExwvHLkwd13OkvFMA4LNI_QbspHuxyvOeuX4J_ZqK344jBef-n68sgYMBMrN5xnfLY759_oqeZpwPVQOHwC-vSKfi9lVY72jnRPavmv8v0cv3w1nUauJKSj8MceskaZWDO6eF_Jd4Q0RJixeqGWk7dCz0C92B2RPNkbpvp0vdQjDwmVtlISn1Pzu6OMgmXzZtRrnqOZQHmJfIuL2UgtGA";

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

// export const extension_API = (userId: String, success: Function, error: Function) => {
// 	instance
// 		.get(`/instances/${userId}/bulks/extensions?filter_by=softphone&by_user=on`, {
// 			headers: {
// 				Authorization: `${authToken}`,
// 			},
// 		})
// 		.then((res) => success?.(res))
// 		.catch((err) => error?.(err));
// };

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
