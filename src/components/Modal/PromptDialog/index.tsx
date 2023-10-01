import React from "react";
import styles from "./Modal.module.scss";
import InfoIcon from "../../UI/Icons/Info";
import { IPromptDialog } from "../../../constants/interfaces";
import Backdrop from "components/UI/Backdrop";
import { useSelector } from "react-redux";
import { modalState } from "redux/common/commonSelectors";

const PromptDialog: React.FC<IPromptDialog> = ({ type, title, actionBtnTxt, children, onClick }) => {
	const modal = useSelector(modalState);

	return (
		<div className={styles.overlay}>
			{modal ? <Backdrop /> : null}
			<div className={styles.delete}>
				<div className={styles.delete_cont}>
					<span>
						<InfoIcon />
					</span>
					<div className={styles.delete_head}>{title}</div>
					<div className={styles.delete_ques}>{children}</div>
				</div>

				<div className={styles.delete_btnCont}>
					<button className={styles.delete_cancelBtn}>
						<span>Cancel</span>
					</button>
					<button className={styles.delete_deleteBtn} onClick={onClick}>
						<span>{actionBtnTxt}</span>
					</button>
				</div>
			</div>
		</div>
	);
};

export default PromptDialog;
