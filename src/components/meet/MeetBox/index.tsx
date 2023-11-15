import { useEffect, useState } from "react";
import styles from "./MeetBox.module.scss";
import SettingsIcon from "components/UI/Icons/Sidebar/Settings";
import MeetingCard from "../MeetingCard";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setMeetList, setSettingsDialogue } from "redux/meet/meetSlice";
// import { getMeetList } from "effects/apiEffect";
import { calendarType, calendarView, dateRange, loading, meetDateRange } from "redux/meet/meetSelectors";
import MeetCalendar from "components/UI/Calendar2";
import { useLazyGetMeetQuery } from "services/meet";
import Calendar from "components/UI/Calendar";
import gsuite_small from "assets/images/img/google_small.png";
import outlook from "assets/images/img/outlook_small.png";
import { ClipLoader } from "react-spinners";

const MeetBox = () => {
	const [tabSelected, setTabSelected] = useState("calendar");

	const dispatch = useDispatch();
	const { start, end } = useSelector(dateRange);
	const { meetStart, meetEnd } = useSelector(meetDateRange);

	const [meetingList, setMeetingList] = useState<{}[]>([]);

	const [loadMore, setLoadMore] = useState(false);
	const [totalPageCount, setTotalPageCount] = useState(0);
	const [page, setPage] = useState(1);

	const [getMeetList, { data: meetListData, isLoading: isLoading, isFetching }] = useLazyGetMeetQuery();

	const perPage = 100;

	const calendar = useSelector(calendarType);

	const calendarViews = useSelector(calendarView);

	useEffect(() => {
		const fetchData = async () => {
			dispatch(setLoading(isLoading));
			await getMeetList({ dateFrom: meetStart, dateTo: meetEnd, perPage, page: 1 });
		};

		meetStart && meetEnd && fetchData();
		// start && end && console.log(fetchData(), "fetchdata");

		// setTotalPageCount(headers?.["x-pagination-page-count"]);
		// setPage(2);
		// console.log(meetingList, meetListData, "both");
	}, [meetStart]);

	useEffect(() => {
		setMeetingList(meetListData);
		dispatch(setMeetList(meetListData));
	}, [meetListData]);

	// console.log(headers, "headers");
	// console.log(totalPageCount, "totalPageCount");
	// console.log(page, "page");

	// useEffect(() => {
	// 	start &&
	// 		getMeetList(
	// 			start,
	// 			end,
	// 			perPage,
	// 			1,
	// 			(res: any) => {
	// 				console.log(res, "meet List API retrieve");
	// 				if (res?.status === 200) {
	// 					console.log("success in meet List retrieve");
	// 					console.log(res);

	// 					setMeetingList(res?.data);
	// 					setTotalPageCount(res?.headers?.["x-pagination-page-count"]);
	// 					setPage(2);
	// 				}
	// 			},
	// 			(err: any) => {
	// 				console.error(err, "err in account retrieve");
	// 			},
	// 		);
	// }, [start, end]);

	const loadMoreHandler = async () => {
		await getMeetList({ dateFrom: meetStart, dateTo: meetEnd, perPage, page });
		setMeetingList([...meetingList, ...meetListData]);
		setPage(page + 1);
		// getMeetList(
		// 	start,
		// 	end,
		// 	perPage,
		// 	page,
		// 	(res: any) => {
		// 		console.log(res, "meet List API retrieve");
		// 		if (res?.status === 200) {
		// 			console.log("success in meet List retrieve");
		// 			console.log(res);

		// 			setMeetingList([...meetingList, ...res?.data]);
		// 			// setTotalPageCount(res?.headers?.["x-pagination-page-count"]);
		// 			setPage(page + 1);
		// 		}
		// 	},
		// 	(err: any) => {
		// 		console.error(err, "err in account retrieve");
		// 	},
		// );
	};

	// console.log(totalPageCount, page);
	// console.log("====================================");
	// console.log(headers, "headerData");
	// console.log("====================================");

	// console.log(isLoading, isFetching);

	return (
		<div className={styles.queues}>
			<div className={styles.headerBox}>
				<div className={styles.header}>
					<span
						className={`${tabSelected === "timeline" && styles.activeTab}`}
						onClick={() => {
							setTabSelected("timeline");
						}}>
						Timeline
					</span>
					<span
						className={`${tabSelected === "calendar" && styles.activeTab}`}
						onClick={() => {
							setTabSelected("calendar");
						}}>
						Calender
					</span>
				</div>
				<div className={styles.settings}>
					{calendar === "google" && <img src={gsuite_small} alt=""></img>}
					{calendar === "outlook" && <img src={outlook} alt=""></img>}
					<span
						onClick={() => {
							dispatch(setSettingsDialogue(true));
						}}>
						<SettingsIcon />
					</span>
				</div>
			</div>
			{tabSelected === "timeline" && (
				<div>
					<div className={styles.meetBox}>
						{isFetching ? (
							<div className={styles.loader}>
								<ClipLoader />
							</div>
						) : (
							<>
								{/* <div>17 OCTOBER, TUE</div> */}
								{meetingList?.map((item) => <MeetingCard key={item.id} meetData={item} />)}
								<div className={styles.loadMore}>
									{meetListData?.length === perPage && <button onClick={loadMoreHandler}>Load More...</button>}
								</div>
							</>
						)}
					</div>
				</div>
			)}

			{tabSelected === "calendar" && (
				<div className={styles.calendar}>
					{/* {isFetching ? (
						<div className={styles.loader}>
							<ClipLoader />
						</div>
					) : (
						<>
							<Calendar />
						</>
					)} */}
					{isFetching && (
						<div className={styles.loader}>
							<ClipLoader />
						</div>
					)}
					<Calendar />
				</div>
			)}
		</div>
	);
};

export default MeetBox;
