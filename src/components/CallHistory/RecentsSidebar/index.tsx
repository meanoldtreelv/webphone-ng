import styles from "./RecentsSidebar.module.scss";
import RecentHistoryCard from "../RecentHistoryCard";
import DeleteIcon from "components/UI/Icons/Delete";
import Calendar from "components/UI/Icons/Calendar";
import SearchBar from "components/UI/SearchBar";
import SearchIcon from "components/UI/Icons/Search";
import { useLazyGetCallHistoryQuery } from "services/call";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCallHistory, setSelectedCallHistory } from "redux/call-history/callHistorySlice";
import { callHistory } from "redux/call-history/callHistorySelectors";
import RecentHistoryCardSkeleton from "../RecentHistoryCardSkeleton";

interface IRecentsSidebar {
	loading: boolean;
	callLen: number;
}

const RecentsSidebar: React.FC<IRecentsSidebar> = ({ loading, callLen }) => {
	const allCallHistory = useSelector(callHistory);
	const [search, setSearch] = useState("");

	const filterCallHistory = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
	};

	return (
		<div className={styles.contact}>
			{/* <div className={styles.contact_search}>
				<input type="text" placeholder="Search number" />
				<SearchIcon />
			</div> */}
			<SearchBar onChange={filterCallHistory} />

			<div className={styles.list} style={{ overflowY: !callLen ? "hidden" : "" }}>
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
					{!callLen
						? Array(18)
								.fill(null)
								.map((el) => <RecentHistoryCardSkeleton />)
						: allCallHistory?.map((call) => {
								// <RecentHistoryCard time={call?.cdr?.starttime} number={call?.cdr?.dst} duration={99} />
								return call?.cdr.dst.toLowerCase().includes(search.toLowerCase()) ? (
									<RecentHistoryCard details={call} />
								) : null;
						  })}
				</div>

				{/* <div className={styles.contact_sectionInfo}>
					<span>Yesterday (4)</span>
				</div> */}

				{/* <div>
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
				</div> */}
			</div>
		</div>
	);
};

export default RecentsSidebar;
