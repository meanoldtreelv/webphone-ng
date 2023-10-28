import ChevronLeftIcon from "components/UI/Icons/Navigation/ChevronLeft";
import styles from "./Header.module.scss";
import { useDispatch } from "react-redux";
import { setSelectedCallHistory } from "redux/call-history/callHistorySlice";

const Header = () => {
	const dispatch = useDispatch();

	return (
		<section className={styles.header}>
			<button onClick={() => dispatch(setSelectedCallHistory({}))}>
				<ChevronLeftIcon />
				<p>Recents</p>
			</button>
			<h3>Recents</h3>
		</section>
	);
};

export default Header;
