import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearMessages, sendMessage } from '../../redux/chatSlice';

const ChatBox = ({ employeeId }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { messages } = useSelector(state => state.chat);

  const managerId = 'mgr1';
  const isManager = user.id === managerId;
  const chattingWith = isManager ? employeeId : managerId;

  const [input, setInput] = useState('');
  const chatEndRef = useRef(null);

  const chat = messages.filter(
    msg =>
      (msg.senderId === user.id && msg.receiverId === chattingWith) ||
      (msg.senderId === chattingWith && msg.receiverId === user.id)
  );

  const handleClearChat = () => {
  dispatch(clearMessages({ userId1: user.id, userId2: chattingWith }));
};


  const handleSend = () => {
    if (!input.trim()) return;
    dispatch(
      sendMessage({
        senderId: user.id,
        receiverId: chattingWith,
        text: input,
        timestamp: new Date().toLocaleTimeString(),
      })
    );
    setInput('');
  };



  return (
    <div className="p-3 border rounded" style={{ background: '#f8f9fa', height: 500, display: 'flex', flexDirection: 'column' }}>
      <div
        className="flex-grow-1 pe-2"
        style={{
          overflowY: 'auto',
          scrollbarWidth: 'none',   
          msOverflowStyle: 'none',     
        }}
      >
        <style>{`
          .flex-grow-1::-webkit-scrollbar {
            display: none; /* Chrome, Safari */
          }
        `}</style>

        {chat.map((msg, index) => {
          const isSender = msg.senderId === user.id;
          return (
            <div
              key={index}
              className={`d-flex mb-2 ${isSender ? 'justify-content-end' : 'justify-content-start'}`}
            >
              <div
                className={`p-2 shadow-sm rounded-3 ${
                  isSender ? 'bg-success text-white' : 'bg-white border'
                }`}
                style={{ maxWidth: '70%', wordBreak: 'break-word' }}
              >
                <div>{msg.text}</div>
                <div className="text-end small mt-1 text-muted" style={{ fontSize: '0.75rem' }}>
                  {msg.timestamp}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={chatEndRef} />
      </div>

      <div className="d-flex gap-2 mt-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="form-control rounded-pill"
          placeholder="Type a message..."
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button className="btn btn-primary rounded-pill px-4" onClick={handleSend}>
          Send
        </button>
         <button className="btn btn-danger rounded-pill px-4" onClick={handleClearChat}>
          Clear
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
