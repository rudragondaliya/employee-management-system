// // src/components/Manager/ManagerChatBox.jsx
// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { sendMessage } from '../../redux/chatSlice';

// const ManagerChatBox = () => {
//   const { messages } = useSelector(state => state.chat);
//   const { user } = useSelector(state => state.auth);
//   const dispatch = useDispatch();
//   const [text, setText] = useState('');

//   const handleSend = () => {
//     if (text.trim()) {
//       dispatch(sendMessage({ sender: user.name, role: 'manager', text }));
//       setText('');
//     }
//   };

//   return (
//     <div className="card p-3">
//       <h5>Manager Chat</h5>
//       <div className="chat-box mb-3" style={{ maxHeight: '300px', overflowY: 'auto' }}>
//         {messages.map((msg, index) => (
//           <div key={index} className={`mb-2 ${msg.role === 'manager' ? 'text-end' : 'text-start'}`}>
//             <strong>{msg.sender}:</strong> <span>{msg.text}</span>
//           </div>
//         ))}
//       </div>
//       <div className="d-flex">
//         <input
//           className="form-control me-2"
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//           placeholder="Type a message..."
//         />
//         <button className="btn btn-primary" onClick={handleSend}>Send</button>
//       </div>
//     </div>
//   );
// };

// export default ManagerChatBox;
