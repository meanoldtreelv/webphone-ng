import React, { useState } from "react";
import classes from "./dialer.module.scss";
import TransferCallCard from "./TransferCallCard";

import { useDispatch } from "react-redux";
import { callingActions } from "../../store/calling";

const Dialer = () => {
	const [isMute, setIsMute] = useState(true);
	const [isCallConnected, setIsCallConnected] = useState(false);
	const [isCallActive, setIsCallActive] = useState(true);

	const [isTransferButtonClicked, setIsTransferButtonClicked] = useState(false);

	const dispatch = useDispatch();

	// style for state update
	const IconActiveStyle = { background: "var(--background-tertiary, #f7f9fc)" };
	const IconDisableStyle = {
		border: "1px solid var(--border-disabled, #c8d3e0)",
	};

	function endCallHandler() {
		dispatch(callingActions.endCall());
	}

	function addCallHandler() {
		dispatch(callingActions.addCall());
	}

	function transferCallHandler() {
		setIsTransferButtonClicked(!isTransferButtonClicked);
	}

	return (
		<section className={classes.dialer}>
			<div
				className={classes.dialer_detailsBox}
				// style={{ backgroundColor: "var(--accent-yellow-tertiary, #fffaeb)" }}
			>
				{false && <img src="/img/dummy/profile.png" alt="" className={classes.backgroundImg} />}
				{true && (
					<div
						className={classes.backgroundColor}
						style={{ backgroundColor: "var(--accent-blue-tertiary, #ECF5FE)" }}></div>
				)}

				<div className={classes.dialer_details}>
					<div className={`large_title ${classes.dialer_profile}`}>
						{false ? <img src="/img/dummy/profile96.png" alt=""></img> : <span>MW</span>}
					</div>
					<p className={`title_1`} style={{ color: "var(--text-primary, #1F2023)" }}>
						Matt Wiz
					</p>
					<p className={`title_3`} style={{ color: "var(--text-secondary, #5C6168)" }}>
						1234567890
					</p>

					{/* add the condition here for dialing  */}

					{!isCallConnected ? (
						<p className={classes.title_3} style={{ color: "var(--text-secondary, #5C6168)" }}>
							Dialing...
						</p>
					) : (
						<div className={`bold ${classes.dialer_timer}`} style={{ color: "var(--text-primary, #1F2023)" }}>
							03:45
						</div>
					)}
				</div>
			</div>
			<div className={classes.dialer_box}>
				<div className={classes.dialer_actionBox}>
					<div className={classes.dialer_action} onClick={addCallHandler}>
						<span className={classes.dialer_icon} style={false ? IconActiveStyle : IconDisableStyle}>
							<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
								<g id="fill / call_add">
									<g id="Vector">
										<path
											d="M22.6667 2.6665H25.3333V6.6665H29.3333V9.33317H25.3333V13.3332H22.6667V9.33317H18.6667V6.6665H22.6667V2.6665Z"
											fill={true ? "#C8D3E0" : "#191C1F"}
										/>
										<path
											d="M29.3332 26.56V22.56C29.3495 21.9061 29.1248 21.269 28.702 20.77C28.2791 20.2709 27.6876 19.9447 27.0399 19.8533C25.7598 19.6845 24.5029 19.3714 23.2932 18.92C22.816 18.7406 22.2974 18.7018 21.7987 18.8081C21.3001 18.9144 20.8424 19.1615 20.4799 19.52L18.7866 21.2133C15.4485 19.3152 12.6846 16.5514 10.7866 13.2133L12.4799 11.52C12.8384 11.1574 13.0854 10.6998 13.1918 10.2011C13.2981 9.70252 13.2593 9.18387 13.0799 8.70663C12.6285 7.49694 12.3154 6.24006 12.1466 4.95997C12.056 4.31923 11.7355 3.73328 11.2449 3.31134C10.7543 2.8894 10.127 2.66026 9.47991 2.66663H5.47991C5.10969 2.66698 4.74361 2.74441 4.40496 2.894C4.06631 3.04358 3.76252 3.26204 3.51293 3.53546C3.26333 3.80889 3.07341 4.13128 2.95524 4.48213C2.83707 4.83298 2.79325 5.20459 2.82657 5.5733C3.26423 9.69463 4.66654 13.6549 6.91991 17.1333C8.96702 20.3549 11.6983 23.0862 14.9199 25.1333C18.3826 27.3788 22.3237 28.7808 26.4266 29.2266C26.7964 29.2601 27.1691 29.2159 27.5209 29.0969C27.8727 28.9779 28.1957 28.7868 28.4693 28.5358C28.743 28.2848 28.9612 27.9793 29.1099 27.6391C29.2587 27.2989 29.3347 26.9313 29.3332 26.56Z"
											fill={true ? "#C8D3E0" : "#191C1F"}
										/>
									</g>
								</g>
							</svg>
						</span>
						<p className={`caption_2 ${classes.dialer_text}`} style={{ color: "var(--text-primary, #1F2023)" }}>
							Add Call
						</p>
					</div>
					<div className={classes.dialer_action}>
						<span className={classes.dialer_icon} style={false ? IconActiveStyle : IconDisableStyle}>
							<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
								<g id="fill / merge">
									<g id="Vector">
										<path
											d="M5.33334 13.3332L16 2.6665L26.6667 13.3332H18V13.5192C18 15.1365 17.4654 16.7085 16.4793 17.9904L12.0246 23.7815C11.5764 24.3641 11.3333 25.0787 11.3333 25.8138V29.3332H7.33334V25.8138C7.33334 24.1965 7.868 22.6245 8.8541 21.3426L13.3088 15.5516C13.757 14.9689 14 14.2543 14 13.5192V13.3332H5.33334Z"
											fill={true ? "#C8D3E0" : "#191C1F"}
										/>
										<path
											d="M17.6823 20.7999L19.9755 23.7812C20.4238 24.3638 20.6668 25.0784 20.6668 25.8135V29.3329H24.6668V25.8135C24.6668 24.1962 24.1321 22.6242 23.146 21.3423L19.9629 17.2043C19.6228 18.0623 19.1632 18.8747 18.593 19.616L17.6823 20.7999Z"
											fill={true ? "#C8D3E0" : "#191C1F"}
										/>
									</g>
								</g>
							</svg>
						</span>
						<p className={`caption_2 ${classes.dialer_text}`} style={{ color: "var(--text-primary, #1F2023)" }}>
							Merge Call
						</p>
					</div>
					<div
						className={classes.dialer_action}
						style={{ position: "relative" }}
						// onClick={() => {
						// 	setIsTransferButtonClicked(!isTransferButtonClicked);
						// }}
					>
						<span
							className={classes.dialer_icon}
							style={false ? IconActiveStyle : IconDisableStyle}
							onClick={transferCallHandler}>
							<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
								<g id="fill / call_transfer">
									<g id="Vector">
										<path
											d="M25.3333 2.6665L30.6667 7.99984L25.3333 13.3332V9.33317H18.6667V6.6665L25.3333 6.6665V2.6665Z"
											fill={true ? "#C8D3E0" : "#191C1F"}
										/>
										<path
											d="M29.3333 26.56V22.56C29.3495 21.9061 29.1248 21.269 28.702 20.77C28.2791 20.2709 27.6876 19.9447 27.0399 19.8533C25.7598 19.6845 24.5029 19.3714 23.2933 18.92C22.816 18.7406 22.2974 18.7018 21.7987 18.8081C21.3001 18.9144 20.8424 19.1615 20.4799 19.52L18.7866 21.2133C15.4485 19.3152 12.6847 16.5514 10.7866 13.2133L12.4799 11.52C12.8384 11.1574 13.0855 10.6998 13.1918 10.2011C13.2981 9.70252 13.2593 9.18387 13.0799 8.70663C12.6285 7.49694 12.3154 6.24006 12.1466 4.95997C12.056 4.31923 11.7356 3.73328 11.2449 3.31134C10.7543 2.8894 10.127 2.66026 9.47992 2.66663H5.47992C5.10971 2.66698 4.74362 2.74441 4.40498 2.894C4.06633 3.04358 3.76254 3.26204 3.51294 3.53546C3.26335 3.80889 3.07342 4.13128 2.95525 4.48213C2.83709 4.83298 2.79327 5.20459 2.82659 5.5733C3.26424 9.69463 4.66656 13.6549 6.91992 17.1333C8.96704 20.3549 11.6984 23.0862 14.9199 25.1333C18.3826 27.3788 22.3237 28.7808 26.4266 29.2266C26.7964 29.2601 27.1692 29.2159 27.5209 29.0969C27.8727 28.9779 28.1957 28.7868 28.4694 28.5358C28.743 28.2848 28.9612 27.9793 29.1099 27.6391C29.2587 27.2989 29.3348 26.9313 29.3333 26.56Z"
											fill={true ? "#C8D3E0" : "#191C1F"}
										/>
									</g>
								</g>
							</svg>
						</span>
						<p className={`caption_2 ${classes.dialer_text}`} style={{ color: "var(--text-primary, #1F2023)" }}>
							Transfer
						</p>
						{isTransferButtonClicked && <TransferCallCard />}
					</div>
					<div className={classes.dialer_action}>
						<span className={classes.dialer_icon} style={false ? IconActiveStyle : IconDisableStyle}>
							<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
								<g id="fill / camera">
									<path
										id="Vector"
										fill-rule="evenodd"
										clip-rule="evenodd"
										d="M22.6667 13.5085V10.6665C22.6667 8.45736 20.8758 6.6665 18.6667 6.6665H5.33334C3.1242 6.6665 1.33334 8.45736 1.33334 10.6665V21.3332C1.33334 23.5423 3.1242 25.3332 5.33334 25.3332H18.6667C20.8758 25.3332 22.6667 23.5423 22.6667 21.3332V18.4912L28.5937 22.4426C29.0029 22.7153 29.5289 22.7408 29.9625 22.5087C30.396 22.2767 30.6667 21.8249 30.6667 21.3332V10.6665C30.6667 10.1748 30.396 9.72297 29.9625 9.49094C29.5289 9.25891 29.0029 9.28434 28.5937 9.55711L22.6667 13.5085Z"
										fill={true ? "#C8D3E0" : "#191C1F"}
									/>
								</g>
							</svg>
						</span>
						<p className={`caption_2 ${classes.dialer_text}`} style={{ color: "var(--text-primary, #1F2023)" }}>
							Video
						</p>
					</div>
					<div className={classes.dialer_action}>
						<span
							className={classes.dialer_icon}
							style={
								isCallActive
									? isMute
										? { background: "var(--background-danger, #FFEBEB)" }
										: IconActiveStyle
									: IconDisableStyle
							}
							// background: "var(--background-danger, #FFEBEB)"
							// style={isCallActive ? {} : {}}
						>
							<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
								<g id="fill / microphone_off">
									<g id="Vector">
										<path
											d="M12.2288 2.89559C13.229 1.8954 14.5855 1.3335 16 1.3335C17.4145 1.3335 18.7711 1.8954 19.7713 2.89559C20.7715 3.89579 21.3334 5.25234 21.3334 6.66683V7.44808L27.0573 1.72412L28.9429 3.60974L4.94293 27.6097L3.05731 25.7241L7.02185 21.7596C5.9279 20.0542 5.33335 18.0578 5.33335 16.0002V13.3335C5.33335 12.5971 5.93031 12.0002 6.66669 12.0002C7.40307 12.0002 8.00002 12.5971 8.00002 13.3335V16.0002C8.00002 17.3442 8.33824 18.6534 8.96755 19.8139L10.9801 17.8014C10.7746 17.2288 10.6667 16.6201 10.6667 16.0002V6.66683C10.6667 5.25234 11.2286 3.89579 12.2288 2.89559Z"
											fill={isCallActive ? (isMute ? "#EE3939" : "#191C1F") : "#C8D3E0"}
										/>
										<path
											d="M14.1991 21.0202L21.3334 13.886V16.0002C21.3334 17.4146 20.7715 18.7712 19.7713 19.7714C18.7711 20.7716 17.4145 21.3335 16 21.3335C15.3802 21.3335 14.7715 21.2256 14.1991 21.0202Z"
											fill={isCallActive ? (isMute ? "#EE3939" : "#191C1F") : "#C8D3E0"}
										/>
										<path
											d="M12.1866 23.0328L10.2408 24.9785C11.5748 25.8341 13.0867 26.3842 14.6667 26.5832V29.3335C14.6667 30.0699 15.2636 30.6668 16 30.6668C16.7364 30.6668 17.3334 30.0699 17.3334 29.3335V26.5832C19.6707 26.2888 21.859 25.2261 23.5425 23.5426C25.5429 21.5422 26.6667 18.8291 26.6667 16.0002V13.3335C26.6667 12.5971 26.0697 12.0002 25.3334 12.0002C24.597 12.0002 24 12.5971 24 13.3335V16.0002C24 18.1219 23.1572 20.1567 21.6569 21.657C20.1566 23.1573 18.1218 24.0002 16 24.0002C14.6561 24.0002 13.347 23.662 12.1866 23.0328Z"
											fill={isCallActive ? (isMute ? "#EE3939" : "#191C1F") : "#C8D3E0"}
										/>
									</g>
								</g>
							</svg>
						</span>
						<p className={`caption_2 ${classes.dialer_text}`} style={{ color: "var(--text-primary, #1F2023)" }}>
							Mute
						</p>
					</div>
					<div className={classes.dialer_action}>
						<span className={classes.dialer_icon} style={false ? IconActiveStyle : IconDisableStyle}>
							<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
								<g id="fill / call_pause">
									<g id="Vector">
										<path
											d="M29.3332 22.56V26.56C29.3347 26.9313 29.2587 27.2989 29.1099 27.6391C28.9611 27.9793 28.743 28.2848 28.4693 28.5358C28.1957 28.7868 27.8727 28.9779 27.5209 29.0969C27.1691 29.2159 26.7964 29.2601 26.4266 29.2266C22.3237 28.7808 18.3826 27.3788 14.9199 25.1333C11.6983 23.0862 8.96701 20.3549 6.91989 17.1333C4.66653 13.6549 3.26421 9.69463 2.82656 5.5733C2.79324 5.20459 2.83706 4.83298 2.95522 4.48213C3.07339 4.13128 3.26332 3.80889 3.51291 3.53546C3.76251 3.26204 4.0663 3.04358 4.40495 2.894C4.74359 2.74441 5.10968 2.66698 5.47989 2.66663H9.47989C10.127 2.66026 10.7543 2.8894 11.2449 3.31134C11.7355 3.73328 12.056 4.31923 12.1466 4.95997C12.3154 6.24006 12.6285 7.49694 13.0799 8.70663C13.2593 9.18387 13.2981 9.70252 13.1918 10.2011C13.0854 10.6998 12.8384 11.1574 12.4799 11.52L10.7866 13.2133C12.6846 16.5514 15.4485 19.3152 18.7866 21.2133L20.4799 19.52C20.8424 19.1615 21.3001 18.9144 21.7987 18.8081C22.2973 18.7018 22.816 18.7406 23.2932 18.92C24.5029 19.3714 25.7598 19.6845 27.0399 19.8533C27.6876 19.9447 28.2791 20.2709 28.7019 20.77C29.1248 21.269 29.3494 21.9061 29.3332 22.56Z"
											fill={true ? "#C8D3E0" : "#191C1F"}
										/>
										<path d="M20 2.6665H22.6666V13.3332H20V2.6665Z" fill={true ? "#C8D3E0" : "#191C1F"} />
										<path d="M29.3333 2.6665H26.6666V13.3332H29.3333V2.6665Z" fill={true ? "#C8D3E0" : "#191C1F"} />
									</g>
								</g>
							</svg>
						</span>
						<p className={`caption_2 ${classes.dialer_text}`} style={{ color: "var(--text-primary, #1F2023)" }}>
							Hold
						</p>
					</div>
				</div>
				<div className={classes.dialer_actionBox}>
					<div className={classes.dialer_control}>
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<g id="line / add_user">
								<path
									id="Vector"
									d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H6C4.93913 15 3.92172 15.4214 3.17157 16.1716C2.42143 16.9217 2 17.9391 2 19V21M19 8V14M22 11H16M13 7C13 9.20914 11.2091 11 9 11C6.79086 11 5 9.20914 5 7C5 4.79086 6.79086 3 9 3C11.2091 3 13 4.79086 13 7Z"
									stroke={true ? "#C8D3E0" : "#C8D3E0"}
									stroke-width="1.5"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
							</g>
						</svg>
					</div>
					<div className={`${classes.dialer_control} ${classes.dialer_endButton}`} onClick={endCallHandler}>
						<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
							<g id="fill / phone_end">
								<path
									id="Vector"
									d="M0.803675 20.3065L3.68574 23.1351C4.1452 23.6089 4.76609 23.9006 5.43033 23.9545C6.09457 24.0083 6.75582 23.8208 7.28833 23.4274C8.3323 22.6415 9.4635 21.9741 10.6603 21.4379C11.1335 21.2273 11.5351 20.888 11.8178 20.4602C12.1004 20.0324 12.2522 19.534 12.2551 19.0241V16.6293C16.0278 15.611 20.0106 15.611 23.7834 16.6293V19.0241C23.7863 19.534 23.938 20.0324 24.2207 20.4602C24.5033 20.888 24.905 21.2273 25.3781 21.4379C26.575 21.9741 27.7061 22.6415 28.7501 23.4274C29.277 23.8164 29.9301 24.0042 30.5876 23.9556C31.2452 23.907 31.8622 23.6254 32.3239 23.1634L35.2059 20.3347C35.4724 20.0727 35.6804 19.7591 35.8167 19.4138C35.9529 19.0686 36.0144 18.6992 35.9972 18.3294C35.98 17.9595 35.8846 17.5972 35.7169 17.2656C35.5493 16.9339 35.3131 16.6401 35.0234 16.403C31.7386 13.798 27.8748 11.9892 23.7449 11.1229C19.9488 10.2924 16.0128 10.2924 12.2167 11.1229C8.10381 11.9836 4.25401 13.7791 0.9766 16.3652C0.686048 16.6031 0.449321 16.898 0.281584 17.2308C0.113847 17.5637 0.0187948 17.9273 0.00251604 18.2983C-0.0137627 18.6694 0.0490894 19.0396 0.18705 19.3854C0.325011 19.7312 0.535035 20.0449 0.803675 20.3065Z"
									fill="white"
								/>
							</g>
						</svg>
					</div>
					<div className={classes.dialer_control}>
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
							<path
								d="M6 4C6 4.55228 5.55228 5 5 5C4.44772 5 4 4.55228 4 4C4 3.44772 4.44772 3 5 3C5.55228 3 6 3.44772 6 4Z"
								fill="#6C7A8B"
							/>
							<path
								d="M6 10C6 10.5523 5.55228 11 5 11C4.44772 11 4 10.5523 4 10C4 9.44772 4.44772 9 5 9C5.55228 9 6 9.44772 6 10Z"
								fill="#6C7A8B"
							/>
							<path
								d="M6 16C6 16.5523 5.55228 17 5 17C4.44772 17 4 16.5523 4 16C4 15.4477 4.44772 15 5 15C5.55228 15 6 15.4477 6 16Z"
								fill="#6C7A8B"
							/>
							<path
								d="M13 4C13 4.55228 12.5523 5 12 5C11.4477 5 11 4.55228 11 4C11 3.44772 11.4477 3 12 3C12.5523 3 13 3.44772 13 4Z"
								fill="#6C7A8B"
							/>
							<path
								d="M13 10C13 10.5523 12.5523 11 12 11C11.4477 11 11 10.5523 11 10C11 9.44772 11.4477 9 12 9C12.5523 9 13 9.44772 13 10Z"
								fill="#6C7A8B"
							/>
							<path
								d="M13 16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16C11 15.4477 11.4477 15 12 15C12.5523 15 13 15.4477 13 16Z"
								fill="#6C7A8B"
							/>
							<path
								d="M13 22C13 22.5523 12.5523 23 12 23C11.4477 23 11 22.5523 11 22C11 21.4477 11.4477 21 12 21C12.5523 21 13 21.4477 13 22Z"
								fill="#6C7A8B"
							/>
							<path
								d="M20 4C20 4.55228 19.5523 5 19 5C18.4477 5 18 4.55228 18 4C18 3.44772 18.4477 3 19 3C19.5523 3 20 3.44772 20 4Z"
								fill="#6C7A8B"
							/>
							<path
								d="M20 10C20 10.5523 19.5523 11 19 11C18.4477 11 18 10.5523 18 10C18 9.44772 18.4477 9 19 9C19.5523 9 20 9.44772 20 10Z"
								fill="#6C7A8B"
							/>
							<path
								d="M20 16C20 16.5523 19.5523 17 19 17C18.4477 17 18 16.5523 18 16C18 15.4477 18.4477 15 19 15C19.5523 15 20 15.4477 20 16Z"
								fill="#6C7A8B"
							/>
							<path
								d="M6 4C6 4.55228 5.55228 5 5 5C4.44772 5 4 4.55228 4 4C4 3.44772 4.44772 3 5 3C5.55228 3 6 3.44772 6 4Z"
								stroke="#6C7A8B"
								stroke-width="1.5"
							/>
							<path
								d="M6 10C6 10.5523 5.55228 11 5 11C4.44772 11 4 10.5523 4 10C4 9.44772 4.44772 9 5 9C5.55228 9 6 9.44772 6 10Z"
								stroke="#6C7A8B"
								stroke-width="1.5"
							/>
							<path
								d="M6 16C6 16.5523 5.55228 17 5 17C4.44772 17 4 16.5523 4 16C4 15.4477 4.44772 15 5 15C5.55228 15 6 15.4477 6 16Z"
								stroke="#6C7A8B"
								stroke-width="1.5"
							/>
							<path
								d="M13 4C13 4.55228 12.5523 5 12 5C11.4477 5 11 4.55228 11 4C11 3.44772 11.4477 3 12 3C12.5523 3 13 3.44772 13 4Z"
								stroke="#6C7A8B"
								stroke-width="1.5"
							/>
							<path
								d="M13 10C13 10.5523 12.5523 11 12 11C11.4477 11 11 10.5523 11 10C11 9.44772 11.4477 9 12 9C12.5523 9 13 9.44772 13 10Z"
								stroke="#6C7A8B"
								stroke-width="1.5"
							/>
							<path
								d="M13 16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16C11 15.4477 11.4477 15 12 15C12.5523 15 13 15.4477 13 16Z"
								stroke="#6C7A8B"
								stroke-width="1.5"
							/>
							<path
								d="M13 22C13 22.5523 12.5523 23 12 23C11.4477 23 11 22.5523 11 22C11 21.4477 11.4477 21 12 21C12.5523 21 13 21.4477 13 22Z"
								stroke="#6C7A8B"
								stroke-width="1.5"
							/>
							<path
								d="M20 4C20 4.55228 19.5523 5 19 5C18.4477 5 18 4.55228 18 4C18 3.44772 18.4477 3 19 3C19.5523 3 20 3.44772 20 4Z"
								stroke="#6C7A8B"
								stroke-width="1.5"
							/>
							<path
								d="M20 10C20 10.5523 19.5523 11 19 11C18.4477 11 18 10.5523 18 10C18 9.44772 18.4477 9 19 9C19.5523 9 20 9.44772 20 10Z"
								stroke="#6C7A8B"
								stroke-width="1.5"
							/>
							<path
								d="M20 16C20 16.5523 19.5523 17 19 17C18.4477 17 18 16.5523 18 16C18 15.4477 18.4477 15 19 15C19.5523 15 20 15.4477 20 16Z"
								stroke="#6C7A8B"
								stroke-width="1.5"
							/>
						</svg>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Dialer;
