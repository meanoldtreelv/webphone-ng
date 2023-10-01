import styles from "./Settings.module.scss";
import BaseLayout from "../../layouts/BaseLayout";
import Header from "components/Settings/Header";
import SipAccount from "components/Settings/SipAccount";
import AudioSetting from "components/Settings/AudioSetting";
import VideoSetting from "components/Settings/VideoSetting";
import UserInterface from "components/Settings/UserInterface";
import { useSelector } from "react-redux";
import { selectedTab } from "redux/setting/settingSelectors";
import Advanced from "components/Settings/Advanced";

const Settings = () => {
	const tabSelected = useSelector(selectedTab);
	return (
		<div style={{ position: "relative", width: "100%", height: "100vh" }}>
			<BaseLayout>
				<section className={`${styles.main}`}>
					<Header />
					<section>
						{tabSelected === "sip_account" && <SipAccount />}
						{tabSelected === "audio" && <AudioSetting />}
						{tabSelected === "video" && <VideoSetting />}
						{tabSelected === "ui" && <UserInterface />}
						{tabSelected === "advance" && <Advanced />}
					</section>
				</section>
			</BaseLayout>
		</div>
	);
};

export default Settings;
