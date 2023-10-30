import styles from "./PopupMenu.module.scss";

interface IPopupMenu {
	id: string;
	children: {
		icon: React.ReactNode;
		title: string;
		clicked?: () => void;
	}[];
	popupMenu: (popup: boolean) => void;
}

const PopupMenu: React.FC<IPopupMenu> = ({ children, popupMenu}) => {
	return (
		<>
			<div className={styles.backdrop} onClick={() => popupMenu(false)}></div>
			<div className={styles.popup}>
				{children.map((opt) => (
					<button className={styles.popup_row} onClick={opt.clicked}>
						{opt.icon}
						<p className={`${styles.popup_rowText} ${styles.popup_email}`}>{opt.title}</p>
					</button>
				))}
			</div>
		</>
	);
};

export default PopupMenu;
