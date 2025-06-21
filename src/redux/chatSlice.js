
import { createSlice } from '@reduxjs/toolkit';

const storedMessages = localStorage.getItem('chatMessages');
const initialMessages = storedMessages ? JSON.parse(storedMessages) : [];

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    messages: initialMessages,
  },
  reducers: {
    sendMessage: (state, action) => {
      state.messages.push(action.payload);
      localStorage.setItem('chatMessages', JSON.stringify(state.messages));
    },
    clearMessages: (state) => {
      state.messages = [];
      localStorage.removeItem('chatMessages');
    },
  },
});

export const { sendMessage, clearMessages } = chatSlice.actions;
export default chatSlice.reducer;
