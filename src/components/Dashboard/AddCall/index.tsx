import styles from "./AddCall.module.scss";
import Dialpad from "../Dialpad";
import PhoneAddIcon from "./../../../components/UI/Icons/Call/CallAdd";
import BackspaceIcon from "./../../../components/UI/Icons/Backspace";
import ChevronLeftIcon from "./../../../components/UI/Icons/Navigation/ChevronLeft";
import { setCallNumber } from "redux/call/callSlice";
import { callNumber } from "redux/call/callSelectors";
import { useDispatch, useSelector } from "react-redux";
import { store } from "redux/store";
import sip from "lib/sip";
import CallEndIcon from "components/UI/Icons/Call/CallEnd";

const AddCall = ({LineNumber, forConferenceCall=false, conferenceCallList=undefined}:{LineNumber:number, forConferenceCall?:boolean, conferenceCallList?:any}) => {
	const dispatch = useDispatch();
	const number = useSelector(callNumber)

	const modifyNumber = () => {
		if(number.length) {
			const modified_number = number.slice(0, number.length - 1);
			dispatch(setCallNumber(modified_number));
		}
	}
	const close = ()=>{
		if(forConferenceCall == true){
			store.dispatch({type:"sip/answeredCalls", payload:{action:"showAddConferenceCall",data:{lineNum:LineNumber, showAddConferenceCall:false}}})
		}else{
			store.dispatch({type:"sip/answeredCalls", payload:{action:"showAddCall",data:{lineNum:LineNumber, showAddCall:false}}})
		}
	}
	const addCall = () =>{
		sip.addCall(LineNumber, number)
		close();
	}
	const showConferenceCallsList = () => {
		store.dispatch({
			type: "sip/answeredCalls",
			payload: { action: "showConferenceCallsList", data: { lineNum: LineNumber, showConferenceCallsList: true } },
		});
	}
	const addConference = () =>{
		sip.conference(LineNumber, number)
		showConferenceCallsList()
		close()
	}
	const cancelConference = () =>{
		sip.cancelConference(LineNumber)
	}
	return (
		<section className={styles.dialpad_container}>
			<h2 className={styles.dialpad_addCall}>{forConferenceCall? "Add Call To Conference" : "Add Call"}</h2>

			<div className={styles.dialpad}>
				<Dialpad LineNumber={undefined} />
				<div className={styles.dialpad_keypad}>
					<div className={styles.dialpad_key2} onClick={close}>
						<ChevronLeftIcon />
					</div>
					<div className={styles.dialpad_key2} onClick={forConferenceCall? addConference : addCall} style={{ background: number.length? "#0c6dc7" : "var(--primary-disabled, #C8D3E0)"}}>
						{forConferenceCall?<PhoneAddIcon answered={true} fill={"#fff"} />:<PhoneAddIcon answered={true} fill={"#fff"} />}
					</div>
					<div className={styles.dialpad_key2} onClick={modifyNumber}>
						<BackspaceIcon active={number.length>0}/>
					</div>
				</div>
			</div>
			
			{ conferenceCallList && false &&
				<div className={styles.layer1}>
					<div
						style={{ position: "fixed", bottom: "0px", left: "0px", height: "100vh", width: "100%" }}
						onClick={close}>
					</div>
					<div className={styles.layer2}>
						<div className={styles.layer3}>
							<div className={`${styles.control} ${styles.endButton}`} onClick={cancelConference}>
								<CallEndIcon />
							</div>
						</div>
					</div>
				</div>
			}
		</section>
	);
};

export default AddCall;
