import { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.scss";
import routePaths from "./../../../constants/routes";
import SettingsIcon from "components/UI/Icons/Sidebar/Settings";
import VoicemailIcon from "components/UI/Icons/Sidebar/Voicemail";
import FaxIcon from "components/UI/Icons/Sidebar/Fax";
import RecentsIcon from "components/UI/Icons/Sidebar/Recents";
import ChatIcon from "components/UI/Icons/Sidebar/Chat";
import UserGroupIcon from "components/UI/Icons/Sidebar/UserGroup";
import ContactIcon from "components/UI/Icons/Sidebar/Contact";
import KeypadIcon from "components/UI/Icons/Sidebar/Keypad";
import SidecarIcon from "components/UI/Icons/Sidebar/Sidecar";
import MeetIcon from "components/UI/Icons/Sidebar/Meet";

interface ISidebarLinks {
	path: string;
	icon: React.ReactElement;
	unread: number;
	name: string;
}

const Sidebar = () => {
	const [isCollapsed, setIsCollapsed] = useState(false);

	const [tabActive, setTabActive] = useState("1");
	const [tabHovered, setTabHovered] = useState("1");

	const [unreadMessage, setUnreadMessage] = useState(true);

	// the above two functions, they need to be removed
	// use sass
	const activeTabStyle = {
		background: "var(--background-active, rgba(25, 138, 240, 0.1))",
		color: "var(--text-link, #1480e1)",
	};

	const hoveredTabStyle = {
		background: "var(--background-active, rgba(25, 138, 240, 0.1))",
		color: "var(--text-link, #1480e1)",
	};

	const toggleCollapsed = () => {
		setIsCollapsed(!isCollapsed);
	};

	const sidebarTopLinks: ISidebarLinks[] = [
		{
			path: routePaths.DASHBOARD.__PATH,
			icon: <KeypadIcon tabActive={tabActive} tabHovered={tabHovered} />,
			name: "Keypad",
			unread: 2,
		},
		{
			path: routePaths.CONTACT.__PATH,
			icon: <ContactIcon tabActive={tabActive} tabHovered={tabHovered} />,
			name: "Contacts",
			unread: 3,
		},
		{
			path: routePaths.CONFERENCE.__PATH,
			icon: <UserGroupIcon tabActive={tabActive} tabHovered={tabHovered} />,
			name: "Conference",
			unread: 3,
		},
		{
			path: routePaths.CONFERENCE.__PATH,
			icon: <ChatIcon tabActive={tabActive} tabHovered={tabHovered} />,
			name: "Texting",
			unread: 1,
		},
		{
			path: routePaths.CONFERENCE.__PATH,
			icon: <RecentsIcon tabActive={tabActive} tabHovered={tabHovered} />,
			name: "Recent",
			unread: 1,
		},
		{
			path: routePaths.CONFERENCE.__PATH,
			icon: <FaxIcon tabActive={tabActive} tabHovered={tabHovered} />,
			name: "Fax",
			unread: 2,
		},
		{
			path: routePaths.VOICEMAIL.__PATH,
			icon: <VoicemailIcon tabActive={tabActive} tabHovered={tabHovered} />,
			name: "Voicemail",
			unread: 4,
		},
	];

	const sidebarBtmLinks: ISidebarLinks[] = [
		{ path: routePaths.DASHBOARD.__PATH, icon: <SidecarIcon />, name: "Sidecar", unread: 2 },
		{ path: routePaths.CONTACT.__PATH, icon: <MeetIcon />, name: "Download RingPlan Meet", unread: 3 },
		{
			path: routePaths.SETTINGS.__PATH,
			icon: <SettingsIcon tabActive={tabActive} tabHovered={tabHovered} />,
			name: "Settings",
			unread: 3,
		},
	];

	return (
		<section className={styles.sidebarBox} style={{ width: `${!isCollapsed ? "64px" : "calc(100vw - 15px)"}` }}>
			<section className={styles.sidebar} style={{ width: `${!isCollapsed ? "64px" : "280px"}` }}>
				<div
					className={styles.sidebar_logoIcon}
					onClick={() => {
						setIsCollapsed(!isCollapsed);
					}}>
					<img src="/icon/ri.svg" alt="" />
				</div>
				<div className={styles.sidebar_tabBox}>
					<div className={styles.sidebar_topTab}>
						{sidebarTopLinks.map((link: ISidebarLinks) => (
							<NavLink
								to={`/${link.path}`}
								className={({ isActive }: { isActive: boolean }) =>
									[`body ${styles.sidebar_tab}`, isActive ? styles.active_tab : null].join(" ")
								}
								onClick={toggleCollapsed}>
								<span className={` ${!isCollapsed && unreadMessage ? styles.sidebar_icon : ""}`}>{link.icon}</span>
								{isCollapsed && (
									<span className={`${styles.sidebar_tabExpanded}`}>
										<span>{link.name}</span>
										<span className={`caption_2_bold ${styles.sidebar_unreadMsg}`}>{link.unread}</span>
									</span>
								)}
							</NavLink>
						))}
					</div>
					<div className={styles.sidebar_topTab}>
						{sidebarBtmLinks.map((link: ISidebarLinks) => (
							<NavLink
								to={`/${link.path}`}
								className={({ isActive }: { isActive: boolean }) =>
									[`body ${styles.sidebar_tab}`, isActive ? styles.active_tab : null].join(" ")
								}
								onClick={toggleCollapsed}>
								<span className={` ${!isCollapsed && unreadMessage ? styles.sidebar_icon : ""}`}>{link.icon}</span>
								{isCollapsed && (
									<span className={`${styles.sidebar_tabExpanded}`}>
										<span>{link.name}</span>
										<span className={`caption_2_bold ${styles.sidebar_unreadMsg}`}>{link.unread}</span>
									</span>
								)}
							</NavLink>
						))}
					</div>
				</div>
			</section>
		</section>
	);
};

export default Sidebar;
