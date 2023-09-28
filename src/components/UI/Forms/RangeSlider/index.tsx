import React, { useState, useEffect } from "react";
import styles from "./RangeSlider.module.scss";

const RangeSlider = () => {
	const [sliderValue, setSliderValue] = useState(0);

	useEffect(() => {
		const sliderEl = document.querySelector("#range2");

		const handleInput = (event) => {
			const tempSliderValue = event.target.value;
			setSliderValue(tempSliderValue);

			const progress = (tempSliderValue / sliderEl.max) * 100;

			sliderEl.style.background = `linear-gradient(to right, var(--primary-default, #0c6dc7) ${progress}%,  var(--background-emphasis, #e3eaf2) ${progress}%)`;
		};

		if (sliderEl) {
			sliderEl.addEventListener("input", handleInput);
		}

		return () => {
			// Remove the event listener when the component unmounts
			if (sliderEl) {
				sliderEl.removeEventListener("input", handleInput);
			}
		};
	}, []);

	return (
		<div className={styles.range}>
			<input type="range" min="0" max="50" value={sliderValue} id="range2" className={styles.rangeInput} />
			{/* <div className="value2">{sliderValue}</div> */}
		</div>
	);
};

export default RangeSlider;
