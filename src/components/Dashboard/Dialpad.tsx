import React, { useState } from "react";
import classes from "./dialpad.module.scss";

const Dialpad = () => {
	const [numberEntered, setNumberEntered] = useState("");

	return (
		<section className={classes.dialpad}>
			<div className={classes.dialpad_number}>
				<input type="text" placeholder="Enter number" className={`title_1`} value={numberEntered} />
			</div>
			<div className={classes.dialpad_keypad}>
				<div
					className={classes.dialpad_key}
					onClick={() => {
						setNumberEntered(numberEntered + "1");
					}}>
					<span className={`title_1`}>1</span>
					<p className={`caption_2`}>
						<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
							<g id="line / voicemail" clip-path="url(#clip0_2129_3092)">
								<path
									id="Vector"
									d="M4.00033 11.3332C5.84127 11.3332 7.33366 9.84079 7.33366 7.99984C7.33366 6.15889 5.84127 4.6665 4.00033 4.6665C2.15938 4.6665 0.666992 6.15889 0.666992 7.99984C0.666992 9.84079 2.15938 11.3332 4.00033 11.3332ZM4.00033 11.3332H12.0003M12.0003 11.3332C13.8413 11.3332 15.3337 9.84079 15.3337 7.99984C15.3337 6.15889 13.8413 4.6665 12.0003 4.6665C10.1594 4.6665 8.66699 6.15889 8.66699 7.99984C8.66699 9.84079 10.1594 11.3332 12.0003 11.3332Z"
									stroke="#6C7A8B"
									stroke-width="1.5"
									stroke-linecap="round"
								/>
							</g>
							<defs>
								<clipPath id="clip0_2129_3092">
									<rect width="16" height="16" fill="white" />
								</clipPath>
							</defs>
						</svg>
					</p>
				</div>
				<div
					className={classes.dialpad_key}
					onClick={() => {
						setNumberEntered(numberEntered + "2");
					}}>
					<span className={`title_1`}>2</span>
					<p className={`caption_2`}>ABC</p>
				</div>
				<div
					className={classes.dialpad_key}
					onClick={() => {
						setNumberEntered(numberEntered + "3");
					}}>
					<span className={`title_1`}>3</span>
					<p className={`caption_2`}>DEF</p>
				</div>
				<div
					className={classes.dialpad_key}
					onClick={() => {
						setNumberEntered(numberEntered + "4");
					}}>
					<span className={`title_1`}>4</span>
					<p className={`caption_2`}>GHI</p>
				</div>
				<div
					className={classes.dialpad_key}
					onClick={() => {
						setNumberEntered(numberEntered + "5");
					}}>
					<span className={`title_1`}>5</span>
					<p className={`caption_2`}>JKL</p>
				</div>
				<div
					className={classes.dialpad_key}
					onClick={() => {
						setNumberEntered(numberEntered + "6");
					}}>
					<span className={`title_1`}>6</span>
					<p className={`caption_2`}>MNO</p>
				</div>
				<div
					className={classes.dialpad_key}
					onClick={() => {
						setNumberEntered(numberEntered + "7");
					}}>
					<span className={`title_1`}>7</span>
					<p className={`caption_2`}>PQRS</p>
				</div>
				<div
					className={classes.dialpad_key}
					onClick={() => {
						setNumberEntered(numberEntered + "8");
					}}>
					<span className={`title_1`}>8</span>
					<p className={`caption_2`}>TUV</p>
				</div>
				<div
					className={classes.dialpad_key}
					onClick={() => {
						setNumberEntered(numberEntered + "9");
					}}>
					<span className={`title_1`}>9</span>
					<p className={`caption_2`}>WXYZ</p>
				</div>
				<div
					className={classes.dialpad_key}
					onClick={() => {
						setNumberEntered(numberEntered + "*");
					}}>
					<span className={`title_1`}>*</span>
					<p className={`caption_2`}></p>
				</div>
				<div
					className={classes.dialpad_key}
					onClick={() => {
						setNumberEntered(numberEntered + "0");
					}}>
					<span className={`title_1`}>0</span>
					<p className={`caption_2`}>+</p>
				</div>
				<div
					className={classes.dialpad_key}
					onClick={() => {
						setNumberEntered(numberEntered + "#");
					}}>
					<span className={`title_1`}>#</span>
					<p className={`caption_2`}>&nbsp;</p>
				</div>
			</div>
			{/* <div className={classes.dialpad_keypad}>
        <div className={classes.dialpad_key2}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="line / add_user">
              <path
                id="Vector"
                d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H6C4.93913 15 3.92172 15.4214 3.17157 16.1716C2.42143 16.9217 2 17.9391 2 19V21M19 8V14M22 11H16M13 7C13 9.20914 11.2091 11 9 11C6.79086 11 5 9.20914 5 7C5 4.79086 6.79086 3 9 3C11.2091 3 13 4.79086 13 7Z"
                stroke="#C8D3E0"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
          </svg>
        </div>
        <div
          className={classes.dialpad_key2}
          style={{ background: "var(--primary-disabled, #C8D3E0)" }}
        >
          <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="fill / phone">
              <path
                id="Vector"
                d="M32.9999 25.3801V29.8801C33.0016 30.2979 32.916 30.7114 32.7487 31.0942C32.5813 31.4769 32.3358 31.8205 32.028 32.1029C31.7202 32.3854 31.3568 32.6004 30.961 32.7342C30.5653 32.868 30.146 32.9177 29.7299 32.8801C25.1142 32.3786 20.6804 30.8014 16.7849 28.2751C13.1606 25.9721 10.0879 22.8994 7.7849 19.2751C5.24987 15.362 3.67226 10.9066 3.1799 6.27015C3.14242 5.85535 3.19171 5.43729 3.32465 5.04258C3.45759 4.64788 3.67126 4.28518 3.95205 3.97758C4.23284 3.66997 4.57461 3.42421 4.95559 3.25593C5.33657 3.08765 5.74841 3.00054 6.1649 3.00015H10.6649C11.3929 2.99298 12.0986 3.25076 12.6505 3.72544C13.2025 4.20013 13.563 4.85932 13.6649 5.58015C13.8548 7.02025 14.2071 8.43424 14.7149 9.79515C14.9167 10.332 14.9604 10.9155 14.8408 11.4765C14.7211 12.0374 14.4432 12.5523 14.0399 12.9601L12.1349 14.8651C14.2702 18.6205 17.3796 21.7298 21.1349 23.8651L23.0399 21.9601C23.4477 21.5569 23.9626 21.2789 24.5236 21.1593C25.0845 21.0397 25.668 21.0833 26.2049 21.2851C27.5658 21.793 28.9798 22.1452 30.4199 22.3351C31.1486 22.4379 31.814 22.805 32.2897 23.3664C32.7654 23.9278 33.0182 24.6445 32.9999 25.3801Z"
                fill="white"
              />
            </g>
          </svg>
        </div>
        <div className={classes.dialpad_key2}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M23.5 19C23.5 19.3978 23.342 19.7794 23.0607 20.0607C22.7794 20.342 22.3978 20.5 22 20.5H7.07036C6.56883 20.5 6.10049 20.2494 5.82229 19.8321L0.785831 12.2775C0.673863 12.1095 0.673862 11.8907 0.785831 11.7228L5.8223 4.16814C6.10049 3.75085 6.56883 3.50021 7.07035 3.5002L22 3.5C22.3978 3.5 22.7794 3.65804 23.0607 3.93934C23.342 4.22064 23.5 4.60218 23.5 5V19Z"
              stroke="#C8D3E0"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M10.875 8.875L17.125 15.125M17.125 8.875L10.875 15.125"
              stroke="#C8D3E0"
              stroke-width="1.5"
              stroke-linecap="round"
            />
          </svg>
        </div>
      </div> */}
		</section>
	);
};

export default Dialpad;
