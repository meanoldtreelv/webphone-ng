import axios from "axios";
import { instance } from "../utils/axios";
import "../utils/endPoints";
import API_ENDPOINTS from "../utils/endPoints";

const authToken =
	"eyJhbGciOiJSUzI1NiIsImtpZCI6ImVHeXkwR1Z0YXZHeFVnX3FMbUdqXzgyODNDWEoyWTdnLW1CdVFSZlNjV0EiLCJ0eXAiOiJKV1QifQ.eyJ2ZXIiOiIxLjAiLCJpc3MiOiJodHRwczovL3JpbmdwbGFuLmIyY2xvZ2luLmNvbS9kZDgzOTc4OS0xYzExLTQ4YWYtYTQxMy1lZTVhOGRjM2I5MTkvdjIuMC8iLCJzdWIiOiJmNmQ3MTVkYy1kNGVmLTQzNTQtOTE3YS0zMjg2MDkyYTMxZjQiLCJhdWQiOiI3MzZjMzdkMy1jYTFjLTQ2NWItOGIzNi01ZWRkMDRkMTI5ZjMiLCJleHAiOjE2OTQ2MjM2ODYsImlhdCI6MTY5NDU5NDg4NiwiYXV0aF90aW1lIjoxNjk0NTk0ODg1LCJnaXZlbl9uYW1lIjoiSGVsbG8iLCJmYW1pbHlfbmFtZSI6IlN0YXJ0eGxhYnMiLCJleHRlbnNpb25fY29tcGFueSI6IlN0YXJ0eGxhYnMiLCJlbWFpbHMiOlsiaGVsbG9Ac3RhcnR4bGFicy5jb20iXSwidGlkIjoiZGQ4Mzk3ODktMWMxMS00OGFmLWE0MTMtZWU1YThkYzNiOTE5IiwiYXRfaGFzaCI6ImtHNGRpcVJCb3NHeV9abjdVQVJURXciLCJuYmYiOjE2OTQ1OTQ4ODZ9.wfhK3INn9jAuKshQHz-wyfBl71t0A77rGJGU7W5LAqi2_gDUceXgAMt8TpiFeMlFg-GRLU7VMJKArlvca-JAG67U7lUb8vrj7bJ1Svzzzuf7jArGCPVFETs4fbLaM8PlpQ14JO6iaxkZH5FqzmKTH7N2TRV3LH3G9uNkF__dftO0G8_TxFD7Gfot-OBkjtL9-kidudTyK4tbfijtc0QbhHV-STyiZHXuUl-Zcqe5sZISFkwviILJqCPvSFyqQN2qKiWwGgNDSNJhTcV_vljxDagZUSznli1uLIsIuXt_HMPIr1DhKB4Ix4Xj7Yvq8qAZj2ejfCKHazC7VcEePbXgNw";

const Headers = {
	headers: {
		Authorization: `${authToken}`,
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
