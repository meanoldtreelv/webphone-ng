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
// import FormModal from "components/FormModal";
import SimpleNotification from "components/SimpleNotification/inex";
import { simpleNotification } from "redux/common/commonSelectors";
import { useGetExtensionsQuery } from "services/extension";
import NoVoicemailSearch from "components/Voicemail/NoVoicemailSearch";
import Calendar from "components/UI/CalendarMain";
import BottomSheet from "components/UI/BottomSheet";
import BottomPlayer from "components/Voicemail/BottomPlayer";
import LinkIcon from "components/UI/Icons/Voicemail/Link";
import CopyIcon from "components/UI/Icons/Voicemail/Copy";
import EnvelopIcon from "components/UI/Icons/Voicemail/Envelop";
import { formatFilterDate } from "utils";
import { setLoader } from "redux/common/commonSlice";
// import { formatFilterDate } from "utils";

const Voicemail = () => {
	const dispatch = useDispatch();
	const [filterSlider, setFilterSlider] = useState(false);
	const [deleteVoicemailModal, setDeleteVoicemailModal] = useState(false);
	const [filterDate, setFilterDate] = useState(false);
	const voicemailId = useSelector(moreOptVoicemail);
	const [audioSlide, setAudioSlide] = useState(false);
	const strQueries = useSelector(voicemailStrQueries);
	const queries = useSelector(voicemailQueries);
	const [getVoicemails, { data, isLoading, isFetching }] = useLazyGetVoicemailsQuery();
	const voicemailResultsList = useSelector(voicemailResults);
	const newResult = useSelector(voicemailNewFilter);
	const simpleMsg = useSelector(simpleNotification);
	const [filterAnim, setFilterAnim] = useState(false);
	const [search, setSearch] = useState("");
	const [pageSize, setPageSize] = useState(20);
	const [page, setPage] = useState(1);
	const [filterAppliedV, setFilterAppliedV] = useState<any>();
	const [date, setDate] = useState({
		from_date: "",
		to_date: "",
	});
	// to be removed when auth cookies are implemented
	const { data: extListData } = useGetExtensionsQuery("5ed668cd38d0350104cb8789");
	// const btmMore = [
	// 	{
	// 		icon: <LinkIcon />,
	// 		text: "Copy Link",
	// 	},
	// 	{
	// 		icon: <CopyIcon />,
	// 		text: "Copy Text",
	// 	},

	// 	{
	// 		icon: <EnvelopIcon />,
	// 		text: "Share via Email",
	// 	},
	// ];

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
			dispatch(setLoader(false));
		};

		if (voicemailsParsed && voicemailsParsed?.length) {
			dispatch(setVoicemailResults(voicemailsParsed?.slice(0, 20)));
			dispatch(setLoader(true));
			dispatch(
				setVoicemailQueries({
					page: Math.ceil(voicemailsParsed?.length / 80),
					page_size: 80,
				}),
			);
			fetchVoicemails();
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
	}, [data]);

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

		if (
			voicemailsParsed &&
			voicemailsParsed?.length !== pageSize &&
			voicemailsParsed?.length !== Number(queries?.page) * 20 &&
			Object.keys(queries).length === 2
		) {
			dispatch(setVoicemailResults(voicemailsParsed?.slice(0, pageSize + 20)));
			setPageSize((prevState) => prevState + 20);
		} else {
			fetchVoicemails();
		}
	}, [strQueries, page]);

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
			return voicemail?.source_representation_name?.toLowerCase()?.includes(search.toLowerCase());
		});

		dispatch(setVoicemailResults(filteredRes?.slice(0, 20)));
	}, [search]);

	const handleScroll = (e: any) => {
		const scrollTop = e.target.scrollTop;
		const scrollHeight = e.target.scrollHeight;
		const clientHeight = e.target.clientHeight;

		if (scrollTop + clientHeight >= scrollHeight) {
			const voicemailsJson = localStorage?.getItem("voicemails");
			let voicemailsParsed: [];

			try {
				voicemailsParsed = JSON.parse(String(voicemailsJson));
			} catch (e) {
				voicemailsParsed = [];
			}

			if (voicemailsParsed?.length === page * 20) {
				dispatch(
					setVoicemailQueries({
						page: Math.ceil(voicemailsParsed?.length / 80 + 1),
						page_size: 80,
					}),
				);
			} else {
				if (voicemailsParsed?.length > page * 20) {
					setPage(page + 1);
				}
			}
		}
	};

	const filterVoicemailDate = () => {
		let dateFilter = {};
		dateFilter = {
			from_date: date.from_date && formatFilterDate(date.from_date),
			to_date: date.to_date && formatFilterDate(date.to_date),
		};
		dateFilter = Object.fromEntries(Object.entries(dateFilter).filter(([key, value]) => value !== ""));

		if (Object.keys(dateFilter).length) {
			dispatch(
				setVoicemailQueries({
					...queries,
					...dateFilter,
				}),
			);
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

					<div
						className={`${styles.body} ${!voicemailResultsList?.length ? styles.body_NoOverflow : ""}`}
						onScroll={handleScroll}>
						{!voicemailResultsList?.length && !isLoading && !search && (
							<div className={styles.noVoiceBox}>
								<NoVoicemail />
							</div>
						)}

						<div className={`${styles.body_box} ${!search ? styles.body_boxPadding : ""} `}>
							{!voicemailResultsList?.length ? (
								<div className={styles.skeletonVLoading}>
									{Array(15)
										.fill(null)
										.map((el) => (
											<VoicemailCardSkeleton />
										))}
								</div>
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
							<VoicemailFooter setAudioSlide={setAudioSlide} />
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
