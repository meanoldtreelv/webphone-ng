import styles from "./NoMessages.module.scss";
import iconImg from "./../../../assets/images/img/no_messages.png";
import PlusIcon from "components/UI/Icons/Plus";

const NoMessages = () => {
	return (
		<section className={styles.noMessages}>
			<span>
				<img src={iconImg} alt="" />
			</span>
			<div className={styles.noMessages_boldText}>No Messages</div>
			<div className={styles.noMessages_text}>When you have messages you'll see them here</div>
			<button className={styles.button}>
				<span>
					<PlusIcon />
				</span>
				<span>Start new conversations </span>
			</button>
		</section>
	);
};

export default NoMessages;
