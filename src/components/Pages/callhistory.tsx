import React from "react";
import style from "./callHistory.module.scss";
import LayoutWrapper from "components/LayoutWrapper";
import NoRecentActivity from "components/CallHistory/NoRecentActivity";
import NoRecordSelected from "components/CallHistory/NoRecordSelected";
import Header from "components/CallHistory/Header";
import RecentsSidebar from "components/CallHistory/RecentsSidebar";
import ContactDetails from "components/CallHistory/ContactDetails";
import ClearHistory from "components/CallHistory/ClearHistory";

const Callhistory = () => {
	return (
		<>
			<div style={{ position: "relative", width: "100%", height: "100vh" }}>
				<LayoutWrapper>
					{false && <NoRecentActivity />}

					<section className={` flex ${style.recent}`}>
						<RecentsSidebar />

						<div className={`w-[100%] flex flex-col ${style.rightCont}`}>
							<div className={style.header}>
								<Header />
							</div>

							{true && <ContactDetails />}

							{false && (
								<div className={style.noRecords}>
									<NoRecordSelected />
								</div>
							)}
						</div>
					</section>
				</LayoutWrapper>

				{false && <ClearHistory />}
			</div>
		</>
	);
};

export default Callhistory;
