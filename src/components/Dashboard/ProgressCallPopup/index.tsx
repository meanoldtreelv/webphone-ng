import { useNavigate } from "react-router-dom";
import styles from "./ProgressCallPopUpBar.module.scss";
import { useSelector } from "react-redux";

const ProgressCallPopUpBar = () => {
	const { ringingInboundCalls, answeredCalls, ringingOutboundCalls, activeCallLineNumber } = useSelector((state: any) => state.sip);
	const navigate = useNavigate();
	return (
			[...ringingInboundCalls, ...answeredCalls, ...ringingOutboundCalls].map((call: any) => (
				(activeCallLineNumber == call.LineNumber && 
					<div className={styles.bar} onClick={() => { navigate("/dashboard") }}>
						<div className={styles.bar_info}>
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
								<path
									d="M14.6666 11.2802V13.2802C14.6674 13.4659 14.6293 13.6497 14.555 13.8198C14.4806 13.9899 14.3715 14.1426 14.2347 14.2681C14.0979 14.3937 13.9363 14.4892 13.7605 14.5487C13.5846 14.6082 13.3982 14.6303 13.2133 14.6136C11.1618 14.3907 9.19129 13.6897 7.45995 12.5669C5.84917 11.5433 4.48351 10.1777 3.45995 8.56689C2.33327 6.8277 1.63212 4.84756 1.41329 2.78689C1.39663 2.60254 1.41854 2.41673 1.47762 2.24131C1.53671 2.06589 1.63167 1.90469 1.75647 1.76797C1.88126 1.63126 2.03316 1.52203 2.20248 1.44724C2.37181 1.37245 2.55485 1.33374 2.73995 1.33356H4.73995C5.06349 1.33038 5.37715 1.44495 5.62246 1.65592C5.86778 1.86689 6.02801 2.15986 6.07329 2.48023C6.1577 3.12027 6.31425 3.74871 6.53996 4.35356C6.62965 4.59218 6.64906 4.8515 6.59589 5.10081C6.54272 5.35012 6.4192 5.57897 6.23995 5.76023L5.39329 6.60689C6.34233 8.27592 7.72426 9.65786 9.39329 10.6069L10.24 9.76023C10.4212 9.58099 10.6501 9.45746 10.8994 9.40429C11.1487 9.35112 11.408 9.37053 11.6466 9.46023C12.2515 9.68593 12.8799 9.84248 13.52 9.9269C13.8438 9.97258 14.1396 10.1357 14.351 10.3852C14.5624 10.6348 14.6747 10.9533 14.6666 11.2802Z"
									fill="white"
								/>
							</svg>

							<span>Call in progress...</span>
						</div>
						<div className={styles.callName}>{call.conferenceCallList? "Conference" : (call.DisplayName? call.DisplayName : call.DisplayNumber)} </div>
						<div className={styles.callDuration}>{call.answered ? call.callTimer : "00:00"}</div>
					</div>
				)))
	);
};

export default ProgressCallPopUpBar;
