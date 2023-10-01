import Header from "./../../components/Voicemail/Header";
import NoVoicemail from "./../../components/Voicemail/NoVoicemail";
import styles from "./VoiceMail.module.scss";
import VoicemailCard from "./../../components/Voicemail/VoicemailCard";
import VoicemailFooter from "./../../components/Voicemail/VoicemailFooter";
import DeleteVoicemail from "./../../components/Voicemail/DeleteVoicemail";
import Filter from "./../../components/Voicemail/Filter";
// import ShareBtnPopup from "./../../components/Voicemail/ShareBtnPopup";
import BaseLayout from "../../layouts/BaseLayout";
import { useGetVoicemailsQuery } from "services/voicemail";
import { IVoicemail } from "redux/voicemail/voicemailTypes";
import VoicemailCardSkeleton from "components/Voicemail/VoicemailCardSkeleton";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import PopupMenu from "components/Voicemail/PopupMenu";

const Voicemail = () => {
	const dispatch = useDispatch();
	const { data, isLoading } = useGetVoicemailsQuery(null);
	const [noVoicemail, setNoVoicemail] = useState(false);
	const [filterSlider, setFilterSlider] = useState(false);
	const [deleteVoicemailModal, setDeleteVoicemailModal] = useState(false);

	return (
		<div className={styles.voicemail}>
			<BaseLayout>
				<section className={styles.main}>
					<div className={styles.header}>
						<Header filterClicked={setFilterSlider} />
					</div>

					<div className={styles.body}>
						{noVoicemail && (
							<div className={styles.noVoiceBox}>
								<NoVoicemail />
							</div>
						)}

						<div className={styles.body_box}>
							{isLoading ? (
								<>
									{Array(15)
										.fill(null)
										.map((el) => (
											<VoicemailCardSkeleton />
										))}
								</>
							) : (
								data?.map((voicemail: IVoicemail) => (
									<VoicemailCard
										id={voicemail._id}
										title={voicemail.source_representation_name}
										ext={voicemail.extension_source}
										duration={voicemail.voicemail_file.duration}
										transcript={voicemail.transcription}
										time={voicemail.time_received}
										link={voicemail.voicemail_file.link}
									/>
								))
							)}
						</div>

						<div className={styles.footer}>
							<VoicemailFooter />
						</div>
					</div>
				</section>
			</BaseLayout>

			{filterSlider ? <Filter onClose={setFilterSlider} /> : null}
			{deleteVoicemailModal ? <DeleteVoicemail onClose={setDeleteVoicemailModal} /> : null}
		</div>
	);
};

export default Voicemail;
