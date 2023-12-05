import Sidebar from "../../components/shared/Sidebar";
import styles from "./BaseLayout.module.scss";
import ProgressCallPopUpBar from "../../components/Dashboard/ProgressCallPopup";
import NotificationMsg from "components/Notification";
import { useSelector } from "react-redux";
import { notification, sessionOut } from "redux/common/commonSelectors";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { store } from "redux/store";
import BottomNav from "components/shared/BottomNav";
import { useTheme } from "hooks/useTheme";
import SuggestPortraitOnMobileModal from "components/SuggestPortraitOnMobileModal";
import InboundCall from "components/shared/InboundCall";
import { ToastContainer } from "react-toastify";
import ModalMessage from "components/shared/ModalMessage";

const BaseLayout = ({ children }: any) => {
	const dispNotification = useSelector(notification);
	const { navigatePush, suggestPortraitOnMobileModalShow } = useSelector((state: any) => state.sip);
	const theme = useTheme();
	const { ringingInboundCalls, answeredCalls, ringingOutboundCalls } = useSelector((state: any) => state.sip);
	const sessionValid = useSelector(sessionOut);

	useEffect(() => {
		if (navigatePush !== "") {
			navigate(navigatePush);
			store.dispatch({ type: "sip/navigatePush", payload: "" });
		}
	}, [navigatePush]);

	const navigate = useNavigate();
	const location = useLocation();
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
