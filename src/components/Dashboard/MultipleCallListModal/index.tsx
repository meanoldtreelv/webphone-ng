import Button from "components/UI/Forms/Button";
import styles from "./MultipleCallListModal.module.scss";
import { useSelector } from "react-redux";
import { store } from "redux/store";
import sip from "lib/sip";
import XIcon from "components/UI/Icons/X";
import MergeCallIcon from "components/UI/Icons/VideoCall/MergeCall";
const MultipleCallListModal = () => {
	const { ringingInboundCalls, answeredCalls, ringingOutboundCalls, activeCallLineNumber } = useSelector(
		(state: any) => state.sip,
	);
	return (
		<div className={styles.layer1}>
			<div
				style={{ position: "fixed", bottom: "0px", left: "0px", height: "100vh", width: "100%" }}
				onClick={() => {
					store.dispatch({ type: "sip/showMultipleCallListModal", payload: false });
				}}></div>
			<div className={styles.layer2}>
				<div className={styles.layer3}>
					<div className={styles.layer3_header}>
						<h2 className={styles.h2}>Select Call</h2>
						<button
							onClick={() => {
								store.dispatch({ type: "sip/showMultipleCallListModal", payload: false });
							}}>
							<XIcon stroke="var(--icon-primary)" />
						</button>
					</div>

					<div
						style={{
							gap: "0.5rem",
							display: "flex",
							flexDirection: "column",
							overflow: "auto",
							maxHeight: "18rem",
							paddingTop: "12px",
						}}>
						{[...ringingInboundCalls, ...answeredCalls, ...ringingOutboundCalls].map((call: any) => (
							<div>
								<span
									key={call.LineNumber}
									style={{
										display: "flex",
										width: "100%",
										alignItems: "center",
										borderRadius: "8px",
										fontSize: "13px",
										justifyContent: "center",
										border: "1px solid #91a0b5",
										backgroundColor: activeCallLineNumber === call.LineNumber ? "var(--background-active)" : "",
									}}>
									<span 
										style={{ width: "100%" ,display: "grid", paddingLeft: "15px",cursor: "pointer",}}
										onClick={() => {
											sip.selectLine(call.LineNumber);
											store.dispatch({ type: "sip/showMultipleCallListModal", payload: false });
										}}>
										<div style={{ float: "left", fontWeight: "600", fontSize: "medium" }}>{call.conferenceCallList? "Conference": call.DisplayNumber}</div>
										<div style={{ paddingLeft: "10px", fontSize: "x-small"}}>{call.answered ? call.callTimer : "00:00"}</div>
									</span>
									{!sip.isConferenceCall(activeCallLineNumber) && activeCallLineNumber !== call.LineNumber && !call.conferenceCallList && <span>
										<span style={{ float: "right", display:"flex", }}>
											{
												call.mergedOnGroup?<span>{call.mergedOnGroup}</span>:
												<span>
													<Button onClick={()=>{
														console.log("merge call " + call.LineNumber + " with " + activeCallLineNumber)
														sip.merge(call.LineNumber, activeCallLineNumber)
														}} styles={{padding: "6px"}}><MergeCallIcon /></Button>
												</span>
											}
										</span>
									</span>}
								</span>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default MultipleCallListModal;
