import styles from "./RecentsSidebar.module.scss";
import RecentHistoryCard from "../RecentHistoryCard";
import SearchBar from "components/UI/SearchBar";
import { useLazyGetCallHistoriesQuery } from "services/call";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCallHistory } from "redux/call-history/callHistorySlice";
import { callHistory } from "redux/call-history/callHistorySelectors";
import RecentHistoryCardSkeleton from "components/CallHistory/RecentHistoryCardSkeleton";
import FilterIcon from "components/UI/Icons/Filter";

const RecentsSidebar = () => {
	const dispatch = useDispatch();
	const allCallHistory = useSelector(callHistory);
	const [search, setSearch] = useState("");
	const [getCallHistories, { data, isLoading, isFetching }] = useLazyGetCallHistoriesQuery();

	const filterCallHistory = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
	};

	useEffect(() => {
		const callHistoryJson = localStorage?.getItem("call-history");
		let historyParsed: [];

		try {
			historyParsed = JSON.parse(callHistoryJson);
		} catch (e) {
			historyParsed = [];
		}

		const fetchCallHistory = async () => {
			await getCallHistories("page=1");
		};

		if (historyParsed && historyParsed.length) {
			dispatch(setCallHistory(historyParsed));
		} else {
			fetchCallHistory();
		}
	}, []);

	useEffect(() => {
		if (!isLoading && data) {
			localStorage.setItem("call-history", JSON.stringify(data));
			dispatch(setCallHistory(data));
		}
	}, [isLoading]);

	return (
		<div className={styles.contact}>
			<div className={styles.smlHeader}>
				<h1>Recents</h1>
			</div>
			{/* <SearchBar onChange={filterCallHistory} /> */}

			<div className={styles.list}>
				<div className={styles.contact_sectionInfo}>
					<span>Today (3)</span>
				</div>

				<div>
					{!allCallHistory
						? Array(18)
								.fill(null)
								.map((el) => <RecentHistoryCardSkeleton />)
						: allCallHistory?.map((call) => {
								return call?.cdr.dst.toLowerCase().includes(search.toLowerCase()) ? (
									<RecentHistoryCard details={call} />
								) : null;
						  })}
				</div>
			</div>
		</div>
	);
};

export default RecentsSidebar;
