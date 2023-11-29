import styles from "./ChatBox.module.scss";
import ReceiveTime from "./ReceiveTime";
import ReceiveMessage from "./ReceiveMessage";
import ReceiveImg from "./ReceiveImg";
import SendTime from "./SendTime";
import SendMessage from "./SendMessage";
import SendImg from "./SendImg";
import InfoMessage from "./InfoMessage";
import { useState } from "react";
import BtnPlay from "components/UI/Icons/ChatIcons/BtnPlay";
import SendVideo from "./SendVideo";
import ReceiveVideo from "./ReceiveVideo";
import PlayerPlay from "components/UI/Icons/ChatIcons/PlayerPlay";
import SoundWaves1 from "../../../assets/images/img/sound_wave_receive.svg";
import SoundWaves2 from "../../../assets/images/img/sound_wave_send.svg";
import SendAudio from "./SendAudio";
import ReceiveAudio from "./ReceiveAudio";
import DocImg from "../../../assets/images/img/doc.svg";
import SendDoc from "./SendDoc";
import ReceiveDoc from "./ReceiveDoc";
import ThreeDots from "components/UI/Icons/meet/ThreeDots";
import ContactDetailsPopUp from "./ContactDetailsPopup";
import SendContact from "./SendContact";
import ReceiveContact from "./ReceiveContact";

const ChatBox = () => {
	const [imgSelected, setImgSelected] = useState(false);
	return (
		<div className={`${styles.chatBox} ${imgSelected && styles.chatBox_imgSelected}`}>
			<ReceiveTime />
			<InfoMessage />
			<ReceiveMessage />
			<ReceiveImg />
			<SendTime />
			<SendMessage />
			<SendImg />
			<SendVideo />
			<ReceiveVideo />
			<SendAudio />
			<ReceiveAudio />
			<SendDoc />
			<ReceiveDoc />
			<SendContact />
			<ReceiveContact />
			{/* <div className={styles.info}>
				<span> Conversation with +1(635) 071 0331 created!</span>
			</div>
			<div className={styles.sendTime}>
				<span> 02:30AM</span>
			</div>
			<div className={styles.sendChat}>
				<span> send test chat </span>
			</div>
			<div className={styles.receiveTime}>
				<span> 02:30AM</span>
			</div>
			<div className={styles.receiveChat}>
				<span> e dolor deleniti sequi sed, optio quaerat provident assumenda saepe. Omnis, aspernatur laboriosam.</span>
			</div>
			<div className={styles.receiveChat}>
				<span> e dolor deleniti sequi sed, optio quaerat provident assumenda saepe. Omnis, aspernatur laboriosam.</span>
			</div>
			<div className={styles.receiveTime}>
				<span> 02:30AM</span>
			</div>
			<div className={styles.receiveChat}>
				<span> e dolor deleniti sequi sed, optio quaerat provident assumenda saepe. Omnis, aspernatur laboriosam.</span>
			</div>
			<div className={styles.receiveChat}>
				<span> e dolor deleniti sequi sed, optio quaerat provident assumenda saepe. Omnis, aspernatur laboriosam.</span>
			</div>
			<div className={styles.sendTime}>
				<span> 02:30AM</span>
			</div>
			<div className={styles.sendChat}>
				<span>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto tenetur ratione odio in! Labore ratione,
					laboriosam laudantium esse dolor deleniti sequi sed, optio quaerat provident assumenda saepe. Omnis,
					aspernatur laboriosam.
				</span>
			</div>
			<div className={styles.sendTime}>
				<span> 02:30AM</span>
			</div>
			<div className={styles.sendChat}>
				<span> e dolor deleniti sequi sed, optio quaerat provident assumenda saepe. Omnis, aspernatur laboriosam.</span>
			</div>
			<div className={styles.receiveChat}>
				<span>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto tenetur ratione odio in! Labore ratione,
					laboriosam laudantium esse dolor deleniti sequi sed, optio quaerat provident assumenda saepe. Omnis,
					aspernatur laboriosam. thank you &#129392;
				</span>
			</div>
			<div className={styles.receiveTime}>
				<span> 02:30AM</span>
			</div>
			<div className={styles.receiveImg}>
				<span>
					<img src="/img/dummy/dummy_video.png" alt=""></img>
				</span>
			</div> */}
			{/* <div className={styles.receiveVideo}>
				<span>
					<img src="/img/dummy/dummy_video.png" alt="" />
					<span className={styles.btnPlay}>
						<BtnPlay />
					</span>
					<span className={styles.duration}>01:30</span>
				</span>
			</div>
			<div className={styles.receiveImg}>
				<span>
					<img src="/img/dummy/profile.png" alt=""></img>
				</span>
			</div>
			<div className={styles.sendTime}>
				<span> 02:30AM</span>
			</div>
			<div className={styles.sendVideo}>
				<span>
					<img src="/img/dummy/profile.png" alt="" />
					<span className={styles.btnPlay}>
						<BtnPlay />
					</span>
					<span className={styles.duration}>01:30</span>
				</span>
			</div>
			<div className={styles.receiveDoc}>
				<div>
					<span>
						<img src={DocImg} alt="" />
					</span>
					<span className={styles.details}>
						<span>Pricing sheet .......... 2022.dox</span>
						<b>127 kb</b>
					</span>
				</div>
			</div>
			<div className={styles.sendDoc}>
				<div>
					<span>
						<img src={DocImg} alt="" />
					</span>
					<span className={styles.details}>
						<span>Pricing sheet 2022.dox</span>
						<b>127 kb</b>
					</span>
				</div>
			</div>
			<div className={styles.sendChat}>
				<span> e dolor deleniti sequi sed, optio quaerat provident assumenda saepe. Omnis, aspernatur laboriosam.</span>
			</div>
			<div className={styles.receiveAudio}>
				<div className={styles.audio}>
					<PlayerPlay color="primary-default" />
					<div>
						<img src={SoundWaves1} alt="" />
						<span className={styles.soundDetails}>
							<span>Call record 2402.wav</span>
							<span className={styles.duration}>01:30</span>
						</span>
					</div>
				</div>
			</div>
			<div className={styles.sendAudio}>
				<div className={styles.audio}>
					<PlayerPlay color="icon-on-color" />
					<div>
						<img src={SoundWaves2} alt="" />
						<span className={styles.soundDetails}>
							<span>Call record 2402.wav</span>
							<span className={styles.duration}>01:30</span>
						</span>
					</div>
				</div>
			</div>
			<div className={styles.sendContact}>
				<div className={styles.contactBox}>
					<div className={styles.contact}>
						<div>
							<span className={styles.initials}>SG</span>
							<span className={styles.details}>
								<span className={styles.name}>Shivam Gupta </span>
								<span className={styles.number}>987643131</span>
							</span>
						</div>
						<span>
							<ThreeDots />
						</span>
						{true && <ContactDetailsPopUp />}
					</div>
					<div className={styles.contact}>
						<div>
							<span className={styles.initials}>SG</span>
							<span className={styles.details}>
								<span className={styles.name}>Shivam Gupta Delhi India </span>
								<span className={styles.number}>987643131</span>
							</span>
						</div>
						<span>
							<ThreeDots />
						</span>
					</div>
				</div>
			</div>
			<div className={styles.receiveContact}>
				<div className={styles.contactBox}>
					<div className={styles.contact}>
						<div>
							<span className={styles.initials}>SG</span>
							<span className={styles.details}>
								<span className={styles.name}>Shivam Gupta </span>
								<span className={styles.number}>987643131</span>
							</span>
						</div>
						<span>
							<ThreeDots />
						</span>
						{false && <ContactDetailsPopUp />}
					</div>
					<div className={styles.contact}>
						<div>
							<span className={styles.initials}>SG</span>
							<span className={styles.details}>
								<span className={styles.name}>Shivam Gupta Delhi India </span>
								<span className={styles.number}>987643131</span>
							</span>
						</div>
						<span>
							<ThreeDots />
						</span>
					</div>
				</div>
			</div>
			<div className={styles.sendImg}>
				<span>
					<img src="/img/dummy/video_call.jpeg" alt=""></img>
				</span>
			</div> */}
		</div>
	);
};

export default ChatBox;
