import { SetStateAction, useState } from "react";
import styles from "./Dialpad.module.scss";
import Dialpad1Icon from "components/UI/Icons/Dialpad1";
import Input from "components/UI/Forms/Input";
import { useDispatch, useSelector } from "react-redux";
import { setCallNumber } from "redux/call/callSlice";
import { callNumber } from "redux/call/callSelectors";
import sip from "lib/sip";
import dial_1 from "../../../assets/media/dial-1.wav";
import dial_2 from "../../../assets/media/dial-2.wav";
import dial_3 from "../../../assets/media/dial-3.wav";

const Dialpad = ({LineNumber}:{LineNumber?:number|undefined}) => {
	const dispatch = useDispatch();
	const number = useSelector(callNumber);
  let longPress = false;
  let startTime = 0;
  let endTime = 0;
	const dialpad_arr = [
		[1, <Dialpad1Icon />],
		[2, "ABC"],
		[3, "DEF"],
		[4, "GHI"],
		[5, "JKL"],
		[6, "MNO"],
		[7, "PQRS"],
		[8, "TUV"],
		[9, "WXYZ"],
		["*", ""],
		[0, "+"],
		["#", ""],
	];
	var dialpadSounds = [dial_1, dial_2, dial_3];
	const playAudio = () => {
		var randomSoundIndex = Math.floor(Math.random() * dialpadSounds.length);
		const audio = new Audio();
		audio.src = dialpadSounds[randomSoundIndex];
		audio.play();
	};
	return (
		<section className={styles.dialpad}>
			<div className={styles.dialpad_number}>
				<input
					type="text"
					placeholder="Enter number"
					onChange={(e) => {
						dispatch(setCallNumber((e.target.value = e.target.value.replace(/[^\d#+*]+/g, ""))));
					}}
					className={styles.numberEntered}
					value={number}
				/>
			</div>
			<div className={styles.dialpad_keypad}>
				{dialpad_arr.map((key_arr) => (
					<button
						className={styles.dialpad_key}
            onMouseDown={()=>{
              if (key_arr[0] == "0"){
                startTime = new Date().getTime();
              }
            }}
            onMouseUp={()=>{
              if (key_arr[0] == "0"){
                endTime = new Date().getTime();
                longPress = endTime - startTime < 500 ? false : true;
              }
            }}
						onClick={() => {
              let keyPresed = key_arr[0]
              if (key_arr[0] == "0"){
                keyPresed = (longPress ? "+" : "0")
              }
              dispatch(setCallNumber(number + keyPresed));
              const value:string = typeof keyPresed === "string" ? keyPresed : (typeof keyPresed === "number" ? keyPresed.toString(): "") 
              LineNumber && sip.sendDTMF(LineNumber, value);
              !LineNumber && playAudio()
						}}>
						<span className={styles.dialpad_val}>{key_arr[0]}</span>
						<p className={styles.dialpad_val2}>{key_arr[1]}</p>
					</button>
				))}
			</div>
		</section>
	);
};

export default Dialpad;
