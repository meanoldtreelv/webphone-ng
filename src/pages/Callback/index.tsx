import Button from "components/UI/Forms/Button";
import { getBackendUrl } from "config/env.config";
import sip from "lib/sip";
import { useEffect, useState } from "react";
import { useGetInstancesQuery } from "services/callback";
import ExtensionList from "./extensionList";
import styles from "./Callback.module.scss";
import loginSideImage from "./../../assets/images/bg/login.png";
import Logo from "components/UI/Logo";
import { useNavigate } from "react-router";
import Loader from "components/UI/Loader";
import { useSelector } from "react-redux";
import { store } from "redux/store";
import ErrorMessage from "components/UI/ErrorMessage";
import { setCookie } from "utils";
import { useTheme } from "hooks/useTheme";

const Callback = () => {
	const instance_id: string = useGetInstancesQuery(null).data?.[0]["uuid"];
	const navigate = useNavigate();
	const theme = useTheme();

	const { extAuthList, loginSelectExtension } = useSelector((state: any) => state.sip);
	
	const loginWithExtensionandSecret = () => {
		store.dispatch({ type: "sip/authMessage", payload: "" });
		navigate("/auth/login");
	};
	
	const loginWithAPI = () => {
		for (const ext of extAuthList) {
			if (ext["user"] == loginSelectExtension) {
				sip.LoginWithAPI(ext);
			}
		}
	};

	const { authMessage, authLoading } = useSelector((state: any) => state.sip);
	useEffect(() => {
		if (authMessage === "continue") {
			navigate("/dashboard");
		}
	}, [authMessage]);
	// return (
	// 	<div style={{ width: "100%", height: "100vh", backgroundColor: "#bfbfbf", placeContent: "center", display: "grid" }}>
	// 		<div style={{ maxWidth: "28rem", }}>
	// 			<div style={{ backgroundColor: "#fff", position: "relative", padding: "1rem", borderRadius: "0.5rem" }}>
	// 				<h2 style={{ minWidth: "18rem", fontWeight: 500, fontSize: "1.125rem", lineHeight: "1.75rem", fontFamily: "Roboto, sans-serif", marginBottom: "1rem" }}>Select Extensions</h2>
	// 				{uuid ? <ExtensionList uuid={uuid} /> : null}
	// 				<div style={{ paddingTop: "0.5rem", display: "flex", flexDirection: "column" }}>
	// 					<Button onClick={sip.logout} border>
	// 						<span>Back</span>
	// 					</Button>
	// 				</div>
	// 			</div>
	// 		</div>
	// 	</div>
	// );
	const callback = () => {
		return (
			<section className={`${styles.login} ${theme}`}>
				<div className={styles.login_image}>
					<img src={loginSideImage} alt="" />
				</div>
				<div className={styles.login_textBox}>
					<div className={styles.login_text}>
						<h1 className={styles.login_join}>Join the RingPlan Team</h1>
						<p className={styles.login_doMore}>Do more with Ringplan.</p>
						<div className={styles.continueRingplan}>
							<Button onClick={loginWithExtensionandSecret} icon={<Logo type="ri" />} border>
								<span>Login with Extension and Secret</span>
							</Button>
						</div>
						<h2
							style={{
								minWidth: "18rem",
								fontWeight: 500,
								fontSize: "1.125rem",
								color: "#6a7077",
								lineHeight: "1.75rem",
								fontFamily: "Roboto, sans-serif",
								marginBottom: "1rem",
							}}>
							Select Extension
						</h2>
						{instance_id ? <ExtensionList instance_id={instance_id} /> : null}
						{authMessage && authMessage !== "continue" ? <ErrorMessage msg={authMessage} /> : ""}
						<Button fill onClick={loginWithAPI}>
							Continue
						</Button>
					</div>
				</div>
			</section>
		);
	};

	return authLoading ? <Loader /> : callback();
};

export default Callback;
