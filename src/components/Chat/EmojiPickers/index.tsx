import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import styles from "./EmojiPickers.module.scss";
import { useDispatch } from "react-redux";
import { setEmoji } from "redux/chat/chatSlice";

const EmojiPickers = () => {
	const dispatch = useDispatch();
	const [selectedEmoji, setSelectedEmoji] = useState(null); // State to store selected emoji

	const handleEmojiClick = (emojiObject) => {
		setSelectedEmoji(emojiObject.target); // Update state with selected emoji
		console.log("====================================");
		console.log(emojiObject?.emoji, "emi=oji");
		console.log("====================================");
		dispatch(setEmoji(emojiObject?.emoji));
	};

	// console.log("====================================");
	// console.log(selectedEmoji);
	// console.log("====================================");

	return (
		<div className={styles.picker}>
			<EmojiPicker onEmojiClick={handleEmojiClick} />
			<div className={styles.chatBox}>
				{/* Display selected emoji in the chat box */}
				{/* {selectedEmoji && (
					<span role="img" aria-label="selectedEmoji">
						{selectedEmoji}
					</span>
				)} */}
			</div>
		</div>
	);
};

export default EmojiPickers;
