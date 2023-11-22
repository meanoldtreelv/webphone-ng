import styles from "./RecentsSidebar.module.scss";
import RecentHistoryCard from "../RecentHistoryCard";
import { useLazyGetCallHistoriesQuery } from "services/call";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCallHistory } from "redux/call-history/callHistorySlice";
import { callHistory } from "redux/call-history/callHistorySelectors";
import RecentHistoryCardSkeleton from "components/CallHistory/RecentHistoryCardSkeleton";
import { setLoader } from "redux/common/commonSlice";
import { loader } from "redux/common/commonSelectors";
import RecentIcon from "components/UI/Icons/Recent";
import { getCookie } from "utils";

const RecentsSidebar = () => {
	const dispatch = useDispatch();
	const allCallHistory = useSelector(callHistory);
	const [search, setSearch] = useState("");
	const [getCallHistories, { data, isLoading, isFetching }] = useLazyGetCallHistoriesQuery();
	const backLoad = useSelector(loader);

	useEffect(() => {
		const callHistoryJson = localStorage?.getItem("call-history");
		let historyParsed: [];

		try {
			historyParsed = JSON.parse(String(callHistoryJson));
		} catch (e) {
			historyParsed = [];
		}

		const fetchCallHistory = async () => {
			await getCallHistories("page=1&page_size=80");
			dispatch(setLoader(false));
		};

		if (historyParsed && historyParsed.length) {
			dispatch(setCallHistory(historyParsed.slice(0, 20)));
			dispatch(setLoader(true));
			fetchCallHistory();
		} else {
			fetchCallHistory();
		}
	}, []);

	useEffect(() => {
		if (!isLoading && !isFetching && data) {
			const parsedData = JSON.parse(String(localStorage?.getItem("call-history")));

			if (!parsedData) {
				localStorage.setItem("call-history", JSON.stringify(data));
			}

			dispatch(setCallHistory(data?.slice(0, 20)));
		}
	}, [isLoading, isFetching]);

	return (
		<div className={styles.contact}>
			<div className={styles.smlHeader}>
				<h1>Recents</h1>
			</div>
			<div className={`${styles.list} ${!allCallHistory.length ? styles.list_hidden : null}`}>
				<div>
					{!allCallHistory.length && !backLoad && (getCookie('extAuth') === 'false') ? (
						Array(18)
							.fill(null)
							.map((el) => <RecentHistoryCardSkeleton />)
					) : allCallHistory.length ? (
						allCallHistory?.map((call) => {
							return call?.cdr.dst.toLowerCase().includes(search.toLowerCase()) ? (
								<RecentHistoryCard details={call} />
							) : null;
						})
					) : (
						<div className={styles.noSearchResult}>
							<div className={styles.noSearchResult_center}>
								<RecentIcon />
								<p>No Recent Calls</p>
								<span>Recent calls will appear here if there are any.</span>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default RecentsSidebar;
