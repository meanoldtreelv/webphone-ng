import SearchIcon from "./../../../components/UI/Icons/Search";
import styles from "./Header.module.scss";
import FilterIcon from "./../../../components/UI/Icons/Filter";
import CalendarIcon from "./../../../components/UI/Icons/Calendar";
import React from "react";
import DeleteIcon from "./../../../components/UI/Icons/Delete";
import CheckIcon from "./../../../components/UI/Icons/Voicemail/Check";
import { useDispatch, useSelector } from "react-redux";
import {
	setSelectVoicemails,
	setSelectedVoicemailList,
	setVoicemailResults,
} from "./../../../redux/voicemail/voicemailSlice";
import {
	selectVoicemails,
	selectedVoicemails,
	voicemailFilterExt,
	voicemailQueries,
	voicemailResults,
} from "redux/voicemail/voicemailSelectors";
import { useLazyUpdateVoicemailsQuery } from "./../../../services/voicemail";
import { IHeader } from "./../../../constants/interfaces";
import { ClipLoader } from "react-spinners";

const Header: React.FC<IHeader> = ({ filterClicked, deleteClicked, dateClicked, search, filterSlider, filterDate }) => {
	const dispatch = useDispatch();
	const isSelectVoicemails = useSelector(selectVoicemails);
	const selectedVoicemailsCount = useSelector(selectedVoicemails).length;
	const [bulkVoicemailUpdate, { isLoading, isFetching }] = useLazyUpdateVoicemailsQuery();
	const voicemail_ids = useSelector(selectedVoicemails);
	const voicemails = useSelector(voicemailResults);
	const filtered = useSelector(voicemailFilterExt);
	const queries = useSelector(voicemailQueries);

	const handleSelectToggle = () => {
		if (!isSelectVoicemails) {
			selectedVoicemailsCount && dispatch(setSelectedVoicemailList({ type: "RESET" }));
		}
		dispatch(setSelectVoicemails());
	};

	const handleUpdateListened = () => {
		if (voicemail_ids.length) {
			const voicemailsJson = localStorage?.getItem("voicemails");
			let voicemailsParsed: [];

			try {
				voicemailsParsed = JSON.parse(String(voicemailsJson));
			} catch (e) {
				voicemailsParsed = [];
			}

			const updateVoicemails = async () => {
				await bulkVoicemailUpdate(voicemail_ids);

				const voicemailFiltered = voicemailsParsed?.map((voicemail: any) => {
					if (voicemail_ids.includes(voicemail?._id)) {
						voicemail.listened = true;
					}
					return voicemail;
				});

				localStorage?.setItem("voicemails", JSON?.stringify(voicemailFiltered));
				dispatch(setVoicemailResults(voicemailFiltered?.slice(0, 20)));
			};

			updateVoicemails();
		}
	};

	const handleVoicemailSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		const filterStr = e.target.value.trim();
		search(filterStr);
	};

	return (
		<>
			<section className={styles.header}>
				<h1 className={styles.header_pageName}>Voicemail</h1>
				<div className={styles.header_cont}>
					<div className={styles.header_search}>
						<input type="text" placeholder="Search voicemails..." onChange={handleVoicemailSearch} />
						<SearchIcon />
					</div>

					<div className={styles.cont_actBtns}>
						<button
							onClick={() => {
								filterClicked(true);
							}}>
							<FilterIcon active={filtered} />
						</button>
						<button
							onClick={() => {
								dateClicked(true);
							}}>
							<CalendarIcon active={queries.from_date || queries.to_date} />
						</button>
						<button className={styles.checkBtn} onClick={handleSelectToggle}>
							<CheckIcon active={isSelectVoicemails} />
						</button>
					</div>
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
								{isLoading || isFetching ? (
									<>
										<ClipLoader color="white" size={13} />
										<span className={styles.mlUpdate}></span>
									</>
								) : (
									""
								)}
								<span>Mark as Listened</span>
							</button>
						</div>
					</div>
				</section>
			)}
		</>
	);
};

export default Header;
