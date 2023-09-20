import Header from "./../../components/Voicemail/Header";
import NoVoicemail from "./../../components/Voicemail/NoVoicemail";
import styles from "./VoiceMail.module.scss";
import VoicemailCard from "./../../components/Voicemail/VoicemailCard";
import VoicemailFooter from "./../../components/Voicemail/VoicemailFooter";
// import DeleteVoicemail from "./../../components/Voicemail/DeleteVoicemail";
// import Filter from "./../../components/Voicemail/Filter";
// import ShareBtnPopup from "./../../components/Voicemail/ShareBtnPopup";
import BaseLayout from "../../layouts/BaseLayout";
// import PopupMenu from "components/Voicemail/PopupMenu";

const Voicemail = () => {
	return (
		<div style={{ position: "relative", width: "100%", height: "100vh" }}>
			<BaseLayout>
				<section className={`${styles.main}`}>
					<div className={styles.header}>
						<Header />
					</div>

					<div className={`${styles.body}`}>
						{false && (
							<div className={styles.noVoiceBox}>
								<NoVoicemail />
							</div>
						)}

						{true && (
							<div className={styles.body_box}>
								<VoicemailCard />
							</div>
						)}

						<div className={styles.footer}>
							<VoicemailFooter />
						</div>
					</div>
				</section>
			</BaseLayout>

			{/* <Filter /> */}
			{/* <DeleteVoicemail /> */}
		</div>
	);
};

export default Voicemail;
