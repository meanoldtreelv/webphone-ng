const InfoIcon = ({ isLatestVersion }: { isLatestVersion: boolean }) => (
	<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
		<g id="fill / info">
			<path
				id="Vector"
				fillRule="evenodd"
				clipRule="evenodd"
				d="M8 1.5C4.41 1.5 1.5 4.41 1.5 8C1.5 11.59 4.41 14.5 8 14.5C11.59 14.5 14.5 11.59 14.5 8C14.5 4.41 11.59 1.5 8 1.5ZM8.66667 5.33333C8.66667 5.70152 8.36819 6 8 6C7.63181 6 7.33333 5.70152 7.33333 5.33333C7.33333 4.96514 7.63181 4.66667 8 4.66667C8.36819 4.66667 8.66667 4.96514 8.66667 5.33333ZM7.33333 8C7.33333 7.63181 7.63181 7.33333 8 7.33333C8.36819 7.33333 8.66667 7.63181 8.66667 8V10.6667C8.66667 11.0349 8.36819 11.3333 8 11.3333C7.63181 11.3333 7.33333 11.0349 7.33333 10.6667V8Z"
				fill={isLatestVersion ? "#75C322" : "#F5C400"}
			/>
		</g>
	</svg>
);

export default InfoIcon;
