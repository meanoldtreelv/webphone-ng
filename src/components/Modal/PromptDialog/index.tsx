import React from 'react';
import styles from './Modal.module.scss';
import InfoIcon from '../../UI/Icons/Info';
import { IPromptDialog } from '../../../constants/interfaces';

const PromptDialog: React.FC<IPromptDialog> = ({type, title, actionBtnTxt, children}) => (
    <div className={styles.overlay}>
			<div className={styles.delete}>
				<div className={styles.delete_cont}>
					<span>
						<InfoIcon />
					</span>
					<div className={`body_bold ${styles.delete_head}`}>{title}</div>
					<div className={`footnote ${styles.delete_ques}`}>{children}</div>
				</div>

				<div className={styles.delete_btnCont}>
					<button className={`footnote_bold ${styles.delete_cancelBtn}`}>
						<span className={``}>Cancel</span>
					</button>
					<button className={`footnote_bold ${styles.delete_deleteBtn}`}>
						<span className={``}>{actionBtnTxt}</span>
					</button>
				</div>
			</div>
		</div>
)

export default PromptDialog;