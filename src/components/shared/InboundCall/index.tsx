import styles from "./InboundCall.module.scss";
import Signal from "components/TinyComponents/Signal";
import { useDispatch, useSelector } from "react-redux";
import sip from "../../../lib/sip"
import { nameIcon } from "utils";

const InboundCall = () => {
	const { ringingInboundCalls, ringingInboundCallActive, activeCallLineNumber} = useSelector((state: any) => state.sip)
	return (
		ringingInboundCalls.map((item:any, i:number) => (
			activeCallLineNumber === item.LineNumber? (
			// ringingInboundCallActive === item.LineNumber? (
			<section className={styles.popUp}>
				<div className={styles.inboundCall}>
					<div className={`flex justify-center ${styles.signal_box}`}>
						<Signal />
					</div>
					<div className={styles.profile_box}>
						<svg xmlns="http://www.w3.org/2000/svg" width="138" height="138" viewBox="0 0 138 138" fill="none">
							<ellipse cx="69" cy="69" rx="69" ry="46" fill="#3B9EF7" fill-opacity="0.1" />
							<ellipse cx="69" cy="69" rx="56.6154" ry="61.9231" fill="#3B9EF7" fill-opacity="0.15" />
							<ellipse cx="69" cy="69" rx="46" ry="69" fill="#3B9EF7" fill-opacity="0.2" />
						</svg>
						<span className={`large_title ${styles.profile}`}>{item.DisplayName? nameIcon(item.DisplayName):nameIcon(item.DisplayNumber)}</span>
					</div>
					<p className={`title_1`} style={{ color: "var(--text-primary, #1F2023)" }}>
						{item.DisplayName}
						{/* {item.LineNumber} */}
					</p>
					<p className={`sub_headline`} style={{ color: "var(--text-secondary, #5C6168)" }}>
						{item.DisplayNumber} 
					</p>
					<p className={`body`} style={{ color: "var(--text-secondary, #5C6168)" }}>
						Calling...
					</p>

					<div className={styles.button_box}>
						<button onClick={()=>{sip.answerAudioCall(item.LineNumber)}} style={{ background: "var(--support-approve, #75C322)" }}>
							<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
								<path
									d="M43.6874 33.6864V39.5927C43.6896 40.141 43.5773 40.6837 43.3576 41.1861C43.138 41.6885 42.8158 42.1394 42.4118 42.5101C42.0078 42.8808 41.5308 43.163 41.0114 43.3386C40.492 43.5143 39.9416 43.5795 39.3955 43.5302C33.3373 42.8719 27.518 40.8018 22.4052 37.4861C17.6484 34.4634 13.6154 30.4305 10.5927 25.6736C7.26547 20.5376 5.19486 14.69 4.54863 8.60457C4.49944 8.06014 4.56414 7.51144 4.73862 6.99339C4.9131 6.47534 5.19354 5.9993 5.56208 5.59557C5.93062 5.19184 6.37919 4.86927 6.87922 4.64841C7.37926 4.42754 7.9198 4.31321 8.46645 4.31269H14.3727C15.3281 4.30329 16.2544 4.64163 16.9789 5.26465C17.7033 5.88766 18.1765 6.75285 18.3102 7.69894C18.5595 9.58907 19.0218 11.4449 19.6883 13.2311C19.9532 13.9358 20.0105 14.7016 19.8535 15.4379C19.6965 16.1741 19.3317 16.8499 18.8024 17.3852L16.3021 19.8855C19.1047 24.8144 23.1857 28.8954 28.1146 31.698L30.6149 29.1977C31.1502 28.6684 31.826 28.3036 32.5622 28.1466C33.2985 27.9895 34.0643 28.0469 34.7689 28.3118C36.5551 28.9783 38.411 29.4406 40.3011 29.6899C41.2575 29.8248 42.1309 30.3065 42.7552 31.0434C43.3796 31.7803 43.7113 32.7209 43.6874 33.6864Z"
									fill="white"
								/>
							</svg>
						</button>
						<button onClick={()=>sip.rejectCall(item.LineNumber)} style={{ background: "var(--support-danger, #EE3939)" }}>
							<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
								<g clipPath="url(#clip0_2401_8731)">
									<path
										d="M1.42982 27.0272L5.21254 30.7398C5.81557 31.3617 6.63049 31.7445 7.5023 31.8152C8.37412 31.886 9.24201 31.6397 9.94093 31.1234C11.3111 30.092 12.7958 29.216 14.3667 28.5122C14.9877 28.2358 15.5149 27.7905 15.8858 27.229C16.2568 26.6675 16.456 26.0134 16.4598 25.3442V22.2009C21.4115 20.8644 26.639 20.8644 31.5907 22.2009V25.3442C31.5945 26.0134 31.7937 26.6675 32.1646 27.229C32.5356 27.7905 33.0628 28.2358 33.6838 28.5122C35.2546 29.216 36.7393 30.092 38.1095 31.1234C38.8011 31.634 39.6583 31.8804 40.5213 31.8167C41.3843 31.7529 42.1942 31.3834 42.8001 30.7769L46.5828 27.0643C46.9326 26.7204 47.2056 26.3088 47.3843 25.8556C47.5631 25.4025 47.6438 24.9178 47.6213 24.4323C47.5988 23.9469 47.4735 23.4714 47.2534 23.0361C47.0334 22.6008 46.7234 22.2152 46.3432 21.9039C42.0319 18.4849 36.9606 16.1108 31.5402 14.9738C26.5577 13.8837 21.3918 13.8837 16.4094 14.9738C11.0113 16.1035 5.95839 18.4601 1.65679 21.8544C1.27544 22.1666 0.964734 22.5536 0.744579 22.9905C0.524424 23.4274 0.399668 23.9046 0.378302 24.3916C0.356936 24.8785 0.43943 25.3645 0.620503 25.8184C0.801577 26.2722 1.07723 26.684 1.42982 27.0272Z"
										fill="white"
									/>
								</g>
								<defs>
									<clipPath id="clip0_2401_8731">
										<rect width="47.25" height="47.25" fill="white" transform="translate(0.375 0.375)" />
									</clipPath>
								</defs>
							</svg>
						</button>
					</div>
					<div className={styles.silent_box} onClick={()=>sip.ringtone(item.LineNumber, !item.ringtone)}>
						<span className={styles.silent} style={item.ringtone?{ backgroundColor: "var(--background-danger, #FFEBEB)" }:{}}>
							<svg xmlns="http://www.w3.org/2000/svg" width="19" height="18" viewBox="0 0 19 18" fill="none">
								<path
									d="M14.8355 13.773C15.4623 13.1462 15.9595 12.4021 16.2987 11.5831C16.638 10.7642 16.8126 9.88641 16.8126 8.99998C16.8126 8.11355 16.638 7.2358 16.2987 6.41684C16.1107 5.96279 15.874 5.53173 15.5936 5.13092M12.8473 11.784C13.5855 11.0456 14.0003 10.0442 14.0003 8.99998C14.0003 8.33929 13.8342 7.69572 13.5252 7.12506M10.0625 8.25006V3.04498C10.0624 2.9338 10.0294 2.82514 9.96755 2.73273C9.90573 2.64032 9.81792 2.56829 9.7152 2.52576C9.61247 2.48323 9.49945 2.47209 9.3904 2.49375C9.28135 2.51542 9.18117 2.56891 9.1025 2.64748L5.5625 6.18748H3.8825C3.2225 6.18748 2.6045 6.56698 2.429 7.20298C2.2715 7.77523 2.1875 8.37748 2.1875 8.99998C2.18691 9.60711 2.26814 10.2115 2.429 10.797C2.6045 11.4322 3.2225 11.8125 3.8825 11.8125H5.5625L6.12509 12.3751M10.0625 10.5001V14.955C10.0624 15.0662 10.0294 15.1748 9.96755 15.2672C9.90573 15.3596 9.81792 15.4317 9.7152 15.4742C9.61247 15.5167 9.49945 15.5279 9.3904 15.5062C9.28135 15.4845 9.18117 15.431 9.1025 15.3525L7.25 13.5M3.5 15L15.5 2.99998"
									stroke="#1F2023"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
							<span className={`footnote`} style={{ color: "var(--text-primary, #1F2023)" }}>
								Silent
							</span>
						</span>
					</div>
				</div>
			</section>) : null
		)) 
	);
}; 

export default InboundCall;
