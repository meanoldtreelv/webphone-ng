import React from "react";
import { IButton } from "constants/interfaces";
import style from "./Button.module.scss";

const Button: React.FC<IButton> = ({ children, fill, border, icon, onClick, styles }) => {
	const fill_class = fill && style.buttonFill;
    const border_class = border && style.buttonBorder;

	return (
		<button className={[style.button, fill_class, border_class].join(' ')} onClick={onClick} style={{...styles}}>
			{icon}{children}
		</button>
	);
};

export default Button;
