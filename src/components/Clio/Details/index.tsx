import styles from "./Details.module.scss";
import EditIcon from "components/UI/Icons/ClioIcon/Edit";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { contact } from "redux/clio/clioSelectors";

const Details = () => {
	const contactDetails = useSelector(contact);
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
					<p>{contactDetails?.name}</p>
				</div>
				<div>
					<label htmlFor="phone">Phone</label>
					<p>{contactDetails?.primary_phone_number}</p>
				</div>
				<div>
					<label htmlFor="">Email</label>
					<p>{contactDetails?.primary_email_address}</p>
				</div>
				<div>
					<label htmlFor="">Website</label>
					<p>sandra.me</p>
				</div>

				<div>
					<label htmlFor="">Address</label>
					<p>
						{contactDetails?.primary_address?.street +
							" " +
							contactDetails?.primary_address?.city +
							" " +
							contactDetails?.primary_address?.province +
							" " +
							contactDetails?.primary_address?.country +
							", " +
							contactDetails?.primary_address?.postal_code}
					</p>
				</div>
				<div>
					<label htmlFor="">Country</label>
					<p>{contactDetails?.primary_address?.country}</p>
				</div>
			</div>
			<div className={styles.heading}>
				<span>Custom Fields</span>
			</div>
			<div className={styles.contact_details}>
				<div>
					<label htmlFor="phone">Ringplan Contact ID</label>
					<p>1234567890</p>
				</div>
				<div>
					<label htmlFor="">Date of Birth</label>
					<p>{contactDetails?.date_of_birth}</p>
				</div>
				{/* <div>
					<label htmlFor="">Hobbies</label>
					<p>Baking, Reading, Singing</p>
				</div> */}
				{/* <div>
					<label htmlFor="">Website Lead</label>
					<p>No</p>
				</div> */}
			</div>
		</div>
	);
};

export default Details;
