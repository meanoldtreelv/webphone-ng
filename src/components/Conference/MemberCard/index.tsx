import styles from "./MemberCard.module.scss"

const MemberCard = () => {
  return (
    <div className={styles.card}>
        <div className={styles.cont1}>
            <span className={styles.memberInitials}>
                <span className={styles.initials}>VS</span>
            </span>
        </div>
        <div className={styles.cont2}>
            <p>Host</p>
            <span>80984</span>
        </div>
    </div>
  )
}

export default MemberCard