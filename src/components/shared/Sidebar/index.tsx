import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import styles from "./Sidebar.module.scss";
import routePaths from "./../../../constants/routes";
import SettingsIcon from "components/UI/Icons/Sidebar/Settings";
import VoicemailIcon from "components/UI/Icons/Sidebar/Voicemail";
import RecentsIcon from "components/UI/Icons/Sidebar/Recents";
import ChatIcon from "components/UI/Icons/Sidebar/Chat";
import ContactIcon from "components/UI/Icons/Sidebar/Contact";
import KeypadIcon from "components/UI/Icons/Sidebar/Keypad";
import SidecarIcon from "components/UI/Icons/Sidebar/Sidecar";
import MeetIcon from "components/UI/Icons/Sidebar/Meet";
import { useDispatch, useSelector } from "react-redux";
import Logo from "components/UI/Logo";
import { ClipLoader } from "react-spinners";
import { loader } from "redux/common/commonSelectors";
import { unreadMessageCount } from "redux/chat/chatSelectors";
import { setUnreadMessageCount } from "redux/chat/chatSlice";
import FaxIcon from "components/UI/Icons/Sidebar/Fax";
import UserGroupIcon from "components/UI/Icons/Sidebar/UserGroup";

interface ISidebarLinks {
	path: string;
	icon: React.ReactElement;
	unread: number;
	name: string;
}

const Sidebar = () => {
	const dispatch = useDispatch();
	const location = useLocation();

	const unreadCount = useSelector(unreadMessageCount);
	const mainLoader = useSelector(loader);
	const { extAuth } = useSelector((state: any) => state.sip);

	const [isCollapsed, setIsCollapsed] = useState(false);
	const [tabHovered, setTabHovered] = useState("");

	const sidebarTopLinks: ISidebarLinks[] = extAuth
		? [
				{
					path: routePaths.DASHBOARD.ROUTE,
					icon: (
						<KeypadIcon
							color={`${
								tabHovered === "Keypad" || location.pathname === "/dashboard" ? "primary-default" : "icon-primary"
							}`}
						/>
					),
					name: "Keypad",
					unread: 0,
				},
				{
					path: routePaths.CONTACT.ROUTE,
					icon: (
						<ContactIcon
							color={`${
								tabHovered === "Contacts" || location.pathname === "/contact" ? "primary-default" : "icon-primary"
							}`}
						/>
					),
					name: "Contacts",
					unread: 0,
				},
				{
					path: routePaths.CHAT.ROUTE,
					icon: (
						<ChatIcon
							color={`${
								tabHovered === "Texting" || location.pathname === "/texting" ? "primary-default" : "icon-primary"
							}`}
						/>
					),
					name: "Texting",
					unread: unreadCount,
				},
				{
					path: routePaths.CALL_HISTORY.ROUTE,
					icon: (
						<RecentsIcon
							color={`${
								tabHovered === "Recent" || location.pathname === "/call-history" ? "primary-default" : "icon-primary"
							}`}
						/>
					),
					name: "Recent",
					unread: 0,
				},
				{
					path: routePaths.VOICEMAIL.ROUTE,
					icon: (
						<VoicemailIcon
							color={`${
								tabHovered === "Voicemail" || location.pathname === "/voicemail" ? "primary-default" : "icon-primary"
							}`}
						/>
					),
					name: "Voicemail",
					unread: 0,
				},
		  ]
		: [
				{
					path: routePaths.DASHBOARD.ROUTE,
					icon: (
						<KeypadIcon
							color={`${
								tabHovered === "Keypad" || location.pathname === "/dashboard" ? "primary-default" : "icon-primary"
							}`}
						/>
					),
					name: "Keypad",
					unread: 0,
				},
				{
					path: routePaths.CONTACT.ROUTE,
					icon: (
						<ContactIcon
							color={`${
								tabHovered === "Contacts" || location.pathname === "/contact" ? "primary-default" : "icon-primary"
							}`}
						/>
					),
					name: "Contacts",
					unread: 0,
				},
				{
					path: routePaths.CHAT.ROUTE,
					icon: (
						<ChatIcon
							color={`${
								tabHovered === "Texting" || location.pathname === "/texting" ? "primary-default" : "icon-primary"
							}`}
						/>
					),
					name: "Texting",
					unread: unreadCount,
				},

				{
					path: routePaths.CALL_HISTORY.ROUTE,
					icon: (
						<RecentsIcon
							color={`${
								tabHovered === "Recent" || location.pathname === "/call-history" ? "primary-default" : "icon-primary"
							}`}
						/>
					),
					name: "Recent",
					unread: 0,
				},

				{
					path: routePaths.VOICEMAIL.ROUTE,
					icon: (
						<VoicemailIcon
							color={`${
								tabHovered === "Voicemail" || location.pathname === "/voicemail" ? "primary-default" : "icon-primary"
							}`}
						/>
					),
					name: "Voicemail",
					unread: 0,
				},
				// {
				// 	path: routePaths.CONFERENCE.GROUPS.ROUTE,
				// 	icon: (
				// 		<UserGroupIcon
				// 			color={`${tabHovered === "Conference" || location.pathname === "/" ? "primary-default" : "icon-primary"}`}
				// 		/>
				// 	),
				// 	name: "Conference",
				// 	unread: 0,
				// },
				// {
				// 	path: routePaths.CONFERENCE.ROUTE,
				// 	icon: (
				// 		<FaxIcon color={`${tabHovered === "Fax" || location.pathname === "/" ? "primary-default" : "icon-primary"}`} />
				// 	),
				// 	name: "Fax",
				// 	unread: 0,
				// },
		  ];

	const sidebarBtmLinks: ISidebarLinks[] = extAuth
		? [
				{ path: routePaths.MEET.ROUTE, icon: <MeetIcon />, name: "RingPlan Meet", unread: 0 },
				{
					path: routePaths.SETTINGS.ROUTE,
					icon: (
						<SettingsIcon
							color={`${
								tabHovered === "Settings" || location.pathname === "/settings" ? "primary-default" : "icon-primary"
							}`}
						/>
					),
					name: "Settings",
					unread: 0,
				},
		  ]
		: [
				{ path: routePaths.SIDECAR.ROUTE, icon: <SidecarIcon />, name: "Sidecar", unread: 0 },
				{ path: routePaths.MEET.ROUTE, icon: <MeetIcon />, name: "RingPlan Meet", unread: 0 },
				{
					path: routePaths.SETTINGS.ROUTE,
					icon: (
						<SettingsIcon
							color={`${
								tabHovered === "Settings" || location.pathname === "/settings" ? "primary-default" : "icon-primary"
							}`}
						/>
					),
					name: "Settings",
					unread: 0,
				},
		  ];

	const unreadHandler = (path) => {
		if (path === "/texting") {
			dispatch(setUnreadMessageCount(0));
		}
	};

	return (
		<section className={styles.sidebarBox} style={{ width: `${!isCollapsed ? "64px" : "calc(100vw - 15px)"}` }}>
			{mainLoader ? (
				<div className={styles.spinnerMain}>
					<ClipLoader size={13} color="var(--text-secondary)" />
					<p>Loading...</p>
				</div>
			) : null}
			<section className={styles.sidebar} style={{ width: `${!isCollapsed ? "64px" : "280px"}` }}>
				<div
					className={styles.sidebar_logoIcon}
					onClick={() => {
						setIsCollapsed(!isCollapsed);
					}}>
					<Logo type="ri" />
				</div>
				<div className={styles.sidebar_tabBox}>
					<div className={styles.sidebar_topTab}>
						{sidebarTopLinks.map((link: ISidebarLinks) => (
							<NavLink
								to={link.path}
								className={({ isActive }: { isActive: boolean }) =>
									[styles.sidebar_tab, isActive ? styles.active_tab : ""].join(" ")
								}
								key={link.name}
								onClick={() => {
									unreadHandler(link?.path);
								}}
								onMouseOver={() => {
									setTabHovered(link?.name);
								}}
								onMouseOut={() => {
									setTabHovered("");
								}}>
								<span className={`${!isCollapsed && link.unread > 0 ? styles.sidebar_icon : ""}`}>{link.icon}</span>
								{isCollapsed && (
									<span className={`${styles.sidebar_tabExpanded}`}>
										<span>{link.name}</span>
										{link.unread > 0 && <span className={styles.sidebar_unreadMsg}>{link.unread}</span>}
									</span>
								)}
							</NavLink>
						))}
					</div>
					<div className={styles.sidebar_topTab}>
						{sidebarBtmLinks.map((link: ISidebarLinks) => {
							if (localStorage.getItem("extAuth") === "true" && link.name === "RingPlan Meet") return null;

							return (
								<NavLink
									to={link.path}
									className={({ isActive }: { isActive: boolean }) =>
										[styles.sidebar_tab, isActive ? styles.active_tab : null].join(" ")
									}
									key={link.name}
									onClick={unreadHandler}>
									<span className={` ${!isCollapsed && link.unread > 0 ? styles.sidebar_icon : ""}`}>{link.icon}</span>
									{isCollapsed && (
										<span className={`${styles.sidebar_tabExpanded}`}>
											<span>{link.name}</span>
											{link.unread > 0 && <span className={styles.sidebar_unreadMsg}>{link.unread}</span>}
										</span>
									)}
								</NavLink>
							);
						})}
					</div>
				</div>
			</section>
		</section>
	);
};

export default Sidebar;
