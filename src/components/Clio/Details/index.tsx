import styles from "./Details.module.scss";
import EditIcon from "components/UI/Icons/ClioIcon/Edit";
import { Link } from "react-router-dom";

const Details = () => {
	return (
		<div className={styles.box}>
			<div className={styles.heading}>
				<span>Contact Details</span>
				{/* todo - redirect to the respective URL */}
				<Link to={"/"}>
					<EditIcon />
				</Link>
			</div>
			<div className={styles.contact_details}>
				<div>
					<label htmlFor="name">Name</label>
					<p>Sandra Pilon</p>
				</div>
				<div>
					<label htmlFor="phone">Phone</label>
					<p>1234567890</p>
				</div>
				<div>
					<label htmlFor="">Email</label>
					<p>sandrapilon@gmail.com</p>
				</div>
				<div>
					<label htmlFor="">Website</label>
					<p>sandra.me</p>
				</div>
				<div>
					<label htmlFor="">Address</label>
					<p>17D, new jersy, USA 011041</p>
				</div>
				<div>
					<label htmlFor="">Country</label>
					<p>Canada</p>
				</div>
			</div>
			<div className={styles.heading}>
				<span>Custom Fields</span>
			</div>
			<div className={styles.contact_details}>
				<div>
					<label htmlFor="phone">Zoho Contact ID</label>
					<p>1234567890</p>
				</div>
				<div>
					<label htmlFor="">Hobbies</label>
					<p>Baking, Reading, Singing</p>
				</div>
				<div>
					<label htmlFor="">Date of Birth</label>
					<p>1998-01-01</p>
				</div>
				<div>
					<label htmlFor="">Website Lead</label>
					<p>No</p>
				</div>
			</div>
		</div>
	);
};

export default Details;
