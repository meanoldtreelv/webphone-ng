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
import Calendar from "components/UI/Calender";

const CallHistory = () => {
	const dispatch = useDispatch();
	const CallHistory = useSelector(callHistory);
	const callHistoryDetails = useSelector(selectedCallHistory);
	const [detailsOn, setDetailsOn] = useState(false);
	const [getCallHistories, { data, isLoading, isFetching }] = useLazyGetCallHistoriesQuery();
	const [dispCalendar, setDispCalendar] = useState(false);
	const callHistoryQueries = useSelector(queries);
	const callHistoryStrQueries = useSelector(strQueries);

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

	useEffect(() => {
		setDetailsOn(Object.keys(callHistoryDetails).length > 1);
	}, [callHistoryDetails]);

	const onFilter = (queries: any) => {
		dispatch(setQueries({ ...callHistoryQueries, ...queries }));

		const fetchCallHistory = async () => {
			await getCallHistories(callHistoryStrQueries);
			setDispCalendar(false);
		};

		fetchCallHistory();
	};

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
						{!Object.keys(callHistoryDetails).length ? (
							<RecentsSidebar
								dispCalendar={dispCalendar}
								setDispCalendar={setDispCalendar}
								loading={isLoading}
								callLen={CallHistory.length}
							/>
						) : null}

						{dispCalendar ? (
							<Calendar
								placeholder1="From"
								placeholder2="To"
								setDispCalendar={setDispCalendar}
								filter={onFilter}
								loading={isFetching}
							/>
						) : null}

						<div className={styles.rightCont}>
							<div className={styles.header}>
								<Header />
							</div>

							{detailsOn && Object.keys(callHistoryDetails).length ? <ContactDetails /> : null}

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
