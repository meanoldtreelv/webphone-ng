import { useEffect } from "react";
import { useNavigate } from "react-router";
import styles from "./RedirectMsg.module.scss";
import logo from "./../../../assets/images/core/logo-ri.svg";

const RedirectMsg = () => {
	const navigate = useNavigate();

	useEffect(() => {
		setTimeout(() => {
			navigate("auth/login");
		}, 1500);
	}, []);

	return (
		<div className={styles.redirectMsg}>
			<div>
				<div className={styles.redirectLogo}>
					<img src={logo} alt="" />
				</div>

				<p>Redirecting to Login..</p>
				<p>
					If the redirection did not occur automatically, please click on this
					<a href="auth/login"> link.</a>
				</p>
			</div>
		</div>
	);
};

export default RedirectMsg;
