import { useState } from "react";
import styles from "./More.module.scss";
import ChevronRightIcon from "components/UI/Icons/Navigation/ChevronRight";
import ChevronLeftIcon from "components/UI/Icons/Navigation/ChevronLeft";
import { Link } from "react-router-dom";
import EditIcon from "components/UI/Icons/ClioIcon/Edit";
import { useDispatch, useSelector } from "react-redux";
import { isNewExpenseOpen, isNewTimeEntryOpen } from "redux/clio/clioSelectors";
import NewExpense from "../NewExpense";
import { setIsNewExpenseOpen, setIsNewTimeEntryOpen } from "redux/clio/clioSlice";
import NewTimeEntry from "../NewTimeEntry";

const More = () => {
	const dispatch = useDispatch();
	const newTimeEntry = useSelector(isNewTimeEntryOpen);
	const newExpenseEntry = useSelector(isNewExpenseOpen);
	return (
		<div className={styles.wrapper}>
			{!newTimeEntry && !newExpenseEntry && (
				<>
					<div className={styles.heading}>Follow-Ups</div>
					<div className={styles.description}>
						To create a New Expense, Please go to the{" "}
						<span
							onClick={() => {
								dispatch(setIsNewExpenseOpen(true));
							}}>
							New Expense page
						</span>
					</div>
					<div className={styles.description}>
						To create New Time Entry, Please go to the{" "}
						<span
							onClick={() => {
								dispatch(setIsNewTimeEntryOpen(true));
							}}>
							New Time Entry page
						</span>
					</div>
					<div className={styles.description}>
						To schedule a follow-up Event, Please go to the <Link to={"/"}>Calendar page</Link> (Calendar &gt; New
						Event)
					</div>
				</>
			)}

			{newTimeEntry && <NewTimeEntry />}
			{newExpenseEntry && <NewExpense />}
		</div>
	);
};

export default More;
