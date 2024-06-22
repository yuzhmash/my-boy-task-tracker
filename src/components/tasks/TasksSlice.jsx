import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: [],
    tasksLoadingStatus: "idle"
}

const tasksSlice = createSlice({
    name: "tasks", 
    initialState,
    reducers: {
        addTask: (state, actions) => {
            return {
                ...state,
                data: [...state.data, actions.payload],
                tasksLoadingStatus: "idle"
            }
            state.data = actions.payload
            state.tasksLoadingStatus = "idle"
        },
        loadingTask: state => {state.tasksLoadingStatus = "loading"},
        errorTask: state => {state.tasksLoadingStatus = "error"}
    }
})

const {actions, reducer} = tasksSlice;

export default reducer;

export const {
    addTask,
    loadingTask,
    errorTask
} = actions;