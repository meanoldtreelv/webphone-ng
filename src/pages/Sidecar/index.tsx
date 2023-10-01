import BaseLayout from "layouts/BaseLayout";
import styles from "./Sidecar.module.scss";
import SidecarSidebar from "components/Sidecar/SidecarSidebar";
import Header from "components/Sidecar/Header";
import SidecarManage from "components/Sidecar/SidecarManage";

const Sidecar = () => {
	return (
		<div className={styles.sidecar}>
			<BaseLayout>
				<section className={styles.sidecarManage}>
					<Header />
					<SidecarManage />
				</section>
			</BaseLayout>
			{/* <SidecarSidebar /> */}
		</div>
	);
};

export default Sidecar;
