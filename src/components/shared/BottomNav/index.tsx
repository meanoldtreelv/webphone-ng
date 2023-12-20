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
import ApplicationIcon from "components/UI/Icons/Application";
import SidecarIcon from "components/UI/Icons/Sidebar/Sidecar";
import SettingsIcon from "components/UI/Icons/Sidebar/Settings";
import MeetIcon from "components/UI/Icons/Sidebar/Meet";
import XIcon from "components/UI/Icons/X";

const BottomNav = () => {
	const [tabActive, setTabActive] = useState("1");
	const [tabHovered, setTabHovered] = useState("1");
	const [moreOpt, setMoreOpt] = useState(false);

	const sidebarBtmLinks = [
		{
			path: routePaths.CONTACT.ROUTE,
			icon: <ContactIcon tabActive={tabActive} tabHovered={tabHovered} />,
			name: "Contacts",
		},
		{
			path: routePaths.CHAT.ROUTE,
			icon: <ChatIcon tabActive={tabActive} tabHovered={tabHovered} />,
			name: "Texting",
			unread: 0,
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
			icon: <ApplicationIcon />,
			name: "More",
		},
	];

	const sidebarBtmMoreLinks = [
		// {
		// 	path: routePaths.CONFERENCE.ROUTE,
		// 	icon: <FaxIcon tabActive={tabActive} tabHovered={tabHovered} />,
		// 	name: "Fax",
		// 	unread: 2,
		// },
		// {
		// 	path: routePaths.CONFERENCE.GROUPS.ROUTE,
		// 	icon: <UserGroupIcon tabActive={tabActive} tabHovered={tabHovered} />,
		// 	name: "Conference",
		// },
		{
			path: routePaths.VOICEMAIL.ROUTE,
			icon: <VoicemailIcon tabActive={tabActive} tabHovered={tabHovered} />,
			name: "Voicemail",
			unread: 4,
		},
		{ path: routePaths.SIDECAR.ROUTE, icon: <SidecarIcon />, name: "Sidecar", unread: 2 },
		{ path: routePaths.MEET.ROUTE, icon: <MeetIcon />, name: "RingPlan Meet", unread: 0 },
		{
			path: routePaths.SETTINGS.ROUTE,
			icon: <SettingsIcon tabActive={tabActive} tabHovered={tabHovered} />,
			name: "Settings",
			unread: 3,
		},
	];

	return (
		<div className={styles.bottomNav}>
			{sidebarBtmLinks.map((link) =>
				link.name !== "More" ? (
					<NavLink
						to={link.path}
						className={() =>
							[styles.sidebar_tab, link.path === window.location.pathname ? styles.active_tab : null].join(" ")
						}
						key={link.name}>
						<span className={styles.sidebar_icon}>{link.icon}</span>
						<span className={`${styles.sidebar_tabExpanded}`}>
							<span>{link.name}</span>
							{/* <span className={styles.sidebar_unreadMsg}>{link.unread}</span> */}
						</span>
					</NavLink>
				) : (
					<div className={styles.moreOpt} key={link.name}>
						<div className={`${styles.moreOptIn}  ${moreOpt ? styles.moreOptIn_on : styles.moreOptIn_remove}`}>
							<div>
								<button onClick={() => setMoreOpt(false)}>
									<XIcon />
								</button>
								<div className={styles.more_wrapper}>
									{sidebarBtmMoreLinks.map((link) => (
										<NavLink
											to={link.path}
											key={link.name}
											className={({ isActive }: { isActive: boolean }) =>
												[styles.sidebar_tab, isActive ? styles.active_tab : null].join(" ")
											}>
											<span className={styles.sidebar_icon}>{link.icon}</span>
											<span className={`${styles.sidebar_tabExpanded}`}>
												<span>{link.name}</span>
												{/* <span className={styles.sidebar_unreadMsg}>{link.unread}</span> */}
											</span>
										</NavLink>
									))}
								</div>
							</div>
						</div>

						<button onClick={() => setMoreOpt(true)}>
							<span className={styles.sidebar_icon}>{link.icon}</span>
							<span className={`${styles.sidebar_tabExpanded}`}>
								<span>{link.name}</span>
								<span className={styles.sidebar_unreadMsg}>{link.unread}</span>
							</span>
						</button>
					</div>
				),
			)}
		</div>
	);
};

export default BottomNav;
