import { useState } from "react";
import styles from "./FromNumberPopUp.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { fromContactLists, fromNumberSelected } from "redux/chat/chatSelectors";
import { setFromNumberSelected } from "redux/chat/chatSlice";

const FromNumberPopUp = () => {
	const dispatch = useDispatch();
	const fromContactList = useSelector(fromContactLists);
	const selectedNumber = useSelector(fromNumberSelected);
	// const [selectedNumber, setSelectedNumber] = useState("");

	return (
		<div className={styles.sortingBox}>
			<div className={styles.sorting}>Your Numbers</div>
			{fromContactList?.map((item) => (
				<div
					key={item?.id}
					className={styles.radioBox}
					onClick={() => {
						// setSelectedNumber(item?.number);
						dispatch(setFromNumberSelected(item?.number));
					}}>
					<input type="radio" name="sorting" id={item?.number} checked={selectedNumber === item?.number} />
					<label htmlFor={item?.number}>{item?.number}</label>
				</div>
			))}

			{/* <div
				className={styles.radioBox}
				onClick={() => {
					setSortType("123456897");
				}}>
				<input type="radio" name="sorting" id="123456897" checked={sortType === "123456897"} />
				<label htmlFor="123456897">123456897</label>
			</div> */}
		</div>
	);
};

export default FromNumberPopUp;
