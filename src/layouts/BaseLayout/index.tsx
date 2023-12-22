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

let socket: any = null;

const BaseLayout = ({ children }: any) => {
	const dispatch = useDispatch();
	const dispNotification = useSelector(notification);
	const { navigatePush, suggestPortraitOnMobileModalShow } = useSelector((state: any) => state.sip);
	const { answeredCalls, ringingOutboundCalls } = useSelector((state: any) => state.sip);
	const sessionValid = useSelector(sessionOut);

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

		if (socket != null) {
			socket.disconnect();
			socket.offAny();
		}

		socket = io(getBackendUrl(), {
			path: "/ws",
			transports: ["websocket"],
			secure: true,
			autoConnect: false,
			reconnectionDelay: 1500,
		});

		socket.on("connect", () => {
			socket.emit("authenticate", { token: API_KEY });
		});

		socket.on("authenticated", (data) => {
			// console.log("web socket Authentication successful.", data);

			dispatch(setSocket(socket));
		});

		socket.connect();

		// Clean-up function to disconnect the socket when component unmounts
		// return () => {
		// 	socket.disconnect();
		// };
	}, []);

	return (
		<div className={`${styles.wrapper}`}>
			<ToastContainer />
			{sessionValid && <ModalMessage />}
			{/* {suggestPortraitOnMobileModalShow && <SuggestPortraitOnMobileModal />} */}
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
