import { createSlice, nanoid } from '@reduxjs/toolkit';


const storedTasks = localStorage.getItem('tasks');
const initialState = {
  tasks: storedTasks ? JSON.parse(storedTasks) : [],
};

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    assignTask: {
      reducer: (state, action) => {
        state.tasks.push(action.payload);
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
      },
      prepare: (task) => ({
        payload: {
          ...task,
          id: nanoid(),
          status: 'pending',
        },
      }),
    },

    updateTask: (state, action) => {
      const index = state.tasks.findIndex(t => t.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
      }
    },

    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(t => t.id !== action.payload);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    },

    markTaskCompleted: (state, action) => {
      const task = state.tasks.find(t => t.id === action.payload);
      if (task) {
        task.status = 'completed';
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
      }
    },
  }
});

export const { assignTask, updateTask, deleteTask, markTaskCompleted } = taskSlice.actions;
export default taskSlice.reducer;
