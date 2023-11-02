import React from "react";
import styles from "./Select.module.scss";
interface item {
	value?: string;
	name?: string;
	selected?: boolean;
}
const Select = ({
	icon,
	options,
	onChange = undefined,
	defaultValue,
}: {
	icon: any;
	options: item[];
	onChange: React.ChangeEventHandler<HTMLSelectElement> | undefined;
	defaultValue: string;
}) => {
	// console.log(options)
	return (
		<div className={`${styles.optionBox}`}>
			<select
				className={`caption_1`}
				onChange={(e) => {
					onChange && onChange(e);
				}}
				defaultValue={defaultValue}>
				{options?.map((item: item) => (
					<option value={item.value} key={item.name}>
						{item.name}
					</option>
				))}
			</select>
			<span>{icon}</span>
		</div>
	);
};

export default Select;
