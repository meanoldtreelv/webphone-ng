export default {
	AUTH: {
		__PATH: "auth",
		LOGIN: {
			__PATH: "login",
			ROUTE: "/auth/login",
		},
	},
	CONTACT: {
		__PATH: "contact",
		ROUTE: "/contact",
	},
	VOICEMAIL: {
		__PATH: "voicemail",
		ROUTE: "/voicemail",
	},
	CONFERENCE: {
		__PATH: "conference",
		ROUTE: "/conference",
		GROUPS: {
			__PATH: "groups",
			ROUTE: "/conference/groups",
		},
		CALL_HISTORY: {
			__PATH: "call-history",
			ROUTE: "/conference/call-history",
		},
	},
	CALL_HISTORY: {
		__PATH: "call-history",
		ROUTE: "/call-history",
	},
	DASHBOARD: {
		__PATH: "dashboard",
		ROUTE: "/dashboard",
	},
	SETTINGS: {
		__PATH: "settings",
		ROUTE: "/settings",
	},
	SIDECAR: {
		__PATH: "sidecar",
		ROUTE: "/sidecar",
	},
	MEET: {
		__PATH: "meet",
		ROUTE: "/meet",
	},
	CALLBACK: {
		__PATH: "callback",
		ROUTE: "/callback",
	},
};
