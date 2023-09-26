import React from "react";
import styles from "./Advanced.module.scss";
import FileIcon from "components/UI/Icons/File";
import OnOffSwitch from "components/UI/OnOffSwitch";
import FolderIcon from "components/UI/Icons/Folder";
import Input from "components/UI/Forms/Input";

const Advanced = () => {
	return (
		<section className={styles.ui}>
			<h2 className={`body_bold ${styles.heading}`}>Logs</h2>
			<div className={styles.downloadFolder}>
				<p className={`caption_1 ${styles.headingDescription}`}>Logs Folder</p>
				<div>
					<span className={styles.fileIcon}>
						<FolderIcon />
					</span>
				</div>
			</div>

			<div className={styles.downloadFolder}>
				<p className={`caption_1 ${styles.headingDescription}`}>Server URL for sending logs</p>
				<div></div>
			</div>

			<div className={`caption_1 ${styles.toggleBox}`}>
				<p>
					<OnOffSwitch />
					<span>Enable Logs</span>
				</p>
			</div>

			<h2 className={`body_bold ${styles.heading}`}>Crash Reports</h2>
			<div className={`caption_1 ${styles.toggleBox}`}>
				<p>
					<OnOffSwitch />
					<span>Send Screenshots</span>
				</p>
				<p>
					<OnOffSwitch />
					<span>Send Logs</span>
				</p>
			</div>
		</section>
	);
};

export default Advanced;
