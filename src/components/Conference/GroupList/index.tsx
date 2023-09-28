import { useEffect } from "react";
import styles from "./GroupList.module.scss";
import GroupCard from "../GroupCard";
import GroupCalHistoryCard from "../GroupCallHistoryCard";
import UserAddIcon from "components/UI/Icons/User/UserAdd";
import SearchIcon from "components/UI/Icons/Search";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import routes from "./../../../constants/routes";

const GroupList = () => {
	const navigate = useNavigate();
	const pathname = useLocation().pathname;
	const current_path = pathname === routes.CONFERENCE.CALL_HISTORY.ROUTE;

	useEffect(() => {
		if (pathname == routes.CONFERENCE.ROUTE)
			navigate(`/${routes.CONFERENCE.__PATH}/${routes.CONFERENCE.GROUPS.__PATH}`, { replace: true });
	}, [pathname]);

	return (
		<div className={styles.contact}>
			<div className={styles.contact_search}>
				<input type="text" placeholder="Search number" />

				<span className={`${styles.add_contact}`}>
					<UserAddIcon />
				</span>

				<div className={styles.search_icon}>
					<SearchIcon />
				</div>
			</div>

			<div className={styles.groupNav}>
				<NavLink
					to={routes.CONFERENCE.GROUPS.ROUTE}
					className={({ isActive }: { isActive: boolean }) =>
						[styles.side_tab, isActive ? styles.active_tab : null].join(" ")
					}>
					Groups
				</NavLink>
				<NavLink
					to={routes.CONFERENCE.CALL_HISTORY.ROUTE}
					className={({ isActive }: { isActive: boolean }) =>
						[styles.side_tab, isActive ? styles.active_tab : null].join(" ")
					}>
					Call History
				</NavLink>
			</div>

			<div className={styles.list}>
				{!current_path ? (
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
