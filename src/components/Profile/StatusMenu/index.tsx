import { store } from "redux/store";
import styles from "./StatusMenu.module.scss";
import { useSelector } from "react-redux";
import { useLazySetStatusQuery } from 'services/status'
import { emptyFunction } from "utils";

const StatusMenu = () => {
	const [updateStatus] = useLazySetStatusQuery()
	const { status } = useSelector((state: any) => state.sip)
	const update = (status:string, additional_status:string|null = "") =>{
		if(additional_status == "" || additional_status == null || additional_status == undefined){
			let userStatusMainStatus = status;
			store.dispatch({type:"sip/status", payload:{
				main_status:userStatusMainStatus,
				additional_status:additional_status
			}})
		}
		const sendData = additional_status != "" ? 
		{
			main_status: {
				status: status
			},
		  	additional_status: {
				status: additional_status,
				action_type: "manual",
				action: "set"
		  }
		} : {
			main_status: {
				status: status
			}
		}
		console.log(sendData)
		updateStatus(JSON.stringify(sendData))
	}
	
	return (
		<div className={styles.profileMenu}>
			<div style={{position: "fixed",bottom: "0px",left: "0px",height: "100vh",width: "100%"}}
				onClick={()=>{store.dispatch({type:"sip/statusMenu", payload:false})}}>
			</div>
			<div className={styles.profileBox} style={{zIndex: "10001"}}>
				<div className={styles.headline}>
					<span className={`sub_headline_bold`}>Set Status</span>
					<span className={styles.close} onClick={()=>{store.dispatch({type:"sip/statusMenu", payload:false})}}>
						<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
							<g id="line / close" clipPath="url(#clip0_2236_1196)">
								<path
									id="Vector"
									d="M11.25 6.75L6.75 11.25M6.75 6.75L11.25 11.25M16.5 9C16.5 13.1421 13.1421 16.5 9 16.5C4.85786 16.5 1.5 13.1421 1.5 9C1.5 4.85786 4.85786 1.5 9 1.5C13.1421 1.5 16.5 4.85786 16.5 9Z"
									stroke="#6C7A8B"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</g>
							<defs>
								<clipPath id="clip0_2236_1196">
									<rect width="18" height="18" fill="white" />
								</clipPath>
							</defs>
						</svg>
					</span>
				</div>
				<p className={`footnote ${styles.heading}`}>Status</p>
				<div className={`body ${styles.status}`}>
					<div onClick={()=>{update("available") }}  className={`${styles.status_type}`} style={status.main_status == "available"? { backgroundColor: "rgb(227, 239, 250)" }: {}}>
						<span>
							<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
								<g id="user_status">
									<circle id="Ellipse" cx="9.00001" cy="9.0001" r="6.4" fill="#75C322" stroke="white" strokeWidth="2" />
								</g>
							</svg>
							<span className={`${styles.status_type_active}`}>Available</span>
						</span>
					</div>
					<div onClick={()=>{update("away") }} className={`${styles.status_type}`} style={status.main_status == "away"? { backgroundColor: "rgb(227, 239, 250)" }: {}}>
						<span>
							<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
								<g id="user_status">
									<circle id="Ellipse" cx="9.00001" cy="9.0001" r="6.4" fill="#91A0B5" stroke="white" strokeWidth="2" />
								</g>
							</svg>
							<span className={`${styles.status_type_active}`}>Away</span>
						</span>
					</div>
					<div onClick={()=>{update("do_not_disturb") }}  className={`${styles.status_type}`} style={status.main_status == "do_not_disturb"? { backgroundColor: "rgb(227, 239, 250)" }: {}}>
						<span>
							<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
								<g id="user_status">
									<circle id="Ellipse" cx="9.00001" cy="9.0001" r="6.4" fill="#EE3939" stroke="white" strokeWidth="2" />
								</g>
							</svg>
							<span className={`${styles.status_type_active}`}>Do not disturb</span>
						</span>
						<span>
							<span>This device only</span>
						</span>
					</div>
				</div>
				<p className={`footnote ${styles.heading}`}>Additional Status</p>
				<div className={`body ${styles.status}`}>
					<div onClick={()=>{update(status.main_status, "on_a_call") }}  className={`${styles.status_type}`} style={status.additional_status == "on_a_call"? { backgroundColor: "rgb(227, 239, 250)" }: {}}>
						<span>
							<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
								<g id="status / call">
									<path
										id="Vector Call"
										d="M1.46881 15.5088L0.330596 14.3708C0.128361 14.1675 0.000479481 13.5723 0.000479482 13.5545C-0.0299059 9.95172 1.38497 6.48316 3.93491 3.9341C6.49115 1.37777 9.97389 -0.0385044 13.5876 0.000796634C13.5876 0.000796634 14.1683 0.131274 14.3695 0.334049L15.5088 1.4721C15.9259 1.88969 16.1146 2.68925 15.928 3.24935L15.8473 3.48932C15.6607 4.04942 15.0424 4.63468 14.4733 4.78977L12.3698 5.36298C11.7996 5.51861 10.9884 5.30953 10.5713 4.89248L9.81039 4.13168C7.04453 4.87779 4.87609 7.04645 4.12883 9.81028L4.88974 10.5711C5.30689 10.9882 5.51539 11.8013 5.36028 12.3714L4.78594 14.4746C4.63187 15.0426 4.04709 15.6608 3.48634 15.8484L3.24637 15.928C2.68561 16.1145 1.88596 15.9259 1.46881 15.5088Z"
										fill="#F5C400"
									/>
								</g>
							</svg>

							<span className={`${styles.status_type_active}`}>On a call</span>
						</span>
					</div>
					<div onClick={()=>{update("do_not_disturb", "in_a_meeting") }}  className={`${styles.status_type}`} style={status.additional_status == "in_a_meeting"? { backgroundColor: "rgb(227, 239, 250)" }: {}}>
						<span>
							<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
								<g id="status / meet">
									<g id="Vector Meet">
										<path d="M8 8H4.57143V11.4286H8V8Z" fill="#944AF5" />
										<path
											fillRule="evenodd"
											clipRule="evenodd"
											d="M4.57143 0H2.28571V2.28571C1.02335 2.28571 0 3.30906 0 4.57143V13.7143C0 14.9767 1.02335 16 2.28571 16H13.7143C14.9767 16 16 14.9767 16 13.7143V4.57143C16 3.30906 14.9767 2.28571 13.7143 2.28571V0H11.4286V2.28571H4.57143V0ZM13.7143 5.71429H2.28571V13.7143H13.7143V5.71429Z"
											fill="#944AF5"
										/>
									</g>
								</g>
							</svg>

							<span className={`${styles.status_type_active}`}>In a meeting</span>
						</span>
					</div>
					<div onClick={()=>{update("do_not_disturb", "lunch") }}  className={`${styles.status_type}`} style={status.additional_status == "lunch"? { backgroundColor: "rgb(227, 239, 250)" }: {}}>
						<span>
							<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
								<g id="status / lunch">
									<path
										id="Vector Lunch"
										fillRule="evenodd"
										clipRule="evenodd"
										d="M11.1284 0.0450223C11.5775 0.197442 11.8202 0.691686 11.6705 1.14895L10.9281 3.41672C11.4737 3.50106 11.9982 3.61003 12.4893 3.74362L13.5193 1.64626C13.731 1.21515 14.2458 1.04041 14.6692 1.25596C15.0926 1.47152 15.2643 1.99574 15.0526 2.42685L14.1125 4.34107C15.266 4.91119 16 5.69496 16 6.69242V9.01819C16 12.8741 12.5714 16 8 16C3.42857 16 0 12.8741 0 9.01819V6.69242C0 4.13461 4.82883 2.9816 9.18091 3.234L10.0442 0.596984C10.1939 0.139724 10.6793 -0.107398 11.1284 0.0450223ZM11.3905 5.98114L10.6621 7.46445C10.4504 7.89556 10.622 8.41978 11.0454 8.63533C11.4688 8.85089 11.9837 8.67615 12.1954 8.24504L12.9563 6.6956C13.4385 7.03688 13.7143 7.43266 13.7143 7.85467C13.7143 9.13999 11.1559 10.1819 8 10.1819C4.84409 10.1819 2.28571 9.13999 2.28571 7.85467C2.28571 6.56935 4.84409 5.52739 8 5.52739C8.14397 5.52739 8.2867 5.52956 8.42799 5.53382L7.7585 7.57881C7.60881 8.03607 7.85151 8.53031 8.30061 8.68273C8.7497 8.83515 9.23512 8.58803 9.38482 8.13077L10.1797 5.7027C10.6126 5.77552 11.0188 5.86937 11.3905 5.98114Z"
										fill="#6C7A8B"
									/>
								</g>
							</svg>

							<span className={`${styles.status_type_active}`}>Lunch</span>
						</span>
						<span>
							{/* <span>DND :</span> */}
						</span>
					</div>
					<div onClick={()=>{update(status.main_status, "holiday") }}  className={`${styles.status_type}`} style={status.additional_status == "holiday"? { backgroundColor: "rgb(227, 239, 250)" }: {}}>
						<span>
							<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
								<g id="status / holiday">
									<g id="Vector Holiday">
										<path
											d="M14.5047 3.42854C14.5047 4.6909 13.4814 5.71425 12.219 5.71425C10.9566 5.71425 9.93329 4.6909 9.93329 3.42854C9.93329 2.16617 10.9566 1.14282 12.219 1.14282C13.4814 1.14282 14.5047 2.16617 14.5047 3.42854Z"
											fill="#6C7A8B"
										/>
										<path
											d="M0.572166 16C0.147376 16 -0.128907 15.5529 0.0610646 15.173L5.42219 4.45074C5.63277 4.02957 6.23381 4.02957 6.44439 4.45074L9.93329 11.4285L11.1365 9.02217C11.3471 8.601 11.9481 8.601 12.1587 9.02217L15.2341 15.173C15.4241 15.5529 15.1478 16 14.723 16H0.572166Z"
											fill="#6C7A8B"
										/>
									</g>
								</g>
							</svg>

							<span className={`${styles.status_type_active}`}>Holiday</span>
						</span>
						<span>
							{/* <span>DND :</span> */}
						</span>
					</div>
					<div onClick={()=>{update(status.main_status, "afk") }} className={`${styles.status_type}`} style={status.additional_status == "afk"? { backgroundColor: "rgb(227, 239, 250)" }: {}}>
						<span>
							<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
								<g id="status / afk">
									<path
										id="Vector AFK"
										fillRule="evenodd"
										clipRule="evenodd"
										d="M10.2857 1.14282C13.4416 1.14282 16 3.7012 16 6.85711C16 10.013 13.4416 12.5714 10.2857 12.5714H3.42857L0.97549 15.0245C0.61551 15.3845 0 15.1295 0 14.6204V6.85711C0 3.7012 2.55837 1.14282 5.71429 1.14282H10.2857ZM4.57143 7.99996C5.20261 7.99996 5.71429 7.48829 5.71429 6.85711C5.71429 6.22592 5.20261 5.71425 4.57143 5.71425C3.94025 5.71425 3.42857 6.22592 3.42857 6.85711C3.42857 7.48829 3.94025 7.99996 4.57143 7.99996ZM9.14286 6.85711C9.14286 7.48829 8.63118 7.99996 8 7.99996C7.36882 7.99996 6.85714 7.48829 6.85714 6.85711C6.85714 6.22592 7.36882 5.71425 8 5.71425C8.63118 5.71425 9.14286 6.22592 9.14286 6.85711ZM11.4286 7.99996C12.0598 7.99996 12.5714 7.48829 12.5714 6.85711C12.5714 6.22592 12.0598 5.71425 11.4286 5.71425C10.7974 5.71425 10.2857 6.22592 10.2857 6.85711C10.2857 7.48829 10.7974 7.99996 11.4286 7.99996Z"
										fill="#6C7A8B"
									/>
								</g>
							</svg>
							<span className={`${styles.status_type_active}`}>AFK</span>
						</span>
					</div>
				</div>
				<div className={styles.clearStatus} style={status.additional_status? {color:"#494a4b" }: {}} onClick={()=>{ status.additional_status? update(status.main_status, null) : emptyFunction() }}>Clear Status</div>
			</div>
		</div>
	);
};

export default StatusMenu;
