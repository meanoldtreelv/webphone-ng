import { useState } from "react";
import styles from "./FromNumberPopUp.module.scss";

const FromNumberPopUp = () => {
	const [sortType, setSortType] = useState("unreadTop");

	return (
		<div className={styles.sortingBox}>
			<div className={styles.sorting}>Your Numbers</div>
			<div
				className={styles.radioBox}
				onClick={() => {
					setSortType("987654321");
				}}>
				<input type="radio" name="sorting" id="987654321" checked={sortType === "987654321"} />
				<label htmlFor="987654321">987654321</label>
			</div>
			<div
				className={styles.radioBox}
				onClick={() => {
					setSortType("123456897");
				}}>
				<input type="radio" name="sorting" id="123456897" checked={sortType === "123456897"} />
				<label htmlFor="123456897">123456897</label>
			</div>
		</div>
	);
};

export default FromNumberPopUp;
