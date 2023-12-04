import styles from "./Button.module.scss";
import { MouseEvent, ReactNode } from "react";

interface ButtonProps {
	type?: "button" | "submit" | "reset";
	btnText?: string;
	icon?: ReactNode;
	onClick?: (event: MouseEvent<HTMLElement>) => void;
	restProps?: any;
}

function Button({ type, btnText, icon, onClick, ...restProps }: ButtonProps) {
	return (
		<>
			<button className={styles.button} onClick={onClick} type={type} {...restProps}>
				<span>{icon}</span>
				<span>{btnText}</span>
			</button>
		</>
	);
}

export default Button;
