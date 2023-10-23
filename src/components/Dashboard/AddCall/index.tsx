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

const AddCall = ({LineNumber}:{LineNumber:number}) => {
	const dispatch = useDispatch();
	const number = useSelector(callNumber)

	const modifyNumber = () => {
		if(number.length) {
			const modified_number = number.slice(0, number.length - 1);
			dispatch(setCallNumber(modified_number));
		}
	}
	const showAddCall = ()=>{
		store.dispatch({type:"sip/answeredCalls", payload:{action:"showAddCall",data:{lineNum:LineNumber, showAddCall:false}}})
	}
	const addCall = () =>{
		sip.addCall(LineNumber, number)
		showAddCall();
	}
	return (
		<section className={styles.dialpad_container}>
			<h2 className={styles.dialpad_addCall}>Add Call</h2>

			<div className={styles.dialpad}>
				<Dialpad LineNumber={undefined} />
				<div className={styles.dialpad_keypad}>
					<div className={styles.dialpad_key2} onClick={showAddCall}>
						<ChevronLeftIcon />
					</div>
					<div className={styles.dialpad_key2} onClick={addCall} style={{ background: number.length? "#0c6dc7" : "var(--primary-disabled, #C8D3E0)"}}>
						<PhoneAddIcon answered={true} fill={"#fff"} />
					</div>
					<div className={styles.dialpad_key2} onClick={modifyNumber}>
						<BackspaceIcon active={number.length>0}/>
					</div>
				</div>
			</div>
		</section>
	);
};

export default AddCall;
