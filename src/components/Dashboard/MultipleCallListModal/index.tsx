import Button from "components/UI/Forms/Button";
import styles from "./MultipleCallListModal.module.scss";
import { useSelector } from "react-redux";
import { store } from "redux/store";
import sip from "lib/sip";
import XIcon from "components/UI/Icons/X";
import MergeCallIcon from "components/UI/Icons/VideoCall/MergeCall";
import ChevronDownIcon from "components/UI/Icons/Navigation/ChevronDown";
import EndCallIcon from "components/UI/Icons/VideoCall/EndCall";
import { Slide, toast } from "react-toastify";
import { useTheme } from "hooks/useTheme";

const MultipleCallListModal = () => {
	const { ringingInboundCalls, answeredCalls, ringingOutboundCalls, activeCallLineNumber } = useSelector(
		(state: any) => state.sip,
	);
	const merged = (call: { mergedOnGroup: number | undefined }) => {
		return call.mergedOnGroup ? true : false;
	};
	const notMerged = (call: { mergedOnGroup: number | undefined }) => {
		return !merged(call);
	};
	const theme = useTheme();

	return (
		<div className={styles.layer1}>
			<div
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

					<div>
						{[...ringingInboundCalls].map((call: any) => (
							<div>
								<button
									key={call.LineNumber}
									className={styles.callsListBtn}
									onClick={() => {
										sip.selectLine(call.LineNumber);
										store.dispatch({ type: "sip/showMultipleCallListModal", payload: false });
									}}>
									<div>
										<p>{call.conferenceCallList ? "Conference" : call.DisplayNumber}</p>
										<span>{call.answered ? call.callTimer : "00:00"}</span>
									</div>
									<span>
										<span>Ringing</span>
									</span>
								</button>
							</div>
						))}
						{[...ringingOutboundCalls].map((call: any) => (
							<div>
								<button
									key={call.LineNumber}
									className={styles.callsListBtn}
									onClick={() => {
										sip.selectLine(call.LineNumber);
										store.dispatch({ type: "sip/showMultipleCallListModal", payload: false });
									}}>
									<div>
										<p>{call.conferenceCallList ? "Conference" : call.DisplayNumber}</p>
										<span>{call.answered ? call.callTimer : "00:00"}</span>
									</div>
									<span>
										<span>Dialling</span>
									</span>
								</button>
							</div>
						))}
						{[...answeredCalls].filter(notMerged).map((call: any) => (
							<div>
								<button
									key={call.LineNumber}
									className={styles.callsListBtn}
									onClick={() => {
										sip.selectLine(call.LineNumber);
										store.dispatch({ type: "sip/showMultipleCallListModal", payload: false });
									}}>
									<div>
										<p>{call.conferenceCallList ? "Conference" : call.DisplayNumber}</p>
										<span>{call.answered ? call.callTimer : "00:00"}</span>
									</div>
									{!sip.isConferenceCall(activeCallLineNumber) &&
										activeCallLineNumber !== call.LineNumber &&
										sip.isAnswered(activeCallLineNumber) &&
										!call.conferenceCallList && (
											<span>
												<span>
													{call.mergedOnGroup ? (
														<span>{call.mergedOnGroup}</span>
													) : (
														<>
															<div className={styles.mergeBtn}>
																<Button
																	onClick={(e) => {
																		e.stopPropagation();
																		sip.merge(call.LineNumber, activeCallLineNumber);
																	}}
																	icon={<MergeCallIcon />}>
																	MERGE
																</Button>
															</div>
														</>
													)}
												</span>
											</span>
										)}
								</button>
							</div>
						))}
						{[...answeredCalls]
							.filter(merged)
							.map((item) => item.mergedOnGroup)
							.filter((value, index, self) => self.indexOf(value) === index)
							.map((item: any) => (
								<div className={styles.mergedCalls}>
									<p>
										Merged
										<ChevronDownIcon />
									</p>
									{[...answeredCalls]
										.filter((x) => x.mergedOnGroup === item)
										.map((call: any) => (
											<div>
												<button
													className={styles.callsListBtn}
													key={call.LineNumber}
													onClick={() => {
														sip.selectLine(call.LineNumber);
														store.dispatch({ type: "sip/showMultipleCallListModal", payload: false });
													}}>
													<div>
														<p>{call.conferenceCallList ? "Conference" : call.DisplayNumber}</p>
														<span>{call.answered ? call.callTimer : "00:00"}</span>
													</div>
													<section className={styles.actBtnWrap}>
														{!sip.isConferenceCall(activeCallLineNumber) &&
															activeCallLineNumber !== call.LineNumber &&
															sip.isAnswered(activeCallLineNumber) &&
															!sip.isMerged(activeCallLineNumber) &&
															!call.conferenceCallList && (
																<span>
																	<span className={styles.actBtns}>
																		{/* // call.mergedOnGroup?<span>{call.mergedOnGroup}</span>: */}
																		<span className={styles.mergeBtnWrapper}>
																			<Button
																				onClick={(e) => {
																					e.stopPropagation();
																					sip.merge(activeCallLineNumber, call.LineNumber);
																				}}
																				icon={<MergeCallIcon />}>
																				MERGE
																			</Button>
																		</span>
																	</span>
																</span>
															)}
														<span className={styles.endCallBtn}>
															<Button
																onClick={(e) => {
																	e.stopPropagation();
																	if (call.conferenceCallList) {
																		toast("Conference Ended by Host", {
																			position: "top-right",
																			autoClose: 3000,
																			hideProgressBar: true,
																			closeOnClick: true,
																			pauseOnHover: true,
																			draggable: true,
																			progress: undefined,
																			transition: Slide,
																			theme: theme ? "dark" : "light",
																		});
																		sip.hungupConference(call.LineNumber);
																	} else {
																		sip.hungup(call.LineNumber);
																	}
																}}>
																<EndCallIcon />
															</Button>
														</span>
													</section>
												</button>
											</div>
										))}
								</div>
							))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default MultipleCallListModal;
