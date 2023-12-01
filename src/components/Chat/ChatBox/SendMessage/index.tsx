import styles from "./SendMessage.module.scss";

const SendMessage = ({ text }) => {
	return (
		<div className={styles.sendChat}>
			<span> {text}</span>
		</div>
	);
};

export default SendMessage;
