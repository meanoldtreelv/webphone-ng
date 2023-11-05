import { store } from "redux/store";
import styles from "./SuggestPortraitOnMobileModal.module.scss";
import { useSelector } from "react-redux";
import { useLazySetStatusQuery } from 'services/status'
import { emptyFunction } from "utils";

const SuggestPortraitOnMobileModal = () => {
	const { status } = useSelector((state: any) => state.sip)
	
	return (
		<div className={styles.profileMenu}>
			<div style={{position: "fixed",bottom: "0px",left: "0px",height: "100vh",width: "100%"}}
				onClick={()=>{store.dispatch({ type: "sip/suggestPortraitOnMobileModalShow", payload: false });}}>
			</div>
			<div className={styles.profileBox} style={{zIndex: "10001"}}>
				<div className={styles.headline}>
					<span className={`sub_headline_bold`}></span>
					<span className={styles.close} onClick={()=>{store.dispatch({ type: "sip/suggestPortraitOnMobileModalShow", payload: false });}}>
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
				<div className={styles.clearStatus} style={{color:"#494a4b" }}>Please disable auto rotation to use RingPlan Application</div>
			</div>
		</div>
	);
};

export default SuggestPortraitOnMobileModal;
