import React, { useState } from "react";
import styles from "./Calendar.module.scss";
import { DatePicker } from "@gsebdev/react-simple-datepicker";
import FilterIcon from "../Icons/Filter";
import { ClipLoader } from "react-spinners";

interface ICalendar {
	placeholder1?: string;
	placeholder2?: string;
	setDispCalendar: (calendar: boolean) => void;
	filter?: (date: any) => void;
	loading?: boolean;
}

const Calendar: React.FC<ICalendar> = ({ placeholder1, placeholder2, setDispCalendar, filter, loading }) => {
	const [date, setDate] = useState({
		from_date: new Date(),
		to_date: new Date(),
	});

	const handleOnChange = ({ target }) => {
		console.log(target.value);
	};

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
							name="date-demo"
							onChange={({ target }) => setDate((prevState) => ({ ...prevState, from_date: target.value }))}
							value={String(date.from_date)}
						/>
					</div>

					<div className={styles.calendar_indate}>
						<DatePicker
							placeholder={placeholder2}
							name="date-demo"
							onChange={({ target }) => setDate((prevState) => ({ ...prevState, to_date: target.value }))}
							value={String(date.to_date)}
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
					<button className={styles.filterBtn} onClick={() => filter(date)}>
						{loading ? (
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
