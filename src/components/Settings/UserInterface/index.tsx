import React from "react";
import styles from "./UserInterface.module.scss";
import FileIcon from "components/UI/Icons/File";
import OnOffSwitch from "components/UI/OnOffSwitch";
import FolderIcon from "components/UI/Icons/Folder";

const UserInterface = () => {
	return (
		<section className={styles.ui}>
			<h2 className={`body_bold ${styles.heading}`}>Paths</h2>
			<div className={styles.downloadFolder}>
				<p className={`caption_1 ${styles.headingDescription}`}>Downloads Folder</p>
				<div>
					<span className={styles.fileIcon}>
						<FolderIcon />
					</span>
				</div>
			</div>
			<h2 className={`body_bold ${styles.heading}`}>Other</h2>
			<div className={`caption_1 ${styles.toggleBox}`}>
				<p>
					<OnOffSwitch />
					<span>Close the program when the window is closed</span>
				</p>
				<p>
					<OnOffSwitch />
					<span>Autorun of the program at system startup</span>
				</p>
				<p>
					<OnOffSwitch />
					<span>Make RingPlan Voice default app for calls</span>
				</p>
			</div>
			<h2 className={`body_bold ${styles.heading}`}>Dark Mode</h2>
			<div className={`caption_1 ${styles.toggleBox}`}>
				<p>
					<OnOffSwitch />
					<span>Sync with OS setting</span>
				</p>
				<p>
					<OnOffSwitch />
					<span>Use Dark Mode</span>
				</p>
				<p>
					<OnOffSwitch />
					<span>Auto Dark Mode</span>
				</p>
			</div>
			<h2 className={`body_bold ${styles.heading}`}>
				Sidecar <span className={`footnote`}>Beta</span>
			</h2>
			<div className={`caption_1 ${styles.toggleBox}`}>
				<p>
					<OnOffSwitch />
					<span>Enable Sidecar</span>
				</p>
				<p>
					<span>Sidecar view</span>
				</p>
				<p>
					<span>Open as</span>
				</p>
				<p>
					<OnOffSwitch />
					<span>Always on Top</span>
				</p>
				<p>
					<OnOffSwitch />
					<span>Save position</span>
				</p>
			</div>
		</section>
	);
};

export default UserInterface;
