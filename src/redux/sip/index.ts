import { createSlice } from '@reduxjs/toolkit'

interface Line {
  LineNumber?: string,
  DisplayName?: string,
  DisplayNumber?: string,
  status?: string,
  ismute?: string,
  muteAfterAnswer?: string,
}
interface inboundCall {
  LineNumber?: number,
  DisplayName?: string,
  DisplayNumber?: string,
  muteAfterAnswer?: string,
}

const sipSlice = createSlice({
  name: 'sip',
  initialState: {
    authMessage: "",
    authLoading: false,
    lines: [] as Line[],
    extAuth: true, //login by ext
    ringingInboundCalls: [] as inboundCall[],
    activeCallLineNumber:0,
    ringingInboundCallActive:0,
  },
  reducers: {
    authMessage: (state, action) =>  {
      state.authMessage = action.payload
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
    lines: (state, action) =>  {
      switch(action.payload.action){
        case "add": {
          const line:Line = {...action.payload.data}
          console.log(line)
          state.lines = [...state.lines, line]; 
          break
        }
      }
      console.log(action)
      console.log(state.lines)
    },
    ringingInboundCalls:(state, action) =>  {
      switch(action.payload.action){
        case "add": {
          const inboundCall = {...action.payload.data}
          console.log(inboundCall)
          state.ringingInboundCalls = [...state.ringingInboundCalls, inboundCall]; 
          console.log(state.ringingInboundCalls)
          break
        }
        case "remove": {
          const lineNum = action.payload.data
          for (var index = 0; index < state.ringingInboundCalls.length; index++) {
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
        }
      }
      console.log(action)
      console.log(state.lines)
    },
    
  },
})

export const { authMessage, authLoading, lines, ringingInboundCalls } = sipSlice.actions
export default  sipSlice.reducer;