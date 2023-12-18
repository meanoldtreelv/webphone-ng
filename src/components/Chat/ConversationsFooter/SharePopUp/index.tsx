import styles from "./SharePopUp.module.scss";
import UserGroupIcon from "components/UI/Icons/Sidebar/UserGroup";
import UploadIcon from "components/UI/Icons/ChatIcons/Upload";
import { useDispatch } from "react-redux";
import { setSelectedAttachment, setSelectedFiles } from "redux/chat/chatSlice";

const SharePopUp = () => {
	const dispatch = useDispatch();

	const handleFileChange = (event) => {
		const files = event.target.files;

		dispatch(setSelectedAttachment(files));

		// You can perform further actions with the selected file, like uploading it to a server
		// For instance, you can use the 'fetch' API to upload the file
		// Example: uploadFileToServer(file);
	};

	return (
		<div className={styles.share}>
			<div>
				<input
					type="file"
					onChange={handleFileChange}
					// You can add additional attributes like accept to specify allowed file types
					accept=".png,.jpeg,.jpg,.mp4,.mov,.doc,.pdf,.mp3"
					id="attachment"
					multiple
				/>
				<label htmlFor="attachment">
					<span>
						<UploadIcon />
					</span>
					<span>Upload from your computer</span>
				</label>
			</div>
			<div>
				<input
					type="file"
					onChange={handleFileChange}
					// You can add additional attributes like accept to specify allowed file types
					accept=".mp4,.mov"
					id="video"
					multiple
				/>
				<label htmlFor="video">
					<span>
						<UploadIcon />
					</span>
					<span>Share video</span>
				</label>
			</div>
			<div>
				<input
					type="file"
					onChange={handleFileChange}
					// You can add additional attributes like accept to specify allowed file types
					accept=".png,.jpeg,.jpg"
					id="image"
					multiple
				/>
				<label htmlFor="image">
					<span>
						<UploadIcon />
					</span>
					<span>Share image</span>
				</label>
			</div>
			<div>
				<span>
					<UserGroupIcon color="icon-primary" />
				</span>
				<span>Share contacts</span>
			</div>
		</div>
	);
};

export default SharePopUp;
