import styles from "./BottomNav.module.scss";
import routePaths from "./../../../constants/routes";
import KeypadIcon from "components/UI/Icons/Sidebar/Keypad";
import ContactIcon from "components/UI/Icons/Sidebar/Contact";
import UserGroupIcon from "components/UI/Icons/Sidebar/UserGroup";
import ChatIcon from "components/UI/Icons/Sidebar/Chat";
import RecentsIcon from "components/UI/Icons/Sidebar/Recents";
import FaxIcon from "components/UI/Icons/Sidebar/Fax";
import VoicemailIcon from "components/UI/Icons/Sidebar/Voicemail";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const BottomNav = () => {
	const [tabActive, setTabActive] = useState("1");
	const [tabHovered, setTabHovered] = useState("1");

	const sidebarBtmLinks = [
		{
			path: routePaths.CONTACT.ROUTE,
			icon: <ContactIcon tabActive={tabActive} tabHovered={tabHovered} />,
			name: "Contacts",
		},
		{
			path: routePaths.CONFERENCE.GROUPS.ROUTE,
			icon: <UserGroupIcon tabActive={tabActive} tabHovered={tabHovered} />,
			name: "Conference",
		},
        {
			path: routePaths.DASHBOARD.ROUTE,
			icon: <KeypadIcon tabActive={tabActive} tabHovered={tabHovered} />,
			name: "Keypad",
		},
		{
			path: routePaths.CALL_HISTORY.ROUTE,
			icon: <RecentsIcon tabActive={tabActive} tabHovered={tabHovered} />,
			name: "Recent",
		},
		{
			path: routePaths.VOICEMAIL.ROUTE,
			icon: <VoicemailIcon tabActive={tabActive} tabHovered={tabHovered} />,
			name: "Voicemail",
		},
	];

	return (
		<div className={styles.bottomNav}>
			{sidebarBtmLinks.map((link) => (
				<NavLink
					to={link.path}
					className={({ isActive }: { isActive: boolean }) =>
						[styles.sidebar_tab, isActive ? styles.active_tab : null].join(" ")
					}>
					<span className={styles.sidebar_icon}>{link.icon}</span>
					<span className={`${styles.sidebar_tabExpanded}`}>
						<span>{link.name}</span>
						<span className={styles.sidebar_unreadMsg}>{link.unread}</span>
					</span>
				</NavLink>
			))}
		</div>
	);
};

export default BottomNav;
