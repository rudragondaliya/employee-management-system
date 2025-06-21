// redux/employeeSlice.js
import { createSlice } from '@reduxjs/toolkit';

const storedEmployees = localStorage.getItem('employees');
const initialEmployees = storedEmployees ? JSON.parse(storedEmployees) : [];

const employeeSlice = createSlice({
  name: 'employee',
  initialState: {
    employees: initialEmployees,
  },
  reducers: {
    addEmployee: (state, action) => {
      state.employees.push(action.payload);
      localStorage.setItem('employees', JSON.stringify(state.employees));
    },
    updateEmployee: (state, action) => {
      const index = state.employees.findIndex(emp => emp.id === action.payload.id);
      if (index !== -1) {
        state.employees[index] = action.payload;
        localStorage.setItem('employees', JSON.stringify(state.employees));
      }
    },
    deleteEmployee: (state, action) => {
      state.employees = state.employees.filter(emp => emp.id !== action.payload);
      localStorage.setItem('employees', JSON.stringify(state.employees));
    },
    importEmployees: (state, action) => {
      state.employees = [...state.employees, ...action.payload];
      localStorage.setItem('employees', JSON.stringify(state.employees));
    },
  },
});

export const {
  addEmployee,
  updateEmployee,
  deleteEmployee,
  importEmployees,
} = employeeSlice.actions;

export default employeeSlice.reducer;
