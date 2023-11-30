import styles from "./NoMessages.module.scss";
import iconImg from "./../../../assets/images/img/no_messages.png";
import PlusIcon from "components/UI/Icons/Plus";
import { useDispatch } from "react-redux";
import { setIsStartNewConversationDialogueOpen } from "redux/chat/chatSlice";
import Button from "components/UI/Button";

const NoMessages = () => {
	const dispatch = useDispatch();

	return (
		<section className={styles.noMessages}>
			<span>
				<img src={iconImg} alt="" />
			</span>
			<div className={styles.noMessages_boldText}>No Messages</div>
			<div className={styles.noMessages_text}>When you have messages you'll see them here</div>
			<Button
				btnText={"Start new conversations"}
				icon={<PlusIcon color="icon-on-color" />}
				onClick={() => {
					dispatch(setIsStartNewConversationDialogueOpen(true));
				}}
			/>
		</section>
	);
};

export default NoMessages;
