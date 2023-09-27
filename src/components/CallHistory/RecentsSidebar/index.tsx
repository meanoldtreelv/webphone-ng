import styles from "./RecentsSidebar.module.scss";
import RecentHistoryCard from "../RecentHistoryCard";
import DeleteIcon from "components/UI/Icons/Delete";
import Calendar from "components/UI/Icons/Calendar";
import SearchBar from "components/UI/SearchBar";
import SearchIcon from "components/UI/Icons/Search";

const RecentsSidebar = () => {
	return (
		<div className={styles.contact}>
			{/* <div className={styles.contact_search}>
				<input type="text" placeholder="Search number" />
				<SearchIcon />
			</div> */}
			<SearchBar />

			<div className={styles.list}>
				<div className={styles.contact_sectionInfo}>
					<span>Today (3)</span>
					<div className={styles.contact_sorting}>
						<button>
							<Calendar />
						</button>
						<button>
							<DeleteIcon />
						</button>
					</div>
				</div>

				<div>
					<RecentHistoryCard />
					<RecentHistoryCard />
					<RecentHistoryCard />
					<RecentHistoryCard />
					<RecentHistoryCard />
					<RecentHistoryCard />
					<RecentHistoryCard />
					<RecentHistoryCard />
					<RecentHistoryCard />
					<RecentHistoryCard />
					<RecentHistoryCard />
				</div>

				<div className={styles.contact_sectionInfo}>
					<span>Yesterday (4)</span>
				</div>

				<div>
					<RecentHistoryCard />
					<RecentHistoryCard />
					<RecentHistoryCard />
				</div>

				<div className={styles.contact_sectionInfo}>
					<span>Friday, March 10, 2023 (7)</span>
				</div>

				<div>
					<RecentHistoryCard />
					<RecentHistoryCard />
					<RecentHistoryCard />
				</div>
			</div>
		</div>
	);
};

export default RecentsSidebar;
