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
import Calendar from "components/UI/Calender";
// import { formatFilterDate } from "utils";

const Voicemail = () => {
	const dispatch = useDispatch();
	const [filterSlider, setFilterSlider] = useState(false);
	const [deleteVoicemailModal, setDeleteVoicemailModal] = useState(false);
	const [filterDate, setFilterDate] = useState(false);
	const voicemailId = useSelector(moreOptVoicemail);
	const page = useSelector(voicemailPage);
	const strQueries = useSelector(voicemailStrQueries);
	const queries = useSelector(voicemailQueries);
	const [getVoicemails, { data, isLoading, isFetching }] = useLazyGetVoicemailsQuery();
	const voicemailResultsList = useSelector(voicemailResults);
	const newResult = useSelector(voicemailNewFilter);
	const simpleMsg = useSelector(simpleNotification);
	const [filterAnim, setFilterAnim] = useState(false);
	const [search, setSearch] = useState("");
	const [pageSize, setPageSize] = useState(20);
	const [date, setDate] = useState({
		from_date: "",
		to_date: "",
	});
	// to be removed when auth cookies are implemented
	const { data: extListData } = useGetExtensionsQuery("5ed668cd38d0350104cb8789");

	useEffect(() => {
		const voicemailsJson = localStorage?.getItem("voicemails");
		let voicemailsParsed: [];

		try {
			voicemailsParsed = JSON.parse(String(voicemailsJson));
		} catch (e) {
			voicemailsParsed = [];
		}

		const fetchVoicemails = async () => {
			await getVoicemails(strQueries);
		};

		if (voicemailsParsed && voicemailsParsed?.length) {
			dispatch(setVoicemailResults(voicemailsParsed?.slice(0, 20)));
		} else {
			fetchVoicemails();
		}
	}, []);

	useEffect(() => {
		if (!isLoading && !isFetching && data) {
			if (Object.keys(queries).length <= 2) {
				const parsedData = JSON.parse(String(localStorage?.getItem("voicemails")));
				if (parsedData) {
					localStorage.setItem("voicemails", JSON.stringify([...parsedData, ...data]));
				} else {
					localStorage.setItem("voicemails", JSON.stringify(data));
				}
			}

			if (Object.keys(queries).length > 2) {
				dispatch(setVoicemailResults(data));
				setFilterDate(false);
			} else {
				dispatch(setVoicemailResults(data?.slice(0, 20)));
			}
		}
	}, [isLoading, isFetching]);

	useEffect(() => {
		const voicemailsJson = localStorage?.getItem("voicemails");
		let voicemailsParsed: [];

		try {
			voicemailsParsed = JSON.parse(String(voicemailsJson));
		} catch (e) {
			voicemailsParsed = [];
		}

		const fetchVoicemails = async () => {
			await getVoicemails(strQueries);
		};

		if (voicemailsParsed && voicemailsParsed?.length !== pageSize && Object.keys(queries).length <= 2) {
			dispatch(setVoicemailResults(voicemailsParsed?.slice(0, pageSize + 20)));
			setPageSize((prevState) => prevState + 20);
		} else {
			fetchVoicemails();
			console.log(strQueries);
		}
	}, [strQueries]);

	useEffect(() => {
		if (voicemailId === "") setDeleteVoicemailModal(false);
	}, [voicemailId]);

	useEffect(() => {
		const voicemailsJson = localStorage?.getItem("voicemails");
		let voicemailsParsed: [];

		try {
			voicemailsParsed = JSON.parse(String(voicemailsJson));
		} catch (e) {
			voicemailsParsed = [];
		}

		const filteredRes = voicemailsParsed?.filter((voicemail) => {
			return voicemail.source_representation_name.toLowerCase().includes(search.toLowerCase());
		});

		dispatch(setVoicemailResults(filteredRes?.slice(0, 20)));
	}, [search]);

	const handleScroll = (e: any) => {
		const scrollTop = e.target.scrollTop;
		const scrollHeight = e.target.scrollHeight;
		const clientHeight = e.target.clientHeight;

		if (scrollTop + clientHeight >= scrollHeight) {
			if (Number(queries?.per_page) >= 10000 && !isLoading) {
				dispatch(
					setVoicemailQueries({
						page: Number(queries?.page) + 1,
						page_size: Number(queries?.per_page) + 80,
					}),
				);
			} else {
				dispatch(setVoicemailQueries({ page: Number(queries?.page) + 1, page_size: Number(queries?.per_page) }));
			}
		}
	};

	const filterVoicemailDate = () => {
		let dateFilter = {};
		if (date.from_date) {
			dateFilter = {
				...dateFilter,
				from_date: date.from_date,
			};
		} else if (date.to_date) {
			dateFilter = {
				...dateFilter,
				to_date: date.to_date,
			};
		}

		dispatch(
			setVoicemailQueries({
				...queries,
				...dateFilter,
			}),
		);
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

							{search && !voicemailResultsList?.length ? <NoVoicemailSearch str={search} /> : null}

							{isFetching ? (
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
			{/* {filterDate ? <FormModal loading={isFetching} onClose={setFilterDate} /> : null} */}
			{filterDate ? (
				<Calendar
					setDate={setDate}
					filter={filterVoicemailDate}
					setDispCalendar={setFilterDate}
					placeholder1="From"
					placeholder2="To"
					date={date}
					loading={isFetching}
				/>
			) : null}
			{simpleMsg && <SimpleNotification msg={simpleMsg} />}
		</div>
	);
};

export default Voicemail;
