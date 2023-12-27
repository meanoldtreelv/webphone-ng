import EmojiPicker from "emoji-picker-react";
import styles from "./EmojiPickers.module.scss";
import { useDispatch } from "react-redux";
import { setEmoji } from "redux/chat/chatSlice";
import { useTheme } from "hooks/useTheme";

const EmojiPickers = () => {
	const dispatch = useDispatch();

	const theme = useTheme();

	const handleEmojiClick = (emojiObject) => {
		dispatch(setEmoji(emojiObject?.emoji));
	};

	return (
		<div className={styles.picker}>
			<EmojiPicker onEmojiClick={handleEmojiClick} theme={theme} />
		</div>
	);
};

export default EmojiPickers;
