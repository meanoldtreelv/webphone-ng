import { useDispatch } from "react-redux";
import styles from "./Backdrop.module.scss";
import { toggleModal } from "redux/common/commonSlice";

const Backdrop = () => {
	const dispatch = useDispatch();

	return <div className={styles.backdrop} onClick={() => dispatch(toggleModal())}></div>;
};

export default Backdrop;
