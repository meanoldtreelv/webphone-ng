import React from "react";
import style from "./conference.module.scss";
import LayoutWrapper from "components/LayoutWrapper";
import StartConference from "components/Conference/StartConference";
import GroupList from "components/Conference/GroupList";
import NoGroupSelected from "components/Conference/NoGroupSelected";
import Header from "components//Conference/Header";
import Members from "components/Conference/Members";
import GroupDetails from "components/Conference/GroupDetails";

const Conference = () => {
	return (
		<div
			style={{ position: "relative", width: "100%", height: "100vh"}}>
			<LayoutWrapper>
				{false && <StartConference />}

				{true && (
					<section className={` flex ${style.recent}`}>
						<GroupList />

						<div className={`w-[100%] flex flex-col ${style.rightCont}`}>
							<div className={style.body}>
								<Header />
								<Members />
								<GroupDetails />
							</div>

							{false && (
								<div className={style.noRecords}>
									<NoGroupSelected />
								</div>
							)}
						</div>
					</section>
				)}
			</LayoutWrapper>
		</div>
	);
};

export default Conference;
