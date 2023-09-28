import { useState } from "react";
import styles from "./VideoCall.module.scss";

import videoCallImg from "./../../../assets/images/img/dummy/video_call.jpeg";
import dummyVideoImg from "./../../../assets/images/img/dummy/dummy_video.png";
import FullScreenIcon from "./../../../components/UI/Icons/VideoCall/FullScreen";
import AddUserIcon from "./../../../components/UI/Icons/VideoCall/AddUser";
import AddCallIcon from "./../../../components/UI/Icons/VideoCall/AddCall";
import MergeCallIcon from "./../../../components/UI/Icons/VideoCall/MergeCall";
import TransferCallIcon from "./../../../components/UI/Icons/VideoCall/TransferCall";
import EndCallIcon from "./../../../components/UI/Icons/VideoCall/EndCall";
import NoVideoIcon from "./../../../components/UI/Icons/VideoCall/NoVideo";
import MicOffIcon from "./../../../components/UI/Icons/VideoCall/MicOff";
import PauseCallIcon from "./../../../components/UI/Icons/VideoCall/PauseCall";
import KeypadIcon from "./../../../components/UI/Icons/VideoCall/Keypad";

const VideoCall = () => {
	const [isVideoPause, setIsVideoPause] = useState(true);
	const [isVideoCallActive, seIsVideoCallActive] = useState(true);

	const IconActiveStyle = { background: "var(--background-tertiary, #f7f9fc)" };
	const IconDisableStyle = {
		border: "1px solid var(--border-disabled, #c8d3e0)",
	};

	return (
		<section className={styles.videoCall}>
			<div className={styles.videoCall_video}>
				<img src={videoCallImg} alt="" />

				<div className={styles.videoCall_myVideo}>
					<img src={dummyVideoImg} alt="" />
				</div>

				<div className={styles.videoCall_descriptionBox}>
					<div>
						<p className={styles.callName}>Matt Wizz</p>
						<p className={styles.callNumber}>123456</p>
					</div>
					<div className={styles.callInfoRight}>
						<p className={styles.videoCall_timer}>03:45</p>
						<button>
							<FullScreenIcon />
						</button>
					</div>
				</div>
			</div>
			<div>
				<div className={styles.videoCall_box}>
					<div className={styles.videoCall_actionBox}>
						<div className={styles.videoCall_action}>
							<button className={styles.iconWrap}>
								<AddUserIcon />
							</button>
						</div>
						<div className={styles.videoCall_action}>
							<button className={styles.iconWrap}>
								<AddCallIcon />
							</button>
							{/* <p
                className={`caption_2 ${styles.videoCall_text}`}
                style={{ color: "var(--text-primary, #1F2023)" }}
              >
                Add Call
              </p> */}
						</div>
						<div className={styles.videoCall_action}>
							<button className={styles.iconWrap}>
								<MergeCallIcon />
							</button>
							{/* <p
                className={`caption_2 ${styles.videoCall_text}`}
                style={{ color: "var(--text-primary, #1F2023)" }}
              >
                Merge Call
              </p> */}
						</div>
						<div className={styles.videoCall_action}>
							<button className={styles.iconWrap}>
								<TransferCallIcon />
							</button>
							{/* <p
                className={`caption_2 ${styles.videoCall_text}`}
                style={{ color: "var(--text-primary, #1F2023)" }}
              >
                Transfer
              </p> */}
						</div>
						<div className={`${styles.videoCall_action} `}>
							<button className={[styles.iconWrap, styles.videoCall_endButton].join(" ")}>
								<EndCallIcon />
							</button>
						</div>
						<div className={styles.videoCall_action}>
							<button
								className={styles.iconWrap}
								style={
									isVideoCallActive
										? isVideoPause
											? { background: "var(--background-danger, #FFEBEB)" }
											: IconActiveStyle
										: IconDisableStyle
								}>
								<NoVideoIcon isVideoCallActive isVideoPause />
								{/* <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="fill / camera">
                    <path
                      id="Vector"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M22.6667 13.5085V10.6665C22.6667 8.45736 20.8758 6.6665 18.6667 6.6665H5.33334C3.1242 6.6665 1.33334 8.45736 1.33334 10.6665V21.3332C1.33334 23.5423 3.1242 25.3332 5.33334 25.3332H18.6667C20.8758 25.3332 22.6667 23.5423 22.6667 21.3332V18.4912L28.5937 22.4426C29.0029 22.7153 29.5289 22.7408 29.9625 22.5087C30.396 22.2767 30.6667 21.8249 30.6667 21.3332V10.6665C30.6667 10.1748 30.396 9.72297 29.9625 9.49094C29.5289 9.25891 29.0029 9.28434 28.5937 9.55711L22.6667 13.5085Z"
                      fill={
                        isVideoCallActive
                          ? isVideoPause
                            ? "#EE3939"
                            : "#191C1F"
                          : "#C8D3E0"
                      }
                    />
                  </g>
                </svg> */}
							</button>
							{/* <p
                className={`caption_2 ${styles.videoCall_text}`}
                style={{ color: "var(--text-primary, #1F2023)" }}
              >
                Video
              </p> */}
						</div>
						<div className={styles.videoCall_action}>
							<button className={styles.iconWrap}>
								<MicOffIcon />
							</button>
							{/* <p
                className={`caption_2 ${styles.videoCall_text}`}
                style={{ color: "var(--text-primary, #1F2023)" }}
              >
                Mute
              </p> */}
						</div>
						<div className={styles.videoCall_action}>
							<button className={styles.iconWrap}>
								<PauseCallIcon />
							</button>
							{/* <p
                className={`caption_2 ${styles.videoCall_text}`}
                style={{ color: "var(--text-primary, #1F2023)" }}
              >
                Hold
              </p> */}
						</div>
						<div className={styles.videoCall_action}>
							<button className={styles.iconWrap}>
								<KeypadIcon/>
							</button>
						</div>
					</div>
					<div className={styles.videoCall_actionBox}></div>
				</div>
			</div>
		</section>
	);
};

export default VideoCall;
