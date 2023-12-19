import { createSlice } from "@reduxjs/toolkit";

const preLoginSlice=createSlice({
    name:'prelogin',
    initialState:{
        token:'',
        isAuthenticated:false,
        userData:'',
        isLoading:false
    },
    reducers:{
        updateToken:(state,{payload})=>{
            state['token']=payload
        },
        updateUserData:(state,{payload})=>{
            state['userData']=payload
        },
        updateAuthenication:(state,{payload})=>{
            state['isAuthenticated']=payload
        },
        updateLoading:(state,{payload})=>{
            state['isLoading']=payload
        }
    }
})
export const {updateToken,updateUserData,updateAuthenication , updateLoading}=preLoginSlice.actions
export default preLoginSlice.reducer;
export const  preloginSelector=(state)=>state.preloginSelector