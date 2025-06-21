import { configureStore } from "@reduxjs/toolkit";
import  employeeReducer from '../redux/employeeSlice'
import taskReducer from '../redux/taskSlice'
import chatReducer from '../redux/chatSlice'
import authReducer from '../redux/authSlice'

 export const store = configureStore({
    reducer:{
        employee: employeeReducer,
        task: taskReducer,
        chat: chatReducer,
        auth: authReducer,
    }
})