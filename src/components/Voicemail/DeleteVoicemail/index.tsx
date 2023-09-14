import React from "react";
import style from "./deleteVoicemail.module.scss";

const DeleteVoicemail = () => {
	return (
		<div className={style.overlay}>
			<div className={style.delete}>
				<div className={style.delete_cont}>
					<span>
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
							<path
								d="M12 16V12M12 8H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
								stroke="#6C7A8B"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</span>
					<div className={`body_bold ${style.delete_head}`}>Delete Voicemails?</div>
					<div className={`footnote ${style.delete_ques}`}>
						Are you sure that you want to delete selected voicemails?
					</div>
				</div>

				<div className={style.delete_btnCont}>
					<div className={`footnote_bold ${style.delete_cancelBtn}`}>
						<span className={``}>Cancel</span>
					</div>
					<div className={`footnote_bold ${style.delete_deleteBtn}`}>
						<span className={``}>Delete</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DeleteVoicemail;
