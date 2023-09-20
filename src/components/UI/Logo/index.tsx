import React from "react";
import { ILogo } from "constants/interfaces";

import mainLogoImg from "./../../../assets/images/core/logo-ringplan.svg";
import riLogoImg from "./../../../assets/images/core/logo-ri.svg";
import riVoiceLogoImg from "./../../../assets/images/core/logo-ri-voice.svg";
import riFillLogoImg from "./../../../assets/images/core/logo-ri-fill.svg";

const Logo: React.FC<ILogo> = ({ type }) => {
	switch (type) {
		case "ri":
			return <img src={riLogoImg} alt="" />;
		case "ri-voice":
			return <img src={riVoiceLogoImg} alt="" />;
		case "ri-fill":
			return <img src={riFillLogoImg} alt="" />;
		default:
			return <img src={mainLogoImg} alt="" />;
	}
};

export default Logo;
