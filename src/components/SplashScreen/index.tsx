import styles from "./SplashScreen.module.scss";

import Logo from "components/UI/Logo";

const SplashScreen = () => {
	return (
		<section className={styles.splashScreen}>
			<div className={styles.riVoiceLogo}>
				<Logo type="ri-voice" />
			</div>
			
			<div className={styles.ringplanLogo}>
				<Logo />
			</div>
		</section>
	);
};

export default SplashScreen;
