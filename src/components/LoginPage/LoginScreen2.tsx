import React from "react";
import classes from "./loginScreen2.module.scss";

const LoginScreen2 = () => {
  return (
    <section className={classes.login}>
      <div className={classes.login_image}>
        <img src="/img/login.png" alt="" />
      </div>
      <div className={classes.login_textBox}>
        <div className={classes.login_text}>
          <h1 className={`title_2_bold ${classes.login_join}`}>
            Join the RingPlan Team
          </h1>
          <p className={`body ${classes.login_doMore}`}>
            Do more with Ringplan.
          </p>
          <div className={`body ${classes.login_continueRingplan}`}>
            <img src="/icon/ri.svg" alt="" />
            <span>Continue with Ringplan</span>
          </div>

          <p className={`caption_1 ${classes.login_withExtension}`}>
            Or login with extension and secret
          </p>
          <div className={`caption_1 ${classes.login_inputBox}`}>
            <input type="text" placeholder="Enter extension here..." required />
            <p className={`caption_2 ${classes.login_inputBox_error}`}>Error</p>
            <svg
              width="18"
              height="18"
              viewBox="0 0 34 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <mask
                id="mask0_6254_26381"
                style={{ maskType: "alpha" }}
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="34"
                height="38"
              >
                <rect width="33.9463" height="37.2734" fill="#D9D9D9" />
              </mask>
              <g mask="url(#mask0_6254_26381)">
                <path
                  d="M12.5527 31.8375H7.07184C6.48249 31.8375 5.98179 31.6107 5.56972 31.1572C5.1567 30.7048 4.9502 30.155 4.9502 29.5079V23.4898C5.91672 23.3603 6.74793 22.9203 7.44383 22.1697C8.13879 21.419 8.48627 20.5001 8.48627 19.413C8.48627 18.3258 8.13879 17.407 7.44383 16.6563C6.74793 15.9057 5.91672 15.4656 4.9502 15.3362V9.3181C4.9502 8.67099 5.1567 8.12121 5.56972 7.66875C5.98179 7.21526 6.48249 6.98851 7.07184 6.98851H12.7296C12.8474 6.0049 13.2364 5.18955 13.8965 4.54244C14.5565 3.89533 15.3462 3.57178 16.2656 3.57178C17.185 3.57178 17.9747 3.89533 18.6348 4.54244C19.2949 5.18955 19.6838 6.0049 19.8017 6.98851H25.4594C26.0488 6.98851 26.5495 7.21526 26.9615 7.66875C27.3745 8.12121 27.5811 8.67099 27.5811 9.3181V15.5303C28.4769 15.6598 29.2194 16.0869 29.8088 16.8116C30.3981 17.5364 30.6928 18.4035 30.6928 19.413C30.6928 20.4225 30.3981 21.2896 29.8088 22.0144C29.2194 22.7391 28.4769 23.1662 27.5811 23.2956V29.5079C27.5811 30.155 27.3745 30.7048 26.9615 31.1572C26.5495 31.6107 26.0488 31.8375 25.4594 31.8375H19.9785C19.8606 30.7244 19.4481 29.7988 18.7409 29.0606C18.0337 28.3234 17.2086 27.9548 16.2656 27.9548C15.3227 27.9548 14.4976 28.3234 13.7904 29.0606C13.0832 29.7988 12.6706 30.7244 12.5527 31.8375ZM7.07184 29.5079H10.8908C11.3858 28.136 12.1581 27.1457 13.2076 26.5369C14.2562 25.9291 15.2755 25.6252 16.2656 25.6252C17.2557 25.6252 18.2755 25.9291 19.325 26.5369C20.3736 27.1457 21.1454 28.136 21.6405 29.5079H25.4594V21.0437H27.1921C27.64 20.9919 27.9818 20.8045 28.2175 20.4815C28.4533 20.1574 28.5712 19.8013 28.5712 19.413C28.5712 19.0247 28.4533 18.6686 28.2175 18.3445C27.9818 18.0214 27.64 17.834 27.1921 17.7823H25.4594V9.3181H17.7508V7.4156C17.7036 6.9238 17.533 6.54848 17.2388 6.28963C16.9436 6.03079 16.6192 5.90137 16.2656 5.90137C15.912 5.90137 15.5876 6.03079 15.2925 6.28963C14.9983 6.54848 14.8276 6.9238 14.7805 7.4156V9.3181H7.07184V13.589C8.15623 14.0549 9.01668 14.8185 9.65317 15.8798C10.2897 16.941 10.6079 18.1188 10.6079 19.413C10.6079 20.6813 10.2897 21.8461 9.65317 22.9074C9.01668 23.9686 8.15623 24.7452 7.07184 25.237V29.5079Z"
                  fill="#9298A0"
                />
              </g>
            </svg>
          </div>
          <div className={`caption_1  ${classes.login_inputBox}`}>
            <input
              type="text"
              placeholder="Enter server address here..."
              required
            />
            <p className={`caption_2 ${classes.login_inputBox_error}`}>Error</p>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="line / mail">
                <path
                  id="Vector"
                  d="M14.6666 4.66675L8.68665 8.46675C8.48083 8.5957 8.24286 8.66409 7.99998 8.66409C7.7571 8.66409 7.51913 8.5957 7.31331 8.46675L1.33331 4.66675M2.66665 2.66675H13.3333C14.0697 2.66675 14.6666 3.2637 14.6666 4.00008V12.0001C14.6666 12.7365 14.0697 13.3334 13.3333 13.3334H2.66665C1.93027 13.3334 1.33331 12.7365 1.33331 12.0001V4.00008C1.33331 3.2637 1.93027 2.66675 2.66665 2.66675Z"
                  stroke="#9298A0"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
            </svg>
          </div>
          <div className={`caption_1 ${classes.login_inputBox}`}>
            <input
              type="text"
              placeholder="Enter secret code here..."
              required
            />
            <p className={`caption_2 ${classes.login_inputBox_error}`}>Error</p>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="line / lock">
                <path
                  id="Vector"
                  d="M4.66667 7.33325V4.66659C4.66667 3.78253 5.01786 2.93468 5.64298 2.30956C6.2681 1.68444 7.11595 1.33325 8 1.33325C8.88406 1.33325 9.7319 1.68444 10.357 2.30956C10.9821 2.93468 11.3333 3.78253 11.3333 4.66659V7.33325M3.33333 7.33325H12.6667C13.403 7.33325 14 7.93021 14 8.66659V13.3333C14 14.0696 13.403 14.6666 12.6667 14.6666H3.33333C2.59695 14.6666 2 14.0696 2 13.3333V8.66659C2 7.93021 2.59695 7.33325 3.33333 7.33325Z"
                  stroke="#9298A0"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
            </svg>
          </div>
          <div className={`body_bold ${classes.login_signIn}`}>Sign In</div>
          {/* <p className={`caption_1 ${classes.login_forgotPassword}`}>
            Forgot your password? <span>Click here</span>
          </p> */}
        </div>
      </div>
    </section>
  );
};

export default LoginScreen2;
