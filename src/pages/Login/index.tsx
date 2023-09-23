import styles from "./Login.module.scss";
import { useNavigate } from "react-router-dom";

import loginSideImage from "./../../assets/images/bg/login.png";

import ExtensionIcon from "./../../components/UI/Icons/Extension";
import EnvelopeIcon from "./../../components/UI/Icons/Envelope";
import LockIcon from "./../../components/UI/Icons/Lock";
import Input from "./../../components/UI/Forms/Input";
import Button from "./../../components/UI/Forms/Button";
import Logo from "./../../components/UI/Logo";

const Login = () => {
	const navigate = useNavigate();

	const onContinueWithRingplan = () => {
		navigate("/dashboard"); // Remove the extra parentheses
	}

	return (
		<section className={styles.login}>
			<div className={styles.login_image}>
				<img src={loginSideImage} alt="" />
			</div>
			<div className={styles.login_textBox}>
				<div className={styles.login_text}>
					<h1 className={`title_2_bold ${styles.login_join}`}>Join the RingPlan Team</h1>
					<p className={`body ${styles.login_doMore}`}>Do more with Ringplan.</p>

					<div className={styles.continueRingplan}>
						<Button onClick={onContinueWithRingplan} icon={<Logo type="ri" />} border>
							<span>Continue with Ringplan</span>
						</Button>
					</div>

					<p className={`caption_1 ${styles.login_withExtension}`}>Or login with extension and secret</p>

					<Input type="text" placeholder="Enter extension here..." required icon={<ExtensionIcon />} />
					<Input type="text" placeholder="Enter server address here..." required icon={<EnvelopeIcon />} />
					<Input type="text" placeholder="Enter secret code here..." required icon={<LockIcon />} errorMsg="something went wrong" />

					<Button fill>Sign In</Button>

					{/* 
						<p className={`caption_1 ${styles.login_forgotPassword}`}>
							Forgot your password? <span>Click here</span>
						</p> 
					*/}
				</div>
			</div>
		</section>
	);
};

export default Login;

