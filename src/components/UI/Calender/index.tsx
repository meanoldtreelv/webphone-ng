import React, { useEffect, useState } from "react";
import styles from "./Calendar.module.scss";
import { DatePicker } from "@gsebdev/react-simple-datepicker";
import FilterIcon from "../Icons/Filter";
import { ClipLoader } from "react-spinners";
import { formatFilterDate } from "utils";

interface ICalendar {
	placeholder1?: string;
	placeholder2?: string;
	setDispCalendar: (calendar: boolean) => void;
	filter?: (date: any) => void;
	loading?: boolean;
	date: {
		from_date: string;
		to_date: string;
	};
	setDate: ({ from_date, to_date }: { from_date: string; to_date: string }) => void;
}

const Calendar: React.FC<ICalendar> = ({
	placeholder1,
	placeholder2,
	setDispCalendar,
	filter,
	loading,
	date,
	setDate,
}) => {
	// const handleOnChange = ({ target }) => {
	// 	console.log(formatFilterDate(target.value));
	// };

	return (
		<div className={styles.calendar}>
			<div className={styles.calendar_backdrop}></div>
			<div className={styles.calendar_wrapper}>
				<div className={styles.calendar_header}>
					<div>
						<FilterIcon />
						<h1>Filter</h1>
					</div>
					<p>Filter the list by date.</p>
				</div>
				<div className={styles.calendar_datepicker}>
					<div className={styles.calendar_indate}>
						<DatePicker
							placeholder={placeholder1}
							id="datepicker-id"
							onChange={({ target }) => setDate({ ...date, from_date: target.value })}
							value={date.from_date}
						/>
					</div>

					<div className={styles.calendar_indate}>
						<DatePicker
							placeholder={placeholder2}
							onChange={({ target }) => setDate({ ...date, to_date: target.value })}
							// onChange={handleOnChange}
							value={date.to_date}
						/>
					</div>
				</div>

				<div className={styles.actionBtns}>
					<button
						className={styles.cancelBtn}
						onClick={() => {
							setDispCalendar(false);
						}}>
						Cancel
					</button>
					<button className={styles.filterBtn} onClick={filter}>
						{!loading ? (
							"Filter"
						) : (
							<p>
								<ClipLoader color="white" size={16} />
								<span>Filtering...</span>
							</p>
						)}
					</button>
				</div>
			</div>
		</div>
	);
};

export default Calendar;
