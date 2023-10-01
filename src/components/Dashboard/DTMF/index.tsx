import styles from "./DTMF.module.scss";
import Dialpad from "../Dialpad";
import BackspaceIcon from "./../../../components/UI/Icons/Backspace";
import ChevronLeftIcon from "./../../../components/UI/Icons/Navigation/ChevronLeft";
import { useDispatch, useSelector } from "react-redux";
import { callNumber } from "redux/call/callSelectors";
import { setCallNumber } from "redux/call/callSlice";
import CallEndIcon from "components/UI/Icons/Call/CallEnd";

const AddCall = () => {
	const dispatch = useDispatch();
	const number = useSelector(callNumber)


	const modifyNumber = () => {
		if(number.length) {
			const modified_number = number.slice(0, number.length - 1);
			dispatch(setCallNumber(modified_number));
		}
	}
	return (
		<section className={styles.dialpad_container}>
			<p className={`sub_headline_bold ${styles.dialpad_addCall}`}>Add Call</p>

			<div className={styles.dialpad}>
				<Dialpad />
				<div className={styles.dialpad_keypad}>
					<div className={styles.dialpad_key2}>
						<ChevronLeftIcon />
					</div>
					<div className={`${styles.dialpad_key2} ${styles.dialpad_endButton}`}>
						<CallEndIcon />
					</div>
					<div className={styles.dialpad_key2} onClick={modifyNumber}>
						<BackspaceIcon />
					</div>
				</div>
			</div>
		</section>
	);
};

export default AddCall;
