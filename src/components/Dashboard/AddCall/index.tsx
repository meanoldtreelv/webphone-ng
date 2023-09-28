import styles from "./AddCall.module.scss";
import Dialpad from "../Dialpad";
import PhoneAddIcon from "./../../../components/UI/Icons/Call/CallAdd";
import BackspaceIcon from "./../../../components/UI/Icons/Backspace";
import ChevronLeftIcon from "./../../../components/UI/Icons/Navigation/ChevronLeft";

const AddCall = () => {
	return (
		<section className={styles.dialpad_container}>
			<h2 className={styles.dialpad_addCall}>Add Call</h2>

			<div className={styles.dialpad}>
				<Dialpad />
				<div className={styles.dialpad_keypad}>
					<div className={styles.dialpad_key2}>
						<ChevronLeftIcon />
					</div>
					<div className={styles.dialpad_key2}>
						<PhoneAddIcon />
					</div>
					<div className={styles.dialpad_key2}>
						<BackspaceIcon />
					</div>
				</div>
			</div>
		</section>
	);
};

export default AddCall;
