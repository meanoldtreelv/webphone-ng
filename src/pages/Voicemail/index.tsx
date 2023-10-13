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
	voicemailQueries,
	voicemailResults,
	voicemailStrQueries,
} from "redux/voicemail/voicemailSelectors";
import { setNewFilter, setPage, setVoicemailQueries, setVoicemailResults } from "redux/voicemail/voicemailSlice";
// import PopupMenu from "components/Voicemail/PopupMenu";
import { ClipLoader } from "react-spinners";
import FormModal from "components/FormModal";
import SimpleNotification from "components/SimpleNotification/inex";
import { simpleNotification } from "redux/common/commonSelectors";
import { useGetExtensionsQuery } from "services/extension";
import NoVoicemailSearch from "components/Voicemail/NoVoicemailSearch";

const Voicemail = () => {
	const dispatch = useDispatch();
	const [noVoicemail, setNoVoicemail] = useState(false);
	const [filterSlider, setFilterSlider] = useState(false);
	const [deleteVoicemailModal, setDeleteVoicemailModal] = useState(false);
	const [filterDate, setFilterDate] = useState(false);
	const voicemailId = useSelector(moreOptVoicemail);
	const page = useSelector(voicemailPage);
	const strQueries = useSelector(voicemailStrQueries);
	const queries = useSelector(voicemailQueries);
	const [getVoicemails, { data: data, isLoading, isFetching }] = useLazyGetVoicemailsQuery();
	const voicemailResultsList = useSelector(voicemailResults);
	const newResult = useSelector(voicemailNewFilter);
	const simpleMsg = useSelector(simpleNotification);
	const [filterAnim, setFilterAnim] = useState(false);
	const [search, setSearch] = useState("");
	const [results, setResults] = useState<boolean>(false);

	// to be removed when auth cookies are implemented
	const { data: extListData } = useGetExtensionsQuery("5ed668cd38d0350104cb8789");

	useEffect(() => {
		dispatch(
			setVoicemailQueries({
				page,
				...queries,
			}),
		);
	}, [page]);

	useEffect(() => {
		if (voicemailId === "") setDeleteVoicemailModal(false);
	}, [voicemailId]);

	useEffect(() => {
		if (data) {
			if (newResult) {
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
			setFilterAnim(true);
			await getVoicemails(strQueries);
			setFilterAnim(false);
			setFilterSlider(false);
		};
		fetchVoicemails();
	}, [queries]);

	const handleScroll = (e: any) => {
		const scrollTop = e.target.scrollTop;
		const scrollHeight = e.target.scrollHeight;
		const clientHeight = e.target.clientHeight;

		if (scrollTop + clientHeight >= scrollHeight && !isFetching) {
			if (page == 1) dispatch(setPage(page + 1));
		}
	};

	return (
		<div className={styles.voicemail}>
			<BaseLayout>
				<section className={styles.main}>
					<div className={styles.header}>
						<Header
							filterClicked={setFilterSlider}
							filterSlider={filterSlider}
							deleteClicked={setDeleteVoicemailModal}
							dateClicked={setFilterDate}
							filterDate={filterDate}
							search={setSearch}
						/>
					</div>

					<div className={styles.body} onScroll={handleScroll}>
						{!voicemailResultsList?.length && !isLoading && (
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
								voicemailResultsList?.map((voicemail: IVoicemail, idx: number) => {
									const loResults = voicemail.source_representation_name
										.toLowerCase()
										.includes(search.toLowerCase()) ? (
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
									) : null;
									
									return loResults;
								})
							)}

							{/* {search && !results ? <NoVoicemailSearch str={search} /> : null} */}

							{page > 1 && isFetching ? (
								<div className={styles.loadMore}>
									<button className={styles.loadMore_btn}>
										<ClipLoader color="white" size={14} />
										<span>Loding...</span>
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

			{filterSlider ? <Filter extensionList={extListData} onClose={setFilterSlider} filterAnim={filterAnim} /> : null}
			{deleteVoicemailModal ? <DeleteVoicemail onClose={setDeleteVoicemailModal} /> : null}
			{filterDate ? <FormModal onClose={setFilterDate} /> : null}
			{simpleMsg && <SimpleNotification msg={simpleMsg} />}
		</div>
	);
};

export default Voicemail;
