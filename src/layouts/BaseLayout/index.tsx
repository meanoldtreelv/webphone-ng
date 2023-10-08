import Sidebar from "../../components/shared/Sidebar";
import styles from "./BaseLayout.module.scss";
import ProgressCallPopUpBar from "../../components/Dashboard/ProgressCallPopup";
import NotificationMsg from "components/Notification";
import { useSelector } from "react-redux";
import { notification } from "redux/common/commonSelectors";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { store } from "redux/store";

const BaseLayout = ({ children }: any) => {
	const dispNotification = useSelector(notification);
	const { navigatePush } = useSelector((state: any) => state.sip)

	useEffect(()=>{
		if(navigatePush !== ""){
			navigate(navigatePush)
			store.dispatch({type:"sip/navigatePush", payload:""});
		}
	}, [navigatePush])
	const navigate = useNavigate();
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
