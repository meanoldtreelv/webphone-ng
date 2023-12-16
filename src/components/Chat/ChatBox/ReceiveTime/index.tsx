import { recentDateFormat } from "helpers/formatDateTime";
import styles from "./ReceiveTime.module.scss";

const ReceiveTime = ({ time }) => {
	return (
		<div className={styles.receiveTime}>
			<span> {recentDateFormat(time)}</span>
		</div>
	);
};

export default ReceiveTime;
