import Button from "components/UI/Forms/Button";
import styles from "./AudioSettingOnCallModal.module.scss";
import { useSelector } from "react-redux";
import { store } from "redux/store";
import sip from "lib/sip";
import Select from "components/UI/Forms/Select";
import { getCookie } from "utils";
import SpeakerIcon from "components/UI/Icons/Speaker";
const AudioSettingOnCallModal = ({
	LineNumber,
	volumeLevel,
	callSpeakerDevice = "",
}: {
	LineNumber: number;
	volumeLevel: number;
	callSpeakerDevice?: string;
}) => {
	const { speakerDevice } = useSelector((state: any) => state.sip);
	return (
		<div className={styles.layer1}>
			<div
				style={{ position: "fixed", bottom: "0px", left: "0px", height: "100vh", width: "100%" }}
				onClick={() => {
					store.dispatch({
						type: "sip/answeredCalls",
						payload: {
							action: "audioSettingOnCallModal",
							data: { lineNum: LineNumber, audioSettingOnCallModal: false },
						},
					});
				}}></div>
			<div className={styles.layer2}>
				<div className={styles.layer3}>
					<div
						className={styles.x}
						onClick={() => {
							store.dispatch({
								type: "sip/answeredCalls",
								payload: {
									action: "audioSettingOnCallModal",
									data: { lineNum: LineNumber, audioSettingOnCallModal: false },
								},
							});
						}}>
						X
					</div>
					<h2 className={styles.h2}>Audio Setting</h2>
					<div style={{ paddingTop: "6px" }}>
						<h2 className={`caption_1 `}>Playback Device</h2>
						<div style={{ gap: "0.5rem", overflow: "auto", maxHeight: "18rem" }}>
							{speakerDevice
								.map((x: any) => [{ name: x["label"], value: x["deviceId"] }])
								.map((y: any) => y[0])
								.map((x: any) => (
									<div
										style={{
											gap: "0.5rem",
											display: "flex",
											flexDirection: "column",
											overflow: "auto",
											maxHeight: "18rem",
											paddingTop: "12px",
										}}>
										<Button
											onClick={() => {
												sip.callSpeakerDevice(LineNumber, x.value);
											}}
											key={x.deviceId}
											styles={{
												justifyContent: "flex-start",
												backgroundColor: callSpeakerDevice === x.value ? "#e3effa" : "",
											}}
											border>
											<div style={{ width: "100%" }}>
												<span style={{ paddingLeft: "30px", float: "left" }}>{x.name}</span>
												{/* <span style={{ paddingLeft: "30px", float: "right" }}>{x.value}</span> */}
											</div>
										</Button>
									</div>
								))}
						</div>
						<h2 className={`caption_1 `} style={{ paddingTop: "10px" }}>
							Volume Level
						</h2>
						<input
							type="range"
							style={{ width: "100%", height: "2px" }}
							min="0"
							max="100"
							step="1"
							value={volumeLevel === undefined ? "100" : volumeLevel}
							onChange={(e) => {
								sip.volumeLevel(LineNumber, e.target.value);
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AudioSettingOnCallModal;

// store.dispatch({type:"sip/answeredCalls", payload:{action:"callSpeakerDevice",data:{lineNum:LineNumber, callSpeakerDevice:""}}})
