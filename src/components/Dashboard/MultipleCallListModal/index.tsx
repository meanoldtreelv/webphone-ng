import Button from "components/UI/Forms/Button";
import styles from "./MultipleCallListModal.module.scss";
import { useSelector } from "react-redux";
import { store } from "redux/store";
import sip from "lib/sip";
const MultipleCallListModal = () => {
	const { ringingInboundCalls, answeredCalls, ringingOutboundCalls, activeCallLineNumber } =
		useSelector((state: any) => state.sip);
	return (
		<div className={styles.layer1}>
			<div style={{position: "fixed",bottom: "0px",left: "0px",height: "100vh",width: "100%"}}
				onClick={()=>{store.dispatch({type:"sip/showMultipleCallListModal", payload:false})}}>
			</div>
			<div className={styles.layer2}>
				<div className={styles.layer3}>
					<div className={styles.x} onClick={()=>{store.dispatch({type:"sip/showMultipleCallListModal", payload:false})}}>X</div>
					<h2 className={styles.h2}>Select Call</h2>
					
					<div style={{ gap: "0.5rem", display: "flex", flexDirection: "column" , overflow: "auto", maxHeight: "18rem", paddingTop: "12px"}}>
						{[...ringingInboundCalls, ...answeredCalls, ...ringingOutboundCalls].map((call: any) => (
							<Button onClick={()=>{sip.selectLine(call.LineNumber); store.dispatch({type:"sip/showMultipleCallListModal", payload:false})}} key={call.LineNumber} styles={{ justifyContent: "flex-start",  backgroundColor:activeCallLineNumber===call.LineNumber?"#e3effa":"" }} border>
								<div style={{width: "100%" }}>
									<span style={{ paddingLeft: "30px", float: "left" }}>{call.DisplayNumber}</span>
									<span style={{ paddingLeft: "30px", float: "right" }}>{call.answered ? call.callTimer: "00:00"}</span>
								</div>
							</Button>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default MultipleCallListModal;
