import styles from "./Login.module.scss";
import { useNavigate } from "react-router-dom";

import loginSideImage from "./../../assets/images/bg/login.png";

import ExtensionIcon from "./../../components/UI/Icons/Extension";
import EnvelopeIcon from "./../../components/UI/Icons/Envelope";
import LockIcon from "./../../components/UI/Icons/Lock";
import Input from "./../../components/UI/Forms/Input";
import Button from "./../../components/UI/Forms/Button";
import Logo from "./../../components/UI/Logo";
import ErrorMessage from "components/UI/ErrorMessage";
import {useEffect, useState} from "react"
import { useSelector } from "react-redux";
import Loader from "../../components/UI/Loader";
import sip from "../../lib/sip"

const Login = () => {
	const navigate = useNavigate();

	const onContinueWithRingplan = () => {
		navigate("/dashboard"); // Remove the extra parentheses
	};

	interface FormData {
		extension?: string,
		server?: string,
		secret?: string,
		extensionErrorMsg?: string,
		serverErrorMsg?: string,
		secretErrorMsg?: string,
	}
	const [form, setForm] = useState<FormData>({extension:"", secret:"", server:"zraytechnoloDoobh.ringplan.com"});
	const loginWithExtension = ()=>{
		(form?.extension === "") ? setForm((prevState)=>{return{ ...prevState, extensionErrorMsg: "This field is required"}}) :  setForm((prevState)=>{return{ ...prevState, extensionErrorMsg: ""}});
		(form?.server === "") ? setForm((prevState)=>{return{ ...prevState, serverErrorMsg: "This field is required"}}) :  setForm((prevState)=>{return{ ...prevState, serverErrorMsg: ""}});
		(form?.secret === "") ? setForm((prevState)=>{return{ ...prevState, secretErrorMsg: "This field is required"}}) :  setForm((prevState)=>{return{ ...prevState, secretErrorMsg: ""}});
		form.extension && form.server && form.secret && sip.CreateUserAgent(form.extension, form.secret, form.server)
		// sip.CreateUserAgent("", "", "")
	}
	const { authMessage, authLoading } = useSelector((state: any) => state.sip)

	useEffect(()=>{
		if(authMessage === "continue"){
			navigate("/dashboard");
		}
	}, [authMessage])
	const login = ()=> {return (
		<section className={styles.login}>
			<div className={styles.login_image}>
				<img src={loginSideImage} alt="" />
			</div>
			<div className={styles.login_textBox}>
				<div className={styles.login_text}>
					<h1 className={styles.login_join}>Join the RingPlan Team</h1>
					<p className={styles.login_doMore}>Do more with Ringplan.</p>

					<div className={styles.continueRingplan}>
						<Button onClick={onContinueWithRingplan} icon={<Logo type="ri" />} border>
							<span>Continue with Ringplan</span>
						</Button>
					</div>

					<p className={styles.login_withExtension}>Or login with extension and secret</p>

					<Input type="text" errorMsg={form?.extensionErrorMsg} value={form?.extension} onChange={(e) => setForm({...form, extension: e.target.value})} placeholder="Enter extension here..." required icon={<ExtensionIcon  />} />
					<Input type="text" errorMsg={form?.serverErrorMsg} value={form?.server} onChange={(e) => setForm({...form, server: e.target.value})} placeholder="Enter server address here..." required icon={<EnvelopeIcon />} />
					<Input type="password" errorMsg={form?.secretErrorMsg} value={form?.secret} onChange={(e) => setForm({...form, secret: e.target.value})} placeholder="Enter secret code here..." required icon={<LockIcon />} />
					{ authMessage && authMessage !== "continue" ? <ErrorMessage msg={ authMessage } /> : ''}
					<Button fill onClick={loginWithExtension}>Sign In</Button>
					{/* 
						<p className={`caption_1 ${styles.login_forgotPassword}`}>
							Forgot your password? <span>Click here</span>
						</p> 
					*/}
				</div>
			</div>
		</section>
	)}
	return authLoading ? <Loader/> : login();
};

export default Login;
