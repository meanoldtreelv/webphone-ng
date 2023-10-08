import XIcon from "components/UI/Icons/X";
import styles from "./EditExtension.module.scss";
import { store } from "redux/store";
import { useSelector } from "react-redux";

const EditExtension = () => {
	const { editExtension } = useSelector((state: any) => state.sip)
	return (
		<section className={styles.editBox}>
			<div className={styles.edit}>
				<div className={styles.edit_heading}>
					<h3>Edit Extension</h3>
					<span className={styles.edit_cross} onClick={ ()=>{store.dispatch({type:"sip/isEditBoxOpen", payload:false})} }>
						<XIcon />
					</span>
				</div>
				<p className={styles.extension}>
					Extension <span>{editExtension.user}</span>
				</p>
				<div className={styles.inputBox}>
					<label htmlFor="">Number:</label>
					<select name="" id="extension_number" className={styles.extension_number}>
						{/* <option value="1001">1001</option>
						<option value="1002">1002</option>
						<option value="1003">1003</option> */}
					</select>
				</div>
				<div className={styles.inputBox}>
					<label htmlFor="">Name:</label>
					<input type="text" placeholder="anonymous" />
				</div>
				<div className={styles.idInfo}>ID Info</div>
				<div className={styles.callerId}>
					<p className={styles.callerId_heading}>Caller ID</p>
					<p className={styles.callerId_number}>{editExtension.displayname} &lt;{editExtension.user}&gt;</p>
				</div>
				<div className={styles.deleteSave}>
					<div className={styles.edit_delete}>
						<span>Delete Extension</span>
						<span className={styles.edit_save}>Save</span>
					</div>
				</div>
			</div>
		</section>
	);
};

export default EditExtension;
