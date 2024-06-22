import { configureStore } from "@reduxjs/toolkit";

import logIn from "../components/pages/LogInSlice"
import task from "../components/addTask/AddTaskSlice";
import tasks from "../components/tasks/TasksSlice"

const store = configureStore({
    reducer: {logIn, task, tasks},
    middleware: middleware => middleware(),
    devTools: process.env.NODE_ENV !== "production"
})

export default store;