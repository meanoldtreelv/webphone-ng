import React from "react";
// for the time being it should be stored inside of the constants directory
import { IInput } from "constants/interfaces";
import ErrorMessage from "../../ErrorMessage";
import styles from "./Input.module.scss";

const Input: React.FC<IInput> = ({ type = "text", placeholder, required, onChange, icon, errorMsg, value, disabled, underlined, label }) => (
	<div className={`caption_1 ${styles.inputBox} ${underlined && styles.underlinedInput}`}>
		{label && <label>{label}</label>}
		
		<input type={type} placeholder={placeholder} onChange={onChange} required={required} value={value} disabled={disabled} />
		{errorMsg ? <ErrorMessage msg={errorMsg} /> : null}
		{icon}
	</div>
);

export default Input;
