import { moreOptVoicemail, selectedVoicemails } from "redux/voicemail/voicemailSelectors";
import InfoIcon from "./../../../components/UI/Icons/Info";
import styles from "./DeleteVoicemail.module.scss";
import { useSelector } from "react-redux";
import { useLazyDeleteVoicemailQuery, useLazyDeleteVoicemailsQuery } from "services/voicemail";
import { ClipLoader } from "react-spinners";

interface IDeleteVoicemail {
	onClose: (del: boolean) => void;
}

const DeleteVoicemail: React.FC<IDeleteVoicemail> = ({ onClose }) => {
	const [deleteVoicemail, { isLoading: voicemailLoading }] = useLazyDeleteVoicemailQuery();
	const [deleteVoicemails, { isLoading: voicemailsLoading }] = useLazyDeleteVoicemailsQuery();
	const voicemailId = useSelector(moreOptVoicemail);
	const voicemailIds = useSelector(selectedVoicemails);

	const handleDeleteVoicemail = () => {
		if(voicemailIds.length) {
			// const stringify_ids = JSON.stringify({message_ids: voicemailIds});
			deleteVoicemails({message_ids: voicemailIds});
			return;
		}

		deleteVoicemail(voicemailId)
	}

	return (
		<div className={styles.overlay}>
			<div className={styles.delete}>
				<div className={styles.delete_cont}>
					<span>
						<InfoIcon />
					</span>
					<div className={styles.delete_head}>Delete Voicemails?</div>
					<div className={styles.delete_ques}>Are you sure that you want to delete selected voicemails?</div>
				</div>

				<div className={styles.delete_btnCont}>
					<button className={styles.delete_cancelBtn} onClick={() => onClose(false)}>
						<span>Cancel</span>
					</button>
					<button className={styles.delete_deleteBtn} onClick={handleDeleteVoicemail}>
						{voicemailLoading || voicemailsLoading ? <ClipLoader color="white" size={16} /> : <span>Delete</span>}
					</button>
				</div>
			</div>
		</div>
	);
};

export default DeleteVoicemail;
