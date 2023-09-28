import styles from "./Signal.module.scss";

const Signal = () => {
	return (
		<div className={styles.signal}>
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
				<circle cx="12" cy="12" r="2" fill="white" />
				<circle cx="12" cy="12" r="4" stroke="white" strokeWidth="1.5" />
				<circle cx="12" cy="12" r="7" stroke="white" strokeWidth="1.5" />
			</svg>
			<span>Strong</span>
		</div>
	);
};

export default Signal;
