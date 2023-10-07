import XIcon from "components/UI/Icons/X";
import styles from "./NotificationMsg.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { notification } from "redux/common/commonSelectors";
import { useEffect } from "react";
import { setNotification } from "redux/common/commonSlice";

const NotificationMsg = () => {
	const notificationDetails = useSelector(notification);
	const dispatch = useDispatch();

	useEffect(() => {
		const timer = setTimeout(() => {
			dispatch(
				setNotification({
					type: "",
					msg: "",
				}),
			);
		}, 3000);

		return () => {
			clearTimeout(timer);
		};
	});

	return (
		<section className={styles.notification}>
			<div>
				<div className={styles.notification_main}>
					<h3>{notificationDetails.type === "ERROR" ? "Issue Found" : "Success"}</h3>
					<p>{notificationDetails.msg}</p>
				</div>
				<button>
					<XIcon stroke="white" />
				</button>
			</div>
		</section>
	);
};

export default NotificationMsg;
