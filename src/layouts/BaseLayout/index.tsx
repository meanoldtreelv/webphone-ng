import Sidebar from "../../components/shared/Sidebar";
import styles from "./BaseLayout.module.scss";
import ProgressCallPopUpBar from "../../components/Dashboard/ProgressCallPopup";
import NotificationMsg from "components/Notification";
import { useDispatch, useSelector } from "react-redux";
import { notification, sessionOut } from "redux/common/commonSelectors";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { store } from "redux/store";
import BottomNav from "components/shared/BottomNav";
import SuggestPortraitOnMobileModal from "components/SuggestPortraitOnMobileModal";
import InboundCall from "components/shared/InboundCall";
import { ToastContainer } from "react-toastify";
import ModalMessage from "components/shared/ModalMessage";
import { getCookie } from "typescript-cookie";
import { getBackendUrl } from "config/env.config";
import { io } from "socket.io-client";
import { setSocket } from "redux/chat/chatSlice";
import { setSimpleNotification } from "redux/common/commonSlice";
import { socket } from "redux/chat/chatSelectors";
import { showToast } from "utils";

let Socket: any = null;

const BaseLayout = ({ children }: any) => {
	const dispatch = useDispatch();
	const dispNotification = useSelector(notification);
	const { navigatePush, suggestPortraitOnMobileModalShow } = useSelector((state: any) => state.sip);
	const { answeredCalls, ringingOutboundCalls } = useSelector((state: any) => state.sip);
	const sessionValid = useSelector(sessionOut);
	const reudxSocket = useSelector(socket);

	useEffect(() => {
		if (navigatePush !== "") {
			navigate(navigatePush);
			store.dispatch({ type: "sip/navigatePush", payload: "" });
		}
	}, [navigatePush]);

	const navigate = useNavigate();
	const location = useLocation();

	// socket.io
	useEffect(() => {
		const API_KEY = getCookie("id_token");

		if (Socket != null) {
			Socket.disconnect();
			Socket.offAny();
		}

		Socket = io(getBackendUrl(), {
			path: "/ws",
			transports: ["websocket"],
			secure: true,
			autoConnect: false,
			reconnectionDelay: 1500,
		});

		Socket.on("connect", () => {
			Socket.emit("authenticate", { token: API_KEY });
		});

		Socket.on("authenticated", (data) => {
			// console.log("web socket Authentication successful.", data);

			dispatch(setSocket(Socket));
		});

		Socket.connect();

		// Clean-up function to disconnect the socket when component unmounts
		// return () => {
		// 	socket.disconnect();
		// };
	}, []);

	useEffect(() => {
		if (!reudxSocket || !reudxSocket.connected) return;

		reudxSocket.on("texting.message.new", (data) => {
			console.log("texting.message.new", data);
			// Get the current URL
			const currentURL = window.location.href;

			// Check if the URL ends with '/texting'
			const isTextingURL = currentURL.endsWith("/texting");

			if (!isTextingURL) {
				const first_name = data?.contact?.first_name;
				const last_name = data?.contact?.last_name;
				const phone = data?.contact?.number;

				let firstName: string;
				let lastName: string;

				if (first_name === "undefine" || first_name === null) {
					firstName = "";
				} else {
					firstName = first_name;
				}

				if (last_name === "undefine" || last_name === null) {
					lastName = "";
				} else {
					lastName = last_name;
				}
				const name =
					data?.conversation_type === "group" || data?.conversation_type === "campaign"
						? data?.campaign_info?.name
						: firstName + lastName
						? firstName + " " + lastName
						: phone;

				dispatch(setSimpleNotification(`New message from ${name} (${data?.text})`));
				showToast(`New message from ${name} (${data?.text})`, "info");
			}
		});
	}, [reudxSocket]);

	return (
		<div className={`${styles.wrapper}`}>
			<ToastContainer />
			{sessionValid && <ModalMessage />}
			{suggestPortraitOnMobileModalShow && <SuggestPortraitOnMobileModal />}
			{dispNotification.msg.length ? <NotificationMsg /> : null}
			<div className={styles.popUp} id="notification_bar">
				{location.pathname != "/dashboard" && answeredCalls.length + ringingOutboundCalls.length > 0 && (
					<ProgressCallPopUpBar />
				)}
			</div>
			<InboundCall />
			<div>
				<div className={styles.sidebar}>
					<Sidebar />
				</div>

				<div className={styles.bottomNav}>
					<BottomNav />
				</div>

				<div className={styles.children}>{children}</div>
			</div>
		</div>
	);
};

export default BaseLayout;
