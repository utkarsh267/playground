import { createSlice } from '@reduxjs/toolkit'

export const tableDataSlice = createSlice({
  name: 'tableData',
  initialState: {
    records: [],
    id: 0
  },
  reducers: {
    addRecord: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes.
      // Also, no return statement is required from these functions.
      state.records.push({...action.payload, id: state.id})
      state.id += 1
    },
    deleteRecord: (state, action) => {
      state.records = state.records.filter( (item)=> item.id !== action.payload)
    },
    updateRecord: (state, action) => {
      state.records = state.records.map((item)=>{
          if(item.id === action.payload.id) {
            return {
              ...action.payload
            }
          } else {
            return item;
          }
      })
    },
  },
})

// Action creators are generated for each case reducer function
export const { addRecord, deleteRecord, updateRecord } = tableDataSlice.actions

export default tableDataSlice.reducer