import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "store"

interface State {
  projectModalOPen: boolean
}

const initialState: State = {
  projectModalOPen: false,
}

export const projectListSlice = createSlice({
  name: "projectListSlice",
  initialState,
  reducers: {
    openProjectModal(state) {
      state.projectModalOPen = true
    },
    closeProjectModal(state) {
      state.projectModalOPen = false
    },
  },
})

export const projectListActions = projectListSlice.actions

export const selectProjectModalOpen = (state: RootState) =>
  state.projectList.projectModalOPen
