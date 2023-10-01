import Dialpad from "../Dialpad";
import styles from "./Keypad.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { progressCall, setCallNumber } from "./../../../redux/call/callSlice";
import BackspaceIcon from "./../../../components/UI/Icons/Backspace";
import Button from "./../../../components/UI/Forms/Button";
import { callNumber } from "./../../../redux/call/callSelectors";
import sip from "../../../lib/sip"

const Keypad = () => {
	const dispatch = useDispatch();
	const number = useSelector(callNumber);

	const callingHandler = () => {
		// dispatch(progressCall());
	}

	const modifyNumber = () => {
		if (number.length) {
			const modified_number = number.slice(0, number.length - 1);
			dispatch(setCallNumber(modified_number));
		}
	};

	return (
		<div className={styles.dialpad}>
			<Dialpad LineNumber={undefined} />
			<div className={styles.dialpad_keypad}>
				<div className={styles.dialpad_key2}>
					{/* here lies add user icon, pass props and use the icon */}
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<g id="line / add_user">
							<path
								id="Vector"
								d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H6C4.93913 15 3.92172 15.4214 3.17157 16.1716C2.42143 16.9217 2 17.9391 2 19V21M19 8V14M22 11H16M13 7C13 9.20914 11.2091 11 9 11C6.79086 11 5 9.20914 5 7C5 4.79086 6.79086 3 9 3C11.2091 3 13 4.79086 13 7Z"
								stroke="#C8D3E0"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</g>
					</svg>
				</div>
				<div
					className={styles.dialpad_key2}
					style={{ background: number.length? "#75c322" : "var(--primary-disabled, #C8D3E0)"}}
					onClick={()=>{sip.call(number)}}>
					{/* here lies phone icon, pass props and use the component accordingly */}
					<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
						<g id="fill / phone">
							<path
								id="Vector"
								d="M32.9999 25.3801V29.8801C33.0016 30.2979 32.916 30.7114 32.7487 31.0942C32.5813 31.4769 32.3358 31.8205 32.028 32.1029C31.7202 32.3854 31.3568 32.6004 30.961 32.7342C30.5653 32.868 30.146 32.9177 29.7299 32.8801C25.1142 32.3786 20.6804 30.8014 16.7849 28.2751C13.1606 25.9721 10.0879 22.8994 7.7849 19.2751C5.24987 15.362 3.67226 10.9066 3.1799 6.27015C3.14242 5.85535 3.19171 5.43729 3.32465 5.04258C3.45759 4.64788 3.67126 4.28518 3.95205 3.97758C4.23284 3.66997 4.57461 3.42421 4.95559 3.25593C5.33657 3.08765 5.74841 3.00054 6.1649 3.00015H10.6649C11.3929 2.99298 12.0986 3.25076 12.6505 3.72544C13.2025 4.20013 13.563 4.85932 13.6649 5.58015C13.8548 7.02025 14.2071 8.43424 14.7149 9.79515C14.9167 10.332 14.9604 10.9155 14.8408 11.4765C14.7211 12.0374 14.4432 12.5523 14.0399 12.9601L12.1349 14.8651C14.2702 18.6205 17.3796 21.7298 21.1349 23.8651L23.0399 21.9601C23.4477 21.5569 23.9626 21.2789 24.5236 21.1593C25.0845 21.0397 25.668 21.0833 26.2049 21.2851C27.5658 21.793 28.9798 22.1452 30.4199 22.3351C31.1486 22.4379 31.814 22.805 32.2897 23.3664C32.7654 23.9278 33.0182 24.6445 32.9999 25.3801Z"
								fill="white"
							/>
						</g>
					</svg>
				</div>
				<div >
					<button className={styles.dialpad_key2} onClick={modifyNumber}>
						<BackspaceIcon />
					</button>
					{/* replace the above button with this, the above is only for testing */}
					{/* <Button>
					</Button> */}
				</div>
			</div>
		</div>
	);
};

export default Keypad;
