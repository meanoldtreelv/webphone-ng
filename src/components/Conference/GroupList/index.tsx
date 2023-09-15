import React, { useState } from "react";
import classes from "./groupList.module.scss";
import GroupCard from "../GroupCard";
import GroupCalHistoryCard from "../GroupCallHistoryCard";

const GroupList = () => {
	let [changeList, setChangeList] = useState("group");
	return (
		<div className={classes.contact} style={{ background: "var(--background-primary, #FFF)" }}>
			<div className={classes.contact_search}>
				<input type="text" placeholder="Search number" />

				<span className={`${classes.add_contact}`}>
					<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
						<path
							d="M12 15.75V14.25C12 13.4544 11.6839 12.6913 11.1213 12.1287C10.5587 11.5661 9.79565 11.25 9 11.25H4.5C3.70435 11.25 2.94129 11.5661 2.37868 12.1287C1.81607 12.6913 1.5 13.4544 1.5 14.25V15.75M14.25 6V10.5M16.5 8.25H12M9.75 5.25C9.75 6.90685 8.40685 8.25 6.75 8.25C5.09315 8.25 3.75 6.90685 3.75 5.25C3.75 3.59315 5.09315 2.25 6.75 2.25C8.40685 2.25 9.75 3.59315 9.75 5.25Z"
							stroke="white"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</span>

				<svg
					width="16"
					height="16"
					viewBox="0 0 16 16"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					className={classes.search_icon}>
					<g id="line / search">
						<path
							id="Vector"
							d="M14 14L10.5354 10.5354M10.5354 10.5354C11.4731 9.59765 11.9999 8.32583 11.9999 6.9997C11.9999 5.67357 11.4731 4.40175 10.5354 3.46403C9.59765 2.52632 8.32583 1.99951 6.9997 1.99951C5.67357 1.99951 4.40175 2.52632 3.46403 3.46403C2.52632 4.40175 1.99951 5.67357 1.99951 6.9997C1.99951 8.32583 2.52632 9.59765 3.46403 10.5354C4.40175 11.4731 5.67357 11.9999 6.9997 11.9999C8.32583 11.9999 9.59765 11.4731 10.5354 10.5354Z"
							stroke="#9298A0"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</g>
				</svg>
			</div>

			<div
				className={`body flex pl-[16px] pt-[8px] gap-x-[20px] mb-[8px] ${classes.heads}`}
				style={{ color: "var(--text-secondary, #5C6168)", borderBottom: "1px solid var(--border-secondary, #C8D3E0)" }}>
				<span
					className="pb-[10px]"
					onClick={() => {setChangeList("group")}}
					style={changeList==="group" ? { color: "var(--text-link, #1480E1)", borderBottom: "2px solid var(--text-link, #1480E1)", cursor:"default" } : { color: "var(--text-secondary, #5C6168)", borderBottom: "none" , cursor:"default"}}>
					Groups
				</span>
				<span
					className="pb-[10px]"
					onClick={() => {
						setChangeList("groupCallHistory");
					}}
					style={changeList==="groupCallHistory" ? { color: "var(--text-link, #1480E1)", borderBottom: "2px solid var(--text-link, #1480E1)", cursor:"default" } : { color: "var(--text-secondary, #5C6168)", borderBottom: "none" , cursor:"default"}}
					>
					Call History
				</span>
			</div>

			<div className={`flex flex-col gap-y-1.5 ${classes.list}`}>
				{changeList === "group" ? (
					<>
						<GroupCard />
						<GroupCard />
						<GroupCard />
						<GroupCard />
						<GroupCard />
						<GroupCard />
						<GroupCard />
						<GroupCard />
						<GroupCard />
						<GroupCard />
						<GroupCard />
						<GroupCard />
						<GroupCard />
						<GroupCard />
						<GroupCard />
						<GroupCard />
						<GroupCard />
						<GroupCard />
						<GroupCard />
						<GroupCard />
						<GroupCard />
						<GroupCard />
					</>
				) : (
					<>
						<GroupCalHistoryCard />
						<GroupCalHistoryCard />
						<GroupCalHistoryCard />
						<GroupCalHistoryCard />
						<GroupCalHistoryCard />
						<GroupCalHistoryCard />
						<GroupCalHistoryCard />
						<GroupCalHistoryCard />
						<GroupCalHistoryCard />
						<GroupCalHistoryCard />
						<GroupCalHistoryCard />
						<GroupCalHistoryCard />
						<GroupCalHistoryCard />
						<GroupCalHistoryCard />
						<GroupCalHistoryCard />
						<GroupCalHistoryCard />
					</>
				)}
			</div>
		</div>
	);
};

export default GroupList;
