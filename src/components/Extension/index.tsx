import styles from "./editExtension.module.scss";

const EditExtension = () => {
	return (
		<section className={styles.editBox}>
			<div className={styles.edit}>
				<div className={`sub_headline_bold ${styles.edit_heading}`}>
					<span>Edit Extension</span>
					<span className={` ${styles.edit_cross}`}>
						<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
							<g id="line / close" clipPath="url(#clip0_2236_1196)">
								<path
									id="Vector"
									d="M11.25 6.75L6.75 11.25M6.75 6.75L11.25 11.25M16.5 9C16.5 13.1421 13.1421 16.5 9 16.5C4.85786 16.5 1.5 13.1421 1.5 9C1.5 4.85786 4.85786 1.5 9 1.5C13.1421 1.5 16.5 4.85786 16.5 9Z"
									stroke="#6C7A8B"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
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
				<div className={`body_bold ${styles.extension}`}>
					Extension <span>682971</span>
				</div>
				<div className={styles.inputBox}>
					<label htmlFor="">Number:</label>
					<select name="" id="extension_number" className={styles.extension_number}>
						<option value="1001">1001</option>
						<option value="1002">1002</option>
						<option value="1003">1003</option>
					</select>
				</div>
				<div className={styles.inputBox}>
					<label htmlFor="">Name:</label>
					<input type="text" placeholder="anonymous" />
				</div>
				<div className={`body_bold ${styles.idInfo}`}>ID Info</div>
				<div className={styles.callerId}>
					<p className={`caption_1 ${styles.callerId_heading}`}>Caller ID</p>
					<p className={`body ${styles.callerId_number}`}>“Valentyn”&lt;12346900130&gt;</p>
				</div>
				<div className={styles.deleteSave}>
					<div className={`footnote_bold ${styles.edit_delete}`}>
						<span className={``}>Delete Extension</span>
						<span className={styles.edit_save}>Save</span>
					</div>
				</div>
			</div>
		</section>
	);
};

export default EditExtension;
