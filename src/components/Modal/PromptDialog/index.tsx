import React from "react";
import styles from "./Modal.module.scss";
import InfoIcon from "../../UI/Icons/Info";
import { IPromptDialog } from "../../../constants/interfaces";
import Backdrop from "components/UI/Backdrop";
import { useDispatch, useSelector } from "react-redux";
import { modalState } from "redux/common/commonSelectors";
import { ClipLoader } from "react-spinners";
import { closeDeleteContact } from "redux/contact/contactSlice";

const PromptDialog: React.FC<IPromptDialog> = ({ type, title, actionBtnTxt, children, onClick, loading }) => {
	const modal = useSelector(modalState);
	const dispatch = useDispatch();

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
					<button className={styles.delete_cancelBtn} onClick={() => dispatch(closeDeleteContact())}>
						<span>Cancel</span>
					</button>
					<button className={styles.delete_deleteBtn} onClick={onClick}>
						{loading ? (
							<>
								<ClipLoader color="white" size={13} />
								<span style={{ marginLeft: "7px" }}>Deleting...</span>
							</>
						) : (
							<span>{actionBtnTxt}</span>
						)}
					</button>
				</div>
			</div>
		</div>
	);
};

export default PromptDialog;
