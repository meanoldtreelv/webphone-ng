import React from "react";
import styles from "./ChatBox.module.scss";

const ChatBox = () => {
	return (
		<div className={styles.chatBox}>
			<div className={styles.info}>
				<span> Conversation with +1(635) 071 0331 created!</span>{" "}
			</div>
			<div className={styles.sendTime}>
				<span> 02:30AM</span>{" "}
			</div>
			<div className={styles.sendChat}>
				<span> send test chat </span>{" "}
			</div>
			<div className={styles.receiveTime}>
				<span> 02:30AM</span>{" "}
			</div>
			<div className={styles.receiveChat}>
				<span> e dolor deleniti sequi sed, optio quaerat provident assumenda saepe. Omnis, aspernatur laboriosam.</span>{" "}
			</div>
			<div className={styles.receiveChat}>
				<span> e dolor deleniti sequi sed, optio quaerat provident assumenda saepe. Omnis, aspernatur laboriosam.</span>{" "}
			</div>
			<div className={styles.receiveTime}>
				<span> 02:30AM</span>{" "}
			</div>
			<div className={styles.receiveChat}>
				<span> e dolor deleniti sequi sed, optio quaerat provident assumenda saepe. Omnis, aspernatur laboriosam.</span>{" "}
			</div>
			<div className={styles.receiveChat}>
				<span> e dolor deleniti sequi sed, optio quaerat provident assumenda saepe. Omnis, aspernatur laboriosam.</span>{" "}
			</div>
			<div className={styles.sendTime}>
				<span> 02:30AM</span>{" "}
			</div>
			<div className={styles.sendChat}>
				<span>
					{" "}
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto tenetur ratione odio in! Labore ratione,
					laboriosam laudantium esse dolor deleniti sequi sed, optio quaerat provident assumenda saepe. Omnis,
					aspernatur laboriosam.
				</span>{" "}
			</div>
			<div className={styles.sendTime}>
				<span> 02:30AM</span>{" "}
			</div>
			<div className={styles.sendChat}>
				<span> e dolor deleniti sequi sed, optio quaerat provident assumenda saepe. Omnis, aspernatur laboriosam.</span>{" "}
			</div>
			<div className={styles.receiveChat}>
				<span>
					{" "}
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto tenetur ratione odio in! Labore ratione,
					laboriosam laudantium esse dolor deleniti sequi sed, optio quaerat provident assumenda saepe. Omnis,
					aspernatur laboriosam. thank you &#129392;
				</span>{" "}
			</div>
			<div className={styles.receiveTime}>
				<span> 02:30AM</span>{" "}
			</div>
			<div className={styles.receiveImg}>
				<span>
					{" "}
					<img src="/img/dummy/dummy_video.png" alt=""></img>
				</span>{" "}
			</div>
			<div className={styles.receiveImg}>
				<span>
					{" "}
					<img src="/img/dummy/profile.png" alt=""></img>
				</span>{" "}
			</div>
			<div className={styles.sendTime}>
				<span> 02:30AM</span>{" "}
			</div>
			<div className={styles.sendChat}>
				<span> e dolor deleniti sequi sed, optio quaerat provident assumenda saepe. Omnis, aspernatur laboriosam.</span>{" "}
			</div>
			<div className={styles.sendImg}>
				<span>
					{" "}
					<img src="/img/dummy/video_call.jpeg" alt=""></img>
				</span>{" "}
			</div>
		</div>
	);
};

export default ChatBox;
