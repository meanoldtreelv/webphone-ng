import { useEffect, useState } from "react";
import styles from "./MeetBox.module.scss";
import SettingsIcon from "components/UI/Icons/Sidebar/Settings";
import MeetingCard from "../MeetingCard";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setMeetList, setSettingsDialogue } from "redux/meet/meetSlice";
import { calendarType, calendarView, dateRange, meetDateRange } from "redux/meet/meetSelectors";
import { useLazyGetMeetQuery } from "services/meet";
import Calendar from "components/UI/Calendar";
import gsuite_small from "assets/images/img/google_small.png";
import outlook from "assets/images/img/outlook_small.png";
import { ClipLoader } from "react-spinners";
import MeetSkeleton from "../MeetSkeleton";

const MeetBox = () => {
	const [tabSelected, setTabSelected] = useState("timeline");

	const dispatch = useDispatch();

	const { meetStart, meetEnd } = useSelector(meetDateRange);

	const [meetingList, setMeetingList] = useState<{}[]>([]);

	const [page, setPage] = useState(1);

	const [getMeetList, { data: meetListData, isLoading: isLoading, isFetching }] = useLazyGetMeetQuery();

	const perPage = 100;

	const calendar = useSelector(calendarType);

	useEffect(() => {
		const fetchData = async () => {
			dispatch(setLoading(isLoading));
			await getMeetList({ dateFrom: meetStart, dateTo: meetEnd, perPage, page: 1 });
		};

		meetStart && meetEnd && fetchData();
	}, [meetStart]);

	useEffect(() => {
		setMeetingList(meetListData);
		dispatch(setMeetList(meetListData));
	}, [meetListData]);

	const loadMoreHandler = async () => {
		await getMeetList({ dateFrom: meetStart, dateTo: meetEnd, perPage, page });
		setMeetingList([...meetingList, ...meetListData]);
		setPage(page + 1);
	};

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
						{true ? (
							<div className={styles.loader}>
								{Array(16)
									.fill(null)
									.map((item, index) => (
										<MeetSkeleton key={index} />
									))}
							</div>
						) : (
							<>
								{/* <div>17 OCTOBER, TUE</div> */}
								{meetingList?.length === 0 && (
									<div style={{ textAlign: "center" }}> No meeting scheduled at selected date !!!</div>
								)}
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
					{isFetching && (
						<div className={styles.loader}>
							{/* <ClipLoader /> */}
							{Array(16)
								.fill(null)
								.map((item, index) => (
									<MeetSkeleton key={index} />
								))}
						</div>
					)}
					<Calendar />
				</div>
			)}
		</div>
	);
};

export default MeetBox;
