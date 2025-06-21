
import { createSlice } from '@reduxjs/toolkit';


const storedUser = localStorage.getItem('user');
const initialUser = storedUser ? JSON.parse(storedUser) : { id: 'emp1', role: 'employee', name: 'Rudra' };

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: initialUser,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('user');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
