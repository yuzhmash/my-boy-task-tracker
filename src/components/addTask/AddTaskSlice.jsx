import { createSlice } from "@reduxjs/toolkit";

const initialState = ({
    newTask: false,
    calendarStatus: false,
    tasksDate: ''
})

const addTaskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        createNewTask: (state) => {state.newTask = true},
        cancleNewTask: (state) => {state.newTask = false},
        showHideCalendar: (state) => {state.calendarStatus = !state.calendarStatus}
    }
})

const {actions, reducer} = addTaskSlice;

export default reducer;
export const {
    createNewTask,
    cancleNewTask,
    showHideCalendar
} = actions;