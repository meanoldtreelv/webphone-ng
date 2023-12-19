import { recentDateFormat } from "helpers/formatDateTime";
import styles from "./SendTime.module.scss";

const SendTime = ({ time }) => {
	return (
		<div className={styles.sendTime}>
			<span> {recentDateFormat(time)}</span>
		</div>
	);
};

export default SendTime;
