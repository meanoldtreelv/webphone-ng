import { useEffect, useState } from "react";
import styles from "./ModalMessage.module.scss";
import { useNavigate } from "react-router";
import sip from "lib/sip";

const ModalMessage = () => {
	const navigate = useNavigate();
	const [second, setSecond] = useState(5);

	const redirectToLogin = () => {
		localStorage.clear();
		sessionStorage.clear();
		document.cookie.replace(/(?<=^|;).+?(?=\=|;|$)/g, (name) =>
			window.location.hostname
				.split(".")
				.reverse()
				.reduce(
					(domain) => (
						(domain = domain.replace(/^\.?[^.]+/, "")),
						(document.cookie = `${name}=;max-age=0;path=/;domain=${domain}`),
						domain
					),
					window.location.hostname,
				),
		);
		sip.logout();
		navigate("auth/login");
	};

	useEffect(() => {
		if (second > 0) {
			setTimeout(() => {
				setSecond(second - 1);
			}, 1000);
		} else {
			redirectToLogin();
		}
	}, [second]);

	return (
		<div className={styles.modalMessage}>
			<div className={styles.modalMessage_backdrop}></div>
			<div className={styles.modalMessage_center}>
				<h1>Session timeout!</h1>
				<p>Redirecting back to login page in {second} second/s.</p>
				<button className={styles.actionButton} onClick={redirectToLogin}>
					Ok
				</button>
			</div>
		</div>
	);
};

export default ModalMessage;
