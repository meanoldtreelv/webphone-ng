import axios from "axios";
// import { instance } from "../utils/axios";
import "../constants/endPoints";
import { getCookie } from "utils";
import axiosInstance from "config/axios.config";
// import API_ENDPOINTS from "../constants/endPoints";

const authToken =
	"eyJhbGciOiJSUzI1NiIsImtpZCI6ImVHeXkwR1Z0YXZHeFVnX3FMbUdqXzgyODNDWEoyWTdnLW1CdVFSZlNjV0EiLCJ0eXAiOiJKV1QifQ.eyJ2ZXIiOiIxLjAiLCJpc3MiOiJodHRwczovL3JpbmdwbGFuLmIyY2xvZ2luLmNvbS9kZDgzOTc4OS0xYzExLTQ4YWYtYTQxMy1lZTVhOGRjM2I5MTkvdjIuMC8iLCJzdWIiOiIwOGY5MWFlMi05OTI3LTRjYzktYWRlMi0xMWQ4OWU0ZDRlNWUiLCJhdWQiOiI3MzZjMzdkMy1jYTFjLTQ2NWItOGIzNi01ZWRkMDRkMTI5ZjMiLCJleHAiOjE2OTg2ODkyMjMsImlhdCI6MTY5ODY2MDQyMywiYXV0aF90aW1lIjoxNjk4NjYwNDIyLCJnaXZlbl9uYW1lIjoiU2hpdmFtIiwiZmFtaWx5X25hbWUiOiJHdXB0YSIsImV4dGVuc2lvbl9jb21wYW55IjoiU3RhcnQgWCBMYWJzIiwiZW1haWxzIjpbImdzaGl2YW1Ac3RhcnR4bGFicy5pbiJdLCJ0aWQiOiJkZDgzOTc4OS0xYzExLTQ4YWYtYTQxMy1lZTVhOGRjM2I5MTkiLCJhdF9oYXNoIjoiV1hEbXVEQU5vQkFoR1Z5MElabXFxQSIsIm5iZiI6MTY5ODY2MDQyM30.gEhJrWUE_fJGYp-wRBTT5D0enkADTstTw_yIAVDO_G7JCE6mZkTmxsY0869P39bNSrwCSa3rusyZZnu2-6_Zv5YccBYT0mgYcot_d1kcEmq2i9W3o6CAfMHMziKmIYBQc_jfKT866t5LcJ5IEUln2t7Y7q4GEEDdhk4brEWn6pLzn0XCslYhyK6GRwLRE4edl2L7c47-ldDdsCT1trTHutSazcBEllDCXyP6_atKX8-NYZ5xIZIp83c0Yz3iEqzfB3z1b9cCAw3k00gsTZ4FDQ0Y6VIGGJG85rOm91hsRBMFQOOrfnaANm_JpowdWdsQGzT2tlfrniaJd5www7pa5g";

const Headers = {
	headers: {
		Authorization: `${authToken}`,
		// "X-User-Id": "60190ce750fe88ed1a544a7a",
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
// 	axios
// 		.get(`https://ssp-backend.ringplan.com/instances/${userId}/bulks/extensions?by_user=on`, {
// 			headers: {
// 				Authorization: `${authToken}`,
// 			},
// 		})
// 		.then((res) => success?.(res))
// 		.catch((err) => error?.(err));
// };

// export const GET_user_extension_API = (cnt_id: String, success: Function, error: Function) => {
// 	axios
// 		.get(`https://ssp-backend.ringplan.com/account/${cnt_id}/extensions`, {
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

export const createMeet = (payload: Object, success: Function, error: Function) => {
	axios
		.post(`https://ssp-backend.ringplan.com/meet/v2/events`, payload, Headers)
		.then((res) => success?.(res))
		.catch((err) => error?.(err));
};

export const editMeet = (event_id: string, payload: Object, success: Function, error: Function) => {
	axios
		.patch(`https://ssp-backend.ringplan.com/meet/v2/events/${event_id}`, payload, Headers)
		.then((res) => success?.(res))
		.catch((err) => error?.(err));
};

export const getMeetList = (dateFrom: string, dateTo: string, success: Function, error: Function) => {
	axios
		.get(`https://ssp-backend.ringplan.com/meet/v2/events?date_from=${dateFrom}&date_to=${dateTo}`, Headers)
		.then((res) => success?.(res))
		.catch((err) => error?.(err));
};

export const deleteMeet = (event_id: string, success: Function, error: Function) => {
	axiosInstance
		.delete(`/meet/v2/events/${event_id}`)
		.then((res) => success?.(res))
		.catch((err) => error?.(err));
};
