import { moreOptVoicemail, selectedVoicemail, selectedVoicemails } from "redux/voicemail/voicemailSelectors";
import InfoIcon from "./../../../components/UI/Icons/Info";
import styles from "./DeleteVoicemail.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useLazyDeleteVoicemailQuery, useLazyDeleteVoicemailsQuery } from "services/voicemail";
import { ClipLoader } from "react-spinners";
import { removeVoicemail, setSelectedVoicemail, setVoicemailResults } from "redux/voicemail/voicemailSlice";

interface IDeleteVoicemail {
	onClose: (del: boolean) => void;
}

const DeleteVoicemail: React.FC<IDeleteVoicemail> = ({ onClose }) => {
	const dispatch = useDispatch();
	const [deleteVoicemail, { isLoading: voicemailLoading }] = useLazyDeleteVoicemailQuery();
	const [deleteVoicemails, { isLoading: voicemailsLoading }] = useLazyDeleteVoicemailsQuery();
	const voicemailId = useSelector(moreOptVoicemail);
	const voicemailIds = useSelector(selectedVoicemails);
	const voicemail = useSelector(selectedVoicemail);

	const handleDeleteVoicemail = async () => {
		const voicemailsJson = localStorage?.getItem("voicemails");
		let voicemailsParsed: [];

		try {
			voicemailsParsed = JSON.parse(String(voicemailsJson));
		} catch (e) {
			voicemailsParsed = [];
		}

		if (voicemailIds.length) {
			await deleteVoicemails({ message_ids: voicemailIds });
			const newLocalVoicemail = voicemailsParsed?.filter((voicemail) => !voicemailIds?.includes(voicemail?._id));
			localStorage?.setItem("voicemails", JSON?.stringify(newLocalVoicemail));
			dispatch(setVoicemailResults(newLocalVoicemail?.slice(0, 20)));

			const idExists = voicemailIds?.includes(voicemail?.id);

			if (idExists) {
				dispatch(setSelectedVoicemail({}));
			}

			onClose(false);
			return;
		}

		await deleteVoicemail(voicemailId);
		const newLocalVoicemail = voicemailsParsed?.filter((voicemail) => voicemail?._id !== voicemailId);
		localStorage?.setItem("voicemails", JSON?.stringify(newLocalVoicemail));
		dispatch(setVoicemailResults(newLocalVoicemail?.slice(0, 20)));

		if (String(voicemail.id).toLowerCase() === String(voicemailId).toLowerCase()) {
			dispatch(setSelectedVoicemail({}));
		}
		onClose(false);
	};

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
						{voicemailLoading || voicemailsLoading ? (
							<>
								<ClipLoader color="white" size={16} /> <span className={styles.deletingTxt}>Deleting...</span>
							</>
						) : (
							<span>Delete</span>
						)}
					</button>
				</div>
			</div>
		</div>
	);
};

export default DeleteVoicemail;
