// // pages/ChatPage.jsx
// import React, { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { sendMessage } from '../redux/chatSlice';

// const ChatPage = () => {
//   const { user } = useSelector((state) => state.auth);
//   const messages = useSelector((state) => state.chat.messages);
//   const dispatch = useDispatch();
//   const [input, setInput] = useState('');
//   const [selectedEmp, setSelectedEmp] = useState('emp1'); // default employee

//   const handleSend = () => {
//     if (!input.trim()) return;
//    const handleSend = () => {
//   if (!input.trim()) return;

//   dispatch(sendMessage({
//     senderId: user.id,         
//     receiverId: selectedEmp,   
//     text: input,               
//     timestamp: new Date().toLocaleTimeString(),
//   }));

//   setInput('');
// };

//     setInput('');
//   };

//   const chat = messages.filter(msg =>
//   (msg.senderId === user.id && msg.receiverId === selectedEmp) ||
//   (msg.senderId === selectedEmp && msg.receiverId === user.id)
// );



//   return (
//     <div className="p-4">
//       <h4 className="mb-3">Manager Chat Panel</h4>
//       <select
//         className="form-select mb-2"
//         onChange={(e) => setSelectedEmp(e.target.value)}
//         value={selectedEmp}
//       >
//         <option value="emp1">emp1</option>
//         <option value="emp2">emp2</option>
//       </select>
//       <div className="border p-3 mb-3 rounded" style={{ height: 300, overflowY: 'auto' }}>
//         {chat.map((msg, idx) => (
//           <div key={idx} className={msg.senderId === user.id ? 'text-end' : 'text-start'}>
//             <div className="badge bg-light text-dark p-2">{msg.text}</div>
//             <div className="text-muted" style={{ fontSize: '0.7rem' }}>{msg.timestamp}</div>
//           </div>
//         ))}
//       </div>
//       <div className="d-flex gap-2">
//         <input value={input} onChange={(e) => setInput(e.target.value)} className="form-control" />
//         <button onClick={handleSend} className="btn btn-primary">Send</button>
//       </div>
//     </div>
//   );
// };

// export default ChatPage;


// pages/ChatPage.jsx
import React, { useState } from 'react';
import ChatBox from '../components/Employee/ChatBox';

const ChatPage = () => {
  const [selectedEmp, setSelectedEmp] = useState('emp1');

  return (
    <div className="container mt-4">
      <h4 className="mb-3">💬 Manager Chat Panel</h4>

      {/* Dropdown to select which employee to chat with */}
      <select
        className="form-select mb-3 w-25"
        value={selectedEmp}
        onChange={(e) => setSelectedEmp(e.target.value)}
      >
        <option value="emp1">Employee 1</option>
        <option value="emp2">Employee 2</option>
      </select>

      {/* Chat UI for selected employee */}
      <ChatBox employeeId={selectedEmp} />
    </div>
  );
};

export default ChatPage;
