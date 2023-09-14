import React from 'react'
import style from "./memberCard.module.scss"
const MemberCard = () => {
  return (
    <div className={style.card}>
        <div className={style.cont1}>
            <span className={style.memberInitials}>
                <span className={style.initials}>VS</span>
            </span>
        </div>
        <div className={style.cont2}>
            <span className='caption_2' style={{color: "var(--text-primary, #1F2023)"}}>Host</span>
            <span className='caption_2' style={{color: "var(--text-link, #1480E1)"}}>80984</span>
        </div>
    </div>
  )
}

export default MemberCard