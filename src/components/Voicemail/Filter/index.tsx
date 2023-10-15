import XIcon from "components/UI/Icons/X";
import styles from "./Filter.module.scss";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { voicemailFilterExt, voicemailQueries } from "redux/voicemail/voicemailSelectors";
import { setFilterExt, setNewFilter, setVoicemailQueries } from "redux/voicemail/voicemailSlice";
import { IExtensionList } from "constants/interfaces";
import { ClipLoader } from "react-spinners";

interface IFilter {
	onClose: (filter: boolean) => void;
	extensionList: IExtensionList[];
	filterAnim: boolean;
}

interface IFilterObj {
	page: number;
	extension_source?: string;
}

const Filter: React.FC<IFilter> = ({ onClose, extensionList, filterAnim }) => {
	const dispatch = useDispatch();
	const queries = useSelector(voicemailQueries);
	const ext = useSelector(voicemailFilterExt);
	const [prev, setPrev] = useState('');

	const handleExtensionFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (ext) {
			setPrev(ext);
		}

		dispatch(setFilterExt(event.target.value));
	};

	const applyFilters = () => {
		dispatch(setNewFilter(true));

		const filterObj: IFilterObj = {
			...queries,
			page: 1,
			extension_source: ext,
		};

		if (ext === "" && prev) {
			delete filterObj.extension_source;
			dispatch(setVoicemailQueries(filterObj));
			dispatch(setFilterExt(""));
			setPrev('')
		}

		if (ext) dispatch(setVoicemailQueries(filterObj));
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
						<input
							type="radio"
							id="all"
							name="filter"
							value=""
							onChange={handleExtensionFilter}
							checked={!ext}
						/>
						<label htmlFor="all">All</label>
					</div>
					{extensionList?.map((extension) => (
						<div className={styles.filter1}>
							<input
								type="radio"
								id={`${extension.data.extension}`}
								name="filter"
								value={extension.data.extension}
								onChange={handleExtensionFilter}
								checked={ext === String(extension.data.extension)}
							/>
							<label htmlFor={`${extension.data.extension}`}>{extension.data.extension}</label>
						</div>
					))}
				</div>

				<button className={styles.applyFilters} onClick={applyFilters}>
					{filterAnim ? (
						<div>
							<ClipLoader color="white" size={14} />
							<span>Applying Filters...</span>
						</div>
					) : (
						<span>Apply Filter</span>
					)}
				</button>
			</div>
		</section>
	);
};

export default Filter;
