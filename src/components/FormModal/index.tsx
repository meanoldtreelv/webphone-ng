import {
	moreOptVoicemail,
	selectedVoicemails,
	voicemailNewFilter,
	voicemailQueries,
} from "redux/voicemail/voicemailSelectors";
import InfoIcon from "./../UI/Icons/Info";
import styles from "./FormModal.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useLazyDeleteVoicemailQuery, useLazyDeleteVoicemailsQuery } from "services/voicemail";
import { ClipLoader } from "react-spinners";
import { useState } from "react";
import { setVoicemailQueries } from "redux/voicemail/voicemailSlice";
import { convertInputDateFormat } from "helpers/formatDateTime";
import { setNewFilter } from "redux/voicemail/voicemailSlice";

interface IFormModal {
	onClose: (save: boolean) => void;
	loading: boolean;
}

const FormModal: React.FC<IFormModal> = ({ onClose, loading }) => {
	const dispatch = useDispatch();
	const queries = useSelector(voicemailQueries);
	const [filterDate, setFilterDate] = useState({
		from_date: "",
		to_date: "",
	});
	const newFilter = useSelector(voicemailNewFilter);

	const handleSaveForm = () => {
		if (filterDate.from_date || filterDate.to_date) {
			dispatch(setNewFilter(true));
			dispatch(
				setVoicemailQueries({
					...queries,
					from_date: filterDate.from_date,
					to_date: filterDate.to_date,
				}),
			);
		}
	};

	return (
		<div className={styles.overlay}>
			<div className={styles.form}>
				<div className={styles.form_cont}>
					<span>
						<InfoIcon />
					</span>
					<div className={styles.form_header}>
						<div className={styles.form_head}>Filter</div>
						<div className={styles.form_ques}>Voicemail filter based on date.</div>
					</div>
				</div>

				<div className={styles.mainCont}>
					<div className={styles.mainCont_inputWrap}>
						<input
							type="date"
							name="From"
							className={styles.mainCont_from}
							onChange={(event) => {
								setFilterDate((prevState) => ({
									...prevState,
									from_date: event?.target.value,
								}));
							}}></input>
					</div>

					<div className={styles.mainCont_inputWrap}>
						<input
							type="date"
							name="To"
							onChange={(event) => {
								setFilterDate((prevState) => ({ ...prevState, to_date: event?.target.value }));
							}}></input>
						<div></div>
					</div>
				</div>

				<div className={styles.form_btnCont}>
					<button className={styles.form_cancelBtn} onClick={() => onClose(false)}>
						<span>Cancel</span>
					</button>
					<button className={styles.form_formBtn} onClick={handleSaveForm}>
						{newFilter && loading ? (
							<>
								<div>
									<ClipLoader color="white" size={16} />
								</div>
								<span>Filtering...</span>
							</>
						) : (
							<span>Filter</span>
						)}
					</button>
				</div>
			</div>
		</div>
	);
};

export default FormModal;
