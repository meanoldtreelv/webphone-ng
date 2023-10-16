import React, { useState } from "react";
import styles from "./ScheduleMeetingDialogue.module.scss";
import Backdrop from "components/UI/Backdrop";
import CloseIcon from "components/UI/Icons/Close";
import Select from "components/UI/Forms/Select";

const ScheduleMeetingDialogue = () => {
	const [isRepeat, setIsRepeat] = useState(false);
	const [isPrivate, setIsPrivate] = useState(false);

	const [selectedOption, setSelectedOption] = useState("never");

	const handleOptionChange = (event) => {
		setSelectedOption(event.target.value);
	};
	return (
		<>
			<Backdrop />
			<div className={styles.dialogueBox}>
				<h1 className={styles.topHeading}>
					<span>
						<span>Schedule Meet</span>
					</span>

					<span>
						<CloseIcon />
					</span>
				</h1>
				<label htmlFor="">Title</label>

				<div className={styles.row}>
					<input type="text" placeholder="Enter title here..." />
				</div>
				<label>Description</label>
				<textarea name="" id="" rows="3" placeholder="Enter Description here..." className={styles.textarea}></textarea>
				<label>Date & Time</label>
				<div className={styles.row}>
					{/* <label htmlFor="">Title</label> */}
					<input type="datetime-local" />
					{/* <span>
						<ContactBookIcon />
					</span> */}
				</div>
				<label>Time Zone</label>
				<div className={styles.row2}>
					<Select />
				</div>
				<label htmlFor="">Attendees emails</label>
				<div className={styles.emailBox}>
					<input type="text" name="" id="" placeholder="Enter email here..." />
					<button>ADD</button>
				</div>

				<div className={styles.checkboxGroup}>
					<div className={styles.box1}>
						<span>
							<input
								type="checkbox"
								name=""
								id=""
								onChange={() => {
									setIsRepeat(!isRepeat);
								}}
							/>
							<label htmlFor="">Repeat</label>
						</span>
						{isRepeat && (
							<span>
								<Select />
							</span>
						)}
					</div>
					{isRepeat && (
						<div className={styles.endBox}>
							<div>
								<label htmlFor="">Ends:</label>
								<div className={styles.ends}>
									<span>
										<input
											type="radio"
											name="ends"
											id=""
											value="never"
											checked={selectedOption === "never"}
											onChange={handleOptionChange}
										/>
										<label htmlFor="">Never</label>
									</span>
									<span>
										<input
											type="radio"
											name="ends"
											id=""
											value="after"
											checked={selectedOption === "after"}
											onChange={handleOptionChange}
										/>
										<label htmlFor="">After</label>
									</span>
									<span>
										<input
											type="radio"
											name="ends"
											id=""
											value="on_date"
											checked={selectedOption === "on_date"}
											onChange={handleOptionChange}
										/>
										<label htmlFor="">On Date</label>
									</span>
								</div>
							</div>
							{selectedOption === "after" && (
								<div className={styles.occurrence}>
									<input type="text" name="" id="" placeholder="1" />
									<label htmlFor="">occurrences</label>
								</div>
							)}
							{selectedOption === "on_date" && (
								<div className={styles.on_date}>
									<input type="date" name="" id="" placeholder="1" />
								</div>
							)}
						</div>
					)}
				</div>

				<div className={styles.checkboxGroup}>
					<div className={styles.box1}>
						<span>
							<input
								type="checkbox"
								name=""
								id=""
								onChange={() => {
									setIsPrivate(!isPrivate);
								}}
							/>
							<label htmlFor="">Make it Private</label>
						</span>
					</div>
					{isPrivate && (
						<div>
							<label htmlFor="">Password</label>
							<div className={styles.row}>
								<input type="text" placeholder="Enter password here..." />
							</div>
						</div>
					)}
				</div>

				<div className={` ${styles.btnBox}`}>
					<button className={styles.cancel}>Close</button>
					<button className={styles.submit}>Schedule</button>
				</div>
			</div>
		</>
	);
};

export default ScheduleMeetingDialogue;
