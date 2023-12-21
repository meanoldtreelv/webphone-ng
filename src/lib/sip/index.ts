import {store} from '../../redux/store'
import * as SIP from 'sip.js'
import { setCookie, getCookie, deleteAllCookies } from 'utils';
import $ from "jquery";
import moment from "moment"

import Alert from "../../assets/media/Alert.mp3";
import Ringtone_1 from "../../assets/media/Ringtone_1.mp3";
import Speech_orig from "../../assets/media/speech_orig.mp3";
import Tone_Busy_UK from "../../assets/media/Tone_Busy-UK.mp3";
import Tone_Busy_US from "../../assets/media/Tone_Busy-US.mp3";
import Tone_CallWaiting from "../../assets/media/Tone_CallWaiting.mp3";
import Tone_Congestion_UK from "../../assets/media/Tone_Congestion-UK.mp3";
import Tone_Congestion_US from "../../assets/media/Tone_Congestion-US.mp3";
import Tone_EarlyMedia_Australia from "../../assets/media/Tone_EarlyMedia-Australia.mp3";
import Tone_EarlyMedia_European from "../../assets/media/Tone_EarlyMedia-European.mp3";
import Tone_EarlyMedia_Japan from "../../assets/media/Tone_EarlyMedia-Japan.mp3";
import Tone_EarlyMedia_UK from "../../assets/media/Tone_EarlyMedia-UK.mp3";
import Tone_EarlyMedia_US from "../../assets/media/Tone_EarlyMedia-US.mp3";
import io from "socket.io-client"
// Create User Agent
// =================
let userAgent:any = null;
let profileName = ""; // eg: Keyla James
let wssServer = ""; // eg: raspberrypi.local
let WebSocketPort = ""; // eg: 444 | 4443
let ServerPath = ""; // eg: /ws
let SipDomain = ""; // eg: raspberrypi.local
let SipUsername = ""; // eg: webrtc
let SipPassword = ""; // eg: webrtc

let TransportConnectionTimeout = 15; // The timeout in seconds for the initial connection to make on the web socket port
let TransportReconnectionAttempts = 999; // The number of times to attempt to reconnect to a WebSocket when the connection drops.
let TransportReconnectionTimeout = 3; // The time in seconds to wait between WebSocket reconnection attempts.

let BundlePolicy = "balanced"; // SDP Media Bundle: max-bundle | max-compat | balanced https://webrtcstandards.info/sdp-bundle/
let IceStunCheckTimeout = 500; // Set amount of time in milliseconds to wait for the ICE/STUN server
let ContactUserName = ""; // Optional name for contact header uri
let IpInContact = true; // Set a random IP address as the host value in the Contact header field and Via sent-by parameter. (Suggested for Asterisk)

let NoAnswerTimeout = 120; // Time in seconds before automatic Busy Here sent

let userAgentStr = "sipjs softphone"; // Set this to whatever you want.

let IceStunServerJson = ""; // Sets the JSON string for ice Server. Default: [{ "urls": "stun:stun.l.google.com:19302" }] Must be https://developer.mozilla.org/en-US/docs/Web/API/RTCConfiguration/iceServers

let RegisterContactParams = "{}"; // Parsable Json string of extra parameters added to contact URI during register. eg: '{"foo":"bar"}'
let WssInTransport = true; // Set the transport parameter to wss when used in SIP URIs. (Required for Asterisk as it doesn't support Path)

let RegisterExpires = 300; // Registration expiry time (in seconds)
let RegisterExtraHeaders = "{}"; // Parsable Json string of headers to include in register process. eg: '{"foo":"bar"}'
let RegisterExtraContactParams = "{}"; // Parsable Json string of extra parameters add to the end (after >) of contact header during register. eg: '{"foo":"bar"}'
let EnableVideoCalling = true; // Enables Video during a call
let DoNotDisturbEnabled = ()=>{return store.getState().sip.status.main_status ? store.getState().sip.status.main_status == "do_not_disturb" : false;} ; // Rejects any inbound call, while allowing outbound calls
let AutoAnswerEnabled = false; // Automatically answers the phone when the call comes in, if you are not on a call already
let IntercomPolicy = "enabled"; // disabled = feature is disabled | enabled = feature is always on
let EnableRingtone = true; // Enables a ring tone when an inbound call comes in.  (media/Ringtone_1.mp3)
let hostingPrefix = ""; // Use if hosting off root directory. eg: "/phone/" or "/static/"
let AutoGainControl = ()=>{return localStorage.getItem("audioAutoGainControl") ? localStorage.getItem("audioAutoGainControl") == "true" : true;} // Attempts to adjust the microphone volume to a good audio level. (OS may be better at this)
let EchoCancellation = ()=>{return localStorage.getItem("audioEchoCancellation") ? localStorage.getItem("audioEchoCancellation") == "true" : true;} // Attempts to remove echo over the line.
let NoiseSuppression = ()=>{return localStorage.getItem("audioNoiseSuppression") ? localStorage.getItem("audioNoiseSuppression") == "true" : true;} // Attempts to clear the call quality of noise.
let EnableAlphanumericDial = false; // Allows calling /[^\da-zA-Z\*\#\+\-\_\.\!\~\'\(\)]/g default is /[^\d\*\#\+]/g
let telNumericRegEx = /[^\d\*\#\+]/g;
let telAlphanumericRegEx = /[^\da-zA-Z\*\#\+\-\_\.\!\~\'\(\)]/g;
let MaxDidLength = 16; // Maximum length of any DID number including international dialled numbers.

let maxFrameRate = ""; // Suggests a frame rate to your webcam if possible.
let videoHeight = ""; // Suggests a video height (and therefor picture quality) to your webcam.
let videoAspectRatio = "1.33"; // Suggests an aspect ratio (1:1 = 1 | 4:3 = 0.75 | 16:9 = 0.5625) to your webcam.

let Lines = [];
let newLineNumber = 1;

let audioBlobs = {};
let CallWaitingEnabled = true; // Rejects any inbound call if you are on a call already.

let settingsMicrophoneStream = null;
let settingsMicrophoneStreamTrack = null;
let settingsMicrophoneSoundMeter = null;

let settingsVideoStream = null;
let settingsVideoStreamTrack = null;

let HasVideoDevice = false;
let HasAudioDevice = false;
let HasSpeakerDevice = false;
let AudioinputDevices = [];
let VideoinputDevices = [];
let SpeakerDevices = [];

let userInteractionForAudioPlayer = false;

const ringer = new Audio()
const ringerCallWaiting = new Audio()
ringer.loop = true;
ringerCallWaiting.loop = false;
ringer.preload = "auto";
ringerCallWaiting.preload = "auto";
if ( typeof ringer.sinkId !== "undefined" && getRingerOutputID() != "default") {
  ringer
    .setSinkId(getRingerOutputID())
    .then(function () {
      console.log("Set sinkId to:", getRingerOutputID());
    })
    .catch(function (e) {
      console.warn("Failed not apply setSinkId.", e);
    });
}
if ( typeof ringerCallWaiting.sinkId !== "undefined" && getRingerOutputID() != "default") {
  ringerCallWaiting
    .setSinkId(getRingerOutputID())
    .then(function () {
      console.log("Set sinkId to:", getRingerOutputID());
    })
    .catch(function (e) {
      console.warn("Failed not apply setSinkId.", e);
    });
}

$(window).on("beforeunload", function(event) {
  var CurrentCalls = countSessions(0);
  if(CurrentCalls > 0){
      console.warn("Warning, you have current calls open");
      // The best we can do is throw up a system alert question.
      event.preventDefault();
      return event.returnValue = "";
  }
  Unregister(true);
});
$(window).on("offline", function(){
  console.warn('Offline!');
  store.dispatch({type:"sip/sipRegistrationStatus", payload:"Disconnected from Web Socket!"})
  // $("#WebRtcFailed").show();
  // If there is an issue with the WS connection
  // We unregister, so that we register again once its up
  console.log("Disconnect Transport...");
  try{
      // userAgent.registerer.unregister();
      userAgent.transport.disconnect();
  } catch(e){
      // I know!!!
  }
});
$(window).on("online", function(){
  console.log('Online!');
  ReconnectTransport();
});
function PreloadAudioFiles() {
  audioBlobs.Alert = {
    file: "Alert.mp3",
    url: hostingPrefix + {Alert}['Alert'],
  };
  audioBlobs.Ringtone = {
    file: "Ringtone_1.mp3",
    url: hostingPrefix + {Ringtone_1}['Ringtone_1'],
  };
  audioBlobs.speech_orig = {
    file: "speech_orig.mp3",
    url: hostingPrefix + {Speech_orig}['Speech_orig'],
  };
  audioBlobs.Busy_UK = {
    file: "Tone_Busy-UK.mp3",
    url: hostingPrefix + {Tone_Busy_UK}['Tone_Busy_UK'],
  };
  audioBlobs.Busy_US = {
    file: "Tone_Busy-US.mp3",
    url: hostingPrefix + {Tone_Busy_US}['Tone_Busy_US'],
  };
  audioBlobs.CallWaiting = {
    file: "Tone_CallWaiting.mp3",
    url: hostingPrefix + {Tone_CallWaiting}['Tone_CallWaiting'],
  };
  audioBlobs.Congestion_UK = {
    file: "Tone_Congestion-UK.mp3",
    url: hostingPrefix + {Tone_Congestion_UK}['Tone_Congestion_UK'],
  };
  audioBlobs.Congestion_US = {
    file: "Tone_Congestion-US.mp3",
    url: hostingPrefix + {Tone_Congestion_US}['Tone_Congestion_US'],
  };
  audioBlobs.EarlyMedia_Australia = {
    file: "Tone_EarlyMedia-Australia.mp3",
    url: hostingPrefix + {Tone_EarlyMedia_Australia}['Tone_EarlyMedia_Australia'],
  };
  audioBlobs.EarlyMedia_European = {
    file: "Tone_EarlyMedia-European.mp3",
    url: hostingPrefix + {Tone_EarlyMedia_European}['Tone_EarlyMedia_European'],
  };
  audioBlobs.EarlyMedia_Japan = {
    file: "Tone_EarlyMedia-Japan.mp3",
    url: hostingPrefix + {Tone_EarlyMedia_Japan}['Tone_EarlyMedia_Japan'],
  };
  audioBlobs.EarlyMedia_UK = {
    file: "Tone_EarlyMedia-UK.mp3",
    url: hostingPrefix + {Tone_EarlyMedia_UK}['Tone_EarlyMedia_UK'],
  };
  audioBlobs.EarlyMedia_US = {
    file: "Tone_EarlyMedia-US.mp3",
    url:  hostingPrefix + {Tone_EarlyMedia_US}['Tone_EarlyMedia_US'],
  };

  $.each(audioBlobs, function (i, item) {
    var oReq = new XMLHttpRequest();
    oReq.open("GET", item.url, true);
    oReq.responseType = "blob";
    oReq.onload = function (oEvent) {
      var reader = new FileReader();
      reader.readAsDataURL(oReq.response);
      reader.onload = function () {
        item.blob = reader.result;
        if( i == "Ringtone") ringer.src = audioBlobs.Ringtone.blob;
        if( i == "CallWaiting") ringerCallWaiting.src = audioBlobs.CallWaiting.blob;
      };
    };
    oReq.send();
  });
  console.log(audioBlobs);
}
function ringerLoad(){
  ringer.oncanplaythrough = function (e) {
    // If there has been no interaction with the page at all... this page will not work
  };
  ringer.load();
}
function ringerCallWaitingLoad(){
  ringerCallWaiting.oncanplaythrough = function (e) {
    // If there has been no interaction with the page at all... this page will not work
  };
  ringerCallWaiting.load();
}
PreloadAudioFiles();
function getRingerOutputID() {
  if(localStorage.getItem("ringerDevice") && localStorage.getItem("ringerDevice")!=''){
    return localStorage.getItem("ringerDevice")
  }
  return "default";
}
function getAudioSrcID() {
  if(localStorage.getItem("microphoneDevice") && localStorage.getItem("microphoneDevice")!='' && localStorage.getItem("microphoneDevice")!="default"){
    return localStorage.getItem("microphoneDevice")
  }
  let device = "default"
  AudioinputDevices.forEach((element, index) => {
    console.log(element.label);
    if(element.label === "Headset earpiece"){
        console.log(element.deviceId);
        device = element.deviceId;
    }
  });
  return device;
}
function getAudioOutputID() {
  if(localStorage.getItem("speakerDevice") && localStorage.getItem("speakerDevice")!='' ){
    return localStorage.getItem("speakerDevice")
  }
  return "default";
}
function utcDateNow() {
  return moment().utc().format("YYYY-MM-DD HH:mm:ss UTC");
}
var Line = function (lineNumber, displayName, displayNumber) {
  this.LineNumber = lineNumber;
  this.DisplayName = displayName;
  this.DisplayNumber = displayNumber;
  this.IsSelected = false;
  this.SipSession = null;
  this.LocalSoundMeter = null;
  this.RemoteSoundMeter = null;
  this.status = null;
  this.ismute = 0;
  this.muteAfterAnswer = 0;
};
// function onRegisterFailed(response, cause) {
//   console.log("Registration Failed: " + response);
//   // alert("registration_failed" + ":" + response, "registration_failed");

//   userAgent.registering = false;

// }
// Incoming INVITE
function onInviteCancel(lineObj, response) {
  // Remote Party Canceled while ringing...

  // Check to see if this call has been completed elsewhere
  // https://github.com/InnovateAsterisk/Browser-Phone/issues/405
  var temp_cause = 0;
  var reason = response.headers["Reason"];
  if (reason !== undefined && reason.length > 0) {
    for (var i = 0; i < reason.length; i++) {
      var cause = reason[i].raw.toLowerCase().trim(); // Reason: Q.850 ;cause=16 ;text="Terminated"
      var items = cause.split(";");
      if (
        items.length >= 2 &&
        (items[0].trim() === "sip" || items[0].trim() === "q.850") &&
        items[1].includes("cause") &&
        cause.includes("call completed elsewhere")
      ) {
        temp_cause = parseInt(
          items[1].substring(items[1].indexOf("=") + 1).trim()
        );
        // No sample provided for "token"
        break;
      }
    }
  }

  lineObj.SipSession.data.terminateby = "them";
  lineObj.SipSession.data.reasonCode = temp_cause;
  if (temp_cause === 0) {
    lineObj.SipSession.data.reasonText = "Call Cancelled";
    console.log("Call canceled by remote party before answer");
  } else {
    lineObj.SipSession.data.reasonText = "Call completed elsewhere";
    console.log("Call completed elsewhere before answer");
  }

  lineObj.SipSession.dispose().catch(function (error) {
    console.log("Failed to dispose the cancel dialog", error);
  });
  store.dispatch({type:"sip/ringingInboundCalls", payload:{action:"remove",data:lineObj.LineNumber}})
  onInviteCanceled(lineObj.lineNumber);
  teardownSession(lineObj);
}
function Register() {
  try {
    if (userAgent === null) return;
    if (userAgent.registering === true) return;
    if (userAgent.isRegistered()) return;

    var RegistererRegisterOptions = {
      requestDelegate: {
        onReject: function (sip) {
          onRegisterFailed(sip.message.reasonPhrase, sip.message.statusCode);
        },
      },
    };

    console.log("Sending Registration...");
    store.dispatch({type:"sip/sipRegistrationStatus", payload:"Sending Registration..."})
    // document.getElementById("status").innerHTML = "Sending Registration...";
    userAgent.registering = true;
    userAgent.registerer.register(RegistererRegisterOptions);
  } catch (error) {}
}
function CreateUserAgent() {
  console.log("Creating User Agent...");
  store.dispatch({type:"sip/sipRegistrationStatus", payload:"Creating User Agent..."})
  // document.getElementById("status").innerHTML = "Creating User Agent...";
  if (
    SipDomain === null ||
    SipDomain === "" ||
    SipDomain === "null" ||
    SipDomain === "undefined"
  )
    SipDomain = wssServer; // Sets globally
  var options = {
    uri: SIP.UserAgent.makeURI("sip:" + SipUsername + "@" + SipDomain),
    transportOptions: {
      server: "wss://" + wssServer + ":" + WebSocketPort + "" + ServerPath,
      traceSip: false,
      connectionTimeout: TransportConnectionTimeout,
      // keepAliveInterval: 30 // Uncomment this and make this any number greater then 0 for keep alive...
      // NB, adding a keep alive will NOT fix bad internet, if your connection cannot stay open (permanent WebSocket Connection) you probably
      // have a router or ISP issue, and if your internet is so poor that you need to some how keep it alive with empty packets
      // upgrade you internet connection. This is voip we are talking about here.
    },
    sessionDescriptionHandlerFactoryOptions: {
      peerConnectionConfiguration: {
        bundlePolicy: BundlePolicy,
        // certificates: undefined,
        // iceCandidatePoolSize: 10,
        // iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
        // iceTransportPolicy: "all",
        // peerIdentity: undefined,
        // rtcpMuxPolicy: "require",
      },
      iceGatheringTimeout: IceStunCheckTimeout,
    },
    contactName: ContactUserName,
    displayName: profileName,
    authorizationUsername: SipUsername,
    authorizationPassword: SipPassword,
    hackIpInContact: IpInContact, // Asterisk should also be set to rewrite contact
    userAgentString: userAgentStr,
    autoStart: false,
    autoStop: true,
    register: false,
    noAnswerTimeout: NoAnswerTimeout,
    // sipExtension100rel: // UNSUPPORTED | SUPPORTED | REQUIRED NOTE: rel100 is not supported
    contactParams: {},
    delegate: {
      onInvite: function (sip) {
        ReceiveCall(sip);
      },
      onMessage: function (sip) {
        // ReceiveOutOfDialogMessage(sip);
      },
    },
  };
  if (IceStunServerJson !== "") {
    options.sessionDescriptionHandlerFactoryOptions.peerConnectionConfiguration.iceServers =
      JSON.parse(IceStunServerJson);
  }

  // Added to the contact BEFORE the '>' (permanent)
  if (
    RegisterContactParams &&
    RegisterContactParams !== "" &&
    RegisterContactParams !== "{}"
  ) {
    try {
      options.contactParams = JSON.parse(RegisterContactParams);
    } catch (e) {}
  }
  if (WssInTransport) {
    try {
      options.contactParams.transport = "wss";
    } catch (e) {}
  }

  // Add (Hardcode) other RTCPeerConnection({ rtcConfiguration }) config dictionary options here
  // https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/RTCPeerConnection
  // Example:
  // options.sessionDescriptionHandlerFactoryOptions.peerConnectionConfiguration.rtcpMuxPolicy = "require";

  userAgent = new SIP.UserAgent(options);
  userAgent.isRegistered = function () {
    return (
      userAgent &&
      userAgent.registerer &&
      userAgent.registerer.state === SIP.RegistererState.Registered
    );
  };
  // For some reason this is marked as private... not sure why
  userAgent.sessions = userAgent._sessions;
  userAgent.registrationCompleted = false;
  userAgent.registering = false;
  userAgent.transport.ReconnectionAttempts = TransportReconnectionAttempts;
  userAgent.transport.attemptingReconnection = false;
  userAgent.BlfSubs = [];
  userAgent.lastVoicemailCount = 0;

  console.log("Creating User Agent... Done");
  store.dispatch({type:"sip/sipRegistrationStatus", payload:"Creating User Agent... Done"})
  // document.getElementById("status").innerHTML = "Creating User Agent... Done";
  userAgent.transport.onConnect = function () {
    onTransportConnected();
  };
  userAgent.transport.onDisconnect = function (error) {
    if (error) {
      onTransportConnectError(error);
    } else {
      onTransportDisconnected();
    }
  };

  var RegistererOptions = {
    expires: RegisterExpires,
    extraHeaders: [],
    extraContactHeaderParams: [],
  };

  // Added to the SIP Headers
  if (
    RegisterExtraHeaders &&
    RegisterExtraHeaders !== "" &&
    RegisterExtraHeaders !== "{}"
  ) {
    try {
      var registerExtraHeaders = JSON.parse(RegisterExtraHeaders);
      for (const [key, value] of Object.entries(registerExtraHeaders)) {
        if (value !== "") {
          RegistererOptions.extraHeaders.push(key + ": " + value);
        }
      }
    } catch (e) {}
  }

  // Added to the contact AFTER the '>' (not permanent)
  if (
    RegisterExtraContactParams &&
    RegisterExtraContactParams !== "" &&
    RegisterExtraContactParams !== "{}"
  ) {
    try {
      var registerExtraContactParams = JSON.parse(RegisterExtraContactParams);
      for (const [key, value] of Object.entries(registerExtraContactParams)) {
        if (value === "") {
          RegistererOptions.extraContactHeaderParams.push(key);
        } else {
          RegistererOptions.extraContactHeaderParams.push(key + ":" + value);
        }
      }
    } catch (e) {}
  }

  userAgent.registerer = new SIP.Registerer(userAgent, RegistererOptions);
  console.log("Creating Registerer... Done");
  store.dispatch({type:"sip/sipRegistrationStatus", payload:"Creating Registerer... Done"})
  // document.getElementById("status").innerHTML = "Creating Registerer... Done";
  userAgent.registerer.stateChange.addListener(function (newState) {
    console.log("User Agent Registration State:", newState);
    store.dispatch({type:"sip/sipRegistrationStatus", payload:newState})
    // document.getElementById("status").innerHTML = newState;
    switch (newState) {
      case SIP.RegistererState.Initial:
        // Nothing to do
        break;
      case SIP.RegistererState.Registered:
        onRegistered();
        break;
      case SIP.RegistererState.Unregistered:
        onUnregistered();
        break;
      case SIP.RegistererState.Terminated:
        // Nothing to do
        break;
    }
  });

  console.log("User Agent Connecting to WebSocket...");
  store.dispatch({type:"sip/sipRegistrationStatus", payload:"User Agent Connecting to WebSocket..."})
  // document.getElementById("status").innerHTML = "User Agent Connecting to WebSocket...";
  userAgent.start().catch(function (error) {
    onTransportConnectError(error);
  });
}

// Transport Events
// ================
function onTransportConnected() {
  console.log("Connected to Web Socket!");
  store.dispatch({type:"sip/sipRegistrationStatus", payload:"Connected to Web Socket!"})
  // document.getElementById("status").innerHTML = "Connected to Web Socket!";
  // Reset the ReconnectionAttempts
  userAgent.isReRegister = false;
  userAgent.transport.attemptingReconnection = false;
  userAgent.transport.ReconnectionAttempts = TransportReconnectionAttempts;

  // Auto start register
  if (
    userAgent.transport.attemptingReconnection === false &&
    userAgent.registering === false
  ) {
    window.setTimeout(function () {
      Register();
    }, 500);
  } else {
    console.warn(
      "onTransportConnected: Register() called, but attemptingReconnection is true or registering is true"
    );
  }
}
function onTransportConnectError(error) {
  console.warn("WebSocket Connection Failed:", error);
  store.dispatch({type:"sip/sipRegistrationStatus", payload:"WebSocket Connection Failed"})

  // We set this flag here so that the re-register attempts are fully completed.
  userAgent.isReRegister = false;

  // If there is an issue with the WS connection
  // We unregister, so that we register again once its up
  console.log("Unregister...");
  store.dispatch({type:"sip/sipRegistrationStatus", payload:"Unregister..."})
  // document.getElementById("status").innerHTML = "Unregister...";
  try {
    userAgent.registerer.unregister();
  } catch (e) {
    // I know!!!
  }

  ReconnectTransport();

  // Custom Web hook
  if (typeof onTransportError !== "undefined")
    onTransportError(userAgent.transport, userAgent);
}
function onTransportDisconnected() {
  console.log("Disconnected from Web Socket!");
  store.dispatch({type:"sip/sipRegistrationStatus", payload:"Disconnected from Web Socket!"})
  // document.getElementById("status").innerHTML = "Disconnected from Web Socket!";
  userAgent.isReRegister = false;
}
function ReconnectTransport() {
  if (userAgent === null) return;

  userAgent.registering = false; // if the transport was down, you will not be registered
  if (userAgent.transport && userAgent.transport.isConnected()) {
    // Asked to re-connect, but ws is connected
    onTransportConnected();
    return;
  }
  console.log("Reconnect Transport...");
  store.dispatch({type:"sip/sipRegistrationStatus", payload:"Reconnect Transport..."})
  // document.getElementById("status").innerHTML = "Reconnect Transport...";

  window.setTimeout(function () {
    console.log("ReConnecting to WebSocket...");
    store.dispatch({type:"sip/sipRegistrationStatus", payload:"ReConnecting to WebSocket..."})
    // document.getElementById("status").innerHTML = "ReConnecting to WebSocket...";

    if (userAgent.transport && userAgent.transport.isConnected()) {
      // Already Connected
      onTransportConnected();
      return;
    } else {
      userAgent.transport.attemptingReconnection = true;
      userAgent.reconnect().catch(function (error) {
        userAgent.transport.attemptingReconnection = false;
        console.warn("Failed to reconnect", error);
        store.dispatch({type:"sip/sipRegistrationStatus", payload:"Failed to reconnect"})
        // document.getElementById("status").innerHTML = "Failed to reconnect";

        // Try Again
        if(userAgent.transport.ReconnectionAttempts > -1){
          ReconnectTransport();
        }else{
          console.log("Reconnect error");
          // document.body.innerHTML += `<div id="reconnectErrormodal" tabindex="-1" class="fixed top-0 w-full h-full place-content-center bg-modal left-0 right-0 p-4 overflow-x-hidden overflow-y-auto z-[999] md:inset-0 h-modal md:h-full dark:bg-[#222222] grid active-container">
          //   <div class="relative w-full h-full max-w-md md:h-auto">
          //     <div class="relative bg-white rounded-lg shadow p-8 dark:bg-[#161616]">
          //       <div>
          //         <h3 class="text-sm font-normal text-[#444444]">
          //         Sorry, We are unable to connect with the server.
          //         </h3>
          //       </div>

          //       <div class="flex gap-3 justify-center mt-4">
          //         <button onclick="location.reload();" type="button" class="text-white focus:ring-4 focus:outline-none font-medium rounded-lg inline-flex items-center px-8 py-2 text-center mr-2" style="background: #1480e1;">
          //          Try again
          //         </button>
          //         <button onclick='try{logout();}catch(e){location.href = "/"}' type="button" class="text-white focus:ring-4 focus:outline-none font-medium rounded-lg inline-flex items-center px-8 py-2 text-center mr-2" style="background: #0099d1 ;">
          //           Logout
          //         </button>
          //       </div>
          //     </div>
          //   </div>
          // </div>`;
        }
      });
    }
  }, TransportReconnectionTimeout * 1000);

  console.log(
    "Waiting to Re-connect...",
    TransportReconnectionTimeout,
    "Attempt remaining",
    userAgent.transport.ReconnectionAttempts
  );
  store.dispatch({type:"sip/sipRegistrationStatus", payload:"Waiting to Re-connect..."})
  // document.getElementById("status").innerHTML = "Waiting to Re-connect...";
  userAgent.transport.ReconnectionAttempts =
    userAgent.transport.ReconnectionAttempts - 1;
}
function onUnregistered() {
  if (userAgent.registrationCompleted) {
    console.log("Unregistered, bye!");
    store.dispatch({type:"sip/sipRegistrationStatus", payload:"Not Registered"});
    // document.getElementById("status").innerHTML = "Unregistered, bye!";
  } else {
    // Was never really registered, so cant really say unregistered
  }

  // We set this flag here so that the re-register attempts are fully completed.
  // userAgent.isReRegister = false; // Uncomment to stop Reregistering
  
}

function countSessions(id:number) {
  // console.log("ssssssssssssssssssssssssssssss",userAgent.sessions)
  var rtn = 0;
  if (userAgent === null) {
    console.warn("userAgent is null");
    return 0;
  }
  $.each(userAgent.sessions, function (i, session) {
    if (id !== session.id) rtn++;
  });
  return rtn;
}

// Phone Lines
// ===========

function endSession(lineNum:number) {
  var lineObj = FindLineByNumber(lineNum);
  if (lineObj === null || lineObj.SipSession === null) return;
  console.log("Ending call with: " + lineNum);
  lineObj.SipSession.data.terminateby = "us";
  lineObj.SipSession.data.reasonCode = 16;
  lineObj.SipSession.data.reasonText = "Normal Call clearing";

  lineObj.SipSession.bye().catch(function (e) {
    console.warn("Failed to bye the session!", e);
  });

  teardownSession(lineObj);
}
function RemoveLine(lineObj) {
  if (lineObj === null) return;
  var indexKey = lineObj.LineNumber;
  var earlyReject = lineObj.SipSession.data.earlyReject;
  for (var l = 0; l < Lines.length; l++) {
    if (Lines[l].LineNumber === lineObj.LineNumber) {
      Lines.splice(l, 1);
      break;
    }
  }
  BackgroundAvailable(0, true);
  removeCallFromCallSelectModal(indexKey);
}
// General end of Session
function teardownSession(lineObj) {
  if (lineObj === null || lineObj.SipSession === null) return;

  var session = lineObj.SipSession;
  if (session.data.teardownComplete === true) return;
  session.data.teardownComplete = true; // Run this code only once

  // Call UI
  if (session.data.earlyReject !== true) {
    console.log("HidePopup()");
  }

  // End any child calls
  if (!session.data.confcalls && session.data.childsession) {
    session.data.childsession
      .dispose()
      .then(function () {
        session.data.childsession = null;
      })
      .catch(function (error) {
        session.data.childsession = null;
        // Suppress message
      });
  }

  // Mixed Tracks
  if (
    session.data.AudioSourceTrack &&
    session.data.AudioSourceTrack.kind === "audio"
  ) {
    session.data.AudioSourceTrack.stop();
    session.data.AudioSourceTrack = null;
  }
  // Stop any Early Media
  if (session.data.earlyMedia) {
    session.data.earlyMedia.pause();
    session.data.earlyMedia.removeAttribute("src");
    session.data.earlyMedia.load();
    session.data.earlyMedia = null;
  }
  // Stop any ringing calls
  if (session.data.ringerObj) {
    session.data.ringerObj.pause();
    session.data.ringerObj.currentTime = 0;
    // session.data.ringerObj.removeAttribute("src");
    // session.data.ringerObj.load();
    // session.data.ringerObj = null;
  }

  // Make sure you have released the microphone
  if (
    session &&
    session.sessionDescriptionHandler &&
    session.sessionDescriptionHandler.peerConnection
  ) {
    var pc = session.sessionDescriptionHandler.peerConnection;
    pc.getSenders().forEach(function (RTCRtpSender) {
      if (RTCRtpSender.track && RTCRtpSender.track.kind === "audio") {
        RTCRtpSender.track.stop();
      }
    });
  }

  // End timers
  window.clearInterval(session.data.videoResampleInterval);
  if(!session.data.confcalls) window.clearInterval(session.data.callTimer);

  // Check if this call was missed
  if (session.data.calldirection === "inbound") {
    if (session.data.earlyReject) {
      // Call was rejected without even ringing
    } else if (
      session.data.terminateby === "them" &&
      session.data.startTime === null
    ) {
      // Call Terminated by them during ringing
      if (session.data.reasonCode === 0) {
        // Call was canceled, and not answered elsewhere
      }
    }
  }

  // Close up the UI
  window.setTimeout(function () {
    if(!session.data.confcalls){
      RemoveLine(lineObj);
    }
  }, 1000);
}
function FindLineByNumber(lineNum) {
  for (var l = 0; l < Lines.length; l++) {
    if (Lines[l].LineNumber === lineNum) return Lines[l];
  }
  return null;
}
// In-Session Call Functionality
// =============================

function cancelSession(lineNum) {
  var lineObj = FindLineByNumber(lineNum);
  if (lineObj === null || lineObj.SipSession === null) return;

  lineObj.SipSession.data.terminateby = "us";
  lineObj.SipSession.data.reasonCode = 0;
  lineObj.SipSession.data.reasonText = "Call Cancelled";

  console.log("Cancelling session : " + lineNum);
  if (
    lineObj.SipSession.state === SIP.SessionState.Initial ||
    lineObj.SipSession.state === SIP.SessionState.Establishing
  ) {
    lineObj.SipSession.cancel();
  } else {
    console.warn(
      "Session not in correct state for cancel.",
      lineObj.SipSession.state
    );
    console.log("Attempting teardown : " + lineNum);
    teardownSession(lineObj);
  }
  console.log("#line-" + lineNum + "-msg:" + "call_cancelled");
}
function holdSession(lineNum:number) {
  var lineObj = FindLineByNumber(lineNum);
  if (lineObj === null || lineObj.SipSession === null) return;
  var session = lineObj.SipSession;
  if (session.isOnHold === true) {
    console.log("Call is is already on hold:", lineNum);
    return;
  }
  console.log("Putting Call on hold:", lineNum);
  session.isOnHold = true;

  var sessionDescriptionHandlerOptions =
    session.sessionDescriptionHandlerOptionsReInvite;
  sessionDescriptionHandlerOptions.hold = true;
  session.sessionDescriptionHandlerOptionsReInvite =
    sessionDescriptionHandlerOptions;

  var options = {
    requestDelegate: {
      onAccept: function () {
        if (
          session &&
          session.sessionDescriptionHandler &&
          session.sessionDescriptionHandler.peerConnection
        ) {
          var pc = session.sessionDescriptionHandler.peerConnection;
          // Stop all the inbound streams
          pc.getReceivers().forEach(function (RTCRtpReceiver) {
            if (RTCRtpReceiver.track) RTCRtpReceiver.track.enabled = false;
          });
          // Stop all the outbound streams (especially useful for Conference Calls!!)
          pc.getSenders().forEach(function (RTCRtpSender) {
            // Mute Audio
            if (RTCRtpSender.track && RTCRtpSender.track.kind === "audio") {
              if (RTCRtpSender.track.IsMixedTrack === true) {
                if (
                  session.data.AudioSourceTrack &&
                  session.data.AudioSourceTrack.kind === "audio"
                ) {
                  console.log(
                    "Muting Mixed Audio Track : " +
                      session.data.AudioSourceTrack.label
                  );
                  session.data.AudioSourceTrack.enabled = false;
                }
              }
              console.log("Muting Audio Track : " + RTCRtpSender.track.label);
              RTCRtpSender.track.enabled = false;
            }
            // Stop Video
            else if (RTCRtpSender.track && RTCRtpSender.track.kind === "video") {
              RTCRtpSender.track.enabled = false;
            }
          });
        }
        session.isOnHold = true;
        console.log("Call is is on hold:", lineNum);

        // Log Hold
        if (!session.data.hold) session.data.hold = [];
        session.data.hold.push({ event: "hold", eventTime: utcDateNow() });

        store.dispatch({type:"sip/answeredCalls", payload:{action:"isHold",data:{lineNum:lineNum, isHold:true}}})
      },
      onReject: function () {
        session.isOnHold = false;
        console.warn("Failed to put the call on hold:", lineNum);
      },
    },
  };
  //uncomment this when hold started working
  // session.invite(options).catch(function (error) {
  //   session.isOnHold = false;
  //   console.warn("Error attempting to put the call on hold:", error);
  // });
  {//Remove this when hold started working
    if (
      session &&
      session.sessionDescriptionHandler &&
      session.sessionDescriptionHandler.peerConnection
    ) {
      var pc = session.sessionDescriptionHandler.peerConnection;
      // Stop all the inbound streams
      pc.getReceivers().forEach(function (RTCRtpReceiver) {
        if (RTCRtpReceiver.track) RTCRtpReceiver.track.enabled = false;
      });
      // Stop all the outbound streams (especially useful for Conference Calls!!)
      pc.getSenders().forEach(function (RTCRtpSender) {
        // Mute Audio
        if (RTCRtpSender.track && RTCRtpSender.track.kind === "audio") {
          if (RTCRtpSender.track.IsMixedTrack === true) {
            if (
              session.data.AudioSourceTrack &&
              session.data.AudioSourceTrack.kind === "audio"
            ) {
              console.log(
                "Muting Mixed Audio Track : " +
                  session.data.AudioSourceTrack.label
              );
              session.data.AudioSourceTrack.enabled = false;
            }
          }
          console.log("Muting Audio Track : " + RTCRtpSender.track.label);
          RTCRtpSender.track.enabled = false;
        }
        // Stop Video
        else if (RTCRtpSender.track && RTCRtpSender.track.kind === "video") {
          RTCRtpSender.track.enabled = false;
        }
      });
    }
    session.isOnHold = true;
    console.log("Call is is on hold:", lineNum);

    // Log Hold
    if (!session.data.hold) session.data.hold = [];
    session.data.hold.push({ event: "hold", eventTime: utcDateNow() });

    store.dispatch({type:"sip/answeredCalls", payload:{action:"isHold",data:{lineNum:lineNum, isHold:true}}})
  }
}
function unholdSession(lineNum:number) {
  var lineObj = FindLineByNumber(lineNum);
  if (lineObj === null || lineObj.SipSession === null) return;
  var session = lineObj.SipSession;
  if (session.isOnHold === false) {
    console.log("Call is already off hold:", lineNum);
    return;
  }
  console.log("Taking call off hold:", lineNum);
  session.isOnHold = false;

  var sessionDescriptionHandlerOptions =
    session.sessionDescriptionHandlerOptionsReInvite;
  sessionDescriptionHandlerOptions.hold = false;
  session.sessionDescriptionHandlerOptionsReInvite =
    sessionDescriptionHandlerOptions;

  var options = {
    requestDelegate: {
      onAccept: function () {
        if (
          session &&
          session.sessionDescriptionHandler &&
          session.sessionDescriptionHandler.peerConnection
        ) {
          var pc = session.sessionDescriptionHandler.peerConnection;
          // Restore all the inbound streams
          pc.getReceivers().forEach(function (RTCRtpReceiver) {
            if (RTCRtpReceiver.track) RTCRtpReceiver.track.enabled = true;
          });
          // Restore all the outbound streams
          pc.getSenders().forEach(function (RTCRtpSender) {
            // Unmute Audio
            if (RTCRtpSender.track && RTCRtpSender.track.kind === "audio") {
              if (RTCRtpSender.track.IsMixedTrack === true) {
                if (
                  session.data.AudioSourceTrack &&
                  session.data.AudioSourceTrack.kind === "audio"
                ) {
                  console.log(
                    "Unmuting Mixed Audio Track : " +
                      session.data.AudioSourceTrack.label
                  );
                  session.data.AudioSourceTrack.enabled = true;
                }
              }
              console.log("Unmuting Audio Track : " + RTCRtpSender.track.label);
              RTCRtpSender.track.enabled = true;
            } else if (
              RTCRtpSender.track &&
              RTCRtpSender.track.kind === "video"
            ) {
              RTCRtpSender.track.enabled = true;
            }
          });
        }
        session.isOnHold = false;
        console.log("Call is off hold:", lineNum);

        // Log Hold
        if (!session.data.hold) session.data.hold = [];
        session.data.hold.push({ event: "unhold", eventTime: utcDateNow() });

        store.dispatch({type:"sip/answeredCalls", payload:{action:"isHold",data:{lineNum:lineNum, isHold:false}}})
        session.data.ismute && MuteSession(lineNum) 
      },
      onReject: function () {
        session.isOnHold = true;
        console.warn("Failed to put the call on hold", lineNum);
      },
    },
  };
  //Uncomment this when hold started working
  // session.invite(options).catch(function (error) {
  //   session.isOnHold = true;
  //   console.warn("Error attempting to take to call off hold", error);
  // });
  {//Remove this when hold started working
    if (
      session &&
      session.sessionDescriptionHandler &&
      session.sessionDescriptionHandler.peerConnection
    ) {
      var pc = session.sessionDescriptionHandler.peerConnection;
      // Restore all the inbound streams
      pc.getReceivers().forEach(function (RTCRtpReceiver) {
        if (RTCRtpReceiver.track) RTCRtpReceiver.track.enabled = true;
      });
      // Restore all the outbound streams
      pc.getSenders().forEach(function (RTCRtpSender) {
        // Unmute Audio
        if (RTCRtpSender.track && RTCRtpSender.track.kind === "audio") {
          if (RTCRtpSender.track.IsMixedTrack === true) {
            if (
              session.data.AudioSourceTrack &&
              session.data.AudioSourceTrack.kind === "audio"
            ) {
              console.log(
                "Unmuting Mixed Audio Track : " +
                  session.data.AudioSourceTrack.label
              );
              session.data.AudioSourceTrack.enabled = true;
            }
          }
          console.log("Unmuting Audio Track : " + RTCRtpSender.track.label);
          RTCRtpSender.track.enabled = true;
        } else if (
          RTCRtpSender.track &&
          RTCRtpSender.track.kind === "video"
        ) {
          RTCRtpSender.track.enabled = true;
        }
      });
    }
    session.isOnHold = false;
    console.log("Call is off hold:", lineNum);

    // Log Hold
    if (!session.data.hold) session.data.hold = [];
    session.data.hold.push({ event: "unhold", eventTime: utcDateNow() });

    store.dispatch({type:"sip/answeredCalls", payload:{action:"isHold",data:{lineNum:lineNum, isHold:false}}})
    session.data.ismute && MuteSession(lineNum) 
  } 
}
function MuteSession(lineNum:number) {
  var lineObj = FindLineByNumber(lineNum);
  if (lineObj === null || lineObj.SipSession === null) return;

  var session = lineObj.SipSession;
  var pc = session.sessionDescriptionHandler.peerConnection;
  pc.getSenders().forEach(function (RTCRtpSender) {
    if (RTCRtpSender.track && RTCRtpSender.track.kind === "audio") {
      // if (RTCRtpSender.track.IsMixedTrack === true) {
      //   if (
      //     session.data.AudioSourceTrack &&
      //     session.data.AudioSourceTrack.kind === "audio"
      //   ) {
      //     console.log(
      //       "Muting Mixed Audio Track : " + session.data.AudioSourceTrack.label
      //     );
      //     session.data.AudioSourceTrack.enabled = false;
      //   }
      // }
      if(RTCRtpSender.track.IsMixedTrack === true){
        session.data.AudioSourceTrack.enabled = false;    
      }else{
        console.log("Muting Audio Track : " + RTCRtpSender.track.label);
        RTCRtpSender.track.enabled = false;    
      }
    }
  });

  if (!session.data.mute) session.data.mute = [];
  session.data.mute.push({ event: "mute", eventTime: utcDateNow() });
  session.data.ismute = true;
  lineObj.ismute = 1;

  store.dispatch({type:"sip/answeredCalls", payload:{action:"isMute",data:{lineNum:lineNum, isMute:true}}})
  store.dispatch({type:"sip/ringingOutboundCalls", payload:{action:"isMute",data:{lineNum:lineNum, isMute:true}}})
  console.log("#line-" + lineNum + "-msg:" + "call_on_mute");
}
function UnmuteSession(lineNum:number) {
  var lineObj = FindLineByNumber(lineNum);
  if (lineObj === null || lineObj.SipSession === null) return;

  var session = lineObj.SipSession;
  var pc = session.sessionDescriptionHandler.peerConnection;
  pc.getSenders().forEach(function (RTCRtpSender) {
    if (RTCRtpSender.track && RTCRtpSender.track.kind === "audio") {
      // if (RTCRtpSender.track.IsMixedTrack === true) {
      //   if (
      //     session.data.AudioSourceTrack &&
      //     session.data.AudioSourceTrack.kind === "audio"
      //   ) {
      //     console.log(
      //       "Unmuting Mixed Audio Track : " +
      //         session.data.AudioSourceTrack.label
      //     );
      //     session.data.AudioSourceTrack.enabled = true;
      //   }
      // }
      if(RTCRtpSender.track.IsMixedTrack === true){
        session.data.AudioSourceTrack.enabled = true;
      }else{
        console.log("Unmuting Audio Track : " + RTCRtpSender.track.label);
        RTCRtpSender.track.enabled = true;
      }
    }
  });

  if (!session.data.mute) session.data.mute = [];
  session.data.mute.push({ event: "unmute", eventTime: utcDateNow() });
  session.data.ismute = false;
  lineObj.ismute = 0;

  store.dispatch({type:"sip/answeredCalls", payload:{action:"isMute",data:{lineNum:lineNum, isMute:false}}})
  store.dispatch({type:"sip/ringingOutboundCalls", payload:{action:"isMute",data:{lineNum:lineNum, isMute:false}}})
  console.log("#line-" + lineNum + "-msg:" + "call_off_mute");
}

function sendDTMF(lineNum:number, itemStr:string) {
  var lineObj = FindLineByNumber(lineNum);
  if (lineObj === null || lineObj.SipSession === null) return;

  // https://developer.mozilla.org/en-US/docs/Web/API/RTCDTMFSender/insertDTMF
  var options = {
    duration: 100,
    interToneGap: 70,
  };

  if (lineObj.SipSession.isOnHold === true) {
    if (lineObj.SipSession.data.childsession) {
      if (
        lineObj.SipSession.data.childsession.state ==
        SIP.SessionState.Established
      ) {
        console.log(
          "Sending DTMF (" +
            itemStr +
            "): " +
            lineObj.LineNumber +
            " child session"
        );

        var result =
          lineObj.SipSession.data.childsession.sessionDescriptionHandler.sendDtmf(
            itemStr,
            options
          );
        if (result) {
          console.log("Sent DTMF (" + itemStr + ") child session");
        } else {
          console.log("Failed to send DTMF (" + itemStr + ") child session");
        }
      } else {
        console.warn(
          "Cannot Send DTMF (" +
            itemStr +
            "): " +
            lineObj.LineNumber +
            " is on hold, and the child session is not established"
        );
      }
    } else {
      console.warn(
        "Cannot Send DTMF (" +
          itemStr +
          "): " +
          lineObj.LineNumber +
          " is on hold, and there is no child session"
      );
    }
  } else {
    if (
      lineObj.SipSession.state === SIP.SessionState.Established ||
      lineObj.SipSession.state === SIP.SessionState.Establishing
    ) {
      console.log("Sending DTMF (" + itemStr + "): " + lineObj.LineNumber);

      var result = lineObj.SipSession.sessionDescriptionHandler.sendDtmf(
        itemStr,
        options
      );
      if (result) {
        console.log("Sent DTMF (" + itemStr + ")");
      } else {
        console.log("Failed to send DTMF (" + itemStr + ")");
      }

      console.log(
        "#line-" + lineNum + "-msg:" + "send_dtmf" + ": " + "itemStr"
      );

      // Custom Web hook
      if (typeof onDTMF !== "undefined") onDTMF(itemStr, lineNum);
    } else {
      console.warn(
        "Cannot Send DTMF (" +
          itemStr +
          "): " +
          lineObj.LineNumber +
          " session is not establishing or established"
      );
    }
  }
}
// General Session delegates
function onSessionReceivedBye(lineObj, response) {
  // They Ended the call
  console.log("Call ended, bye!");
  console.log(lineObj.LineNumber);
  // document.getElementById("statusReceiveCall").innerHTML = "Call ended, bye!";

  lineObj.SipSession.data.terminateby = "them";
  lineObj.SipSession.data.reasonCode = 16;
  lineObj.SipSession.data.reasonText = "Normal Call clearing";


  response.accept(); // Send OK
  if(lineObj.SipSession.data.confcalls){
    lineObj.SipSession.data.disposed = true
  }else{
    store.dispatch({type:"sip/answeredCalls", payload:{action:"remove",data:lineObj.LineNumber}})
  }
  SelectLine(store.getState().sip.activeCallLineNumber)
  teardownSession(lineObj);
  haveActiveCall(lineObj.LineNumber)
  // onCallEndByOtherSide(lineObj.LineNumber);
}

function onSessionReceivedMessage(lineObj, response) {
  var messageType =
    response.request.headers["Content-Type"].length >= 1
      ? response.request.headers["Content-Type"][0].parsed
      : "Unknown";
  if (messageType.indexOf("application/x-asterisk-confbridge-event") > -1) {
    // Conference Events JSON
    var msgJson = JSON.parse(response.request.body);

    var session = lineObj.SipSession;
    if (!session.data.ConfbridgeChannels) session.data.ConfbridgeChannels = [];
    if (!session.data.ConfbridgeEvents) session.data.ConfbridgeEvents = [];

    if (msgJson.type === "ConfbridgeStart") {
      console.log("ConfbridgeStart!");
    } else if (msgJson.type === "ConfbridgeWelcome") {
      console.log("Welcome to the Asterisk Conference");
      console.log("Bridge ID:", msgJson.bridge.id);
      console.log("Bridge Name:", msgJson.bridge.name);
      console.log("Created at:", msgJson.bridge.creationtime);
      console.log("Video Mode:", msgJson.bridge.video_mode);

      session.data.ConfbridgeChannels = msgJson.channels; // Write over this
      session.data.ConfbridgeChannels.forEach(function (chan) {
        // The mute and unmute status doesn't appear to be a realtime state, only what the
        // startmuted= setting of the default profile is.
        console.log(
          chan.caller.name,
          "Is in the conference. Muted:",
          chan.muted,
          "Admin:",
          chan.admin
        );
      });
    } else if (msgJson.type === "ConfbridgeJoin") {
      msgJson.channels.forEach(function (chan) {
        var found = false;
        session.data.ConfbridgeChannels.forEach(function (existingChan) {
          if (existingChan.id === chan.id) found = true;
        });
        if (!found) {
          session.data.ConfbridgeChannels.push(chan);
          session.data.ConfbridgeEvents.push({
            event:
              chan.caller.name +
              " (" +
              chan.caller.number +
              ") joined the conference",
            eventTime: utcDateNow(),
          });
          console.log(
            chan.caller.name,
            "Joined the conference. Muted: ",
            chan.muted
          );
        }
      });
    } else if (msgJson.type === "ConfbridgeLeave") {
      msgJson.channels.forEach(function (chan) {
        session.data.ConfbridgeChannels.forEach(function (existingChan, i) {
          if (existingChan.id === chan.id) {
            session.data.ConfbridgeChannels.splice(i, 1);
            console.log(chan.caller.name, "Left the conference");
            session.data.ConfbridgeEvents.push({
              event:
                chan.caller.name +
                " (" +
                chan.caller.number +
                ") left the conference",
              eventTime: utcDateNow(),
            });
          }
        });
      });
    } else if (msgJson.type === "ConfbridgeTalking") {
      var videoContainer = $("#line-" + lineObj.LineNumber + "-remote-videos");
      if (videoContainer) {
        msgJson.channels.forEach(function (chan) {
          videoContainer.find("video").each(function () {
            if (this.srcObject.channel && this.srcObject.channel === chan.id) {
              if (chan.talking_status === "on") {
                console.log(chan.caller.name, "is talking.");
                this.srcObject.isTalking = true;
                $(this).css("border", "1px solid red");
              } else {
                console.log(chan.caller.name, "stopped talking.");
                this.srcObject.isTalking = false;
                $(this).css("border", "1px solid transparent");
              }
            }
          });
        });
      }
    } else if (msgJson.type === "ConfbridgeMute") {
      msgJson.channels.forEach(function (chan) {
        session.data.ConfbridgeChannels.forEach(function (existingChan) {
          if (existingChan.id === chan.id) {
            console.log(existingChan.caller.name, "is now muted");
            existingChan.muted = true;
          }
        });
      });
      RedrawStage(lineObj.LineNumber, false);
    } else if (msgJson.type === "ConfbridgeUnmute") {
      msgJson.channels.forEach(function (chan) {
        session.data.ConfbridgeChannels.forEach(function (existingChan) {
          if (existingChan.id === chan.id) {
            console.log(existingChan.caller.name, "is now unmuted");
            existingChan.muted = false;
          }
        });
      });
      RedrawStage(lineObj.LineNumber, false);
    } else if (msgJson.type === "ConfbridgeEnd") {
      console.log("The Asterisk Conference has ended, bye!");
    } else {
      console.warn("Unknown Asterisk Conference Event:", msgJson.type, msgJson);
    }
    response.accept();
  } else if (
    messageType.indexOf("application/x-myphone-confbridge-chat") > -1
  ) {
    console.log("x-myphone-confbridge-chat", response);

    response.accept();
  } else {
    console.warn("Unknown message type");
    response.reject();
  }
}
// Device Detection
// ================
function DetectDevices() {
  try {
    navigator.mediaDevices
    .enumerateDevices()
    .then(function (deviceInfos) {
      // deviceInfos will not have a populated lable unless to accept the permission
      // during getUserMedia. This normally happens at startup/setup
      // so from then on these devices will be with lables.
      HasVideoDevice = false;
      HasAudioDevice = false;
      HasSpeakerDevice = false; // Safari and Firefox don't have these
      AudioinputDevices = [];
      VideoinputDevices = [];
      SpeakerDevices = [];
      store.dispatch({type:"sip/microphoneDevice", payload:{action:"removeAll" } })
      store.dispatch({type:"sip/speakerDevice", payload:{action:"removeAll" }  })
      for (var i = 0; i < deviceInfos.length; ++i) {
        if (deviceInfos[i].kind === "audioinput") {
          HasAudioDevice = true;
          AudioinputDevices.push(deviceInfos[i]);
          store.dispatch({type:"sip/microphoneDevice", payload:{action:"add",data: deviceInfos[i].toJSON() } })
        } else if (deviceInfos[i].kind === "audiooutput") {
          HasSpeakerDevice = true;
          SpeakerDevices.push(deviceInfos[i]);
          store.dispatch({type:"sip/speakerDevice", payload:{action:"add",data: deviceInfos[i].toJSON() }  })
        } else if (deviceInfos[i].kind === "videoinput") {
          if (EnableVideoCalling === true) {
            HasVideoDevice = true;
            VideoinputDevices.push(deviceInfos[i]);
          }
        }
      }
      store.dispatch({type:"sip/hasSpeakerDevice", payload: HasSpeakerDevice})
      store.dispatch({type:"sip/hasAudioDevice", payload: HasAudioDevice})
    })
    .catch(function (e) {
      console.error("Error enumerating devices", e);
    });
  } catch (error) { 
  }
}
DetectDevices();
window.setInterval(function () {
  DetectDevices();
}, 10000);

function AddLineHtml(lineObj:{LineNumber:number}) {
  var html = "";
  // Remote Audio Object
  html += '<div style="display:none;">';
  html += '<audio id="line-' + lineObj.LineNumber + '-remoteAudio"></audio>';
  html +=
    '<audio id="line-' +
    lineObj.LineNumber +
    '-transfer-remoteAudio" style="display:none"></audio>';
  html += "</div>";
  $("#softphone").append(html);
  // alert(lineObj.LineNumber)
}
function SwitchLines(lineNum:number) {
  var lineObj = FindLineByNumber(lineNum);
  var objSession = (lineObj !== null && lineObj.SipSession !== null) ? lineObj.SipSession:null;
  $.each(userAgent.sessions, function (i, session) {
    // All the other calls, not on hold
    if(!session.data.line) return;
    if (session.state === SIP.SessionState.Established && session.data.line !== lineNum) {
      if(!(objSession&&objSession?.data?.mergedCalls?.list&&objSession?.data.mergedCalls.list.indexOf(session.data.line)!== -1)){
        if(session.data.confcalls){
          sip.muteConference(session.data.line, false)
          sip.volumeLevel(session.data.line, "0")
        }else if (session.isOnHold === false) {
          holdSession(session.data.line);
        }
      }else{
        // alert("skipping"+session.data.line)
      }
    }
    session.data.IsCurrentCall = false;
  });


  if (objSession) {
    if (objSession.state === SIP.SessionState.Established) {
      if(objSession.data.confcalls){
        sip.muteConference(lineNum, true)
        sip.volumeLevel(lineNum, "100")
      }else if (objSession.isOnHold === true) {
        if(objSession&&objSession?.data?.mergedCalls?.list){
          for(let x = 0; x < objSession.data.mergedCalls?.list?.length ; x++){
            // alert("Unholding"+objSession.data.mergedCalls.list[x])
            unholdSession(objSession.data.mergedCalls.list[x]);
          }
        }else{
          unholdSession(lineNum);
        }
      }
    }
    objSession.data.IsCurrentCall = true;
  }
}
function SelectLine(lineNum:number) {
  var lineObj = FindLineByNumber(lineNum);
  if (lineObj === null) return;

  store.dispatch({type:"sip/activeCallLineNumber", payload:lineNum})
  var displayLineNumber = 0;
  for (var l = 0; l < Lines.length; l++) {
    if (Lines[l].LineNumber === lineObj.LineNumber) displayLineNumber = l + 1;
    if (
      Lines[l].IsSelected === true &&
      Lines[l].LineNumber === lineObj.LineNumber
    ) {
      // Nothing to do, you re-selected the same buddy;
      return;
    }
  }

  console.log("Selecting Line : " + lineObj.LineNumber);
  // Switch the SIP Sessions
  SwitchLines(lineObj.LineNumber);

  // Update Lines List
  for (var l = 0; l < Lines.length; l++) {
    // var classStr =
    //   Lines[l].LineNumber === lineObj.LineNumber ? "buddySelected" : "buddy";
    // if (Lines[l].SipSession !== null)
    //   classStr = Lines[l].SipSession.isOnHold
    //     ? "buddyActiveCallHollding"
    //     : "buddyActiveCall";

    Lines[l].IsSelected = Lines[l].LineNumber === lineObj.LineNumber;
  }
}
function formatShortDuration(seconds) {
  var sec = Math.floor(parseFloat(seconds));
  if (sec < 0) {
    return sec;
  } else if (sec >= 0 && sec < 60) {
    return "00:" + (sec > 9 ? sec : "0" + sec);
  } else if (sec >= 60 && sec < 60 * 60) {
    // greater then a minute and less then an hour
    var duration = moment.duration(sec, "seconds");
    return (
      (duration.minutes() > 9 ? duration.minutes() : "0" + duration.minutes()) +
      ":" +
      (duration.seconds() > 9 ? duration.seconds() : "0" + duration.seconds())
    );
  } else if (sec >= 60 * 60 && sec < 24 * 60 * 60) {
    // greater than an hour and less then a day
    var duration = moment.duration(sec, "seconds");
    return (
      (duration.hours() > 9 ? duration.hours() : "0" + duration.hours()) +
      ":" +
      (duration.minutes() > 9 ? duration.minutes() : "0" + duration.minutes()) +
      ":" +
      (duration.seconds() > 9 ? duration.seconds() : "0" + duration.seconds())
    );
  }
  //  Otherwise.. this is just too long
}
function onSessionDescriptionHandlerCreated(
  lineObj,
  sdh,
  provisional,
  includeVideo
) {
  if (sdh) {
    if (sdh.peerConnection) {
      // console.log(sdh);
      sdh.peerConnection.ontrack = function (event) {
        // console.log(event);
        onTrackAddedEvent(lineObj, includeVideo);
      };
      // sdh.peerConnectionDelegate = {
      //     ontrack: function(event){
      //         console.log(event);
      //         onTrackAddedEvent(lineObj, includeVideo);
      //     }
      // }
    } else {
      console.warn(
        "onSessionDescriptionHandler fired without a peerConnection"
      );
    }
  } else {
    console.warn(
      "onSessionDescriptionHandler fired without a sessionDescriptionHandler"
    );
  }
}
function onTrackAddedEvent(lineObj, includeVideo) {
  // Gets remote tracks
  var session = lineObj.SipSession;
  // TODO: look at detecting video, so that UI switches to audio/video automatically.

  var pc = session.sessionDescriptionHandler.peerConnection;

  var remoteAudioStream = new MediaStream();
  var remoteVideoStream = new MediaStream();

  pc.getTransceivers().forEach(function (transceiver) {
    // Add Media
    var receiver = transceiver.receiver;
    if (receiver.track) {
      if (receiver.track.kind === "audio") {
        console.log("Adding Remote Audio Track");
        remoteAudioStream.addTrack(receiver.track);
      }
      if (includeVideo && receiver.track.kind === "video") {
        if (transceiver.mid) {
          receiver.track.mid = transceiver.mid;
          console.log(
            "Adding Remote Video Track - ",
            receiver.track.readyState,
            "MID:",
            receiver.track.mid
          );
          remoteVideoStream.addTrack(receiver.track);
        }
      }
    }
  });

  // Attach Audio
  if (remoteAudioStream.getAudioTracks().length >= 1) {
    var remoteAudio = $("#line-" + lineObj.LineNumber + "-remoteAudio").get(0);
    remoteAudio.srcObject = remoteAudioStream;
    remoteAudio.onloadedmetadata = function (e) {
      if (typeof remoteAudio.sinkId !== "undefined") {
        remoteAudio
          .setSinkId(getAudioOutputID())
          .then(function () {
            console.log("sinkId applied: " + getAudioOutputID());
            store.dispatch({type:"sip/answeredCalls", payload:{action:"callSpeakerDevice",data:{lineNum:lineObj.LineNumber, callSpeakerDevice:getAudioOutputID()}}});
          })
          .catch(function (e) {
            console.warn("Error using setSinkId: ", e);
          });
      }
      remoteAudio.play();
    };
  }

  if (includeVideo) {
    // Single Or Multiple View
    $("#line-" + lineObj.LineNumber + "-remote-videos").empty();
    if (remoteVideoStream.getVideoTracks().length >= 1) {
      var remoteVideoStreamTracks = remoteVideoStream.getVideoTracks();
      remoteVideoStreamTracks.forEach(function (remoteVideoStreamTrack) {
        var thisRemoteVideoStream = new MediaStream();
        thisRemoteVideoStream.trackID = remoteVideoStreamTrack.id;
        thisRemoteVideoStream.mid = remoteVideoStreamTrack.mid;
        remoteVideoStreamTrack.onended = function () {
          console.log("Video Track Ended: ", this.mid);
          RedrawStage(lineObj.LineNumber, true);
        };
        thisRemoteVideoStream.addTrack(remoteVideoStreamTrack);

        var wrapper = $("<span />", {
          class: "VideoWrapper",
        });
        wrapper.css("width", "1px");
        wrapper.css("heigh", "1px");
        wrapper.hide();

        var callerID = $("<div />", {
          class: "callerID",
        });
        wrapper.append(callerID);

        var Actions = $("<div />", {
          class: "Actions",
        });
        wrapper.append(Actions);

        var videoEl = $("<video />", {
          id: remoteVideoStreamTrack.id,
          mid: remoteVideoStreamTrack.mid,
          muted: true,
          autoplay: true,
          playsinline: true,
          controls: false,
        });
        videoEl.hide();

        var videoObj = videoEl.get(0);
        videoObj.srcObject = thisRemoteVideoStream;
        videoObj.onloadedmetadata = function (e) {
          // videoObj.play();
          videoEl.show();
          videoEl.parent().show();
          console.log("Playing Video Stream MID:", thisRemoteVideoStream.mid);
          RedrawStage(lineObj.LineNumber, true);
        };
        wrapper.append(videoEl);

        $("#line-" + lineObj.LineNumber + "-remote-videos").append(wrapper);

        console.log("Added Video Element MID:", thisRemoteVideoStream.mid);
      });
    } else {
      console.log("No Video Streams");
      RedrawStage(lineObj.LineNumber, true);
    }
  }
}
function onSessionReinvited(lineObj, response) {
  // This may be used to include video streams
  var sdp = response.body;

  // All the possible streams will get
  // Note, this will probably happen after the streams are added
  lineObj.SipSession.data.videoChannelNames = [];
  var videoSections = sdp.split("m=video");
  if (videoSections.length >= 1) {
    for (var m = 0; m < videoSections.length; m++) {
      if (
        videoSections[m].indexOf("a=mid:") > -1 &&
        videoSections[m].indexOf("a=label:") > -1
      ) {
        // We have a label for the media
        var lines = videoSections[m].split("\r\n");
        var channel = "";
        var mid = "";
        for (var i = 0; i < lines.length; i++) {
          if (lines[i].indexOf("a=label:") === 0) {
            channel = lines[i].replace("a=label:", "");
          }
          if (lines[i].indexOf("a=mid:") === 0) {
            mid = lines[i].replace("a=mid:", "");
          }
        }
        lineObj.SipSession.data.videoChannelNames.push({
          mid: mid,
          channel: channel,
        });
      }
    }
    console.log(
      "videoChannelNames:",
      lineObj.SipSession.data.videoChannelNames
    );
    RedrawStage(lineObj.LineNumber, false);
  }
}
function RedrawStage(lineNum, videoChanged) {
  return;
  var stage = $("#line-" + lineNum + "-VideoCall");
  var container = $("#line-" + lineNum + "-stage-container");
  var previewContainer = $("#line-" + lineNum + "-preview-container");
  var videoContainer = $("#line-" + lineNum + "-remote-videos");

  var lineObj = FindLineByNumber(lineNum);
  if (lineObj === null) return;
  var session = lineObj.SipSession;
  if (session === null) return;

  var isVideoPinned = false;
  var pinnedVideoID = "";

  // Preview Area
  previewContainer.find("video").each(function (i, video) {
    $(video).hide();
  });
  previewContainer.css("width", "");

  // Count and Tag Videos
  var videoCount = 0;
  videoContainer.find("video").each(function (i, video) {
    var thisRemoteVideoStream = video.srcObject;
    var videoTrack = thisRemoteVideoStream.getVideoTracks()[0];
    var videoTrackSettings = videoTrack.getSettings();
    var srcVideoWidth = videoTrackSettings.width
      ? videoTrackSettings.width
      : video.videoWidth;
    var srcVideoHeight = videoTrackSettings.height
      ? videoTrackSettings.height
      : video.videoHeight;

    if (thisRemoteVideoStream.mid) {
      thisRemoteVideoStream.channel = "unknown"; // Asterisk Channel
      thisRemoteVideoStream.CallerIdName = "";
      thisRemoteVideoStream.CallerIdNumber = "";
      thisRemoteVideoStream.isAdminMuted = false;
      thisRemoteVideoStream.isAdministrator = false;
      if (session && session.data && session.data.videoChannelNames) {
        session.data.videoChannelNames.forEach(function (videoChannelName) {
          if (thisRemoteVideoStream.mid === videoChannelName.mid) {
            thisRemoteVideoStream.channel = videoChannelName.channel;
          }
        });
      }
      if (session && session.data && session.data.ConfbridgeChannels) {
        session.data.ConfbridgeChannels.forEach(function (ConfbridgeChannel) {
          if (ConfbridgeChannel.id === thisRemoteVideoStream.channel) {
            thisRemoteVideoStream.CallerIdName = ConfbridgeChannel.caller.name;
            thisRemoteVideoStream.CallerIdNumber =
              ConfbridgeChannel.caller.number;
            thisRemoteVideoStream.isAdminMuted = ConfbridgeChannel.muted;
            thisRemoteVideoStream.isAdministrator = ConfbridgeChannel.admin;
          }
        });
      }
      // console.log("Track MID :", thisRemoteVideoStream.mid, thisRemoteVideoStream.channel);
    }

    // Remove any in the preview area
    if (videoChanged) {
      $("#line-" + lineNum + "-preview-container")
        .find("video")
        .each(function (i, video) {
          if (video.id.indexOf("copy-") === 0) {
            video.remove();
          }
        });
    }

    // Prep Videos
    $(video).parent().off("click");
    $(video).parent().css("width", "1px");
    $(video).parent().css("height", "1px");
    $(video).hide();
    $(video).parent().hide();

    // Count Videos
    if (
      lineObj.pinnedVideo &&
      lineObj.pinnedVideo === thisRemoteVideoStream.trackID &&
      videoTrack.readyState === "live" &&
      srcVideoWidth > 10 &&
      srcVideoHeight >= 10
    ) {
      // A valid and live video is pinned
      isVideoPinned = true;
      pinnedVideoID = lineObj.pinnedVideo;
    }
    // Count All the videos
    if (
      videoTrack.readyState === "live" &&
      srcVideoWidth > 10 &&
      srcVideoHeight >= 10
    ) {
      videoCount++;
      console.log(
        "Display Video - ",
        videoTrack.readyState,
        "MID:",
        thisRemoteVideoStream.mid,
        "channel:",
        thisRemoteVideoStream.channel,
        "src width:",
        srcVideoWidth,
        "src height",
        srcVideoHeight
      );
    } else {
      console.log(
        "Hide Video - ",
        videoTrack.readyState,
        "MID:",
        thisRemoteVideoStream.mid
      );
    }
  });
  if (videoCount === 0) {
    // If you are the only one in the conference, just display your self
    previewContainer.css("width", previewWidth + "px");
    previewContainer.find("video").each(function (i, video) {
      $(video).show();
    });
    return;
  }
  if (isVideoPinned) videoCount = 1;

  if (!videoContainer.outerWidth() > 0) return;
  if (!videoContainer.outerHeight() > 0) return;

  // videoAspectRatio (1|1.33|1.77) is for the peer video, so can technically be used here
  // default ia 4:3
  var Margin = 3;
  var videoRatio = 0.75; // 0.5625 = 9/16 (16:9) | 0.75   = 3/4 (4:3)
  if (videoAspectRatio === "" || videoAspectRatio === "1.33") videoRatio = 0.75;
  if (videoAspectRatio === "1.77") videoRatio = 0.5625;
  if (videoAspectRatio === "1") videoRatio = 1;
  var stageWidth = videoContainer.outerWidth() - Margin * 2;
  var stageHeight = videoContainer.outerHeight() - Margin * 2;
  var previewWidth = previewContainer.outerWidth();
  var maxWidth = 0;
  let i = 1;
  while (i < 5000) {
    let w = StageArea(
      i,
      videoCount,
      stageWidth,
      stageHeight,
      Margin,
      videoRatio
    );
    if (w === false) {
      maxWidth = i - 1;
      break;
    }
    i++;
  }
  maxWidth = maxWidth - Margin * 2;

  // Layout Videos
  videoContainer.find("video").each(function (i, video) {
    var thisRemoteVideoStream = video.srcObject;
    var videoTrack = thisRemoteVideoStream.getVideoTracks()[0];
    var videoTrackSettings = videoTrack.getSettings();
    var srcVideoWidth = videoTrackSettings.width
      ? videoTrackSettings.width
      : video.videoWidth;
    var srcVideoHeight = videoTrackSettings.height
      ? videoTrackSettings.height
      : video.videoHeight;

    var videoWidth = maxWidth;
    var videoHeight = maxWidth * videoRatio;

    // Set & Show
    if (isVideoPinned) {
      // One of the videos are pinned
      if (pinnedVideoID === video.srcObject.trackID) {
        $(video)
          .parent()
          .css("width", videoWidth + "px");
        $(video)
          .parent()
          .css("height", videoHeight + "px");
        $(video).show();
        $(video).parent().show();
        // Pinned Actions
        var unPinButton = $("<button />", {
          class: "videoOverlayButtons",
        });
        unPinButton.html('<i class="fa fa-th-large"></i>');
        unPinButton.on("click", function () {
          UnPinVideo(lineNum, video);
        });
        $(video).parent().find(".Actions").empty();
        $(video).parent().find(".Actions").append(unPinButton);
      } else {
        // Put the videos in the preview area
        if (
          videoTrack.readyState === "live" &&
          srcVideoWidth > 10 &&
          srcVideoHeight >= 10
        ) {
          if (videoChanged) {
            var videoEl = $("<video />", {
              id: "copy-" + thisRemoteVideoStream.id,
              muted: true,
              autoplay: true,
              playsinline: true,
              controls: false,
            });
            var videoObj = videoEl.get(0);
            videoObj.srcObject = thisRemoteVideoStream;
            $("#line-" + lineNum + "-preview-container").append(videoEl);
          }
        }
      }
    } else {
      // None of the videos are pinned
      if (
        videoTrack.readyState === "live" &&
        srcVideoWidth > 10 &&
        srcVideoHeight >= 10
      ) {
        // Unpinned
        $(video)
          .parent()
          .css("width", videoWidth + "px");
        $(video)
          .parent()
          .css("height", videoHeight + "px");
        $(video).show();
        $(video).parent().show();
        // Unpinned Actions
        var pinButton = $("<button />", {
          class: "videoOverlayButtons",
        });
        pinButton.html('<i class="fa fa-thumb-tack"></i>');
        pinButton.on("click", function () {
          PinVideo(lineNum, video, video.srcObject.trackID);
        });
        $(video).parent().find(".Actions").empty();
        if (videoCount > 1) {
          // More then one video, nothing pinned
          $(video).parent().find(".Actions").append(pinButton);
        }
      }
    }

    // Populate Caller ID
    var adminMuteIndicator = "";
    var administratorIndicator = "";
    if (thisRemoteVideoStream.isAdminMuted === true) {
      adminMuteIndicator =
        '<i class="fa fa-microphone-slash" style="color:red"></i>&nbsp;';
    }
    if (thisRemoteVideoStream.isAdministrator === true) {
      administratorIndicator =
        '<i class="fa fa-user" style="color:orange"></i>&nbsp;';
    }
    if (thisRemoteVideoStream.CallerIdName === "") {
      thisRemoteVideoStream.CallerIdName = FindBuddyByIdentity(
        session.data.buddyId
      ).CallerIDName;
    }
    $(video)
      .parent()
      .find(".callerID")
      .html(
        administratorIndicator +
          adminMuteIndicator +
          thisRemoteVideoStream.CallerIdName
      );
  });

  // Preview Area
  previewContainer.css("width", previewWidth + "px");
  previewContainer.find("video").each(function (i, video) {
    $(video).show();
  });
}
// Inbound Calls
// =============

function ReceiveCall(session) {
  var callerID = session.remoteIdentity.displayName;
  var did = session.remoteIdentity.uri.user;
  if (typeof callerID === "undefined") callerID = did;

  console.log("New Incoming Call!", callerID + " <" + did + ">");

  // document.getElementById("statusReceiveCall").innerHTML = "New Incoming Call!", callerID + " <" + did + ">";
  var CurrentCalls = countSessions(session.id);
  console.log("Current Call Count:", CurrentCalls);
  // document.getElementById("statusReceiveCall").innerHTML += "Current Call Count:", CurrentCalls
  // Make new contact of its not there

  var startTime = moment.utc();

  // Create the line and add the session so we can answer or reject it.
  newLineNumber = newLineNumber + 1;
  var lineObj = new Line(newLineNumber, callerID, did);
  setCurrentActiveCallId(newLineNumber);
  lineObj.SipSession = session;
  lineObj.SipSession.data = {};
  lineObj.SipSession.data.line = lineObj.LineNumber;
  lineObj.SipSession.data.calldirection = "inbound";
  lineObj.SipSession.data.terminateby = "";
  lineObj.SipSession.data.src = did;
  lineObj.SipSession.data.callstart = startTime.format(
    "YYYY-MM-DD HH:mm:ss UTC"
  );
  lineObj.SipSession.data.callTimer = window.setInterval(function () {
    var now = moment.utc();
    var duration = moment.duration(now.diff(startTime));
    var timeStr = formatShortDuration(duration.asSeconds());
    console.log(lineObj.LineNumber + "-timer" + timeStr);
    console.log(lineObj.LineNumber + "-datetime" + timeStr);
  }, 1000);
  lineObj.SipSession.data.earlyReject = false;
  Lines.push(lineObj);
  // store.dispatch({type:"sip/Lines", payload:{action:"add",data:lineObj}})
  // Detect Video
  lineObj.SipSession.data.withvideo = false;
  if (EnableVideoCalling === true && lineObj.SipSession.request.body) {
    // Asterisk 13 PJ_SIP always sends m=video if endpoint has video codec,
    // even if original invite does not specify video.
    if (lineObj.SipSession.request.body.indexOf("m=video") > -1) {
      lineObj.SipSession.data.withvideo = true;
    }
  }

  // Session Delegates
  lineObj.SipSession.delegate = {
    onBye: function (sip) {
      onSessionReceivedBye(lineObj, sip);
    },
    onMessage: function (sip) {
      onSessionReceivedMessage(lineObj, sip);
    },
    onInvite: function (sip) {
      onSessionReinvited(lineObj, sip);
    },
    onSessionDescriptionHandler: function (sdh, provisional) {
      onSessionDescriptionHandlerCreated(
        lineObj,
        sdh,
        provisional,
        lineObj.SipSession.data.withvideo
      );
    },
  };
  // incomingInviteRequestDelegate
  lineObj.SipSession.incomingInviteRequest.delegate = {
    onCancel: function (sip) {
      onInviteCancel(lineObj, sip);
    },
  };

  // Possible Early Rejection options
  if (DoNotDisturbEnabled() === true) {
    console.log("Do Not Disturb Enabled, rejecting call.");
    // document.getElementById("statusReceiveCall").innerHTML += "Do Not Disturb Enabled, rejecting call.";
    lineObj.SipSession.data.earlyReject = true;
    RejectCall(lineObj.LineNumber);
    return;
  }
  if (CurrentCalls >= 1) {
    if (CallWaitingEnabled === false || CallWaitingEnabled === "disabled") {
      console.log("Call Waiting Disabled, rejecting call.");
      // document.getElementById("statusReceiveCall").innerHTML += "Call Waiting Disabled, rejecting call.";
      lineObj.SipSession.data.earlyReject = true;
      RejectCall(lineObj.LineNumber);
      return;
    }
  }

  // Create the call HTML
  AddLineHtml(lineObj, "inbound");
  if (lineObj.SipSession.data.withvideo) {
    // alert("Else:lineObj.SipSession.data.withvideo");
  } else {
    // alert("Else:lineObj.SipSession.data.withvideo");
  }

  // Auto Answer options
  var autoAnswerRequested = false;
  var answerTimeout = 1000;
  if (!AutoAnswerEnabled && IntercomPolicy === "enabled") {
    // Check headers only if policy is allow

    // https://github.com/InnovateAsterisk/Browser-Phone/issues/126
    // Alert-Info: info=alert-autoanswer
    // Alert-Info: answer-after=0
    // Call-info: answer-after=0; x=y
    // Call-Info: Answer-After=0
    // Alert-Info: ;info=alert-autoanswer
    // Alert-Info: <sip:>;info=alert-autoanswer
    // Alert-Info: <sip:domain>;info=alert-autoanswer

    var ci = session.request.headers["Call-Info"];
    if (ci !== undefined && ci.length > 0) {
      for (var i = 0; i < ci.length; i++) {
        var raw_ci = ci[i].raw.toLowerCase();
        if (raw_ci.indexOf("answer-after=") > 0) {
          var temp_seconds_autoanswer = parseInt(
            raw_ci
              .substring(
                raw_ci.indexOf("answer-after=") + "answer-after=".length
              )
              .split(";")[0]
          );
          if (
            Number.isInteger(temp_seconds_autoanswer) &&
            temp_seconds_autoanswer >= 0
          ) {
            autoAnswerRequested = true;
            if (temp_seconds_autoanswer > 1)
              answerTimeout = temp_seconds_autoanswer * 1000;
            break;
          }
        }
      }
    }
    var ai = session.request.headers["Alert-Info"];
    if (autoAnswerRequested === false && ai !== undefined && ai.length > 0) {
      for (var i = 0; i < ai.length; i++) {
        var raw_ai = ai[i].raw.toLowerCase();
        if (
          raw_ai.indexOf("auto answer") > 0 ||
          raw_ai.indexOf("alert-autoanswer") > 0
        ) {
          var autoAnswerRequested = true;
          break;
        }
        if (raw_ai.indexOf("answer-after=") > 0) {
          var temp_seconds_autoanswer = parseInt(
            raw_ai
              .substring(
                raw_ai.indexOf("answer-after=") + "answer-after=".length
              )
              .split(";")[0]
          );
          if (
            Number.isInteger(temp_seconds_autoanswer) &&
            temp_seconds_autoanswer >= 0
          ) {
            autoAnswerRequested = true;
            if (temp_seconds_autoanswer > 1)
              answerTimeout = temp_seconds_autoanswer * 1000;
            break;
          }
        }
      }
    }
  }

  if (AutoAnswerEnabled || autoAnswerRequested) {
    if (CurrentCalls === 0) {
      // There are no other calls, so you can answer
      console.log("Going to Auto Answer this call...");
      // document.getElementById("statusReceiveCall").innerHTML += "Going to Auto Answer this call...";
      window.setTimeout(function () {
        // If the call is with video, assume the auto answer is also
        // In order for this to work nicely, the recipient maut be "ready" to accept video calls
        // In order to ensure video call compatibility (i.e. the recipient must have their web cam in, and working)
        // The NULL video should be configured
        // https://github.com/InnovateAsterisk/Browser-Phone/issues/26
        if (lineObj.SipSession.data.withvideo) {
          AnswerVideoCall(lineObj.LineNumber);
        } else {
          AnswerAudioCall(lineObj.LineNumber);
        }
      }, answerTimeout);

      // Select Buddy
      SelectLine(lineObj.LineNumber);
      return;
    } else {
      console.warn("Could not auto answer call, already on a call.");
      // document.getElementById("statusReceiveCall").innerHTML += "Could not auto answer call, already on a call.";
    }
  }

  if (CurrentCalls === 0) {
    // If you are already on the selected buddy who is now calling you, switch to his call.
    // NOTE: This will put other calls on hold
    if (CurrentCalls === 0) SelectLine(lineObj.LineNumber);
  }

  // Show notification / Ring / Windows Etc
  // ======================================

  // Browser Window Notification
  try {
    if ("Notification" in window) {
      if (Notification.permission === "granted") {
        var noticeOptions = {
          body: "incoming_call_from " + callerID + " <" + did + ">",
        };
        // alert("incoming_call_from" + " " + callerID + " <" + did + ">")
        var inComingCallNotification = new Notification(
          "incoming_call",
          noticeOptions
        );
        // inComingCallNotification.onclick = function (event) {
  
        //   var lineNo = lineObj.LineNumber;
        //   var videoInvite = lineObj.SipSession.data.withvideo
        //   window.setTimeout(function () {
        //     // https://github.com/InnovateAsterisk/Browser-Phone/issues/26
        //     if (videoInvite) {
        //       AnswerVideoCall(lineNo)
        //     }
        //     else {
        //       AnswerAudioCall(lineNo);
        //     }
        //   }, 1000);
  
        //   // Select Buddy
        //   SelectLine(lineNo);
        //   return;
        // }
        inComingCallNotification.onclick = function () {
			  store.dispatch({type:"sip/navigatePush", payload:"/dashboard"});
          // sidebar.classList.toggle("-translate-x-full");
          // focus to dial pad
          //document.getElementById("hamburger").checked = false;
          //document.getElementById("phone-tab").click()
          window.focus();
        };
      }
    }
  } catch (error) {
    console.log(error)
  }


  // Play Ring Tone if not on the phone
  if (EnableRingtone == true) {
    if (CurrentCalls >= 1) {
      // Play Alert
      ringerCallWaiting.play()
      .then(function () {
        // Audio Is Playing
      })
      .catch(function (e) {
        // alert(e)
        console.warn("Unable to play audio file.", e);
      });
      lineObj.SipSession.data.ringerObj = ringerCallWaiting
    } else {
      // Play Ring Tone
      ringer.play()
      .then(function () {
        // Audio Is Playing
      })
      .catch(function (e) {
        // alert(e)
        console.warn("Unable to play audio file.", e);
      });
      lineObj.SipSession.data.ringerObj = ringer;
    }
  }
  // OnReceiveCall(newLineNumber, callerID, did);
  const inboundCall =  {
    LineNumber: newLineNumber,
    DisplayName: callerID,
    DisplayNumber: did,
    ringtone: false ,
  }
  store.dispatch({type:"sip/ringingInboundCalls", payload:{action:"add",data:inboundCall}})
  // store.dispatch({type:"sip/ringingInboundCallActive", payload:newLineNumber})
  // BackgroundAvailable(0, true);
  // addCallToCallSelectModal(newLineNumber, callerID);
  lineObj.status = "ReceiveCall";
  // document.getElementById("callList").innerHTML += '<input type="radio" id="lineID_' + newLineNumber + '" name="lineID" value="' + newLineNumber + '"><label for="lineID_' + newLineNumber + '">Caller:' + callerID + ' - ID:' + newLineNumber + '</label><br>';
}
// Both Incoming an outgoing INVITE
function onInviteAccepted(lineObj, includeVideo, response) {
  // Call in progress
  var session = lineObj.SipSession;
  lineObj.status = "CallAnswered";
  onCallAnswered(lineObj.LineNumber);
  console.log(">>>>>>>>>>>>>>>>>>>>>" + lineObj.LineNumber);
  if (session.data.earlyMedia) {
    session.data.earlyMedia.pause();
    session.data.earlyMedia.removeAttribute("src");
    session.data.earlyMedia.load();
    session.data.earlyMedia = null;
  }

  window.clearInterval(session.data.callTimer);
  var startTime = moment.utc();
  session.data.startTime = startTime;
  session.data.callTimer = window.setInterval(function () {
    var now = moment.utc();
    var duration = moment.duration(now.diff(startTime));
    var timeStr = formatShortDuration(duration.asSeconds());
    console.log("#line-" + lineObj.LineNumber + "-timer:" + timeStr);
    console.log("#line-" + lineObj.LineNumber + "-datetime:" + timeStr);
    store.dispatch({type:"sip/answeredCalls", payload:{action:"callTimer",data:{lineNum:lineObj.LineNumber, callTimer:timeStr}}})
    if (getCurrentActiveCallId() === lineObj.LineNumber) {
      //document.getElementById("calling-state").innerHTML = timeStr;
    }
  }, 1000);
  if(lineObj.SipSession.data.calldirection === "outbound"){
    store.dispatch({type:"sip/ringingOutboundCalls", payload:{action:"answer",data:lineObj.LineNumber}})
  }
  session.isOnHold = false;
  session.data.started = true;

  if (includeVideo) {
    // Preview our stream from peer connection
    var localVideoStream = new MediaStream();
    var pc = session.sessionDescriptionHandler.peerConnection;
    pc.getSenders().forEach(function (sender) {
      if (sender.track && sender.track.kind === "video") {
        localVideoStream.addTrack(sender.track);
      }
    });
    var localVideo = $("#line-" + lineObj.LineNumber + "-localVideo").get(0);
    localVideo.srcObject = localVideoStream;
    localVideo.onloadedmetadata = function (e) {
      localVideo.play();
    };

    // Apply Call Bandwidth Limits
    if (MaxVideoBandwidth > -1) {
      pc.getSenders().forEach(function (sender) {
        if (sender.track && sender.track.kind === "video") {
          var parameters = sender.getParameters();
          if (!parameters.encodings) parameters.encodings = [{}];
          parameters.encodings[0].maxBitrate = MaxVideoBandwidth * 1000;

          console.log(
            "Applying limit for Bandwidth to: ",
            MaxVideoBandwidth + "kb per second"
          );

          // Only going to try without re-negotiations
          sender.setParameters(parameters).catch(function (e) {
            console.warn("Cannot apply Bandwidth Limits", e);
          });
        }
      });
    }
  }

  if (includeVideo) {
    // Layout for Video Call
    // Default to use Camera
  } else {
    // Layout for Audio Call
    // Call Control
    // Show the Call
  }
  muteAllInactiveCalls();
  if(lineObj.muteAfterAnswer && !lineObj.ismute){
      mute(lineObj.LineNumber) 
  }
  SelectLine(lineObj.LineNumber)
  store.dispatch({type:"sip/answeredCalls", payload:{action:"callMicrophoneDevice",data:{lineNum:lineObj.LineNumber, callMicrophoneDevice:lineObj.SipSession.data.AudioSourceDevice  }}});
}
function AnswerAudioCall(lineNumber: number) {
  // CloseWindow();

  var lineObj = FindLineByNumber(lineNumber);
  if (lineObj === null) {
    console.warn("Failed to get line (" + lineNumber + ")");
    return;
  }
  var session = lineObj.SipSession;
  // Stop the ringtone
  if (session.data.ringerObj) {
    session.data.ringerObj.pause();
    session.data.ringerObj.currentTime = 0;
    // session.data.ringerObj.removeAttribute("src");
    // session.data.ringerObj.load();
    // session.data.ringerObj = null;
  }
  // Check vitals
  if (HasAudioDevice === false) {
    alert("alert_no_microphone");
    return;
  }
  // Start SIP handling
  var supportedConstraints = navigator.mediaDevices.getSupportedConstraints();
  var spdOptions = {
    sessionDescriptionHandlerOptions: {
      constraints: {
        audio: { deviceId: "default" },
        video: false,
      },
    },
  };

  // Configure Audio
  var currentAudioDevice = getAudioSrcID();
  if (currentAudioDevice !== "default") {
    var confirmedAudioDevice = false;
    for (var i = 0; i < AudioinputDevices.length; ++i) {
      if (currentAudioDevice === AudioinputDevices[i].deviceId) {
        confirmedAudioDevice = true;
        break;
      }
    }
    if (confirmedAudioDevice) {
      spdOptions.sessionDescriptionHandlerOptions.constraints.audio.deviceId = {
        exact: currentAudioDevice,
      };
    } else {
      console.warn(
        "The audio device you used before is no longer available, default settings applied."
      );
      localStorage.setItem("microphoneDevice", "default");
    }
  }
  // Add additional Constraints
  if (supportedConstraints.autoGainControl) {
    spdOptions.sessionDescriptionHandlerOptions.constraints.audio.autoGainControl =
      AutoGainControl();
  }
  if (supportedConstraints.echoCancellation) {
    spdOptions.sessionDescriptionHandlerOptions.constraints.audio.echoCancellation =
      EchoCancellation();
  }
  if (supportedConstraints.noiseSuppression) {
    spdOptions.sessionDescriptionHandlerOptions.constraints.audio.noiseSuppression =
      NoiseSuppression();
  }

  // Save Devices
  lineObj.SipSession.data.withvideo = false;
  lineObj.SipSession.data.VideoSourceDevice = null;
  lineObj.SipSession.data.AudioSourceDevice = getAudioSrcID();
  lineObj.SipSession.data.AudioOutputDevice = getAudioOutputID();
  // Send Answer
  lineObj.SipSession.accept(spdOptions)
    .then(function () {
      onInviteAccepted(lineObj, false);
      lineObj.status = "CallAnswered";
    })
    .catch(function (error) {
      console.warn("Failed to answer call", error, lineObj.SipSession);
      lineObj.SipSession.data.reasonCode = 500;
      lineObj.SipSession.data.reasonText = "Client Error";
      teardownSession(lineObj);
    });

  // remove filter contact when call is placed caller-id
  // document.getElementById("filter-results-wrapper").style.display = "none";
  // document.getElementById("caller-id").style.display = "none";
}
function AnswerVideoCall(lineNumber:number) {
  // CloseWindow();

  var lineObj = FindLineByNumber(lineNumber);
  if (lineObj === null) {
    console.warn("Failed to get line (" + lineNumber + ")");
    return;
  }
  var session = lineObj.SipSession;
  // Stop the ringtone
  if (session.data.ringerObj) {
    session.data.ringerObj.pause();
    session.data.ringerObj.currentTime = 0;
    // session.data.ringerObj.removeAttribute("src");
    // session.data.ringerObj.load();
    // session.data.ringerObj = null;
  }
  // Check vitals
  if (HasAudioDevice === false) {
    alert("alert_no_microphone");
    return;
  }
  // Start SIP handling
  var supportedConstraints = navigator.mediaDevices.getSupportedConstraints();
  var spdOptions = {
    sessionDescriptionHandlerOptions: {
      constraints: {
        audio: { deviceId: "default" },
        video: { deviceId: "default" },
      },
    },
  };

  // Configure Audio
  var currentAudioDevice = getAudioSrcID();
  if (currentAudioDevice !== "default") {
    var confirmedAudioDevice = false;
    for (var i = 0; i < AudioinputDevices.length; ++i) {
      if (currentAudioDevice === AudioinputDevices[i].deviceId) {
        confirmedAudioDevice = true;
        break;
      }
    }
    if (confirmedAudioDevice) {
      spdOptions.sessionDescriptionHandlerOptions.constraints.audio.deviceId = {
        exact: currentAudioDevice,
      };
    } else {
      console.warn(
        "The audio device you used before is no longer available, default settings applied."
      );
      localStorage.setItem("microphoneDevice", "default")
    }
  }
  // Add additional Constraints
  if (supportedConstraints.autoGainControl) {
    spdOptions.sessionDescriptionHandlerOptions.constraints.audio.autoGainControl =
      AutoGainControl();
  }
  if (supportedConstraints.echoCancellation) {
    spdOptions.sessionDescriptionHandlerOptions.constraints.audio.echoCancellation =
      EchoCancellation();
  }
  if (supportedConstraints.noiseSuppression) {
    spdOptions.sessionDescriptionHandlerOptions.constraints.audio.noiseSuppression =
      NoiseSuppression();
  }

  // Configure Video
  var currentVideoDevice = getVideoSrcID();
  if (currentVideoDevice !== "default") {
    var confirmedVideoDevice = false;
    for (var i = 0; i < VideoinputDevices.length; ++i) {
      if (currentVideoDevice === VideoinputDevices[i].deviceId) {
        confirmedVideoDevice = true;
        break;
      }
    }
    if (confirmedVideoDevice) {
      spdOptions.sessionDescriptionHandlerOptions.constraints.video.deviceId = {
        exact: currentVideoDevice,
      };
    } else {
      console.warn(
        "The video device you used before is no longer available, default settings applied."
      );
      // localDB.setItem("VideoSrcId", "default"); // resets for later and subsequent calls
    }
  }
  // Add additional Constraints
  if (supportedConstraints.frameRate && maxFrameRate !== "") {
    spdOptions.sessionDescriptionHandlerOptions.constraints.video.frameRate =
      maxFrameRate;
  }
  if (supportedConstraints.height && videoHeight !== "") {
    spdOptions.sessionDescriptionHandlerOptions.constraints.video.height =
      videoHeight;
  }
  if (supportedConstraints.aspectRatio && videoAspectRatio !== "") {
    spdOptions.sessionDescriptionHandlerOptions.constraints.video.aspectRatio =
      videoAspectRatio;
  }

  // Save Devices
  lineObj.SipSession.data.withvideo = true;
  lineObj.SipSession.data.VideoSourceDevice = getVideoSrcID();
  lineObj.SipSession.data.AudioSourceDevice = getAudioSrcID();
  lineObj.SipSession.data.AudioOutputDevice = getAudioOutputID();
  if (StartVideoFullScreen) ExpandVideoArea(lineObj.LineNumber);

  // Send Answer
  lineObj.SipSession.accept(spdOptions)
    .then(function () {
      onInviteAccepted(lineObj, true);
    })
    .catch(function (error) {
      console.warn("Failed to answer call", error, lineObj.SipSession);
      lineObj.SipSession.data.reasonCode = 500;
      lineObj.SipSession.data.reasonText = "Client Error";
      teardownSession(lineObj);
    });
}
function RejectCall(lineNumber) {
  var lineObj = FindLineByNumber(lineNumber);
  if (lineObj === null) {
    console.warn("Unable to find line (" + lineNumber + ")");
    return;
  }
  var session = lineObj.SipSession;
  if (session === null) {
    console.warn("Reject failed, null session");
  }
  if (session.state === SIP.SessionState.Established) {
    session.bye().catch(function (e) {
      console.warn("Problem in RejectCall(), could not bye() call", e, session);
    });
  } else {
    session
      .reject({
        statusCode: 486,
        reasonPhrase: "Busy Here",
      })
      .catch(function (e) {
        console.warn(
          "Problem in RejectCall(), could not reject() call",
          e,
          session
        );
      });
  }

  console.log("#line-" + lineObj.LineNumber + "-msg:" + "call_rejected");

  session.data.terminateby = "us";
  session.data.reasonCode = 486;
  session.data.reasonText = "Busy Here";
  teardownSession(lineObj);
}
function onInviteTrying(lineObj, response) {
  console.log("#line-" + lineObj.LineNumber + "-msg:" + "trying");
}
function onInviteProgress(lineObj, response) {
  console.log("Call Progress:", response.message.statusCode);

  // Provisional 1xx
  // response.message.reasonPhrase
  if (response.message.statusCode === 180) {
    console.log("#line-" + lineObj.LineNumber + "-msg:" + "ringing");
    var soundFile = audioBlobs.EarlyMedia_European;
    // var soundFile = '';

    // Play Early Media
    console.log("Audio:", soundFile.url);
    if (lineObj.SipSession.data.earlyMedia) {
      // There is already early media playing
      // onProgress can be called multiple times
      // Don't add it again
      console.log("Early Media already playing");
    } else {
      var earlyMedia = new Audio(soundFile.blob);
      earlyMedia.preload = "auto";
      earlyMedia.loop = true;
      earlyMedia.oncanplaythrough = function (e) {
        if (
          typeof earlyMedia.sinkId !== "undefined" &&
          getAudioOutputID() !== "default"
        ) {
          earlyMedia
            .setSinkId(getAudioOutputID())
            .then(function () {
              console.log("Set sinkId to:", getAudioOutputID());
            })
            .catch(function (e) {
              console.warn("Failed not apply setSinkId.", e);
            });
        }
        earlyMedia
          .play()
          .then(function () {
            // Audio Is Playing
          })
          .catch(function (e) {
            console.warn("Unable to play audio file.", e);
          });
      };
      lineObj.SipSession.data.earlyMedia = earlyMedia;
    }
    // console.log(lineObj)
  } else if (response.message.statusCode === 183) {
    console.log(
      "#line-" +
        lineObj.LineNumber +
        "-msg:" +
        response.message.reasonPhrase +
        "..."
    );
  } else {
    // 181 = Call is Being Forwarded
    // 182 = Call is queued (Busy server!)
    // 199 = Call is Terminated (Early Dialog)

    consloe.log(
      "#line-" +
        lineObj.LineNumber +
        "-msg" +
        response.message.reasonPhrase +
        "..."
    );
  }
  onCalling(lineObj.LineNumber, lineObj.DisplayNumber);
}
function onInviteRejected(lineObj, response) {
  console.log("INVITE Rejected:", response.message.reasonPhrase);

  lineObj.SipSession.data.terminateby = "them";
  lineObj.SipSession.data.reasonCode = response.message.statusCode;
  lineObj.SipSession.data.reasonText = response.message.reasonPhrase;
  store.dispatch({type:"sip/ringingOutboundCalls", payload:{action:"remove",data:lineObj.LineNumber}})
  teardownSession(lineObj);
  SelectLine(store.getState().sip.activeCallLineNumber)
  // onCallEndByOtherSide();
}
function CancelTransferSession(lineNum:number) {
  var lineObj = FindLineByNumber(lineNum);
  if (lineObj === null || lineObj.SipSession === null) {
    console.warn("Null line or session");
    return;
  }
  var session = lineObj.SipSession;
  if (session.data.childsession) {
    console.log(
      "Child Transfer call detected:",
      session.data.childsession.state
    );
    session.data.childsession
      .dispose()
      .then(function () {
        session.data.childsession = null;
      })
      .catch(function (error) {
        session.data.childsession = null;
        // Suppress message
      });
  }

  unholdSession(lineNum);
}
function onInviteRedirected(response) {
  console.log("onInviteRedirected", response);
  // Follow???
}
function AudioCall(lineObj, dialledNumber, extraHeaders) {
  if (userAgent === null) return;
  if (userAgent.isRegistered() === false) return;
  if (lineObj === null) return;

  if (HasAudioDevice === false) {
    alert("alert_no_microphone");
    return;
  }

  var supportedConstraints = navigator.mediaDevices.getSupportedConstraints();

  var spdOptions = {
    earlyMedia: true,
    sessionDescriptionHandlerOptions: {
      constraints: {
        audio: { deviceId: "default" },
        video: false,
      },
    },
  };
  // Configure Audio
  var currentAudioDevice = getAudioSrcID();
  if (currentAudioDevice !== "default") {
    var confirmedAudioDevice = false;
    for (var i = 0; i < AudioinputDevices.length; ++i) {
      if (currentAudioDevice === AudioinputDevices[i].deviceId) {
        confirmedAudioDevice = true;
        break;
      }
    }
    if (confirmedAudioDevice) {
      spdOptions.sessionDescriptionHandlerOptions.constraints.audio.deviceId = {
        exact: currentAudioDevice,
      };
    } else {
      console.warn(
        "The audio device you used before is no longer available, default settings applied."
      );
      localStorage.setItem("microphoneDevice", "default");
    }
  }
  // Add additional Constraints
  if (supportedConstraints.autoGainControl) {
    spdOptions.sessionDescriptionHandlerOptions.constraints.audio.autoGainControl =
      AutoGainControl();
  }
  if (supportedConstraints.echoCancellation) {
    spdOptions.sessionDescriptionHandlerOptions.constraints.audio.echoCancellation =
      EchoCancellation();
  }
  if (supportedConstraints.noiseSuppression) {
    spdOptions.sessionDescriptionHandlerOptions.constraints.audio.noiseSuppression =
      NoiseSuppression();
  }
  // Extra Headers
  if (extraHeaders) {
    spdOptions.extraHeaders = extraHeaders;
  }
  console.log("#line-" + lineObj.LineNumber + "-msg:" + "starting_audio_call");

  var startTime = moment.utc();
  // Invite
  console.log("INVITE (audio): " + dialledNumber + "@" + SipDomain);

  var targetURI = SIP.UserAgent.makeURI(
    "sip:" + dialledNumber.replace(/#/g, "%23") + "@" + SipDomain
  );
  lineObj.SipSession = new SIP.Inviter(userAgent, targetURI, spdOptions);
  lineObj.SipSession.data = {};
  lineObj.SipSession.data.line = lineObj.LineNumber;
  lineObj.SipSession.data.calldirection = "outbound";
  lineObj.SipSession.data.dst = dialledNumber;
  lineObj.SipSession.data.callstart = startTime.format(
    "YYYY-MM-DD HH:mm:ss UTC"
  );
  const outboundCall =  {
    LineNumber: newLineNumber,
    DisplayName: "",
    DisplayNumber: dialledNumber,
  }
  store.dispatch({type:"sip/ringingOutboundCalls", payload:{action:"add",data:outboundCall}})
  // store.dispatch({type:"sip/ringingOutboundCallActive", payload:newLineNumber})
  lineObj.SipSession.data.callTimer = window.setInterval(function () {
    var now = moment.utc();
    var duration = moment.duration(now.diff(startTime));
    var timeStr = formatShortDuration(duration.asSeconds());
    console.log("#line-" + lineObj.LineNumber + "-timer" + timeStr);
    console.log("#line-" + lineObj.LineNumber + "-datetime" + timeStr);
  }, 1000);
  lineObj.SipSession.data.VideoSourceDevice = null;
  lineObj.SipSession.data.AudioSourceDevice = getAudioSrcID();
  lineObj.SipSession.data.AudioOutputDevice = getAudioOutputID();
  lineObj.SipSession.data.terminateby = "them";
  lineObj.SipSession.data.withvideo = false;
  lineObj.SipSession.data.earlyReject = false;
  lineObj.SipSession.isOnHold = false;
  lineObj.SipSession.delegate = {
    onBye: function (sip) {
      onSessionReceivedBye(lineObj, sip);
    },
    onMessage: function (sip) {
      onSessionReceivedMessage(lineObj, sip);
    },
    onInvite: function (sip) {
      onSessionReinvited(lineObj, sip);
    },
    onSessionDescriptionHandler: function (sdh, provisional) {
      onSessionDescriptionHandlerCreated(lineObj, sdh, provisional, false);
    },
  };
  var inviterOptions = {
    requestDelegate: {
      // OutgoingRequestDelegate
      onTrying: function (sip) {
        onInviteTrying(lineObj, sip);
      },
      onProgress: function (sip) {
        onInviteProgress(lineObj, sip);
      },
      onRedirect: function (sip) {
        onInviteRedirected(lineObj, sip);
      },
      onAccept: function (sip) {
        onInviteAccepted(lineObj, false, sip);
      },
      onReject: function (sip) {
        onInviteRejected(lineObj, sip);
      },
    },
  };
  lineObj.SipSession.invite(inviterOptions).catch(function (e) {
    console.warn("Failed to send INVITE:", e);
  });

  // remove filter contact when call is placed caller-id
  // document.getElementById("filter-results-wrapper").style.display = "none";
  // document.getElementById("caller-id").style.display = "none";
}

function BlindTransfer(lineNum:number, dstNo:string) {
  if (EnableAlphanumericDial) {
    dstNo = dstNo.replace(telAlphanumericRegEx, "").substring(0, MaxDidLength);
  } else {
    dstNo = dstNo.replace(telNumericRegEx, "").substring(0, MaxDidLength);
  }
  if (dstNo === "") {
    console.warn("Cannot transfer, no number");
    return;
  }

  var lineObj = FindLineByNumber(lineNum);
  if (lineObj === null || lineObj.SipSession === null) {
    console.warn("Null line or session");
    return;
  }
  var session = lineObj.SipSession;

  if (!session.data.transfer) session.data.transfer = [];
  session.data.transfer.push({
    type: "Blind",
    to: dstNo,
    transferTime: utcDateNow(),
    disposition: "refer",
    dispositionTime: utcDateNow(),
    accept: {
      complete: null,
      eventTime: null,
      disposition: "",
    },
  });
  var transferId = session.data.transfer.length - 1;

  var transferOptions = {
    requestDelegate: {
      onAccept: function (sip) {
        console.log("Blind transfer Accepted");

        session.data.terminateby = "us";
        session.data.reasonCode = 202;
        session.data.reasonText = "Transfer";

        session.data.transfer[transferId].accept.complete = true;
        session.data.transfer[transferId].accept.disposition =
          sip.message.reasonPhrase;
        session.data.transfer[transferId].accept.eventTime = utcDateNow();

        console.log(
          "#line-" + lineNum + "-msg" + "Call Blind Transferred (Accepted)"
        );

        session.bye().catch(function (error) {
          console.warn("Could not BYE after blind transfer:", error);
        });
        if(!session.data.confcalls){
          store.dispatch({type:"sip/answeredCalls", payload:{action:"remove",data:lineObj.LineNumber}})
        }
        teardownSession(lineObj);
        // onCallEndByOtherSide();
        SelectLine(store.getState().sip.activeCallLineNumber)
        haveActiveCall(lineObj.LineNumber)
      },
      onReject: function (sip) {
        console.warn("REFER rejected:", sip);

        session.data.transfer[transferId].accept.complete = false;
        session.data.transfer[transferId].accept.disposition =
          sip.message.reasonPhrase;
        session.data.transfer[transferId].accept.eventTime = utcDateNow();

        console.log("#line-" + lineNum + "-msg" + "Call Blind Failed!");

        // Session should still be up, so just allow them to try again
      },
    },
  };
  console.log("REFER: ", dstNo + "@" + SipDomain);
  var referTo = SIP.UserAgent.makeURI(
    "sip:" + dstNo.replace(/#/g, "%23") + "@" + SipDomain
  );
  session.refer(referTo, transferOptions).catch(function (error) {
    console.warn("Failed to REFER", error);
  });

  console.log("#line-" + lineNum + "-msg" + "call_blind_transfered");
}
function AttendedTransfer(lineNum:number, dstNo:string) {
  if (EnableAlphanumericDial) {
    dstNo = dstNo.replace(telAlphanumericRegEx, "").substring(0, MaxDidLength);
  } else {
    dstNo = dstNo.replace(telNumericRegEx, "").substring(0, MaxDidLength);
  }
  if (dstNo === "") {
    console.warn("Cannot transfer, no number");
    return;
  }

  var lineObj = FindLineByNumber(lineNum);
  if (lineObj === null || lineObj.SipSession === null) {
    console.warn("Null line or session");
    return;
  }
  var session = lineObj.SipSession;

  if (!session.data.transfer) session.data.transfer = [];
  session.data.transfer.push({
    type: "Attended",
    to: dstNo,
    transferTime: utcDateNow(),
    disposition: "invite",
    dispositionTime: utcDateNow(),
    accept: {
      complete: null,
      eventTime: null,
      disposition: "",
    },
  });
  var transferId = session.data.transfer.length - 1;

  // SDP options
  var supportedConstraints = navigator.mediaDevices.getSupportedConstraints();
  var spdOptions = {
    earlyMedia: true,
    sessionDescriptionHandlerOptions: {
      constraints: {
        audio: { deviceId: "default" },
        video: false,
      },
    },
  };
  if (session.data.AudioSourceDevice !== "default") {
    spdOptions.sessionDescriptionHandlerOptions.constraints.audio.deviceId = {
      exact: session.data.AudioSourceDevice,
    };
  }
  // Add additional Constraints
  if (supportedConstraints.autoGainControl) {
    spdOptions.sessionDescriptionHandlerOptions.constraints.audio.autoGainControl =
      AutoGainControl();
  }
  if (supportedConstraints.echoCancellation) {
    spdOptions.sessionDescriptionHandlerOptions.constraints.audio.echoCancellation =
      EchoCancellation();
  }
  if (supportedConstraints.noiseSuppression) {
    spdOptions.sessionDescriptionHandlerOptions.constraints.audio.noiseSuppression =
      NoiseSuppression();
  }

  // Not sure if its possible to transfer a Video call???
  if (session.data.withvideo) {
    spdOptions.sessionDescriptionHandlerOptions.constraints.video = true;
    if (session.data.VideoSourceDevice !== "default") {
      spdOptions.sessionDescriptionHandlerOptions.constraints.video.deviceId = {
        exact: session.data.VideoSourceDevice,
      };
    }
    // Add additional Constraints
    if (supportedConstraints.frameRate && maxFrameRate !== "") {
      spdOptions.sessionDescriptionHandlerOptions.constraints.video.frameRate =
        maxFrameRate;
    }
    if (supportedConstraints.height && videoHeight !== "") {
      spdOptions.sessionDescriptionHandlerOptions.constraints.video.height =
        videoHeight;
    }
    if (supportedConstraints.aspectRatio && videoAspectRatio !== "") {
      spdOptions.sessionDescriptionHandlerOptions.constraints.video.aspectRatio =
        videoAspectRatio;
    }
  }

  // Create new call session
  console.log("TRANSFER INVITE: ", "sip:" + dstNo + "@" + SipDomain);
  var targetURI = SIP.UserAgent.makeURI(
    "sip:" + dstNo.replace(/#/g, "%23") + "@" + SipDomain
  );
  var newSession = new SIP.Inviter(userAgent, targetURI, spdOptions);
  newSession.data = {};
  newSession.delegate = {
    onBye: function (sip) {
      console.log("New call session ended with BYE");
      console.log("call_ended");
      session.data.transfer[transferId].disposition = "bye";
      session.data.transfer[transferId].dispositionTime = utcDateNow();

      console.log(
        "#line-" + lineNum + "-msg" + "attended_transfer_call_terminated"
      );
    },
    onSessionDescriptionHandler: function (sdh, provisional) {
      if (sdh) {
        if (sdh.peerConnection) {
          sdh.peerConnection.ontrack = function (event) {
            var pc = sdh.peerConnection;

            // Gets Remote Audio Track (Local audio is setup via initial GUM)
            var remoteStream = new MediaStream();
            pc.getReceivers().forEach(function (receiver) {
              if (receiver.track && receiver.track.kind === "audio") {
                remoteStream.addTrack(receiver.track);
              }
            });
            var remoteAudio = $(
              "#line-" + lineNum + "-transfer-remoteAudio"
            ).get(0);
            remoteAudio.srcObject = remoteStream;
            remoteAudio.onloadedmetadata = function (e) {
              if (typeof remoteAudio.sinkId !== "undefined") {
                remoteAudio
                  .setSinkId(session.data.AudioOutputDevice)
                  .then(function () {
                    console.log(
                      "sinkId applied: " + session.data.AudioOutputDevice
                    );
                  })
                  .catch(function (e) {
                    console.warn("Error using setSinkId: ", e);
                  });
              }
              remoteAudio.play();
            };
          };
        } else {
          console.warn(
            "onSessionDescriptionHandler fired without a peerConnection"
          );
        }
      } else {
        console.warn(
          "onSessionDescriptionHandler fired without a sessionDescriptionHandler"
        );
      }
    },
  };
  session.data.childsession = newSession;
  var inviterOptions = {
    requestDelegate: {
      onTrying: function (sip) {
        session.data.transfer[transferId].disposition = "trying";
        session.data.transfer[transferId].dispositionTime = utcDateNow();

        console.log(
          "#line-" + lineNum + "-msg:" + "attended_transfer_call_started"
        );
      },
      onProgress: function (sip) {
        session.data.transfer[transferId].disposition = "progress";
        session.data.transfer[transferId].dispositionTime = utcDateNow();
        console.log(
          "#line-" + lineNum + "-msg:" + "attended_transfer_call_started"
        );
      },
      onRedirect: function (sip) {
        console.log("Redirect received:", sip);
      },
      onAccept: function (sip) {
        console.log("call_in_progress");
        session.data.transfer[transferId].disposition = "accepted";
        session.data.transfer[transferId].dispositionTime = utcDateNow();
        {
          var transferOptions = {
            requestDelegate: {
              onAccept: function (sip) {
                console.log("Attended transfer Accepted");

                session.data.terminateby = "us";
                session.data.reasonCode = 202;
                session.data.reasonText = "Attended Transfer";

                session.data.transfer[transferId].accept.complete = true;
                session.data.transfer[transferId].accept.disposition =
                  sip.message.reasonPhrase;
                session.data.transfer[transferId].accept.eventTime =
                  utcDateNow();

                console.log(
                  "#line-" +
                    lineNum +
                    "-msg:" +
                    "attended_transfer_complete_accepted"
                );

                // We must end this session manually
                session.bye().catch(function (error) {
                  console.warn("Could not BYE after blind transfer:", error);
                });
                haveActiveCall(lineObj.LineNumber)
                if(!session.data.confcalls){
                  store.dispatch({type:"sip/answeredCalls", payload:{action:"remove",data:lineObj.LineNumber}})
                }
                teardownSession(lineObj);
                SelectLine(store.getState().sip.activeCallLineNumber)
                // onCallEndByOtherSide();
              },
              onReject: function (sip) {
                console.warn("Attended transfer rejected:", sip);

                session.data.transfer[transferId].accept.complete = false;
                session.data.transfer[transferId].accept.disposition =
                  sip.message.reasonPhrase;
                session.data.transfer[transferId].accept.eventTime =
                  utcDateNow();

                console.log(
                  "#line-" + lineNum + "-msg:" + "Attended Transfer Failed!"
                );
              },
            },
          };

          // Send REFER
          session.refer(newSession, transferOptions).catch(function (error) {
            console.warn("Failed to REFER", error);
          });
        }

        {
          newSession.bye().catch(function (error) {
            console.warn("Failed to BYE", error);
          });
          console.log("New call session end");

          session.data.transfer[transferId].accept.complete = false;
          session.data.transfer[transferId].accept.disposition = "bye";
          session.data.transfer[transferId].accept.eventTime = utcDateNow();

          console.log(
            "#line-" + lineNum + "-msg:" + "attended_transfer_call_ended"
          );

          window.setTimeout(function () {
            CancelTransferSession(lineNum);
          }, 1000);
        }
      },
      onReject: function (sip) {
        console.log("New call session rejected: ", sip.message.reasonPhrase);
        session.data.transfer[transferId].disposition =
          sip.message.reasonPhrase;
        session.data.transfer[transferId].dispositionTime = utcDateNow();

        console.log(
          "#line-" + lineNum + "-msg:" + "attended_transfer_call_rejected"
        );
      },
    },
  };
  newSession.invite(inviterOptions).catch(function (e) {
    console.warn("Failed to send INVITE:", e);
  });
}
function DialByLine(type, numToDial, CallerIDName, extraHeaders) {
  // document.getElementById("calling-state").innerHTML = "Calling....";
  if (userAgent === null || userAgent.isRegistered() === false) {
    return;
  }
  var numDial = numToDial;
  if (EnableAlphanumericDial) {
    numDial = numDial
      .replace(telAlphanumericRegEx, "")
      .substring(0, MaxDidLength);
  } else {
    numDial = numDial.replace(telNumericRegEx, "").substring(0, MaxDidLength);
  }
  if (numDial.length === 0) {
    console.warn("Enter number to dial");
    return;
  }

  // Create a Line
  newLineNumber = newLineNumber + 1;
  var lineObj = new Line(newLineNumber, CallerIDName, numDial);
  setCurrentActiveCallId(newLineNumber);
  Lines.push(lineObj);
  AddLineHtml(lineObj, "outbound");
  SelectLine(newLineNumber);

  // Start Call Invite
  if (type === "audio") {
    AudioCall(lineObj, numDial, extraHeaders);
  } else {
    // VideoCall(lineObj, numDial, extraHeaders);
  }
  BackgroundAvailable(0, true);
  addCallToCallSelectModal(newLineNumber, numDial);
  lineObj.status = "Calling";
  // document.getElementById("callList").innerHTML += '<input type="radio" id="lineID_' + newLineNumber + '" name="lineID" value="' + newLineNumber + '"><label for="lineID_' + newLineNumber + '">Caller:' + numToDial + ' - ID:' + newLineNumber + '</label><br>';
}

// Stream Manipulations
// ====================
function MixAudioStreams(MultiAudioTackStream) {
  // Takes in a MediaStream with any number of audio tracks and mixes them together

  var audioContext = null;
  try {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    audioContext = new AudioContext();
  } catch (e) {
    console.warn("AudioContext() not available, cannot record");
    return MultiAudioTackStream;
  }
  var mixedAudioStream = audioContext.createMediaStreamDestination();
  MultiAudioTackStream.getAudioTracks().forEach(function (audioTrack) {
    var srcStream = new MediaStream();
    srcStream.addTrack(audioTrack);
    var streamSourceNode = audioContext.createMediaStreamSource(srcStream);
    streamSourceNode.connect(mixedAudioStream);
  });

  return mixedAudioStream.stream;
}

// Conference Calls
// ================
function StartConferenceCall(lineNum:number) {
  if ($("#line-" + lineNum + "-btn-CancelTransfer").is(":visible")) {
    CancelTransferSession(lineNum);
    return;
  }
  holdSession(lineNum);
}
function CancelConference(lineNum: number) {
  var lineObj = FindLineByNumber(lineNum);
  if (lineObj === null || lineObj.SipSession === null) {
    console.warn("Null line or session");
    return;
  }
  var session = lineObj.SipSession;
  if (session.data.childsession) {
    console.log(
      "Child Conference call detected:",
      session.data.childsession.state
    );
    // alert("Child Conference call detected:" + session.data.childsession.state);
    session.data.childsession
      .dispose()
      .then(function () {
        session.data.childsession = null;
      })
      .catch(function (error) {
        session.data.childsession = null;
        // Suppress message
      });
  }
  store.dispatch({
    type: "sip/answeredCalls",
    payload: { action: "removeConferenceCall", data: { lineNum: lineNum } },
  });
  unholdSession(lineNum);
}
function ConferenceMixAudioStreams(MultiAudioTackStream:any, mixedAudioStream:MediaStreamAudioDestinationNode|undefined, audioContext:AudioContext|undefined) {
  // Takes in a MediaStream with any number of audio tracks and mixes them together

  try {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    audioContext = audioContext ? audioContext : new AudioContext();
  } catch (e) {
    console.warn("AudioContext() not available, cannot record");
    return MultiAudioTackStream;
  }
  var mixedAudioStream:MediaStreamAudioDestinationNode|undefined = mixedAudioStream ? mixedAudioStream : audioContext.createMediaStreamDestination();// 
  MultiAudioTackStream.getAudioTracks().forEach(function (audioTrack) {
    var srcStream = new MediaStream();
    srcStream.addTrack(audioTrack);
    if(!audioContext) return
    var streamSourceNode = audioContext.createMediaStreamSource(srcStream);
    streamSourceNode.connect(mixedAudioStream);
  });
  return [mixedAudioStream, audioContext];
}

function ConferenceDial(lineNum:number, phoneNo:string) {
  var dstNo = phoneNo;
  if (EnableAlphanumericDial) {
    dstNo = dstNo.replace(telAlphanumericRegEx, "").substring(0, MaxDidLength);
  } else {
    dstNo = dstNo.replace(telNumericRegEx, "").substring(0, MaxDidLength);
  }
  if (dstNo === "") {
    console.warn("Cannot transfer, must be [0-9*+#]");
    return;
  }

  var lineObj = FindLineByNumber(lineNum);
  if (lineObj === null || lineObj.SipSession === null) {
    console.warn("Null line or session");
    return;
  }
  var session = lineObj.SipSession;

  if (!session.data.confcalls){
    session.data.confcalls = [];
    session.data.disposed = false;
    unholdSession(lineNum);
    UnmuteSession(lineNum);
  } 
  session.data.confcalls.push({
    to: dstNo,
    startTime: utcDateNow(),
    disposition: "invite",
    dispositionTime: utcDateNow(),
    callTimer: "00:00",
    accept: {
      complete: null,
      eventTime: null,
      disposition: "",
    },
  });
  var confCallId = session.data.confcalls.length - 1;
  // SDP options
  var supportedConstraints = navigator.mediaDevices.getSupportedConstraints();
  var spdOptions = {
    sessionDescriptionHandlerOptions: {
      earlyMedia: true,
      constraints: {
        audio: { deviceId: "default" },
        video: false,
      },
    },
  };
  if (session.data.AudioSourceDevice !== "default") {
    spdOptions.sessionDescriptionHandlerOptions.constraints.audio.deviceId = {
      exact: session.data.AudioSourceDevice,
    };
  }
  // Add additional Constraints
  if (supportedConstraints.autoGainControl) {
    spdOptions.sessionDescriptionHandlerOptions.constraints.audio.autoGainControl =
      AutoGainControl();
  }
  if (supportedConstraints.echoCancellation) {
    spdOptions.sessionDescriptionHandlerOptions.constraints.audio.echoCancellation =
      EchoCancellation();
  }
  if (supportedConstraints.noiseSuppression) {
    spdOptions.sessionDescriptionHandlerOptions.constraints.audio.noiseSuppression =
      NoiseSuppression();
  }

  // Unlikely this will work
  if (session.data.withvideo) {
    spdOptions.sessionDescriptionHandlerOptions.constraints.video = true;
    if (session.data.VideoSourceDevice !== "default") {
      spdOptions.sessionDescriptionHandlerOptions.constraints.video.deviceId = {
        exact: session.data.VideoSourceDevice,
      };
    }
    // Add additional Constraints
    if (supportedConstraints.frameRate && maxFrameRate !== "") {
      spdOptions.sessionDescriptionHandlerOptions.constraints.video.frameRate =
        maxFrameRate;
    }
    if (supportedConstraints.height && videoHeight !== "") {
      spdOptions.sessionDescriptionHandlerOptions.constraints.video.height =
        videoHeight;
    }
    if (supportedConstraints.aspectRatio && videoAspectRatio !== "") {
      spdOptions.sessionDescriptionHandlerOptions.constraints.video.aspectRatio =
        videoAspectRatio;
    }
  }

  // Create new call session
  console.log("CONFERENCE INVITE: ", "sip:" + dstNo + "@" + SipDomain);
  // alert("CONFERENCE INVITE: ", "sip:" + dstNo + "@" + SipDomain)

  var targetURI = SIP.UserAgent.makeURI(
    "sip:" + dstNo.replace(/#/g, "%23") + "@" + SipDomain
  );
  var newSession = new SIP.Inviter(userAgent, targetURI, spdOptions);
  newSession.data = {};
  newSession.delegate = {
    onBye: function (sip) {
      console.log("New call session ended with BYE");
      // alert("New call session ended with BYE");
      session.data.confcalls[confCallId].disposition = "bye";
      session.data.confcalls[confCallId].dispositionTime = utcDateNow();

      console.log("#line-" + lineNum + "-msg" + "conference_call_terminated");
      // alert("conf conference_call_terminated")
      store.dispatch({
        type: "sip/answeredCalls",
        payload: { action: "removeConferenceCall", data: { lineNum: lineNum } },
      });
      window.clearInterval(session.data.confcalls[confCallId].callTimer);
      store.dispatch({type:"sip/answeredCalls", payload:{action:"conferenceCallDisposition",data:{confCallId:confCallId, lineNum:lineNum, disposition:"Bye"}}})
      haveActiveCall(lineNum)
      // alert("#line-" + lineNum + "-msg" + "conference_call_terminated");
    },
    onSessionDescriptionHandler: function (sdh, provisional) {
      if (sdh) {
        if (sdh.peerConnection) {
          sdh.peerConnection.ontrack = function (event) {
            var pc = sdh.peerConnection;

            // Gets Remote Audio Track (Local audio is setup via initial GUM)
            var remoteStream = new MediaStream();
            pc.getReceivers().forEach(function (receiver) {
              if (receiver.track && receiver.track.kind === "audio") {
                remoteStream.addTrack(receiver.track);
              }
            });
            var html = "";
            // Remote Audio Object
            html += '<div style="display:none;">';
            html += '<audio id="line-' + lineNum + '-conference-remoteAudio-' + confCallId + '"></audio>';
            html += "</div>";
            $("#softphone").append(html);
            var remoteAudio = $(
              "#line-" + lineNum + "-conference-remoteAudio-" + confCallId
            ).get(0);
            remoteAudio.srcObject = remoteStream;
            remoteAudio.onloadedmetadata = function (e) {
              if (typeof remoteAudio.sinkId !== "undefined") {
                remoteAudio
                  .setSinkId(session.data.AudioOutputDevice)
                  .then(function () {
                    console.log(
                      "sinkId applied: " + session.data.AudioOutputDevice
                    );
                  })
                  .catch(function (e) {
                    console.warn("Error using setSinkId: ", e);
                  });
              }
              remoteAudio.play();
            };
          };
        } else {
          console.warn(
            "onSessionDescriptionHandler fired without a peerConnection"
          );
        }
      } else {
        console.warn(
          "onSessionDescriptionHandler fired without a sessionDescriptionHandler"
        );
      }
    },
  };
  // Make sure we always restore audio paths
  newSession.stateChange.addListener(function (newState) {
    if (newState === SIP.SessionState.Terminated) {
      // Ends the mixed audio, and releases the mic
      if (
        session.data.confcalls[confCallId].session.data.AudioSourceTrack &&
        session.data.confcalls[confCallId].session.data.AudioSourceTrack.kind === "audio"
      ) {
        session.data.confcalls[confCallId].session.data.AudioSourceTrack.stop();
        session.data.confcalls[confCallId].session.audioReceivers = undefined; 
      }
      // Restore Audio Stream as it was changed
      if (
        session.data.AudioSourceTrack &&
        session.data.AudioSourceTrack.kind === "audio"
      ) {
        var pc = session.sessionDescriptionHandler.peerConnection;
        // pc.getSenders().forEach(function (RTCRtpSender) {
        //   if (RTCRtpSender.track && RTCRtpSender.track.kind === "audio") {
        //     RTCRtpSender.replaceTrack(session.data.AudioSourceTrack)
        //       .then(function () {
        //         if (session.data.ismute) {
        //           RTCRtpSender.track.enabled = false;
        //         } else {
        //           RTCRtpSender.track.enabled = true;
        //         }
        //       })
        //       .catch(function () {
        //         console.error(e);
        //       });
        //     session.data.AudioSourceTrack = null;
        //   }
        // });
      }
      window.clearInterval(session.data.confcalls[confCallId].callTimer);
      store.dispatch({type:"sip/answeredCalls", payload:{action:"conferenceCallDisposition",data:{confCallId:confCallId, lineNum:lineNum, disposition:"Bye"}}})
    }
  });
  session.data.confcalls[confCallId].session = newSession;
  var inviterOptions = {
    requestDelegate: {
      onTrying: function (sip) {
        session.data.confcalls[confCallId].disposition = "trying";
        session.data.confcalls[confCallId].dispositionTime = utcDateNow();
        
        console.log("#line-" + lineNum + "-msg" + "conference_call_started");
        // alert("conf progress")
        // store.dispatch({
        //   type: "sip/answeredCalls",
        //   payload: { action: "addConferenceCall", data: { lineNum: lineNum, conferenceCallList: {number:"00"} } },
        // });
        store.dispatch({type:"sip/answeredCalls", payload:{action:"conferenceCallDisposition",data:{confCallId:confCallId, lineNum:lineNum, disposition:"Trying"}}})
      },
      onProgress: function (sip) {
        session.data.confcalls[confCallId].disposition = "progress";
        session.data.confcalls[confCallId].dispositionTime = utcDateNow();

        console.log("#line-" + lineNum + "-msg" + "conference_call_started");
        // alert("conf progress")
        // store.dispatch({
        //   type: "sip/answeredCalls",
        //   payload: { action: "addConferenceCall", data: { lineNum: lineNum, conferenceCall: {number:"00"} } },
        // });
        // {
        //     newSession.cancel().catch(function(error){
        //         console.warn("Failed to CANCEL", error);
        //     });
        //     console.log("New call session canceled");

        //     session.data.confcalls[confCallId].accept.complete = false;
        //     session.data.confcalls[confCallId].accept.disposition = "cancel";
        //     session.data.confcalls[confCallId].accept.eventTime = utcDateNow();

        //     console.log("#line-" + lineNum + "-msgconference_call_cancelled")

        // };
        store.dispatch({type:"sip/answeredCalls", payload:{action:"conferenceCallDisposition",data:{confCallId:confCallId, lineNum:lineNum, disposition:"Progress"}}})
      },
      onRedirect: function (sip) {
        console.log("Redirect received:", sip);
      },
      onAccept: function (sip) {
        session.data.confcalls[confCallId].complete = true;
        session.data.confcalls[confCallId].disposition = "accepted";
        session.data.confcalls[confCallId].dispositionTime = utcDateNow();

        // Join Call

        {//mix all
          // Merge Call Audio
          if (!session.data.confcalls[confCallId].session) {
            console.warn("Conference session lost");
            // alert("conf session lost")
            return;
          }
          var outputStreamForFirstCallSession = new MediaStream();
          var outputStreamForConfSession = new MediaStream();

          var firstCallPeerConnection = session.sessionDescriptionHandler.peerConnection;
          var confCallPeerConnection = session.data.confcalls[confCallId].session.sessionDescriptionHandler.peerConnection;

          // Get conf call input channel
          // console.log(firstCallPeerConnection?.getReceivers(),"ggggggggggggggggggggggggggggggggggggggggggggggggggggggggg")
          confCallPeerConnection?.getReceivers().forEach(function (RTCRtpReceiver) {
            // alert("// Get conf call input channel")
            if(session.data.confcalls[confCallId].session.audioReceivers) return
            if (RTCRtpReceiver.track && RTCRtpReceiver.track.kind === "audio") {
              session.data.confcalls[confCallId].session.audioReceivers = []; 
              session.data.confcalls[confCallId].session.audioReceivers.push(RTCRtpReceiver.track)
              console.log(
                "Adding conference session:",
                RTCRtpReceiver.track.label
              );
              outputStreamForFirstCallSession.addTrack(RTCRtpReceiver.track);
              for(let x=0; x<(session.data.confcalls.length|0);  x++){
                if(x===confCallId) continue
                // alert("add this to privious conf " + x);
                // if( session.data.confcalls[x].disposition !== "accepted") alert("Not active skipping"+ x)
                if( session.data.confcalls[x].disposition !== "accepted") continue
                var confCallPeerConnectionPrivious = session.data.confcalls[x].session.sessionDescriptionHandler.peerConnection;
                confCallPeerConnectionPrivious?.getSenders().forEach(function (RTCRtpSenderPrivious) {
                    var confSession = session.data.confcalls[x].session
                    var outputStreamForPriviousConfSession = new MediaStream()
                    outputStreamForPriviousConfSession.addTrack(RTCRtpReceiver.track)
                    confSession.data.mixedAudioTrack = ConferenceMixAudioStreams(
                      outputStreamForPriviousConfSession, 
                    RTCRtpSenderPrivious.track.IsMixedTrack? confSession.data.mixedAudioTrack[0] : undefined,
                    RTCRtpSenderPrivious.track.IsMixedTrack? confSession.data.mixedAudioTrack[1] : undefined,
                  )
                  var mixedAudioTrackForConf = confSession.data.mixedAudioTrack[0].stream.getAudioTracks()[0];
                  mixedAudioTrackForConf.IsMixedTrack = true;
                  RTCRtpSenderPrivious.replaceTrack(mixedAudioTrackForConf);
                })
              }
            }
          });
          if (session.audioReceivers) {
            outputStreamForConfSession.addTrack(session.audioReceivers[0]);
            for(let x=0; x < (session.data.confcalls.length|0); x ++){
              if(x===confCallId) continue
              // alert("add old conf to this conf " + x);
              // if( session.data.confcalls[x].disposition !== "accepted") alert("Not active skipping"+ x)
              if( session.data.confcalls[x].disposition !== "accepted") continue
              var priviousConfTracList = session.data.confcalls[x].session.audioReceivers
              for(let y=0; y < (priviousConfTracList?.length | 0); y++ ) {
                outputStreamForConfSession.addTrack(priviousConfTracList[y]);
              }
            }
          }
          // Get session input channel
          firstCallPeerConnection?.getReceivers().forEach(function (RTCRtpReceiver) {
            // alert("// Get session input channel")
            if (session.audioReceivers) {
              // outputStreamForConfSession.addTrack(session.audioReceivers[0]);
              // for(let x=0; x < confCallId; x ++){
              //   alert("add old conf to this conf " + x);
              //   var priviousConfTracList = session.data.confcalls[x].session.audioReceivers
              //   for(let y=0; y < (priviousConfTracList?.length | 0); y++ ) {
              //     outputStreamForConfSession.addTrack(priviousConfTracList[y]);
              //   }
              // }
              return
            }
            if (RTCRtpReceiver.track && RTCRtpReceiver.track.kind === "audio") {
              session.audioReceivers = []; 
              session.audioReceivers.push(RTCRtpReceiver.track)
              console.log(
                "Adding conference session:",
                RTCRtpReceiver.track.label
              );
              outputStreamForConfSession.addTrack(RTCRtpReceiver.track);
            }
          });

          // Replace tracks of Parent Call
          firstCallPeerConnection?.getSenders().forEach(function (RTCRtpSender) {
            // alert("// Replace tracks of Parent Call")
            if (RTCRtpSender.track && RTCRtpSender.track.kind === "audio") {
              console.log("Switching to mixed Audio track on session");

              session.data.AudioSourceTrack = RTCRtpSender.track.IsMixedTrack ? session.data.AudioSourceTrack : RTCRtpSender.track;
              
              if(!RTCRtpSender.track.IsMixedTrack) outputStreamForFirstCallSession.addTrack(RTCRtpSender.track);
              session.data.mixedAudioTrack =  ConferenceMixAudioStreams(
                outputStreamForFirstCallSession, 
                RTCRtpSender.track.IsMixedTrack? session.data.mixedAudioTrack[0] : undefined,
                RTCRtpSender.track.IsMixedTrack? session.data.mixedAudioTrack[1] : undefined,
              )
              var mixedAudioTrack = session.data.mixedAudioTrack[0].stream.getAudioTracks()[0];
              mixedAudioTrack.IsMixedTrack = true;

              RTCRtpSender.replaceTrack(mixedAudioTrack);
            }
          });
          // Replace tracks of Child Call
          confCallPeerConnection.getSenders().forEach(function (RTCRtpSender) {
            // alert("// Replace tracks of Child Call") 
            if (RTCRtpSender.track && RTCRtpSender.track.kind === "audio") {
              console.log("Switching to mixed Audio track on conf call");
              var confSession = session.data.confcalls[confCallId].session
              confSession.data.AudioSourceTrack = RTCRtpSender.track.IsMixedTrack ? confSession.data.AudioSourceTrack : RTCRtpSender.track;
              outputStreamForConfSession.addTrack(RTCRtpSender.track);
              confSession.data.mixedAudioTrack = ConferenceMixAudioStreams(
                outputStreamForConfSession,
                RTCRtpSender.track.IsMixedTrack? confSession.data.mixedAudioTrack[0] : undefined,
                RTCRtpSender.track.IsMixedTrack? confSession.data.mixedAudioTrack[1] : undefined,
              )
              var mixedAudioTrackForConf = confSession.data.mixedAudioTrack[0].stream.getAudioTracks()[0];
              mixedAudioTrackForConf.IsMixedTrack = true;

              RTCRtpSender.replaceTrack(mixedAudioTrackForConf);
            }
          });
          console.log("Conference Call In Progress");

          session.data.confcalls[confCallId].accept.complete = true;
          session.data.confcalls[confCallId].accept.disposition = "join";
          session.data.confcalls[confCallId].accept.eventTime = utcDateNow();

          console.log(
            "#line-" + lineNum + "-btn-terminate-conference-call show()"
          );
          console.log(
            "#line-" + lineNum + "-msg" + "conference_call_in_progress"
          );
          var joinTime = moment.utc();
          session.data.confcalls[confCallId].joinTime = joinTime;
          session.data.confcalls[confCallId].callTimer = window.setInterval(function () {
            var now = moment.utc();
            var duration = moment.duration(now.diff(joinTime));
            var timeStr = formatShortDuration(duration.asSeconds());
            console.log("#conf-" + confCallId + "-timer:" + timeStr);
            console.log("#conf-" + confCallId + "-datetime:" + timeStr);
            store.dispatch({type:"sip/answeredCalls", payload:{action:"conferenceCallTimer",data:{confCallId:confCallId, lineNum:lineNum, callTimer:timeStr}}})
          }, 1000);
          store.dispatch({type:"sip/answeredCalls", payload:{action:"conferenceCallDisposition",data:{confCallId:confCallId, lineNum:lineNum, disposition:"Joined"}}})
          // window.clearInterval(session.data.confcalls[confCallId].callTimer);
        }

        // const = ()=>{
        //     newSession.bye().catch(function(e){
        //         console.warn("Failed to BYE", e);
        //     });
        //     console.log("New call session end");

        //     // session.data.confcalls[confCallId].accept.complete = false;
        //     session.data.confcalls[confCallId].accept.disposition = "bye";
        //     session.data.confcalls[confCallId].accept.eventTime = utcDateNow();

        //     console.log("#line-" + lineNum + "-msgconference_call_ended")
        //     CancelConference(lineNum);

        // };
        // alert("conf started")
        // store.dispatch({
        //   type: "sip/answeredCalls",
        //   payload: { action: "addConferenceCall", data: { lineNum: lineNum, conferenceCallList: {number:"00"} } },
        // });
        store.dispatch({type:"sip/answeredCalls", payload:{action:"conferenceCallDisposition",data:{confCallId:confCallId, lineNum:lineNum, disposition:"Accepted"}}})
      },
      onReject: function (sip) {
        console.log("New call session rejected: ", sip.message.reasonPhrase);
        session.data.confcalls[confCallId].disposition =
          sip.message.reasonPhrase;
        session.data.confcalls[confCallId].dispositionTime = utcDateNow();
        console.log("#line-" + lineNum + "-msg" + "conference_call_rejected");
        store.dispatch({type:"sip/answeredCalls", payload:{action:"conferenceCallDisposition",data:{confCallId:confCallId, lineNum:lineNum, disposition:sip.message.reasonPhrase}}})
      },
    },
  };
  newSession.invite(inviterOptions).catch(function (e) {
    console.warn("Failed to send INVITE:", e);
  });
  // session.data.confcalls[confCallId].session = newSession;
  store.dispatch({
    type: "sip/answeredCalls",
    payload: {
      action: "addConferenceCall", data: {
        lineNum: lineNum,
        conferenceCallList: {
          id:confCallId,
          startTime: new Date().toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3"),
          disposition: session.data.confcalls[confCallId].disposition,
          dispositionTime: session.data.confcalls[confCallId].dispositionTime,
          to: session.data.confcalls[confCallId].to,
          callTimer: session.data.confcalls[confCallId].callTimer,
        }
      }
    },
  });
  // console.log(session, "aaaaaaaaaaaaaaaaaaaaaaaaaaaa")
}

// addEventListener("beforeunload", (event) => {
//   var CurrentCalls = countSessions("0");
//   if (CurrentCalls > 0) {
//     console.warn("Warning, you have current calls open");
//     event.preventDefault();
//     return (event.returnValue = "");
//   }
//   try {
//     Unregister(true);
//   } catch (error) {}
// });


////////////////////////////////////////////////////////


var current_active_call_id = 0;
function removeCallFromCallSelectModal(id){
    // let elem = document.getElementById("call-select-modal-"+id)
    // if(elem){
    //     elem.remove();
    // } 
}
function muteIfInactiveCall(call){
    //return here to stop muting inactive calls 
    if(call.status !== "CallAnswered"){
        console.log("Skipping Call!")
        return
    }
    if(call.LineNumber === getCurrentActiveCallId() && call.ismute ){
        mute(call.LineNumber)
    }else if(call.LineNumber !== getCurrentActiveCallId() && !call.ismute){
        mute(call.LineNumber,null,false)
    }
    console.log(call.ismute ? true: false)
}
function muteAllInactiveCalls(){
    Lines.forEach(muteIfInactiveCall);
}

function changeCall(id){
    showCallSelectModal(0);
    let status = FindLineByNumber(id).status;
    if(status === "CallAnswered"){
        if(FindLineByNumber(id).SipSession.isOnHold){
            hold(0, 1);
        }else{
            hold(0, 0);
        }
        if(FindLineByNumber(id).ismute){
            mute(0, 1);
        }else{
            mute(0, 0);
        }
        // onCallUI(id);
    }else if(status === "Calling"){
        callingUI(id);
        //document.getElementById('webphone-called-number').innerHTML = FindLineByNumber(id).DisplayNumber;
        // outboundCall = true;
    }else if(status === "ReceiveCall"){
        // incomingCallUI(id, FindLineByNumber(id).DisplayName, FindLineByNumber(id).DisplayNumber);
    }
    updateVoluemUI(); //Update interface to volume level of the current call
    BackgroundAvailable(0, true);
    muteAllInactiveCalls()
    mute(0, 0);
}
function addCallToCallSelectModal(id, text){
    let elem = `         
                <div id="call-select-modal-` + id + `" class="flex 
                justify-between 
                extension-border
                border p-3      
                items-center
                cursor-pointer"
                onclick="changeCall('` + id + `')">
                <div class="flex gap-2 items-center cursor-pointer">
                    <label class="text-sm label-item relative font-medium pl-10 duration-200 ease-in transition-colors
                    select-none text-[#3C3C3C] peer-checked:text-[#3B9EF7] cursor-pointer
                    ">
                    ` + text + `
                    </label>
                </div>
                </div>`;
    //document.getElementById("call-list").innerHTML = elem + //document.getElementById("call-list").innerHTML;
        
}
function showCallSelectModal(show=1){
    if(show){
        //document.getElementById('select-call').classList.remove("d-none");
    }else{
        //document.getElementById('select-call').classList.add("d-none");
    }
}
function getCurrentActiveCallId(){
    return current_active_call_id;
}
function updateCallerInformationUI(){
    try {
        if( FindLineByNumber(current_active_call_id).DisplayName === undefined ){
            //document.getElementById('webphone-called-number').innerHTML = FindLineByNumber(current_active_call_id).DisplayNumber  
            //document.getElementById('caller-number').innerHTML = ""
        }else{
            //document.getElementById('webphone-called-number').innerHTML = FindLineByNumber(current_active_call_id).DisplayName
            //document.getElementById('caller-number').innerHTML = FindLineByNumber(current_active_call_id).DisplayNumber  
        }
        
    } catch (error) {
    }
}
function setCurrentActiveCallId(id=0, status = 0){
    current_active_call_id = id;
    updateCallerInformationUI();
    if(status){
        setStatus(id, status)
    }

}
function BackgroundAvailable(val=0, auto=false){
  return;
    if(auto === true){
        val = Lines.length > 1 ;
        if(Lines.length === 1 && getCurrentActiveCallId() !== Lines[0].LineNumber){
            console.log("Show last call to front")
            console.log(getCurrentActiveCallId(), "----", Lines[0].LineNumber)
            changeCall(`${Lines[0].LineNumber}`)
        }
    }
    if(val||(Lines.length === 1 && getCurrentActiveCallId() !== Lines[0].LineNumber)){
        $("#background-call").removeClass("d-none");
    }else{
        $("#background-call").addClass("d-none");
    }
}
function Unregister(skipUnsubscribe?:boolean) {
  try {
    if (userAgent === null || !userAgent.isRegistered()) return;
    if (skipUnsubscribe === true) {
        console.log("Skipping Unsubscribe");
        store.dispatch({type:"sip/sipRegistrationStatus", payload:"Skipping Unsubscribe"})
        // document.getElementById("status").innerHTML = "Skipping Unsubscribe";
    } else {
        console.log("Unsubscribing...");
        store.dispatch({type:"sip/sipRegistrationStatus", payload:"Unsubscribing..."})
        // document.getElementById("status").innerHTML = "Unsubscribing...";
    }

    console.log("Unregister...");
    store.dispatch({type:"sip/sipRegistrationStatus", payload:"Unregister..."})
    //   //document.getElementById("status").innerHTML = "Unregister...";
    userAgent.registerer.unregister();

    userAgent.transport.attemptingReconnection = false;
    userAgent.registering = false;
    userAgent.isReRegister = false; 
  } catch (error) {} 
}
function RefreshRegistration() {
    Unregister();
    console.log("Unregister complete...");
    store.dispatch({type:"sip/sipRegistrationStatus", payload:"Unregister complete..."})
    //document.getElementById("status").innerHTML = "Unregister complete...";
    window.setTimeout(function () {
        console.log("Starting registration...");
        store.dispatch({type:"sip/sipRegistrationStatus", payload:"Starting registration..."})
        // document.getElementById("status").innerHTML = "Starting registration...";
        Register();
    }, 1000);
}
function call(phoneNo) {
    DialByLine("audio", phoneNo);
    // document.getElementById("calling-state").innerHTML = "Calling....";
    //document.getElementById('webphone-called-number').innerHTML = phoneNo;
}
function callVideo(phoneNo) {

}
function hold(id, status_interface = null) {
    return
    _vSansayUiHold ^= 1;
    if(status_interface !=null){
        _vSansayUiHold = status_interface
    }
    if (_vSansayUiHold) {
        $("#webphone-hold-btn > img").addClass("hold-colors");
        $("#webphone-hold-btn > span").text("Resume");
    } else {
        $("#webphone-hold-btn img").removeClass("hold-colors");
        $("#webphone-hold-btn > span").text("Hold");
    }
    if(status_interface === null){
        if (_vSansayUiHold) {
            holdSession(id)
        } else {
            unholdSession(id)
        }
    }        

}

function answer(id) {
    // hold(0, 0);
    // mute(0,0);
    AnswerAudioCall(id);
    // onCallUI(id);
    updateVoluemUI()
}
function hangupOnRinging(LineNumber) {
    RejectCall(LineNumber)
    // dialpadUI();
}
function mute(id, status_interface = null, update_interface = true) {
    return
    _vSansayUiMute ^= 1;
    if(status_interface !=null){
        _vSansayUiMute = status_interface
    }
    console.log(_vSansayUiMute, "mute state");
    if( (update_interface === true && id === getCurrentActiveCallId()) || status_interface !== null  ){
        console.log("change mute interface")
        $(".webphone-mute-btn > img").attr(
            "src",
            _vSansayUiMute ? "/images/unmute.svg" : "/images/mute.svg"
        );
        let nextEle = $(".webphone-mute-btn > span");
        if (nextEle) {
            nextEle.text(_vSansayUiMute ? "Unmute" : "Mute");
        }
    }
    if(status_interface === null){
        if (_vSansayUiMute) {
            MuteSession(id)
        } else {
            try {UnmuteSession(id)} catch (error) {}
        }
    }
}
function muteAfterAnswer(id = getCurrentActiveCallId()){
    var lineObj = FindLineByNumber(id);
    lineObj.muteAfterAnswer ^= 1;
    mute(0,lineObj.muteAfterAnswer);
}
function transferBlind() {
    if(getCurrentActiveCallId() && document.querySelector(".webphone-digits").value.length >0 ){
        BlindTransfer(getCurrentActiveCallId(), document.querySelector(".webphone-digits").value)
    }
}
function transferAttended() {
    if(getCurrentActiveCallId() && document.querySelector(".webphone-digits").value.length >0 ){
        AttendedTransfer(getCurrentActiveCallId(), document.querySelector(".webphone-digits").value)
    }
}
function dialConference(phoneNo) {
    ConferenceDial(document.querySelector('input[name=lineID]:checked').value, phoneNo)
}
function onRegisterFailed(response, cause) {
    console.log("Registration Failed: " + response);
    userAgent.registering = false;
    // loginErrorUI();
    store.dispatch({type:"sip/authLoading", payload:false})
    store.dispatch({type:"sip/authMessage", payload:"Invalid credentials"})
}
function onRegistered() {
    // This code fires on re-register after session timeout
    // to ensure that events are not fired multiple times
    // a isReRegister state is kept.
    // TODO: This check appears obsolete
    userAgent.registrationCompleted = true;
    if (!userAgent.isReRegister) {
        console.log("Registered!");
        userAgent.registering = false;
        // sessionStorage.setItem("user", userAgent['options']['authorizationUsername'])
        // localStorage.getItem("ext_user_id", userAgent['options']['authorizationUsername']);
        // localStorage.getItem("ext_password", userAgent['options']['authorizationPassword']);
        // console.log(userAgent['options'])
        // console.log(userAgent)
        // loginSuccessUI();

        localStorage.setItem("ext_connected", "true");
        store.dispatch({type:"sip/extNumber", payload:userAgent['options']['authorizationUsername']})
        store.dispatch({type:"sip/authMessage", payload:"continue"})
        store.dispatch({type:"sip/authLoading", payload:false})
    }
    else {
        userAgent.registering = false;
        console.log("ReRegistered!");
    }
    userAgent.isReRegister = true;
}
function OnReceiveCall(newLineNumber, callerID, did) {

    // incomingCallUI(newLineNumber, callerID, did);
    // outboundCall = false;
}
function hungupOnDial(id) {
    
    // outboundCall = false;
}
function onInviteCanceled(id=null) {
    // dialpadUI();
    // outboundCall = false;
}
// let outboundCall = false;
function onCalling(id, number) {
    // document.getElementById("calling-state").innerHTML = "Calling....";
    // callingUI(id);
    //document.getElementById('webphone-called-number').innerHTML = number;
    // outboundCall = true;
}

function onCallEndByOtherSide(id) {
    // if (isKeyPadActive) {
    //     keypadSwitch();
    // }
    // if (isTransferKeyPadActive) {
    //     keypadSwitchTransfer()
    // }
    // onCallEndUI();
    // outboundCall = false;
    // setCurrentActiveCallId()
}
function onCallAnswered(id) {
    // hold(0, 0);
    // mute(0,0);
    // // onCallUI(id);
    // updateVoluemUI()
    // // outboundCall = false;
}

function hangup(LineNumber:number) {
    // if (isKeyPadActive) {
    //     keypadSwitch();
    // }
    // if (isTransferKeyPadActive) {
    //     keypadSwitchTransfer()
    // }
    let outbound = 0;
    try {
        if(FindLineByNumber(LineNumber).SipSession.data.calldirection === "outbound"){
            outbound = 1
        }
    } catch (error) {}
    if(outbound && FindLineByNumber(LineNumber).SipSession.state  !== 'Established' ){
        store.dispatch({type:"sip/ringingOutboundCalls", payload:{action:"remove",data:LineNumber}})
        cancelSession(LineNumber)
    }else{
        endSession(LineNumber);
    }
    // outboundCall = false;
    // onCallEndUI();
    // setCurrentActiveCallId()
}

function changeVolume(amount) {
    var audioobject = //document.getElementById("line-" + getCurrentActiveCallId() + "-remoteAudio");
    audioobject.volume = amount;
}
function getVoluemLevel(){
    return //document.getElementById("line-" + getCurrentActiveCallId() + "-remoteAudio").volume;
}
function updateVoluemUI(){
    //document.getElementById("volume").value = getVoluemLevel()
}
function microphoneDeviceUpdate(value){
  localStorage.setItem("microphoneDevice", value);
  renderMicrophoneDevice();
}  
      
function speakerDeviceUpdate(value){
  localStorage.setItem("speakerDevice", value);
  renderSpeakerDevice();
}   
function removeAllOtionFromSelectInput(selectBox) {
    try {
        while (selectBox.options.length > 0) {
            selectBox.remove(0);
        }
    } catch (error) { }
}

function renderMicrophoneDevice(){
    try {
        let microphoneDevice = //document.getElementById("microphoneDevice");
        removeAllOtionFromSelectInput(microphoneDevice)
        AudioinputDevices.forEach((audioinputDevice) => {
        let option = document.createElement("option");
        option.text = audioinputDevice.label;
        option.value = audioinputDevice.deviceId;
        if(localStorage.getItem("microphoneDevice") === audioinputDevice.deviceId){
            option.setAttribute("selected","selected")
        }
        microphoneDevice.appendChild(option);
        });
        micChangedRefreshDevice();
    } catch (error) {}

}

function renderSpeakerDevice(){
    try {
        let speakerDevice = //document.getElementById("speakerDevice");
        removeAllOtionFromSelectInput(speakerDevice)
        SpeakerDevices.forEach((speakerDeviceEle) => {
        let option = document.createElement("option");
        option.text = speakerDeviceEle.label;
        option.value = speakerDeviceEle.deviceId;
        if(localStorage.getItem("speakerDevice") === speakerDeviceEle.deviceId){
            option.setAttribute("selected","selected")
        }
        speakerDevice.appendChild(option);
        }); 
    } catch (error) {}
}

function renderDevice(){
    DetectDevices();
    renderMicrophoneDevice();
    renderSpeakerDevice();
}
class SoundMeter {
    constructor(sessionId, lineNum) {
        var audioContext = null;
        try {
            window.AudioContext = window.AudioContext || window.webkitAudioContext;
            audioContext = new AudioContext();
        }
        catch (e) {
            console.warn("AudioContext() LocalAudio not available... its fine.");
        }
        if (audioContext === null) return null;
        this.context = audioContext;
        this.source = null;

        this.lineNum = lineNum;
        this.sessionId = sessionId;

        this.captureInterval = null;
        this.levelsInterval = null;
        this.networkInterval = null;
        this.startTime = 0;

        this.ReceiveBitRateChart = null;
        this.ReceiveBitRate = [];
        this.ReceivePacketRateChart = null;
        this.ReceivePacketRate = [];
        this.ReceivePacketLossChart = null;
        this.ReceivePacketLoss = [];
        this.ReceiveJitterChart = null;
        this.ReceiveJitter = [];
        this.ReceiveLevelsChart = null;
        this.ReceiveLevels = [];
        this.SendBitRateChart = null;
        this.SendBitRate = [];
        this.SendPacketRateChart = null;
        this.SendPacketRate = [];

        this.instant = 0; // Primary Output indicator

        this.AnalyserNode = this.context.createAnalyser();
        this.AnalyserNode.minDecibels = -90;
        this.AnalyserNode.maxDecibels = -10;
        this.AnalyserNode.smoothingTimeConstant = 0.85;
    }
    connectToSource(stream, callback) {
        console.log("SoundMeter connecting...");
        try {
            this.source = this.context.createMediaStreamSource(stream);
            this.source.connect(this.AnalyserNode);
            // this.AnalyserNode.connect(this.context.destination); // Can be left unconnected
            this._start();

            callback(null);
        }
        catch (e) {
            console.error(e); // Probably not audio track
            callback(e);
        }
    }
    _start() {
        var self = this;
        self.instant = 0;
        self.AnalyserNode.fftSize = 32; // 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384, and 32768. Defaults to 2048
        self.dataArray = new Uint8Array(self.AnalyserNode.frequencyBinCount);

        this.captureInterval = window.setInterval(function () {
            self.AnalyserNode.getByteFrequencyData(self.dataArray); // Populate array with data from 0-255

            // Just take the maximum value of this data
            self.instant = 0;
            for (var d = 0; d < self.dataArray.length; d++) {
                if (self.dataArray[d] > self.instant) self.instant = self.dataArray[d];
            }

        }, 1);
    }
    stop() {
        console.log("Disconnecting SoundMeter...");
        window.clearInterval(this.captureInterval);
        this.captureInterval = null;
        window.clearInterval(this.levelsInterval);
        this.levelsInterval = null;
        window.clearInterval(this.networkInterval);
        this.networkInterval = null;
        try {
            this.source.disconnect();
        }
        catch (e) { }
        this.source = null;
        try {
            this.AnalyserNode.disconnect();
        }
        catch (e) { }
        this.AnalyserNode = null;
        try {
            this.context.close();
        }
        catch (e) { }
        this.context = null;

        // Save to IndexDb
        var lineObj = FindLineByNumber(this.lineNum);
        var QosData = {
            ReceiveBitRate: this.ReceiveBitRate,
            ReceivePacketRate: this.ReceivePacketRate,
            ReceivePacketLoss: this.ReceivePacketLoss,
            ReceiveJitter: this.ReceiveJitter,
            ReceiveLevels: this.ReceiveLevels,
            SendBitRate: this.SendBitRate,
            SendPacketRate: this.SendPacketRate,
        }
        if (this.sessionId !== null) {
            SaveQosData(QosData, this.sessionId, lineObj.BuddyObj.identity);
        }
    }
}
function MeterSettingsOutput(audioStream, objectId, direction, interval) {
    var soundMeter = new SoundMeter(null, null);
    soundMeter.startTime = Date.now();
    soundMeter.connectToSource(audioStream, function (e) {
        if (e !== null) return;
        console.log("SoundMeter Connected, displaying levels to:" + objectId);
        soundMeter.levelsInterval = window.setInterval(function () {
            // Calculate Levels (0 - 255)
            var instPercent = (soundMeter.instant / 255) * 100;
            $("#" + objectId).css(direction, instPercent.toFixed(2) + "%");
        }, interval);
    });

    return soundMeter;
}
function micChangedRefreshDevice(){
    console.log("Call to change Microphone (" + getAudioSrcID() + ")");

    // Change and update visual preview
    try {
        var tracks = window.SettingsMicrophoneStream.getTracks();
        tracks.forEach(function (track) {
            track.stop();
        });
        window.SettingsMicrophoneStream = null;
    }
    catch (e) { }

    try {
        soundMeter = window.SettingsMicrophoneSoundMeter;
        soundMeter.stop();
        window.SettingsMicrophoneSoundMeter = null;
    }
    catch (e) { }

    // Get Microphone
    var constraints = {
        audio: {
            deviceId: { exact: getAudioSrcID() }
        },
        video: false
    }
    var localMicrophoneStream = new MediaStream();
    navigator.mediaDevices.getUserMedia(constraints).then(function (mediaStream) {
        var audioTrack = mediaStream.getAudioTracks()[0];
        if (audioTrack !== null) {
            // Display Micrphone Levels
            localMicrophoneStream.addTrack(audioTrack);
            window.SettingsMicrophoneStream = localMicrophoneStream;
            window.SettingsMicrophoneSoundMeter = MeterSettingsOutput(localMicrophoneStream, "Settings_MicrophoneOutput", "width", 100);
        }
    }).catch(function (e) {
        console.log("Failed to getUserMedia", e);
    });
    
}
function haveActiveCall(LineNumber:number){
  const lineObj = FindLineByNumber(LineNumber)
  var session = lineObj.SipSession;
  console.log("ddddddddddddddddd",session)
  // alert( !(session.data.disposed || session.disposed) )
  if( !(session.data.disposed || session.disposed) ) return
  // alert("in")
  // alert(session.data.disposed + "" + session.disposed)
  if(!session.data.confcalls ){ // If no conf call finish
    store.dispatch({type:"sip/answeredCalls", payload:{action:"remove",data:LineNumber}});
    return;
  } 
  let activeConfCall = false;
  for(const conf of session.data.confcalls){
    console.log(conf.disposition=="accepted", "....................")
    if(conf.disposition==="accepted"){
      activeConfCall = true;
      break;
    }
  }
  console.log(activeConfCall, "activeConfCallactiveConfCall")
  console.log(lineObj,"..............................")
  // alert("activeConfCall")
  if(activeConfCall == true) {
    store.dispatch({type: "sip/answeredCalls",payload: { action: "disposition", data: { lineNum: LineNumber, disposition:"Bye" } },});
    return // If active conf call do nothing
  }
  console.log(activeConfCall, "activeConfCallactiveConfCall")
  for(const conf of session.data.confcalls){ // Make sure to hungup all conf call
    if(conf.session?._state !== "Terminated" && conf.disposition !=="bye"){
      conf.session.dispose()
    }
  }
  if(session.data.confcalls) {
    if(session.data.disposed){
      const id = session._id
      // console.log("nnnnnnnnnnnnnnn",id)
      // window.setTimeout(function () {
      //   if(userAgent.sessions[id]){
      //     alert("userAgent.sessions[id]")
      //     alert(userAgent.sessions[id]._state)
      //     userAgent.sessions[id].disposed = false;
      //     userAgent.sessions[id].dispose()
      //   }
      // }, 1000);
    }
    // alert("End conf")
  }
  store.dispatch({type:"sip/answeredCalls", payload:{action:"remove",data:LineNumber}}) // change the ui
  window.clearInterval(session.data.callTimer);
  window.setTimeout(function () {
      RemoveLine(lineObj); // remove line
  }, 1000);
}
const socket = io("https://ssp-backend.ringplan.com", {
  path: "/ws",
  transports: ["websocket"],
  secure: true,
  autoConnect: false,
  reconnectionDelay: 1500,
});
socket.on("status.status.updated.v2", (data) => {
  console.log(data)
  try {
    console.log("Received status update:", data);
    const status = {
      main_status:data.main_status.status,
      additional_status:data.additional_status.status
    }
    store.dispatch({type:"sip/status", payload:status})
  } catch (error) {
    console.log(error)
  }
});
const userInteractionForAudioPlayerStart = (event) => {
  if(!userInteractionForAudioPlayer && ringer.paused && ringerCallWaiting.paused){
    ringerLoad()
    ringerCallWaitingLoad()
    userInteractionForAudioPlayer = true
  }
  document.body.removeEventListener('click', userInteractionForAudioPlayerStart);
  document.body.removeEventListener('touchstart', userInteractionForAudioPlayerStart);
}
document.body.addEventListener('click', userInteractionForAudioPlayerStart);
document.body.addEventListener('touchstart', userInteractionForAudioPlayerStart);
function  UnmuteConference(LineNumber){
  UnmuteSession(LineNumber)
  var lineObj = FindLineByNumber(LineNumber);
  if (lineObj === null || lineObj.SipSession === null) return;

  var session = lineObj.SipSession;
  if(!session.data.confcalls) return;
  for(let x=0; x < (session.data.confcalls.length|0); x ++){
    session.data.confcalls[x].session.data.AudioSourceTrack.enabled = true
  }

}
function MuteConference(LineNumber){
  MuteSession(LineNumber) 
  var lineObj = FindLineByNumber(LineNumber);
  if (lineObj === null || lineObj.SipSession === null) return;

  var session = lineObj.SipSession;
  if(!session.data.confcalls) return;
  for(let x=0; x < (session.data.confcalls.length|0); x ++){
    session.data.confcalls[x].session.data.AudioSourceTrack.enabled = false
  }
}
const sip = {
  CreateUserAgent: (username:string, password:string, domain:string) => {
    if(userAgent){
      Unregister();
      userAgent = null;
    };
    domain = domain.split(".").slice(-3).join(".");
    store.dispatch({type:"sip/authLoading", payload:true})
    profileName = username;
    wssServer = "webrtc.ringplan.com";
    WebSocketPort = "443";
    ServerPath = "/";
    SipDomain = domain;
    SipUsername = username;
    SipPassword = password;


    // wssServer = "localhost";
    // WebSocketPort = "8089";
    // ServerPath = "/ws";
    // SipDomain = "localhost";
    // SipPassword = "@300300";
	
    localStorage.setItem("ext_user_id", SipUsername);
    localStorage.setItem("ext_password", SipPassword);
    localStorage.setItem("ext_domain", SipDomain);
    // setCookie("ext_connected", "false");
    CreateUserAgent()
    if(localStorage.getItem('extAuth') !== "true"){
      socket.emit("authenticate", { token: getCookie("id_token") });
      socket.connect();
    }
  },
  LoginWithAPI:(ext?:any)=>{
    store.dispatch({type:"sip/extAuth", payload:false});
    localStorage.setItem('extAuth', "false");
    store.dispatch({ type: "sip/apiAuth", payload: ext });
    localStorage.setItem("apiAuth", JSON.stringify(ext) );
    sip.CreateUserAgent(ext["user"],ext["password"],ext["server"])
  },
  call: (number: string) => {
    // console.log(`calling ${number}`)
    // store.dispatch({type:"call/progressCall"})
    DialByLine("audio", number);
  },
  hungup: (LineNumber: number) =>  {
    if(!FindLineByNumber(LineNumber)?.SipSession?.data?.confcalls){
      store.dispatch({type:"sip/answeredCalls", payload:{action:"remove",data:LineNumber}})
    }
    hangup(LineNumber)
    SelectLine(store.getState().sip.activeCallLineNumber)
    haveActiveCall(LineNumber)
  },
  hungupConference: (LineNumber: number) =>  {
    const lineObj = FindLineByNumber(LineNumber)
    var session = lineObj.SipSession;
    hangup(LineNumber)
    for(const conf of session.data.confcalls){ // Make sure to hungup all conf call
      if(conf.session?._state !== "Terminated" && conf.disposition !=="bye"){
        conf.disposition = "bye";
        conf.session.dispose()
      }
    }
    haveActiveCall(LineNumber)
  },
  rejectCall: (LineNumber: number ) =>  {
    store.dispatch({type:"sip/ringingInboundCalls", payload:{action:"remove",data:LineNumber}})
    RejectCall(LineNumber)
  },
  answerAudioCall: (LineNumber: number ) =>  {
    store.dispatch({type:"sip/ringingInboundCalls", payload:{action:"answer",data:LineNumber}})
    AnswerAudioCall(LineNumber)
    if(!ringer.paused){
      ringer.pause();
      ringerCallWaiting.play();
    }
  },
  mute: (LineNumber: number, isMute: Boolean ) =>  {
    try {
      isMute ? UnmuteSession(LineNumber) : MuteSession(LineNumber) 
    } catch (error) {console.log(error)}
  },
  muteConference: (LineNumber: number, isMute: Boolean ) =>  {
    try {
      isMute ? UnmuteConference(LineNumber) : MuteConference(LineNumber) 
    } catch (error) {console.log(error)}
  },
  hold: (LineNumber: number, isHold: Boolean ) =>  {
    try {
      isHold ? unholdSession(LineNumber) : holdSession(LineNumber) 
    } catch (error) {console.log(error)}
  },
  volumeLevel: (LineNumber: number, volumeLevel: string ) =>  {
    const amount:number = volumeLevel / 100
    // console.log("Volume level", amount)
    store.dispatch({type:"sip/answeredCalls", payload:{action:"volumeLevel",data:{lineNum:LineNumber, volumeLevel:volumeLevel}}})
    var audioobject = document.getElementById("line-" + LineNumber + "-remoteAudio");
    if(audioobject) audioobject.volume = amount;
    sip.volumeLevelConference(LineNumber, volumeLevel)
  },
  volumeLevelConference: (LineNumber: number, volumeLevel: string ) =>  {
    var lineObj = FindLineByNumber(LineNumber);
    if (lineObj === null || lineObj.SipSession === null) return;
    var session = lineObj.SipSession;
    if(!session.data.confcalls) return;
    const amount:number = volumeLevel / 100
    for(let x=0; x < (session.data.confcalls.length|0); x ++){
      var audioobject = document.getElementById("line-" + LineNumber + "-conference-remoteAudio-" + x);
      if(audioobject) audioobject.volume = amount;
      // console.log("Volume level", amount, ",Conf",x)
    }
  },
  sendDTMF: (LineNumber: number, value: string ) =>  {
    sendDTMF(LineNumber, value)
  },
  addCall: (LineNumber: number, number: string ) =>  {
    DialByLine("audio", number);
  },
  conference:(LineNumber: number, number: string ) =>  {
    ConferenceDial(LineNumber, number);
  },
  cancelConference:(LineNumber: number) =>  {
    // CancelConference(LineNumber);
  },
  disposeConference:(LineNumber: number, id: number) =>  {
    try {
      FindLineByNumber(LineNumber).SipSession.data.confcalls[id].disposition = "bye";
    } catch (error) { 
    }
    FindLineByNumber(LineNumber)?.SipSession?.data?.confcalls[id]?.session.dispose()
    haveActiveCall(LineNumber)
  },
  transferCall: (LineNumber: number, number: string ) =>  {
    BlindTransfer(LineNumber, number)
  },
  transferCallAtt: (LineNumber: number, number: string ) =>  {
    AttendedTransfer(LineNumber, number)
  },
  selectLine: (LineNumber: number) =>{
    SelectLine(LineNumber)
  },
  isConferenceCall: (LineNumber: number) =>{
    var lineObj = FindLineByNumber(LineNumber);
    return (lineObj?.SipSession?.data?.confcalls? true : false)
  },
  callSpeakerDevice: (LineNumber: number, value: string) => {
    var remoteAudio = $("#line-" + LineNumber + "-remoteAudio")?.get(0);
    if (typeof remoteAudio !== "undefined" && typeof remoteAudio.sinkId !== "undefined") {
      remoteAudio.setSinkId(value)
      .then(function () {
        console.log("sinkId applied: " + value);
        store.dispatch({type:"sip/answeredCalls", payload:{action:"callSpeakerDevice",data:{lineNum:LineNumber, callSpeakerDevice:value}}});
      })
      .catch(function (e) {
        console.warn("Error using setSinkId: ", e);
      });
    }
    sip.callSpeakerDeviceConference(LineNumber, value)
  },
  callSpeakerDeviceConference: (LineNumber: number, value: string) => {
    var lineObj = FindLineByNumber(LineNumber);
    if (lineObj === null || lineObj.SipSession === null) return;
    var session = lineObj.SipSession;
    if(!session.data.confcalls) return;

    for(let x=0; x < (session.data.confcalls.length|0); x ++){
      let remoteAudio = $("#line-" + LineNumber + "-conference-remoteAudio-" + x)?.get(0);
      if (typeof remoteAudio !== "undefined" && typeof remoteAudio.sinkId !== "undefined") {
        remoteAudio.setSinkId(value)
        .then(function () {
          console.log("sinkId applied: " , value , ", conf:", x);
        })
        .catch(function (e) {
          console.warn("Error using setSinkId: ", ", conf:", x, "", e);
        });
      }
    }
  },
  callMicrophoneDevice: (LineNumber: number, value: string) => {
    try {
      const lineObj = FindLineByNumber(LineNumber)
      var session = lineObj.SipSession;
      // Microphone Device Change
      if(true){
        var newid = value;
        console.log("Call to change Microphone: ", newid);
        // Save Setting
        session.data.AudioSourceDevice = newid;
        var constraints = {
            audio: {
                deviceId: (newid != "default")? { exact: newid } : "default"
            },
            video: false
        }
        navigator.mediaDevices.getUserMedia(constraints).then(function(newStream){
            // Assume that since we are selecting from a dropdown, this is possible
            var newMediaTrack = newStream.getAudioTracks()[0];
            var pc = session.sessionDescriptionHandler.peerConnection;
            pc.getSenders().forEach(function (RTCRtpSender) {
                if(RTCRtpSender.track && RTCRtpSender.track.kind == "audio") {
                    console.log("Switching Audio Track : "+ RTCRtpSender.track.label + " to "+ newMediaTrack.label);
                    RTCRtpSender.track.stop(); // Must stop, or this mic will stay in use
                    RTCRtpSender.replaceTrack(newMediaTrack).then(function(){
                      console.log("done!!!!!!!!!!!!!!!!!!!!!!!!!!!")
                    }).catch(function(e){
                        console.error("Error replacing track: ", e);
                    });
                }
            });
            store.dispatch({type:"sip/answeredCalls", payload:{action:"callMicrophoneDevice",data:{lineNum:LineNumber, callMicrophoneDevice:value}}});
        }).catch(function(e){
            console.error("Error on getUserMedia");
        });
      }
    } catch (error) { }
  },
  ringtone: (LineNumber: number, status: boolean ) =>  {
    const lineObj = FindLineByNumber(LineNumber)
    console.log(lineObj)
    const session = lineObj.SipSession
    console.log(status)
    if (session.data.ringerObj) {
      if(status==true){
        session.data.ringerObj.pause();
        session.data.ringerObj.currentTime = 0;
        store.dispatch({type:"sip/ringingInboundCalls", payload:{action:"ringtoneOff",data:lineObj.LineNumber}})
      }else{
        session.data.ringerObj.play();
        store.dispatch({type:"sip/ringingInboundCalls", payload:{action:"ringtoneOn",data:lineObj.LineNumber}})
      }
    }
  },
  changeRingerDevice: (deviceID: string) =>{
    if (deviceID != "default") {
      if( typeof ringer.sinkId !== "undefined"){
        ringer
        .setSinkId(deviceID)
        .then(function () {
          console.log("Set sinkId to:", deviceID);
        })
        .catch(function (e) {
          console.warn("Failed not apply setSinkId.", e);
        });
      }
      if( typeof ringerCallWaiting.sinkId !== "undefined"){
        ringerCallWaiting
        .setSinkId(deviceID)
        .then(function () {
          console.log("Set sinkId to:", deviceID);
        })
        .catch(function (e) {
          console.warn("Failed not apply setSinkId.", e);
        });
      }
    }
  },
  merge:(FromLineNumber: number, ToLineNumber: string ) =>  {
    console.log("FromLineNumber" + FromLineNumber + ":ToLineNumber" + ToLineNumber)
    var FromCall = FindLineByNumber(FromLineNumber);
    if (FromCall === null || FromCall.SipSession === null) return;

    var ToCall = FindLineByNumber(ToLineNumber);
    if (ToCall === null || ToCall.SipSession === null) return;

    var sessionFrom = FromCall.SipSession
    var sessionTo = ToCall.SipSession

    if(sessionFrom.data.mergedCalls) return;
    if (!sessionTo.data.mergedCalls) { //New merge
      sessionTo.data.mergedCalls = {list:[], audioStreams:[]}
      sessionTo.data.mergedCalls.list.push(ToLineNumber)
      sessionTo.sessionDescriptionHandler?.peerConnection?.getReceivers().forEach(function (RTCRtpReceiver) {
        if (RTCRtpReceiver.track && RTCRtpReceiver.track.kind === "audio") {
          sessionTo.audioReceivers = []; 
          sessionTo.audioReceivers.push(RTCRtpReceiver.track)
          sessionTo.data.mergedCalls.audioStreams.push(RTCRtpReceiver.track)
          console.log("Adding conference session:",RTCRtpReceiver.track.label);
        }
      });
    }

    sessionFrom.sessionDescriptionHandler?.peerConnection?.getReceivers().forEach(function (RTCRtpReceiver) {
      if (RTCRtpReceiver.track && RTCRtpReceiver.track.kind === "audio") {
        sessionFrom.audioReceivers = []; 
        sessionFrom.audioReceivers.push(RTCRtpReceiver.track)
        console.log("Adding conference session:",RTCRtpReceiver.track.label);
      }
    });

    {//Mix Block

      //Sender for to and prv
      for(let x=0; x < sessionTo.data.mergedCalls?.list?.length|0; x++){
        var previousCall = FindLineByNumber(sessionTo.data.mergedCalls.list[x]);
        if (previousCall === null || previousCall.SipSession === null) return;
        var previousCallSession = previousCall.SipSession;
        previousCallSession.sessionDescriptionHandler?.peerConnection?.getSenders().forEach(function (RTCRtpSender) {
          if (RTCRtpSender.track && RTCRtpSender.track.kind === "audio") {
            previousCallSession.data.AudioSourceTrack = RTCRtpSender.track.IsMixedTrack ? previousCallSession.data.AudioSourceTrack : RTCRtpSender.track;
            let outputStream = new MediaStream()
            if(!RTCRtpSender.track.IsMixedTrack) outputStream.addTrack(RTCRtpSender.track);
            outputStream.addTrack(sessionFrom.audioReceivers[0]);
            previousCallSession.data.mixedAudioTrack =  ConferenceMixAudioStreams(
              outputStream, 
              RTCRtpSender.track.IsMixedTrack? previousCallSession.data.mixedAudioTrack[0] : undefined,
              RTCRtpSender.track.IsMixedTrack? previousCallSession.data.mixedAudioTrack[1] : undefined,
            )
            var mixedAudioTrack = previousCallSession.data.mixedAudioTrack[0].stream.getAudioTracks()[0];
            mixedAudioTrack.IsMixedTrack = true;
            RTCRtpSender.replaceTrack(mixedAudioTrack);
          }
        })
      }

      //sender for from
      sessionFrom.sessionDescriptionHandler?.peerConnection?.getSenders().forEach(function (RTCRtpSender) {
        if (RTCRtpSender.track && RTCRtpSender.track.kind === "audio") {
          sessionFrom.data.AudioSourceTrack = RTCRtpSender.track.IsMixedTrack ? sessionFrom.data.AudioSourceTrack : RTCRtpSender.track;
          let outputStream = new MediaStream();
          outputStream.addTrack(RTCRtpSender.track);
          for(let x = 0; x < sessionTo.data.mergedCalls?.audioStreams?.length|0; x++){
            outputStream.addTrack(sessionTo.data.mergedCalls.audioStreams[x]);
            console.log("Adding old audios to new",sessionTo.data.mergedCalls.audioStreams[x])
          }
          sessionFrom.data.mixedAudioTrack =  ConferenceMixAudioStreams(
            outputStream, 
            RTCRtpSender.track.IsMixedTrack? sessionFrom.data.mixedAudioTrack[0] : undefined,
            RTCRtpSender.track.IsMixedTrack? sessionFrom.data.mixedAudioTrack[1] : undefined,
          )
          var mixedAudioTrack = sessionFrom.data.mixedAudioTrack[0].stream.getAudioTracks()[0];
          mixedAudioTrack.IsMixedTrack = true;
          RTCRtpSender.replaceTrack(mixedAudioTrack);
        }
      })
      
    }

    //new call stream not exist until here
    sessionTo.data.mergedCalls.list.push(FromLineNumber)
    sessionTo.data.mergedCalls.audioStreams.push(sessionFrom.audioReceivers[0])
    sessionFrom.data.mergedCalls = sessionTo.data.mergedCalls
    window.temp1 = Lines
    store.dispatch({type:"sip/mergedCallGroups", payload:{action:"add",data:{FromLineNumber:FromLineNumber, ToLineNumber:ToLineNumber}}});
  },
  logout: (changeLocation=true)=>{
    localStorage.clear();
    sessionStorage.clear();
    deleteAllCookies();
    changeLocation && (window.location = "/");
  },
  store:() => {return store}
}
export default sip