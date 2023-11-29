import React from "react";

const AttachmentIcon = ({ color }: { color: string }) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
			<path
				d="M15.49 8.34689L9.17186 14.665C8.39784 15.439 7.34805 15.8739 6.25342 15.8739C5.1588 15.8739 4.109 15.439 3.33499 14.665C2.56097 13.891 2.12613 12.8412 2.12613 11.7466C2.12613 10.652 2.56097 9.60216 3.33499 8.82814L9.22686 2.93627C9.74287 2.41934 10.4431 2.12858 11.1735 2.12793C11.9039 2.12729 12.6046 2.41682 13.1215 2.93283C13.6385 3.44884 13.9292 4.14906 13.9299 4.87946C13.9305 5.60986 13.641 6.31059 13.125 6.82752L7.21936 12.7194C6.96135 12.9774 6.61142 13.1223 6.24655 13.1223C5.88167 13.1223 5.53174 12.9774 5.27374 12.7194C5.01573 12.4614 4.87078 12.1115 4.87078 11.7466C4.87078 11.3817 5.01573 11.0318 5.27374 10.7738L11.1106 4.94377"
				stroke={`var(--${color})`}
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	);
};

export default AttachmentIcon;
