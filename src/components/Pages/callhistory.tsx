import React from "react";
// import style from "./callhistory.module.scss";
import style from "./callHistory.module.scss";
import LayoutWrapper from "components/LayoutWrapper";
import NoRecentActivity from "components/CallHistory/NoRecentActivity";
import NoRecordSelected from "components/CallHistory/NoRecordSelected";
import Header from "components/CallHistory/Header";
import RecentsSidebar from "components/CallHistory/RecentsSidebar";

const Callhistory = () => {
	return (
		<>
			<div style={{ position: "relative", width: "100%", height: "100vh" }}>
				<LayoutWrapper>
					{false && <NoRecentActivity />}

					<section className={` flex ${style.recent}`}>
						<RecentsSidebar/>

						
						<div className={style.header}>
							<Header />
						</div>

                        

						{false && (
							<div className={style.noRecords}>
								<NoRecordSelected />
							</div>
						)}


					</section>
				</LayoutWrapper>
			</div>
		</>
	);
};

export default Callhistory;
