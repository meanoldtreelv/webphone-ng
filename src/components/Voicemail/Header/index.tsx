import SearchIcon from "./../../../components/UI/Icons/Search";
import styles from "./Header.module.scss";
import FilterIcon from "./../../../components/UI/Icons/Filter";
import CalendarIcon from "./../../../components/UI/Icons/Calendar";
import React from "react";
import DeleteIcon from "./../../../components/UI/Icons/Delete";
import CheckIcon from "./../../../components/UI/Icons/Voicemail/Check";
import { useDispatch, useSelector } from "react-redux";
import { setSelectVoicemails, setSelectedVoicemailList } from "./../../../redux/voicemail/voicemailSlice";
import { selectVoicemails, selectedVoicemails, voicemailResults } from "redux/voicemail/voicemailSelectors";
import { useLazyUpdateVoicemailsQuery } from "./../../../services/voicemail";
import { IHeader } from "./../../../constants/interfaces";

const Header: React.FC<IHeader> = ({ filterClicked, deleteClicked, dateClicked, search }) => {
	const dispatch = useDispatch();
	const isSelectVoicemails = useSelector(selectVoicemails);
	const selectedVoicemailsCount = useSelector(selectedVoicemails).length;
	const [bulkVoicemailUpdate] = useLazyUpdateVoicemailsQuery();
	const voicemail_ids = useSelector(selectedVoicemails);
	const voicemails = useSelector(voicemailResults);

	const handleSelectToggle = () => {
		if (!isSelectVoicemails) {
			selectedVoicemailsCount && dispatch(setSelectedVoicemailList({ type: "RESET" }));
		}
		dispatch(setSelectVoicemails());
	};

	const handleUpdateListened = () => {
		if (voicemail_ids.length) {
			bulkVoicemailUpdate(voicemail_ids);
		}
	};

	const handleVoicemailSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		const filterStr = e.target.value.trim();
		search(filterStr);
	}

	return (
		<>
			<section className={styles.header}>
				<div className={styles.header_pageName}>Voicemail</div>
				<div className={styles.header_cont}>
					<div className={styles.header_search}>
						<input type="text" placeholder="Search voicemails..." onChange={handleVoicemailSearch} />
						<SearchIcon />
					</div>
					<button
						onClick={() => {
							filterClicked(true);
						}}>
						<FilterIcon />
					</button>
					<button onClick={() => {
						dateClicked(true);
					}}>
						<CalendarIcon />
					</button>
					<button className={styles.checkBtn} onClick={handleSelectToggle}>
						<CheckIcon />
					</button>
				</div>
			</section>
			{isSelectVoicemails && Boolean(selectedVoicemailsCount) && (
				<section className={styles.headerBtm}>
					<div className={styles.headerBtm_cont}>
						<p className={styles.headerBtm_count}>{selectedVoicemailsCount} voicemails selected</p>
						<div className={styles.headerBtm_actions}>
							<button
								className={styles.actionsDelete}
								onClick={() => deleteClicked(true)}
								disabled={!selectedVoicemailsCount}>
								<DeleteIcon /> Delete
							</button>
							<button
								className={styles.actionsUpdate}
								onClick={handleUpdateListened}
								disabled={!selectedVoicemailsCount}>
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
