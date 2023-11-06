import { useState } from "react";
import styles from "./ProfileAndExtension.module.scss";
import EditExtension from "components/Extension";
import ProfileMenu from "components/Profile/ProfileMenu";
import { useSelector } from "react-redux";
import { nameIcon } from "utils";
import sip from "lib/sip";
import AboutRingplan from "components/Profile/AboutRingplan";
import { store } from "redux/store";

const ProfileAndExtension = () => {
	// const [isExtensionOpen, setIsExtensionOpen] = useState(false);
	// const [isEditBoxOpen, setIsEditBoxOpen] = useState(false);
	const [editExtension, setEditExtension] = useState(0);
  // editExtension
	const { extNumber, extAuth, apiAuth, extAuthList, aboutRingplan, isProfileOpen,  isExtensionOpen, isEditBoxOpen, status} = useSelector((state: any) => state.sip)
	// const extensionData = [
	// 	{ name: "Test 1", extension: 1001, active: true },
	// 	{ name: "Test 2", extension: 1002, active: false },
	// 	{ name: "Test 3", extension: 1003, active: false },
	// ];
  // displayname?: string,
  // outbound_server?: string,
  // password?: string,
  // server?: string,
  // user?: string,
  const { logoutPopUp} = useSelector((state: any) => state.sip)
	return (
		<div className={styles.profileExtension}>
			<span
				className={styles.extension}
				onClick={() => {
          store.dispatch({type:"sip/isExtensionOpen", payload:extAuth?false:!isExtensionOpen})
				}}>
				{extNumber ? extNumber : "Not Registered"}
			</span>
			<span
				className={styles.profile}
				onClick={() => {
					store.dispatch({type:"sip/isProfileOpen", payload:!isProfileOpen})
				}}>
				<span>{(apiAuth && nameIcon(apiAuth["displayname"])) || ( extNumber && extNumber[0])}</span>
				<svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
					<g id="user_status">
						<g clipPath="url(#clip0_2202_19106)">
							<circle id="Ellipse" cx="5" cy="5" r="4" fill={status.main_status == "available" ? "#75C322" : (status.main_status =="do_not_disturb" ? "rgb(238, 57, 57)" : "#91A0B5") } stroke="white" strokeWidth="2" />
						</g>
					</g>
					<defs>
						<clipPath id="clip0_2202_19106">
							<rect width="10" height="10" rx="5" fill="white" />
						</clipPath>
					</defs>
				</svg>
			</span>
			{isExtensionOpen && (
        <div>
          <div style={{position: "fixed",bottom: "0px",left: "0px",height: "100vh",width: "100%"}}
            onClick={()=>{store.dispatch({type:"sip/isProfileOpen", payload:false})}}>
          </div>
          <div className={styles.extensionBox}>
            <div className={styles.addExtension}>
              <span>Extension</span>
              {/* <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="line / plus">
                  <path
                    id="Vector"
                    d="M9 3.75V14.25M3.75 9H14.25"
                    stroke="#6C7A8B"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              </svg> */}
            </div>
            <div className={styles.extensionOption}  style={{ maxHeight: "50vh",  overflowY: "auto" }}>
              {extAuthList.map((item:any) => (
                <label
                  key={item.user}
                  className={styles.label}
                  onMouseOver={() => {
                    setEditExtension(item);
                    store.dispatch({type:"sip/editExtension", payload:item})
                  }}
                  onMouseOut={() => {
                    setEditExtension(0);
                  }}>
                  <input
                    onClick={() => {
                      store.dispatch({type:"sip/isExtensionOpen", payload:!isExtensionOpen})
                      // alert("change")//edit extension
                      sip.LoginWithAPI(item)
                    }}
                    type="radio"
                    className={`${styles.input} ${styles.option_input} ${styles.radio}`}
                    name="extension"
                    checked={item.user == extNumber ? true : false}
                  />
                  <div>
                    <p>{item.displayname}</p>
                    <span>{item.user}</span>
                    {/* {item.outbound_callerid?.number} */}
                  </div>
                  {editExtension === item && (
                    <span
                      className={styles.edit}
                      onClick={() => {
                        store.dispatch({type:"sip/isExtensionOpen", payload:false})
                        store.dispatch({type:"sip/isEditBoxOpen", payload:true})
                        // alert(item.user)//edit extension
                      }}
                      >
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="line / edit" clipPath="url(#clip0_2202_16656)">
                          <path
                            id="Vector"
                            d="M8.25 3.00005H3C2.60218 3.00005 2.22064 3.15808 1.93934 3.43939C1.65804 3.72069 1.5 4.10222 1.5 4.50005V15C1.5 15.3979 1.65804 15.7794 1.93934 16.0607C2.22064 16.342 2.60218 16.5 3 16.5H13.5C13.8978 16.5 14.2794 16.342 14.5607 16.0607C14.842 15.7794 15 15.3979 15 15V9.75005M13.875 1.87505C14.1734 1.57668 14.578 1.40906 15 1.40906C15.422 1.40906 15.8266 1.57668 16.125 1.87505C16.4234 2.17342 16.591 2.57809 16.591 3.00005C16.591 3.422 16.4234 3.82668 16.125 4.12505L9 11.25L6 12L6.75 9.00005L13.875 1.87505Z"
                            stroke="#6C7A8B"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_2202_16656">
                            <rect width="18" height="18" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </span>
                  )}
                </label>
              ))}
              {/* <label className={styles.label}>
                <input
                  type="radio"
                  className={`${styles.input} ${styles.option_input} ${styles.radio}`}
                  name="extension"
                  checked
                />
                <div>
                  <p>Valentyn S.</p>
                  <span>80984</span>
                </div>
                <span
                  className={styles.edit}
                  onClick={() => {
                    setIsExtensionOpen(!isExtensionOpen);
                  }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="line / edit" clipPath="url(#clip0_2202_16656)">
                      <path
                        id="Vector"
                        d="M8.25 3.00005H3C2.60218 3.00005 2.22064 3.15808 1.93934 3.43939C1.65804 3.72069 1.5 4.10222 1.5 4.50005V15C1.5 15.3979 1.65804 15.7794 1.93934 16.0607C2.22064 16.342 2.60218 16.5 3 16.5H13.5C13.8978 16.5 14.2794 16.342 14.5607 16.0607C14.842 15.7794 15 15.3979 15 15V9.75005M13.875 1.87505C14.1734 1.57668 14.578 1.40906 15 1.40906C15.422 1.40906 15.8266 1.57668 16.125 1.87505C16.4234 2.17342 16.591 2.57809 16.591 3.00005C16.591 3.422 16.4234 3.82668 16.125 4.12505L9 11.25L6 12L6.75 9.00005L13.875 1.87505Z"
                        stroke="#6C7A8B"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_2202_16656">
                        <rect width="18" height="18" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </span>
              </label>
              <label className={styles.label}>
                <input
                  type="radio"
                  className={`${styles.input} ${styles.option_input} ${styles.radio}`}
                  name="extension"
                />
                <div>
                  <p>Tine</p>
                  <span>312</span>
                </div>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="line / edit" clipPath="url(#clip0_2202_16656)">
                    <path
                      id="Vector"
                      d="M8.25 3.00005H3C2.60218 3.00005 2.22064 3.15808 1.93934 3.43939C1.65804 3.72069 1.5 4.10222 1.5 4.50005V15C1.5 15.3979 1.65804 15.7794 1.93934 16.0607C2.22064 16.342 2.60218 16.5 3 16.5H13.5C13.8978 16.5 14.2794 16.342 14.5607 16.0607C14.842 15.7794 15 15.3979 15 15V9.75005M13.875 1.87505C14.1734 1.57668 14.578 1.40906 15 1.40906C15.422 1.40906 15.8266 1.57668 16.125 1.87505C16.4234 2.17342 16.591 2.57809 16.591 3.00005C16.591 3.422 16.4234 3.82668 16.125 4.12505L9 11.25L6 12L6.75 9.00005L13.875 1.87505Z"
                      stroke="#6C7A8B"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_2202_16656">
                      <rect width="18" height="18" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </label>
              <label className={styles.label}>
                <input
                  type="radio"
                  className={`${styles.input} ${styles.option_input} ${styles.radio}`}
                  name="extension"
                />
                <div>
                  <p>Test ext</p>
                  <span>783</span>
                </div>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="line / edit" clipPath="url(#clip0_2202_16656)">
                    <path
                      id="Vector"
                      d="M8.25 3.00005H3C2.60218 3.00005 2.22064 3.15808 1.93934 3.43939C1.65804 3.72069 1.5 4.10222 1.5 4.50005V15C1.5 15.3979 1.65804 15.7794 1.93934 16.0607C2.22064 16.342 2.60218 16.5 3 16.5H13.5C13.8978 16.5 14.2794 16.342 14.5607 16.0607C14.842 15.7794 15 15.3979 15 15V9.75005M13.875 1.87505C14.1734 1.57668 14.578 1.40906 15 1.40906C15.422 1.40906 15.8266 1.57668 16.125 1.87505C16.4234 2.17342 16.591 2.57809 16.591 3.00005C16.591 3.422 16.4234 3.82668 16.125 4.12505L9 11.25L6 12L6.75 9.00005L13.875 1.87505Z"
                      stroke="#6C7A8B"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_2202_16656">
                      <rect width="18" height="18" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </label> */}
            </div>
          </div>
        </div>
			)}

			{isProfileOpen && !logoutPopUp &&  !aboutRingplan && <ProfileMenu extAuth={extAuth} />}

			{isEditBoxOpen && <EditExtension />}
		</div>
	);
};

export default ProfileAndExtension;