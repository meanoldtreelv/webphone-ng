import { store } from "redux/store";
import styles from "./ProfileMenu.module.scss";
import { useSelector } from "react-redux";
import { nameIcon } from "utils";

const ProfileMenu = ({extAuth}:{extAuth:Boolean}) => {
	const { apiAuth, extNumber, sipRegistrationStatus } = useSelector((state: any) => state.sip)
	return (
		<div>
			<div style={{position: "fixed",bottom: "0px",left: "0px",height: "100vh",width: "100%"}}
				onClick={()=>{store.dispatch({type:"sip/isProfileOpen", payload:false})}}>
			</div>
			<div className={styles.profile}>
				<div className={styles.profile_nameBox}>
					<span className={styles.profile_image}>{ (apiAuth && nameIcon(apiAuth["displayname"])) || ( extNumber && extNumber[0])}</span>
					<div style={{display:"flex", flexDirection:"column"}}>
						<span className={styles.profile_name}>{ (apiAuth && apiAuth["displayname"]) || extNumber}</span>
						<span style={{color: "#808080", fontSize: "12px",  whiteSpace: "nowrap",position: "absolute", marginTop: "17px"}}>{sipRegistrationStatus}</span>						
					</div>
				</div>
				<div className={styles.profile_settingBox}>
					{!extAuth &&
						<div className={styles.profile_settingBox_item}>
						<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
							<g id="line / user">
								<path
									id="Vector"
									d="M15.3749 15.75V14.25C15.3749 13.4544 15.0588 12.6913 14.4962 12.1287C13.9336 11.5661 13.1705 11.25 12.3749 11.25H5.62506C4.82941 11.25 4.06635 11.5661 3.50374 12.1287C2.94113 12.6913 2.62506 13.4544 2.62506 14.25V15.75M12 5.25C12 6.90685 10.6568 8.25 8.99997 8.25C7.34312 8.25 5.99997 6.90685 5.99997 5.25C5.99997 3.59315 7.34312 2.25 8.99997 2.25C10.6568 2.25 12 3.59315 12 5.25Z"
									stroke="#6C7A8B"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</g>
						</svg>
						<span>Account Settings</span>
					</div>
					}
					{!extAuth &&
					<div className={styles.profile_settingBox_item} onClick={()=>{store.dispatch({type:"sip/statusMenu", payload:true})}}>
						<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
							<g id="line / add_emoji" clipPath="url(#clip0_2254_30482)">
								<path
									id="Vector"
									d="M16.5 8.24999V8.99999C16.4924 10.5137 16.0269 11.9897 15.1648 13.234C14.3026 14.4782 13.0841 15.4325 11.6695 15.9713C10.2549 16.5101 8.7103 16.6082 7.23887 16.2527C5.76744 15.8972 4.43801 15.1048 3.42536 13.9796C2.41271 12.8545 1.76423 11.4492 1.56519 9.9486C1.36614 8.44798 1.62584 6.92225 2.31014 5.57199C2.99445 4.22174 4.07132 3.11015 5.3992 2.38337C6.72708 1.65659 8.2438 1.34864 9.74997 1.49999M5.99997 10.5C5.99997 10.5 7.12497 12 8.99997 12C10.875 12 12 10.5 12 10.5M6.74997 6.74999H6.75685M11.25 6.74999H11.2568M12 3.74999H16.5M14.25 1.49999V5.99999"
									stroke="#6C7A8B"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</g>
							<defs>
								<clipPath id="clip0_2254_30482">
									<rect width="18" height="18" fill="white" />
								</clipPath>
							</defs>
						</svg>
						<span>Set Status</span>
					</div>
					}
					<div className={styles.profile_settingBox_item} onClick={()=>{store.dispatch({type:"sip/aboutRingplan", payload:true})}}>
						<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
							<g id="line / info" clipPath="url(#clip0_2254_30473)">
								<path
									id="Vector"
									d="M9 12V9M9 6H9.0075M16.5 9C16.5 13.1421 13.1421 16.5 9 16.5C4.85786 16.5 1.5 13.1421 1.5 9C1.5 4.85786 4.85786 1.5 9 1.5C13.1421 1.5 16.5 4.85786 16.5 9Z"
									stroke="#6C7A8B"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</g>
							<defs>
								<clipPath id="clip0_2254_30473">
									<rect width="18" height="18" fill="white" />
								</clipPath>
							</defs>
						</svg>
						<span>About Ringplan</span>
					</div>
				</div>
				<div className={styles.profile_logout} onClick={()=>{store.dispatch({type:"sip/logoutPopUp", payload:true})}} >
					<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
						<g id="line / sign_out">
							<path
								id="Vector"
								d="M11.8125 6.75V3.9375C11.8125 3.48995 11.6347 3.06072 11.3182 2.74426C11.0018 2.42779 10.5726 2.25 10.125 2.25H5.625C5.17745 2.25 4.74823 2.42779 4.43176 2.74426C4.11529 3.06072 3.9375 3.48995 3.9375 3.9375V14.0625C3.9375 14.5101 4.11529 14.9393 4.43176 15.2557C4.74823 15.5722 5.17745 15.75 5.625 15.75H10.125C10.5726 15.75 11.0018 15.5722 11.3182 15.2557C11.6347 14.9393 11.8125 14.5101 11.8125 14.0625V11.25M14.0625 11.25L16.3125 9M16.3125 9L14.0625 6.75M16.3125 9H6.75"
								stroke="#6C7A8B"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</g>
					</svg>
					<span>Log Out</span>
				</div>
			</div>
		</div>
	);
};

export default ProfileMenu;
