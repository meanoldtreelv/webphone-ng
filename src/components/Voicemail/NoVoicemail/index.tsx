import React from 'react'
import style from "./noVoicemail.module.scss" ;
const NoVoicemail = () => {
  return (
    <section className={style.noVoice}>
        <span><img src="/img/no_voicemails.png" alt="" /></span>
        <div className={`title_3_bold ${style.noVoice_boldText}`}>No Voicemails</div>
        <div className={`body ${style.noVoice_text}`}>When you have voicemails you’ll see them here</div>
    </section>
  )
}

export default NoVoicemail