import React, { useEffect, useState } from "react";
import styles from "./OpenApp.module.scss";
import XMainIcon from "components/UI/Icons/XMain";
import Cookies from "js-cookie";

interface IOpenApp {
	style: Object;
}

const OpenApp: React.FC<IOpenApp> = ({ style }) => {
	const [dispBtn, setDispBtn] = useState(false);
	const [isMobile, setIsMobile] = useState(false);
	const [appInstalled, setAppInstalled] = useState(false);
	const appLink = "com.ringplan.apps://";

	useEffect(() => {
		const userAgent = navigator?.userAgent || navigator?.vendor || window?.opera;
		setIsMobile(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent));
		setDispBtn(Cookies.get("deep_link") !== "false");
	}, []);

	const handleOpenApp = () => {
		if (appInstalled) {
			window.location.href = appLink;
		} else {
			const userAgent = navigator?.userAgent || navigator?.vendor || window?.opera;
			if (/android/i.test(userAgent)) {
				window.location.href = "https://play.google.com/store/apps/details?id=com.ringplan.apps";
			} else if (/iPad|iPhone|iPod/i.test(userAgent)) {
				window.location.href = "https://apps.apple.com/app/id1528012920";
			} else {
				setDispBtn(false);
			}
		}
	};

	const handleOpenAppPrompt = () => {
		setDispBtn(false);
		Cookies.set("deep_link", "false");
	};

	return (
		isMobile &&
		dispBtn && (
			<div className={styles.openApp} style={style}>
				<button onClick={handleOpenApp} className={styles.mainBtn}>
					{appInstalled ? "OPEN APP" : "OPEN APP"}
				</button>

				{!style && (
					<button onClick={handleOpenAppPrompt}>
						<XMainIcon />
					</button>
				)}
			</div>
		)
	);
};

export default OpenApp;
