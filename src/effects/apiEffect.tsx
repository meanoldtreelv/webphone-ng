import axios from "axios";
// import { instance } from "../utils/axios";
import "../constants/endPoints";
import { getCookie } from "utils";
import axiosInstance from "config/axios.config";
// import API_ENDPOINTS from "../constants/endPoints";

const authToken =
	"eyJhbGciOiJSUzI1NiIsImtpZCI6ImVHeXkwR1Z0YXZHeFVnX3FMbUdqXzgyODNDWEoyWTdnLW1CdVFSZlNjV0EiLCJ0eXAiOiJKV1QifQ.eyJ2ZXIiOiIxLjAiLCJpc3MiOiJodHRwczovL3JpbmdwbGFuLmIyY2xvZ2luLmNvbS9kZDgzOTc4OS0xYzExLTQ4YWYtYTQxMy1lZTVhOGRjM2I5MTkvdjIuMC8iLCJzdWIiOiIwOGY5MWFlMi05OTI3LTRjYzktYWRlMi0xMWQ4OWU0ZDRlNWUiLCJhdWQiOiI3MzZjMzdkMy1jYTFjLTQ2NWItOGIzNi01ZWRkMDRkMTI5ZjMiLCJleHAiOjE2OTg4NjExMDcsImlhdCI6MTY5ODgzMjMwNywiYXV0aF90aW1lIjoxNjk4ODMyMzA2LCJnaXZlbl9uYW1lIjoiU2hpdmFtIiwiZmFtaWx5X25hbWUiOiJHdXB0YSIsImV4dGVuc2lvbl9jb21wYW55IjoiU3RhcnQgWCBMYWJzIiwiZW1haWxzIjpbImdzaGl2YW1Ac3RhcnR4bGFicy5pbiJdLCJ0aWQiOiJkZDgzOTc4OS0xYzExLTQ4YWYtYTQxMy1lZTVhOGRjM2I5MTkiLCJhdF9oYXNoIjoialZBOGVmVVFueXcyTlM5TDhtNHV3ZyIsIm5iZiI6MTY5ODgzMjMwN30.TZRea_yqgHL00SAv3kQo-_nh5k8E_BljgMSZI_pgVxjPmSXSMhbHGe4o0ovWO2dd6avDmiRjiEg4A-pWeVQft1546oPqk8IH2NORZh_1itUH0Y_rnmfiCvte8AT6zI9fSdSJG4FYk8ZY6kF5wandxbBacSpPSIiMX43_G_4UX-7KFo1uXuPriO_uSk4pZ7Pf5h-K9wf8ztjmlLhhGZXxECZ8uB-uoKV4z7mBGekIKssOchKYfc6SuabO8vucEoRNLYl-Pb2oyPvpTTgCFlA3IL8c4swlFShKmZJGQ6u6DGrQ5lyFnhdFGAJPzzH3isw1n8Og2dts-Gj0bBlEHQJZkw";

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

export const GetGoogleCalendar = (success: Function, error: Function) => {
	axiosInstance
		.get(`/meet/app/calendar/get-auth-url`)
		.then((res) => success?.(res))
		.catch((err) => error?.(err));
};

export const GetOutlookCalendar = (success: Function, error: Function) => {
	axiosInstance
		.get(`/meet/app/outlook/get-auth-url`)
		.then((res) => success?.(res))
		.catch((err) => error?.(err));
};

export const GetCalendar = (success: Function, error: Function) => {
	axiosInstance
		.get(`/meet/app/calendar`)
		.then((res) => success?.(res))
		.catch((err) => error?.(err));
};

export const RevokeGoogleCalendar = (data: Object, success: Function, error: Function) => {
	axiosInstance
		.post(`/meet/google/revoke`, data)
		.then((res) => success?.(res))
		.catch((err) => error?.(err));
};

export const RevokeOutlookCalendar = (data: Object, success: Function, error: Function) => {
	axiosInstance
		.post(`/meet/outlook/revoke`, data)
		.then((res) => success?.(res))
		.catch((err) => error?.(err));
};

export const GetMeetFiles = (id: string, success: Function, error: Function) => {
	axiosInstance
		.get(`/meet/v2/meeting/files/${id}`)
		.then((res) => success?.(res))
		.catch((err) => error?.(err));
};
