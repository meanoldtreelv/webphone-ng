import SearchIcon from "components/UI/Icons/Search";
import styles from "./Header.module.scss";
import FilterIcon from "components/UI/Icons/Filter";
import CalendarIcon from "components/UI/Icons/Calendar";
import React from "react";
import DeleteIcon from "components/UI/Icons/Delete";

interface IHeader {
	filterClicked: (filter: boolean) => void;
}

const Header: React.FC<IHeader> = ({ filterClicked }) => {
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
					<span>
						<CalendarIcon />
					</span>
				</div>
			</section>
			<section className={styles.headerBtm}>
				<div className={styles.headerBtm_cont}>
					<p className={styles.headerBtm_count}>23 voicemails selected</p>
					<div className={styles.headerBtm_actions}>
						<button className={styles.actionsDelete}>
							<DeleteIcon /> Delete
						</button>
						{/* <button>
							Update
						</button> */}
					</div>
				</div>
			</section>
		</>
	);
};

export default Header;
