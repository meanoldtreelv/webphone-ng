import React, { useEffect, useState } from "react";
// for the time being it should be stored inside of the constants directory
import { IInput } from "constants/interfaces";
import ErrorMessage from "../../ErrorMessage";
import styles from "./Input.module.scss";
import EyeOpenIcon from "components/UI/Icons/Eye/EyeOpen";
import EyeClosedIcon from "components/UI/Icons/Eye/EyeClosed";

const Input: React.FC<IInput> = ({
	type = "text",
	placeholder,
	required,
	onChange,
	icon,
	errorMsg,
	value,
	disabled,
	underlined,
	label,
}) => {
	const [pwdType, setPwdType] = useState(type === "password" ? true : false);
	const [typeM, setTypeM] = useState(type);

	const handleTypeChange = () => {
		setTypeM(typeM === "text" ? "password" : "text");
	};

	return (
		<div className={`caption_1 ${styles.inputBox} ${underlined && styles.underlinedInput}`}>
			{label && <label>{label}</label>}

			<input
				type={typeM}
				placeholder={placeholder}
				onChange={onChange}
				required={required}
				value={value}
				disabled={disabled}
			/>
			{errorMsg ? <ErrorMessage msg={errorMsg} /> : null}
			{icon}
			{pwdType ? (
				<button className={styles.btnEye} onClick={handleTypeChange}>
					{typeM === "password" ? <EyeOpenIcon /> : <EyeClosedIcon />}
				</button>
			) : null}
		</div>
	);
};

export default Input;
