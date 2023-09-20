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
            <span className='caption_2' style={{color: "var(--text-primary, #1F2023)"}}>Host</span>
            <span className='caption_2' style={{color: "var(--text-link, #1480E1)"}}>80984</span>
        </div>
    </div>
  )
}

export default MemberCard