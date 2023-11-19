import { useState } from "react";
import styles from "./More.module.scss";
import ChevronRightIcon from "components/UI/Icons/Navigation/ChevronRight";
import ChevronLeftIcon from "components/UI/Icons/Navigation/ChevronLeft";
import { Link } from "react-router-dom";
import EditIcon from "components/UI/Icons/ClioIcon/Edit";
import { useDispatch, useSelector } from "react-redux";
import { isNewExpenseOpen } from "redux/clio/clioSelectors";
import NewExpense from "../NewExpense";
import { setIsNewExpenseOpen } from "redux/clio/clioSlice";

const More = () => {
	const dispatch = useDispatch();
	const newExpense = useSelector(isNewExpenseOpen);
	return (
		<div className={styles.wrapper}>
			{!newExpense && (
				<>
					<div className={styles.heading}>Follow-Ups</div>
					<div className={styles.description}>
						To schedule a follow-up New Expense, Please go to the{" "}
						<span
							onClick={() => {
								dispatch(setIsNewExpenseOpen(true));
							}}>
							New Expense page
						</span>
					</div>
					<div className={styles.description}>
						To schedule a follow-up Event, Please go to the <Link to={"/"}>Calendar page</Link> (Calendar &gt; New
						Event)
					</div>
				</>
			)}

			{newExpense && <NewExpense />}
		</div>
	);
};

export default More;
