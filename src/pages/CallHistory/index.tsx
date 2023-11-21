import styles from "./CallHistory.module.scss";
import NoRecentActivity from "../../components/CallHistory/NoRecentActivity";
import NoRecordSelected from "../../components/CallHistory/NoRecordSelected";
import Header from "../../components/CallHistory/Header";
import RecentsSidebar from "../../components/CallHistory/RecentsSidebar";
import ContactDetails from "../../components/CallHistory/ContactDetails";
import BaseLayout from "../../layouts/BaseLayout";
import PromptDialog from "../../components/Modal/PromptDialog";
import { useDispatch, useSelector } from "react-redux";
import { callHistory, queries, selectedCallHistory, strQueries } from "redux/call-history/callHistorySelectors";
import { useEffect, useState } from "react";
import { useLazyGetCallHistoriesQuery } from "services/call";
import { setCallHistory, setQueries } from "redux/call-history/callHistorySlice";
import Calendar from "components/UI/CalendarMain";
import { setPage } from "redux/voicemail/voicemailSlice";
import { formatFilterDate } from "utils";

const CallHistory = () => {
	const dispatch = useDispatch();
	const CallHistory = useSelector(callHistory);
	const callHistoryDetails = useSelector(selectedCallHistory);
	const [detailsOn, setDetailsOn] = useState(false);
	const [getCallHistories, { data, isLoading, isFetching }] = useLazyGetCallHistoriesQuery();
	const [dispCalendar, setDispCalendar] = useState(false);
	const callHistoryQueries = useSelector(queries);
	const callHistoryStrQueries = useSelector(strQueries);
	const [pageSize, setPageSize] = useState(20);
	const [date, setDate] = useState({
		from_date: "",
		to_date: "",
	});
	const historyDetails = useSelector(selectedCallHistory);

	useEffect(() => {
		const callHistoryJson = localStorage?.getItem("call-history");
		let historyParsed: [];

		try {
			historyParsed = JSON.parse(callHistoryJson);
		} catch (e) {
			historyParsed = [];
		}

		const fetchCallHistory = async () => {
			await getCallHistories(callHistoryStrQueries);
		};

		if (historyParsed && historyParsed?.length) {
			dispatch(setCallHistory(historyParsed.slice(0, 20)));
		} else {
			fetchCallHistory();
		}
	}, []);

	useEffect(() => {
		if (!isLoading && !isFetching && data) {
			if (Object.keys(callHistoryQueries).length <= 2) {
				const parsedData = JSON.parse(String(localStorage?.getItem("call-history")));
				if (parsedData) {
					localStorage.setItem("call-history", JSON.stringify([...parsedData, ...data]));
				} else {
					localStorage.setItem("call-history", JSON.stringify(data));
				}
			}

			dispatch(setCallHistory(data?.slice(0, 20)));
		}
	}, [isLoading, isFetching]);

	useEffect(() => {
		setDetailsOn(Object.keys(callHistoryDetails).length > 1);
	}, [callHistoryDetails]);

	const onFilter = () => {
		let dateFilter = {};
		dateFilter = {
			from_date: date.from_date && formatFilterDate(date.from_date),
			to_date: date.to_date && formatFilterDate(date.to_date),
		};
		dateFilter = Object.fromEntries(Object.entries(dateFilter).filter(([key, value]) => value !== ""));

		if (Object.keys(dateFilter).length) {
			dispatch(
				setQueries({
					...callHistoryQueries,
					...dateFilter,
				}),
			);
		}
	};

	useEffect(() => {
		const callHistoryJson = localStorage?.getItem("call-history");
		let historyParsed: [];

		try {
			historyParsed = JSON.parse(String(callHistoryJson));
		} catch (e) {
			historyParsed = [];
		}

		const fetchCallHistory = async () => {
			await getCallHistories(callHistoryStrQueries);
		};

		if (historyParsed && historyParsed?.length !== pageSize && Object.keys(callHistoryQueries).length == 2) {
			dispatch(setCallHistory(historyParsed?.slice(0, pageSize + 20)));
			setPageSize((prevState) => prevState + 20);
		} else {
			fetchCallHistory();
			setDispCalendar(false);
		}
	}, [callHistoryStrQueries]);

	return (
		<div className={styles.callHistory}>
			<BaseLayout>
				{!CallHistory.length && !isLoading && !isFetching ? (
					<>
						<NoRecentActivity />
						<div className={styles.header}>
							<Header />
						</div>
					</>
				) : (
					<section className={styles.recent}>
						{/* {!Object.keys(callHistoryDetails).length ? ( */}
						<RecentsSidebar
							dispCalendar={dispCalendar}
							setDispCalendar={setDispCalendar}
							loading={isLoading}
							fetching={isFetching}
							callLen={CallHistory.length}
						/>

						{dispCalendar ? (
							<Calendar
								placeholder1="From"
								placeholder2="To"
								setDispCalendar={setDispCalendar}
								filter={onFilter}
								loading={isFetching}
								date={date}
								setDate={setDate}
							/>
						) : null}

						<div
							className={`${styles.rightCont} ${
								historyDetails && Object.keys(historyDetails).length ? styles.rightCont_disp : null
							}`}>
							<div className={styles.header}>
								<Header />
							</div>

							{detailsOn && Object.keys(callHistoryDetails).length ? <ContactDetails /> : ""}

							{!detailsOn && (
								<div className={styles.noRecords}>
									<NoRecordSelected />
								</div>
							)}
						</div>
					</section>
				)}
			</BaseLayout>

			{false && (
				<PromptDialog
					type="warning"
					title="Clear Call History"
					actionBtnTxt="Clear"
					onClick={() => console.log("test")}>
					Are you sure that you want to clear call history?
				</PromptDialog>
			)}
		</div>
	);
};

export default CallHistory;
