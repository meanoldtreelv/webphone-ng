import { useState } from "react";
import styles from "./Notes.module.scss";
import ChevronRightIcon from "components/UI/Icons/Navigation/ChevronRight";
import ChevronLeftIcon from "components/UI/Icons/Navigation/ChevronLeft";
import { Link } from "react-router-dom";
import EditIcon from "components/UI/Icons/ClioIcon/Edit";
import AddNote from "../AddNote";
import { useDispatch, useSelector } from "react-redux";
import { isAddNoteOpen } from "redux/clio/clioSelectors";
import { setIsAddNoteOpen } from "redux/clio/clioSlice";
import PlusIcon from "components/UI/Icons/Sidecar/Plus";
// import PlusIcon from "components/UI/Icons/Plus";

const Notes = () => {
	const [notesDetails, setNotesDetails] = useState(false);
	// const [isAddNoteOpen, setIsAddNoteOpen] = useState(false);
	const dispatch = useDispatch();
	const isAddNoteOpens = useSelector(isAddNoteOpen);

	return (
		<div className={styles.wrapper}>
			{!notesDetails && !isAddNoteOpens && (
				<>
					<div
						className={styles.matter}
						onClick={() => {
							setNotesDetails(true);
						}}>
						<div>
							<h4>000 1234 Note 1</h4>
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
							setNotesDetails(true);
						}}>
						<div>
							<h4>000 1234 Note 1</h4>
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
							setNotesDetails(true);
						}}>
						<div>
							<h4>000 1234 Note 1</h4>
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
							setNotesDetails(true);
						}}>
						<div>
							<h4>000 1234 Note 1</h4>
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
							setNotesDetails(true);
						}}>
						<div>
							<h4>000 1234 Note 1</h4>
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
							setNotesDetails(true);
						}}>
						<div>
							<h4>000 1234 Note 1</h4>
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
							setNotesDetails(true);
						}}>
						<div>
							<h4>000 1234 Note 1</h4>
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
							setNotesDetails(true);
						}}>
						<div>
							<h4>000 1234 Note 1</h4>
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
							setNotesDetails(true);
						}}>
						<div>
							<h4>000 1234 Note 1</h4>
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
							setNotesDetails(true);
						}}>
						<div>
							<h4>000 1234 Note 1</h4>
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
								dispatch(setIsAddNoteOpen(true));
							}}>
							<PlusIcon />
							<span>Note</span>
						</button>
					</div>
				</>
			)}

			{isAddNoteOpens && <AddNote />}

			{notesDetails && (
				<div className={styles.matter_details}>
					<div className={styles.matter_name}>
						<div className={styles.left}>
							<span
								className={styles.chevron}
								onClick={() => {
									setNotesDetails(false);
								}}>
								<ChevronLeftIcon />
							</span>

							<span className={styles.name}>000 1234 Note 1</span>
						</div>
						<Link to={"/"} className={styles.seeDetails}>
							<EditIcon />
							{/* <span>See Details</span> */}
						</Link>
					</div>
					<div className={styles.box}>
						<div className={styles.heading}>
							<span>Notes Details</span>
						</div>
						<div className={styles.contact_details}>
							<div>
								<label htmlFor="">Subject</label>
								<p>Subject</p>
							</div>
							<div>
								<label htmlFor="">Note</label>
								<p>
									Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde provident sint vero, consectetur soluta
									in veniam earum
								</p>
							</div>
							<div>
								<label htmlFor="">Matter</label>
								<p>Jenna wojcek</p>
							</div>
							<div>
								<label htmlFor="">Date</label>
								<p>2022-05-26</p>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Notes;
