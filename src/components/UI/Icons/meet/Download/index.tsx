import React from "react";

const DownloadIcon = ({ color }: { color: string }) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill={`var(--${color})`}>
			<path d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z" />
		</svg>
	);
};

export default DownloadIcon;
