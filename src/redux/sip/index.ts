import { createSlice } from '@reduxjs/toolkit'
import { getCookie, setCookie } from 'utils'

interface inboundCallIn {
  LineNumber?: number,
  DisplayName?: string,
  DisplayNumber?: string,
  ringtone?: boolean,
}

interface outboundCallIn {
  LineNumber?: number,
  DisplayName?: string,
  DisplayNumber?: string,
  isMute?: Boolean,
}

interface answeredCallIn {
  LineNumber?: number,
  DisplayName?: string,
  DisplayNumber?: string,
  callTimer?: string,
  answered?: Boolean,
  isMute?: Boolean,
  isHold?: Boolean,
  volumeLevel?: Number,
  showDTMF?: Boolean,
  showAddCall?: Boolean,
  showTransferCall?: Boolean,
  showTransferCallAtt?: Boolean,
  audioSettingOnCallModal?: Boolean,
  callSpeakerDevice?:string,
}
interface callEndingIn{
  name?: string,
  callTimer?: string
}
interface microphoneDeviceIn{
  deviceId?: string,
  groupId?: string,
  kind?: string,
  label?: string,
}
interface speakerDeviceIn{
  deviceId?: string,
  groupId?: string,
  kind?: string,
  label?: string,
}
interface extAuthIn{
  displayname?: string,
  outbound_server?: string,
  password?: string,
  server?: string,
  user?: string,
}
const sipSlice = createSlice({
  name: 'sip',
  initialState: {
    authMessage: "",
    authLoading: false,
    extAuth: true as boolean, //login by ext
    apiAuth: undefined as  extAuthIn |undefined,
    extNumber: null as number | null, 
    extAuthList: [] as extAuthIn[],
    loginSelectExtension: "",
    ringingInboundCalls: [] as inboundCallIn[],
    ringingInboundCallActive:0,
    answeredCalls: [] as answeredCallIn[],
    answeredCallActive:0,
    ringingOutboundCalls: [] as outboundCallIn[],
	  callEnding: [] as callEndingIn[],
    ringingOutboundCallActive:0,
    activeCallLineNumber:0,
    logoutPopUp: false,
    microphoneDevice: [] as microphoneDeviceIn[],
    speakerDevice: [] as speakerDeviceIn[],
    hasAudioDevice: false,
    hasSpeakerDevice: false,
    navigatePush:"",
    aboutRingplan: false,
    statusMenu: false,
    status: {
      main_status:"",
      additional_status:""
    },
    isProfileOpen: false,
    isExtensionOpen: false,
    isEditBoxOpen: false,
    editExtension: [] as extAuthIn,
    showMultipleCallListModal: false,
    audioAutoGainControl: getCookie("audioAutoGainControl") ? getCookie("audioAutoGainControl") == "true" : true, 
    audioNoiseSuppression: getCookie("audioNoiseSuppression") ? getCookie("audioNoiseSuppression") == "true" : true, 
    audioEchoCancellation: getCookie("audioEchoCancellation") ? getCookie("audioEchoCancellation") == "true" : true,
    sipRegistrationStatus: "",
    accountId: "",
    suggestPortraitOnMobileModalShow:false
  },
  reducers: {
    audioAutoGainControl: (state, action) =>  {
      state.audioAutoGainControl = action.payload
    },
    sipRegistrationStatus: (state, action) =>  {
      state.sipRegistrationStatus = action.payload
    },
    status: (state, action) =>  {
      if(state.status != action.payload){
        state.status = action.payload
        state.statusMenu = false
      }
    },
    audioNoiseSuppression: (state, action) =>  {
      state.audioNoiseSuppression = action.payload
    },
    accountId: (state, action) =>  {
      state.accountId = action.payload
    },
    audioEchoCancellation: (state, action) =>  {
      state.audioEchoCancellation = action.payload
    },
    authMessage: (state, action) =>  {
      state.authMessage = action.payload
    },
    showMultipleCallListModal: (state, action) =>  {
      state.showMultipleCallListModal = action.payload
    },
    aboutRingplan: (state, action) =>  {
      state.aboutRingplan = action.payload
      state.isProfileOpen = false
    },
    statusMenu: (state, action) =>  {
      state.statusMenu = action.payload
      state.isProfileOpen = false
    },
    isExtensionOpen: (state, action) =>  {
      state.isExtensionOpen = action.payload
      state.isProfileOpen = false
    },
    isEditBoxOpen: (state, action) =>  {
      state.isEditBoxOpen = action.payload
    },
    editExtension: (state, action) =>  {
      state.editExtension = action.payload
    },
    isProfileOpen: (state, action) =>  {
      state.isProfileOpen = action.payload
      state.isExtensionOpen = false
    },
    navigatePush: (state, action) =>  {
      state.navigatePush = action.payload
    },
    extAuth: (state, action) =>  {
      state.extAuth = action.payload
    },
    apiAuth: (state, action) =>  {
      state.apiAuth = action.payload
    },
    extNumber: (state, action) =>  {
      state.extNumber = action.payload
    },
    authLoading: (state, aciton) =>  {
      state.authLoading = aciton.payload
    },
    loginSelectExtension: (state, aciton) =>  {
      state.loginSelectExtension = aciton.payload
    },
    activeCallLineNumber: (state, aciton) =>  {
      state.activeCallLineNumber = aciton.payload
    },
		endCall: (state) => {
			state.callEnding = state.callEnding.slice(1)
		},
		extAuthList: (state, action)=> {
      console.log(action.payload)
			state.extAuthList = action.payload
		},
		addEndCall: (state, action)=>{
			state.callEnding = [ ...state.callEnding, action.payload ]
		},
    ringingInboundCallActive: (state, aciton) =>  {
      state.ringingInboundCallActive = aciton.payload
    },
    ringingOutboundCallActive: (state, aciton) =>  {
      state.ringingOutboundCallActive = aciton.payload
    },
    logoutPopUp: (state, action) =>  {
      state.logoutPopUp = action.payload
      state.isProfileOpen = false
    },
    hasAudioDevice: (state, action) =>  {
      state.hasAudioDevice = action.payload
      // console.log(state.hasAudioDevice)
    },
    hasSpeakerDevice: (state, action) =>  {
      state.hasSpeakerDevice = action.payload
      // console.log(state.hasSpeakerDevice)
    },
    suggestPortraitOnMobileModalShow: (state, action) =>  {
      state.suggestPortraitOnMobileModalShow = action.payload
    },
    microphoneDevice: (state, action) =>  {
      switch(action.payload.action){
        case "add": {
          const microphoneDevice = {...action.payload.data}
          state.microphoneDevice = [...state.microphoneDevice, microphoneDevice]
          // console.log(state.microphoneDevice)
          break
        }
        case "removeAll": {
          state.microphoneDevice = []
          break
        }
      }
    },
    speakerDevice: (state, action) =>  {
      switch(action.payload.action){
        case "add": {
          const speakerDevice = {...action.payload.data}
          state.speakerDevice = [...state.speakerDevice, speakerDevice]
          // console.log(state.speakerDevice)
          break
        }
        case "removeAll": {
          state.speakerDevice = []
          break
        }
      }

    },
    ringingInboundCalls:(state, action) =>  {
      switch(action.payload.action){
        case "add": {
          const inboundCall = {...action.payload.data}
          state.ringingInboundCalls = [...state.ringingInboundCalls, inboundCall]
          state.ringingInboundCallActive = inboundCall.LineNumber
          state.activeCallLineNumber = inboundCall.LineNumber
          break
        }
        case "remove": {
          const lineNum = action.payload.data
          for (let index = 0; index < state.ringingInboundCalls.length; index++) {
            if (state.ringingInboundCalls[index].LineNumber === lineNum ) {
                state.ringingInboundCalls=[
                ...state.ringingInboundCalls.slice(0, index),
                ...state.ringingInboundCalls.slice(index + 1)
                ]
              break;
            }
          }
          if(state.ringingInboundCallActive === lineNum && state.ringingInboundCalls.length > 0 && state.ringingInboundCalls[0].LineNumber !== undefined){
            //Inbound Call
            state.ringingInboundCallActive = state.ringingInboundCalls[0].LineNumber
            state.activeCallLineNumber = state.ringingInboundCalls[0].LineNumber
          }else if(state.ringingInboundCalls.length > 0 ){
            //Inbound Call
            state.activeCallLineNumber = state.ringingInboundCallActive
          }else if(state.answeredCalls.length > 0 && state.answeredCalls[0].LineNumber !== undefined){
            //Answered
            state.activeCallLineNumber = state.answeredCalls[0].LineNumber
            state.answeredCallActive = state.answeredCalls[0].LineNumber
          }else if(state.ringingOutboundCalls.length > 0 && state.ringingOutboundCalls[0].LineNumber !== undefined){
            //Outbound Call
            state.activeCallLineNumber = state.ringingOutboundCalls[0].LineNumber
            state.ringingOutboundCallActive = state.ringingOutboundCalls[0].LineNumber
          }
          break
        }
        case "ringtoneOff": {
          const lineNum = action.payload.data
          for (let index = 0; index < state.ringingInboundCalls.length; index++) {
            if (state.ringingInboundCalls[index].LineNumber === lineNum ) {
                state.ringingInboundCalls[index].ringtone = true
            }
          }
          break
        }
        case "ringtoneOn": {
          const lineNum = action.payload.data
          for (let index = 0; index < state.ringingInboundCalls.length; index++) {
            if (state.ringingInboundCalls[index].LineNumber === lineNum ) {
                state.ringingInboundCalls[index].ringtone = false
            }
          }
          break
        }
        case "answer": {
          const lineNum = action.payload.data
          console.log("ans:"+lineNum)
          state.answeredCallActive = lineNum
          state.activeCallLineNumber = lineNum
          for (let index = 0; index < state.ringingInboundCalls.length; index++) {
            if (state.ringingInboundCalls[index].LineNumber === lineNum ) {
                const answered : answeredCallIn = state.ringingInboundCalls[index]
                answered.answered = true
                answered.callTimer = "00:00"
                state.answeredCalls = [...state.answeredCalls, answered]; 
                state.ringingInboundCalls=[
                ...state.ringingInboundCalls.slice(0, index),
                ...state.ringingInboundCalls.slice(index + 1)
                ]
              break;
            }
          }
          if(state.ringingInboundCallActive === lineNum && state.ringingInboundCalls.length > 0 && state.ringingInboundCalls[0].LineNumber !== undefined){
            state.ringingInboundCallActive = state.ringingInboundCalls[0].LineNumber
            state.activeCallLineNumber = state.ringingInboundCalls[0].LineNumber
          }
          console.log(state.answeredCalls)
          break
        }
      }
    },
    answeredCalls:(state, action) =>  {
      switch(action.payload.action){
        case "add": {
          const answeredCall = {...action.payload.data}
          state.answeredCalls = [...state.answeredCalls, answeredCall]; 
          break
        }
        case "remove": {
          const lineNum = action.payload.data
          for (let index = 0; index < state.answeredCalls.length; index++) {
            if (state.answeredCalls[index].LineNumber === lineNum ) {
                const endingCall = {name:state.answeredCalls[index].DisplayName , callTimer:state.answeredCalls[index].callTimer }
                state.callEnding = [ ...state.callEnding, endingCall ]
                state.answeredCalls=[
                ...state.answeredCalls.slice(0, index),
                ...state.answeredCalls.slice(index + 1)
                ]
              break;
            }
          }
          if(state.answeredCallActive === lineNum && state.answeredCalls.length > 0 && state.answeredCalls[0].LineNumber !== undefined){
            //Answered
            state.answeredCallActive = state.answeredCalls[0].LineNumber
            state.activeCallLineNumber = state.answeredCalls[0].LineNumber
          }else if(state.answeredCalls.length > 0 && state.answeredCalls[0].LineNumber !== undefined){
            //Answered
            state.activeCallLineNumber = state.answeredCallActive
          }else if(state.ringingOutboundCalls.length > 0 && state.ringingOutboundCalls[0].LineNumber !== undefined){
            //Outbound Call
            state.activeCallLineNumber = state.ringingOutboundCalls[0].LineNumber
            state.ringingOutboundCallActive = state.ringingOutboundCalls[0].LineNumber
          }else if(state.ringingInboundCalls.length > 0 && state.ringingInboundCalls[0].LineNumber !== undefined){
            //Inbound Call
            state.activeCallLineNumber = state.ringingInboundCalls[0].LineNumber
            state.ringingInboundCallActive = state.ringingInboundCalls[0].LineNumber
          }
          break
        }
        case "callTimer": {
          console.log("callTimer:")
          console.log(action.payload.data)
          const lineNum = action.payload.data.lineNum
          const callTimer = action.payload.data.callTimer
          for (let index = 0; index < state.answeredCalls.length; index++) {
            if (state.answeredCalls[index].LineNumber === lineNum ) {
              state.answeredCalls[index].callTimer = callTimer
              break;
            }
          }
          break
        }
        case "isMute": {
          console.log("mute:")
          console.log(action.payload.data)
          const lineNum = action.payload.data.lineNum
          const isMute = action.payload.data.isMute
          for (let index = 0; index < state.answeredCalls.length; index++) {
            if (state.answeredCalls[index].LineNumber === lineNum ) {
              state.answeredCalls[index].isMute = isMute
              break;
            }
          }
          break
        }
        case "isHold": {
          console.log("hold:")
          console.log(action.payload.data)
          const lineNum = action.payload.data.lineNum
          const isHold = action.payload.data.isHold
          for (let index = 0; index < state.answeredCalls.length; index++) {
            if (state.answeredCalls[index].LineNumber === lineNum ) {
              state.answeredCalls[index].isHold = isHold;
              break;
            }
          }
          break
        }
        case "volumeLevel": {
          console.log("volumeLevel:")
          console.log(action.payload.data)
          const lineNum = action.payload.data.lineNum
          const volumeLevel = action.payload.data.volumeLevel
          for (let index = 0; index < state.answeredCalls.length; index++) {
            if (state.answeredCalls[index].LineNumber === lineNum ) {
              state.answeredCalls[index].volumeLevel = volumeLevel
              break;
            }
          }
          break
        }
        case "showDTMF": {
          console.log("showDTMF:")
          console.log(action.payload.data)
          const lineNum = action.payload.data.lineNum
          const showDTMF = action.payload.data.showDTMF
          for (let index = 0; index < state.answeredCalls.length; index++) {
            if (state.answeredCalls[index].LineNumber === lineNum ) {
              state.answeredCalls[index].showDTMF = showDTMF
              break;
            }
          }
          break
        }
        case "showAddCall": {
          console.log("showAddCall:")
          console.log(action.payload.data)
          const lineNum = action.payload.data.lineNum
          const showAddCall = action.payload.data.showAddCall
          for (let index = 0; index < state.answeredCalls.length; index++) {
            if (state.answeredCalls[index].LineNumber === lineNum ) {
              state.answeredCalls[index].showAddCall = showAddCall
              break;
            }
          }
          break
        }
        case "showTransferCall": {
          console.log("showTransferCall:")
          console.log(action.payload.data)
          const lineNum = action.payload.data.lineNum
          const showTransferCall = action.payload.data.showTransferCall
          for (let index = 0; index < state.answeredCalls.length; index++) {
            if (state.answeredCalls[index].LineNumber === lineNum ) {
              state.answeredCalls[index].showTransferCall = showTransferCall
              break;
            }
          }
          break
        }
        case "showTransferCallAtt": {
          console.log("showTransferCall:")
          console.log(action.payload.data)
          const lineNum = action.payload.data.lineNum
          const showTransferCallAtt = action.payload.data.showTransferCallAtt
          for (let index = 0; index < state.answeredCalls.length; index++) {
            if (state.answeredCalls[index].LineNumber === lineNum ) {
              state.answeredCalls[index].showTransferCallAtt = showTransferCallAtt
              break;
            }
          }
          break
        }
        case "audioSettingOnCallModal": {
          console.log("audioSettingOnCallModal:")
          console.log(action.payload.data)
          const lineNum = action.payload.data.lineNum
          const audioSettingOnCallModal = action.payload.data.audioSettingOnCallModal
          for (let index = 0; index < state.answeredCalls.length; index++) {
            if (state.answeredCalls[index].LineNumber === lineNum ) {
              state.answeredCalls[index].audioSettingOnCallModal = audioSettingOnCallModal
              break;
            }
          }
          break
        }
        case "callSpeakerDevice": {
          console.log("callSpeakerDevice:")
          console.log(action.payload.data)
          const lineNum = action.payload.data.lineNum
          const callSpeakerDevice = action.payload.data.callSpeakerDevice
          for (let index = 0; index < state.answeredCalls.length; index++) {
            if (state.answeredCalls[index].LineNumber === lineNum ) {
              state.answeredCalls[index].callSpeakerDevice = callSpeakerDevice
              break;
            }
          }
          break
        }
      }
    },

    ringingOutboundCalls:(state, action) =>  {
      switch(action.payload.action){
        case "add": {
          const outboundCall = {...action.payload.data}
          state.ringingOutboundCalls = [...state.ringingOutboundCalls, outboundCall]
          state.ringingOutboundCallActive = outboundCall.LineNumber
          state.activeCallLineNumber = outboundCall.LineNumber
          break
        }
        case "remove": {
          const lineNum = action.payload.data
          console.log(state.ringingOutboundCalls)
          for (let index = 0; index < state.ringingOutboundCalls.length; index++) {
            if (state.ringingOutboundCalls[index].LineNumber === lineNum ) {
                state.ringingOutboundCalls=[
                ...state.ringingOutboundCalls.slice(0, index),
                ...state.ringingOutboundCalls.slice(index + 1)
                ]
              break;
            }
          }
          console.log(state.ringingOutboundCalls)
          if(state.ringingOutboundCallActive === lineNum && state.ringingOutboundCalls.length > 0 && state.ringingOutboundCalls[0].LineNumber !== undefined){
            //Outbound Call
            state.ringingOutboundCallActive = state.ringingOutboundCalls[0].LineNumber
            state.activeCallLineNumber = state.ringingOutboundCalls[0].LineNumber
          }else if(state.ringingOutboundCalls.length > 0 && state.ringingOutboundCalls[0].LineNumber !== undefined){
            //Outbound Call
            state.activeCallLineNumber = state.ringingOutboundCallActive
          }else if(state.ringingInboundCalls.length > 0 && state.ringingInboundCalls[0].LineNumber !== undefined){
            //Inbound Call
            state.activeCallLineNumber = state.ringingInboundCalls[0].LineNumber
            state.ringingInboundCallActive = state.ringingInboundCalls[0].LineNumber
          }else if(state.answeredCalls.length > 0 && state.answeredCalls[0].LineNumber !== undefined){
            //Answered
            state.activeCallLineNumber = state.answeredCalls[0].LineNumber
            state.answeredCallActive = state.answeredCalls[0].LineNumber
          }
          break
        }
        case "answer": {
          const lineNum = action.payload.data
          state.answeredCallActive = lineNum
          state.activeCallLineNumber = lineNum
          for (let index = 0; index < state.ringingOutboundCalls.length; index++) {
            if (state.ringingOutboundCalls[index].LineNumber === lineNum ) {
                const answered:answeredCallIn =  state.ringingOutboundCalls[index]
                answered.answered = true
                answered.callTimer = "00:00"
                state.answeredCalls = [...state.answeredCalls, answered]; 
                state.ringingOutboundCalls=[
                ...state.ringingOutboundCalls.slice(0, index),
                ...state.ringingOutboundCalls.slice(index + 1)
                ]
              break;
            }
          }
          if(state.ringingOutboundCallActive === lineNum && state.ringingOutboundCalls.length > 0 && state.ringingOutboundCalls[0].LineNumber !== undefined){
            state.ringingOutboundCallActive = state.ringingOutboundCalls[0].LineNumber
            state.activeCallLineNumber = state.ringingOutboundCalls[0].LineNumber
          }
          console.log(state.answeredCalls)
          break
        }
        case "isMute": {
          console.log("mute:")
          console.log(action.payload.data)
          const lineNum = action.payload.data.lineNum
          const isMute = action.payload.data.isMute
          for (let index = 0; index < state.ringingOutboundCalls.length; index++) {
            if (state.ringingOutboundCalls[index].LineNumber === lineNum ) {
              state.ringingOutboundCalls[index].isMute = isMute
              break;
            }
          }
          break
        }
      }
    },
    
  },
})

export const { authMessage, authLoading, ringingInboundCalls, ringingOutboundCalls, ringingOutboundCallActive, extAuth, logoutPopUp, extAuthList} = sipSlice.actions
export default  sipSlice.reducer;