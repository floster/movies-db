import { createSlice } from '@reduxjs/toolkit'

type DialogState = {
  isOpen: boolean
}

const initialState: DialogState = {
  isOpen: false,
}

export const dialogSlice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    openDialog: state => {
      state.isOpen = true
    },
    closeDialog: state => {
      state.isOpen = false
    },
  },
})

export const dialogActions = dialogSlice.actions
export const dialogReducer = dialogSlice.reducer
