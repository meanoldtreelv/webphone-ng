import styles from "./FromNumberPopUp.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { fromContactLists, fromNumberSelected } from "redux/chat/chatSelectors";
import { setFromNumberSelected } from "redux/chat/chatSlice";

const FromNumberPopUp = () => {
	const dispatch = useDispatch();
	const fromContactList = useSelector(fromContactLists);
	const selectedNumber = useSelector(fromNumberSelected);

	return (
		<div className={styles.sortingBox}>
			<div className={styles.sorting}>Your Numbers</div>
			{fromContactList?.map((item) => (
				<div
					key={item?.id}
					className={styles.radioBox}
					onClick={() => {
						dispatch(setFromNumberSelected(item?.number));
					}}>
					<input type="radio" name="sorting" id={item?.number} checked={selectedNumber === item?.number} />
					<label htmlFor={item?.number}>{item?.number}</label>
				</div>
			))}
		</div>
	);
};

export default FromNumberPopUp;
