import { useState } from "react";
import styles from "./Dialer.module.scss";
import TransferCallCard from "../TransferCallCard";

import { useSelector } from "react-redux";

import dummyProfileImg from "./../../../assets/images/img/dummy/profile.png";
import PhoneAddIcon from "./../../../components/UI/Icons/Call/CallAdd";
import CallTransferIcon from "./../../../components/UI/Icons/Call/CallTransfer";
import CallCameraIcon from "./../../../components/UI/Icons/Call/CallCamera";
import CallMergeIcon from "components/UI/Icons/Call/CallMerge";
import CallDialpad from "components/UI/Icons/Call/CallDialpad";
import CallEndIcon from "components/UI/Icons/Call/CallEnd";
import CallHoldIcon from "components/UI/Icons/Call/CallHold";
import CallMicOffIcon from "components/UI/Icons/Call/CallMicOff";
import { callNumber } from "redux/call/callSelectors";
import CallVolume from "components/UI/Icons/Call/CallVolume";
import sip from "../../../lib/sip";
import DTMF from "../DTMF";
import { store } from "redux/store";
import { useDispatch } from "react-redux";
import { setCallNumber } from "redux/call/callSlice";
import AddCall from "../AddCall";
import TransferCall from "../TransferCall";
import Setting from "components/UI/Icons/Call/Setting";
import AudioSettingOnCallModal from "../AudioSettingOnCallModal";
import { emptyFunction, nameIcon } from "utils";
import CallConference from "components/UI/Icons/Call/CallConference";
import ConferenceCallsList from "../ConferenceCallsList";
import Button from "components/UI/Forms/Button";
import { Slide, toast } from "react-toastify";
import { useTheme } from "hooks/useTheme";

const Dialer = () => {
	const [isTransferButtonClicked, setIsTransferButtonClicked] = useState(false);
	// style for state update
	const IconActiveStyle = { background: "var(--background-tertiary, #f7f9fc)" };
	const IconDisableStyle = {
		border: "1px solid var(--border-disabled, #c8d3e0)",
	};
	const dispatch = useDispatch();
	// dispatch(setCallNumber(""));
	const transferCallHandler = () => {
		setIsTransferButtonClicked(!isTransferButtonClicked);
	};
	const theme = useTheme();
	const showAddConferenceCall = (LineNumber: number, showAddConferenceCall = true) => {
		store.dispatch({
			type: "sip/answeredCalls",
			payload: {
				action: "showAddConferenceCall",
				data: { lineNum: LineNumber, showAddConferenceCall: showAddConferenceCall },
			},
		});
		dispatch(setCallNumber(""));
	};
	const showConferenceCallsList = (LineNumber: number, showConferenceCallsList = true) => {
		store.dispatch({
			type: "sip/answeredCalls",
			payload: {
				action: "showConferenceCallsList",
				data: { lineNum: LineNumber, showConferenceCallsList: showConferenceCallsList },
			},
		});
		dispatch(setCallNumber(""));
	};
	const { answeredCalls, answeredCallActive, ringingOutboundCalls, ringingOutboundCallActive, activeCallLineNumber } =
		useSelector((state: any) => state.sip);
	// const [volume, setVolumeButtonClicked] = useState(false)
	// const volumeButtonHandler = ()=>{
	// 	setVolumeButtonClicked(!volume)
	// }
	for (const item of [...answeredCalls, ...ringingOutboundCalls]) {
		// if(answeredCallActive === item.LineNumber || ringingOutboundCallActive === item.LineNumber){
		if (activeCallLineNumber === item.LineNumber || activeCallLineNumber === item.LineNumber) {
			return (
				(item.showDTMF && <DTMF LineNumber={item.LineNumber} />) ||
				((item.showAddCall || item.showAddConferenceCall) && (
					<AddCall
						LineNumber={item.LineNumber}
						forConferenceCall={item.showAddConferenceCall}
						conferenceCallList={item.conferenceCallList}
					/>
				)) ||
				(item.showTransferCall && <TransferCall LineNumber={item.LineNumber} attTransfer={false} />) ||
				(item.showTransferCallAtt && <TransferCall LineNumber={item.LineNumber} attTransfer={true} />) || (
					<section className={styles.dialer}>
						{item.audioSettingOnCallModal && (
							<AudioSettingOnCallModal
								LineNumber={item.LineNumber}
								volumeLevel={item.volumeLevel}
								callSpeakerDevice={item.callSpeakerDevice}
								callMicrophoneDevice={item.callMicrophoneDevice}
							/>
						)}

						{item.showConferenceCallsList ? (
							<ConferenceCallsList
								LineNumber={item.LineNumber}
								conferenceCallList={item.conferenceCallList}
								host2={{
									startTime: item.startTime,
									callTimer: item.callTimer,
									callTimerConf: item.callTimerConf,
									displayNumber: item.DisplayNumber,
									displayName: item.DisplayName ? item.DisplayName : item.DisplayNumber,
									disposition: item.disposition,
								}}
							/>
						) : null}

						<div className={styles.dialer_detailsBox}>
							{false && <img src={dummyProfileImg} alt="" className={styles.backgroundImg} />}
							{true && (
								<div
									className={styles.backgroundColor}
									style={{ backgroundColor: "var(--accent-blue-tertiary, #ECF5FE)" }}></div>
							)}

							<div className={styles.dialer_details}>
								<div className={`large_title ${styles.dialer_profile}`}>
									{false ? (
										<img src="/img/dummy/profile96.png" alt=""></img>
									) : (
										<span>
											{!item.conferenceCallList &&
												(item.DisplayName ? nameIcon(item.DisplayName) : nameIcon(item.DisplayNumber))}
										</span>
									)}
								</div>
								{item.conferenceCallList ? (
									<p className={`title_1`} style={{ color: "var(--text-primary, #1F2023)" }}>
										Conference
									</p>
								) : (
									<>
										<p className={`title_1`} style={{ color: "var(--text-primary, #1F2023)" }}>
											{item.DisplayName}
										</p>
										<p className={`title_3`} style={{ color: "var(--text-secondary, #5C6168)" }}>
											{item.DisplayNumber}
										</p>
									</>
								)}

								{/* add the condition here for dialing  */}

								{!item.callTimer ? (
									<p className={styles.title_3} style={{ color: "var(--text-secondary, #5C6168)" }}>
										Dialing...
									</p>
								) : (
									<div className={`bold ${styles.dialer_timer}`} style={{ color: "var(--text-primary, #1F2023)" }}>
										{item.callTimer}
									</div>
								)}
								{item.conferenceCallList && (
									<div className={styles.Members}>
										<Button
											onClick={() => {
												showConferenceCallsList(item.LineNumber, item.conferenceCallList);
											}}
											border
											styles={{ padding: "5px", borderColor: "var(--text-link)" }}>
											<>Members: {item.conferenceCallList?.filter((element: { disposition: string; }) => element.disposition!== "Bye" ).length + 1}</>
										</Button>
									</div>
								)}
							</div>
						</div>
						<div className={styles.dialer_box}>
							<div className={styles.dialer_actionBox}>
								<div
									className={styles.dialer_action}
									onClick={() => {
										item.answered &&
											store.dispatch({
												type: "sip/answeredCalls",
												payload: { action: "showAddCall", data: { lineNum: item.LineNumber, showAddCall: true } },
											});
										dispatch(setCallNumber(""));
									}}>
									<span className={styles.dialer_icon} style={false ? IconActiveStyle : IconDisableStyle}>
										<PhoneAddIcon answered={item.answered} fill={""} />
									</span>
									<p className={`caption_2 ${styles.dialer_text}`} style={{ color: "var(--text-primary, #1F2023)" }}>
										Add Call
									</p>
								</div>
								{!item.mergedOnGroup && <div
									className={styles.dialer_action}
									onClick={() => {
										item.answered
											? item.conferenceCallList
												? showConferenceCallsList(item.LineNumber, item.conferenceCallList)
												: showAddConferenceCall(item.LineNumber)
											: emptyFunction();
									}}>
									<span
										className={styles.dialer_icon}
										style={
											item.conferenceCallList ? { background: "var(--background-danger, #FFEBEB)" } : IconDisableStyle
										}>
										<CallConference answered={item.answered} />
									</span>
									<p className={`caption_2 ${styles.dialer_text}`} style={{ color: "var(--text-primary, #1F2023)" }}>
										Conference
									</p>
								</div>}
								{/* check if this icon works too */}
								{/* <div className={styles.dialer_action}>
									<span className={styles.dialer_icon} style={false ? IconActiveStyle : IconDisableStyle}>
										<CallMergeIcon />
									</span>
									<p className={`caption_2 ${styles.dialer_text}`} style={{ color: "var(--text-primary, #1F2023)" }}>
										Merge Call
									</p>
								</div> */}
								{!item.conferenceCallList && (
									<div
										className={styles.dialer_action}
										style={{ position: "relative" }}
										// onClick={() => {
										// 	setIsTransferButtonClicked(!isTransferButtonClicked);
										// }}
									>
										<span
											className={styles.dialer_icon}
											style={false ? IconActiveStyle : IconDisableStyle}
											onClick={() => {
												item.answered && transferCallHandler();
											}}>
											{/* check if this icon works */}
											<CallTransferIcon answered={item.answered} />
										</span>
										<p className={`caption_2 ${styles.dialer_text}`} style={{ color: "var(--text-primary, #1F2023)" }}>
											Transfer
										</p>
										{isTransferButtonClicked && item.answered && (
											<TransferCallCard transferBtn={setIsTransferButtonClicked} LineNumber={item.LineNumber} />
										)}
									</div>
								)}
								{/* check if this icon works or not */}
								{/* <div className={styles.dialer_action}>
									<span className={styles.dialer_icon} style={false ? IconActiveStyle : IconDisableStyle}>
										<CallCameraIcon />
									</span>
									<p className={`caption_2 ${styles.dialer_text}`} style={{ color: "var(--text-primary, #1F2023)" }}>
										Video
									</p>
								</div> */}
								<div
									className={styles.dialer_action}
									onClick={() => {
										if (item.conferenceCallList) {
											sip.muteConference(item.LineNumber, item.isMute);
										} else {
											sip.mute(item.LineNumber, item.isMute);
										}
									}}>
									<span
										className={styles.dialer_icon}
										style={item.isMute ? { background: "var(--background-danger, #FFEBEB)" } : IconDisableStyle}>
										<CallMicOffIcon isMute={item.isMute} answered={true} />
									</span>
									<p className={`caption_2 ${styles.dialer_text}`} style={{ color: "var(--text-primary, #1F2023)" }}>
										{item.isMute ? "Unmute" : "Mute"}
									</p>
								</div>
								{!item.conferenceCallList && (
									<div
										className={styles.dialer_action}
										onClick={() => {
											item.answered && sip.hold(item.LineNumber, item.isHold);
										}}>
										<span
											className={styles.dialer_icon}
											style={
												item.isHold
													? { background: "#f0f8ff", border: "1px solid var(--border-disabled, #c8d3e0)" }
													: IconDisableStyle
											}>
											<CallHoldIcon isHold={item.isHold} answered={item.answered} />
										</span>
										<p className={`caption_2 ${styles.dialer_text}`} style={{ color: "var(--text-primary, #1F2023)" }}>
											{item.isHold ? "Resume" : "Hold"}
										</p>
									</div>
								)}
								<div
									className={styles.dialer_action}
									onClick={() => {
										item.answered &&
											store.dispatch({
												type: "sip/answeredCalls",
												payload: {
													action: "audioSettingOnCallModal",
													data: { lineNum: item.LineNumber, audioSettingOnCallModal: true },
												},
											});
									}}>
									<span
										className={styles.dialer_icon}
										style={
											item.audioSettingOnCallModal
												? { background: "#f0f8ff", border: "1px solid var(--border-disabled, #c8d3e0)" }
												: IconDisableStyle
										}>
										<CallVolume volumeLevel={item.volumeLevel} answered={item.answered} />
									</span>
									<p className={`caption_2 ${styles.dialer_text}`} style={{ color: "var(--text-primary, #1F2023)" }}>
										{"Volume"}
									</p>
								</div>
							</div>
							<div className={styles.dialer_actionBox}>
								<div className={styles.dialer_control}>
									<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
										<g id="line / add_user">
											<path
												id="Vector"
												d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H6C4.93913 15 3.92172 15.4214 3.17157 16.1716C2.42143 16.9217 2 17.9391 2 19V21M19 8V14M22 11H16M13 7C13 9.20914 11.2091 11 9 11C6.79086 11 5 9.20914 5 7C5 4.79086 6.79086 3 9 3C11.2091 3 13 4.79086 13 7Z"
												stroke={true ? "#C8D3E0" : "#C8D3E0"}
												strokeWidth="1.5"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
										</g>
									</svg>
								</div>
								<div
									className={`${styles.dialer_control} ${styles.dialer_endButton}`}
									onClick={() => {
										if (item.conferenceCallList) {
											toast("Conference Ended by Host", {
												position: "top-right",
												autoClose: 3000,
												hideProgressBar: true,
												closeOnClick: true,
												pauseOnHover: true,
												draggable: true,
												progress: undefined,
												transition: Slide,
												theme: theme ? "dark" : "light", //"light","dark"
											});
											sip.hungupConference(item.LineNumber);
										} else {
											sip.hungup(item.LineNumber);
										}
									}}>
									<CallEndIcon />
								</div>
								<div
									className={styles.dialer_control}
									onClick={() => {
										item.answered &&
											store.dispatch({
												type: "sip/answeredCalls",
												payload: { action: "showDTMF", data: { lineNum: item.LineNumber, showDTMF: true } },
											});
										dispatch(setCallNumber(""));
									}}>
									<CallDialpad />
								</div>
							</div>
						</div>
					</section>
				)
			);
		}
	}
};

export default Dialer;
