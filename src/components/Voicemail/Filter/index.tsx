import XIcon from "components/UI/Icons/X";
import styles from "./Filter.module.scss";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { voicemailQueries } from "redux/voicemail/voicemailSelectors";
import { setNewFilter, setVoicemailQueries } from "redux/voicemail/voicemailSlice";

interface IFilter {
	onClose: (filter: boolean) => void;
}

interface IFilterObj {
	page: number;
	extension_source?: string;
}

const Filter: React.FC<IFilter> = ({ onClose }) => {
	const dispatch = useDispatch();
	const queries = useSelector(voicemailQueries);
	const [ext, setExt] = useState("");

	const handleExtensionFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
		setExt(event.target.value);
	};

	const applyFilters = () => {
		dispatch(setNewFilter(true));

		const filterObj: IFilterObj = {
			...queries,
			page: 1,
			extension_source: ext,
		}

		if (ext == "all") {
			delete filterObj.extension_source;
		}

		if (ext)
			dispatch(
				setVoicemailQueries(filterObj),
			);
	};

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

				<div className={styles.filters}>
					<div className={styles.filter1}>
						<input type="radio" id="all" name="filter" value="all" onChange={handleExtensionFilter} />
						<label htmlFor="all">All</label>
					</div>

					<div className={styles.filter1}>
						<input type="radio" id="80984" name="filter" value="80984" onChange={handleExtensionFilter} />
						<label htmlFor="80984">80984</label>
					</div>

					<div className={styles.filter1}>
						<input type="radio" id="1004" name="filter" value="1004" onChange={handleExtensionFilter} />
						<label htmlFor="1004">1004</label>
					</div>

					<div className={styles.filter1}>
						<input type="radio" id="783" name="filter" value="783" onChange={handleExtensionFilter} />
						<label htmlFor="783">783</label>
					</div>
				</div>

				<button className={styles.applyFilters} onClick={applyFilters}>
					Apply Filter
				</button>
			</div>
		</section>
	);
};

export default Filter;
