import styles from "./CallHistory.module.scss";
import NoRecentActivity from "../../components/CallHistory/NoRecentActivity";
import NoRecordSelected from "../../components/CallHistory/NoRecordSelected";
import Header from "../../components/CallHistory/Header";
import RecentsSidebar from "../../components/CallHistory/RecentsSidebar";
import ContactDetails from "../../components/CallHistory/ContactDetails";
import BaseLayout from "../../layouts/BaseLayout";
import PromptDialog from "../../components/Modal/PromptDialog";
import { useDispatch, useSelector } from "react-redux";
import { callHistory, selectedCallHistory } from "redux/call-history/callHistorySelectors";
import { useEffect, useState } from "react";
import { useLazyGetCallHistoryQuery } from "services/call";
import { setCallHistory } from "redux/call-history/callHistorySlice";

const CallHistory = () => {
	const dispatch = useDispatch();
	const CallHistory = useSelector(callHistory);
	const callHistoryDetails = useSelector(selectedCallHistory);
	const [detailsOn, setDetailsOn] = useState(false);
	const [getCallHistories, { data, isFetching }] = useLazyGetCallHistoryQuery();

	useEffect(() => {
		const fetchCallHistory = async () => {
			await getCallHistories("page=1");
			if (data) dispatch(setCallHistory(data));
		};

		fetchCallHistory();
	}, [data]);

	useEffect(() => {
		setDetailsOn(Object.keys(callHistoryDetails).length > 1);
	}, [callHistoryDetails]);

	return (
		<div className={styles.callHistory}>
			<BaseLayout>
				{!CallHistory.length ? (
					<>
						<NoRecentActivity />
						<div className={styles.header}>
							<Header />
						</div>
					</>
				) : (
					<section className={styles.recent}>
						<RecentsSidebar />

						<div className={styles.rightCont}>
							<div className={styles.header}>
								<Header />
							</div>

							{detailsOn && <ContactDetails />}

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
