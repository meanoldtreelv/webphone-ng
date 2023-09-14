import React, { useState } from "react";
import classes from "./sidebar.module.scss";

const Sidebar = () => {
	const [isCollapsed, setIsCollapsed] = useState(false);

	const [tabActive, setTabActive] = useState("1");
	const [tabHovered, setTabHovered] = useState("1");

	const [unreadMessage, setUnreadMessage] = useState(true);

	const activeTabStyle = {
		background: "var(--background-active, rgba(25, 138, 240, 0.1))",
		color: "var(--text-link, #1480e1)",
	};

	const hoveredTabStyle = {
		background: "var(--background-active, rgba(25, 138, 240, 0.1))",
		color: "var(--text-link, #1480e1)",
	};

	return (
		<section className={classes.sidebarBox} style={{ width: `${!isCollapsed ? "64px" : "calc(100vw - 15px)"}` }}>
			<section className={classes.sidebar} style={{ width: `${!isCollapsed ? "64px" : "280px"}` }}>
				<div
					className={classes.sidebar_logoIcon}
					onClick={() => {
						setIsCollapsed(!isCollapsed);
					}}>
					<img src="/icon/ri.svg" alt="" />
				</div>
				<div className={classes.sidebar_tabBox}>
					<div className={classes.sidebar_topTab}>
						<div
							className={`body ${classes.sidebar_tab}`}
							style={tabActive === "1" ? activeTabStyle : {}}
							onClick={() => {
								setTabActive("1");
							}}
							onMouseOver={() => {
								setTabHovered("1");
							}}
							onMouseOut={() => {
								setTabHovered("0");
							}}>
							<span className={` ${!isCollapsed && unreadMessage ? classes.sidebar_icon : ""}`}>
								{/* <img src="/icon/keypad.svg" alt="" /> */}
								<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
									<g id="line / key_pad" clipPath="url(#clip0_2158_3100)">
										<g id="Vector">
											<path
												d="M4.00033 2.66667C4.00033 3.03486 3.70185 3.33333 3.33366 3.33333C2.96547 3.33333 2.66699 3.03486 2.66699 2.66667C2.66699 2.29848 2.96547 2 3.33366 2C3.70185 2 4.00033 2.29848 4.00033 2.66667Z"
												stroke={
													tabActive === "1" || tabHovered === "1"
														? "var(--text-link, #1480e1)"
														: "var(--text-primary, #1f2023)"
												}
												strokeWidth="1.5"
											/>
											<path
												d="M4.00033 6.66667C4.00033 7.03486 3.70185 7.33333 3.33366 7.33333C2.96547 7.33333 2.66699 7.03486 2.66699 6.66667C2.66699 6.29848 2.96547 6 3.33366 6C3.70185 6 4.00033 6.29848 4.00033 6.66667Z"
												stroke={
													tabActive === "1" || tabHovered === "1"
														? "var(--text-link, #1480e1)"
														: "var(--text-primary, #1f2023)"
												}
												strokeWidth="1.5"
											/>
											<path
												d="M4.00033 10.6667C4.00033 11.0349 3.70185 11.3333 3.33366 11.3333C2.96547 11.3333 2.66699 11.0349 2.66699 10.6667C2.66699 10.2985 2.96547 10 3.33366 10C3.70185 10 4.00033 10.2985 4.00033 10.6667Z"
												stroke={
													tabActive === "1" || tabHovered === "1"
														? "var(--text-link, #1480e1)"
														: "var(--text-primary, #1f2023)"
												}
												strokeWidth="1.5"
											/>
											<path
												d="M8.66699 2.66667C8.66699 3.03486 8.36852 3.33333 8.00033 3.33333C7.63214 3.33333 7.33366 3.03486 7.33366 2.66667C7.33366 2.29848 7.63214 2 8.00033 2C8.36852 2 8.66699 2.29848 8.66699 2.66667Z"
												stroke={
													tabActive === "1" || tabHovered === "1"
														? "var(--text-link, #1480e1)"
														: "var(--text-primary, #1f2023)"
												}
												strokeWidth="1.5"
											/>
											<path
												d="M8.66699 6.66667C8.66699 7.03486 8.36852 7.33333 8.00033 7.33333C7.63214 7.33333 7.33366 7.03486 7.33366 6.66667C7.33366 6.29848 7.63214 6 8.00033 6C8.36852 6 8.66699 6.29848 8.66699 6.66667Z"
												stroke={
													tabActive === "1" || tabHovered === "1"
														? "var(--text-link, #1480e1)"
														: "var(--text-primary, #1f2023)"
												}
												strokeWidth="1.5"
											/>
											<path
												d="M8.66699 10.6667C8.66699 11.0349 8.36852 11.3333 8.00033 11.3333C7.63214 11.3333 7.33366 11.0349 7.33366 10.6667C7.33366 10.2985 7.63214 10 8.00033 10C8.36852 10 8.66699 10.2985 8.66699 10.6667Z"
												stroke={
													tabActive === "1" || tabHovered === "1"
														? "var(--text-link, #1480e1)"
														: "var(--text-primary, #1f2023)"
												}
												strokeWidth="1.5"
											/>
											<path
												d="M8.66699 14.6667C8.66699 15.0349 8.36852 15.3333 8.00033 15.3333C7.63214 15.3333 7.33366 15.0349 7.33366 14.6667C7.33366 14.2985 7.63214 14 8.00033 14C8.36852 14 8.66699 14.2985 8.66699 14.6667Z"
												stroke={
													tabActive === "1" || tabHovered === "1"
														? "var(--text-link, #1480e1)"
														: "var(--text-primary, #1f2023)"
												}
												strokeWidth="1.5"
											/>
											<path
												d="M13.3337 2.66667C13.3337 3.03486 13.0352 3.33333 12.667 3.33333C12.2988 3.33333 12.0003 3.03486 12.0003 2.66667C12.0003 2.29848 12.2988 2 12.667 2C13.0352 2 13.3337 2.29848 13.3337 2.66667Z"
												stroke={
													tabActive === "1" || tabHovered === "1"
														? "var(--text-link, #1480e1)"
														: "var(--text-primary, #1f2023)"
												}
												strokeWidth="1.5"
											/>
											<path
												d="M13.3337 6.66667C13.3337 7.03486 13.0352 7.33333 12.667 7.33333C12.2988 7.33333 12.0003 7.03486 12.0003 6.66667C12.0003 6.29848 12.2988 6 12.667 6C13.0352 6 13.3337 6.29848 13.3337 6.66667Z"
												stroke={
													tabActive === "1" || tabHovered === "1"
														? "var(--text-link, #1480e1)"
														: "var(--text-primary, #1f2023)"
												}
												strokeWidth="1.5"
											/>
											<path
												d="M13.3337 10.6667C13.3337 11.0349 13.0352 11.3333 12.667 11.3333C12.2988 11.3333 12.0003 11.0349 12.0003 10.6667C12.0003 10.2985 12.2988 10 12.667 10C13.0352 10 13.3337 10.2985 13.3337 10.6667Z"
												stroke={
													tabActive === "1" || tabHovered === "1"
														? "var(--text-link, #1480e1)"
														: "var(--text-primary, #1f2023)"
												}
												strokeWidth="1.5"
											/>
										</g>
									</g>
									<defs>
										<clipPath id="clip0_2158_3100">
											<rect width="16" height="16" fill="white" />
										</clipPath>
									</defs>
								</svg>
							</span>
							{isCollapsed && (
								<span className={`${classes.sidebar_tabExpanded}`}>
									<span>Keypad</span>
									<span className={`caption_2_bold ${classes.sidebar_unreadMsg}`}>2</span>
								</span>
							)}
						</div>
						<div
							className={`body ${classes.sidebar_tab}`}
							style={tabActive === "2" ? activeTabStyle : {}}
							onClick={() => {
								setTabActive("2");
							}}
							onMouseOver={() => {
								setTabHovered("2");
							}}
							onMouseOut={() => {
								setTabHovered("0");
							}}>
							<span className={` ${!isCollapsed && unreadMessage ? classes.sidebar_icon : ""}`}>
								{/* <img src="/icon/contact.svg" alt="" /> */}
								<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
									<g id="line / contact" clipPath="url(#clip0_2129_3067)">
										<path
											id="Vector"
											d="M12.4312 12.9816C11.9136 12.2963 11.2439 11.7406 10.475 11.3582C9.70606 10.9757 8.85883 10.7771 8.00004 10.7779C7.14126 10.7771 6.29403 10.9757 5.5251 11.3582C4.75616 11.7406 4.08652 12.2963 3.56893 12.9816M12.4312 12.9816C13.4412 12.0832 14.1535 10.899 14.475 9.58607C14.7965 8.27311 14.7113 6.89343 14.2308 5.63C13.7502 4.36656 12.8969 3.27907 11.784 2.51174C10.6712 1.74441 9.35141 1.3335 7.99967 1.3335C6.64794 1.3335 5.32814 1.74441 4.21531 2.51174C3.10247 3.27907 2.24918 4.36656 1.76859 5.63C1.288 6.89343 1.20282 8.27311 1.52436 9.58607C1.84589 10.899 2.55893 12.0832 3.56893 12.9816M12.4312 12.9816C11.2119 14.0692 9.63384 14.6691 8.00004 14.6668C6.36599 14.6693 4.78837 14.0693 3.56893 12.9816M10.2223 6.33336C10.2223 6.92274 9.98814 7.48798 9.57139 7.90473C9.15465 8.32148 8.58941 8.55561 8.00004 8.55561C7.41067 8.55561 6.84544 8.32148 6.4287 7.90473C6.01195 7.48798 5.77782 6.92274 5.77782 6.33336C5.77782 5.74398 6.01195 5.17874 6.4287 4.76198C6.84544 4.34523 7.41067 4.1111 8.00004 4.1111C8.58941 4.1111 9.15465 4.34523 9.57139 4.76198C9.98814 5.17874 10.2223 5.74398 10.2223 6.33336Z"
											stroke={
												tabActive === "2" || tabHovered === "2"
													? "var(--text-link, #1480e1)"
													: "var(--text-primary, #1f2023)"
											}
											strokeWidth="1.5"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</g>
									<defs>
										<clipPath id="clip0_2129_3067">
											<rect width="16" height="16" fill="white" />
										</clipPath>
									</defs>
								</svg>
							</span>
							{isCollapsed && (
								<span className={`${classes.sidebar_tabExpanded}`}>
									<span>Contacts</span>
									<span className={`caption_2_bold ${classes.sidebar_unreadMsg}`}>3</span>
								</span>
							)}
						</div>
						<div
							className={`body ${classes.sidebar_tab}`}
							style={tabActive === "3" ? activeTabStyle : {}}
							onClick={() => {
								setTabActive("3");
							}}
							onMouseOver={() => {
								setTabHovered("3");
							}}
							onMouseOut={() => {
								setTabHovered("0");
							}}>
							<span className={` ${!isCollapsed && unreadMessage ? classes.sidebar_icon : ""}`}>
								{/* <img src="/icon/users_group.svg" alt="" /> */}
								<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
									<g id="line / users_group">
										<path
											id="Vector"
											d="M10.6663 14V12.6667C10.6663 11.9594 10.3854 11.2811 9.88529 10.781C9.3852 10.281 8.70692 10 7.99967 10H3.99967C3.29243 10 2.61415 10.281 2.11406 10.781C1.61396 11.2811 1.33301 11.9594 1.33301 12.6667V14M14.6663 14V12.6667C14.6659 12.0758 14.4692 11.5018 14.1073 11.0349C13.7453 10.5679 13.2384 10.2344 12.6663 10.0867M10.6663 2.08667C11.24 2.23353 11.7484 2.56713 12.1114 3.03487C12.4745 3.50261 12.6716 4.07789 12.6716 4.67C12.6716 5.26211 12.4745 5.83739 12.1114 6.30513C11.7484 6.77287 11.24 7.10647 10.6663 7.25333M8.66634 4.66667C8.66634 6.13943 7.47243 7.33333 5.99967 7.33333C4.52692 7.33333 3.33301 6.13943 3.33301 4.66667C3.33301 3.19391 4.52692 2 5.99967 2C7.47243 2 8.66634 3.19391 8.66634 4.66667Z"
											stroke={
												tabActive === "3" || tabHovered === "3"
													? "var(--text-link, #1480e1)"
													: "var(--text-primary, #1f2023)"
											}
											strokeWidth="1.5"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</g>
								</svg>
							</span>
							{isCollapsed && (
								<span className={`${classes.sidebar_tabExpanded}`}>
									<span>Conference</span>
									<span className={`caption_2_bold ${classes.sidebar_unreadMsg}`}>3</span>
								</span>
							)}
						</div>
						<div
							className={`body ${classes.sidebar_tab}`}
							style={tabActive === "4" ? activeTabStyle : {}}
							onClick={() => {
								setTabActive("4");
							}}
							onMouseOver={() => {
								setTabHovered("4");
							}}
							onMouseOut={() => {
								setTabHovered("0");
							}}>
							<span className={` ${!isCollapsed && unreadMessage ? classes.sidebar_icon : ""}`}>
								{/* <img src="/icon/chat.svg" alt="" /> */}
								<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
									<g id="line / chat">
										<path
											id="Vector"
											d="M14 10C14 10.3536 13.8595 10.6928 13.6095 10.9428C13.3594 11.1929 13.0203 11.3333 12.6667 11.3333H4.66667L2 14V3.33333C2 2.97971 2.14048 2.64057 2.39052 2.39052C2.64057 2.14048 2.97971 2 3.33333 2H12.6667C13.0203 2 13.3594 2.14048 13.6095 2.39052C13.8595 2.64057 14 2.97971 14 3.33333V10Z"
											stroke={
												tabActive === "4" || tabHovered === "4"
													? "var(--text-link, #1480e1)"
													: "var(--text-primary, #1f2023)"
											}
											strokeWidth="1.5"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</g>
								</svg>
							</span>
							{isCollapsed && (
								<span className={`${classes.sidebar_tabExpanded}`}>
									<span>Texting</span>
									<span className={`caption_2_bold ${classes.sidebar_unreadMsg}`}>3</span>
								</span>
							)}
						</div>
						<div
							className={`body ${classes.sidebar_tab}`}
							style={tabActive === "5" ? activeTabStyle : {}}
							onClick={() => {
								setTabActive("5");
							}}
							onMouseOver={() => {
								setTabHovered("5");
							}}
							onMouseOut={() => {
								setTabHovered("0");
							}}>
							<span className={` ${!isCollapsed && unreadMessage ? classes.sidebar_icon : ""}`}>
								{/* <img src="/icon/recents.svg" alt="" /> */}
								<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
									<g id="line / recents" clipPath="url(#clip0_2129_3082)">
										<path
											id="Vector"
											d="M4.99967 13.9553C5.9014 14.4105 6.9206 14.6668 7.99967 14.6668C11.6816 14.6668 14.6663 11.6821 14.6663 8.00016C14.6663 4.31826 11.6816 1.3335 7.99967 1.3335C4.31778 1.3335 1.33301 4.31826 1.33301 8.00016V10.0002L3.33301 8.00016M7.99967 4.66683V8.66683L10.6663 10.0002"
											stroke={
												tabActive === "5" || tabHovered === "5"
													? "var(--text-link, #1480e1)"
													: "var(--text-primary, #1f2023)"
											}
											strokeWidth="1.5"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</g>
									<defs>
										<clipPath id="clip0_2129_3082">
											<rect width="16" height="16" fill="white" />
										</clipPath>
									</defs>
								</svg>
							</span>
							{isCollapsed && (
								<span className={`${classes.sidebar_tabExpanded}`}>
									<span>Recent</span>
									<span className={`caption_2_bold ${classes.sidebar_unreadMsg}`}>3</span>
								</span>
							)}
						</div>
						<div
							className={`body ${classes.sidebar_tab}`}
							style={tabActive === "6" ? activeTabStyle : {}}
							onClick={() => {
								setTabActive("6");
							}}
							onMouseOver={() => {
								setTabHovered("6");
							}}
							onMouseOut={() => {
								setTabHovered("0");
							}}>
							<span className={` ${!isCollapsed && unreadMessage ? classes.sidebar_icon : ""}`}>
								{/* <img src="/icon/fax.svg" alt="" /> */}
								<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
									<g id="line / fax">
										<path
											id="Vector"
											d="M12.6663 10.3333C12.6663 9.78105 12.2186 9.33333 11.6663 9.33333H4.33301C3.78072 9.33333 3.33301 9.78105 3.33301 10.3333M12.6663 10.3333C12.6663 10.8856 13.1141 11.3333 13.6663 11.3333C14.2186 11.3333 14.6663 10.8856 14.6663 10.3333V6C14.6663 5.26362 14.0694 4.66667 13.333 4.66667H2.66634C1.92996 4.66667 1.33301 5.26362 1.33301 6V10.3333C1.33301 10.8856 1.78072 11.3333 2.33301 11.3333C2.88529 11.3333 3.33301 10.8856 3.33301 10.3333M12.6663 10.3333V13.3333C12.6663 13.7015 12.3679 14 11.9997 14H3.99967C3.63148 14 3.33301 13.7015 3.33301 13.3333V10.3333M12.6663 6.66667H11.9997M3.99967 3.33333V2.66667C3.99967 2.29848 4.29815 2 4.66634 2H11.333C11.7012 2 11.9997 2.29848 11.9997 2.66667V3.33333"
											stroke={
												tabActive === "6" || tabHovered === "6"
													? "var(--text-link, #1480e1)"
													: "var(--text-primary, #1f2023)"
											}
											strokeWidth="1.5"
											strokeLinecap="round"
										/>
									</g>
								</svg>
							</span>
							{isCollapsed && (
								<span className={`${classes.sidebar_tabExpanded}`}>
									<span>Fax</span>
									<span className={`caption_2_bold ${classes.sidebar_unreadMsg}`}>3</span>
								</span>
							)}
						</div>
						<div
							className={`body ${classes.sidebar_tab}`}
							style={tabActive === "7" ? activeTabStyle : {}}
							onClick={() => {
								setTabActive("7");
							}}
							onMouseOver={() => {
								setTabHovered("7");
							}}
							onMouseOut={() => {
								setTabHovered("0");
							}}>
							<span className={` ${!isCollapsed && unreadMessage ? classes.sidebar_icon : ""}`}>
								{/* <img src="/icon/voicemail.svg" alt="" /> */}
								<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
									<g id="line / voicemail" clipPath="url(#clip0_2129_3092)">
										<path
											id="Vector"
											d="M4.00033 11.3332C5.84127 11.3332 7.33366 9.84079 7.33366 7.99984C7.33366 6.15889 5.84127 4.6665 4.00033 4.6665C2.15938 4.6665 0.666992 6.15889 0.666992 7.99984C0.666992 9.84079 2.15938 11.3332 4.00033 11.3332ZM4.00033 11.3332H12.0003M12.0003 11.3332C13.8413 11.3332 15.3337 9.84079 15.3337 7.99984C15.3337 6.15889 13.8413 4.6665 12.0003 4.6665C10.1594 4.6665 8.66699 6.15889 8.66699 7.99984C8.66699 9.84079 10.1594 11.3332 12.0003 11.3332Z"
											stroke={
												tabActive === "7" || tabHovered === "7"
													? "var(--text-link, #1480e1)"
													: "var(--text-primary, #1f2023)"
											}
											strokeWidth="1.5"
											strokeLinecap="round"
										/>
									</g>
									<defs>
										<clipPath id="clip0_2129_3092">
											<rect width="16" height="16" fill="white" />
										</clipPath>
									</defs>
								</svg>
							</span>
							{isCollapsed && (
								<span className={`${classes.sidebar_tabExpanded}`}>
									<span>Voicemail</span>
									<span className={`caption_2_bold ${classes.sidebar_unreadMsg}`}>3</span>
								</span>
							)}
						</div>
					</div>
					<div className={classes.sidebar_topTab}>
						<div
							className={`body ${classes.sidebar_tab}`}
							style={tabActive === "8" ? activeTabStyle : {}}
							onClick={() => {
								setTabActive("8");
							}}
							onMouseOver={() => {
								setTabHovered("8");
							}}
							onMouseOut={() => {
								setTabHovered("0");
							}}>
							<span className={` ${!isCollapsed && unreadMessage ? classes.sidebar_icon : ""}`}>
								<img src="/icon/ringplan_sidecar.svg" alt="" />
							</span>
							{isCollapsed && (
								<span className={`${classes.sidebar_tabExpanded}`}>
									<span>Sidecar</span>
									<span className={`caption_2_bold ${classes.sidebar_unreadMsg}`}>2</span>
								</span>
							)}
						</div>
						<div
							className={`body ${classes.sidebar_tab}`}
							style={tabActive === "9" ? activeTabStyle : {}}
							onClick={() => {
								setTabActive("9");
							}}
							onMouseOver={() => {
								setTabHovered("9");
							}}
							onMouseOut={() => {
								setTabHovered("0");
							}}>
							<span className={` ${!isCollapsed && unreadMessage ? classes.sidebar_icon : ""}`}>
								<img src="/icon/ringplan_meet.svg" alt="" />
							</span>
							{isCollapsed && (
								<span className={`${classes.sidebar_tabExpanded}`}>
									<span>Download RingPlan Meet</span>
									<span className={`caption_2_bold ${classes.sidebar_unreadMsg}`}>3</span>
								</span>
							)}
						</div>
						<div
							className={`body ${classes.sidebar_tab}`}
							style={tabActive === "10" ? activeTabStyle : {}}
							onClick={() => {
								setTabActive("10");
							}}
							onMouseOver={() => {
								setTabHovered("10");
							}}
							onMouseOut={() => {
								setTabHovered("0");
							}}>
							<span className={` ${!isCollapsed && unreadMessage ? classes.sidebar_icon : ""}`}>
								{/* <img src="/icon/settings.svg" alt="" /> */}
								<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
									<g id="line / settings">
										<path
											id="Vector"
											fillRule="evenodd"
											clipRule="evenodd"
											d="M7.85333 1.3335H8.14667C8.50029 1.3335 8.83943 1.47397 9.08948 1.72402C9.33953 1.97407 9.48 2.31321 9.48 2.66683V2.78683C9.48024 3.02065 9.54196 3.25029 9.65898 3.45272C9.77599 3.65515 9.94418 3.82325 10.1467 3.94016L10.4333 4.10683C10.636 4.22385 10.866 4.28546 11.1 4.28546C11.3341 4.28546 11.564 4.22385 11.7667 4.10683L11.8667 4.0535C12.1726 3.877 12.5361 3.82913 12.8773 3.92037C13.2186 4.01161 13.5096 4.23452 13.6867 4.54016L13.8333 4.7935C14.0098 5.09945 14.0577 5.46294 13.9665 5.80416C13.8752 6.14539 13.6523 6.43646 13.3467 6.6135L13.2467 6.6735C13.0432 6.79097 12.8744 6.96012 12.7573 7.16382C12.6402 7.36753 12.5791 7.59855 12.58 7.8335V8.16683C12.5791 8.40178 12.6402 8.6328 12.7573 8.8365C12.8744 9.04021 13.0432 9.20936 13.2467 9.32683L13.3467 9.38016C13.6523 9.5572 13.8752 9.84827 13.9665 10.1895C14.0577 10.5307 14.0098 10.8942 13.8333 11.2002L13.6867 11.4602C13.5096 11.7658 13.2186 11.9887 12.8773 12.08C12.5361 12.1712 12.1726 12.1233 11.8667 11.9468L11.7667 11.8935C11.564 11.7765 11.3341 11.7149 11.1 11.7149C10.866 11.7149 10.636 11.7765 10.4333 11.8935L10.1467 12.0602C9.94418 12.1771 9.77599 12.3452 9.65898 12.5476C9.54196 12.75 9.48024 12.9797 9.48 13.2135V13.3335C9.48 13.6871 9.33953 14.0263 9.08948 14.2763C8.83943 14.5264 8.50029 14.6668 8.14667 14.6668H7.85333C7.49971 14.6668 7.16057 14.5264 6.91053 14.2763C6.66048 14.0263 6.52 13.6871 6.52 13.3335V13.2135C6.51976 12.9797 6.45804 12.75 6.34103 12.5476C6.22401 12.3452 6.05583 12.1771 5.85333 12.0602L5.56667 11.8935C5.36398 11.7765 5.13405 11.7149 4.9 11.7149C4.66595 11.7149 4.43603 11.7765 4.23333 11.8935L4.13333 11.9468C3.82738 12.1233 3.46389 12.1712 3.12267 12.08C2.78145 11.9887 2.49037 11.7658 2.31333 11.4602L2.16667 11.2068C1.99018 10.9009 1.9423 10.5374 2.03354 10.1962C2.12478 9.85494 2.34769 9.56386 2.65333 9.38683L2.75333 9.32683C2.95681 9.20936 3.12563 9.04021 3.2427 8.8365C3.35977 8.6328 3.42093 8.40178 3.42 8.16683V7.82683C3.4186 7.59414 3.35632 7.36588 3.23937 7.16472C3.12241 6.96356 2.95485 6.7965 2.75333 6.68016L2.65333 6.6135C2.34769 6.43646 2.12478 6.14539 2.03354 5.80416C1.9423 5.46294 1.99018 5.09945 2.16667 4.7935L2.31333 4.54016C2.49037 4.23452 2.78145 4.01161 3.12267 3.92037C3.46389 3.82913 3.82738 3.877 4.13333 4.0535L4.23333 4.10683C4.43603 4.22385 4.66595 4.28546 4.9 4.28546C5.13405 4.28546 5.36398 4.22385 5.56667 4.10683L5.85333 3.94016C6.05583 3.82325 6.22401 3.65515 6.34103 3.45272C6.45804 3.25029 6.51976 3.02065 6.52 2.78683V2.66683C6.52 2.31321 6.66048 1.97407 6.91053 1.72402C7.16057 1.47397 7.49971 1.3335 7.85333 1.3335ZM10 8C10 9.10457 9.10457 10 8 10C6.89543 10 6 9.10457 6 8C6 6.89543 6.89543 6 8 6C9.10457 6 10 6.89543 10 8Z"
											stroke={
												tabActive === "10" || tabHovered === "10"
													? "var(--text-link, #1480e1)"
													: "var(--text-primary, #1f2023)"
											}
											strokeWidth="1.5"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</g>
								</svg>
							</span>
							{isCollapsed && (
								<span className={`${classes.sidebar_tabExpanded}`}>
									<span>Settings</span>
									<span className={`caption_2_bold ${classes.sidebar_unreadMsg}`}>3</span>
								</span>
							)}
						</div>
					</div>
				</div>
			</section>
		</section>
	);
};

export default Sidebar;
