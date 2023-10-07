import Header from "./../../components/Voicemail/Header";
import NoVoicemail from "./../../components/Voicemail/NoVoicemail";
import styles from "./VoiceMail.module.scss";
import VoicemailCard from "./../../components/Voicemail/VoicemailCard";
import VoicemailFooter from "./../../components/Voicemail/VoicemailFooter";
import DeleteVoicemail from "./../../components/Voicemail/DeleteVoicemail";
import Filter from "./../../components/Voicemail/Filter";
// import ShareBtnPopup from "./../../components/Voicemail/ShareBtnPopup";
import BaseLayout from "../../layouts/BaseLayout";
import { useLazyGetVoicemailsQuery } from "services/voicemail";
import { IVoicemail } from "redux/voicemail/voicemailTypes";
import VoicemailCardSkeleton from "components/Voicemail/VoicemailCardSkeleton";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	moreOptVoicemail,
	voicemailNewFilter,
	voicemailPage,
	voicemailResults,
	voicemailStrQueries,
} from "redux/voicemail/voicemailSelectors";
import { setNewFilter, setPage, setVoicemailQueries, setVoicemailResults } from "redux/voicemail/voicemailSlice";
// import PopupMenu from "components/Voicemail/PopupMenu";
import { ClipLoader } from "react-spinners";

const Voicemail = () => {
	const dispatch = useDispatch();
	const [noVoicemail, setNoVoicemail] = useState(false);
	const [filterSlider, setFilterSlider] = useState(false);
	const [deleteVoicemailModal, setDeleteVoicemailModal] = useState(false);
	const voicemailId = useSelector(moreOptVoicemail);
	const page = useSelector(voicemailPage);
	const strQueries = useSelector(voicemailStrQueries);
	const [getVoicemails, { data, isLoading, isFetching }] = useLazyGetVoicemailsQuery();
	const voicemailResultsList = useSelector(voicemailResults);
	const newResult = useSelector(voicemailNewFilter);

	useEffect(() => {
		dispatch(
			setVoicemailQueries({
				page,
			}),
		);
	}, []);

	useEffect(() => {
		if (voicemailId === "") setDeleteVoicemailModal(false);
	}, [voicemailId]);

	useEffect(() => {
		if (data) {
			if (newResult) {
				console.log('new result')
				dispatch(setVoicemailResults([...data]));
			} else {
				dispatch(setVoicemailResults([...voicemailResultsList, ...data]));
			}
		}

		return () => {
			dispatch(setNewFilter(false));
		};	
	}, [data]);

	useEffect(() => {
		const fetchVoicemails = async () => {
			await getVoicemails(strQueries);
		};
		fetchVoicemails();
	}, [strQueries]);

	const handleScroll = (e: any) => {
		const scrollTop = e.target.scrollTop;
		const scrollHeight = e.target.scrollHeight;
		const clientHeight = e.target.clientHeight;

		if (scrollTop + clientHeight >= scrollHeight && !isFetching) {
			dispatch(setPage(page + 1));
		}
	};

	return (
		<div className={styles.voicemail}>
			<BaseLayout>
				<section className={styles.main}>
					<div className={styles.header}>
						<Header filterClicked={setFilterSlider} deleteClicked={setDeleteVoicemailModal} />
					</div>

					<div className={styles.body} onScroll={handleScroll}>
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
								voicemailResultsList?.map((voicemail: IVoicemail, idx: number) => (
									<VoicemailCard
										id={voicemail._id}
										title={voicemail.source_representation_name}
										ext={voicemail.extension_source}
										duration={voicemail.voicemail_file.duration}
										transcript={voicemail.transcription}
										time={voicemail.time_received}
										link={voicemail.voicemail_file.link}
										deleteModal={setDeleteVoicemailModal}
										listened={voicemail.listened}
										idx={idx}
									/>
								))
							)}

							{page > 1 && isFetching ? (
								<div className={styles.loadMore}>
									<button className={styles.loadMore_btn}>
										<span>Loding</span>
										<ClipLoader color="white" size={16} />
									</button>
								</div>
							) : null}
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
