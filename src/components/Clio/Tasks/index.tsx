import { useState } from "react";
import styles from "./Tasks.module.scss";
import ChevronRightIcon from "components/UI/Icons/Navigation/ChevronRight";
import ChevronLeftIcon from "components/UI/Icons/Navigation/ChevronLeft";
import { Link } from "react-router-dom";
import EditIcon from "components/UI/Icons/ClioIcon/Edit";

import { useDispatch, useSelector } from "react-redux";
import { isAddTaskOpen } from "redux/clio/clioSelectors";
import { setIsAddTaskOpen } from "redux/clio/clioSlice";
import AddTask from "../AddTask";
import PlusIcon from "components/UI/Icons/Sidecar/Plus";

const Tasks = () => {
	const [tasksDetails, setTasksDetails] = useState(false);
	// const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
	const dispatch = useDispatch();
	const isAddTaskOpens = useSelector(isAddTaskOpen);

	return (
		<div className={styles.wrapper}>
			{!tasksDetails && !isAddTaskOpens && (
				<>
					<div
						className={styles.matter}
						onClick={() => {
							setTasksDetails(true);
						}}>
						<div>
							<h4>000 1234 Task 1</h4>
							<p>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque laborum cupiditate velit repellat sequi
								repellendus aliquid saepe eaque dolorem.
							</p>
						</div>
						<span className={styles.arrow_right}>
							<ChevronRightIcon />
						</span>
					</div>
					<div
						className={styles.matter}
						onClick={() => {
							setTasksDetails(true);
						}}>
						<div>
							<h4>000 1234 Task 1</h4>
							<p>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque laborum cupiditate velit repellat sequi
								repellendus aliquid saepe eaque dolorem.
							</p>
						</div>
						<span className={styles.arrow_right}>
							<ChevronRightIcon />
						</span>
					</div>
					<div
						className={styles.matter}
						onClick={() => {
							setTasksDetails(true);
						}}>
						<div>
							<h4>000 1234 Task 1</h4>
							<p>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque laborum cupiditate velit repellat sequi
								repellendus aliquid saepe eaque dolorem.
							</p>
						</div>
						<span className={styles.arrow_right}>
							<ChevronRightIcon />
						</span>
					</div>
					<div
						className={styles.matter}
						onClick={() => {
							setTasksDetails(true);
						}}>
						<div>
							<h4>000 1234 Task 1</h4>
							<p>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque laborum cupiditate velit repellat sequi
								repellendus aliquid saepe eaque dolorem.
							</p>
						</div>
						<span className={styles.arrow_right}>
							<ChevronRightIcon />
						</span>
					</div>
					<div
						className={styles.matter}
						onClick={() => {
							setTasksDetails(true);
						}}>
						<div>
							<h4>000 1234 Task 1</h4>
							<p>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque laborum cupiditate velit repellat sequi
								repellendus aliquid saepe eaque dolorem.
							</p>
						</div>
						<span className={styles.arrow_right}>
							<ChevronRightIcon />
						</span>
					</div>
					<div
						className={styles.matter}
						onClick={() => {
							setTasksDetails(true);
						}}>
						<div>
							<h4>000 1234 Task 1</h4>
							<p>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque laborum cupiditate velit repellat sequi
								repellendus aliquid saepe eaque dolorem.
							</p>
						</div>
						<span className={styles.arrow_right}>
							<ChevronRightIcon />
						</span>
					</div>
					<div
						className={styles.matter}
						onClick={() => {
							setTasksDetails(true);
						}}>
						<div>
							<h4>000 1234 Task 1</h4>
							<p>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque laborum cupiditate velit repellat sequi
								repellendus aliquid saepe eaque dolorem.
							</p>
						</div>
						<span className={styles.arrow_right}>
							<ChevronRightIcon />
						</span>
					</div>
					<div
						className={styles.matter}
						onClick={() => {
							setTasksDetails(true);
						}}>
						<div>
							<h4>000 1234 Task 1</h4>
							<p>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque laborum cupiditate velit repellat sequi
								repellendus aliquid saepe eaque dolorem.
							</p>
						</div>
						<span className={styles.arrow_right}>
							<ChevronRightIcon />
						</span>
					</div>
					<div
						className={styles.matter}
						onClick={() => {
							setTasksDetails(true);
						}}>
						<div>
							<h4>000 1234 Task 1</h4>
							<p>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque laborum cupiditate velit repellat sequi
								repellendus aliquid saepe eaque dolorem.
							</p>
						</div>
						<span className={styles.arrow_right}>
							<ChevronRightIcon />
						</span>
					</div>
					<div
						className={styles.matter}
						onClick={() => {
							setTasksDetails(true);
						}}>
						<div>
							<h4>000 1234 Task 1</h4>
							<p>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque laborum cupiditate velit repellat sequi
								repellendus aliquid saepe eaque dolorem.
							</p>
						</div>
						<span className={styles.arrow_right}>
							<ChevronRightIcon />
						</span>
					</div>
					<div
						className={styles.matter}
						onClick={() => {
							setTasksDetails(true);
						}}>
						<div>
							<h4>000 1234 Task 1</h4>
							<p>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque laborum cupiditate velit repellat sequi
								repellendus aliquid saepe eaque dolorem.
							</p>
						</div>
						<span className={styles.arrow_right}>
							<ChevronRightIcon />
						</span>
					</div>
					<div
						className={styles.matter}
						onClick={() => {
							setTasksDetails(true);
						}}>
						<div>
							<h4>000 1234 Task 1</h4>
							<p>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque laborum cupiditate velit repellat sequi
								repellendus aliquid saepe eaque dolorem.
							</p>
						</div>
						<span className={styles.arrow_right}>
							<ChevronRightIcon />
						</span>
					</div>
					<div
						className={styles.matter}
						onClick={() => {
							setTasksDetails(true);
						}}>
						<div>
							<h4>000 1234 Task 1</h4>
							<p>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque laborum cupiditate velit repellat sequi
								repellendus aliquid saepe eaque dolorem.
							</p>
						</div>
						<span className={styles.arrow_right}>
							<ChevronRightIcon />
						</span>
					</div>
					<div
						className={styles.matter}
						onClick={() => {
							setTasksDetails(true);
						}}>
						<div>
							<h4>000 1234 Task 1</h4>
							<p>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque laborum cupiditate velit repellat sequi
								repellendus aliquid saepe eaque dolorem. end
							</p>
						</div>
						<span className={styles.arrow_right}>
							<ChevronRightIcon />
						</span>
					</div>
					<div className={styles.button}>
						<button
							onClick={() => {
								dispatch(setIsAddTaskOpen(true));
							}}>
							<PlusIcon /> <span>Task</span>
						</button>
					</div>
				</>
			)}

			{isAddTaskOpens && <AddTask />}

			{tasksDetails && (
				<div className={styles.matter_details}>
					<div className={styles.matter_name}>
						<div className={styles.left}>
							<span
								className={styles.chevron}
								onClick={() => {
									setTasksDetails(false);
								}}>
								<ChevronLeftIcon />
							</span>

							<span className={styles.name}>000 1234 Task 1</span>
						</div>
						<Link to={"/"} className={styles.seeDetails}>
							<EditIcon />
							{/* <span>See Details</span> */}
						</Link>
					</div>
					<div className={styles.box}>
						<div className={styles.heading}>
							<span>Tasks Details</span>
						</div>
						<div className={styles.contact_details}>
							<div>
								<label htmlFor="">Name</label>
								<p>Name</p>
							</div>
							<div>
								<label htmlFor="">Priority</label>
								<p>Normal</p>
							</div>
							<div>
								<label htmlFor="">Description</label>
								<p>
									Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid exercitationem, veniam beatae fuga
									provident ipsam, doloremque molestias commodi similique corrupti, accusamus eaque sequi nobis officia
									consectetur voluptas debitis quia officiis.
								</p>
							</div>
							<div>
								<label htmlFor="">Assign to</label>
								<p>Shivam</p>
							</div>
							<div>
								<label htmlFor="">Matter</label>
								<p>Matter</p>
							</div>
							<div>
								<label htmlFor="">Due Date</label>
								<p>2023-06-13</p>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Tasks;
