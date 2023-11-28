import styles from "./RecentsSidebar.module.scss";
import RecentHistoryCard from "../RecentHistoryCard";
import DeleteIcon from "components/UI/Icons/Delete";
import Calendar from "components/UI/Icons/Calendar";
import SearchBar from "components/UI/SearchBar";
import SearchIcon from "components/UI/Icons/Search";
import { useLazyGetCallHistoryQuery } from "services/call";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCallHistory, setQueries, setSelectedCallHistory } from "redux/call-history/callHistorySlice";
import { callHistory, queries } from "redux/call-history/callHistorySelectors";
import RecentHistoryCardSkeleton from "../RecentHistoryCardSkeleton";
import FilterIcon from "components/UI/Icons/Filter";
import { ClipLoader } from "react-spinners";

interface IRecentsSidebar {
	loading: boolean;
	callLen: number;
	dispCalendar: boolean;
	setDispCalendar: (calendar: boolean) => void;
	fetching: boolean;
	setPage: (page: number) => void;
	page: number;
}

const RecentsSidebar: React.FC<IRecentsSidebar> = ({
	loading,
	callLen,
	dispCalendar,
	setDispCalendar,
	fetching,
	setPage,
	page,
}) => {
	const dispatch = useDispatch();
	const allCallHistory = useSelector(callHistory);
	const [search, setSearch] = useState("");
	const callHistoryQueries = useSelector(queries);

	const filterCallHistory = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
	};

	const handleScroll = (e: any) => {
		const scrollTop = e.target.scrollTop;
		const scrollHeight = e.target.scrollHeight;
		const clientHeight = e.target.clientHeight;

		if (scrollTop + clientHeight >= scrollHeight) {
			const callHistoryJson = localStorage?.getItem("call-history");
			let historyParsed: [];

			try {
				historyParsed = JSON.parse(String(callHistoryJson));
			} catch (e) {
				historyParsed = [];
			}

			if (historyParsed?.length === page * 20) {
				dispatch(
					setQueries({
						page: historyParsed?.length / 80 + 1,
						page_size: Number(callHistoryQueries?.page_size),
					}),
				);
			} else {
				setPage(page + 1);
			}
		}
	};

	return (
		<div className={styles.contact}>
			{/* <div className={styles.contact_search}>
				<input type="text" placeholder="Search number" />
				<SearchIcon />
			</div> */}
			<div className={styles.smlHeader}>
				<h1>Recents</h1>

				{/* revert back to normal */}
				{/* <div className={styles.filterSmlHeader}>
					<button>
						<FilterIcon />
					</button>
				</div> */}
			</div>
			<SearchBar onChange={filterCallHistory} />

			<div className={styles.list} style={{ overflowY: !callLen ? "hidden" : "" }} onScroll={handleScroll}>
				<div className={styles.contact_sectionInfo}>
					{/* <span>Today (3)</span> */}
					<span>Call Histories</span>
					<div className={styles.contact_sorting}>
						<button
							onClick={() => {
								setDispCalendar(true);
							}}>
							<Calendar />
						</button>
						{/* <button>
							<DeleteIcon />
						</button> */}
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

				<div className={styles.loadingMore}>
					{loading || fetching ? (
						<button>
							<ClipLoader color="var(--text-link)" size={14} />
							<span>Loading More...</span>
						</button>
					) : null}
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
