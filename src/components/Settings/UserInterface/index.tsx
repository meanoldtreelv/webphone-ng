import React, { useEffect, useState } from "react";
import styles from "./UserInterface.module.scss";
import FileIcon from "components/UI/Icons/File";
import OnOffSwitch from "components/UI/OnOffSwitch";
import FolderIcon from "components/UI/Icons/Folder";
import Input from "components/UI/Forms/Input";
import useDarkMode from "use-dark-mode";

const UserInterface = () => {
	const darkMode = useDarkMode(false);
	const [systemDarkMode, setSystemDarkMode] = useState(false);

	const handleDarkMode = () => {
		if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
			if (darkMode.value) {
				darkMode.toggle();
				setSystemDarkMode(false);
			} else {
				darkMode.toggle();
				setSystemDarkMode(true);
			}
		} else {
			if (!darkMode.value) {
				darkMode.toggle();
				setSystemDarkMode(true);
			} else {
				darkMode.toggle();
				setSystemDarkMode(false);
			}
		}
	};

	return (
		<section className={styles.ui}>
			{/* <h2 className={`body_bold ${styles.heading}`}>Paths</h2> */}
			{/* <div className={styles.downloadFolder}>
				<p className={`caption_1 ${styles.headingDescription}`}>Downloads Folder</p>
				<div>
					<span className={styles.fileIcon}>
						<FolderIcon />
					</span>
				</div>
			</div> */}
			{/* <h2 className={`body_bold ${styles.heading}`}>Other</h2>
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
			</div> */}
			<h2 className={`body_bold ${styles.heading}`}>Dark Mode</h2>
			<div className={`caption_1 ${styles.toggleBox}`}>
				<p>
					<OnOffSwitch onChange={handleDarkMode} checked={systemDarkMode} />
					<span>Sync with OS setting</span>
				</p>
				<p>
					<OnOffSwitch onChange={darkMode.toggle} checked={darkMode.value} />
					<span>Use Dark Mode</span>
				</p>
				<p>
					<span>
						<OnOffSwitch onChange={handleDarkMode} checked={systemDarkMode} />
						<span>Auto Dark Mode</span>
					</span>
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
				{/* <p>
					<span>Open as</span>
				</p>
				<p>
					<OnOffSwitch />
					<span>Always on Top</span>
				</p>
				<p>
					<OnOffSwitch />
					<span>Save position</span>
				</p> */}
			</div>
			{/* <h2 className={`body_bold ${styles.heading}`}>OCR</h2>
			<div className={`caption_1 ${styles.toggleBox}`}>
				<p>
					<OnOffSwitch />
					<span>Enable OCR</span>
				</p>
			</div> */}
		</section>
	);
};

export default UserInterface;
