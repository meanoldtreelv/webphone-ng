import { useState } from "react";
import styles from "./StopWatch.module.scss";
import PlayIcon from "components/UI/Icons/ClioIcon/Play";
import PauseIcon from "components/UI/Icons/ClioIcon/Pause";
import ResetIcon from "components/UI/Icons/ClioIcon/Reset";
// import PlayIcon from "components/UI/Icons/Voicemail/Play";
// import PauseIcon from "components/UI/Icons/Sidecar/Pause";

export default function StopWatch() {
	const [time, setTime] = useState({
		sec: 0,
		min: 0,
		hr: 0,
	});

	const [intervalId, setIntervalId] = useState();

	const updateTimer = () => {
		setTime((prev) => {
			let newTime = { ...prev };
			// update sec and see if we need to increase min
			if (newTime.sec < 59) newTime.sec += 1;
			else {
				newTime.min += 1;
				newTime.sec = 0;
			}
			// min has increased in *newTime* by now if it was updated, see if it has crossed 59
			if (newTime.min === 60) {
				newTime.min = 0;
				newTime.hr += 1;
			}

			return newTime;
		});
	};

	const pauseOrResume = () => {
		if (!intervalId) {
			let id = setInterval(updateTimer, 1000);
			setIntervalId(id);
		} else {
			clearInterval(intervalId);
			setIntervalId("");
		}
	};

	const reset = () => {
		clearInterval(intervalId);
		setTime({
			sec: 0,
			min: 0,
			hr: 0,
		});
	};

	console.log(intervalId);

	return (
		<div className={styles.stopWatch}>
			<button onClick={pauseOrResume}>
				{intervalId ? <PauseIcon color={"icon-on-color"} /> : <PlayIcon color={"icon-on-color"} />}
			</button>
			<h2>{`${time.hr < 10 ? 0 : ""}${time.hr} : ${time.min < 10 ? 0 : ""}${time.min} : ${time.sec < 10 ? 0 : ""}${
				time.sec
			}`}</h2>

			<button onClick={reset}>
				<ResetIcon color={"icon-on-color"} />
			</button>
		</div>
	);
}
