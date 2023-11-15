import BaseLayout from "layouts/BaseLayout";
import styles from "./Clio.module.scss";
import CallConnectorWidget from "components/Clio/CallConnectorWidget";

const Clio = () => {
	return (
		<div className={styles.clio}>
			<BaseLayout>clio is running............</BaseLayout>
			{/* <CallConnectorWidget /> */}
		</div>
	);
};

export default Clio;
