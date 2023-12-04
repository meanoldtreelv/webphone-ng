import styles from "./ShareContactDialogue.module.scss";
import CloseIcon from "components/UI/Icons/Close";
import SearchIcon from "components/UI/Icons/Search";
import SearchBar from "components/UI/SearchBar";
import ContactCard from "components/Contact/ContactCard";

const ShareContactDialogue = () => {
	return (
		<div className={styles.overlay}>
			<div className={styles.box}>
				<div className={styles.header}>
					<span>Share contacts</span>
					<span className={styles.close}>
						<CloseIcon />
					</span>
				</div>
				<div>
					<SearchBar placeholder="Type number here " />
				</div>
				<div className={styles.contact}>
					{true ? (
						<span>
							<SearchIcon />
							<span>Search results (0)</span>
						</span>
					) : (
						<span>Contacts (18) </span>
					)}
				</div>
				<div className={styles.contactCardBox}>
					<div className={styles.card}>
						<ContactCard />
						<input type="checkbox" />
					</div>
					<div className={styles.card}>
						<ContactCard />
						<input type="checkbox" />
					</div>
					<div className={styles.card}>
						<ContactCard />
						<input type="checkbox" />
					</div>
					<div className={styles.card}>
						<ContactCard />
						<input type="checkbox" />
					</div>
					<div className={styles.card}>
						<ContactCard />
						<input type="checkbox" />
					</div>
					<div className={styles.card}>
						<ContactCard />
						<input type="checkbox" />
					</div>
					<div className={styles.card}>
						<ContactCard />
						<input type="checkbox" />
					</div>
					<div className={styles.card}>
						<ContactCard />
						<input type="checkbox" />
					</div>
					<div className={styles.card}>
						<ContactCard />
						<input type="checkbox" />
					</div>
					<div className={styles.card}>
						<ContactCard />
						<input type="checkbox" />
					</div>
					<div className={styles.card}>
						<ContactCard />
						<input type="checkbox" />
					</div>
					<div className={styles.card}>
						<ContactCard />
						<input type="checkbox" />
					</div>
					<div className={styles.card}>
						<ContactCard />
						<input type="checkbox" />
					</div>
					<div className={styles.card}>
						<ContactCard />
						<input type="checkbox" />
					</div>
					<div className={styles.card}>
						<ContactCard />
						<input type="checkbox" />
					</div>
					<div className={styles.card}>
						<ContactCard />
						<input type="checkbox" />
					</div>
					<div className={styles.card}>
						<ContactCard />
						<input type="checkbox" />
					</div>
					<div className={styles.card}>
						<ContactCard />
						<input type="checkbox" />
					</div>
					<div className={styles.card}>
						<ContactCard />
						<input type="checkbox" />
					</div>
					<div className={styles.card}>
						<ContactCard />
						<input type="checkbox" />
					</div>
					<div className={styles.card}>
						<ContactCard />
						<input type="checkbox" />
					</div>
					<div className={styles.card}>
						<ContactCard />
						<input type="checkbox" />
					</div>
					<div className={styles.card}>
						<ContactCard />
						<input type="checkbox" />
					</div>
					<div className={styles.card}>
						<ContactCard />
						<input type="checkbox" />
					</div>
					<div className={styles.card}>
						<ContactCard />
						<input type="checkbox" />
					</div>
					<div className={styles.card}>
						<ContactCard />
						<input type="checkbox" />
					</div>
					<div className={styles.card}>
						<ContactCard />
						<input type="checkbox" />
					</div>
					<div className={styles.card}>
						<ContactCard />
						<input type="checkbox" />
					</div>
					<div className={styles.card}>
						<ContactCard />
						<input type="checkbox" />
					</div>
					<div className={styles.card}>
						<ContactCard />
						<input type="checkbox" />
					</div>
					<div className={styles.card}>
						<ContactCard />
						<input type="checkbox" />
					</div>
					<div className={styles.card}>
						<ContactCard />
						<input type="checkbox" />
					</div>
					<div className={styles.card}>
						<ContactCard />
						<input type="checkbox" />
					</div>
				</div>
				<div className={styles.footer}>
					<div>
						<input type="checkbox" name="" id="vcf" />
						<label htmlFor="vcf">As combied VCF</label>
					</div>
					<button>Add Selected</button>
				</div>
			</div>
		</div>
	);
};

export default ShareContactDialogue;
