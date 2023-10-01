import { emptyFunction } from "../../../utils";
import classes from "./OnOffSwitch.module.scss";

interface SwitchProps {
	type?: any;
	restProps?: any;
	onClick?: () => void;
	onChange?: () => void;
	name?: string;
}

function OnOffSwitch({
	onClick = emptyFunction,
	onChange = emptyFunction,
	type = "checkbox",
	name = "",
	...restProps
}: SwitchProps) {
	return (
		<label className={classes.switch}>
			<input onClick={onClick} onChange={onChange} type={type} {...restProps} />
			<span className={`${classes.slider} ${classes.round}`}></span>
		</label>
	);
}

export default OnOffSwitch;
