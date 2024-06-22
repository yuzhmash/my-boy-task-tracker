import { createSlice, createAsyncThunk, createEntityAdapter, createSelector } from "@reduxjs/toolkit";

import MyBoyService from "../../service/MyBoyService";
import { useHttp } from "../../hooks/http.hooks";

// const logInAdapter = createEntityAdapter()

// const initialState = logInAdapter.getInitialState({
//     logInLoadingStatus: 'idle'
// })

const initialState = {
    dataOfPeople: [],
    logInLoadingStatus: 'idle'
}


export const fetchLogIn = createAsyncThunk(
    'logIn/fetchLogIn',
    async (email) => {
        const {initializeData} = MyBoyService()
        const data = initializeData()
        return await data.then(data => data.filter(({email: userEmail}) => userEmail === email))
    }
)

const logInSlice = createSlice({
    name: "logIn",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchLogIn.pending, state => {
                return {
                    ...state,
                    logInLoadingStatus: "loading"
                }
            })
            .addCase(fetchLogIn.fulfilled, (state, action) => {
                return {
                    ...state, 
                    dataOfPeople: action.payload[0],
                    logInLoadingStatus: "idle"
                }
            })
            .addCase(fetchLogIn.rejected, state => {
                console.log(state);
                return {
                    ...state,
                    logInLoadingStatus: "error"
                }
            })
            .addDefaultCase(() => {})
    }
})

const {actions, reducer} = logInSlice

export default reducer;