import { useState } from "react";
import styles from "./GroupList.module.scss";
import GroupCard from "../GroupCard";
import GroupCalHistoryCard from "../GroupCallHistoryCard";
import UserAddIcon from "components/UI/Icons/User/UserAdd";
import SearchIcon from "components/UI/Icons/Search";
import { NavLink, useLocation } from "react-router-dom";
import routes from './../../../constants/routes';

const GroupList = () => {
	let [changeList, setChangeList] = useState("group");

	return (
		<div className={styles.contact} style={{ background: "var(--background-primary, #FFF)" }}>
			<div className={styles.contact_search}>
				{/* reminder: replace tag with the 'Input' component */}
				<input type="text" placeholder="Search number" />

				<span className={`${styles.add_contact}`}>
					<UserAddIcon />
				</span>

				{/* styles.search_icon belongs here */}
				<div className={styles.search_icon}>
					<SearchIcon />
				</div>
			</div>

			<div
				className={`body flex pl-[16px] pt-[8px] gap-x-[20px] mb-[8px] ${styles.heads}`}
				style={{ color: "var(--text-secondary, #5C6168)", borderBottom: "1px solid var(--border-secondary, #C8D3E0)" }}>
				{/* <NavLink
					to={routes.CONFERENCE.GROUPS.__PATH}
					className="pb-[10px]"
					onClick={() => {setChangeList("group")}}
					style={changeList==="group" ? { color: "var(--text-link, #1480E1)", borderBottom: "2px solid var(--text-link, #1480E1)" } : { color: "var(--text-secondary, #5C6168)", borderBottom: "none"}}>
					Groups
				</NavLink>
				<NavLink
					to={routes.CONFERENCE.CALL_HISTORY.__PATH}
					className="pb-[10px]"
					onClick={() => {
						setChangeList("groupCallHistory");
					}}
					style={changeList==="groupCallHistory" ? { color: "var(--text-link, #1480E1)", borderBottom: "2px solid var(--text-link, #1480E1)"} : { color: "var(--text-secondary, #5C6168)", borderBottom: "none"}}
					>
					Call History
				</NavLink> */}

				{/* the above approach is not done but it will be used */}
				<span
					className="pb-[10px]"
					onClick={() => {setChangeList("group")}}
					style={changeList==="group" ? { color: "var(--text-link, #1480E1)", borderBottom: "2px solid var(--text-link, #1480E1)" } : { color: "var(--text-secondary, #5C6168)", borderBottom: "none"}}>
					Groups
				</span>
				<span
					className="pb-[10px]"
					onClick={() => {
						setChangeList("groupCallHistory");
					}}
					style={changeList==="groupCallHistory" ? { color: "var(--text-link, #1480E1)", borderBottom: "2px solid var(--text-link, #1480E1)"} : { color: "var(--text-secondary, #5C6168)", borderBottom: "none"}}
					>
					Call History
				</span>
			</div>

			<div className={`flex flex-col gap-y-1.5 ${styles.list}`}>
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
