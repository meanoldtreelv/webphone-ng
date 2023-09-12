import React from "react";
import classes from "./filter.module.scss";

const Filter = () => {
	return (
		<section className={classes.editBox}>
			<div className={classes.edit}>
				<div className={`sub_headline_bold ${classes.edit_heading}`}>
					<span>Filters</span>
					<span className={` ${classes.edit_cross}`}>
						<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
							<g id="line / close" clip-path="url(#clip0_2236_1196)">
								<path
									id="Vector"
									d="M11.25 6.75L6.75 11.25M6.75 6.75L11.25 11.25M16.5 9C16.5 13.1421 13.1421 16.5 9 16.5C4.85786 16.5 1.5 13.1421 1.5 9C1.5 4.85786 4.85786 1.5 9 1.5C13.1421 1.5 16.5 4.85786 16.5 9Z"
									stroke="#6C7A8B"
									stroke-width="1.5"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
							</g>
							<defs>
								<clipPath id="clip0_2236_1196">
									<rect width="18" height="18" fill="white" />
								</clipPath>
							</defs>
						</svg>
					</span>
				</div>
				<div className={`body_bold ${classes.extension}`}>
				By Extensions
				</div>
				{/* <div className={classes.inputBox}>
					<label htmlFor="">Number:</label>
					<select name="" id="extension_number" className={classes.extension_number}>
						<option value="1001">1001</option>
						<option value="1002">1002</option>
						<option value="1003">1003</option>
					</select>
				</div>
				<div className={classes.inputBox}>
					<label htmlFor="">Name:</label>
					<input type="text" placeholder="anonymous" />
				</div>
				<div className={`body_bold ${classes.idInfo}`}>ID Info</div>
				<div className={classes.callerId}>
					<p className={`caption_1 ${classes.callerId_heading}`}>Caller ID</p>
					<p className={`body ${classes.callerId_number}`}>“Valentyn”&lt;12346900130&gt;</p>
				</div> */}
				<div className={classes.deleteSave}>
					{/* <div className={`footnote_bold ${classes.edit_delete}`}> */}
						{/* <span className={``}>Delete Extension</span> */}
						<span className={`footnote_bold ${classes.edit_save}`}>Apply Filter</span>
					{/* </div> */}
				</div>
				<div className={classes.filters}>
					<div className={classes.filter1}>
						<input type="radio" id="all" name="filter" value="all" />
    					<label htmlFor="all">All</label>
					</div>

					<div className={classes.filter1}>
						<input type="radio" id="80984" name="filter" value="80984" />
    					<label htmlFor="80984">80984</label>
					</div>

					<div className={classes.filter1}>
						<input type="radio" id="312" name="filter" value="312" />
    					<label htmlFor="312">312</label>
					</div>

					<div className={classes.filter1}>
						<input type="radio" id="783" name="filter" value="783" />
    					<label htmlFor="783">783</label>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Filter;
