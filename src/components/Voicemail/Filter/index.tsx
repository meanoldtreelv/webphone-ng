import XIcon from "components/UI/Icons/X";
import styles from "./Filter.module.scss";
import React from "react";

interface IFilter {
	onClose: (filter: boolean) => void;
}

const Filter: React.FC<IFilter> = ({ onClose }) => {
	return (
		<section className={styles.editBox}>
			<div className={styles.edit}>
				<div className={styles.edit_heading}>
					<span>Filters</span>
					<button
						className={styles.edit_cross}
						onClick={() => {
							onClose(false);
						}}>
						<XIcon />
					</button>
				</div>
				<div className={styles.extension}>By Extensions</div>

				<div className={styles.deleteSave}>
					<span className={styles.edit_save}>Apply Filter</span>
				</div>
				<div className={styles.filters}>
					<div className={styles.filter1}>
						<input type="radio" id="all" name="filter" value="all" />
						<label htmlFor="all">All</label>
					</div>

					<div className={styles.filter1}>
						<input type="radio" id="80984" name="filter" value="80984" />
						<label htmlFor="80984">80984</label>
					</div>

					<div className={styles.filter1}>
						<input type="radio" id="312" name="filter" value="312" />
						<label htmlFor="312">312</label>
					</div>

					<div className={styles.filter1}>
						<input type="radio" id="783" name="filter" value="783" />
						<label htmlFor="783">783</label>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Filter;
