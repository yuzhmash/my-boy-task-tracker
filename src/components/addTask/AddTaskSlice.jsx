import { createSlice } from "@reduxjs/toolkit";

const initialState = ({
    newTask: false
})

const addTaskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        createNewTask: (state) => {state.newTask = true},
        cancleNewTask: (state) => {state.newTask = false}
    }
})

const {actions, reducer} = addTaskSlice;

export default reducer;
export const {
    createNewTask,
    cancleNewTask
} = actions;