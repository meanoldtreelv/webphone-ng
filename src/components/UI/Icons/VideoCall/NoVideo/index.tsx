import React from "react";

interface NoVideoIcon {
	isVideoCallActive: boolean;
	isVideoPause: boolean;
}

const NoVideoIcon: React.FC<NoVideoIcon> = ({ isVideoCallActive, isVideoPause }) => (
	<svg xmlns="http://www.w3.org/2000/svg" width="32" height="" viewBox="0 0 24 24" fill="none">
		<path
			d="M3.70718 21.7072L21.2072 4.20718L19.793 2.79297L16.3941 6.19186C15.8464 5.46782 14.9778 5 14 5H4C2.34315 5 1 6.34315 1 8V16C1 17.525 2.13788 18.7842 3.61094 18.975L2.29297 20.293L3.70718 21.7072Z"
			fill={isVideoCallActive ? (isVideoPause ? "#EE3939" : "#191C1F") : "#C8D3E0"}
		/>
		<path
			d="M8.41437 19L17.8486 9.56572L21.4453 7.16795C21.7522 6.96338 22.1467 6.94431 22.4719 7.11833C22.797 7.29235 23 7.63121 23 8V16C23 16.3688 22.797 16.7077 22.4719 16.8817C22.1467 17.0557 21.7522 17.0366 21.4453 16.8321L17 13.8685V16C17 17.6569 15.6569 19 14 19H8.41437Z"
			fill={isVideoCallActive ? (isVideoPause ? "#EE3939" : "#191C1F") : "#C8D3E0"}
		/>
	</svg>
);

export default NoVideoIcon;
