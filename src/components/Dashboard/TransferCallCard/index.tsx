import { store } from "redux/store";
import styles from "./TransferCallCard.module.scss";
import { setCallNumber } from "redux/call/callSlice";
import { useDispatch } from "react-redux";
import XIcon from "components/UI/Icons/X";

const TransferCallCard = ({
	LineNumber,
	transferBtn,
}: {
	LineNumber: number;
	transferBtn: (transfer: boolean) => void;
}) => {
	const dispatch = useDispatch();
	return (
		<div className={styles.transfer}>
			<div className={styles.cardTitle}>
				<span>Transfer</span>
				<button
					onClick={() => {
						transferBtn(false);
					}}>
					<XIcon />
				</button>
			</div>

			<button
				className={styles.cardOptions}
				onClick={() => {
					store.dispatch({
						type: "sip/answeredCalls",
						payload: { action: "showTransferCall", data: { lineNum: LineNumber, showTransferCall: true } },
					});
					dispatch(setCallNumber(""));
					transferBtn(false);
				}}>
				<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
					<g id="line / transfer">
						<path
							id="Vector"
							d="M11.3333 7.33333L14 4.66667M14 4.66667L11.3333 2M14 4.66667H6M4.66667 14L2 11.3333M2 11.3333L4.66667 8.66667M2 11.3333H10"
							stroke="#6C7A8B"
							strokeWidth="1.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</g>
				</svg>

				<span>Transfer Call</span>
			</button>
			<button
				className={styles.cardOptions}
				onClick={() => {
					store.dispatch({
						type: "sip/answeredCalls",
						payload: { action: "showTransferCallAtt", data: { lineNum: LineNumber, showTransferCallAtt: true } },
					});
					dispatch(setCallNumber(""));
					transferBtn(false);
				}}>
				<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
					<g id="line / transfer_2">
						<path
							id="Vector"
							d="M11.3333 7.33333L14 4.66667M14 4.66667L11.3333 2M14 4.66667H6M4.66667 14L2 11.3333M2 11.3333L4.66667 8.66667M2 11.3333H10M12.8551 11.3333H12.7072"
							stroke="#6C7A8B"
							strokeWidth="1.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</g>
				</svg>

				<span>Transfer Attended Call</span>
			</button>
		</div>
	);
};

export default TransferCallCard;
