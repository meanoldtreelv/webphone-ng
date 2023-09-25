import styles from "./Settings.module.scss";
import BaseLayout from "../../layouts/BaseLayout";
import Header from "components/Settings/Header";
import SipAccount from "components/Settings/SipAccount";
import AudioSetting from "components/Settings/AudioSetting";
import VideoSetting from "components/Settings/VideoSetting";

const Settings = () => {
	return (
		<div style={{ position: "relative", width: "100%", height: "100vh" }}>
			<BaseLayout>
				<section className={`${styles.main}`}>
					<Header />
					<section>
						{/* <SipAccount /> */}
						{/* <AudioSetting /> */}
						<VideoSetting />
					</section>
				</section>
			</BaseLayout>
		</div>
	);
};

export default Settings;
