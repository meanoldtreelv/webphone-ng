import { createSlice } from '@reduxjs/toolkit'

interface inboundCall {
  LineNumber?: number,
  DisplayName?: string,
  DisplayNumber?: string,
}

interface outboundCall {
  LineNumber?: number,
  DisplayName?: string,
  DisplayNumber?: string,
  isMute?: Boolean,
}

interface answeredCall {
  LineNumber?: number,
  DisplayName?: string,
  DisplayNumber?: string,
  callTimer?: string,
  answered?: Boolean,
  isMute?: Boolean,
  isHold?: Boolean,
  volumeLevel?: Number,
}

const sipSlice = createSlice({
  name: 'sip',
  initialState: {
    authMessage: "",
    authLoading: false,
    extAuth: false, //login by ext
    extNumber: null as number | null, 
    ringingInboundCalls: [] as inboundCall[],
    ringingInboundCallActive:0,
    answeredCalls: [] as answeredCall[],
    answeredCallActive:0,
    ringingOutboundCalls: [] as outboundCall[],
    ringingOutboundCallActive:0,
    activeCallLineNumber:0,
  },
  reducers: {
    authMessage: (state, action) =>  {
      state.authMessage = action.payload
    },
    extAuth: (state, action) =>  {
      state.extAuth = action.payload
    },
    extNumber: (state, action) =>  {
      state.extNumber = action.payload
    },
    authLoading: (state, aciton) =>  {
      state.authLoading = aciton.payload
    },
    activeCallLineNumber: (state, aciton) =>  {
      state.activeCallLineNumber = aciton.payload
    },
    ringingInboundCallActive: (state, aciton) =>  {
      state.ringingInboundCallActive = aciton.payload
    },
    ringingOutboundCallActive: (state, aciton) =>  {
      state.ringingOutboundCallActive = aciton.payload
    },
    ringingInboundCalls:(state, action) =>  {
      switch(action.payload.action){
        case "add": {
          const inboundCall = {...action.payload.data}
          state.ringingInboundCalls = [...state.ringingInboundCalls, inboundCall]
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
            state.ringingInboundCallActive = state.ringingInboundCalls[0].LineNumber
          }
          break
        }
        case "answer": {
          const lineNum = action.payload.data
          console.log("ans:"+lineNum)
          state.answeredCallActive = lineNum
          for (let index = 0; index < state.ringingInboundCalls.length; index++) {
            if (state.ringingInboundCalls[index].LineNumber === lineNum ) {
                const answered : answeredCall = state.ringingInboundCalls[index]
                answered.answered = true
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
                state.answeredCalls=[
                ...state.answeredCalls.slice(0, index),
                ...state.answeredCalls.slice(index + 1)
                ]
              break;
            }
          }
          if(state.answeredCallActive === lineNum && state.answeredCalls.length > 0 && state.answeredCalls[0].LineNumber !== undefined){
            state.answeredCallActive = state.answeredCalls[0].LineNumber
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
              state.answeredCalls[index].isHold = isHold
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
      }
    },

    ringingOutboundCalls:(state, action) =>  {
      switch(action.payload.action){
        case "add": {
          const outboundCall = {...action.payload.data}
          state.ringingOutboundCalls = [...state.ringingOutboundCalls, outboundCall]

          console.log(state.ringingOutboundCalls)
          console.log(state.ringingOutboundCalls)
          console.log(state.ringingOutboundCalls)
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
            state.ringingOutboundCallActive = state.ringingOutboundCalls[0].LineNumber
          }
          break
        }
        case "answer": {
          const lineNum = action.payload.data
          state.answeredCallActive = lineNum
          for (let index = 0; index < state.ringingOutboundCalls.length; index++) {
            if (state.ringingOutboundCalls[index].LineNumber === lineNum ) {
                const answered:answeredCall =  state.ringingOutboundCalls[index]
                answered.answered = true
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

export const { authMessage, authLoading, ringingInboundCalls, ringingOutboundCalls, ringingOutboundCallActive, extAuth} = sipSlice.actions
export default  sipSlice.reducer;