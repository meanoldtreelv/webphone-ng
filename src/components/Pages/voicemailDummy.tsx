import LayoutWrapper from "components/LayoutWrapper";
import Header from "components/Voicemail/Header";
import NoVoicemail from "components/Voicemail/NoVoicemail";
import style from "./voicemailDummy.module.scss";
import React from "react";
import VoicemailCard from "components/Voicemail/VoicemailCard";
import VoicemailFooter from "components/Voicemail/VoicemailFooter";
import DeleteVoicemail from "components/Voicemail/DeleteVoicemail";
import Filter from "components/Voicemail/Filter";
import ShareBtnPopup from "components/Voicemail/ShareBtnPopup";

const VoicemailDummy = () => {
	return (
		<>
			<div style={{ position: "relative", width: "100%", height: "100vh" }}>
				<LayoutWrapper>
					<section className={`${style.main}`}>
						<div className={style.header}>
							<Header />
						</div>

						<div className={`${style.body}`}>
							{false && (
								<div className={style.noVoiceBox}>
									<NoVoicemail />
								</div>
							)}

							{true && (
								<>
									<div className={style.body}>
										<VoicemailCard />
										{/* <VoicemailCard />
									<VoicemailCard />
									<VoicemailCard />
									<VoicemailCard /> */}
									</div>
								</>
							)}

							<div className={style.footer}>
								<VoicemailFooter />
							</div>
						</div>
					</section>
				</LayoutWrapper>

				{/* <Filter/> */}
				{/* <DeleteVoicemail /> */}
			</div>
		</>
	);
};

export default VoicemailDummy;
