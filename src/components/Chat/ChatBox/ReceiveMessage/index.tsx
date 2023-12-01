import styles from "./ReceiveMessage.module.scss";

const ReceiveMessage = ({ text }) => {
	return (
		<div className={styles.receiveChat}>
			<span>{text}</span>
		</div>
	);
};

export default ReceiveMessage;
