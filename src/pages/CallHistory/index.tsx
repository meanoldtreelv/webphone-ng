import styles from "./CallHistory.module.scss";
import NoRecentActivity from "../../components/CallHistory/NoRecentActivity";
import NoRecordSelected from "../../components/CallHistory/NoRecordSelected";
import Header from "../../components/CallHistory/Header";
import RecentsSidebar from "../../components/CallHistory/RecentsSidebar";
import ContactDetails from "../../components/CallHistory/ContactDetails";
import BaseLayout from "../../layouts/BaseLayout";
import PromptDialog from "../../components/Modal/PromptDialog";
import { useSelector } from "react-redux";
import { callHistory } from "redux/call-history/callHistorySelectors";
import { useGetContactsQuery } from "services/contact";

const CallHistory = () => {
	const CallHistory = useSelector(callHistory);

	return (
		<div className={styles.callHistory}>
			<BaseLayout>
				{CallHistory.length === 0 ? (
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

							{false && <ContactDetails />}

							{true && (
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
