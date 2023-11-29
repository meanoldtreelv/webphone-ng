import styles from "./NoMessages.module.scss";
import iconImg from "./../../../assets/images/img/no_messages.png";
import PlusIcon from "components/UI/Icons/Plus";
import { useDispatch } from "react-redux";
import { setIsStartNewConversationDialogueOpen } from "redux/chat/chatSlice";

const NoMessages = () => {
	const dispatch = useDispatch();
	return (
		<section className={styles.noMessages}>
			<span>
				<img src={iconImg} alt="" />
			</span>
			<div className={styles.noMessages_boldText}>No Messages</div>
			<div className={styles.noMessages_text}>When you have messages you'll see them here</div>
			<button
				className={styles.button}
				onClick={() => {
					dispatch(setIsStartNewConversationDialogueOpen(true));
				}}>
				<span>
					<PlusIcon />
				</span>
				<span>Start new conversations </span>
			</button>
		</section>
	);
};

export default NoMessages;
