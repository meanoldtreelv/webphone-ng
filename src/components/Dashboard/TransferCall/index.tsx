import styles from "./TransferCall.module.scss";
import Dialpad from "../Dialpad";
import { useDispatch } from "react-redux";
import { transferCall } from "redux/call/callSlice";

const TransferCall = () => {
	const dispatch = useDispatch();

	const transferCallHandler = () => {
		dispatch(transferCall());
	}

	const transferAttendedCallHandler = () => {
		dispatch(transferCall());
	}

	return (
		<section className={styles.dialpad_container}>
			<p className={`sub_headline_bold ${styles.dialpad_transferCall}`}>Transfer Call</p>

			<div className={styles.dialpad}>
				<Dialpad />
				<div className={styles.dialpad_keypad}>
					<div className={styles.dialpad_key2}>
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
							<path
								d="M14.5 6L8.5 12L14.5 18"
								stroke="#6C7A8B"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</div>
					<div
						className={styles.dialpad_key2}
						style={{ background: "var(--primary-disabled, #C8D3E0)" }}
						onClick={transferCallHandler}>
						<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
							<g id="fill / call_transfer">
								<g id="Vector">
									<path
										d="M25.3333 2.6665L30.6667 7.99984L25.3333 13.3332V9.33317H18.6667V6.6665L25.3333 6.6665V2.6665Z"
										fill="white"
									/>
									<path
										d="M29.3333 26.56V22.56C29.3495 21.9061 29.1248 21.269 28.702 20.77C28.2791 20.2709 27.6876 19.9447 27.0399 19.8533C25.7598 19.6845 24.5029 19.3714 23.2933 18.92C22.816 18.7406 22.2974 18.7018 21.7987 18.8081C21.3001 18.9144 20.8424 19.1615 20.4799 19.52L18.7866 21.2133C15.4485 19.3152 12.6847 16.5514 10.7866 13.2133L12.4799 11.52C12.8384 11.1574 13.0855 10.6998 13.1918 10.2011C13.2981 9.70252 13.2593 9.18387 13.0799 8.70663C12.6285 7.49694 12.3154 6.24006 12.1466 4.95997C12.056 4.31923 11.7356 3.73328 11.2449 3.31134C10.7543 2.8894 10.127 2.66026 9.47992 2.66663H5.47992C5.10971 2.66698 4.74362 2.74441 4.40498 2.894C4.06633 3.04358 3.76254 3.26204 3.51294 3.53546C3.26335 3.80889 3.07342 4.13128 2.95525 4.48213C2.83709 4.83298 2.79327 5.20459 2.82659 5.5733C3.26424 9.69463 4.66656 13.6549 6.91992 17.1333C8.96704 20.3549 11.6984 23.0862 14.9199 25.1333C18.3826 27.3788 22.3237 28.7808 26.4266 29.2266C26.7964 29.2601 27.1692 29.2159 27.5209 29.0969C27.8727 28.9779 28.1957 28.7868 28.4694 28.5358C28.743 28.2848 28.9612 27.9793 29.1099 27.6391C29.2587 27.2989 29.3348 26.9313 29.3333 26.56Z"
										fill="white"
									/>
								</g>
							</g>
						</svg>
					</div>
					<div className={styles.dialpad_key2} onClick={transferAttendedCallHandler}>
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M23.5 19C23.5 19.3978 23.342 19.7794 23.0607 20.0607C22.7794 20.342 22.3978 20.5 22 20.5H7.07036C6.56883 20.5 6.10049 20.2494 5.82229 19.8321L0.785831 12.2775C0.673863 12.1095 0.673862 11.8907 0.785831 11.7228L5.8223 4.16814C6.10049 3.75085 6.56883 3.50021 7.07035 3.5002L22 3.5C22.3978 3.5 22.7794 3.65804 23.0607 3.93934C23.342 4.22064 23.5 4.60218 23.5 5V19Z"
								stroke="#C8D3E0"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path
								d="M10.875 8.875L17.125 15.125M17.125 8.875L10.875 15.125"
								stroke="#C8D3E0"
								strokeWidth="1.5"
								strokeLinecap="round"
							/>
						</svg>
					</div>
				</div>
			</div>
		</section>
	);
};

export default TransferCall;
