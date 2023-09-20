import styles from './Envelope.module.scss';

const EnvelopeIcon = () => (
	<svg className={styles.Icon} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
		<g id="line / mail">
			<path
				id="Vector"
				d="M14.6666 4.66675L8.68665 8.46675C8.48083 8.5957 8.24286 8.66409 7.99998 8.66409C7.7571 8.66409 7.51913 8.5957 7.31331 8.46675L1.33331 4.66675M2.66665 2.66675H13.3333C14.0697 2.66675 14.6666 3.2637 14.6666 4.00008V12.0001C14.6666 12.7365 14.0697 13.3334 13.3333 13.3334H2.66665C1.93027 13.3334 1.33331 12.7365 1.33331 12.0001V4.00008C1.33331 3.2637 1.93027 2.66675 2.66665 2.66675Z"
				stroke="#9298A0"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</g>
	</svg>
);

export default EnvelopeIcon;
