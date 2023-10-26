import React, { useState } from "react";
import styles from "./DeleteMeet.module.scss";
import Backdrop from "components/UI/Backdrop";
import InfoIcon from "components/UI/Icons/Info";
import { ClipLoader } from "react-spinners";

const DeleteMeet = () => {
	const [loading, setLoading] = useState(false);
	const [selectedOption, setSelectedOption] = useState("option1");

	const handleOptionChange = (e) => {
		setSelectedOption(e.target.value);
	};

	return (
		<div className={styles.overlay}>
			{<Backdrop />}
			<div className={styles.delete}>
				<div className={styles.delete_cont}>
					<span>
						<InfoIcon />
					</span>
					<div className={styles.delete_head}>Delete test Meet?</div>
					<div className={styles.delete_ques}>{"Please select one of the following options"}</div>
				</div>

				<div>
					<form>
						<label>
							<input
								type="radio"
								value="option1"
								checked={selectedOption === "option1"}
								onChange={handleOptionChange}
							/>
							This meet
						</label>
						<label>
							<input
								type="radio"
								value="option2"
								checked={selectedOption === "option2"}
								onChange={handleOptionChange}
							/>
							This and following meets
						</label>
						<label>
							<input
								type="radio"
								value="option3"
								checked={selectedOption === "option3"}
								onChange={handleOptionChange}
							/>
							All meets from sequence
						</label>
					</form>
				</div>

				<div className={styles.delete_btnCont}>
					<button
						className={styles.delete_cancelBtn}
						// onClick={() => dispatch(closeDeleteContact())}
					>
						<span>No</span>
					</button>
					<button className={styles.delete_deleteBtn}>
						{loading ? (
							<>
								<ClipLoader color="white" size={13} />
								<span style={{ marginLeft: "7px" }}>Deleting...</span>
							</>
						) : (
							<span>{"Yes"}</span>
						)}
					</button>
				</div>
			</div>
		</div>
	);
};

export default DeleteMeet;
