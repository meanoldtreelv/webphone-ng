import { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import Logo from "components/UI/Logo";
import ClioIcon from "components/UI/Icons/Clio";
import { ClipLoader } from "react-spinners";
import { loader } from "redux/common/commonSelectors";
import { getCookie } from "typescript-cookie";
import { clioConstants } from "constants/clioConstants";
import { setIsClioLoggedIn } from "redux/clio/clioSlice";
import { isClioLoggedIn } from "redux/clio/clioSelectors";

interface ISidebarLinks {
	path: string;
	icon: React.ReactElement;
	unread: number;
	name: string;
}
const Sidebar = () => {
	const [isCollapsed, setIsCollapsed] = useState(false);
	const mainLoader = useSelector(loader);
	const [tabActive, setTabActive] = useState("1");
	const [tabHovered, setTabHovered] = useState("1");

	const [unreadMessage, setUnreadMessage] = useState(false);

	const { extAuth } = useSelector((state: any) => state.sip);

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

	// const toggleCollapsed = () => {
	// 	setIsCollapsed(!isCollapsed);
	// };

	// const sidebarTopLinks: ISidebarLinks[] = extAuth

	const dispatch = useDispatch();
	const clioLoggedIn = useSelector(isClioLoggedIn);

	// clio authentication condition
	useEffect(() => {
		const clioToken = getCookie(clioConstants.clioAccessToken);
		if (clioToken) {
			dispatch(setIsClioLoggedIn(true));
		}
	}, []);

	const sidebarTopLinks: ISidebarLinks[] = extAuth
		? [
				{
					path: routePaths.DASHBOARD.ROUTE,
					icon: <KeypadIcon tabActive={tabActive} tabHovered={tabHovered} />,
					name: "Keypad",
					unread: 0,
				},
				{
					path: routePaths.CONTACT.ROUTE,
					icon: <ContactIcon tabActive={tabActive} tabHovered={tabHovered} />,
					name: "Contacts",
					unread: 3,
				},
				{
					path: routePaths.CHAT.ROUTE,
					icon: <ChatIcon tabActive={tabActive} tabHovered={tabHovered} />,
					name: "Texting",
					unread: 1,
				},
				{
					path: routePaths.CALL_HISTORY.ROUTE,
					icon: <RecentsIcon tabActive={tabActive} tabHovered={tabHovered} />,
					name: "Recent",
					unread: 1,
				},
				{
					path: routePaths.VOICEMAIL.ROUTE,
					icon: <VoicemailIcon tabActive={tabActive} tabHovered={tabHovered} />,
					name: "Voicemail",
					unread: 4,
				},
		  ]
		: [
				{
					path: routePaths.DASHBOARD.ROUTE,
					icon: <KeypadIcon tabActive={tabActive} tabHovered={tabHovered} />,
					name: "Keypad",
					unread: 0,
				},
				{
					path: routePaths.CONTACT.ROUTE,
					icon: <ContactIcon tabActive={tabActive} tabHovered={tabHovered} />,
					name: "Contacts",
					unread: 3,
				},
				{
					path: routePaths.CHAT.ROUTE,
					icon: <ChatIcon tabActive={tabActive} tabHovered={tabHovered} />,
					name: "Texting",
					unread: 0,
				},
				// {
				// 	path: routePaths.CONFERENCE.GROUPS.ROUTE,
				// 	icon: <UserGroupIcon tabActive={tabActive} tabHovered={tabHovered} />,
				// 	name: "Conference",
				// 	unread: 3,
				// },
				// {
				// 	path: routePaths.CONFERENCE.ROUTE,
				// 	icon: <ChatIcon tabActive={tabActive} tabHovered={tabHovered} />,
				// 	name: "Texting",
				// 	unread: 1,
				// },
				{
					path: routePaths.CALL_HISTORY.ROUTE,
					icon: <RecentsIcon tabActive={tabActive} tabHovered={tabHovered} />,
					name: "Recent",
					unread: 1,
				},
				// {
				// 	path: routePaths.CONFERENCE.ROUTE,
				// 	icon: <FaxIcon tabActive={tabActive} tabHovered={tabHovered} />,
				// 	name: "Fax",
				// 	unread: 2,
				// },
				{
					path: routePaths.VOICEMAIL.ROUTE,
					icon: <VoicemailIcon tabActive={tabActive} tabHovered={tabHovered} />,
					name: "Voicemail",
					unread: 4,
				},
		  ];

	const sidebarBtmLinks: ISidebarLinks[] = extAuth
		? [
				{
					path: routePaths.CLIO.ROUTE,
					icon: <ClioIcon color={`${clioLoggedIn ? "icon-emphasis" : "icon-primary"}`} />,
					name: "Clio",
					unread: 0,
				},
				{ path: routePaths.MEET.ROUTE, icon: <MeetIcon />, name: "RingPlan Meet", unread: 0 },
				{
					path: routePaths.SETTINGS.ROUTE,
					icon: <SettingsIcon tabActive={tabActive} tabHovered={tabHovered} />,
					name: "Settings",
					unread: 3,
				},
		  ]
		: [
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
								// onClick={toggleCollapsed}
							>
								<span className={` ${!isCollapsed && unreadMessage ? styles.sidebar_icon : ""}`}>{link.icon}</span>
								{isCollapsed && (
									<span className={`${styles.sidebar_tabExpanded}`}>
										<span>{link.name}</span>
										{/* {link.unread > 0 && <span className={styles.sidebar_unreadMsg}>{link.unread}</span>} */}
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
									// onClick={toggleCollapsed}
								>
									<span className={` ${!isCollapsed && unreadMessage ? styles.sidebar_icon : ""}`}>{link.icon}</span>
									{isCollapsed && (
										<span className={`${styles.sidebar_tabExpanded}`}>
											<span>{link.name}</span>
											{/* {link.unread > 0 && <span className={styles.sidebar_unreadMsg}>{link.unread}</span>} */}
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
