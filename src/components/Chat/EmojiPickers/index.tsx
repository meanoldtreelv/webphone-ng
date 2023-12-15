import EmojiPicker from "emoji-picker-react";
import styles from "./EmojiPickers.module.scss";
import { useDispatch } from "react-redux";
import { setEmoji } from "redux/chat/chatSlice";

const EmojiPickers = () => {
	const dispatch = useDispatch();

	const handleEmojiClick = (emojiObject) => {
		dispatch(setEmoji(emojiObject?.emoji));
	};

	return (
		<div className={styles.picker}>
			<EmojiPicker onEmojiClick={handleEmojiClick} />
		</div>
	);
};

export default EmojiPickers;
