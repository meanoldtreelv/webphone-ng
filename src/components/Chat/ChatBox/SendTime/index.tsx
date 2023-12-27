import { formatDate } from "helpers/formatDateTime";
import styles from "./SendTime.module.scss";

const SendTime = ({ time }) => {
	return (
		<div className={styles.sendTime}>
			<span> {formatDate(time)}</span>
		</div>
	);
};

export default SendTime;
