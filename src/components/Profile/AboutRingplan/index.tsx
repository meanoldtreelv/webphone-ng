import { useState } from "react";
import styles from "./AboutRingplan.module.scss";
import XIcon from "components/UI/Icons/X";
import ChevronRightIcon from "components/UI/Icons/Profile/ChevronRight";
import InfoIcon from "components/UI/Icons/Profile/Info";
import { store } from "redux/store";

const AboutRingplan = () => {
	const [isLatestVersion, setIsLatestVersion] = useState(true);

	return (
		<div className={styles.aboutRingplan}>
			<div style={{position: "fixed",bottom: "0px",left: "0px",height: "100vh",width: "100%"}}
				onClick={()=>{store.dispatch({type:"sip/aboutRingplan", payload:false})}}>
			</div>
			<div className={styles.aboutBox} style={{zIndex:"1000"}}>
				<div className={styles.headline}>
					<h3>About RingPlan</h3>
					<button className={styles.close} onClick={()=>{store.dispatch({type:"sip/aboutRingplan", payload:false})}}>
						<XIcon />
					</button>
				</div>
				<div className={styles.appInfo}>
					<div>
						<img src="/RingPlanVoiceIcon.svg" alt="" />
					</div>

					<p className={styles.appVersion}>Application Version MacOS: 3.0</p>
					<div className={styles.appDesc}>
						<InfoIcon isLatestVersion />
						<span>
							{isLatestVersion ? "You are using the latest version" : " You are not using the latest version"}
						</span>
					</div>
				</div>
				<div className={styles.updateBox}>
					<button>
						<span>Check updates for RingPlan Voice App</span>
						<span>
							<ChevronRightIcon />
						</span>
					</button>
					<button>
						<span>Download RingPlan Meet App</span>
						<span>
							<ChevronRightIcon />
						</span>
					</button>
				</div>
				<div className={styles.moreInfo}>
					<div className={styles.moreInfo_links}>
						<p>Visit RingPlan Website</p>
						<p>Legal and Policy Policy</p>
						<p>Support</p>
					</div>
					<p className={styles.infoFooter}>2020-2023 RingPlan</p>
				</div>
			</div>
		</div>
	);
};

export default AboutRingplan;
