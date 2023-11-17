import React, { useState } from "react";
import styles from "./History.module.scss";
import ChevronRightIcon from "components/UI/Icons/Navigation/ChevronRight";
import ChevronLeftIcon from "components/UI/Icons/Navigation/ChevronLeft";

import { Link } from "react-router-dom";
import EditIcon from "components/UI/Icons/ClioIcon/Edit";
import CallMissedIcon from "components/UI/Icons/Call/CallMissed";

const History = () => {
	const [historyDetails, setHistoryDetails] = useState(false);
	return (
		<div className={styles.wrapper}>
			{!historyDetails && (
				<>
					<div className={styles.history}>
						<div>
							<CallMissedIcon />
							<h4>Wed, August 31, 2023 09:05AM</h4>
						</div>
						<span
							className={styles.arrow_right}
							onClick={() => {
								setHistoryDetails(true);
							}}>
							<ChevronRightIcon />
						</span>
					</div>
					<div className={styles.history}>
						<div>
							<CallMissedIcon />
							<h4>Wed, August 31, 2023 09:05AM</h4>
						</div>
						<span className={styles.arrow_right}>
							<ChevronRightIcon />
						</span>
					</div>
				</>
			)}

			{historyDetails && (
				<div className={styles.matter_details}>
					<div className={styles.matter_name}>
						<div className={styles.left}>
							<span
								className={styles.chevron}
								onClick={() => {
									setHistoryDetails(false);
								}}>
								<ChevronLeftIcon />
							</span>

							<span className={styles.name}>Call Details</span>
						</div>
					</div>
					<div className={styles.box}>
						<div className={styles.contact_details}>
							<div>
								<label htmlFor="">Call Type</label>
								<p>Outbound Call</p>
							</div>
							<div>
								<label htmlFor="">Duration</label>
								<p>02:38</p>
							</div>
							<div>
								<label htmlFor="">From</label>
								<p>Jenna wojcek</p>
							</div>
							<div>
								<label htmlFor="">To</label>
								<p>Rishit Patel</p>
							</div>
							<div>
								<label htmlFor="">Received at</label>
								<p>Wed, August 31, 2023 09:05AM</p>
							</div>
							<div>
								<label htmlFor="">Call Purpose</label>
								<p>Auto logged call</p>
							</div>
							<div>
								<label htmlFor="">Related Matter</label>
								<p>NOne</p>
							</div>
							<div>
								<label htmlFor="">Call Notes</label>
								<p>Auto call logged notes with Sandrom </p>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default History;
