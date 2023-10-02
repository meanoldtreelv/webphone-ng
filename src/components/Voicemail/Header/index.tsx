import SearchIcon from "components/UI/Icons/Search";
import styles from "./Header.module.scss";
import FilterIcon from "components/UI/Icons/Filter";
import CalendarIcon from "components/UI/Icons/Calendar";
import React from "react";
import DeleteIcon from "components/UI/Icons/Delete";
import CheckIcon from "components/UI/Icons/Voicemail/Check";
import { useDispatch, useSelector } from "react-redux";
import { setSelectVoicemails } from "redux/voicemail/voicemailSlice";
import { selectVoicemails, selectedVoicemails } from "redux/voicemail/voicemailSelectors";
import { useLazyUpdateVoicemailsQuery } from "services/voicemail";

interface IHeader {
	filterClicked: (filter: boolean) => void;
	deleteClicked: (del: boolean) => void;
}

const Header: React.FC<IHeader> = ({ filterClicked, deleteClicked }) => {
	const dispatch = useDispatch();
	const isSelectVoicemails = useSelector(selectVoicemails);
	const selectedVoicemailsCount = useSelector(selectedVoicemails).length;
	const [bulkVoicemailUpdate] = useLazyUpdateVoicemailsQuery();
	const voicemail_ids = useSelector(selectedVoicemails);

	const handleUpdateListened = () => {
		if(voicemail_ids.length) {
			bulkVoicemailUpdate(voicemail_ids);
		}
	};

	return (
		<>
			<section className={styles.header}>
				<div className={styles.header_pageName}>Voicemail</div>
				<div className={styles.header_cont}>
					<div className={styles.header_search}>
						<input type="text" placeholder="Search number" />
						<SearchIcon />
					</div>
					<button
						onClick={() => {
							filterClicked(true);
						}}>
						<FilterIcon />
					</button>
					<button>
						<CalendarIcon />
					</button>
					<button className={styles.checkBtn} onClick={() => dispatch(setSelectVoicemails())}>
						<CheckIcon />
					</button>
				</div>
			</section>
			{isSelectVoicemails && (
				<section className={styles.headerBtm}>
					<div className={styles.headerBtm_cont}>
						<p className={styles.headerBtm_count}>{selectedVoicemailsCount} voicemails selected</p>
						<div className={styles.headerBtm_actions}>
							<button className={styles.actionsDelete} onClick={() => deleteClicked(true)}>
								<DeleteIcon /> Delete
							</button>
							<button className={styles.actionsUpdate} onClick={handleUpdateListened}>
								Mark as Listened
							</button>
						</div>
					</div>
				</section>
			)}
		</>
	);
};

export default Header;
