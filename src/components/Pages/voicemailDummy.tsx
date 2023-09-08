import LayoutWrapper from "components/LayoutWrapper";
import Header from "components/Voicemail/Header";
import NoVoicemail from "components/Voicemail/NoVoicemail";
import style from "./voicemailDummy.module.scss";
import React from "react";
import VoicemailCard from "components/Voicemail/VoicemailCard";
import VoicemailFooter from "components/Voicemail/VoicemailFooter";
import DeleteVoicemail from "components/Voicemail/DeleteVoicemail";
import Filter from "components/Voicemail/Filter";

const VoicemailDummy = () => {
	return (
		<>
			<LayoutWrapper>
				<Header />
				{false && (
					<div className={style.noVoiceBox}>
						<NoVoicemail />
					</div>
				)}

				{false && (
					<>
						<div className={style.body}>
							<VoicemailCard />
							<VoicemailCard />
							<VoicemailCard />
							<VoicemailCard />
							<VoicemailCard />
						</div>
						<div className={style.footer}>
							<VoicemailFooter/>
						</div>
					</>

				)}

				{/* <div className={style.deleteVoicemail}>
					<DeleteVoicemail/>
				</div> */}

				<Filter/>
				

			</LayoutWrapper>
		</>
	);
};

export default VoicemailDummy;
