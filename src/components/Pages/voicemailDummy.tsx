import LayoutWrapper from "components/LayoutWrapper";
import Header from "components/Voicemail/Header";
import NoVoicemail from "components/Voicemail/NoVoicemail";
import style from "./voicemailDummy.module.scss";
import React from "react";

const VoicemailDummy = () => {
  return (
    <>
      <LayoutWrapper>
        <Header />
        {true && (
          <div className={style.noVoiceBox}>
            <NoVoicemail />
          </div>
        )}
      </LayoutWrapper>
    </>
  );
};

export default VoicemailDummy;
