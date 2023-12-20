import { formatDate } from "helpers/formatDateTime";
import styles from "./ReceiveTime.module.scss";

const ReceiveTime = ({ time }) => {
	return (
		<div className={styles.receiveTime}>
			<span> {formatDate(time)}</span>
		</div>
	);
};

export default ReceiveTime;
