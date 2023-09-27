import styles from "./Conference.module.scss";
import BaseLayout from "../../layouts/BaseLayout";
import StartConference from "../../components/Conference/StartConference";
import GroupList from "../../components/Conference/GroupList";
import NoGroupSelected from "../../components/Conference/NoGroupSelected";
import Header from "../../components//Conference/Header";
import Members from "../../components/Conference/Members";
import GroupDetails from "../../components/Conference/GroupDetails";

const Conference = () => {
	return (
		<div className={styles.conference}>
			<BaseLayout>
				{false && <StartConference />}

				{true && (
					<section className={styles.recent}>
						<GroupList />

						<div className={styles.rightCont}>
							<div className={styles.body}>
								<Header />
								<Members />
								<GroupDetails />
							</div>

							{false && (
								<div className={styles.noRecords}>
									<NoGroupSelected />
								</div>
							)}
						</div>
					</section>
				)}
			</BaseLayout>
		</div>
	);
};

export default Conference;
