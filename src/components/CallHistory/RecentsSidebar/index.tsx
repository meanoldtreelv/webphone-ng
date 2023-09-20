import React from 'react';
import styles from "./RecentsSidebar.module.scss";
import RecentHistoryCard from "../RecentHistoryCard";
import DeleteIcon from 'components/UI/Icons/Delete';
import Calendar from 'components/UI/Icons/Calendar';
import SearchIcon from 'components/UI/Icons/Search';
import UserAddIcon from 'components/UI/Icons/User/UserAdd';
// import RecentHistoryCard from "components/TinyComponents/ContactCard";

const RecentsSidebar = () => {
	return (
		<div className={styles.contact}>
			<div className={styles.contact_search}>
				<input type="text" placeholder="Search number" />

				{/* <span className={`${styles.add_contact}`}>
					<UserAddIcon />
				</span> */}

				{/* this has some css settings that needs to be migrated to the icon file */}
				<SearchIcon />
			</div>

			{/* favourite contact heading */}

			<div className={styles.list}>
				<div>
					<p className={`caption_2 py-[9px] pr-[16px] ${styles.contact_favorites}`}>
						<span>
							<span>Today (3)</span>
						</span>
						<div className={`flex gap-x-[5px] ${""}`}>
							<span className={` ${styles.contact_sorting}`}>
								<Calendar />
							</span>
							<span className={` ${styles.contact_sorting}`}>
								<DeleteIcon />
							</span>
						</div>
					</p>
				</div>
				{/* favourite contact  */}
				<div>
					<RecentHistoryCard />
					<RecentHistoryCard />
					<RecentHistoryCard />
					<RecentHistoryCard />
					<RecentHistoryCard />
					<RecentHistoryCard />
					<RecentHistoryCard />
				</div>

				{/* frquently contact heading  */}
				<div>
					<p className={`caption_2 py-[9px] pr-[16px] ${styles.contact_favorites}`}>
						<span className="">
							<span>Yesterday (4)</span>
						</span>
					</p>
				</div>

				{/* frequently contact  */}
				<div>
					<RecentHistoryCard />
					<RecentHistoryCard />
					<RecentHistoryCard />
					<RecentHistoryCard />
					<RecentHistoryCard />
					<RecentHistoryCard />
					<RecentHistoryCard />
				</div>
				{/* namewise contact heading  */}
				<div>
					<p className={`caption_2 py-[9px] pr-[16px] ${styles.contact_favorites}`}>
						<span>
							<span>Friday, March 10, 2023 (7)</span>
						</span>
					</p>
				</div>

				{/* frequently contact  */}
				<div>
					<RecentHistoryCard />
					<RecentHistoryCard />
					<RecentHistoryCard />
					<RecentHistoryCard />
					<RecentHistoryCard />
					<RecentHistoryCard />
					<RecentHistoryCard />
				</div>
			</div>
		</div>
	);
};

export default RecentsSidebar;
