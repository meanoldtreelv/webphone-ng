import { useEffect, useState } from "react";
import styles from "./MeetBox.module.scss";
import SettingsIcon from "components/UI/Icons/Sidebar/Settings";
import MeetingCard from "../MeetingCard";
import { useDispatch, useSelector } from "react-redux";
import { setMeetList, setSettingsDialogue } from "redux/meet/meetSlice";
// import { getMeetList } from "effects/apiEffect";
import { dateRange } from "redux/meet/meetSelectors";
import MeetCalendar from "components/UI/Calendar2";
import { useLazyGetMeetQuery } from "services/meet";
import Calendar from "components/UI/Calendar";

const MeetBox = () => {
	const [tabSelected, setTabSelected] = useState("timeline");

	const dispatch = useDispatch();
	const { start, end } = useSelector(dateRange);

	const [meetingList, setMeetingList] = useState<{}[]>([]);

	const [loadMore, setLoadMore] = useState(false);
	const [totalPageCount, setTotalPageCount] = useState(0);
	const [page, setPage] = useState(1);

	const [getMeetList, { data: meetListData }] = useLazyGetMeetQuery();

	const perPage = 100;

	useEffect(() => {
		const fetchData = async () => {
			await getMeetList({ dateFrom: start, dateTo: end, perPage, page: 1 });
		};

		start && end && fetchData();
		// start && end && console.log(fetchData(), "fetchdata");

		// setTotalPageCount(headers?.["x-pagination-page-count"]);
		// setPage(2);
		// console.log(meetingList, meetListData, "both");
	}, [start, end]);

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
		await getMeetList({ dateFrom: start, dateTo: end, perPage, page });
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
				<span
					onClick={() => {
						dispatch(setSettingsDialogue(true));
					}}>
					<SettingsIcon />
				</span>
			</div>
			{tabSelected === "timeline" && (
				<div>
					<div className={styles.meetBox}>
						<div>17 OCTOBER, TUE</div>
						{meetingList?.map((item) => <MeetingCard key={item.id} meetData={item} />)}
						<div className={styles.loadMore}>
							{meetListData?.length === perPage && <button onClick={loadMoreHandler}>Load More...</button>}
						</div>
					</div>
				</div>
			)}

			{tabSelected === "calendar" && (
				<div className={styles.calendar}>
					<Calendar />
					{/* <MeetCalendar /> */}
				</div>
			)}
		</div>
	);
};

export default MeetBox;
