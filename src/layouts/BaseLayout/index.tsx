import Sidebar from "../../components/shared/Sidebar";
import styles from "./BaseLayout.module.scss";
import ProgressCallPopUpBar from "../../components/Dashboard/ProgressCallPopup";
import NotificationMsg from "components/Notification";
import { useSelector } from "react-redux";
import { notification } from "redux/common/commonSelectors";

const BaseLayout = ({ children }: any) => {
	const dispNotification = useSelector(notification);

	return (
		<div className={styles.wrapper}>
			{dispNotification.msg.length ? <NotificationMsg /> : null}
			<div className={styles.popUp} id="notification_bar">
				{/* <ProgressCallPopUpBar /> */}
			</div>
			<div>
				<div className={styles.sidebar}>
					<Sidebar />
				</div>

				<div className={styles.children}>{children}</div>
			</div>
		</div>
	);
};

export default BaseLayout;
